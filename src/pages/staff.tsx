import GenericSeo from "@/components/seo/generic-seo";
import HeroS2149 from "@/components/stitches/staff/hero-s-2149/hero-s-2149";
import {
	canonicalUrl,
	companyName,
	facebookUrl,
	instagramUrl,
	locality,
	primaryAddress1,
	primaryEmail,
	staffApplicationLink,
	state,
	zip,
} from "@/constants";
import Services2387 from "@/components/stitches/staff/services-2387/services-2387";
import Cta403 from "@/components/stitches/shared/cta-403/cta-403";
import GalleryS1152 from "@/components/stitches/staff/gallery-s-1152/gallery-s-1152";
import Cta697 from "@/components/stitches/shared/cta-697/cta-697";
import { WithContext, Organization, JobPosting } from "schema-dts";

export default function Staff() {
	const staffJsonLd: WithContext<Organization | JobPosting>[] = [
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			name: companyName,
			url: `${canonicalUrl}staff`,
			sameAs: [facebookUrl, instagramUrl],
			address: {
				"@type": "PostalAddress",
				streetAddress: primaryAddress1,
				addressLocality: locality,
				addressRegion: state,
				postalCode: zip,
				addressCountry: "US",
			},
			telephone: "primaryPhone",
			email: primaryEmail,
			nonprofitStatus: "Nonprofit501c3",
		},
	];

	return (
		<div>
			<GenericSeo
				title="Staff Opportunities | Lions Camp Horizon"
				description="Join the team at Lions Camp Horizon in Blaine, WA! Seasonal positions for counselors, activities coordinators, kitchen staff, and medical support are available for our summer camp serving teens and adults with disabilities. Experience a summer full of fun, friendship, and meaningful work."
				ogDescription="Looking for a summer of joy, teamwork, and making a difference? Lions Camp Horizon is hiring seasonal staff to support teens and adults with disabilities at our overnight summer camp in Blaine, WA."
				canonicalUrlPath="staff"
				jsonLd={staffJsonLd}
			/>
			<HeroS2149 />
			<Services2387 />
			<Cta403
				imageSrc="/images/staff-cta.jpg"
				title="Lions Camp Horizon is an equal opportunity employer."
				subtitle="We don't just accept diversity; we embrace it."
				buttonText="Apply Online"
				linkHref={staffApplicationLink}
				imageAlt="a camper and counselor"
			/>
			<GalleryS1152 />
			<Cta697
				bannerText="Help us serve our campers!"
				buttonText="Donate"
				linkHref="/donate"
			/>
		</div>
	);
}
