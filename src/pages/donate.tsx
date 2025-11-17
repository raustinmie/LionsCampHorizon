import GenericSeo from "@/components/seo/generic-seo";
import { companyName } from "@/constants";
import { FaqQuestionAndAnswer } from "@/components/seo/faq-seo";
import HeroD2149 from "@/components/stitches/donate/hero-d-2149/hero-d-2149";
import ServicesD2198 from "@/components/stitches/donate/services-d-2198/services-d-2198";
import SbsD2369 from "@/components/stitches/donate/sbs-d-2369/sbs-d-2369";
import CustomSbsD from "@/components/stitches/donate/custom-sbs-d/custom-sbs-d";
import CustomSbsrD from "@/components/stitches/donate/custom-sbsr-d/custom-sbsr-d";
import Cta403 from "@/components/stitches/shared/cta-403/cta-403";
import Link from "next/link";
export default function Donate() {
	const faqData: FaqQuestionAndAnswer[] = [
		{
			question: "What if I've never been to camp before?",
			answer:
				"We would love to have you! We know that a first-time camp experience can feel exciting — and sometimes a little overwhelming — so we’re here to help you feel comfortable every step of the way. We encourage new campers and families to schedule a tour, meet our staff, and get answers to any questions you may have.",
		},
		{
			question:
				"What if I can't afford to pay for Camp? Will DSHS cover the cost of camp?",
			answer:
				"We never want finances to be the reason someone misses out on camp. We offer financial assistance through CAMPerships, as well as no-cost payment plans for families paying privately. Camp Horizon is also an approved DSHS/DDA Respite Care Provider, and we can work directly with your Case Resource Manager to coordinate billing if you receive respite benefits.",
		},
		{
			question: "Can I come to camp if I have special dietary requirements?",
			answer: `Yes, in most cases we are able to accommodate medically required dietary
restrictions. While we do not prepare fully individualized menus, we offer a variety
of food options at each meal and do our best to work with your camper’s dietary
needs. If your camper has specific dietary restrictions, we encourage you to
contact us so we can review your camper’s specific requirements and make sure
we can safely support them.`,
		},
		{
			question: "Do I need a Physical Exam before I can attend camp?",
			answer: `Yes. A new physical/health exam form is required each year. This helps us
ensure we have the most up-to-date medical information so we can keep all
campers safe and properly supported. All medications brought to camp must also
match the information provided by your doctor on the health exam form.`,
		},
	];
	return (
		<div>
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
			<HeroD2149 />
			<ServicesD2198 />
			<SbsD2369 />
			<CustomSbsD />
			<CustomSbsrD />
			<Cta403
				imageSrc="/images/donate-bbq.jpg"
				imageAlt="A couple in front of a barbecue"
				title="How to Donate"
				buttonText="
			Donate Today"
				subtitle={
					<div>
						<p className="cs-text">
							Your support makes a real impact on camp. If you’d like to discuss
							donation options or learn more about giving to Camp Horizon,
							please contact us.{" "}
							<Link className="cs-link" href="tel:3603710531">
								360-371-0531
							</Link>{" "}
							or{" "}
							<Link className="cs-link" href="tel:3603710531">
								admin@lionscamphorizon.org
							</Link>
						</p>
						<ul>
							<li>
								Donations can be mailed to Lions Camp Horizon 7506 Gemini St.
								Blaine, WA 98230. Or click the button below!
							</li>
						</ul>
					</div>
				}
				linkHref=""
			/>
		</div>
	);
}
