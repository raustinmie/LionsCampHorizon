import React, { useState } from "react";
import PrivacyPolicy from "../components/legalese/privacy-policy";
export default function CamperApplicationForm() {
	const [values, setValues] = useState({});
	const [submitting, setSubmitting] = useState(false);

	const handleChange = (name, value) => {
		setValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleCheckboxChange = (name, optionValue, checked) => {
		setValues((prev) => {
			const current = Array.isArray(prev[name]) ? prev[name] : [];
			if (checked) {
				if (current.includes(optionValue)) return prev;
				return { ...prev, [name]: [...current, optionValue] };
			} else {
				return { ...prev, [name]: current.filter((v) => v !== optionValue) };
			}
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!Array.isArray(values["checkbox"]) || !values["checkbox"].length > 0) {
			alert("Please select at least one session date.");
			return;
		}
		if (
			!Array.isArray(values["mobility_36"]) ||
			!values["mobility_36"].length > 0
		) {
			alert("Please note campers mobility.");
			return;
		}
		if (
			!Array.isArray(values["describe_activity_participation_42"]) ||
			!values["describe_activity_participation_42"].length > 0
		) {
			alert("Please note camper's activity level.");
			return;
		}
		if (
			!Array.isArray(values["checkbox_1"]) ||
			!values["checkbox_1"].length > 0
		) {
			alert("Please note camper's care needs.");
			return;
		}
		if (
			!Array.isArray(values["checkbox_2"]) ||
			!values["checkbox_1"].length > 0
		) {
			alert("Please note camper's hygiene and personal care.");
			return;
		}
		if (
			!Array.isArray(values["checkbox_3"]) ||
			!values["checkbox_1"].length > 0
		) {
			alert("Please note camper's showering needs.");
			return;
		}
		if (
			!Array.isArray(values["checkbox_4"]) ||
			!values["checkbox_4"].length > 0
		) {
			alert("Please note camper's dressing needs.");
			return;
		}
		if (
			!Array.isArray(values["checkbox_5"]) ||
			!values["checkbox_5"].length > 0
		) {
			alert("Please note camper's sleep habits.");
			return;
		}
		if (
			!Array.isArray(values["checkbox_6"]) ||
			!values["checkbox_6"].length > 0
		) {
			alert("Please note camper's communication ability.");
			return;
		}
		if (
			!Array.isArray(values["checkbox_7"]) ||
			!values["checkbox_7"].length > 0
		) {
			alert("Please note camper's behavioral ability.");
			return;
		}
		if (
			!Array.isArray(values["checkbox_8"]) ||
			!values["checkbox_8"].length > 0
		) {
			alert("Please note any equipment your camper requires.");
			return;
		}
		if (
			!Array.isArray(values["checkbox_9"]) ||
			!values["checkbox_9"].length > 0
		) {
			alert("Please note any dietary restrictions your camper may have.");
			return;
		}

		// ---- PREPARE DATA ----
		const formData = new FormData();

		Object.entries(values).forEach(([key, val]) => {
			if (val instanceof File) {
				formData.append(key, val);
			} else if (Array.isArray(val)) {
				val.forEach((v) => formData.append(`${key}[]`, v));
			} else {
				formData.append(key, val ?? "");
			}
		});
		console.log("Form submitted", values);
		// Optional metadata
		formData.append("_submitted_at", new Date().toISOString());
		formData.append("_form_name", "Camper Application 2025");

		// ---- SEND DATA ----
		try {
			const res = await fetch("/api/camper-application", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					submittedAt: new Date().toISOString(),
					values,
				}),
			});

			if (!res.ok) throw new Error(await res.text());

			alert("Application submitted successfully!");
		} catch (err) {
			console.error(err);
			alert("Error submitting: " + err.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div id="cs-camper-application-form">
			<h1 className="cs-form-title">Camper Application - 2025</h1>
			<form className="cs-form" onSubmit={handleSubmit}>
				<div className="cs-field-wrapper">
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								'<p><span style="font-weight: 400;">Before completing this application, please read our Eligibility Requirements posted on our website. If you have any questions, please email us at\u00a0 </span><a href="mailto:acd@lionscamphorizon.org"><span style="font-weight: 400;">acd@lionscamphorizon.org</span></a></p>',
						}}
					/>
				</div>
				<div className="cs-field-wrapper">
					<h2 className="cs-section-title">Camper Information</h2>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-name-wrapper">
						<div className="cs-field cs-name-group">
							<div className="cs-name-group-label">Name</div>
							<div className="cs-name-field">
								<label className="cs-label" htmlFor="first_1_3">
									First *
								</label>
								<input
									className="cs-input"
									type="text"
									id="first_1_3"
									required
									name="first_1_3"
									value={values["first_1_3"] || ""}
									onChange={(e) => handleChange("first_1_3", e.target.value)}
									placeholder="First Name"
								/>
							</div>
							<div className="cs-name-field">
								<label className="cs-label" htmlFor="middle_1_4">
									Middle
								</label>
								<input
									className="cs-input"
									type="text"
									id="middle_1_4"
									name="middle_1_4"
									value={values["middle_1_4"] || ""}
									onChange={(e) => handleChange("middle_1_4", e.target.value)}
									placeholder="Middle Name"
								/>
							</div>
							<div className="cs-name-field">
								<label className="cs-label" htmlFor="last_1_6">
									Last *
								</label>
								<input
									className="cs-input"
									type="text"
									required
									id="last_1_6"
									name="last_1_6"
									value={values["last_1_6"] || ""}
									onChange={(e) => handleChange("last_1_6", e.target.value)}
									placeholder="Last Name"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-text">
						<label
							className="cs-label"
							htmlFor="does_your_camper_have_a_nickname_2"
						>
							Does your camper have a preferred name/nickname?
						</label>
						<input
							className="cs-input"
							type="text"
							id="does_your_camper_have_a_nickname_2"
							name="does_your_camper_have_a_nickname_2"
							value={values["does_your_camper_have_a_nickname_2"] || ""}
							onChange={(e) =>
								handleChange(
									"does_your_camper_have_a_nickname_2",
									e.target.value
								)
							}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_mask">
							Date of Birth *
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_mask"
							required
							name="input_mask"
							value={values["input_mask"] || ""}
							onChange={(e) => handleChange("input_mask", e.target.value)}
							placeholder="mm/dd/yyyy"
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-radio-group">
						<fieldset className="cs-field cs-radio">
							<legend className="cs-label">Gender *</legend>
							<div className="cs-radio-item">
								<input
									id="gender_5_0"
									type="radio"
									name="gender_5"
									required
									value="Male"
									checked={values["gender_5"] === "Male"}
									onChange={(e) => handleChange("gender_5", e.target.value)}
								/>
								<label htmlFor="gender_5_0">Male</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="gender_5_1"
									type="radio"
									name="gender_5"
									value="Female"
									checked={values["gender_5"] === "Female"}
									onChange={(e) => handleChange("gender_5", e.target.value)}
								/>
								<label htmlFor="gender_5_1">Female</label>
							</div>
						</fieldset>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-radio-group">
						<fieldset className="cs-field cs-radio">
							<legend className="cs-label">
								Does Camper reside with Parent/Guardian? *
							</legend>
							<div className="cs-radio-item">
								<input
									id="input_radio_0"
									required
									type="radio"
									name="input_radio"
									value="yes"
									checked={values["input_radio"] === "yes"}
									onChange={(e) => handleChange("input_radio", e.target.value)}
								/>
								<label htmlFor="input_radio_0">Yes</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="input_radio_1"
									type="radio"
									name="input_radio"
									value="no"
									checked={values["input_radio"] === "no"}
									onChange={(e) => handleChange("input_radio", e.target.value)}
								/>
								<label htmlFor="input_radio_1">No</label>
							</div>
						</fieldset>
					</div>
				</div>
				{values["input_radio"] === "no" && (
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								"<p><strong>If camper does not reside with parent/guardian please list contact information for who camper resides with.</strong></p>",
						}}
					/>
				)}
				{values["input_radio"] === "no" && (
					<div className="cs-field cs-name-wrapper">
						<div className="cs-field cs-name-group">
							<div className="cs-name-group-label">Name</div>
							<div className="cs-name-field">
								<label className="cs-label" htmlFor="first_name">
									First Name *
								</label>
								<input
									className="cs-input"
									type="text"
									id="first_name"
									name="first_name"
									value={values["first_name"] || ""}
									required
									onChange={(e) => handleChange("first_name", e.target.value)}
									placeholder="First Name"
								/>
							</div>
							<div className="cs-name-field">
								<label className="cs-label" htmlFor="middle_name">
									Middle Name
								</label>
								<input
									className="cs-input"
									type="text"
									id="middle_name"
									name="middle_name"
									value={values["middle_name"] || ""}
									onChange={(e) => handleChange("middle_name", e.target.value)}
									placeholder="Middle Name"
								/>
							</div>
							<div className="cs-name-field">
								<label className="cs-label" htmlFor="last_name">
									Last Name *
								</label>
								<input
									className="cs-input"
									type="text"
									id="last_name"
									required
									name="last_name"
									value={values["last_name"] || ""}
									onChange={(e) => handleChange("last_name", e.target.value)}
									placeholder="Last Name"
								/>
							</div>
						</div>
					</div>
				)}
				{values["input_radio"] === "no" && (
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_18">
							Relationship to Camper *
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text_18"
							required
							name="input_text_18"
							value={values["input_text_18"] || ""}
							onChange={(e) => handleChange("input_text_18", e.target.value)}
						/>
					</div>
				)}
				{values["input_radio"] === "no" && (
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_9">
							Group home or facility name if applicable
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text_9"
							name="input_text_9"
							value={values["input_text_9"] || ""}
							onChange={(e) => handleChange("input_text_9", e.target.value)}
						/>
					</div>
				)}
				{values["input_radio"] === "no" && (
					<div className="cs-field cs-address-wrapper">
						<div className="cs-field cs-address-group">
							<div className="cs-address-group-label">Mailing Address</div>
							<div className="cs-address-field">
								<label className="cs-label" htmlFor="address_line_1">
									Address Line 1 *
								</label>
								<input
									className="cs-input"
									type="text"
									id="address_line_1"
									required
									name="address_line_1"
									value={values["address_line_1"] || ""}
									onChange={(e) =>
										handleChange("address_line_1", e.target.value)
									}
									placeholder="Address Line 1"
								/>
							</div>
							<div className="cs-address-field">
								<label className="cs-label" htmlFor="address_line_2">
									Address Line 2
								</label>
								<input
									className="cs-input"
									type="text"
									id="address_line_2"
									name="address_line_2"
									value={values["address_line_2"] || ""}
									onChange={(e) =>
										handleChange("address_line_2", e.target.value)
									}
									placeholder="Address Line 2"
								/>
							</div>
							<div className="cs-address-field">
								<label className="cs-label" htmlFor="city">
									City *
								</label>
								<input
									className="cs-input"
									type="text"
									id="city"
									required
									name="city"
									value={values["city"] || ""}
									onChange={(e) => handleChange("city", e.target.value)}
									placeholder="City"
								/>
							</div>
							<div className="cs-address-field">
								<label className="cs-label" htmlFor="state">
									State *
								</label>
								<input
									className="cs-input"
									type="text"
									id="state"
									required
									name="state"
									value={values["state"] || ""}
									onChange={(e) => handleChange("state", e.target.value)}
									placeholder="State"
								/>
							</div>
							<div className="cs-address-field">
								<label className="cs-label" htmlFor="zip">
									Zip Code *
								</label>
								<input
									className="cs-input"
									type="text"
									id="zip"
									required
									name="zip"
									value={values["zip"] || ""}
									onChange={(e) => handleChange("zip", e.target.value)}
									placeholder="Zip"
								/>
							</div>
						</div>
					</div>
				)}
				{values["input_radio"] === "no" && (
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_11">
							Phone Number *
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text_11"
							name="input_text_11"
							required
							value={values["input_text_11"] || ""}
							onChange={(e) => handleChange("input_text_11", e.target.value)}
						/>
					</div>
				)}
				{values["input_radio"] === "no" && (
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_10">
							Email Address *
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text_10"
							name="input_text_10"
							required
							value={values["input_text_10"] || ""}
							onChange={(e) => handleChange("input_text_10", e.target.value)}
						/>
					</div>
				)}
				{values["input_radio"] === "no" && (
					<div className="cs-field cs-textarea">
						<label className="cs-label" htmlFor="description_22">
							Please provide any additional information
						</label>
						<textarea
							className="cs-textarea"
							id="description_22"
							name="description_22"
							rows={3}
							value={values["description_22"] || ""}
							onChange={(e) => handleChange("description_22", e.target.value)}
						/>
					</div>
				)}
				{values["input_radio"] === "no" && (
					<div className="cs-field cs-radio-group">
						<fieldset className="cs-field cs-radio">
							<legend className="cs-label">
								Should all camp correspondence be sent to this address or
								parent/guardian?
							</legend>
							<div className="cs-radio-item">
								<input
									id="input_radio_7_0"
									type="radio"
									name="input_radio_7"
									value="Address above"
									checked={values["input_radio_7"] === "Address above"}
									onChange={(e) =>
										handleChange("input_radio_7", e.target.value)
									}
								/>
								<label htmlFor="input_radio_7_0">Address above</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="input_radio_7_1"
									type="radio"
									name="input_radio_7"
									value="Parent/Guardian"
									checked={values["input_radio_7"] === "Parent/Guardian"}
									onChange={(e) =>
										handleChange("input_radio_7", e.target.value)
									}
								/>
								<label htmlFor="input_radio_7_1">Parent/Guardian</label>
							</div>
						</fieldset>
					</div>
				)}
				{values["input_radio"] === "yes" && (
					<div className="cs-field-wrapper">
						<div className="cs-field cs-name-wrapper">
							<div className="cs-field cs-name-group">
								<div className="cs-name-group-label">
									First and Last Name(s) for Parent/Guardian(s)
								</div>
								<div className="cs-name-field">
									<label className="cs-label" htmlFor="first_name_pg1">
										First Name for Parent/Guardian #1 *
									</label>
									<input
										className="cs-input"
										type="text"
										id="first_name_pg1"
										required
										name="first_name_pg1"
										value={values["first_name_pg1"] || ""}
										onChange={(e) =>
											handleChange("first_name_pg1", e.target.value)
										}
										placeholder="First Name"
									/>
								</div>
								<div className="cs-name-field">
									<label className="cs-label" htmlFor="last_name_pg1">
										Last Name for Parent/Guardian #1 *
									</label>
									<input
										className="cs-input"
										type="text"
										required
										id="last_name_pg1"
										name="last_name_pg1"
										value={values["last_name_pg1"] || ""}
										onChange={(e) =>
											handleChange("last_name_pg1", e.target.value)
										}
										placeholder="Last Name"
									/>
								</div>
							</div>
						</div>
					</div>
				)}
				{values["input_radio"] === "yes" && (
					<div className="cs-field-wrapper">
						<div className="cs-field cs-name-wrapper">
							<div className="cs-field cs-name-group">
								<div className="cs-name-field">
									<label className="cs-label" htmlFor="first_name_pg2">
										First Name for Parent/Guardian #2
									</label>
									<input
										className="cs-input"
										type="text"
										id="first_name_pg2"
										name="first_name_pg2"
										value={values["first_name_pg2"] || ""}
										onChange={(e) =>
											handleChange("first_name_pg2", e.target.value)
										}
										placeholder="First Name"
									/>
								</div>
								<div className="cs-name-field">
									<label className="cs-label" htmlFor="last_name_pg2">
										Last Name for Parent/Guardian #2
									</label>
									<input
										className="cs-input"
										type="text"
										id="last_name_pg2"
										name="last_name_pg2"
										value={values["last_name_pg2"] || ""}
										onChange={(e) =>
											handleChange("last_name_pg2", e.target.value)
										}
										placeholder="Last Name"
									/>
								</div>
							</div>
						</div>
					</div>
				)}
				{values["input_radio"] === "yes" && (
					<div className="cs-field-wrapper">
						<div className="cs-field cs-address-wrapper">
							<div className="cs-field cs-address-group">
								<div className="cs-address-group-label">
									Parent/Guardian's Mailing Address
								</div>
								<div className="cs-address-field">
									<label className="cs-label" htmlFor="street_address_8_1">
										Street Address *
									</label>
									<input
										className="cs-input"
										type="text"
										id="street_address_8_1"
										required
										name="street_address_8_1"
										value={values["street_address_8_1"] || ""}
										onChange={(e) =>
											handleChange("street_address_8_1", e.target.value)
										}
										placeholder="Address Line 1"
									/>
								</div>
								<div className="cs-address-field">
									<label className="cs-label" htmlFor="address_line_2_8_2">
										Address Line 2
									</label>
									<input
										className="cs-input"
										type="text"
										id="address_line_2_8_2"
										name="address_line_2_8_2"
										value={values["address_line_2_8_2"] || ""}
										onChange={(e) =>
											handleChange("address_line_2_8_2", e.target.value)
										}
										placeholder="Address Line 2"
									/>
								</div>
								<div className="cs-address-field">
									<label className="cs-label" htmlFor="city_8_3">
										City *
									</label>
									<input
										className="cs-input"
										type="text"
										id="city_8_3"
										required
										name="city_8_3"
										value={values["city_8_3"] || ""}
										onChange={(e) => handleChange("city_8_3", e.target.value)}
										placeholder="City"
									/>
								</div>
								<div className="cs-address-field">
									<label className="cs-label" htmlFor="state_province_8_4">
										State / Province *
									</label>
									<input
										className="cs-input"
										type="text"
										id="state_province_8_4"
										name="state_province_8_4"
										required
										value={values["state_province_8_4"] || ""}
										onChange={(e) =>
											handleChange("state_province_8_4", e.target.value)
										}
										placeholder="State"
									/>
								</div>
								<div className="cs-address-field">
									<label className="cs-label" htmlFor="zip_postal_code_8_5">
										ZIP / Postal Code *
									</label>
									<input
										className="cs-input"
										type="text"
										id="zip_postal_code_8_5"
										required
										name="zip_postal_code_8_5"
										value={values["zip_postal_code_8_5"] || ""}
										onChange={(e) =>
											handleChange("zip_postal_code_8_5", e.target.value)
										}
										placeholder="Zip"
									/>
								</div>
							</div>
						</div>
					</div>
				)}
				<div className="cs-field-wrapper">
					<div className="cs-field cs-radio-group">
						<fieldset className="cs-field cs-radio">
							<legend className="cs-label">
								Camper’s T-shirt size (all campers will receive a shirt as part
								of registration) *
							</legend>
							<div className="cs-radio-item">
								<input
									required
									id="input_radio_1_0"
									type="radio"
									name="input_radio_1"
									value="Adult Small"
									checked={values["input_radio_1"] === "Adult Small"}
									onChange={(e) =>
										handleChange("input_radio_1", e.target.value)
									}
								/>
								<label htmlFor="input_radio_1_0">Adult Small</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="input_radio_1_1"
									type="radio"
									name="input_radio_1"
									value="Adult Medium"
									checked={values["input_radio_1"] === "Adult Medium"}
									onChange={(e) =>
										handleChange("input_radio_1", e.target.value)
									}
								/>
								<label htmlFor="input_radio_1_1">Adult Medium</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="input_radio_1_2"
									type="radio"
									name="input_radio_1"
									value="Adult Large"
									checked={values["input_radio_1"] === "Adult Large"}
									onChange={(e) =>
										handleChange("input_radio_1", e.target.value)
									}
								/>
								<label htmlFor="input_radio_1_2">Adult Large</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="input_radio_1_3"
									type="radio"
									name="input_radio_1"
									value="Adult XL"
									checked={values["input_radio_1"] === "Adult XL"}
									onChange={(e) =>
										handleChange("input_radio_1", e.target.value)
									}
								/>
								<label htmlFor="input_radio_1_3">Adult XL</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="input_radio_1_4"
									type="radio"
									name="input_radio_1"
									value="Adult 2X"
									checked={values["input_radio_1"] === "Adult 2X"}
									onChange={(e) =>
										handleChange("input_radio_1", e.target.value)
									}
								/>
								<label htmlFor="input_radio_1_4">Adult 2X</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="input_radio_1_5"
									type="radio"
									name="input_radio_1"
									value="Adult 3X"
									checked={values["input_radio_1"] === "Adult 3X"}
									onChange={(e) =>
										handleChange("input_radio_1", e.target.value)
									}
								/>
								<label htmlFor="input_radio_1_5">Adult 3X</label>
							</div>
						</fieldset>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-radio-group">
						<fieldset className="cs-field cs-radio">
							<legend className="cs-label">
								Has the camper attended Lions Camp Horizon previously: *
							</legend>
							<div className="cs-radio-item">
								<input
									id="input_radio_2_0"
									type="radio"
									name="input_radio_2"
									required
									value="yes"
									checked={values["input_radio_2"] === "yes"}
									onChange={(e) =>
										handleChange("input_radio_2", e.target.value)
									}
								/>
								<label htmlFor="input_radio_2_0">Yes</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="input_radio_2_1"
									type="radio"
									name="input_radio_2"
									value="no"
									checked={values["input_radio_2"] === "no"}
									onChange={(e) =>
										handleChange("input_radio_2", e.target.value)
									}
								/>
								<label htmlFor="input_radio_2_1">No</label>
							</div>
						</fieldset>
					</div>
				</div>
				{values["input_radio_2"] === "yes" && (
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text">
							If so, please advise the last year of participation:
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text"
							name="input_text"
							value={values["input_text"] || ""}
							onChange={(e) => handleChange("input_text", e.target.value)}
						/>
					</div>
				)}
				{values["input_radio_2"] === "no" && (
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_20">
							How did you hear about Lions Camp?
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text_20"
							name="input_text_20"
							value={values["input_text_20"] || ""}
							onChange={(e) => handleChange("input_text_20", e.target.value)}
						/>
					</div>
				)}
				<div className="cs-field-wrapper">
					<div className="cs-field cs-radio-group">
						<fieldset className="cs-field cs-radio">
							<legend className="cs-label">
								Has camper previously attended a different overnight/residential
								camp? *
							</legend>
							<div className="cs-radio-item">
								<input
									id="input_radio_3_0"
									type="radio"
									name="input_radio_3"
									required
									value="yes"
									checked={values["input_radio_3"] === "yes"}
									onChange={(e) =>
										handleChange("input_radio_3", e.target.value)
									}
								/>
								<label htmlFor="input_radio_3_0">Yes</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="input_radio_3_1"
									type="radio"
									name="input_radio_3"
									value="no"
									checked={values["input_radio_3"] === "no"}
									onChange={(e) =>
										handleChange("input_radio_3", e.target.value)
									}
								/>
								<label htmlFor="input_radio_3_1">No</label>
							</div>
						</fieldset>
					</div>
				</div>
				{values["input_radio_3"] === "yes" && (
					<div className="cs-field cs-textarea">
						<label className="cs-label" htmlFor="description">
							If your camper is new to Camp Horizon and participated at another
							overnight camp, please advise the name and location of the camp
							and how your camper handled being away from home:
						</label>
						<textarea
							className="cs-textarea"
							id="description"
							name="description"
							rows={3}
							value={values["description"] || ""}
							onChange={(e) => handleChange("description", e.target.value)}
						/>
					</div>
				)}
				<div className="cs-field-wrapper">
					<hr className="cs-step-separator" />
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset className="cs-field cs-checkbox">
							<legend className="cs-label">
								Please select ALL session dates your camper is available to
								attend camp. We will prioritize your 1 st and 2 nd choice but
								may need to look at other date options if those are not
								available. Please note Adventure Camp is subject to eligibility
								requirements. First time campers must attend Base Camp. *
							</legend>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_0"
									type="checkbox"
									name="checkbox"
									value="Adventure Camp 1 - July 6-10"
									checked={
										Array.isArray(values["checkbox"]) &&
										values["checkbox"].includes("Adventure Camp 1 - July 6-10*")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox",
											"Adventure Camp 1 - July 6-10*",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_0">
									Adventure Camp 1 - July 6-10*
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_1"
									type="checkbox"
									name="checkbox"
									value="Base Camp 1 - July 13-17"
									checked={
										Array.isArray(values["checkbox"]) &&
										values["checkbox"].includes("Base Camp 1 - July 13-17")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox",
											"Base Camp 1 - July 13-17",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_1">Base Camp 1 - July 13-17</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_2"
									type="checkbox"
									name="checkbox"
									value="Base Camp 2 - July 20-24"
									checked={
										Array.isArray(values["checkbox"]) &&
										values["checkbox"].includes("Base Camp 2 - July 20-24")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox",
											"Base Camp 2 - July 20-24",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_2">Base Camp 2 - July 20-24</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_3"
									type="checkbox"
									name="checkbox"
									value="Adventure Camp 2 - August 3-7*"
									checked={
										Array.isArray(values["checkbox"]) &&
										values["checkbox"].includes(
											"Adventure Camp 2 - August 3-7*"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox",
											"Adventure Camp 2 - August 3-7*",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_3">
									Adventure Camp 2 - August 3-7*
								</label>
							</div>
						</fieldset>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-unknown">
						<label className="cs-label" htmlFor="first_choice_199">
							First Choice:
						</label>
						<input
							className="cs-input"
							type="text"
							id="first_choice_199"
							name="first_choice_199"
							value={values["first_choice_199"] || ""}
							onChange={(e) => handleChange("first_choice_199", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-unknown">
						<label className="cs-label" htmlFor="second_choice_200">
							Second Choice:
						</label>
						<input
							className="cs-input"
							type="text"
							id="second_choice_200"
							name="second_choice_200"
							value={values["second_choice_200"] || ""}
							onChange={(e) =>
								handleChange("second_choice_200", e.target.value)
							}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_1">
							How many sessions would you like your camper to attend? *
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text_1"
							required
							name="input_text_1"
							value={values["input_text_1"] || ""}
							onChange={(e) => handleChange("input_text_1", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								'<p><span style="font-weight: 400;">Note: Our goal is to provide as many individuals as possible the opportunity to attend a camp session. Space is limited but we will make every effort to fulfill your request for multiple sessions.</span></p>',
						}}
					/>
				</div>
				<div className="cs-field-wrapper">
					<hr className="cs-step-separator" />
				</div>
				<div className="cs-field-wrapper">
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								'<p><b>Registration Deposits:\u00a0</b></p>\n<p><b>A $50.00 non-refundable deposit is required of private-pay campers for each session requested.</b> <b>The deposit is</b> <b><i>not</i></b> <b><i>required</i></b> <b>of campers using DSHS/DDA funding.</b><span style="font-weight: 400;">\u00a0 Campers using DSHS/DDA funding must have respite hours and payment pre-approved by their Case Manager before we will hold session dates.\u00a0 We will submit a pre-authorization request to DSHS/DDA but it is the Parent/Guardian\u2019s responsibility to follow-up and ensure we receive it within 14 business days of the request. </span></p>',
						}}
					/>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-radio-group">
						<fieldset className="cs-field cs-radio">
							<legend className="cs-label">
								Camp Session Payment Method: *
							</legend>
							<div className="cs-radio-item">
								<input
									id="input_radio_5_0"
									type="radio"
									name="input_radio_5"
									value="Private Pay"
									required
									checked={values["input_radio_5"] === "Private Pay"}
									onChange={(e) =>
										handleChange("input_radio_5", e.target.value)
									}
								/>
								<label htmlFor="input_radio_5_0">Private Pay</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="input_radio_5_1"
									type="radio"
									name="input_radio_5"
									value="Respite Benefits – DSHS/DDA"
									checked={
										values["input_radio_5"] === "Respite Benefits – DSHS/DDA"
									}
									onChange={(e) =>
										handleChange("input_radio_5", e.target.value)
									}
								/>
								<label htmlFor="input_radio_5_1">
									Respite Benefits – DSHS/DDA
								</label>
							</div>
						</fieldset>
					</div>
				</div>
				{values["input_radio_5"] === "Private Pay" && (
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								"<p><b>Please provide information for the person responsible for paying.</b></p>",
						}}
					/>
				)}
				{values["input_radio_5"] === "Private Pay" && (
					<div className="cs-field cs-name-wrapper">
						<div className="cs-field cs-name-group">
							<div className="cs-name-group-label">Name</div>
							<div className="cs-name-field">
								<label className="cs-label" htmlFor="payer_first_name">
									First Name *
								</label>
								<input
									className="cs-input"
									type="text"
									id="payer_first_name"
									required
									name="payer_first_name"
									value={values["payer_first_name"] || ""}
									onChange={(e) =>
										handleChange("payer_first_name", e.target.value)
									}
									placeholder="First Name"
								/>
							</div>
							<div className="cs-name-field">
								<label className="cs-label" htmlFor="payer_last_name">
									Last Name *
								</label>
								<input
									className="cs-input"
									type="text"
									id="payer_last_name"
									required
									name="payer_last_name"
									value={values["payer_last_name"] || ""}
									onChange={(e) =>
										handleChange("payer_last_name", e.target.value)
									}
									placeholder="Last Name"
								/>
							</div>
						</div>
					</div>
				)}
				{values["input_radio_5"] === "Private Pay" && (
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_15">
							Email Address *
						</label>
						<input
							className="cs-input"
							type="text"
							required
							id="input_text_15"
							name="input_text_15"
							value={values["input_text_15"] || ""}
							onChange={(e) => handleChange("input_text_15", e.target.value)}
						/>
					</div>
				)}
				{values["input_radio_5"] === "Private Pay" && (
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_13">
							Phone number *
						</label>
						<input
							className="cs-input"
							type="text"
							required
							id="input_text_13"
							name="input_text_13"
							value={values["input_text_13"] || ""}
							onChange={(e) => handleChange("input_text_13", e.target.value)}
						/>
					</div>
				)}
				{values["input_radio_5"] === "Respite Benefits – DSHS/DDA" && (
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								"<p><strong>Please provide your Case Manager's information below.<br /><br />Note: Your Case Manager\u2019s e-mail address is required for securing your camper\u2019s pre-authorizations. Applications cannot be processed without the Case Manager\u2019s valid email address.</strong></p>",
						}}
					/>
				)}
				{values["input_radio_5"] === "Respite Benefits – DSHS/DDA" && (
					<div className="cs-field cs-name-wrapper">
						<div className="cs-field cs-name-group">
							<div className="cs-name-group-label">Name</div>
							<div className="cs-name-field">
								<label className="cs-label" htmlFor="first_name">
									First Name *
								</label>
								<input
									className="cs-input"
									type="text"
									id="first_name"
									name="first_name"
									required
									value={values["first_name"] || ""}
									onChange={(e) => handleChange("first_name", e.target.value)}
									placeholder="First Name"
								/>
							</div>
							<div className="cs-name-field">
								<label className="cs-label" htmlFor="last_name">
									Last Name *
								</label>
								<input
									className="cs-input"
									type="text"
									id="last_name"
									required
									name="last_name"
									value={values["last_name"] || ""}
									onChange={(e) => handleChange("last_name", e.target.value)}
									placeholder="Last Name"
								/>
							</div>
						</div>
					</div>
				)}
				{values["input_radio_5"] === "Respite Benefits – DSHS/DDA" && (
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_12">
							Email Address *
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text_12"
							name="input_text_12"
							required
							value={values["input_text_12"] || ""}
							onChange={(e) => handleChange("input_text_12", e.target.value)}
						/>
					</div>
				)}
				{values["input_radio_5"] === "Respite Benefits – DSHS/DDA" && (
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_16">
							Phone number *
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text_16"
							required
							name="input_text_16"
							value={values["input_text_16"] || ""}
							onChange={(e) => handleChange("input_text_16", e.target.value)}
						/>
					</div>
				)}
				<div className="cs-field-wrapper">
					<h2 className="cs-section-title">Emergency Contact Information</h2>
					<div className="cs-section-description">
						<p>
							If you will not be available via phone for questions regarding
							behaviors, illness, dietary restrictions, etc., or if you
							<br />
							will not be available to come pick up your camper due to illness,
							behaviors, or emergency, please provide the name and contact
							information for the person we should contact and/or release your
							camper to. This person will also be contacted if we have made
							multiple attempts to reach you, but are unable to get in touch.
						</p>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="contact_1_name_20">
							Emergency Contact Name:
						</label>
						<input
							className="cs-input"
							type="text"
							id="contact_1_name_20"
							name="contact_1_name_20"
							value={values["contact_1_name_20"] || ""}
							onChange={(e) =>
								handleChange("contact_1_name_20", e.target.value)
							}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="contact_1_relationship_21">
							Emergency Contact Relationship:
						</label>
						<input
							className="cs-input"
							type="text"
							id="contact_1_relationship_21"
							name="contact_1_relationship_21"
							value={values["contact_1_relationship_21"] || ""}
							onChange={(e) =>
								handleChange("contact_1_relationship_21", e.target.value)
							}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-unknown">
						<label className="cs-label" htmlFor="contact_1_cell_phone_23">
							Emergency Contact Cell Phone:
						</label>
						<input
							className="cs-input"
							type="text"
							id="contact_1_cell_phone_23"
							name="contact_1_cell_phone_23"
							autoComplete="off"
							value={values["contact_1_cell_phone_23"] || ""}
							onChange={(e) =>
								handleChange("contact_1_cell_phone_23", e.target.value)
							}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{ __html: "<hr />" }}
					/>
				</div>
				<div className="cs-field-wrapper">
					<hr className="cs-step-separator" />
				</div>
				<div className="cs-field-wrapper">
					<h2 className="cs-section-title">Personal Information</h2>
					<div className="cs-section-description">
						<p>
							It is crucial that the information provided below is accurate and
							as detailed as possible. This ensures your camper, and our staff,
							have everything they need for a safe and enjoyable camp
							experience. If there is anything we should know that isn't
							addressed in the following questions, please add notes or contact
							us at acd@lionscamphorizon.org
						</p>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset className="cs-field cs-checkbox">
							<legend className="cs-label">
								Mobility (select all that apply) *
							</legend>
							<div className="cs-checkbox-item">
								<input
									id="mobility_36_0"
									type="checkbox"
									name="mobility_36"
									value="Walks/runs independently"
									checked={
										Array.isArray(values["mobility_36"]) &&
										values["mobility_36"].includes("Walks/runs independently")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"mobility_36",
											"Walks/runs independently",
											e.target.checked
										)
									}
								/>
								<label htmlFor="mobility_36_0">Walks/runs independently</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="mobility_36_1"
									type="checkbox"
									name="mobility_36"
									value="Needs assistance walking/running"
									checked={
										Array.isArray(values["mobility_36"]) &&
										values["mobility_36"].includes(
											"Needs assistance walking/running"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"mobility_36",
											"Needs assistance walking/running",
											e.target.checked
										)
									}
								/>
								<label htmlFor="mobility_36_1">
									Needs assistance walking/running
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="mobility_36_2"
									type="checkbox"
									name="mobility_36"
									value="Needs assistance with steps"
									checked={
										Array.isArray(values["mobility_36"]) &&
										values["mobility_36"].includes(
											"Needs assistance with steps"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"mobility_36",
											"Needs assistance with steps",
											e.target.checked
										)
									}
								/>
								<label htmlFor="mobility_36_2">
									Needs assistance with steps
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="mobility_36_3"
									type="checkbox"
									name="mobility_36"
									value="Uses a cane"
									checked={
										Array.isArray(values["mobility_36"]) &&
										values["mobility_36"].includes("Uses a cane")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"mobility_36",
											"Uses a cane",
											e.target.checked
										)
									}
								/>
								<label htmlFor="mobility_36_3">Uses a cane</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="mobility_36_4"
									type="checkbox"
									name="mobility_36"
									value="Uses a walker"
									checked={
										Array.isArray(values["mobility_36"]) &&
										values["mobility_36"].includes("Uses a walker")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"mobility_36",
											"Uses a walker",
											e.target.checked
										)
									}
								/>
								<label htmlFor="mobility_36_4">Uses a walker</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="mobility_36_5"
									type="checkbox"
									name="mobility_36"
									value="Uses a manual wheelchair"
									checked={
										Array.isArray(values["mobility_36"]) &&
										values["mobility_36"].includes("Uses a manual wheelchair")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"mobility_36",
											"Uses a manual wheelchair",
											e.target.checked
										)
									}
								/>
								<label htmlFor="mobility_36_5">Uses a manual wheelchair</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="mobility_36_6"
									type="checkbox"
									name="mobility_36"
									value="Uses a motorized wheelchair"
									checked={
										Array.isArray(values["mobility_36"]) &&
										values["mobility_36"].includes(
											"Uses a motorized wheelchair"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"mobility_36",
											"Uses a motorized wheelchair",
											e.target.checked
										)
									}
								/>
								<label htmlFor="mobility_36_6">
									Uses a motorized wheelchair
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="mobility_36_7"
									type="checkbox"
									name="mobility_36"
									value="Wears AFO’s or braces on legs"
									checked={
										Array.isArray(values["mobility_36"]) &&
										values["mobility_36"].includes(
											"Wears AFO’s or braces on legs"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"mobility_36",
											"Wears AFO’s or braces on legs",
											e.target.checked
										)
									}
								/>
								<label htmlFor="mobility_36_7">
									Wears AFO’s or braces on legs
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="mobility_36_8"
									type="checkbox"
									name="mobility_36"
									value="Requires a gait belt"
									checked={
										Array.isArray(values["mobility_36"]) &&
										values["mobility_36"].includes("Requires a gait belt")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"mobility_36",
											"Requires a gait belt",
											e.target.checked
										)
									}
								/>
								<label htmlFor="mobility_36_8">Requires a gait belt</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="mobility_36_9"
									type="checkbox"
									name="mobility_36"
									value="Prone to falling"
									checked={
										Array.isArray(values["mobility_36"]) &&
										values["mobility_36"].includes("Prone to falling")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"mobility_36",
											"Prone to falling",
											e.target.checked
										)
									}
								/>
								<label htmlFor="mobility_36_9">Prone to falling</label>
							</div>
						</fieldset>
					</div>
				</div>
				{Array.isArray(values["mobility_36"]) &&
					values["mobility_36"].includes(
						"Needs assistance walking/running"
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_10">
								Please provide more details about "Needs assistance
								walking/running." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_10"
								name="description_10"
								rows={3}
								required
								value={values["description_10"] || ""}
								onChange={(e) => handleChange("description_10", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["mobility_36"]) &&
					values["mobility_36"].includes("Wears AFO’s or braces on legs") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_23">
								Please provide more details about "Wears AFO's or braces on
								legs." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_23"
								name="description_23"
								required
								rows={3}
								value={values["description_23"] || ""}
								onChange={(e) => handleChange("description_23", e.target.value)}
							/>
						</div>
					)}
				{(Array.isArray(values["mobility_36"]) &&
					values["mobility_36"].includes("Uses a manual wheelchair")) ||
					(Array.isArray(values["mobility_36"]) &&
						values["mobility_36"].includes("Uses a motorized wheelshair") && (
							<div className="cs-field cs-textarea">
								<label
									className="cs-label"
									htmlFor="if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_38"
								>
									Please describe transfer process and level of assistance
									needed. *
								</label>
								<textarea
									className="cs-textarea"
									id="if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_38"
									name="if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_38"
									rows={3}
									required
									value={
										values[
											"if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_38"
										] || ""
									}
									onChange={(e) =>
										handleChange(
											"if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_38",
											e.target.value
										)
									}
								/>
							</div>
						))}
				{Array.isArray(values["mobility_36"]) &&
					values["mobility_36"].includes("Requires a gait belt") && (
						<div className="cs-field cs-textarea">
							<label
								className="cs-label"
								htmlFor="if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_39"
							>
								Please provide more details about "Requires a gait belt." *
							</label>
							<textarea
								className="cs-textarea"
								id="if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_39"
								name="if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_39"
								required
								rows={3}
								value={
									values[
										"if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_39"
									] || ""
								}
								onChange={(e) =>
									handleChange(
										"if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_39",
										e.target.value
									)
								}
							/>
						</div>
					)}
				{Array.isArray(values["mobility_36"]) &&
					values["mobility_36"].includes("Prone to falling") && (
						<div className="cs-field cs-textarea">
							<label
								className="cs-label"
								htmlFor="if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_40"
							>
								Please provide more details about "Prone to falling." *
							</label>
							<textarea
								className="cs-textarea"
								id="if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_40"
								required
								name="if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_40"
								rows={3}
								value={
									values[
										"if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_40"
									] || ""
								}
								onChange={(e) =>
									handleChange(
										"if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_40",
										e.target.value
									)
								}
							/>
						</div>
					)}
				<div className="cs-field-wrapper">
					<h2 className="cs-section-title">Activity Level</h2>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset className="cs-field cs-checkbox">
							<legend className="cs-label">
								Activity level (select all that apply) *
							</legend>
							<div className="cs-checkbox-item">
								<input
									id="describe_activity_participation_42_0"
									type="checkbox"
									name="describe_activity_participation_42"
									value="Has typical attention span"
									checked={
										Array.isArray(
											values["describe_activity_participation_42"]
										) &&
										values["describe_activity_participation_42"].includes(
											"Has typical attention span"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"describe_activity_participation_42",
											"Has typical attention span",
											e.target.checked
										)
									}
								/>
								<label htmlFor="describe_activity_participation_42_0">
									Has typical attention span
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="describe_activity_participation_42_1"
									type="checkbox"
									name="describe_activity_participation_42"
									value="Has short attention span"
									checked={
										Array.isArray(
											values["describe_activity_participation_42"]
										) &&
										values["describe_activity_participation_42"].includes(
											"Has short attention span"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"describe_activity_participation_42",
											"Has short attention span",
											e.target.checked
										)
									}
								/>
								<label htmlFor="describe_activity_participation_42_1">
									Has short attention span
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="describe_activity_participation_42_2"
									type="checkbox"
									name="describe_activity_participation_42"
									value="Easily distracted"
									checked={
										Array.isArray(
											values["describe_activity_participation_42"]
										) &&
										values["describe_activity_participation_42"].includes(
											"Easily distracted"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"describe_activity_participation_42",
											"Easily distracted",
											e.target.checked
										)
									}
								/>
								<label htmlFor="describe_activity_participation_42_2">
									Easily distracted
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="describe_activity_participation_42_3"
									type="checkbox"
									name="describe_activity_participation_42"
									value="Is hyperactive"
									checked={
										Array.isArray(
											values["describe_activity_participation_42"]
										) &&
										values["describe_activity_participation_42"].includes(
											"Is hyperactive"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"describe_activity_participation_42",
											"Is hyperactive",
											e.target.checked
										)
									}
								/>
								<label htmlFor="describe_activity_participation_42_3">
									Is hyperactive
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="describe_activity_participation_42_4"
									type="checkbox"
									name="describe_activity_participation_42"
									value="Will participate in most activities"
									checked={
										Array.isArray(
											values["describe_activity_participation_42"]
										) &&
										values["describe_activity_participation_42"].includes(
											"Will participate in most activities"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"describe_activity_participation_42",
											"Will participate in most activities",
											e.target.checked
										)
									}
								/>
								<label htmlFor="describe_activity_participation_42_4">
									Will participate in most activities
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="describe_activity_participation_42_5"
									type="checkbox"
									name="describe_activity_participation_42"
									value="Refuses to participate/ prefers to watch"
									checked={
										Array.isArray(
											values["describe_activity_participation_42"]
										) &&
										values["describe_activity_participation_42"].includes(
											"Refuses to participate/ prefers to watch"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"describe_activity_participation_42",
											"Refuses to participate/ prefers to watch",
											e.target.checked
										)
									}
								/>
								<label htmlFor="describe_activity_participation_42_5">
									Refuses to participate/ prefers to watch
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="describe_activity_participation_42_6"
									type="checkbox"
									name="describe_activity_participation_42"
									value="Is underactive (needs motivation)"
									checked={
										Array.isArray(
											values["describe_activity_participation_42"]
										) &&
										values["describe_activity_participation_42"].includes(
											"Is underactive (needs motivation)"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"describe_activity_participation_42",
											"Is underactive (needs motivation)",
											e.target.checked
										)
									}
								/>
								<label htmlFor="describe_activity_participation_42_6">
									Is underactive (needs motivation)
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="describe_activity_participation_42_7"
									type="checkbox"
									name="describe_activity_participation_42"
									value="Stays with group"
									checked={
										Array.isArray(
											values["describe_activity_participation_42"]
										) &&
										values["describe_activity_participation_42"].includes(
											"Stays with group"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"describe_activity_participation_42",
											"Stays with group",
											e.target.checked
										)
									}
								/>
								<label htmlFor="describe_activity_participation_42_7">
									Stays with group
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="describe_activity_participation_42_8"
									type="checkbox"
									name="describe_activity_participation_42"
									value="Wanders from group or is a “runner”"
									checked={
										Array.isArray(
											values["describe_activity_participation_42"]
										) &&
										values["describe_activity_participation_42"].includes(
											"Wanders from group or is a “runner”"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"describe_activity_participation_42",
											"Wanders from group or is a “runner”",
											e.target.checked
										)
									}
								/>
								<label htmlFor="describe_activity_participation_42_8">
									Wanders from group or is a “runner”
								</label>
							</div>
						</fieldset>
					</div>
				</div>
				{Array.isArray(values["describe_activity_participation_42"]) &&
					values["describe_activity_participation_42"].includes(
						"Has short attention span"
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_11">
								Please provide more details about "Has short attention span." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_11"
								name="description_11"
								required
								rows={3}
								value={values["description_11"] || ""}
								onChange={(e) => handleChange("description_11", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["describe_activity_participation_42"]) &&
					values["describe_activity_participation_42"].includes(
						"Easily distracted"
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_26">
								Please provide more details about "Easily distracted," and
								strategies to redirect. *
							</label>
							<textarea
								className="cs-textarea"
								id="description_26"
								required
								name="description_26"
								rows={3}
								value={values["description_26"] || ""}
								onChange={(e) => handleChange("description_26", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["describe_activity_participation_42"]) &&
					values["describe_activity_participation_42"].includes(
						"Is hyperactive"
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_27">
								Please provide more details about "Hyperactive," and strategies
								to redirect. *
							</label>
							<textarea
								className="cs-textarea"
								id="description_27"
								required
								name="description_27"
								rows={3}
								value={values["description_27"] || ""}
								onChange={(e) => handleChange("description_27", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["describe_activity_participation_42"]) &&
					values["describe_activity_participation_42"].includes(
						"Is underactive (needs motivation)"
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_25">
								Please provide more details about "Underactive (Needs
								Motivation)," and strategies to redirect. *
							</label>
							<textarea
								className="cs-textarea"
								id="description_25"
								required
								name="description_25"
								rows={3}
								value={values["description_25"] || ""}
								onChange={(e) => handleChange("description_25", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["describe_activity_participation_42"]) &&
					values["describe_activity_participation_42"].includes(
						"Wanders from group or is a “runner”"
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_24">
								Please provide more details about "Wanders from group or is a
								'runner,'" and strategies to redirect. *
							</label>
							<textarea
								className="cs-textarea"
								id="description_24"
								name="description_24"
								rows={3}
								required
								value={values["description_24"] || ""}
								onChange={(e) => handleChange("description_24", e.target.value)}
							/>
						</div>
					)}
				<div className="cs-field-wrapper">
					<div className="cs-field cs-textarea">
						<label
							className="cs-label"
							htmlFor="what_are_some_favorite_activities_45"
						>
							What are some favorite activities? *
						</label>
						<textarea
							className="cs-textarea"
							id="what_are_some_favorite_activities_45"
							name="what_are_some_favorite_activities_45"
							required
							rows={3}
							value={values["what_are_some_favorite_activities_45"] || ""}
							onChange={(e) =>
								handleChange(
									"what_are_some_favorite_activities_45",
									e.target.value
								)
							}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-textarea">
						<label
							className="cs-label"
							htmlFor="activities_your_camper_does_not_like_46"
						>
							What are some LEAST favorite activities? *
						</label>
						<textarea
							className="cs-textarea"
							id="activities_your_camper_does_not_like_46"
							name="activities_your_camper_does_not_like_46"
							required
							rows={3}
							value={values["activities_your_camper_does_not_like_46"] || ""}
							onChange={(e) =>
								handleChange(
									"activities_your_camper_does_not_like_46",
									e.target.value
								)
							}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset className="cs-field cs-checkbox">
							<legend className="cs-label">
								Please select any that your camper would be interested in:
							</legend>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_10_0"
									type="checkbox"
									name="checkbox_10"
									value="Relaxation/Spa"
									checked={
										Array.isArray(values["checkbox_10"]) &&
										values["checkbox_10"].includes("Relaxation/Spa")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_10",
											"Relaxation/Spa",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_10_0">Relaxation/Spa</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_10_1"
									type="checkbox"
									name="checkbox_10"
									value="Arts and crafts"
									checked={
										Array.isArray(values["checkbox_10"]) &&
										values["checkbox_10"].includes("Arts and crafts")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_10",
											"Arts and crafts",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_10_1">Arts and crafts</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_10_2"
									type="checkbox"
									name="checkbox_10"
									value="Sports"
									checked={
										Array.isArray(values["checkbox_10"]) &&
										values["checkbox_10"].includes("Sports")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_10",
											"Sports",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_10_2">Sports</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_10_3"
									type="checkbox"
									name="checkbox_10"
									value="Sensory play"
									checked={
										Array.isArray(values["checkbox_10"]) &&
										values["checkbox_10"].includes("Sensory play")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_10",
											"Sensory play",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_10_3">Sensory play</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_10_4"
									type="checkbox"
									name="checkbox_10"
									value="Science experiments"
									checked={
										Array.isArray(values["checkbox_10"]) &&
										values["checkbox_10"].includes("Science experiments")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_10",
											"Science experiments",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_10_4">Science experiments</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_10_5"
									type="checkbox"
									name="checkbox_10"
									value="Games (digital or classic)"
									checked={
										Array.isArray(values["checkbox_10"]) &&
										values["checkbox_10"].includes("Games (digital or classic)")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_10",
											"Games (digital or classic)",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_10_5">
									Games (digital or classic)
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_10_6"
									type="checkbox"
									name="checkbox_10"
									value="Movies"
									checked={
										Array.isArray(values["checkbox_10"]) &&
										values["checkbox_10"].includes("Movies")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_10",
											"Movies",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_10_6">Movies</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_10_7"
									type="checkbox"
									name="checkbox_10"
									value="Cooking/baking"
									checked={
										Array.isArray(values["checkbox_10"]) &&
										values["checkbox_10"].includes("Cooking/baking")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_10",
											"Cooking/baking",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_10_7">Cooking/baking</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_10_8"
									type="checkbox"
									name="checkbox_10"
									value="Exploring nature"
									checked={
										Array.isArray(values["checkbox_10"]) &&
										values["checkbox_10"].includes("Exploring nature")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_10",
											"Exploring nature",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_10_8">Exploring nature</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_10_9"
									type="checkbox"
									name="checkbox_10"
									value="Music"
									checked={
										Array.isArray(values["checkbox_10"]) &&
										values["checkbox_10"].includes("Music")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_10",
											"Music",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_10_9">Music</label>
							</div>
						</fieldset>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset className="cs-field cs-checkbox">
							<legend className="cs-label">
								Care Needs (select all that apply): *
							</legend>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_1_0"
									type="checkbox"
									name="checkbox_1"
									value="Has good fine motor skills"
									checked={
										Array.isArray(values["checkbox_1"]) &&
										values["checkbox_1"].includes("Has good fine motor skills")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_1",
											"Has good fine motor skills",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_1_0">Has good fine motor skills</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_1_1"
									type="checkbox"
									name="checkbox_1"
									value="Has poor fine motor skills"
									checked={
										Array.isArray(values["checkbox_1"]) &&
										values["checkbox_1"].includes("Has poor fine motor skills")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_1",
											"Has poor fine motor skills",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_1_1">Has poor fine motor skills</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_1_2"
									type="checkbox"
									name="checkbox_1"
									value="Needs hand over hand"
									checked={
										Array.isArray(values["checkbox_1"]) &&
										values["checkbox_1"].includes("Needs hand over hand")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_1",
											"Needs hand over hand",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_1_2">Needs hand over hand</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_1_3"
									type="checkbox"
									name="checkbox_1"
									value="Sensitive to loud noises"
									checked={
										Array.isArray(values["checkbox_1"]) &&
										values["checkbox_1"].includes("Sensitive to loud noises")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_1",
											"Sensitive to loud noises",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_1_3">Sensitive to loud noises</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_1_4"
									type="checkbox"
									name="checkbox_1"
									value="Sensitive to flashing/ twinkling lights or disco balls"
									checked={
										Array.isArray(values["checkbox_1"]) &&
										values["checkbox_1"].includes(
											"Sensitive to flashing/ twinkling lights or disco balls"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_1",
											"Sensitive to flashing/ twinkling lights or disco balls",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_1_4">
									Sensitive to flashing/ twinkling lights or disco balls
								</label>
							</div>
						</fieldset>
					</div>
				</div>
				{Array.isArray(values["checkbox_1"]) &&
					values["checkbox_1"].includes("Has poor fine motor skills") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_12">
								Please provide more details about "Has poor fine motor skills."
								*
							</label>
							<textarea
								className="cs-textarea"
								id="description_12"
								name="description_12"
								required
								rows={3}
								value={values["description_12"] || ""}
								onChange={(e) => handleChange("description_12", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_1"]) &&
					values["checkbox_1"].includes("Needs hand over hand") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_29">
								Please provide more details about "Needs hand over hand." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_29"
								required
								name="description_29"
								rows={3}
								value={values["description_29"] || ""}
								onChange={(e) => handleChange("description_29", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_1"]) &&
					values["checkbox_1"].includes("Sensitive to loud noises") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_28">
								Please provide more details about "Sensitive to loud noises."
								Please specify if they use headphones or earplugs. Include any
								additional details. *
							</label>
							<textarea
								className="cs-textarea"
								required
								id="description_28"
								name="description_28"
								rows={3}
								value={values["description_28"] || ""}
								onChange={(e) => handleChange("description_28", e.target.value)}
							/>
						</div>
					)}
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset className="cs-field cs-checkbox">
							<legend className="cs-label">
								Hygiene and personal care (select all that apply) *
							</legend>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_2_0"
									type="checkbox"
									name="checkbox_2"
									value="Uses toilet independently "
									checked={
										Array.isArray(values["checkbox_2"]) &&
										values["checkbox_2"].includes("Uses toilet independently ")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_2",
											"Uses toilet independently ",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_2_0">Uses toilet independently </label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_2_1"
									type="checkbox"
									name="checkbox_2"
									value="Uses a toilet on a schedule  "
									checked={
										Array.isArray(values["checkbox_2"]) &&
										values["checkbox_2"].includes(
											"Uses a toilet on a schedule  "
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_2",
											"Uses a toilet on a schedule  ",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_2_1">
									Uses a toilet on a schedule{" "}
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_2_2"
									type="checkbox"
									name="checkbox_2"
									value="Requires assistance using the toilet "
									checked={
										Array.isArray(values["checkbox_2"]) &&
										values["checkbox_2"].includes(
											"Requires assistance using the toilet "
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_2",
											"Requires assistance using the toilet ",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_2_2">
									Requires assistance using the toilet{" "}
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_2_3"
									type="checkbox"
									name="checkbox_2"
									value="Does not use toilet at all; uses incontinence briefs "
									checked={
										Array.isArray(values["checkbox_2"]) &&
										values["checkbox_2"].includes(
											"Does not use toilet at all; uses incontinence briefs "
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_2",
											"Does not use toilet at all; uses incontinence briefs ",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_2_3">
									Does not use toilet at all; uses incontinence briefs{" "}
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_2_4"
									type="checkbox"
									name="checkbox_2"
									value="Requires being woken at night to use the toilet"
									checked={
										Array.isArray(values["checkbox_2"]) &&
										values["checkbox_2"].includes(
											"Requires being woken at night to use the toilet"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_2",
											"Requires being woken at night to use the toilet",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_2_4">
									Requires being woken at night to use the toilet
								</label>
							</div>
						</fieldset>
					</div>
				</div>
				{(Array.isArray(values["checkbox_2"]) &&
					values["checkbox_2"].includes("Uses a toilet on a schedule  ")) ||
					(Array.isArray(values["checkbox_2"]) &&
						values["checkbox_2"].includes(
							"Requires being woken at night to use the toilet"
						) && (
							<div className="cs-field cs-textarea">
								<label className="cs-label" htmlFor="description_14">
									Please provide schedule/usual times. *
								</label>
								<textarea
									className="cs-textarea"
									id="description_14"
									name="description_14"
									required
									rows={3}
									value={values["description_14"] || ""}
									onChange={(e) =>
										handleChange("description_14", e.target.value)
									}
								/>
							</div>
						))}
				{Array.isArray(values["checkbox_2"]) &&
					values["checkbox_2"].includes(
						"Requires assistance using the toilet "
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_13">
								Please provide more details about "Requires assistance using the
								toilet." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_13"
								required
								name="description_13"
								rows={3}
								value={values["description_13"] || ""}
								onChange={(e) => handleChange("description_13", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_2"]) &&
					values["checkbox_2"].includes(
						"Does not use toilet at all; uses incontinence briefs "
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_30">
								Please provide more details about "Does not use a toilet. Uses
								incontinence briefs." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_30"
								name="description_30"
								required
								rows={3}
								value={values["description_30"] || ""}
								onChange={(e) => handleChange("description_30", e.target.value)}
							/>
						</div>
					)}
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset className="cs-field cs-checkbox">
							<legend className="cs-label">
								Showering (select all that apply) *
							</legend>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_3_0"
									type="checkbox"
									name="checkbox_3"
									value="Can shower independently"
									checked={
										Array.isArray(values["checkbox_3"]) &&
										values["checkbox_3"].includes("Can shower independently")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_3",
											"Can shower independently",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_3_0">Can shower independently</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_3_1"
									type="checkbox"
									name="checkbox_3"
									value="Needs assistance adjusting water"
									checked={
										Array.isArray(values["checkbox_3"]) &&
										values["checkbox_3"].includes(
											"Needs assistance adjusting water"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_3",
											"Needs assistance adjusting water",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_3_1">
									Needs assistance adjusting water
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_3_2"
									type="checkbox"
									name="checkbox_3"
									value="Needs verbal cues during shower"
									checked={
										Array.isArray(values["checkbox_3"]) &&
										values["checkbox_3"].includes(
											"Needs verbal cues during shower"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_3",
											"Needs verbal cues during shower",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_3_2">
									Needs verbal cues during shower
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_3_3"
									type="checkbox"
									name="checkbox_3"
									value="Needs assistance shampooing"
									checked={
										Array.isArray(values["checkbox_3"]) &&
										values["checkbox_3"].includes("Needs assistance shampooing")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_3",
											"Needs assistance shampooing",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_3_3">
									Needs assistance shampooing
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_3_4"
									type="checkbox"
									name="checkbox_3"
									value="Needs assistance soaping"
									checked={
										Array.isArray(values["checkbox_3"]) &&
										values["checkbox_3"].includes("Needs assistance soaping")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_3",
											"Needs assistance soaping",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_3_4">Needs assistance soaping</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_3_5"
									type="checkbox"
									name="checkbox_3"
									value="Needs shower chair or bench"
									checked={
										Array.isArray(values["checkbox_3"]) &&
										values["checkbox_3"].includes("Needs shower chair or bench")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_3",
											"Needs shower chair or bench",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_3_5">
									Needs shower chair or bench
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_3_6"
									type="checkbox"
									name="checkbox_3"
									value="Needs complete assistance in the shower"
									checked={
										Array.isArray(values["checkbox_3"]) &&
										values["checkbox_3"].includes(
											"Needs complete assistance in the shower"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_3",
											"Needs complete assistance in the shower",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_3_6">
									Needs complete assistance in the shower
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_3_7"
									type="checkbox"
									name="checkbox_3"
									value="Prefers evening shower"
									checked={
										Array.isArray(values["checkbox_3"]) &&
										values["checkbox_3"].includes("Prefers evening shower")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_3",
											"Prefers evening shower",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_3_7">Prefers evening shower</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_3_8"
									type="checkbox"
									name="checkbox_3"
									value="Prefers morning shower"
									checked={
										Array.isArray(values["checkbox_3"]) &&
										values["checkbox_3"].includes("Prefers morning shower")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_3",
											"Prefers morning shower",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_3_8">Prefers morning shower</label>
							</div>
						</fieldset>
					</div>
				</div>
				{Array.isArray(values["checkbox_3"]) &&
					values["checkbox_3"].includes("Needs verbal cues during shower") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_15">
								Please provide more details about "Needs verbal cues during
								shower." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_15"
								name="description_15"
								required
								rows={3}
								value={values["description_15"] || ""}
								onChange={(e) => handleChange("description_15", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_3"]) &&
					values["checkbox_3"].includes("Needs assistance shampooing") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_33">
								Please provide more details about "Needs assistance shampooing."
								*
							</label>
							<textarea
								className="cs-textarea"
								id="description_33"
								required
								name="description_33"
								rows={3}
								value={values["description_33"] || ""}
								onChange={(e) => handleChange("description_33", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_3"]) &&
					values["checkbox_3"].includes("Needs assistance soaping") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_32">
								Please provide more details about "Needs assistance with
								soaping." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_32"
								required
								name="description_32"
								rows={3}
								value={values["description_32"] || ""}
								onChange={(e) => handleChange("description_32", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_3"]) &&
					values["checkbox_3"].includes(
						"Needs complete assistance in the shower"
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_31">
								Please provide more details about "Needs complete assistance in
								the shower." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_31"
								name="description_31"
								rows={3}
								required
								value={values["description_31"] || ""}
								onChange={(e) => handleChange("description_31", e.target.value)}
							/>
						</div>
					)}
				<div className="cs-field-wrapper">
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_2">
							How frequently does your camper shower?
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text_2"
							name="input_text_2"
							value={values["input_text_2"] || ""}
							onChange={(e) => handleChange("input_text_2", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_3">
							Please provide any additional details to help with personal
							hygiene and toileting.
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text_3"
							name="input_text_3"
							value={values["input_text_3"] || ""}
							onChange={(e) => handleChange("input_text_3", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset className="cs-field cs-checkbox">
							<legend className="cs-label">
								Dressing (select all that apply) *
							</legend>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_4_0"
									type="checkbox"
									name="checkbox_4"
									value="Has no difficulty dressing"
									checked={
										Array.isArray(values["checkbox_4"]) &&
										values["checkbox_4"].includes("Has no difficulty dressing")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_4",
											"Has no difficulty dressing",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_4_0">Has no difficulty dressing</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_4_1"
									type="checkbox"
									name="checkbox_4"
									value="Needs some assistance with dressing/undressing"
									checked={
										Array.isArray(values["checkbox_4"]) &&
										values["checkbox_4"].includes(
											"Needs some assistance with dressing/undressing"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_4",
											"Needs some assistance with dressing/undressing",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_4_1">
									Needs some assistance with dressing/undressing
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_4_2"
									type="checkbox"
									name="checkbox_4"
									value="Needs total assistance with dressing/undressing"
									checked={
										Array.isArray(values["checkbox_4"]) &&
										values["checkbox_4"].includes(
											"Needs total assistance with dressing/undressing"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_4",
											"Needs total assistance with dressing/undressing",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_4_2">
									Needs total assistance with dressing/undressing
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_4_3"
									type="checkbox"
									name="checkbox_4"
									value="Needs assistance choosing clothes"
									checked={
										Array.isArray(values["checkbox_4"]) &&
										values["checkbox_4"].includes(
											"Needs assistance choosing clothes"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_4",
											"Needs assistance choosing clothes",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_4_3">
									Needs assistance choosing clothes
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_4_4"
									type="checkbox"
									name="checkbox_4"
									value="Needs assistance tying shoes"
									checked={
										Array.isArray(values["checkbox_4"]) &&
										values["checkbox_4"].includes(
											"Needs assistance tying shoes"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_4",
											"Needs assistance tying shoes",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_4_4">
									Needs assistance tying shoes
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_4_5"
									type="checkbox"
									name="checkbox_4"
									value="Needs assistance with buttons/snaps/zippers"
									checked={
										Array.isArray(values["checkbox_4"]) &&
										values["checkbox_4"].includes(
											"Needs assistance with buttons/snaps/zippers"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_4",
											"Needs assistance with buttons/snaps/zippers",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_4_5">
									Needs assistance with buttons/snaps/zippers
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_4_6"
									type="checkbox"
									name="checkbox_4"
									value="Needs assistance with belt"
									checked={
										Array.isArray(values["checkbox_4"]) &&
										values["checkbox_4"].includes("Needs assistance with belt")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_4",
											"Needs assistance with belt",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_4_6">Needs assistance with belt</label>
							</div>
						</fieldset>
					</div>
				</div>
				{Array.isArray(values["checkbox_4"]) &&
					values["checkbox_4"].includes(
						"Needs some assistance with dressing/undressing"
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_16">
								Please provide more details about "Needs some assistance with
								dressing/undressing." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_16"
								name="description_16"
								rows={3}
								required
								value={values["description_16"] || ""}
								onChange={(e) => handleChange("description_16", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_4"]) &&
					values["checkbox_4"].includes(
						"Needs total assistance with dressing/undressing"
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_35">
								Please provide more details about "Needs total assistance with
								dressing/undressing." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_35"
								name="description_35"
								required
								rows={3}
								value={values["description_35"] || ""}
								onChange={(e) => handleChange("description_35", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_4"]) &&
					values["checkbox_4"].includes(
						"Needs assistance choosing clothes"
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_73">
								Please provide more details about "Needs assistance choosing
								clothes." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_73"
								name="description_73"
								required
								rows={3}
								value={values["description_73"] || ""}
								onChange={(e) => handleChange("description_73", e.target.value)}
							/>
						</div>
					)}
				<div className="cs-field-wrapper">
					<div className="cs-field cs-textarea">
						<label className="cs-label" htmlFor="description_36">
							Please note any other dressing needs we should be aware of.
						</label>
						<textarea
							className="cs-textarea"
							id="description_36"
							name="description_36"
							rows={3}
							value={values["description_36"] || ""}
							onChange={(e) => handleChange("description_36", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset className="cs-field cs-checkbox">
							<legend className="cs-label">
								Sleep (select all that apply) *
							</legend>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_5_0"
									type="checkbox"
									name="checkbox_5"
									value="No sleep issues"
									checked={
										Array.isArray(values["checkbox_5"]) &&
										values["checkbox_5"].includes("No sleep issues")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_5",
											"No sleep issues",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_5_0">No sleep issues</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_5_1"
									type="checkbox"
									name="checkbox_5"
									value="Light Sleeper"
									checked={
										Array.isArray(values["checkbox_5"]) &&
										values["checkbox_5"].includes("Light Sleeper")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_5",
											"Light Sleeper",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_5_1">Light Sleeper</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_5_2"
									type="checkbox"
									name="checkbox_5"
									value="Heavy Sleeper"
									checked={
										Array.isArray(values["checkbox_5"]) &&
										values["checkbox_5"].includes("Heavy Sleeper")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_5",
											"Heavy Sleeper",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_5_2">Heavy Sleeper</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_5_3"
									type="checkbox"
									name="checkbox_5"
									value="Snores"
									checked={
										Array.isArray(values["checkbox_5"]) &&
										values["checkbox_5"].includes("Snores")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_5",
											"Snores",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_5_3">Snores</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_5_4"
									type="checkbox"
									name="checkbox_5"
									value="Uses CPAP or VPAP"
									checked={
										Array.isArray(values["checkbox_5"]) &&
										values["checkbox_5"].includes("Uses CPAP or VPAP")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_5",
											"Uses CPAP or VPAP",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_5_4">Uses CPAP or VPAP</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_5_5"
									type="checkbox"
									name="checkbox_5"
									value="Needs a night light"
									checked={
										Array.isArray(values["checkbox_5"]) &&
										values["checkbox_5"].includes("Needs a night light")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_5",
											"Needs a night light",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_5_5">Needs a night light</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_5_6"
									type="checkbox"
									name="checkbox_5"
									value="Sleep walks"
									checked={
										Array.isArray(values["checkbox_5"]) &&
										values["checkbox_5"].includes("Sleep walks")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_5",
											"Sleep walks",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_5_6">Sleep walks</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_5_7"
									type="checkbox"
									name="checkbox_5"
									value="Sings/cries at night"
									checked={
										Array.isArray(values["checkbox_5"]) &&
										values["checkbox_5"].includes("Sings/cries at night")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_5",
											"Sings/cries at night",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_5_7">Sings/cries at night</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_5_8"
									type="checkbox"
									name="checkbox_5"
									value="Needs to be woken up to use the toilet"
									checked={
										Array.isArray(values["checkbox_5"]) &&
										values["checkbox_5"].includes(
											"Needs to be woken up to use the toilet"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_5",
											"Needs to be woken up to use the toilet",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_5_8">
									Needs to be woken up to use the toilet
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_5_9"
									type="checkbox"
									name="checkbox_5"
									value="Needs bed checks for incontinence"
									checked={
										Array.isArray(values["checkbox_5"]) &&
										values["checkbox_5"].includes(
											"Needs bed checks for incontinence"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_5",
											"Needs bed checks for incontinence",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_5_9">
									Needs bed checks for incontinence
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_5_10"
									type="checkbox"
									name="checkbox_5"
									value="Has trouble falling asleep or staying asleep"
									checked={
										Array.isArray(values["checkbox_5"]) &&
										values["checkbox_5"].includes(
											"Has trouble falling asleep or staying asleep"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_5",
											"Has trouble falling asleep or staying asleep",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_5_10">
									Has trouble falling asleep or staying asleep
								</label>
							</div>
						</fieldset>
					</div>
				</div>
				{Array.isArray(values["checkbox_5"]) &&
					values["checkbox_5"].includes("Uses CPAP or VPAP") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_17">
								Please provide more details about "Uses CPAP or VPAP." Do they
								need assistance with this? *
							</label>
							<textarea
								className="cs-textarea"
								id="description_17"
								requiredname="description_17"
								rows={3}
								value={values["description_17"] || ""}
								onChange={(e) => handleChange("description_17", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_5"]) &&
					values["checkbox_5"].includes("Sleep walks") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_40">
								Please provide more details and/or strategies used for "Sleep
								walks." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_40"
								name="description_40"
								required
								rows={3}
								value={values["description_40"] || ""}
								onChange={(e) => handleChange("description_40", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_5"]) &&
					values["checkbox_5"].includes("Sings/cries at night") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_39">
								Please provide more details and/or strategies used for
								"Sings/cries at night." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_39"
								required
								name="description_39"
								rows={3}
								value={values["description_39"] || ""}
								onChange={(e) => handleChange("description_39", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_5"]) &&
					values["checkbox_5"].includes(
						"Needs to be woken up to use the toilet"
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_38">
								Please provide more details about "Needs to be woken up to use
								the toilet." *
							</label>
							<textarea
								className="cs-textarea"
								required
								id="description_38"
								name="description_38"
								rows={3}
								value={values["description_38"] || ""}
								onChange={(e) => handleChange("description_38", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_5"]) &&
					values["checkbox_5"].includes(
						"Needs to be woken up to use the toilet"
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_37">
								Please provide more details about "Needs bed checks for
								incontinence." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_37"
								required
								name="description_37"
								rows={3}
								value={values["description_37"] || ""}
								onChange={(e) => handleChange("description_37", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_5"]) &&
					values["checkbox_5"].includes(
						"Has trouble falling asleep or staying asleep"
					) && (
						<div className="cs-field cs-text">
							<label className="cs-label" htmlFor="input_text_4">
								Please provide more details about "Has trouble falling asleep or
								staying asleep." *
							</label>
							<input
								className="cs-input"
								type="text"
								required
								id="input_text_4"
								name="input_text_4"
								value={values["input_text_4"] || ""}
								onChange={(e) => handleChange("input_text_4", e.target.value)}
							/>
						</div>
					)}
				<div className="cs-field-wrapper">
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_19">
							Please provide usual bedtime and usual wake-up time: *
						</label>
						<input
							className="cs-input"
							type="text"
							required
							id="input_text_19"
							name="input_text_19"
							value={values["input_text_19"] || ""}
							onChange={(e) => handleChange("input_text_19", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_5">
							Please provide any schedule or other information that may be
							helpful with camper's night routine.{" "}
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text_5"
							name="input_text_5"
							value={values["input_text_5"] || ""}
							onChange={(e) => handleChange("input_text_5", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset className="cs-field cs-checkbox">
							<legend className="cs-label">
								Communication (Select all that apply) *
							</legend>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_0"
									type="checkbox"
									name="checkbox_6"
									value="Verbal - no communication issues"
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes(
											"Verbal - no communication issues"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_6",
											"Verbal - no communication issues",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_6_0">
									Verbal - no communication issues
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_1"
									type="checkbox"
									name="checkbox_6"
									value="Uses only single words"
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes("Uses only single words")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_6",
											"Uses only single words",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_6_1">Uses only single words</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_2"
									type="checkbox"
									name="checkbox_6"
									value="Uses complete sentences "
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes("Uses complete sentences ")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_6",
											"Uses complete sentences ",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_6_2">Uses complete sentences </label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_3"
									type="checkbox"
									name="checkbox_6"
									value="Non-verbal "
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes("Non-verbal ")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_6",
											"Non-verbal ",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_6_3">Non-verbal </label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_4"
									type="checkbox"
									name="checkbox_6"
									value="Mute"
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes("Mute")
									}
									onChange={(e) =>
										handleCheckboxChange("checkbox_6", "Mute", e.target.checked)
									}
								/>
								<label htmlFor="checkbox_6_4">Mute</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_5"
									type="checkbox"
									name="checkbox_6"
									value="Comprehends 2-3 words"
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes("Comprehends 2-3 words")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_6",
											"Comprehends 2-3 words",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_6_5">Comprehends 2-3 words</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_6"
									type="checkbox"
									name="checkbox_6"
									value="Comprehends complete sentences"
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes(
											"Comprehends complete sentences"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_6",
											"Comprehends complete sentences",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_6_6">
									Comprehends complete sentences
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_7"
									type="checkbox"
									name="checkbox_6"
									value="Gestures/points"
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes("Gestures/points")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_6",
											"Gestures/points",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_6_7">Gestures/points</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_8"
									type="checkbox"
									name="checkbox_6"
									value="Stutters"
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes("Stutters")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_6",
											"Stutters",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_6_8">Stutters</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_9"
									type="checkbox"
									name="checkbox_6"
									value="Uses PEC board"
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes("Uses PEC board")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_6",
											"Uses PEC board",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_6_9">Uses PEC board</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_10"
									type="checkbox"
									name="checkbox_6"
									value="Uses Sign Language"
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes("Uses Sign Language")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_6",
											"Uses Sign Language",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_6_10">Uses Sign Language</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_11"
									type="checkbox"
									name="checkbox_6"
									value="Uses an AAC device"
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes("Uses an AAC device")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_6",
											"Uses an AAC device",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_6_11">Uses an AAC device</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_12"
									type="checkbox"
									name="checkbox_6"
									value="Writes to communicate"
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes("Writes to communicate")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_6",
											"Writes to communicate",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_6_12">Writes to communicate</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_13"
									type="checkbox"
									name="checkbox_6"
									value="Hearing impaired"
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes("Hearing impaired")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_6",
											"Hearing impaired",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_6_13">Hearing impaired</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_6_14"
									type="checkbox"
									name="checkbox_6"
									value="Uses hearing aids"
									checked={
										Array.isArray(values["checkbox_6"]) &&
										values["checkbox_6"].includes("Uses hearing aids")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_6",
											"Uses hearing aids",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_6_14">Uses hearing aids</label>
							</div>
						</fieldset>
					</div>
				</div>
				{Array.isArray(values["checkbox_6"]) &&
					values["checkbox_6"].includes("Uses only single words") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_18">
								Please provide more details about "Uses only single words." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_18"
								required
								name="description_18"
								rows={3}
								value={values["description_18"] || ""}
								onChange={(e) => handleChange("description_18", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_6"]) &&
					values["checkbox_6"].includes("Non-verbal ") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_47">
								Please provide more details about "Non-verbal." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_47"
								name="description_47"
								required
								rows={3}
								value={values["description_47"] || ""}
								onChange={(e) => handleChange("description_47", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_6"]) &&
					values["checkbox_6"].includes("Mute") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_46">
								Please provide more details about "Mute." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_46"
								name="description_46"
								required
								rows={3}
								value={values["description_46"] || ""}
								onChange={(e) => handleChange("description_46", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_6"]) &&
					values["checkbox_6"].includes("Comprehends 2-3 words") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_45">
								Please provide more details about "Comprehends 2-3 words." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_45"
								name="description_45"
								required
								rows={3}
								value={values["description_45"] || ""}
								onChange={(e) => handleChange("description_45", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_6"]) &&
					values["checkbox_6"].includes("Gestures/points") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_44">
								Please provide more details about "Gestures/points," and note
								common gestures used. *
							</label>
							<textarea
								className="cs-textarea"
								id="description_44"
								name="description_44"
								required
								rows={3}
								value={values["description_44"] || ""}
								onChange={(e) => handleChange("description_44", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_6"]) &&
					values["checkbox_6"].includes("Understands sign language") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_43">
								Please provide more details about "Uses sign language." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_43"
								required
								name="description_43"
								rows={3}
								value={values["description_43"] || ""}
								onChange={(e) => handleChange("description_43", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_6"]) &&
					values["checkbox_6"].includes("Uses an AAC device") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_42">
								Please provide more details about "Uses an AAC device." *
							</label>
							<textarea
								className="cs-textarea"
								required
								id="description_42"
								name="description_42"
								rows={3}
								value={values["description_42"] || ""}
								onChange={(e) => handleChange("description_42", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_6"]) &&
					values["checkbox_6"].includes("Hearing impaired") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_41">
								Please provide more details about "Hearing impaired." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_41"
								required
								name="description_41"
								rows={3}
								value={values["description_41"] || ""}
								onChange={(e) => handleChange("description_41", e.target.value)}
							/>
						</div>
					)}
				<div className="cs-field-wrapper">
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_6">
							Please provide any other communication challenges, styles, and
							strategies that may be helpful.
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text_6"
							name="input_text_6"
							value={values["input_text_6"] || ""}
							onChange={(e) => handleChange("input_text_6", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset className="cs-field cs-checkbox">
							<legend className="cs-label">
								Behaviors (Select all that apply) *
							</legend>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_7_0"
									type="checkbox"
									name="checkbox_7"
									value="Does well in large groups (12 or more individuals)"
									checked={
										Array.isArray(values["checkbox_7"]) &&
										values["checkbox_7"].includes(
											"Does well in large groups (12 or more individuals)"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_7",
											"Does well in large groups (12 or more individuals)",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_7_0">
									Does well in large groups (12 or more individuals)
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_7_1"
									type="checkbox"
									name="checkbox_7"
									value="Does well in small groups (fewer than 12)"
									checked={
										Array.isArray(values["checkbox_7"]) &&
										values["checkbox_7"].includes(
											"Does well in small groups (fewer than 12)"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_7",
											"Does well in small groups (fewer than 12)",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_7_1">
									Does well in small groups (fewer than 12)
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_7_2"
									type="checkbox"
									name="checkbox_7"
									value="Prefers to be alone"
									checked={
										Array.isArray(values["checkbox_7"]) &&
										values["checkbox_7"].includes("Prefers to be alone")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_7",
											"Prefers to be alone",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_7_2">Prefers to be alone</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_7_3"
									type="checkbox"
									name="checkbox_7"
									value="Sensitive to touch from others"
									checked={
										Array.isArray(values["checkbox_7"]) &&
										values["checkbox_7"].includes(
											"Sensitive to touch from others"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_7",
											"Sensitive to touch from others",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_7_3">
									Sensitive to touch from others
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_7_4"
									type="checkbox"
									name="checkbox_7"
									value="Touches others - Hugging, poking, tapping"
									checked={
										Array.isArray(values["checkbox_7"]) &&
										values["checkbox_7"].includes(
											"Touches others - Hugging, poking, tapping"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_7",
											"Touches others - Hugging, poking, tapping",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_7_4">
									Touches others - Hugging, poking, tapping
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_7_5"
									type="checkbox"
									name="checkbox_7"
									value="Quick to anger"
									checked={
										Array.isArray(values["checkbox_7"]) &&
										values["checkbox_7"].includes("Quick to anger")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_7",
											"Quick to anger",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_7_5">Quick to anger</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_7_6"
									type="checkbox"
									name="checkbox_7"
									value="Easily frustrated"
									checked={
										Array.isArray(values["checkbox_7"]) &&
										values["checkbox_7"].includes("Easily frustrated")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_7",
											"Easily frustrated",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_7_6">Easily frustrated</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_7_7"
									type="checkbox"
									name="checkbox_7"
									value="Uses profanity"
									checked={
										Array.isArray(values["checkbox_7"]) &&
										values["checkbox_7"].includes("Uses profanity")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_7",
											"Uses profanity",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_7_7">Uses profanity</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_7_8"
									type="checkbox"
									name="checkbox_7"
									value="Verbal outbursts"
									checked={
										Array.isArray(values["checkbox_7"]) &&
										values["checkbox_7"].includes("Verbal outbursts")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_7",
											"Verbal outbursts",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_7_8">Verbal outbursts</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_7_9"
									type="checkbox"
									name="checkbox_7"
									value="Throws objects"
									checked={
										Array.isArray(values["checkbox_7"]) &&
										values["checkbox_7"].includes("Throws objects")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_7",
											"Throws objects",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_7_9">Throws objects</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_7_10"
									type="checkbox"
									name="checkbox_7"
									value="Defiant behaviors"
									checked={
										Array.isArray(values["checkbox_7"]) &&
										values["checkbox_7"].includes("Defiant behaviors")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_7",
											"Defiant behaviors",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_7_10">Defiant behaviors</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_7_11"
									type="checkbox"
									name="checkbox_7"
									value="Exhibits Obsessive Compulsive Behaviors"
									checked={
										Array.isArray(values["checkbox_7"]) &&
										values["checkbox_7"].includes(
											"Exhibits Obsessive Compulsive Behaviors"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_7",
											"Exhibits Obsessive Compulsive Behaviors",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_7_11">
									Exhibits Obsessive Compulsive Behaviors
								</label>
							</div>
						</fieldset>
					</div>
				</div>
				{Array.isArray(values["checkbox_7"]) &&
					values["checkbox_7"].includes(
						"Touches others - Hugging, poking, tapping"
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_19">
								Please provide more details and/or strategies for "Touches
								others - Hugging, poking, tapping." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_19"
								name="description_19"
								required
								rows={3}
								value={values["description_19"] || ""}
								onChange={(e) => handleChange("description_19", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_7"]) &&
					values["checkbox_7"].includes("Quick to anger") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_54">
								Please provide more details and/or strategies for "Quick to
								anger." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_54"
								required
								name="description_54"
								rows={3}
								value={values["description_54"] || ""}
								onChange={(e) => handleChange("description_54", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_7"]) &&
					values["checkbox_7"].includes("Easily frustrated") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_53">
								Please provide more details and/or strategies for "Easily
								frustrated." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_53"
								required
								name="description_53"
								rows={3}
								value={values["description_53"] || ""}
								onChange={(e) => handleChange("description_53", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_7"]) &&
					values["checkbox_7"].includes("Uses profanity") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_52">
								Please provide more details about "Uses profanity." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_52"
								required
								name="description_52"
								rows={3}
								value={values["description_52"] || ""}
								onChange={(e) => handleChange("description_52", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_7"]) &&
					values["checkbox_7"].includes("Verbal outbursts") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_51">
								Please provide more details about "Verbal outbursts." *
							</label>
							<textarea
								className="cs-textarea"
								required
								id="description_51"
								name="description_51"
								rows={3}
								value={values["description_51"] || ""}
								onChange={(e) => handleChange("description_51", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_7"]) &&
					values["checkbox_7"].includes("Throws objects") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_50">
								Please provide more details about "Throws objects." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_50"
								required
								name="description_50"
								rows={3}
								value={values["description_50"] || ""}
								onChange={(e) => handleChange("description_50", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_7"]) &&
					values["checkbox_7"].includes("Defiant behaviors") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_71">
								Please provide more details and/or strategies about "Defiant
								behaviors." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_71"
								required
								name="description_71"
								rows={3}
								value={values["description_71"] || ""}
								onChange={(e) => handleChange("description_71", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_7"]) &&
					values["checkbox_7"].includes(
						"Exhibits Obsessive Compulsive Behaviors"
					) && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_2">
								Please list specific behaviors and strategies related to
								"Exhibits Obsessive Compulsive Behaviors." *
							</label>
							<textarea
								className="cs-textarea"
								id="description_2"
								required
								name="description_2"
								rows={3}
								value={values["description_2"] || ""}
								onChange={(e) => handleChange("description_2", e.target.value)}
							/>
						</div>
					)}
				<div className="cs-field-wrapper">
					<div className="cs-field cs-textarea">
						<label className="cs-label" htmlFor="description_1">
							Does your camper have a history of physical or verbal aggression?
							If so, please provide triggers/circumstances and
							re-direction/de-escalation techniques used to calm your camper. *
						</label>
						<textarea
							className="cs-textarea"
							id="description_1"
							required
							name="description_1"
							rows={3}
							value={values["description_1"] || ""}
							onChange={(e) => handleChange("description_1", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-radio-group">
						<fieldset className="cs-field cs-radio">
							<legend className="cs-label">
								Has your camper been charged or convicted of a crime? *
							</legend>
							<div className="cs-radio-item">
								<input
									id="input_radio_11_0"
									type="radio"
									required
									name="input_radio_11"
									value="yes"
									checked={values["input_radio_11"] === "yes"}
									onChange={(e) =>
										handleChange("input_radio_11", e.target.value)
									}
								/>
								<label htmlFor="input_radio_11_0">Yes</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="input_radio_11_1"
									type="radio"
									name="input_radio_11"
									value="no"
									checked={values["input_radio_11"] === "no"}
									onChange={(e) =>
										handleChange("input_radio_11", e.target.value)
									}
								/>
								<label htmlFor="input_radio_11_1">No</label>
							</div>
						</fieldset>
					</div>
				</div>
				{values["input_radio_11"] === "yes" && (
					<div className="cs-field cs-textarea">
						<label className="cs-label" htmlFor="description_74">
							Please provide more details. *
						</label>
						<textarea
							className="cs-textarea"
							id="description_74"
							required
							name="description_74"
							rows={3}
							value={values["description_74"] || ""}
							onChange={(e) => handleChange("description_74", e.target.value)}
						/>
					</div>
				)}
				<div className="cs-field-wrapper">
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								"<p>We periodically have volunteer groups bring horses for riding, therapy animals or \"guests' from a petting zoo. Please let us know:</p>",
						}}
					/>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_7">
							Is your camper afraid of animals? What kind?
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text_7"
							name="input_text_7"
							value={values["input_text_7"] || ""}
							onChange={(e) => handleChange("input_text_7", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_8">
							If your camper is allergic to any animals, please specify the
							type, reaction, and the severity.
						</label>
						<input
							className="cs-input"
							type="text"
							id="input_text_8"
							name="input_text_8"
							value={values["input_text_8"] || ""}
							onChange={(e) => handleChange("input_text_8", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<hr className="cs-step-separator" />
				</div>
				<div className="cs-field-wrapper">
					<h2 className="cs-section-title">Medical Information</h2>
					<div className="cs-section-description">
						(to be completed by parent or guardian, not physician)
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								"<p>These are general medical questions, a Health Examination Form will be provided for your camper's Doctor or Nurse Practitioner to complete.</p>",
						}}
					/>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-textarea">
						<label
							className="cs-label"
							htmlFor="list_all_foods_your_camper_cannot_eat_due_to_severe_intolerance_and_or_allergic_reactions_105"
						>
							Camper’s Primary Diagnosis: *
						</label>
						<textarea
							className="cs-textarea"
							id="list_all_foods_your_camper_cannot_eat_due_to_severe_intolerance_and_or_allergic_reactions_105"
							requiredname="list_all_foods_your_camper_cannot_eat_due_to_severe_intolerance_and_or_allergic_reactions_105"
							rows={3}
							value={
								values[
									"list_all_foods_your_camper_cannot_eat_due_to_severe_intolerance_and_or_allergic_reactions_105"
								] || ""
							}
							onChange={(e) =>
								handleChange(
									"list_all_foods_your_camper_cannot_eat_due_to_severe_intolerance_and_or_allergic_reactions_105",
									e.target.value
								)
							}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-textarea">
						<label
							className="cs-label"
							htmlFor="list_any_ingredients_in_processed_or_packaged_foods_your_camper_cannot_eat_due_to_intolerance_and_or_allergic_reactions_106"
						>
							Secondary Diagnosis:
						</label>
						<textarea
							className="cs-textarea"
							id="list_any_ingredients_in_processed_or_packaged_foods_your_camper_cannot_eat_due_to_intolerance_and_or_allergic_reactions_106"
							name="list_any_ingredients_in_processed_or_packaged_foods_your_camper_cannot_eat_due_to_intolerance_and_or_allergic_reactions_106"
							rows={3}
							value={
								values[
									"list_any_ingredients_in_processed_or_packaged_foods_your_camper_cannot_eat_due_to_intolerance_and_or_allergic_reactions_106"
								] || ""
							}
							onChange={(e) =>
								handleChange(
									"list_any_ingredients_in_processed_or_packaged_foods_your_camper_cannot_eat_due_to_intolerance_and_or_allergic_reactions_106",
									e.target.value
								)
							}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-textarea">
						<label
							className="cs-label"
							htmlFor="if_your_camper_ingests_or_comes_in_contact_with_any_foods_or_ingredients_listed_above_describe_his_her_reaction_please_include_physical_or_behavioral_signs_symptoms_evidenced_and_low_long_after_cont"
						>
							Chronic Medical Conditions:
						</label>
						<textarea
							className="cs-textarea"
							id="if_your_camper_ingests_or_comes_in_contact_with_any_foods_or_ingredients_listed_above_describe_his_her_reaction_please_include_physical_or_behavioral_signs_symptoms_evidenced_and_low_long_after_cont"
							name="if_your_camper_ingests_or_comes_in_contact_with_any_foods_or_ingredients_listed_above_describe_his_her_reaction_please_include_physical_or_behavioral_signs_symptoms_evidenced_and_low_long_after_cont"
							rows={3}
							value={
								values[
									"if_your_camper_ingests_or_comes_in_contact_with_any_foods_or_ingredients_listed_above_describe_his_her_reaction_please_include_physical_or_behavioral_signs_symptoms_evidenced_and_low_long_after_cont"
								] || ""
							}
							onChange={(e) =>
								handleChange(
									"if_your_camper_ingests_or_comes_in_contact_with_any_foods_or_ingredients_listed_above_describe_his_her_reaction_please_include_physical_or_behavioral_signs_symptoms_evidenced_and_low_long_after_cont",
									e.target.value
								)
							}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-radio-group">
						<fieldset className="cs-field cs-radio">
							<legend className="cs-label">
								Does your camper have seizures? *
							</legend>
							<div className="cs-radio-item">
								<input
									id="input_radio_9_0"
									type="radio"
									required
									name="input_radio_9"
									value="yes"
									checked={values["input_radio_9"] === "yes"}
									onChange={(e) =>
										handleChange("input_radio_9", e.target.value)
									}
								/>
								<label htmlFor="input_radio_9_0">Yes</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="input_radio_9_1"
									type="radio"
									name="input_radio_9"
									value="no"
									checked={values["input_radio_9"] === "no"}
									onChange={(e) =>
										handleChange("input_radio_9", e.target.value)
									}
								/>
								<label htmlFor="input_radio_9_1">No</label>
							</div>
						</fieldset>
					</div>
				</div>
				{values["input_radio_9"] === "yes" && (
					<div className="cs-field cs-textarea">
						<label
							className="cs-label"
							htmlFor="list_emergency_protocols_recommended_by_your_campers_physician_to_treat_the_reaction_and_reverse_the_symptoms_for_example_benadryl_epi_pen_syrup_of_ipepac_etc_108"
						>
							Please list type, frequency and date of last seizure. *
						</label>
						<textarea
							className="cs-textarea"
							id="list_emergency_protocols_recommended_by_your_campers_physician_to_treat_the_reaction_and_reverse_the_symptoms_for_example_benadryl_epi_pen_syrup_of_ipepac_etc_108"
							name="list_emergency_protocols_recommended_by_your_campers_physician_to_treat_the_reaction_and_reverse_the_symptoms_for_example_benadryl_epi_pen_syrup_of_ipepac_etc_108"
							required
							rows={3}
							value={
								values[
									"list_emergency_protocols_recommended_by_your_campers_physician_to_treat_the_reaction_and_reverse_the_symptoms_for_example_benadryl_epi_pen_syrup_of_ipepac_etc_108"
								] || ""
							}
							onChange={(e) =>
								handleChange(
									"list_emergency_protocols_recommended_by_your_campers_physician_to_treat_the_reaction_and_reverse_the_symptoms_for_example_benadryl_epi_pen_syrup_of_ipepac_etc_108",
									e.target.value
								)
							}
						/>
					</div>
				)}
				{values[
					"list_emergency_protocols_recommended_by_your_campers_physician_to_treat_the_reaction_and_reverse_the_symptoms_for_example_benadryl_epi_pen_syrup_of_ipepac_etc_108"
				] === "" && (
					<div className="cs-field cs-radio-group">
						<fieldset className="cs-field cs-radio">
							<legend className="cs-label">
								Do they have a written behavior plan in place? *
							</legend>
							<div className="cs-radio-item">
								<input
									id="input_radio_10_0"
									type="radio"
									name="input_radio_10"
									required
									value="yes"
									checked={values["input_radio_10"] === "yes"}
									onChange={(e) =>
										handleChange("input_radio_10", e.target.value)
									}
								/>
								<label htmlFor="input_radio_10_0">Yes</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="input_radio_10_1"
									type="radio"
									name="input_radio_10"
									value="no"
									checked={values["input_radio_10"] === "no"}
									onChange={(e) =>
										handleChange("input_radio_10", e.target.value)
									}
								/>
								<label htmlFor="input_radio_10_1">No</label>
							</div>
						</fieldset>
					</div>
				)}
				{values["input_radio_10"] === "yes" && (
					<h2 className="cs-section-title">
						Note: We may ask for a copy via email
					</h2>
				)}
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset className="cs-field cs-checkbox">
							<legend className="cs-label">
								Does your camper have any of the following: *
							</legend>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_8_0"
									type="checkbox"
									name="checkbox_8"
									value="Urostomy Bag"
									checked={
										Array.isArray(values["checkbox_8"]) &&
										values["checkbox_8"].includes("Urostomy Bag")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_8",
											"Urostomy Bag",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_8_0">Urostomy Bag</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_8_1"
									type="checkbox"
									name="checkbox_8"
									value="Stoma/Colostomy Bag"
									checked={
										Array.isArray(values["checkbox_8"]) &&
										values["checkbox_8"].includes("Stoma/Colostomy Bag")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_8",
											"Stoma/Colostomy Bag",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_8_1">Stoma/Colostomy Bag</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_8_2"
									type="checkbox"
									name="checkbox_8"
									value="Catheter"
									checked={
										Array.isArray(values["checkbox_8"]) &&
										values["checkbox_8"].includes("Catheter")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_8",
											"Catheter",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_8_2">Catheter</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_8_3"
									type="checkbox"
									name="checkbox_8"
									value="Insulin Pump"
									checked={
										Array.isArray(values["checkbox_8"]) &&
										values["checkbox_8"].includes("Insulin Pump")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_8",
											"Insulin Pump",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_8_3">Insulin Pump</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_8_4"
									type="checkbox"
									name="checkbox_8"
									value="CPAP or BiPap Machine"
									checked={
										Array.isArray(values["checkbox_8"]) &&
										values["checkbox_8"].includes("CPAP or BiPap Machine")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_8",
											"CPAP or BiPap Machine",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_8_4">CPAP or BiPap Machine</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_8_5"
									type="checkbox"
									name="checkbox_8"
									value="Prosthetics"
									checked={
										Array.isArray(values["checkbox_8"]) &&
										values["checkbox_8"].includes("Prosthetics")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_8",
											"Prosthetics",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_8_5">Prosthetics</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_8_6"
									type="checkbox"
									name="checkbox_8"
									value="Medical or Cochlear Implants"
									checked={
										Array.isArray(values["checkbox_8"]) &&
										values["checkbox_8"].includes(
											"Medical or Cochlear Implants"
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_8",
											"Medical or Cochlear Implants",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_8_6">
									Medical or Cochlear Implants
								</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_8_7"
									type="checkbox"
									name="checkbox_8"
									value="Hearing Aids"
									checked={
										Array.isArray(values["checkbox_8"]) &&
										values["checkbox_8"].includes("Hearing Aids")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_8",
											"Hearing Aids",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_8_7">Hearing Aids</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_8_8"
									type="checkbox"
									name="checkbox_8"
									value="Dentures"
									checked={
										Array.isArray(values["checkbox_8"]) &&
										values["checkbox_8"].includes("Dentures")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_8",
											"Dentures",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_8_8">Dentures</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_8_9"
									type="checkbox"
									name="checkbox_8"
									value="Feeding Tube"
									checked={
										Array.isArray(values["checkbox_8"]) &&
										values["checkbox_8"].includes("Feeding Tube")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_8",
											"Feeding Tube",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_8_9">Feeding Tube</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_8_10"
									type="checkbox"
									name="checkbox_8"
									value="Not Applicable"
									checked={
										Array.isArray(values["checkbox_8"]) &&
										values["checkbox_8"].includes("Not Applicable")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_8",
											"Not Applicable",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_8_10">Not Applicable</label>
							</div>
						</fieldset>
					</div>
				</div>
				{Array.isArray(values["checkbox_8"]) &&
					values["checkbox_8"].includes("Urostomy Bag") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_20">
								Urostomy Bag - What level of assistance and daily care do they
								need with this? *
							</label>
							<textarea
								className="cs-textarea"
								id="description_20"
								required
								name="description_20"
								rows={3}
								value={values["description_20"] || ""}
								onChange={(e) => handleChange("description_20", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_8"]) &&
					values["checkbox_8"].includes("Stoma/Colostomy Bag") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_63">
								Stoma/Colostomy Bag - What level of assistance and daily care do
								they need with this? *
							</label>
							<textarea
								className="cs-textarea"
								id="description_63"
								required
								name="description_63"
								rows={3}
								value={values["description_63"] || ""}
								onChange={(e) => handleChange("description_63", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_8"]) &&
					values["checkbox_8"].includes("Catheter") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_62">
								Catheter - What level of assistance and daily care do they need
								with this? *
							</label>
							<textarea
								className="cs-textarea"
								id="description_62"
								required
								name="description_62"
								rows={3}
								value={values["description_62"] || ""}
								onChange={(e) => handleChange("description_62", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_8"]) &&
					values["checkbox_8"].includes("Insulin Pump") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_61">
								Insulin Pump - What level of assistance and daily care do they
								need with this? *
							</label>
							<textarea
								className="cs-textarea"
								id="description_61"
								name="description_61"
								required
								rows={3}
								value={values["description_61"] || ""}
								onChange={(e) => handleChange("description_61", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_8"]) &&
					values["checkbox_8"].includes("CPAP or BiPap Machine") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_60">
								CPAP or BiPap Machine - What level of assistance and daily care
								do they need with this? *
							</label>
							<textarea
								className="cs-textarea"
								id="description_60"
								required
								name="description_60"
								rows={3}
								value={values["description_60"] || ""}
								onChange={(e) => handleChange("description_60", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_8"]) &&
					values["checkbox_8"].includes("Prosthetics") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_59">
								Prosthetics - What level of assistance and daily care do they
								need with this? *
							</label>
							<textarea
								className="cs-textarea"
								required
								id="description_59"
								name="description_59"
								rows={3}
								value={values["description_59"] || ""}
								onChange={(e) => handleChange("description_59", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_8"]) &&
					values["checkbox_8"].includes("Medical or Cochlear Implants") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_58">
								Medical or Cochlear Implants - What level of assistance and
								daily care do they need with this? *
							</label>
							<textarea
								className="cs-textarea"
								id="description_58"
								required
								name="description_58"
								rows={3}
								value={values["description_58"] || ""}
								onChange={(e) => handleChange("description_58", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_8"]) &&
					values["checkbox_8"].includes("Hearing Aids") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_57">
								Hearing Aids - What level of assistance and daily care do they
								need with this? *
							</label>
							<textarea
								className="cs-textarea"
								id="description_57"
								name="description_57"
								required
								rows={3}
								value={values["description_57"] || ""}
								onChange={(e) => handleChange("description_57", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_8"]) &&
					values["checkbox_8"].includes("Dentures") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_56">
								Dentures - What level of assistance and daily care do they need
								with this? *
							</label>
							<textarea
								className="cs-textarea"
								id="description_56"
								name="description_56"
								required
								rows={3}
								value={values["description_56"] || ""}
								onChange={(e) => handleChange("description_56", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_8"]) &&
					values["checkbox_8"].includes("Feeding Tube") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_72">
								Feeding Tube - What level of assistance and daily care do they
								need with this? *
							</label>
							<textarea
								className="cs-textarea"
								id="description_72"
								name="description_72"
								required
								rows={3}
								value={values["description_72"] || ""}
								onChange={(e) => handleChange("description_72", e.target.value)}
							/>
						</div>
					)}
				<div className="cs-field-wrapper">
					<div className="cs-field cs-textarea">
						<label className="cs-label" htmlFor="description_21">
							Please list any other devices or equipment your camper has and
							what level of assistance is needed.
						</label>
						<textarea
							className="cs-textarea"
							id="description_21"
							name="description_21"
							rows={3}
							value={values["description_21"] || ""}
							onChange={(e) => handleChange("description_21", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								"<p><strong>Effective January 2024, Camp Horizon requests all medications are pre-packaged in Bubble Packs or Simple Dose Packs if your pharmacy provides this service.<br /><br />If your pharmacy does not provide this service, please ensure all medications are in the original pharmacy bottle. This must include the campers name, medication name and dosage instructions. Over the counter medications, supplements, ointments, etc., must be listed on the Health Exam Form completed by a physician. All medications and dosages must match the Health Exam Form.</strong></p>",
						}}
					/>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-textarea">
						<label className="cs-label" htmlFor="description_4">
							Please list ALL current medications with DOSAGE & TIME medication
							is administered (Morning, Mid-Day, Evening, As Needed) *
						</label>
						<textarea
							className="cs-textarea"
							id="description_4"
							name="description_4"
							required
							rows={3}
							value={values["description_4"] || ""}
							onChange={(e) => handleChange("description_4", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<h2 className="cs-section-title">Dietary Restrictions:</h2>
				</div>
				<div className="cs-field-wrapper">
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								"<p><strong>Our kitchen staff must accommodate a wide range of medically required dietary restrictions and food allergies. We must distinguish between essential dietary restrictions and personal preference. We cannot accommodate personal preference. Please only list restrictions that are medically diagnosed/prescribed and not personal preference. The Health Exam Form must list these restrictions and/or allergies. We offer a variety of options at each meal for those with a limited selection of foods they will eat. </strong></p>\n<p><strong>Please reach out to acd@lionscamphorizon.org with additional questions or concerns regarding dietary needs.</strong></p>",
						}}
					/>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-textarea">
						<label className="cs-label" htmlFor="description_5">
							Has the applicant been diagnosed by a physician with a dietary
							condition such as Celiac Disease, PKU, Diabetes, food allergies,
							or any other condition? If yes, please list the condition and give
							a detailed description of dietary restrictions and reactions. Any
							dietary conditions or restrictions must be listed on the Health
							Exam Form by the physician. *
						</label>
						<textarea
							className="cs-textarea"
							id="description_5"
							name="description_5"
							required
							rows={3}
							value={values["description_5"] || ""}
							onChange={(e) => handleChange("description_5", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset className="cs-field cs-checkbox">
							<legend className="cs-label">
								Does the applicant have special dietary requirements ordered by
								his/her Doctor or Nutritionist? (Select all that apply) *
							</legend>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_9_0"
									type="checkbox"
									name="checkbox_9"
									value="None"
									checked={
										Array.isArray(values["checkbox_9"]) &&
										values["checkbox_9"].includes("None")
									}
									onChange={(e) =>
										handleCheckboxChange("checkbox_9", "None", e.target.checked)
									}
								/>
								<label htmlFor="checkbox_9_0">None</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_9_1"
									type="checkbox"
									name="checkbox_9"
									value="Lactose/Dairy Free"
									checked={
										Array.isArray(values["checkbox_9"]) &&
										values["checkbox_9"].includes("Lactose/Dairy Free")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_9",
											"Lactose/Dairy Free",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_9_1">Lactose/Dairy Free</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_9_2"
									type="checkbox"
									name="checkbox_9"
									value="Gluten Free"
									checked={
										Array.isArray(values["checkbox_9"]) &&
										values["checkbox_9"].includes("Gluten Free")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_9",
											"Gluten Free",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_9_2">Gluten Free</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_9_3"
									type="checkbox"
									name="checkbox_9"
									value="Vegetarian"
									checked={
										Array.isArray(values["checkbox_9"]) &&
										values["checkbox_9"].includes("Vegetarian")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_9",
											"Vegetarian",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_9_3">Vegetarian</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_9_4"
									type="checkbox"
									name="checkbox_9"
									value="Sugar Free"
									checked={
										Array.isArray(values["checkbox_9"]) &&
										values["checkbox_9"].includes("Sugar Free")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_9",
											"Sugar Free",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_9_4">Sugar Free</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_9_5"
									type="checkbox"
									name="checkbox_9"
									value="Peanut Allergy"
									checked={
										Array.isArray(values["checkbox_9"]) &&
										values["checkbox_9"].includes("Peanut Allergy")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_9",
											"Peanut Allergy",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_9_5">Peanut Allergy</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_9_6"
									type="checkbox"
									name="checkbox_9"
									value="Pureed Food"
									checked={
										Array.isArray(values["checkbox_9"]) &&
										values["checkbox_9"].includes("Pureed Food")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_9",
											"Pureed Food",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_9_6">Pureed Food</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_9_7"
									type="checkbox"
									name="checkbox_9"
									value="Food Allergies"
									checked={
										Array.isArray(values["checkbox_9"]) &&
										values["checkbox_9"].includes("Food Allergies")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_9",
											"Food Allergies",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_9_7">Food Allergies</label>
							</div>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_9_8"
									type="checkbox"
									name="checkbox_9"
									value="Other (please specify)"
									checked={
										Array.isArray(values["checkbox_9"]) &&
										values["checkbox_9"].includes("Other (please specify)")
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_9",
											"Other (please specify)",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_9_8">Other (please specify)</label>
							</div>
						</fieldset>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								"<p><strong>NOTE: We may not be able to accommodate severe</strong><br /><strong>allergies or some dietary restrictions. These will be addressed on a case-by-case basis to</strong><br /><strong>ensure the health and safety of your camper.</strong></p>",
						}}
					/>
				</div>
				{Array.isArray(values["checkbox_9"]) &&
					values["checkbox_9"].includes("Lactose/Dairy Free") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_6">
								Lactose/Dairy Free - Please explain the severity, reaction, and
								details of the restriction. *
							</label>
							<textarea
								className="cs-textarea"
								id="description_6"
								required
								name="description_6"
								rows={3}
								value={values["description_6"] || ""}
								onChange={(e) => handleChange("description_6", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_9"]) &&
					values["checkbox_9"].includes("Gluten Free") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_66">
								Gluten Free - Please explain the severity, reaction, and details
								of the restriction. *
							</label>
							<textarea
								className="cs-textarea"
								id="description_66"
								required
								name="description_66"
								rows={3}
								value={values["description_66"] || ""}
								onChange={(e) => handleChange("description_66", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_9"]) &&
					values["checkbox_9"].includes("Vegetarian") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_65">
								Vegetarian - Please give more details. *
							</label>
							<textarea
								className="cs-textarea"
								id="description_65"
								name="description_65"
								required
								rows={3}
								value={values["description_65"] || ""}
								onChange={(e) => handleChange("description_65", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_9"]) &&
					values["checkbox_9"].includes("Sugar Free") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_68">
								Sugar Free - Please explain the severity, reaction, and details
								of the restriction. *
							</label>
							<textarea
								className="cs-textarea"
								id="description_68"
								required
								name="description_68"
								rows={3}
								value={values["description_68"] || ""}
								onChange={(e) => handleChange("description_68", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_9"]) &&
					values["checkbox_9"].includes("Peanut Allergy") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_67">
								Peanuts - Please explain the severity, reaction, and details of
								the restriction. *
							</label>
							<textarea
								className="cs-textarea"
								id="description_67"
								required
								name="description_67"
								rows={3}
								value={values["description_67"] || ""}
								onChange={(e) => handleChange("description_67", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_9"]) &&
					values["checkbox_9"].includes("Pureed Food") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_69">
								Pureed Foods - Please give more details. *
							</label>
							<textarea
								className="cs-textarea"
								id="description_69"
								required
								name="description_69"
								rows={3}
								value={values["description_69"] || ""}
								onChange={(e) => handleChange("description_69", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_9"]) &&
					values["checkbox_9"].includes("Food Allergies") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_70">
								Food Allergies - Please explain the severity, reaction, and
								details of the restriction. *
							</label>
							<textarea
								className="cs-textarea"
								id="description_70"
								required
								name="description_70"
								rows={3}
								value={values["description_70"] || ""}
								onChange={(e) => handleChange("description_70", e.target.value)}
							/>
						</div>
					)}
				{Array.isArray(values["checkbox_9"]) &&
					values["checkbox_9"].includes("Other (please specify)") && (
						<div className="cs-field cs-textarea">
							<label className="cs-label" htmlFor="description_64">
								Other dietary requirements *
							</label>
							<textarea
								className="cs-textarea"
								id="description_64"
								required
								name="description_64"
								rows={3}
								value={values["description_64"] || ""}
								onChange={(e) => handleChange("description_64", e.target.value)}
							/>
						</div>
					)}
				<div className="cs-field-wrapper">
					<hr className="cs-step-separator" />
				</div>
				<div className="cs-field-wrapper">
					<h2 className="cs-section-title">What's Next?</h2>
				</div>
				<div className="cs-field-wrapper">
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								"<p>Submitting your application:<br />Your application has not been submitted yet. Please continue reading to complete the consent form and submit your application for review.</p>\n<p>Thank you for completing your application! Our Admissions Team will review your application and be in touch soon. We may reach out with additional questions or request additional information. Once the review is complete, you will be advised of the session date(s) we are holding for your camper. These dates are subject to change and subject to the completion of all requested documents and payment.</p>\n<p><br />Payment:<br />DSHS/DDA Funding:<br />All DSHS/DDA payments will be pre-authorized by our admissions team. (Do not send a deposit) We will process the necessary paperwork in accordance with their policies and procedures. We may reach out if additional communication/information is required by your case worker.</p>\n<p>Private Pay:<br />A $50 deposit is due at the time of acceptance to hold your space for each camp session. We will send an invoice to the person listed on the application as the billing contact. Payments can be made on the remaining balance, or you can pay in full. Final payment is due no later than June 7, 2025.<br /><br />Deposits and payments may be paid by check, debit or credit card. Mail checks payable to Lions Camp Horizon to 7506 Gemini St., Blaine, WA 98230. To pay with a debit/credit card, please visit our website and click on the \u201cCAMP\u201d drop-down box located at the top of the home page. Click on \u201cFees\u201d and follow the prompts to access our secure PayPal link. Please note - PayPal charges a fee for each transaction.</p>\n<p>Forms:<br />You will receive a Health Exam Form via email to be completed by the campers Physician. It is important this form is completed as soon as possible. Reviewing the Health Exam Form is an important step for final approval and securing a space at camp. All camp spaces are \u201cpending\u201d until the receipt of all forms, payment and/or DSHS/DDA approval is completed.</p>\n<p><br />Please review and sign the consent form below.</p>",
						}}
					/>
				</div>
				<div className="cs-field-wrapper">
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html: "<h2><strong>Parent/Guardian Consent Form</strong></h2>",
						}}
					/>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-text">
						<label className="cs-label" htmlFor="input_text_17">
							Camper Name: *
						</label>
						<input
							className="cs-input"
							type="text"
							required
							id="input_text_17"
							name="input_text_17"
							value={values["input_text_17"] || ""}
							onChange={(e) => handleChange("input_text_17", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-radio-group">
						<fieldset className="cs-field cs-radio">
							<legend className="cs-label">
								Photo/Video Release: Designated staff members take photos of
								events and activities. Some of these photos may be focused on
								your camper, or they may be in the background. It is our
								intention that all photos are a positive reflection of your
								camper. Photos are posted on our social media during camp
								sessions to provide families/caregivers with a glimpse into camp
								life. They may also be used in promotional materials such as
								brochures, flyers, and website photos. Do you give Lions Camp
								Horizon permission to use photos and/or video that may contain
								images of your camper? *
							</legend>
							<div className="cs-radio-item">
								<input
									id="input_radio_8_0"
									type="radio"
									name="input_radio_8"
									required
									value="yes"
									checked={values["input_radio_8"] === "yes"}
									onChange={(e) =>
										handleChange("input_radio_8", e.target.value)
									}
								/>
								<label htmlFor="input_radio_8_0">Yes</label>
							</div>
							<div className="cs-radio-item">
								<input
									id="input_radio_8_1"
									type="radio"
									name="input_radio_8"
									value="no"
									checked={values["input_radio_8"] === "no"}
									onChange={(e) =>
										handleChange("input_radio_8", e.target.value)
									}
								/>
								<label htmlFor="input_radio_8_1">No</label>
							</div>
						</fieldset>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								"<p>Consent to Participate:<br />I give permission for the above-named camper to participate in Lions Camp Horizon activities both on-site and off-site. The activities include, but are not limited to, riding in go-karts or other recreational vehicles, water activities, archery, field games, inclusive sports, bowling, arts &amp;amp; crafts, talent shows, dances, etc. They may also participate in animal activities which may include horseback riding/wagon rides, animal interactions/petting. All animals will be under the supervision of a handler. I understand precautionary measures are taken to safeguard the safety of my camper and agree to hold harmless volunteers and outside agencies who provide entertainment and activities during camp sessions. I acknowledge appropriate safety equipment will be provided as needed and criminal background checks will be completed on any staff members or volunteers who work with my camper.<br /><br />Consent to Transport:<br />I authorize Lions Camp Horizon to transport my camper to/from off-site activities using rented vans, WTA buses and/or private vehicles. I acknowledge drivers will be subject to background checks and must provide proof of insurance and a clean driving record.<br /><br />Consent to Discharge Camper:<br />The safety of our campers and staff is our top priority. Any campers who do not follow health and safety guidelines will be asked to go home immediately.<br />I acknowledge my camper may be discharged if he/she engages in any of the following:</p>\n<ul>\n<li>Hits, grabs, bites or is overly aggressive towards a camper, staff or volunteer</li>\n<li>Inappropriate touching or sexual behaviors</li>\n<li>Verbally abusive or uses inappropriate language/gestures</li>\n<li>Theft or deliberate property destruction</li>\n<li>Inappropriate behavior with guest presenters or<br />animals</li>\n<li>Violates our zero-tolerance policy on tobacco, vaping, alcohol or drugs</li>\n<li>Unable to sleep in dormitory setting or disrupts other camper\u2019s sleep.</li>\n<li>Emotional outburst, tantrums or refuses to participate at a reasonable level.</li>\n<li>Unwilling to comply with health and safety protocols such as handwashing, proper hygiene, wearing protective safety equipment during activities (Head gear, safety glasses, seatbelt, life jacket, etc.)</li>\n<li>Develops a fever over 100 degrees, has symptoms such as nausea, vomiting, diarrhea. Shows any signs of a contagious condition.</li>\n</ul>\n<p>I understand that Lions Camp Horizon will make every effort to correct behaviors and encourage appropriate<br />interactions/redirection before discharging my camper. I agree to make immediate arrangements to remove my camper if asked to do so.</p>\n<p>By E-signing you agree to the terms above. If you have any questions, please email admin@lionscamphorizon.org</p>",
						}}
					/>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset className="cs-field cs-checkbox">
							<legend className="cs-label">
								I agree to the Consent Form. *
							</legend>
							<div className="cs-checkbox-item">
								<input
									id="checkbox_11_0"
									required
									type="checkbox"
									name="checkbox_11"
									value="By e-signing below, I agree to the terms in the Lions Camp Horizon Consent Form (as outlined above).  This includes Consent to Participate, Consent to Transport and Consent to Discharge.  (In addition, a copy of the consent form will be emailed to you for your records once the application is received)."
									checked={
										Array.isArray(values["checkbox_11"]) &&
										values["checkbox_11"].includes(
											"By e-signing below, I agree to the terms in the Lions Camp Horizon Consent Form (as outlined above).  This includes Consent to Participate, Consent to Transport and Consent to Discharge.  (In addition, a copy of the consent form will be emailed to you for your records once the application is received)."
										)
									}
									onChange={(e) =>
										handleCheckboxChange(
											"checkbox_11",
											"By e-signing below, I agree to the terms in the Lions Camp Horizon Consent Form (as outlined above).  This includes Consent to Participate, Consent to Transport and Consent to Discharge.  (In addition, a copy of the consent form will be emailed to you for your records once the application is received).",
											e.target.checked
										)
									}
								/>
								<label htmlFor="checkbox_11_0">
									By e-signing below, I agree to the terms in the Lions Camp
									Horizon Consent Form (as outlined above). This includes
									Consent to Participate, Consent to Transport and Consent to
									Discharge. (In addition, a copy of the consent form will be
									emailed to you for your records once the application is
									received).
								</label>
							</div>
						</fieldset>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-unknown">
						<label className="cs-label" htmlFor="signature">
							Signature
						</label>
						<input
							className="cs-input"
							type="text"
							id="signature"
							required
							name="signature"
							value={values["signature"] || ""}
							onChange={(e) => handleChange("signature", e.target.value)}
						/>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								"<p>Leading up to camp you will receive camp updates and email communication if there are additional items needed from you. Camper packets will be sent out about a month before camp with final information, check-in/check-out times, packing lists and any outstanding items needed. Our office hours are Monday \u2013 Friday from 9 am \u2013 3pm. Please feel free to call the office at 360- 371-0531 or contact us via email at\u00a0admin@lionscamphorizon.org\u00a0with any questions.</p>",
						}}
					/>
				</div>
				<div className="cs-field-wrapper">
					<h2 className="cs-section-title">Other Information</h2>
				</div>
				<div className="cs-field-wrapper">
					<div
						className="cs-custom-html"
						dangerouslySetInnerHTML={{
							__html:
								"<p>Although we can accommodate upwards of 55 campers per session, we are limited to the number of individuals we may accept per session by conditions including, but not limited to, the use of wheelchairs, two-person lifts and transfers, medical treatments, tube feedings and other specialized care.\u00a0 We will do our best to place your applicant in the preferred session, but please bear in mind admission and session placement depends on many factors.\u00a0</p>\n<p>The staff and Board of Directors reserve the right to refuse or cancel enrollment of an individual if we don\u2019t believe we can accommodate the needs of the camper, or, if they pose a risk to himself/herself or others.</p>\n<p>Please feel free to provide further information you feel will be helpful for making your camper\u2019s experience stress-free. If this is your camper\u2019s first time attending an overnight camp, we encourage you to schedule a tour of our campus and a meeting with one of our Admission Staff between now and May.</p>",
						}}
					/>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-checkbox-group">
						<fieldset required className="cs-field cs-checkbox">
							<legend className="cs-label">Data Collection Consent *</legend>
							<div id="consent-checkbox" className="cs-checkbox-item">
								<div className="cs-checkbox-item">
									<input
										id="data_collection_consent_197_0"
										type="checkbox"
										name="data_collection_consent_197"
										required
										value="consent"
										checked={
											Array.isArray(values["data_collection_consent_197"]) &&
											values["data_collection_consent_197"].includes("consent")
										}
										onChange={(e) =>
											handleCheckboxChange(
												"data_collection_consent_197",
												"consent",
												e.target.checked
											)
										}
									/>
								</div>
								<label htmlFor="data_collection_consent_197_0">
									I consent to my submitted data being collected and stored.
									View our <PrivacyPolicy /> for more info
								</label>
							</div>
						</fieldset>
					</div>
				</div>
				<div className="cs-field-wrapper">
					<div className="cs-field cs-name-wrapper">
						<div className="cs-field cs-name-group">
							<div className="cs-name-group-label">Name</div>
							<div className="cs-name-field">
								<label className="cs-label" htmlFor="first_name">
									First Name *
								</label>
								<input
									className="cs-input"
									type="text"
									id="first_name"
									required
									name="first_name"
									value={values["first_name"] || ""}
									onChange={(e) => handleChange("first_name", e.target.value)}
									placeholder="First Name"
								/>
							</div>
							<div className="cs-name-field">
								<label className="cs-label" htmlFor="last_name">
									Last Name *
								</label>
								<input
									className="cs-input"
									type="text"
									id="last_name"
									required
									name="last_name"
									value={values["last_name"] || ""}
									onChange={(e) => handleChange("last_name", e.target.value)}
									placeholder="Last Name"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="cs-form-actions">
					<button type="submit" className="cs-btn cs-btn-submit">
						Submit Application
					</button>
				</div>
			</form>
		</div>
	);
}
