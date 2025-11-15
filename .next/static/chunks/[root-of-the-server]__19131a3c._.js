(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s({
    "connect": (()=>connect),
    "setHooks": (()=>setHooks),
    "subscribeToUpdate": (()=>subscribeToUpdate)
});
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}}),
"[project]/src/constants.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "canonicalUrl": (()=>canonicalUrl),
    "companyName": (()=>companyName),
    "facebookUrl": (()=>facebookUrl),
    "instagramUrl": (()=>instagramUrl),
    "ogIconPath": (()=>ogIconPath),
    "ogImagePath": (()=>ogImagePath),
    "primaryAddress1": (()=>primaryAddress1),
    "primaryAddress2": (()=>primaryAddress2),
    "primaryEmail": (()=>primaryEmail),
    "primaryPhone": (()=>primaryPhone),
    "staffApplicationLink": (()=>staffApplicationLink)
});
const canonicalUrl = "https://www.lionscamphorizon.org/";
;
const ogImagePath = `${canonicalUrl}`;
;
const ogIconPath = "";
;
const companyName = "Lions Camp Horizon";
;
// A zero-width space was added in contact, don't forget to update that spot.
const primaryEmail = "admin@lionscamphorizon.org";
;
const primaryPhone = "360-371-0531";
;
const primaryAddress1 = "7506 Gemini Street";
;
const primaryAddress2 = "Blaine, WA 98230";
;
const facebookUrl = "https://www.facebook.com/CampHorizonBlaine";
;
const instagramUrl = "https://www.instagram.com/lions_camp_horizon/";
;
const staffApplicationLink = "https://form.jotform.com/252855980249167";
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/seo/generic-seo.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>GenericSeo)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants.tsx [client] (ecmascript)");
;
;
;
function GenericSeo({ title, description, ogDescription, canonicalUrlPath = "/", ogType = "website", twitterCard = "summary_large_image", noIndex = false, jsonLd }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                children: title
            }, "seo-title", false, {
                fileName: "[project]/src/components/seo/generic-seo.tsx",
                lineNumber: 45,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "description",
                content: description
            }, "seo-description", false, {
                fileName: "[project]/src/components/seo/generic-seo.tsx",
                lineNumber: 46,
                columnNumber: 4
            }, this),
            noIndex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "robots",
                content: "noindex,nofollow"
            }, void 0, false, {
                fileName: "[project]/src/components/seo/generic-seo.tsx",
                lineNumber: 48,
                columnNumber: 16
            }, this),
            !noIndex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                rel: "canonical",
                href: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["canonicalUrl"]}${canonicalUrlPath}`
            }, "canonical-url", false, {
                fileName: "[project]/src/components/seo/generic-seo.tsx",
                lineNumber: 52,
                columnNumber: 5
            }, this),
            !noIndex && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: title
                    }, "og-title", false, {
                        fileName: "[project]/src/components/seo/generic-seo.tsx",
                        lineNumber: 62,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:description",
                        content: ogDescription || description
                    }, "og-description", false, {
                        fileName: "[project]/src/components/seo/generic-seo.tsx",
                        lineNumber: 63,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: ogType
                    }, "og-type", false, {
                        fileName: "[project]/src/components/seo/generic-seo.tsx",
                        lineNumber: 68,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:url",
                        content: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["canonicalUrl"]}${canonicalUrlPath}`
                    }, "og-url", false, {
                        fileName: "[project]/src/components/seo/generic-seo.tsx",
                        lineNumber: 69,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ogImagePath"]
                    }, "og-image", false, {
                        fileName: "[project]/src/components/seo/generic-seo.tsx",
                        lineNumber: 74,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:card",
                        content: twitterCard
                    }, "twitter-card", false, {
                        fileName: "[project]/src/components/seo/generic-seo.tsx",
                        lineNumber: 76,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:title",
                        content: title
                    }, "twitter-title", false, {
                        fileName: "[project]/src/components/seo/generic-seo.tsx",
                        lineNumber: 77,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:description",
                        content: description
                    }, "twitter-description", false, {
                        fileName: "[project]/src/components/seo/generic-seo.tsx",
                        lineNumber: 78,
                        columnNumber: 6
                    }, this),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ogImagePath"] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "twitter:image",
                        content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ogImagePath"]
                    }, "twitter-image", false, {
                        fileName: "[project]/src/components/seo/generic-seo.tsx",
                        lineNumber: 84,
                        columnNumber: 7
                    }, this),
                    jsonLd && (Array.isArray(jsonLd) ? jsonLd.map((data, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                            type: "application/ld+json",
                            dangerouslySetInnerHTML: {
                                __html: JSON.stringify(data)
                            }
                        }, i, false, {
                            fileName: "[project]/src/components/seo/generic-seo.tsx",
                            lineNumber: 94,
                            columnNumber: 9
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                        type: "application/ld+json",
                        dangerouslySetInnerHTML: {
                            __html: JSON.stringify(jsonLd)
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/seo/generic-seo.tsx",
                        lineNumber: 101,
                        columnNumber: 8
                    }, this))
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/seo/generic-seo.tsx",
        lineNumber: 43,
        columnNumber: 3
    }, this);
}
_c = GenericSeo;
var _c;
__turbopack_context__.k.register(_c, "GenericSeo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/stitches/shared/cta-697/cta-697.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Cta697)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
;
;
function Cta697({ bannerText, buttonText, linkHref }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "cta-697",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "cs-container",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cs-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "cs-title",
                        children: bannerText
                    }, void 0, false, {
                        fileName: "[project]/src/components/stitches/shared/cta-697/cta-697.tsx",
                        lineNumber: 20,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        href: linkHref,
                        className: "cs-button-solid secondary",
                        children: buttonText
                    }, void 0, false, {
                        fileName: "[project]/src/components/stitches/shared/cta-697/cta-697.tsx",
                        lineNumber: 21,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stitches/shared/cta-697/cta-697.tsx",
                lineNumber: 19,
                columnNumber: 5
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/stitches/shared/cta-697/cta-697.tsx",
            lineNumber: 18,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/stitches/shared/cta-697/cta-697.tsx",
        lineNumber: 17,
        columnNumber: 3
    }, this);
}
_c = Cta697;
var _c;
__turbopack_context__.k.register(_c, "Cta697");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/stitches/get-involved/hero-g-2149/hero-g-2149.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>HeroG2149)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [client] (ecmascript)");
;
;
function HeroG2149() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "hero-g-2149",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cs-container",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cs-background",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "/images/get-involved-hero1.jpg",
                            className: "cs-image2",
                            alt: "a border patrol agent with a thank you card",
                            width: 388,
                            height: 517
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/hero-g-2149/hero-g-2149.tsx",
                            lineNumber: 11,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "/images/get-involved-hero2.jpg",
                            className: "cs-image1",
                            alt: "a camp conga line",
                            width: 817,
                            height: 517
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/hero-g-2149/hero-g-2149.tsx",
                            lineNumber: 18,
                            columnNumber: 6
                        }, this),
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "/images/get-involved-hero3.jpg",
                            className: "cs-image3",
                            alt: "a camper writing a thank you card",
                            width: 529,
                            height: 517
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/hero-g-2149/hero-g-2149.tsx",
                            lineNumber: 25,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stitches/get-involved/hero-g-2149/hero-g-2149.tsx",
                    lineNumber: 10,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stitches/get-involved/hero-g-2149/hero-g-2149.tsx",
                lineNumber: 8,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cs-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "cs-title",
                        children: "Get Involved"
                    }, void 0, false, {
                        fileName: "[project]/src/components/stitches/get-involved/hero-g-2149/hero-g-2149.tsx",
                        lineNumber: 36,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "cs-text",
                        children: "Camp Horizon thrives because of the generosity of people who give their time, energy, and talents to make camp possible. Whether you’re looking for a hands-on way to serve or a behind-the-scenes role, there are countless opportunities to make a meaningful difference in the lives of our campers."
                    }, void 0, false, {
                        fileName: "[project]/src/components/stitches/get-involved/hero-g-2149/hero-g-2149.tsx",
                        lineNumber: 37,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/stitches/get-involved/hero-g-2149/hero-g-2149.tsx",
                lineNumber: 35,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/stitches/get-involved/hero-g-2149/hero-g-2149.tsx",
        lineNumber: 7,
        columnNumber: 3
    }, this);
}
_c = HeroG2149;
var _c;
__turbopack_context__.k.register(_c, "HeroG2149");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SbsG2376)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [client] (ecmascript)");
;
;
function SbsG2376() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "sbs-g-2376",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "cs-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cs-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "cs-topper",
                            children: "Why Choose Us"
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                            lineNumber: 10,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "cs-title",
                            children: "Guided Therapy Services"
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                            lineNumber: 11,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "cs-text",
                            children: "We offer comprehensive support for individuals, couples, and families facing various life transitions, emotional hurdles, and relationship issues. Our dedicated services are designed to help you navigate these challenges with understanding and care."
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                            lineNumber: 12,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                    lineNumber: 9,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cs-wrapper",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cs-flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cs-content2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "cs-h3",
                                            children: "Activities and Entertainment"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                            lineNumber: 23,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "cs-text",
                                            children: [
                                                "Do you have a skill, performance, craft, or activity you’d love to share? We’re always looking for musicians, artists, entertainers, animal handlers, and community groups who want to bring joy, creativity, and fun to our campers. Whether it’s a performance, a hands-on activity, or a unique talent you’d like to showcase, we’d love to welcome you to camp.",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                                    lineNumber: 31,
                                                    columnNumber: 9
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                                    lineNumber: 32,
                                                    columnNumber: 9
                                                }, this),
                                                "Come brighten a day, create a memory, and be part of the magic at Camp Horizon!"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                            lineNumber: 24,
                                            columnNumber: 8
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                    lineNumber: 22,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cs-picture",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/images/get-involved-activities.png",
                                        alt: "a camper riding a horse",
                                        width: 528,
                                        height: 378,
                                        loading: "lazy",
                                        decoding: "async"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                        lineNumber: 38,
                                        columnNumber: 8
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                    lineNumber: 37,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                            lineNumber: 21,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cs-flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cs-content2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "cs-h3",
                                            children: "Help Us Keep Camp in Top Shape!"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                            lineNumber: 51,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "cs-text",
                                            children: "Camp Horizon relies on caring hands and generous hearts to keep our campus safe and beautiful for every camper. We’re always looking for those who are interested in facility improvements, grounds maintenance, landscaping, flower bed care, and other hands-on service projects. These projects make fantastic team building opportunities for workplaces, youth groups, service clubs, and community organizations."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                            lineNumber: 52,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "cs-text",
                                            children: "Whether you’re skilled with tools, love working outdoors, or simply enjoy pitching in where it’s needed, your time and teamwork make a lasting difference for campers all year long.Come roll up your sleeves and help us keep the magic growing!"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                            lineNumber: 61,
                                            columnNumber: 8
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                    lineNumber: 50,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cs-picture",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/images/get-involved-maintenance.png",
                                        alt: "a crew working on concrete",
                                        width: 528,
                                        height: 378,
                                        loading: "lazy",
                                        decoding: "async"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                        lineNumber: 70,
                                        columnNumber: 8
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                    lineNumber: 69,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                            lineNumber: 49,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "cs-flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cs-content2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "cs-h3",
                                            children: "Serve Meals, Serve Smiles!"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                            lineNumber: 83,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "cs-text",
                                            children: [
                                                "Mealtime is one of the happiest parts of the day at Camp Horizon and volunteers make it possible! We rely on caring volunteers to help serve meals, which allows us to keep camp fees affordable for our families while still creating a fun, welcoming dining experience for our campers.",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 9
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 9
                                                }, this),
                                                "No kitchen experience is required, just a friendly heart, a love of helping others, and a willingness to share a smile. If you enjoy feeding people, connecting with others, and brightening someone’s day, we’d love to have you in the dining hall with us!"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                            lineNumber: 84,
                                            columnNumber: 8
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                    lineNumber: 82,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "cs-picture",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/images/get-involved-food.png",
                                        alt: "volunteers in the camp kitchen",
                                        width: 528,
                                        height: 378,
                                        loading: "lazy",
                                        decoding: "async"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                        lineNumber: 99,
                                        columnNumber: 8
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                                    lineNumber: 98,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                            lineNumber: 81,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
                    lineNumber: 19,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
            lineNumber: 8,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx",
        lineNumber: 7,
        columnNumber: 3
    }, this);
}
_c = SbsG2376;
var _c;
__turbopack_context__.k.register(_c, "SbsG2376");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CustomSbs)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [client] (ecmascript)");
;
;
function CustomSbs() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "custom-sbs",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cs-container",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cs-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "cs-title",
                            children: "Become a Financial Partner"
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx",
                            lineNumber: 10,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "cs-text",
                            children: "There are many ways to support Camp Horizon, and every gift, big or small, helps bring joy to our campers. As a 501(c)(3) nonprofit, your donation may also be tax-deductible."
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx",
                            lineNumber: 11,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "cs-h3",
                            children: "General Fund"
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx",
                            lineNumber: 16,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "cs-text",
                            children: "Supports our daily operations and allows us to direct resources where they’re needed most."
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx",
                            lineNumber: 17,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "cs-h3",
                            children: "Endowment Fund"
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx",
                            lineNumber: 21,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "cs-text",
                            children: "deal for legacy or long-term gifts designed to sustain camp for years to come."
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx",
                            lineNumber: 22,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "cs-h3",
                            children: "Program Sponsorships"
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx",
                            lineNumber: 26,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "cs-text",
                            children: "Individuals, businesses, and organizations can sponsor seasonal camp programs such as meals, activities, or special events. A meaningful way to make a direct impact."
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx",
                            lineNumber: 27,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "cs-h3",
                            children: 'Please visit our "Donate" tab to learn more about options available for financial contributions.'
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx",
                            lineNumber: 32,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx",
                    lineNumber: 9,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx",
                lineNumber: 8,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cs-background",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/images/get-involved-partner.jpg",
                    alt: "a camper dancing with a counselor",
                    width: 1920,
                    height: 660,
                    loading: "lazy",
                    decoding: "async",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx",
                    lineNumber: 40,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx",
                lineNumber: 39,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx",
        lineNumber: 7,
        columnNumber: 3
    }, this);
}
_c = CustomSbs;
var _c;
__turbopack_context__.k.register(_c, "CustomSbs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Pricing1842)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
function Pricing1842() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "pricing-1842",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "cs-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cs-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "cs-topper",
                            children: "Donor Recognition"
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                            lineNumber: 10,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "cs-title",
                            children: "Thank you to the many donors whose contributions help make Lions Camp Horizon possible."
                        }, void 0, false, {
                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                            lineNumber: 11,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                    lineNumber: 9,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "cs-card-group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "cs-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "cs-package",
                                    children: "Sponsorship Level"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 18,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "cs-price",
                                    children: "$5,000 and Above"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 19,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "cs-ul",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Bellingham Central Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 21,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Coupeville Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 22,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Dick & Jan G."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 23,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Don & Maria W."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 24,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Estate of Sheila N."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 25,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Everson Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 26,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Joe & Virginia H."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 27,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Lynden Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 28,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "North Central Seattle Kiwanis Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 29,
                                            columnNumber: 8
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 20,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                            lineNumber: 17,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "cs-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "cs-package",
                                    children: "Gold Level"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 33,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "cs-price",
                                    children: "$1,000 to $5,000"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 34,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "cs-ul",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Bellingham Fairhaven Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 36,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "William C."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 37,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Brian & Marilyn P."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 38,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Donald & Rachel D."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 39,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Edwards Foundation"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 40,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Freeman Security"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 41,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Langley Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 42,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Len Honcoop Gravel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 43,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Lions Club of Anacortes"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 44,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Marjorie G."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 45,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Mount Vernon Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 46,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "North Delta Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 47,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Orcas Island Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 48,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Pacific Custom Brokers"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 49,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Pitt Meadows Lions"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 50,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Ric & Sue M."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 51,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Ruth S."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 52,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "San Juan Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 53,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Sarami Cheaqui Memorial Fund"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 54,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Surrey Central Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 55,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Wendy C."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 56,
                                            columnNumber: 8
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 35,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                            lineNumber: 32,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "cs-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "cs-package",
                                    children: "Silver Level"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 60,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "cs-price",
                                    children: "$200 to $1,000"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 61,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "cs-ul",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Bellingham Harborview Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 63,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Blackbaud Giving Fund"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 64,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Chilliwack Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 65,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Daniel C."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 66,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "David S."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 67,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Estate of Stephen S."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 68,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Ferndale Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 69,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Front Street Realty"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 70,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Gary P."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 71,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Joel and Vicki H."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 72,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "John S."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 73,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Joseph W."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 74,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Karen F."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 75,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Kroger/Fred Meyer"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 76,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Lions 19-H Cabinet"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 77,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Lions Club of Whidbey Island"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 78,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Lynda D."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 79,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Mark K."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 80,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Mary B."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 81,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Michael J."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 82,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Patricia H."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 83,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Renton Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 84,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Robin B."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 85,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Shana M."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 86,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Sharron & Mike S."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 87,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Sound Credit Union"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 88,
                                            columnNumber: 8
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 62,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                            lineNumber: 59,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                    lineNumber: 16,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "cs-card-group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "cs-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "cs-package",
                                    children: "Friends of Camp Horizon"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 94,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "cs-price",
                                    children: "Up to $200"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 95,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "cs-ul",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Anonymous"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 97,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Ashish D."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 98,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Catherine C."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 99,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Cauzes Charitable Fund"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 100,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Chilliwack Mount Cheam Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 101,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "David F."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 102,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Doug S."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 103,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Gloria H."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 104,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Kristine C."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 105,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Oak Harbor Lions"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 106,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Patricia A."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 107,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Richard H."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 108,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Robert A."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 109,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Sandra B."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 110,
                                            columnNumber: 8
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 96,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                            lineNumber: 93,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "cs-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "cs-package",
                                    children: "In-Kind Donations"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 114,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "cs-ul",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Christina T."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 116,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Coupeville Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 117,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Dave F."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 118,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Don & Maria W."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 119,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "John’s Chem-Dry of Whatcom County"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 120,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Karen F."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 121,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Lake City Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 122,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Melisa V."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 123,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Mike & Sharron S."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 124,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Mt. Baker Lanes"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 125,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Ruthi S."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 126,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Signs By Tomorrow"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 127,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "The C Shop"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 128,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Vision Plumbing"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 129,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Whatcom Transit Authority"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 130,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Windemere Realty of Whatcom County"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 131,
                                            columnNumber: 8
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 115,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                            lineNumber: 113,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "cs-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "cs-package",
                                    children: "Volunteers"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 135,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "cs-ul",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Bellingham Central Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 137,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Bellingham Fairhaven Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 138,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Blaine School District"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 139,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Coupeville Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 140,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "DeHop Farms"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 141,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Everson Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 142,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Ferndale Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 143,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Fort Langley Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 144,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Kiwanis Camp Casey"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 145,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Lynden Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 146,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "North Central Seattle Kiwanis Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 147,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "North Delta Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 148,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Oak Harbor Lions Club"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 149,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "cs-li",
                                            children: "Peoples Bank"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                            lineNumber: 150,
                                            columnNumber: 8
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                                    lineNumber: 136,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                            lineNumber: 134,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
                    lineNumber: 92,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
            lineNumber: 8,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx",
        lineNumber: 7,
        columnNumber: 3
    }, this);
}
_c = Pricing1842;
var _c;
__turbopack_context__.k.register(_c, "Pricing1842");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/pages/get-involved.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Staff)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seo$2f$generic$2d$seo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/seo/generic-seo.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stitches$2f$shared$2f$cta$2d$697$2f$cta$2d$697$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stitches/shared/cta-697/cta-697.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stitches$2f$get$2d$involved$2f$hero$2d$g$2d$2149$2f$hero$2d$g$2d$2149$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stitches/get-involved/hero-g-2149/hero-g-2149.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stitches$2f$get$2d$involved$2f$sbs$2d$g$2d$2376$2f$sbs$2d$g$2d$2376$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stitches/get-involved/sbs-g-2376/sbs-g-2376.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stitches$2f$get$2d$involved$2f$custom$2d$sbs$2f$custom$2d$sbs$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stitches/get-involved/custom-sbs/custom-sbs.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stitches$2f$get$2d$involved$2f$pricing$2d$1842$2f$pricing$2d$1842$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/stitches/get-involved/pricing-1842/pricing-1842.tsx [client] (ecmascript)");
;
;
;
;
;
;
;
;
function Staff() {
    const faqData = [
        {
            question: "What if I've never been to a camp before?",
            answer: ""
        },
        {
            question: "What if I can't afford to pay for Camp? Will DSHS cover the cost of camp?",
            answer: "We never want finances to be the reason someone misses out on camp. We offer financial assistance through CAMPerships, as well as no-cost payment plans for families paying privately. Camp Horizon is also an approved DSHS/DDA Respite Care Provider, and we can work directly with your Case Resource Manager to coordinate billing if you receive respite benefits."
        },
        {
            question: "Can I come to camp if I have special dietary requirements?",
            answer: ""
        },
        {
            question: "Do I need a Physical Exam before I can attend camp?",
            answer: ""
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$seo$2f$generic$2d$seo$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                description: "Join 110 makers at Red Barn Market! Share your goods with thousands of shoppers at Whatcom County’s favorite seasonal market.",
                ogDescription: "Be part of Red Barn Market’s vibrant vendor family. Showcase your handmade, vintage, or specialty items to eager shoppers in a lively holiday setting.",
                title: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["companyName"]} | Camp`,
                canonicalUrlPath: "vendor-information",
                jsonLd: {
                    "@context": "https://schema.org",
                    "@type": "Service",
                    name: "Vendor Booth at Red Barn Market",
                    description: "Vendor opportunities for Red Barn Market, Whatcom County's top holiday pop-up. Share handmade, vintage, and specialty goods with thousands of visitors.",
                    provider: {
                        "@type": "Organization",
                        name: "Red Barn Market",
                        url: "https://redbarnmarketevents.com"
                    },
                    areaServed: {
                        "@type": "AdministrativeArea",
                        name: "Whatcom County, WA"
                    },
                    offers: {
                        "@type": "Offer",
                        url: "https://redbarnmarketevents.com/vendor-information",
                        price: "Variable",
                        priceCurrency: "USD",
                        eligibleRegion: {
                            "@type": "AdministrativeArea",
                            name: "Whatcom County, WA"
                        },
                        availability: "https://schema.org/InStock"
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/pages/get-involved.tsx",
                lineNumber: 37,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stitches$2f$get$2d$involved$2f$hero$2d$g$2d$2149$2f$hero$2d$g$2d$2149$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/pages/get-involved.tsx",
                lineNumber: 70,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stitches$2f$get$2d$involved$2f$sbs$2d$g$2d$2376$2f$sbs$2d$g$2d$2376$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/pages/get-involved.tsx",
                lineNumber: 71,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stitches$2f$get$2d$involved$2f$custom$2d$sbs$2f$custom$2d$sbs$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/pages/get-involved.tsx",
                lineNumber: 72,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stitches$2f$get$2d$involved$2f$pricing$2d$1842$2f$pricing$2d$1842$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/pages/get-involved.tsx",
                lineNumber: 73,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$stitches$2f$shared$2f$cta$2d$697$2f$cta$2d$697$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                bannerText: "Help us serve our campers!",
                buttonText: "Donate",
                linkHref: "/donate"
            }, void 0, false, {
                fileName: "[project]/src/pages/get-involved.tsx",
                lineNumber: 74,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/get-involved.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, this);
}
_c = Staff;
var _c;
__turbopack_context__.k.register(_c, "Staff");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/get-involved.tsx [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/get-involved";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/src/pages/get-involved.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[project]/src/pages/get-involved (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/get-involved.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__19131a3c._.js.map