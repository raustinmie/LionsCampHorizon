import GenericSeo from "@/components/seo/generic-seo";
import HeroS2149 from "@/components/stitches/staff/hero-s-2149/hero-s-2149";
import { companyName, staffApplicationLink } from "@/constants";
import { FaqQuestionAndAnswer } from "@/components/seo/faq-seo";
import Services2387 from "@/components/stitches/staff/services-2387/services-2387";
import Cta403 from "@/components/stitches/shared/cta-403/cta-403";
import GalleryS1152 from "@/components/stitches/staff/gallery-s-1152/gallery-s-1152";
import Cta697 from "@/components/stitches/shared/cta-697/cta-697";
import Image from "next/image";

export default function SpecialEvents() {
	const faqData: FaqQuestionAndAnswer[] = [
		{
			question: "What if I've never been to a camp before?",
			answer: "",
		},
		{
			question:
				"What if I can't afford to pay for Camp? Will DSHS cover the cost of camp?",
			answer:
				"We never want finances to be the reason someone misses out on camp. We offer financial assistance through CAMPerships, as well as no-cost payment plans for families paying privately. Camp Horizon is also an approved DSHS/DDA Respite Care Provider, and we can work directly with your Case Resource Manager to coordinate billing if you receive respite benefits.",
		},
		{
			question: "Can I come to camp if I have special dietary requirements?",
			answer: "",
		},
		{
			question: "Do I need a Physical Exam before I can attend camp?",
			answer: "",
		},
	];
	return (
		<div id="special-events">
			<GenericSeo
				description="Join 110 makers at Red Barn Market! Share your goods with thousands of shoppers at Whatcom County’s favorite seasonal market."
				ogDescription="Be part of Red Barn Market’s vibrant vendor family. Showcase your handmade, vintage, or specialty items to eager shoppers in a lively holiday setting."
				title={`${companyName} | Camp`}
				canonicalUrlPath="vendor-information"
				jsonLd={{
					"@context": "https://schema.org",
					"@type": "Service",
					name: "Vendor Booth at Red Barn Market",
					description:
						"Vendor opportunities for Red Barn Market, Whatcom County's top holiday pop-up. Share handmade, vintage, and specialty goods with thousands of visitors.",
					provider: {
						"@type": "Organization",
						name: "Red Barn Market",
						url: "https://redbarnmarketevents.com",
					},
					areaServed: {
						"@type": "AdministrativeArea",
						name: "Whatcom County, WA",
					},
					offers: {
						"@type": "Offer",
						url: "https://redbarnmarketevents.com/vendor-information",
						price: "Variable",
						priceCurrency: "USD",
						eligibleRegion: {
							"@type": "AdministrativeArea",
							name: "Whatcom County, WA",
						},
						availability: "https://schema.org/InStock",
					},
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
