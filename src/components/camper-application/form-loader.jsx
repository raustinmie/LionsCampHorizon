import React, { useEffect, useState } from "react";
import CamperApplication from "./camper-application";

// NOTE: developer instruction: using the local path you uploaded.
// If you host the JSON, replace FORM_JSON_URL with the hosted URL.
const FORM_JSON_URL = "/fluentform-export-forms-1-19-11-2025.json";
export default function FormLoader(props) {
	const [formJson, setFormJson] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function load() {
			try {
				const res = await fetch(FORM_JSON_URL);
				if (!res.ok)
					throw new Error(`Failed to fetch form JSON (${res.status})`);
				const json = await res.json();
				// find the form with title "Camper Application - 2025" or form_id 25
				let found = null;
				if (Array.isArray(json.forms)) {
					found = json.forms.find(
						(f) =>
							f.form_title?.toLowerCase().includes("camper application") ||
							f.title?.toLowerCase().includes("camper application") ||
							f.form_id === "25" ||
							f.form_id === 25
					);
				}
				// fallback: if single form exported
				if (!found && json.form_items) found = json;
				if (!found) {
					// try to find by searching deeply
					const candidate = (json.forms || []).find((f) =>
						(f.form_title || f.title || "")
							.toLowerCase()
							.includes("camper application")
					);
					found = candidate || (json.forms && json.forms[0]) || json;
				}
				setFormJson(found);
			} catch (err) {
				console.error(err);
				setError(err.message);
			}
		}
		load();
	}, []);

	if (error) return <div className="cs-error">Error loading form: {error}</div>;
	if (!formJson) return <div className="cs-loading">Loading form…</div>;
	return <CamperApplication formJson={formJson} {...props} />;
}
