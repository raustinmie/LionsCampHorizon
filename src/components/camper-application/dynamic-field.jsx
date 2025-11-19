// components/camper-application/dynamic-field.jsx
import React from "react";

/**
 * Render a single field item from Fluent Forms JSON.
 * This is intentionally "generic" — it maps common elements:
 * - input_text / input_textarea / textarea
 * - input_radio, input_checkbox
 * - select, dropdown
 * - custom_html -> render raw HTML
 * - file uploads -> <input type="file">
 *
 * Props:
 * - item (JSON)
 * - name (string)
 * - value
 * - onChange
 */

export default function DynamicField({
	item,
	name,
	value,
	onChange,
	allValues,
}) {
	const el = (item.element || "").toString().toLowerCase();
	const settings = item.settings || {};
	const attrs = item.attributes || {};
	const label = settings.label || attrs.placeholder || attrs.name || "";
	const required = settings.validation_rules?.required?.value || false;

	function handleChange(e) {
		if (e?.target?.files) {
			// file input
			onChange(
				e.target.files.length === 1
					? e.target.files[0]
					: Array.from(e.target.files)
			);
			return;
		}
		const val = e?.target?.value;
		if (e?.target?.type === "checkbox") {
			if (Array.isArray(value)) {
				const checked = e.target.checked;
				const v = e.target.value;
				if (checked) onChange([...(value || []), v]);
				else onChange((value || []).filter((x) => x !== v));
			} else {
				onChange(e.target.checked ? e.target.value || true : false);
			}
			return;
		}
		onChange(val);
	}

	if (el === "custom_html" || el === "html") {
		return (
			<div
				className="cs-custom-html"
				dangerouslySetInnerHTML={{ __html: settings.html_codes || "" }}
			/>
		);
	}

	if (
		el === "input_text" ||
		el === "input-text" ||
		el === "simple_text" ||
		el === "inputtext"
	) {
		return (
			<div className="cs-field cs-text">
				{label && (
					<label className="cs-label">
						{label}
						{required ? " *" : ""}
					</label>
				)}
				<input
					className="cs-input"
					name={name}
					type="text"
					onChange={handleChange}
					value={value || ""}
					placeholder={attrs.placeholder || ""}
				/>
			</div>
		);
	}

	if (el === "textarea" || el === "input_textarea" || el === "text_area") {
		return (
			<div className="cs-field cs-textarea">
				{label && (
					<label className="cs-label">
						{label}
						{required ? " *" : ""}
					</label>
				)}
				<textarea
					className="cs-textarea-input"
					name={name}
					rows={settings.rows || 3}
					onChange={handleChange}
					value={value || ""}
				/>
			</div>
		);
	}

	if (el === "input_radio" || el === "input-radio" || el === "radio") {
		// get choices from settings.advanced_options or settings.advanced_options
		const opts =
			settings.advanced_options || settings.options || item.options || [];
		return (
			<fieldset className="cs-field cs-radio">
				{label && (
					<legend className="cs-label">
						{label}
						{required ? " *" : ""}
					</legend>
				)}
				{opts.map((o, i) => {
					const val = o.value ?? o.label ?? o;
					const id = `${name}_${i}`;
					return (
						<div className="cs-radio-item" key={i}>
							<input
								id={id}
								type="radio"
								name={name}
								value={val}
								checked={String(value) === String(val)}
								onChange={handleChange}
							/>
							<label htmlFor={id}>{o.label || o}</label>
						</div>
					);
				})}
			</fieldset>
		);
	}

	if (el === "input_checkbox" || el === "input-checkbox" || el === "checkbox") {
		const opts =
			settings.advanced_options || settings.options || item.options || [];
		if (opts.length) {
			return (
				<fieldset className="cs-field cs-checkbox">
					{label && (
						<legend className="cs-label">
							{label}
							{required ? " *" : ""}
						</legend>
					)}
					{opts.map((o, i) => {
						const val = o.value ?? o.label ?? o;
						const id = `${name}_${i}`;
						const checked = Array.isArray(value) ? value.includes(val) : false;
						return (
							<div className="cs-checkbox-item" key={i}>
								<input
									id={id}
									type="checkbox"
									name={name}
									value={val}
									checked={checked}
									onChange={handleChange}
								/>
								<label htmlFor={id}>{o.label || o}</label>
							</div>
						);
					})}
				</fieldset>
			);
		} else {
			// single checkbox
			const id = `${name}_single`;
			return (
				<div className="cs-field cs-checkbox-single">
					<input
						id={id}
						type="checkbox"
						name={name}
						checked={!!value}
						onChange={handleChange}
					/>
					<label htmlFor={id}>
						{label}
						{required ? " *" : ""}
					</label>
				</div>
			);
		}
	}

	if (el === "select" || el === "dropdown" || el === "select_country") {
		const opts =
			settings.advanced_options || settings.options || item.options || [];
		return (
			<div className="cs-field cs-select">
				{label && (
					<label className="cs-label">
						{label}
						{required ? " *" : ""}
					</label>
				)}
				<select
					className="cs-select-input"
					name={name}
					value={value || ""}
					onChange={handleChange}
				>
					<option value="">Select…</option>
					{opts.map((o, i) => {
						const val = o.value ?? o.label ?? o;
						return (
							<option key={i} value={val}>
								{o.label || o}
							</option>
						);
					})}
				</select>
			</div>
		);
	}

	if (el === "file" || el === "upload" || el === "input_file") {
		return (
			<div className="cs-field cs-file">
				{label && (
					<label className="cs-label">
						{label}
						{required ? " *" : ""}
					</label>
				)}
				<input
					className="cs-file-input"
					type="file"
					name={name}
					onChange={handleChange}
				/>
			</div>
		);
	}

	// fallback
	return (
		<div className="cs-field cs-unknown">
			{label && (
				<label className="cs-label">
					{label}
					{required ? " *" : ""}
				</label>
			)}
			<input
				className="cs-input"
				name={name}
				onChange={handleChange}
				value={value || ""}
			/>
			<small className="cs-note">Field type: {el || "unknown"}</small>
		</div>
	);
}
