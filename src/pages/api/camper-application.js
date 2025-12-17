import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";

const LABELS = {
	campers_name_1: "Name",
	first_1_3: "First",
	middle_1_4: "Middle",
	last_1_6: "Last",
	does_your_camper_have_a_nickname_2:
		"Does your camper have a preferred name/nickname?",
	input_mask: "Date of Birth",
	gender_5: "Gender",
	"gender_5::Male": "Male",
	"gender_5::Female": "Female",
	input_radio: "Does Camper reside with Parent/Guardian?",
	"input_radio::Yes": "Yes",
	"input_radio::No": "No",
	custom_html_2:
		"If camper does not reside with parent/guardian please list contact information for who camper resides with.",
	names_2: "Name",
	first_name: "First Name",
	middle_name: "Middle Name",
	last_name: "Last Name",
	first_name_pg1: "Parent/Guardian #1 First Name",
	middle_name_pg1: "Parent/Guardian #1 Middle Name",
	last_name_pg1: "Parent/Guardian #1 Last Name",
	first_name_pg2: "Parent/Guardian #2 First Name",
	middle_name_pg2: "Parent/Guardian #2 Middle Name",
	last_name_pg2: "Parent/Guardian #2 Last Name",
	input_text_9: "Group home or facility name if applicable",
	address_1: "Mailing Address",
	address_line_1: "Address Line 1",
	address_line_2: "Address Line 2",
	city: "City",
	state: "State",
	zip: "Zip Code",
	country: "Country",
	input_text_18: "Relationship to Camper",
	input_text_11: "Phone Number",
	input_text_10: "Email Address",
	description_22: "Please provide any additional information",
	input_radio_7:
		"Should all camp correspondence be sent to this address or parent/guardian?",
	"input_radio_7::Address above": "Address above",
	"input_radio_7::Parent/Guardian": "Parent/Guardian",
	names: "First and Last Name(s) for Parent/Guardian(s)",
	names_1: "First and Last Name(s) for Parent/Guardian(s) #2",
	campers_address_8: "Parent/Guardian's Mailing Address",
	street_address_8_1: "Street Address",
	address_line_2_8_2: "Address Line 2",
	city_8_3: "City",
	state_province_8_4: "State / Province",
	zip_postal_code_8_5: "ZIP / Postal Code",
	country_8_6: "Country",
	input_radio_1:
		"Camper’s T-shirt size (all campers will receive a shirt as part of registration)",
	"input_radio_1::Adult Small": "Adult Small",
	"input_radio_1::Adult Medium": "Adult Medium",
	"input_radio_1::Adult Large": "Adult Large",
	"input_radio_1::Adult XL": "Adult XL",
	"input_radio_1::Adult 2X": "Adult 2X",
	"input_radio_1::Adult 3X": "Adult 3X",
	input_radio_2: "Has the camper attended Lions Camp Horizon previously",
	"input_radio_2::Yes": "Yes",
	"input_radio_2::No": "No",
	input_text: "If so, please advise the last year of participation",
	input_text_20: "How did you hear about Lions Camp?",
	input_radio_3:
		"Has camper previously attended a different overnight/residential camp?",
	"input_radio_3::Yes": "Yes",
	"input_radio_3::No": "No",
	description:
		"If your camper is new to Camp Horizon and participated at another overnight camp, please advise the name and location of the camp and how your camper handled being away from home",
	checkbox:
		"Please select ALL session dates your camper is available to attend camp. We will prioritize your 1 st and 2 nd choice but may need to look at other date options if those are not available. Please note Adventure Camp is subject to eligibility requirements. First time campers must attend Base Camp.",
	"checkbox::Adventure Camp 1 - July 6-10*": "Adventure Camp 1 - July 6-10*",
	"checkbox::Base Camp 1 - July 13-17": "Base Camp 1 - July 13-17",
	"checkbox::Base Camp 2 - July 20-24": "Base Camp 2 - July 20-24",
	"checkbox::Adventure Camp 2 - August 4-8": "Adventure Camp 2 - August 3-7*",
	first_choice_199: "First Choice",
	second_choice_200: "Second Choice",
	input_text_1: "How many sessions would you like your camper to attend?",
	input_radio_5: "Camp Session Payment Method",
	"input_radio_5::Private Pay": "Private Pay",
	"input_radio_5::Respite Benefits – DSHS/DDA": "Respite Benefits – DSHS/DDA",
	custom_html_5:
		"Please provide information for the person responsible for paying.",
	names_5: "Name",
	payer_first_name: "Payer First Name",
	payer_last_name: "Payer Last Name",
	input_text_15: "Email Address",
	input_text_13: "Phone number",
	custom_html_6:
		"Please provide your Case Manager's information below. Note: Your Case Manager’s e-mail address is required for securing your camper’s pre-authorizations. Applications cannot be processed without the Case Manager’s valid email address.",
	names_4: "Name",
	input_text_12: "Email Address",
	input_text_16: "Phone number",
	contact_1_name_20: "Emergency Contact Name",
	contact_1_relationship_21: "Emergency Contact Relationship",
	contact_1_cell_phone_23: "Emergency Contact Cell Phone",
	mobility_36: "Mobility (select all that apply)",
	"mobility_36::Walks/runs independently": "Walks/runs independently",
	"mobility_36::Needs assistance walking/running":
		"Needs assistance walking/running",
	"mobility_36::Needs assistance with steps": "Needs assistance with steps",
	"mobility_36::Uses a cane": "Uses a cane",
	"mobility_36::Uses a walker": "Uses a walker",
	"mobility_36::Uses a manual wheelchair": "Uses a manual wheelchair",
	"mobility_36::Uses a motorized wheelchair": "Uses a motorized wheelchair",
	"mobility_36::Wears AFO’s or braces on legs": "Wears AFO’s or braces on legs",
	"mobility_36::Requires a gait belt": "Requires a gait belt",
	"mobility_36::Prone to falling": "Prone to falling",
	description_10:
		'Please provide more details about "Needs assistance walking/running."',
	description_23:
		'Please provide more details about "Wears AFO\'s or braces on legs."',
	if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_38:
		"Please describe transfer process and level of assistance needed.",
	if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_39:
		'Please provide more details about "Requires a gait belt."',
	if_your_camper_uses_a_wheelchair_describe_transfer_procedure_and_level_of_assistance_required_if_not_applicable_please_write_n_a_40:
		'Please provide more details about "Prone to falling."',
	describe_activity_participation_42: "Activity level (select all that apply) ",
	"describe_activity_participation_42::Has typical attention span":
		"Has typical attention span",
	"describe_activity_participation_42::Has short attention span":
		"Has short attention span",
	"describe_activity_participation_42::Easily distracted": "Easily distracted",
	"describe_activity_participation_42::Is hyperactive": "Is hyperactive",
	"describe_activity_participation_42::Will participate in most activities":
		"Will participate in most activities",
	"describe_activity_participation_42::Refuses to participate/ prefers to watch":
		"Refuses to participate/ prefers to watch",
	"describe_activity_participation_42::Is underactive (needs motivation)":
		"Is underactive (needs motivation)",
	"describe_activity_participation_42::Stays with group": "Stays with group",
	"describe_activity_participation_42::Wanders from group or is a “runner”":
		"Wanders from group or is a “runner”",
	description_11:
		'Please provide more details about "Has short attention span."',
	description_26:
		'Please provide more details about "Easily distracted," and strategies to redirect.',
	description_27:
		'Please provide more details about "Hyperactive," and strategies to redirect.',
	description_25:
		'Please provide more details about "Underactive (Needs Motivation)," and strategies to redirect.',
	description_24:
		"Please provide more details about \"Wanders from group or is a 'runner,'\" and strategies to redirect.",
	what_are_some_favorite_activities_45: "What are some favorite activities?",
	activities_your_camper_does_not_like_46:
		"What are some LEAST favorite activities?",
	checkbox_10: "Please select any that your camper would be interested in",
	"checkbox_10::Relaxation/Spa": "Relaxation/Spa",
	"checkbox_10::Arts and crafts": "Arts and crafts",
	"checkbox_10::Sports": "Sports",
	"checkbox_10::Sensory play": "Sensory play",
	"checkbox_10::Science experiments": "Science experiments",
	"checkbox_10::Games (digital or classic)": "Games (digital or classic)",
	"checkbox_10::Movies": "Movies",
	"checkbox_10::Cooking/baking": "Cooking/baking",
	"checkbox_10::Exploring nature": "Exploring nature",
	"checkbox_10::Music": "Music",
	checkbox_1: "Care Needs (select all that apply)",
	"checkbox_1::Has good fine motor skills": "Has good fine motor skills",
	"checkbox_1::Has poor fine motor skills": "Has poor fine motor skills",
	"checkbox_1::Needs hand over hand": "Needs hand over hand",
	"checkbox_1::Sensitive to loud noises": "Sensitive to loud noises",
	"checkbox_1::Sensitive to flashing/ twinkling lights or disco balls":
		"Sensitive to flashing/ twinkling lights or disco balls",
	description_12:
		'Please provide more details about "Has poor fine motor skills."',
	description_29: 'Please provide more details about "Needs hand over hand."',
	description_28:
		'Please provide more details about "Sensitive to loud noises." Please specify if they use headphones or earplugs. Include any additional details.',
	checkbox_2: "Hygiene and personal care (select all that apply)",
	"checkbox_2::Uses toilet independently ": "Uses toilet independently ",
	"checkbox_2::Uses a toilet on a schedule  ": "Uses a toilet on a schedule  ",
	"checkbox_2::Requires assistance using the toilet ":
		"Requires assistance using the toilet ",
	"checkbox_2::Does not use toilet at all; uses incontinence briefs ":
		"Does not use toilet at all; uses incontinence briefs ",
	"checkbox_2::Requires being woken at night to use the toilet":
		"Requires being woken at night to use the toilet",
	description_14: "Please provide schedule/usual times.",
	description_13:
		'Please provide more details about "Requires assistance using the toilet."',
	description_30:
		'Please provide more details about "Does not use a toilet. Uses incontinence briefs."',
	checkbox_3: "Showering (select all that apply) ",
	"checkbox_3::Can shower independently": "Can shower independently",
	"checkbox_3::Needs assistance adjusting water":
		"Needs assistance adjusting water",
	"checkbox_3::Needs verbal cues during shower":
		"Needs verbal cues during shower",
	"checkbox_3::Needs assistance shampooing": "Needs assistance shampooing",
	"checkbox_3::Needs assistance soaping": "Needs assistance soaping",
	"checkbox_3::Needs shower chair or bench": "Needs shower chair or bench",
	"checkbox_3::Needs complete assistance in the shower":
		"Needs complete assistance in the shower",
	"checkbox_3::Prefers evening shower": "Prefers evening shower",
	"checkbox_3::Prefers morning shower": "Prefers morning shower",
	description_15:
		'Please provide more details about "Needs verbal cues during shower."',
	description_33:
		'Please provide more details about "Needs assistance shampooing."',
	description_32:
		'Please provide more details about "Needs assistance with soaping."',
	description_31:
		'Please provide more details about "Needs complete assistance in the shower."',
	input_text_2: "How frequently does your camper shower?",
	input_text_3:
		"Please provide any additional details to help with personal hygiene and toileting.",
	checkbox_4: "Dressing (select all that apply)",
	"checkbox_4::Has no difficulty dressing": "Has no difficulty dressing",
	"checkbox_4::Needs some assistance with dressing/undressing":
		"Needs some assistance with dressing/undressing",
	"checkbox_4::Needs total assistance with dressing/undressing":
		"Needs total assistance with dressing/undressing",
	"checkbox_4::Needs assistance choosing clothes":
		"Needs assistance choosing clothes",
	"checkbox_4::Needs assistance tying shoes": "Needs assistance tying shoes",
	"checkbox_4::Needs assistance with buttons/snaps/zippers":
		"Needs assistance with buttons/snaps/zippers",
	"checkbox_4::Needs assistance with belt": "Needs assistance with belt",
	description_16:
		'Please provide more details about "Needs some assistance with dressing/undressing."',
	description_35:
		'Please provide more details about "Needs total assistance with dressing/undressing."',
	description_73:
		'Please provide more details about "Needs assistance choosing clothes."',
	description_36: "Please note any other dressing needs we should be aware of.",
	checkbox_5: "Sleep (select all that apply)",
	"checkbox_5::No sleep issues": "No sleep issues",
	"checkbox_5::Light Sleeper": "Light Sleeper",
	"checkbox_5::Heavy Sleeper": "Heavy Sleeper",
	"checkbox_5::Snores": "Snores",
	"checkbox_5::Uses CPAP or VPAP": "Uses CPAP or VPAP",
	"checkbox_5::Needs a night light": "Needs a night light",
	"checkbox_5::Sleep walks": "Sleep walks",
	"checkbox_5::Sings/cries at night": "Sings/cries at night",
	"checkbox_5::Needs to be woken up to use the toilet":
		"Needs to be woken up to use the toilet",
	"checkbox_5::Needs bed checks for incontinence":
		"Needs bed checks for incontinence",
	"checkbox_5::Has trouble falling asleep or staying asleep":
		"Has trouble falling asleep or staying asleep",
	description_17:
		'Please provide more details about "Uses CPAP or VPAP." Do they need assistance with this?',
	description_40:
		'Please provide more details and/or strategies used for "Sleep walks."',
	description_39:
		'Please provide more details and/or strategies used for "Sings/cries at night."',
	description_38:
		'Please provide more details about "Needs to be woken up to use the toilet."',
	description_37:
		'Please provide more details about "Needs bed checks for incontinence."',
	input_text_4:
		'Please provide more details about "Has trouble falling asleep or staying asleep."',
	input_text_19: "Please provide usual bedtime and usual wake-up time",
	input_text_5:
		"Please provide any schedule or other information that may be helpful with camper's night routine. ",
	checkbox_6: "Communication (Select all that apply) ",
	"checkbox_6::Verbal - no communication issues":
		"Verbal - no communication issues",
	"checkbox_6::Uses only single words": "Uses only single words",
	"checkbox_6::Uses complete sentences ": "Uses complete sentences ",
	"checkbox_6::Non-verbal ": "Non-verbal ",
	"checkbox_6::Mute": "Mute",
	"checkbox_6::Comprehends 2-3 words": "Comprehends 2-3 words",
	"checkbox_6::Comprehends complete sentences":
		"Comprehends complete sentences",
	"checkbox_6::Gestures/points": "Gestures/points",
	"checkbox_6::Stutters": "Stutters",
	"checkbox_6::Uses PEC board": "Uses PEC board",
	"checkbox_6::Uses Sign Language": "Uses Sign Language",
	"checkbox_6::Uses an AAC device": "Uses an AAC device",
	"checkbox_6::Writes to communicate": "Writes to communicate",
	"checkbox_6::Hearing impaired": "Hearing impaired",
	"checkbox_6::Uses hearing aids": "Uses hearing aids",
	description_18: 'Please provide more details about "Uses only single words."',
	description_47: 'Please provide more details about "Non-verbal."',
	description_46: 'Please provide more details about "Mute."',
	description_45: 'Please provide more details about "Comprehends 2-3 words."',
	description_44:
		'Please provide more details about "Gestures/points," and note common gestures used.',
	description_43: 'Please provide more details about "Uses sign language."',
	description_42: 'Please provide more details about "Uses an AAC device."',
	description_41: 'Please provide more details about "Hearing impaired."',
	input_text_6:
		"Please provide any other communication challenges, styles, and strategies that may be helpful.",
	checkbox_7: "Behaviors (Select all that apply)",
	"checkbox_7::Does well in large groups (12 or more individuals)":
		"Does well in large groups (12 or more individuals)",
	"checkbox_7::Does well in small groups (fewer than 12)":
		"Does well in small groups (fewer than 12)",
	"checkbox_7::Prefers to be alone": "Prefers to be alone",
	"checkbox_7::Sensitive to touch from others":
		"Sensitive to touch from others",
	"checkbox_7::Touches others - Hugging, poking, tapping":
		"Touches others - Hugging, poking, tapping",
	"checkbox_7::Quick to anger": "Quick to anger",
	"checkbox_7::Easily frustrated": "Easily frustrated",
	"checkbox_7::Uses profanity": "Uses profanity",
	"checkbox_7::Verbal outbursts": "Verbal outbursts",
	"checkbox_7::Throws objects": "Throws objects",
	"checkbox_7::Defiant behaviors": "Defiant behaviors",
	"checkbox_7::Exhibits Obsessive Compulsive Behaviors":
		"Exhibits Obsessive Compulsive Behaviors",
	description_19:
		'Please provide more details and/or strategies for "Touches others - Hugging, poking, tapping."',
	description_54:
		'Please provide more details and/or strategies for "Quick to anger."',
	description_53:
		'Please provide more details and/or strategies for "Easily frustrated."',
	description_52: 'Please provide more details about "Uses profanity."',
	description_51: 'Please provide more details about "Verbal outbursts."',
	description_50: 'Please provide more details about "Throws objects."',
	description_71:
		'Please provide more details and/or strategies about "Defiant behaviors." ',
	description_2:
		'Please list specific behaviors and strategies related to "Exhibits Obsessive Compulsive Behaviors."',
	description_1:
		"Does your camper have a history of physical or verbal aggression? If so, please provide triggers/circumstances and re-direction/de-escalation techniques used to calm your camper. ",
	input_radio_11: "Has your camper been charged or convicted of a crime?",
	"input_radio_11::Yes": "Yes",
	"input_radio_11::No": "No",
	description_74: "Please provide more details.",
	custom_html_8:
		"<p>We periodically have volunteer groups bring horses for riding, therapy animals or \"guests' from a petting zoo. Please let us know:</p>",
	input_text_7: "Is your camper afraid of animals? What kind?",
	input_text_8:
		"If your camper is allergic to any animals, please specify the type, reaction, and the severity.",
	custom_html_9:
		"<p>These are general medical questions, a Health Examination Form will be provided for your camper's Doctor or Nurse Practitioner to complete.</p>",
	list_all_foods_your_camper_cannot_eat_due_to_severe_intolerance_and_or_allergic_reactions_105:
		"Camper’s Primary Diagnosis",
	list_any_ingredients_in_processed_or_packaged_foods_your_camper_cannot_eat_due_to_intolerance_and_or_allergic_reactions_106:
		"Secondary Diagnosis",
	if_your_camper_ingests_or_comes_in_contact_with_any_foods_or_ingredients_listed_above_describe_his_her_reaction_please_include_physical_or_behavioral_signs_symptoms_evidenced_and_low_long_after_cont:
		"Chronic Medical Conditions: ",
	input_radio_9: "Does your camper have seizures?",
	"input_radio_9::Yes": "Yes",
	"input_radio_9::No": "No",
	list_emergency_protocols_recommended_by_your_campers_physician_to_treat_the_reaction_and_reverse_the_symptoms_for_example_benadryl_epi_pen_syrup_of_ipepac_etc_108:
		"Please list type, frequency and date of last seizure.",
	input_radio_10: "Do they have a written behavior plan in place?",
	"input_radio_10::Yes": "Yes",
	"input_radio_10::No": "No",
	checkbox_8: "Does your camper have any of the following",
	"checkbox_8::Urostomy Bag": "Urostomy Bag",
	"checkbox_8::Stoma/Colostomy Bag": "Stoma/Colostomy Bag",
	"checkbox_8::Catheter": "Catheter",
	"checkbox_8::Insulin Pump": "Insulin Pump",
	"checkbox_8::CPAP or BiPap Machine": "CPAP or BiPap Machine",
	"checkbox_8::Prosthetics": "Prosthetics",
	"checkbox_8::Medical or Cochlear Implants": "Medical or Cochlear Implants",
	"checkbox_8::Hearing Aids": "Hearing Aids",
	"checkbox_8::Dentures": "Dentures",
	"checkbox_8::Feeding Tube": "Feeding Tube",
	"checkbox_8::Not Applicable": "Not Applicable",
	description_20:
		"Urostomy Bag - What level of assistance and daily care do they need with this?",
	description_63:
		"Stoma/Colostomy Bag - What level of assistance and daily care do they need with this?",
	description_62:
		"Catheter - What level of assistance and daily care do they need with this?",
	description_61:
		"Insulin Pump - What level of assistance and daily care do they need with this?",
	description_60:
		"CPAP or BiPap Machine - What level of assistance and daily care do they need with this?",
	description_59:
		"Prosthetics - What level of assistance and daily care do they need with this?",
	description_58:
		"Medical or Cochlear Implants - What level of assistance and daily care do they need with this?",
	description_57:
		"Hearing Aids - What level of assistance and daily care do they need with this?",
	description_56:
		"Dentures - What level of assistance and daily care do they need with this?",
	description_72:
		"Feeding Tube - What level of assistance and daily care do they need with this?",
	description_21:
		"Please list any other devices or equipment your camper has and what level of assistance is needed.",
	description_4:
		"Please list ALL current medications with DOSAGE & TIME medication is administered (Morning, Mid-Day, Evening, As Needed)",
	custom_html_11:
		"Our kitchen staff must accommodate a wide range of medically required dietary restrictions and food allergies. We must distinguish between essential dietary restrictions and personal preference. We cannot accommodate personal preference. Please only list restrictions that are medically diagnosed/prescribed and not personal preference. The Health Exam Form must list these restrictions and/or allergies. We offer a variety of options at each meal for those with a limited selection of foods they will eat. Please reach out to acd@lionscamphorizon.org with additional questions or concerns regarding dietary needs.",
	description_5:
		"Has the applicant been diagnosed by a physician with a dietary condition such as Celiac Disease, PKU, Diabetes, food allergies, or any other condition? If yes, please list the condition and give a detailed description of dietary restrictions and reactions. Any dietary conditions or restrictions must be listed on the Health Exam Form by the physician.",
	checkbox_9:
		"Does the applicant have special dietary requirements ordered by his/her Doctor or Nutritionist?  (Select all that apply)",
	"checkbox_9::None": "None",
	"checkbox_9::Lactose/Dairy Free": "Lactose/Dairy Free",
	"checkbox_9::Gluten Free": "Gluten Free",
	"checkbox_9::Vegetarian": "Vegetarian",
	"checkbox_9::Sugar Free": "Sugar Free",
	"checkbox_9::Peanut Allergy": "Peanut Allergy",
	"checkbox_9::Pureed Food": "Pureed Food",
	"checkbox_9::Food Allergies": "Food Allergies",
	"checkbox_9::Other (please specify)": "Other (please specify)",
	description_6:
		"Lactose/Dairy Free - Please explain the severity, reaction, and details of the restriction.",
	description_66:
		"Gluten Free  - Please explain the severity, reaction, and details of the restriction.",
	description_65: "Vegetarian - Please give more details.",
	description_68:
		"Sugar Free - Please explain the severity, reaction, and details of the restriction.",
	description_67:
		"Peanuts - Please explain the severity, reaction, and details of the restriction.",
	description_69: "Pureed Foods - Please give more details.",
	description_70:
		"Food Allergies - Please explain the severity, reaction, and details of the restriction.",
	description_64: "Other dietary requirements",
	custom_html_14: "Parent/Guardian Consent Form",
	input_text_17: "Camper Name",
	input_radio_8: "Photo/Video Release:",
	"input_radio_8::Yes": "Yes",
	"input_radio_8::No": "No",
	checkbox_11: "I  agree to the Consent Form.",
	signature: "Signature",
	data_collection_consent_197: "Data Collection Consent",
	names_3: "Name",
};

const escapeHtml = (value = "") =>
	String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");

const formatDate = (raw = "") => {
	const digits = raw.replace(/\D/g, "").slice(0, 8);
	if (digits.length === 8) {
		return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
	}
	return raw;
};

const formatPhone = (raw = "") => {
	const digits = raw.replace(/\D/g, "").slice(0, 10);
	if (digits.length === 10) {
		return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
	}
	return raw;
};

const DATE_FIELDS = new Set(["input_mask"]);
const PHONE_FIELDS = new Set([
	"input_text_11",
	"input_text_13",
	"input_text_16",
	"contact_1_cell_phone_23",
	"contact_2_cell_phone_27",
]);

const formatValue = (key, value) => {
	if (Array.isArray(value)) {
		return value
			.map((entry) => (LABELS[entry] ? LABELS[entry] : entry))
			.filter(Boolean)
			.join(", ");
	}
	if (typeof value === "string" && LABELS[value]) {
		return LABELS[value];
	}
	if (value === true) return "Yes";
	if (value === false) return "No";

	if (typeof value === "string") {
		if (DATE_FIELDS.has(key)) {
			return formatDate(value);
		}

		const normalizedKey = key.toLowerCase();
		if (PHONE_FIELDS.has(key) || normalizedKey.includes("phone")) {
			return formatPhone(value);
		}
	}

	return value ?? "";
};

const buildPdf = (entries, submittedAt) =>
	new Promise((resolve, reject) => {
		const doc = new PDFDocument({ size: "LETTER", margin: 40 });
		const chunks = [];

		doc.on("data", (chunk) => chunks.push(chunk));
		doc.on("end", () => resolve(Buffer.concat(chunks)));
		doc.on("error", reject);

		doc
			.font("Helvetica-Bold")
			.fontSize(20)
			.fillColor("#0f172a")
			.text("New Camper Application Submission");
		doc.moveDown(0.35);
		doc
			.font("Helvetica")
			.fontSize(12)
			.fillColor("#475569")
			.text(`Submitted at: ${submittedAt ?? ""}`);
		doc.moveDown();

		const marginLeft = doc.page.margins.left;
		const marginRight = doc.page.margins.right;
		const usableWidth = doc.page.width - marginLeft - marginRight;
		const labelWidth = Math.floor(usableWidth * 0.32);
		const valueWidth = usableWidth - labelWidth;

		entries.forEach(({ label, pretty }, index) => {
			const display = pretty || "—";

			doc.font("Helvetica-Bold").fontSize(12);
			const labelHeight = doc.heightOfString(label, {
				width: labelWidth - 16,
				align: "left",
			});

			doc.font("Helvetica").fontSize(12);
			const valueHeight = doc.heightOfString(display, {
				width: valueWidth - 16,
				align: "left",
			});

			const rowHeight = Math.max(labelHeight, valueHeight) + 16;

			if (doc.y + rowHeight > doc.page.height - doc.page.margins.bottom) {
				doc.addPage();
			}

			const y = doc.y;
			const background = index % 2 === 0 ? "#ffffff" : "#e8f2fb";

			doc.save();
			doc.rect(marginLeft, y - 4, usableWidth, rowHeight).fill(background);
			doc.restore();

			doc
				.font("Helvetica-Bold")
				.fontSize(12)
				.fillColor("#0f172a")
				.text(label, marginLeft + 8, y + 2, {
					width: labelWidth - 16,
				});

			doc
				.font("Helvetica")
				.fontSize(12)
				.fillColor("#1f2937")
				.text(display, marginLeft + labelWidth + 8, y + 2, {
					width: valueWidth - 16,
				});

			doc.y = y + rowHeight;
			doc.x = marginLeft;
		});

		doc.end();
	});

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { values, submittedAt } = req.body;
	const replyToAddress =
		typeof values?.input_text_10 === "string" && values.input_text_10.trim()
			? values.input_text_10.trim()
			: undefined;

	// 2. Convert raw values to objects we can use for text & HTML
	const labeledEntries = [];
	const nameOverrides = new Set([
		"campers_name_1",
		"first_1_3",
		"middle_1_4",
		"last_1_6",
	]);
	const combinedFullName = (() => {
		const providedFull = formatValue("campers_name_1", values.campers_name_1);
		if (providedFull) return providedFull;
		const first = formatValue("first_1_3", values.first_1_3);
		const middle = formatValue("middle_1_4", values.middle_1_4);
		const last = formatValue("last_1_6", values.last_1_6);
		return [first, middle, last].filter(Boolean).join(" ").trim();
	})();

	if (combinedFullName) {
		labeledEntries.push({
			label: "Camper Name",
			pretty: combinedFullName,
		});
	}

	Object.entries(values).forEach(([key, value]) => {
		if (nameOverrides.has(key)) return;
		const label = LABELS[key] ?? key; // fallback to key if missing
		const pretty = formatValue(key, value);
		labeledEntries.push({ label, pretty });
	});

	const emailText = [
		"New Camper Application Submission",
		`Submitted at: ${submittedAt}`,
		"",
		...labeledEntries.map(({ label, pretty }) => `${label}: ${pretty}`),
	].join("\n");

	const htmlRows = labeledEntries
		.map(({ label, pretty }, index) => {
			const background = index % 2 === 0 ? "#ffffff" : "#e8f2fb";
			return `
				<tr style="background:${background};">
					<td style="padding:12px;border:1px solid #d0d7de;font-weight:600;width:30%;vertical-align:top;">
						${escapeHtml(label)}
					</td>
					<td style="padding:12px;border:1px solid #d0d7de;width:70%;vertical-align:top;">
						${escapeHtml(pretty)}
					</td>
				</tr>
			`;
		})
		.join("");

	const htmlEmail = `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<title>New Camper Application</title>
			</head>
			<body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5; background-color: #f5f5f5; margin: 0; padding: 24px;">
				<section style="max-width: 900px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 24px; box-shadow: 0 4px 14px rgba(0,0,0,0.08);">
					<h1 style="margin: 0 0 8px; font-size: 24px; color: #0f172a;">New Camper Application Submission</h1>
					<p style="margin: 0 0 20px; color: #475569;">Submitted at: <strong>${escapeHtml(
						submittedAt ?? ""
					)}</strong></p>
					<table style="width: 100%; border-collapse: collapse; font-size: 15px;">
						<tbody>
							${htmlRows}
						</tbody>
					</table>
				</section>
			</body>
		</html>
	`;

	// 3. Prepare transporter (SMTP)
	const transporter = nodemailer.createTransport({
		host: process.env.PRIVATEEMAIL_HOST,
		port: 587,
		secure: process.env.SMTP_SECURE === "true",
		auth: {
			user: process.env.PRIVATEEMAIL_USER,
			pass: process.env.PRIVATEEMAIL_PASS,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	try {
		const pdfBuffer = await buildPdf(labeledEntries, submittedAt);
		const camperName =
			combinedFullName ||
			formatValue("campers_name_1", values.campers_name_1) ||
			formatValue("input_text_17", values.input_text_17) ||
			"Camper";
		await transporter.sendMail({
			from: process.env.PRIVATEEMAIL_USER ?? process.env.PRIVATEEMAIL_USER,
			to: process.env.NOTIFY_EMAILS,
			...(replyToAddress ? { replyTo: replyToAddress } : {}),
			subject: `Camper Application from ${camperName}`,
			text: emailText,
			html: htmlEmail,
			attachments: [
				{
					filename: "camper-application.pdf",
					content: pdfBuffer,
				},
			],
		});

		return res.status(200).json({ ok: true });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: err.message });
	}
}
