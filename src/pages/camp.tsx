import GenericSeo from "@/components/seo/generic-seo";
import CustomCta from "@/components/stitches/camp/custom-cta/custom-cta";
import HeroC2149 from "@/components/stitches/camp/hero-c-2149/hero-c-2149";
import Sbs2375 from "@/components/stitches/camp/sbs-2375/sbs-2375";
import Sbs2375B from "@/components/stitches/camp/sbs-2375-b/sbs-2375-b";
import Link from "next/link";
import Faq2216 from "@/components/stitches/camp/faq-2216/faq-2216";
import { FaqQuestionAndAnswer } from "@/components/seo/faq-seo";
import Reviews306 from "@/components/stitches/shared/reviews-306/reviews-306";
import CampSeo from "@/components/seo/camp-seo";

export default function Camp() {
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
			<CampSeo
				faqData={faqData}
				description="Discover overnight summer camp experiences for teens and adults with disabilities at Lions Camp Horizon in Blaine, WA. Our Base Camp and Adventure Camp sessions build confidence, independence and lifelong friendships in a safe, inclusive environment."
				ogDescription="Experience the joy of summer at Lions Camp Horizon. Our overnight Base Camp and Adventure Camp programs welcome teens and adults with disabilities for a week of friendship, belonging, and unforgettable experiences where abilities—not disabilities—guide every day."
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
