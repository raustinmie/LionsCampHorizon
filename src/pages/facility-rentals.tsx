import GenericSeo from "@/components/seo/generic-seo";
import Cta403 from "@/components/stitches/shared/cta-403/cta-403";
import HeroF2149 from "@/components/stitches/facility-rentals/hero-f-2149/hero-f-2149";
import Services1168 from "@/components/stitches/facility-rentals/services-1168/services-1168";
import Services961 from "@/components/stitches/facility-rentals/services-961/services-961";
import Cta697 from "@/components/stitches/shared/cta-697/cta-697";
import Reviews306 from "@/components/stitches/shared/reviews-306/reviews-306";
import Image from "next/image";
import { WithContext, Place, Service } from "schema-dts";
export default function FacilityRentals() {
	const facilitySpacesJsonLd: WithContext<Place>[] = [
		{
			"@context": "https://schema.org",
			"@type": "Place",
			name: "Dormitories",
			description:
				"Four rustic Airforce Station dormitories with 46 beds per building, shared restrooms, and TV lounge. Accommodates up to 184 guests total.",
			address: {
				"@type": "PostalAddress",
				streetAddress: "7506 Gemini Street",
				addressLocality: "Blaine",
				addressRegion: "WA",
				postalCode: "98230",
				addressCountry: "US",
			},
			maximumAttendeeCapacity: 184,
		},
		{
			"@context": "https://schema.org",
			"@type": "Place",
			name: "Webster Conference Center",
			description:
				"Conference building with large open room, library-style breakout area, kitchenette, folding tables and chairs. Max occupancy 69.",
			address: {
				"@type": "PostalAddress",
				streetAddress: "7506 Gemini Street",
				addressLocality: "Blaine",
				addressRegion: "WA",
				postalCode: "98230",
				addressCountry: "US",
			},
			maximumAttendeeCapacity: 69,
		},
		{
			"@context": "https://schema.org",
			"@type": "Place",
			name: "Theatre",
			description:
				"Theatre-style seating with wheelchair accessible stage, projection screen, and small kitchen area. Max occupancy 99.",
			address: {
				"@type": "PostalAddress",
				streetAddress: "7506 Gemini Street",
				addressLocality: "Blaine",
				addressRegion: "WA",
				postalCode: "98230",
				addressCountry: "US",
			},
			maximumAttendeeCapacity: 99,
		},
		{
			"@context": "https://schema.org",
			"@type": "Place",
			name: "Commercial Kitchen & Dining Hall",
			description:
				"Professional-grade commercial kitchen updated in 2017, dining hall seats 99. Suitable for group meal prep or small food business use.",
			address: {
				"@type": "PostalAddress",
				streetAddress: "7506 Gemini Street",
				addressLocality: "Blaine",
				addressRegion: "WA",
				postalCode: "98230",
				addressCountry: "US",
			},
			maximumAttendeeCapacity: 99,
		},
		{
			"@context": "https://schema.org",
			"@type": "Place",
			name: "Craft Building",
			description:
				"Bright craft space with large tables and room for hands-on activities. Includes small restroom for convenience.",
			address: {
				"@type": "PostalAddress",
				streetAddress: "7506 Gemini Street",
				addressLocality: "Blaine",
				addressRegion: "WA",
				postalCode: "98230",
				addressCountry: "US",
			},
		},
		{
			"@context": "https://schema.org",
			"@type": "Place",
			name: "Game Room",
			description:
				"Lounge area with pool tables, air hockey, cards, and vintage two-lane bowling alley.",
			address: {
				"@type": "PostalAddress",
				streetAddress: "7506 Gemini Street",
				addressLocality: "Blaine",
				addressRegion: "WA",
				postalCode: "98230",
				addressCountry: "US",
			},
		},
		{
			"@context": "https://schema.org",
			"@type": "Place",
			name: "Firepit",
			description:
				"Outdoor fire pit with benches for group gatherings, campfires, and storytelling.",
			address: {
				"@type": "PostalAddress",
				streetAddress: "7506 Gemini Street",
				addressLocality: "Blaine",
				addressRegion: "WA",
				postalCode: "98230",
				addressCountry: "US",
			},
		},
		{
			"@context": "https://schema.org",
			"@type": "Place",
			name: "Outdoor Pavilion (Coming 2026)",
			description:
				"Covered outdoor gathering space for events and campers. Generous gift from Andersen Construction, available for future rentals.",
			address: {
				"@type": "PostalAddress",
				streetAddress: "7506 Gemini Street",
				addressLocality: "Blaine",
				addressRegion: "WA",
				postalCode: "98230",
				addressCountry: "US",
			},
		},
	];

	return (
		<div>
			<GenericSeo
				title="Facility Rentals | Lions Camp Horizon"
				description="Host your next retreat, reunion, or event at Lions Camp Horizon in Blaine, WA. Our campus features dormitories, conference spaces, a theatre, commercial kitchen, craft building, and firepit, accommodating groups of all sizes from day events to overnight stays."
				ogDescription="Looking for the perfect venue near Birch Bay, WA? Lions Camp Horizon offers flexible facility rentals with dorms, meeting spaces, a theatre, commercial kitchen, and more. Ideal for retreats, family reunions, trainings, and special events."
				canonicalUrlPath="facility-rentals"
				jsonLd={facilitySpacesJsonLd}
			/>
			<HeroF2149 />
			<Services961 />
			<Cta403
				imageSrc="/images/facilities-application.jpg"
				imageAlt="Lions Camp Horizon dining hall"
				title="Rental Application"
				subtitle="Ready to rent our campus"
				buttonText="Rental Application"
				linkHref="https://www.jotform.com/form/252857241323051"
			/>
			<Services1168 />
			<Reviews306
				imageSrc="/images/facilities-review.jpg"
				referralText="When we get together at Camp Horizon, something magical happens.  We laugh louder, grow closer and leave as a stronger community.  It's the perfect place to unplug, reconnect and soak up the summer camp feeling."
			/>
			<Cta697
				bannerText="Help us serve our campers!"
				buttonText="Donate"
				linkHref="/donate"
			/>
		</div>
	);
}
