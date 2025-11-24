import AboutSeo from "@/components/seo/about-seo";
import { FaqQuestionAndAnswer } from "@/components/seo/faq-seo";
import CustomHero from "@/components/stitches/who-we-are/custom-hero/custom-hero";
import Services2198 from "@/components/stitches/who-we-are/services-2198/services-2198";
import MeetTeam1141 from "@/components/stitches/who-we-are/meet-team-1141/meet-team-1141";
import Gallery1152 from "@/components/stitches/who-we-are/gallery-1152/gallery-1152";
import BoardSection from "@/components/stitches/who-we-are/board-section/board-section";
import Sbsr2217 from "@/components/stitches/who-we-are/sbsr-2217/sbsr-2217";
import Sbsr2217B from "@/components/stitches/who-we-are/sbsr-2217b/sbsr-2217b";
import Sbsr2217C from "@/components/stitches/who-we-are/sbsr-2217c/sbsr-2217c";
import Reviews306 from "@/components/stitches/shared/reviews-306/reviews-306";
import Cta697 from "@/components/stitches/shared/cta-697/cta-697";
export default function About() {
	return (
		<div>
			<AboutSeo
				description="Lions Camp Horizon is a welcoming summer camp in Blaine, WA for teens and adults with disabilities. For over 50 years, we’ve fostered independence, confidence, and lifelong friendships through safe, inclusive recreational programs and supportive community experiences."
				ogDescription="Discover Lions Camp Horizon: a summer camp where teens and adults with disabilities can relax, grow, and make lifelong friends. Since 1974, our safe, supportive programs in Blaine, WA have empowered campers to explore their abilities, build confidence, and enjoy unforgettable summer experiences.
"
			/>
			<CustomHero />
			<Services2198 />
			<MeetTeam1141 />
			<Gallery1152 />
			<BoardSection />
			<Sbsr2217 />
			<Sbsr2217B />
			<Sbsr2217C />
			<Reviews306
				imageSrc="/images/wwa-review.avif"
				imageWidth={2862}
				imageHeight={3486}
				referralText="Volunteering at Camp Horizon is one of the highlights of my summer.  The campers and staff are so enjoyable to be around.  The smiles and laughs from all are good for the soul."
				referrerName="Holly L."
				referrerTitle="Lions Camp Horizon Volunteer"
			/>
			<Cta697
				bannerText="Help us serve our campers!"
				buttonText="Donate"
				linkHref="/donate"
			/>
		</div>
	);
}
