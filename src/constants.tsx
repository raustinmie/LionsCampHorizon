const canonicalUrl = "https://www.lionscamphorizon.org/";
export { canonicalUrl };

const ogImagePath = `${canonicalUrl}`;
export { ogImagePath };

const ogIconPath = "";
export { ogIconPath };

const companyName = "Lions Camp Horizon";
export { companyName };

// A zero-width space was added in contact, don't forget to update that spot.
const primaryEmail = "admin@lionscamphorizon.org";
export { primaryEmail };

const primaryPhone = "360-371-0531";
export { primaryPhone };

const primaryAddress1 = "7506 Gemini Street";
export { primaryAddress1 };

const locality = "Blaine";
export { locality };

const state = "WA";
export { state };

const zip = "98230";
export { zip };

const primaryAddress2 = `${locality}, ${state} ${zip}`;
export { primaryAddress2 };

const facebookUrl = "https://www.facebook.com/CampHorizonBlaine";
export { facebookUrl };

const instagramUrl = "https://www.instagram.com/lions_camp_horizon/";
export { instagramUrl };

const staffApplicationLink = "https://form.jotform.com/252855980249167";
export { staffApplicationLink };

const rentalApplictaionLink = "https://form.jotform.com/252857241323051";
export { rentalApplictaionLink };

const now = new Date();
const year = now.getFullYear();
const openDate = new Date(`${year}-01-15T00:00:00`);
const closeDate = new Date(`${year}-07-15T23:59:59`);
const isOpen = now >= openDate && now <= closeDate;
export { isOpen };
