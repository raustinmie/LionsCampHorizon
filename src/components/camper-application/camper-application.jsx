import React, { useMemo, useState } from "react";
import DynamicField from "./dynamic-field";

export default function CamperApplication({ formJson }) {
	// We'll flatten all form_items into a steps array (Fluent stores steps as element:"form_step")
	const steps = useMemo(() => {
		// formJson.form_items is the main array in your export
		const items =
			formJson.form_items || formJson.fields || formJson.elements || [];
		// Split by form_step
		const arr = [];
		let current = {
			title: formJson.form_title || formJson.title || "Application",
			items: [],
		};
		for (const it of items) {
			if (it.element === "form_step") {
				if (current.items.length) arr.push(current);
				current = { title: it.settings?.title || "Step", items: [] };
			} else {
				current.items.push(it);
			}
		}
		if (current.items.length || arr.length === 0) arr.push(current);
		return arr;
	}, [formJson]);

	// state holds values keyed by name
	const [values, setValues] = useState({});
	const [currentStep, setCurrentStep] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const [submitResult, setSubmitResult] = useState(null);

	function updateValue(name, val) {
		setValues((s) => ({ ...s, [name]: val }));
	}

	function evaluateCondition(cond) {
		// cond: { field: "input_radio_3", value: "yes", operator: "=" }
		const left = values[cond.field];
		const right = cond.value;
		switch (cond.operator || "=") {
			case "=":
			case "==":
				return String(left) === String(right);
			case "!=":
				return String(left) !== String(right);
			case "contains":
				return (left || "").toString().includes(right);
			default:
				return false;
		}
	}

	function shouldShowItem(item) {
		const rules = item.settings?.conditional_logics;
		if (!rules || rules.status === false) return true;
		const type = rules.type || "any"; // any / all
		const conds = rules.conditions || [];
		if (conds.length === 0) return true;
		if (type === "all") return conds.every(evaluateCondition);
		return conds.some(evaluateCondition);
	}

	function collectVisibleFields(stepIndex) {
		const step = steps[stepIndex];
		return (step.items || []).filter((it) => shouldShowItem(it));
	}

	async function handleSubmit(ev) {
		ev.preventDefault();
		setSubmitting(true);
		setSubmitResult(null);

		const formData = new FormData();
		// include raw JSON for debugging (optional)
		formData.append(
			"form_id",
			formJson.form_id || formJson.ID || formJson.id || "camper-application"
		);
		// append values
		for (const [k, v] of Object.entries(values)) {
			if (Array.isArray(v)) {
				v.forEach((vv) => formData.append(k + "[]", vv));
			} else {
				formData.append(k, v === undefined || v === null ? "" : v);
			}
		}

		// also serialize visible field list
		formData.append("_visible_fields", JSON.stringify(Object.keys(values)));

		try {
			const res = await fetch("/api/camper-application", {
				method: "POST",
				body: formData,
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || "Submission failed");
			setSubmitResult({ success: true, data });
			// optionally reset
			// setValues({});
		} catch (err) {
			setSubmitResult({ success: false, error: err.message });
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div id="cs-camper-application-form" className="cs-form-wrapper">
			<h1 className="cs-form-title">
				{formJson.form_title || formJson.title || "Camper Application"}
			</h1>

			<form
				className="cs-form"
				onSubmit={handleSubmit}
				encType="multipart/form-data"
			>
				{/* Render only current step (vertical stack) */}
				<div className="cs-step" aria-hidden={false}>
					{collectVisibleFields(currentStep).map((item, idx) => {
						// derive a safe name key
						const name =
							item.attributes?.name ||
							item.settings?.name ||
							item.settings?.label?.toLowerCase().replace(/[^a-z0-9]+/g, "_") ||
							`field_${item.uniqElKey || idx}`;
						return (
							<div
								className={`cs-field-wrapper cs-${(item.element || "field")
									.toString()
									.toLowerCase()}`}
								key={item.uniqElKey || idx}
							>
								<DynamicField
									item={item}
									name={name}
									value={values[name]}
									onChange={(v) => updateValue(name, v)}
									allValues={values}
								/>
							</div>
						);
					})}
				</div>

				<div className="cs-form-actions">
					{currentStep > 0 && (
						<button
							type="button"
							className="cs-btn cs-btn-secondary"
							onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
						>
							Previous
						</button>
					)}

					{currentStep < steps.length - 1 && (
						<button
							type="button"
							className="cs-btn cs-btn-primary"
							onClick={() =>
								setCurrentStep((s) => Math.min(steps.length - 1, s + 1))
							}
						>
							Next
						</button>
					)}

					{currentStep === steps.length - 1 && (
						<button
							type="submit"
							disabled={submitting}
							className="cs-btn cs-btn-submit"
						>
							{submitting ? "Submitting…" : "Submit Application"}
						</button>
					)}
				</div>

				{submitResult && (
					<div
						className={`cs-submit-result ${
							submitResult.success ? "cs-success" : "cs-error"
						}`}
					>
						{submitResult.success
							? "Submitted — check email."
							: `Error: ${submitResult.error}`}
					</div>
				)}
			</form>
		</div>
	);
}
