import GenericSeo from "@/components/seo/generic-seo";
import { companyName, canonicalUrl } from "@/constants";
import Cta697 from "@/components/stitches/shared/cta-697/cta-697";
import Image from "next/image";

export default function SpecialEvents() {
	return (
		<div id="special-events">
			<GenericSeo
				title={`Special Events | ${companyName}`}
				description="Stay up to date on special events at Lions Camp Horizon in Blaine, WA. This page will feature upcoming activities, community gatherings, and unique programs for teens and adults with disabilities."
				ogDescription="Check out the latest special events at Lions Camp Horizon! From community gatherings to unique programs for teens and adults with disabilities, this page will showcase all upcoming events in Blaine, WA. Stay tuned for updates!"
				canonicalUrlPath="special-events"
				jsonLd={{
					"@context": "https://schema.org",
					"@type": "WebPage",
					name: "Special Events",
					url: `${canonicalUrl}special-events`,
					description:
						"Stay up to date on special events at Lions Camp Horizon in Blaine, WA. This page will feature upcoming activities, community gatherings, and unique programs for teens and adults with disabilities.",
				}}
			/>
			<div id="special-events-hero">
				<div className="cs-picture">
					<Image
						priority
						src="/images/special-hero.jpg"
						alt="Men ready for construction in front of a Lions Camp Horizon building"
						fill
					/>
					<div className="cs-title-section">
						<div className="cs-title">Special Events</div>
						<div className="cs-subtitle">
							Learn what's happening at Lions Camp Horizon
						</div>
					</div>
				</div>
				<div className="check-back-section">
					Please check back for upcoming special events!
				</div>
			</div>
			<Cta697
				bannerText="Help us serve our campers!"
				buttonText="Donate"
				linkHref="/donate"
			/>
		</div>
	);
}
