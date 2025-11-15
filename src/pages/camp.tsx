import GenericSeo from "@/components/seo/generic-seo";
import CustomCta from "@/components/stitches/camp/custom-cta/custom-cta";
import HeroC2149 from "@/components/stitches/camp/hero-c-2149/hero-c-2149";
import Sbs2375 from "@/components/stitches/camp/sbs-2375/sbs-2375";
import Sbs2375B from "@/components/stitches/camp/sbs-2375-b/sbs-2375-b";
import { companyName } from "@/constants";
import Link from "next/link";
import Faq2216 from "@/components/stitches/camp/faq-2216/faq-2216";
import { FaqQuestionAndAnswer } from "@/components/seo/faq-seo";
import Reviews306 from "@/components/stitches/shared/reviews-306/reviews-306";

export default function Camp() {
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
			<HeroC2149 />
			<Sbs2375 />
			<CustomCta />
			<Sbs2375B />
			<div className="policy-section">
				<h2>Please review camp policies</h2>
				<div className="policy-links">
					<Link className="cs-button-solid secondary" href="">
						Policies
					</Link>
					<Link className="cs-button-solid secondary" href="">
						Physical Exam Form
					</Link>
				</div>
			</div>
			<Faq2216 faqData={faqData} />
			<Reviews306
				imageSrc="/images/camp-review.jpg"
				referralText="“Camp is the most awesome place on Earth, and that is the absolute 100% truth."
				referrerName="Trevor E."
				referrerTitle="Lions Camp Horizon Camper"
			/>
			<div className="divider" />
		</div>
	);
}
