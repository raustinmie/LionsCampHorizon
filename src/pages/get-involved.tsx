import GenericSeo from "@/components/seo/generic-seo";
import { companyName, canonicalUrl } from "@/constants";
import Cta697 from "@/components/stitches/shared/cta-697/cta-697";
import HeroG2149 from "@/components/stitches/get-involved/hero-g-2149/hero-g-2149";
import SbsG2376 from "@/components/stitches/get-involved/sbs-g-2376/sbs-g-2376";
import CustomSbs from "@/components/stitches/get-involved/custom-sbs/custom-sbs";
import Pricing1842 from "@/components/stitches/get-involved/pricing-1842/pricing-1842";

export default function GetInvolved() {
	return (
		<div>
			<GenericSeo
				title={`Get Involved | ${companyName}`}
				description="Learn how to make a difference at Lions Camp Horizon in Blaine, WA. Volunteer, donate, or support our programs to help teens and adults with disabilities experience a summer full of fun, friendships, and life-changing memories."
				ogDescription="Camp Horizon thrives thanks to generous volunteers and donors. Discover ways to get involved—serve meals, help with projects, share talents, or become a financial partner—and create lasting memories for teens and adults with disabilities."
				canonicalUrlPath="/get-involved"
				jsonLd={{
					"@context": "https://schema.org",
					"@type": "WebPage",
					name: "Get Involved",
					url: `${canonicalUrl}get-involved`,
					description:
						"Learn how to make a difference at Lions Camp Horizon in Blaine, WA. Volunteer, donate, or support our programs to help teens and adults with disabilities experience a summer full of fun, friendships, and life-changing memories.",
				}}
			/>
			<HeroG2149 />
			<SbsG2376 />
			<CustomSbs />
			<Pricing1842 />
			<Cta697
				bannerText="Help us serve our campers!"
				buttonText="Donate"
				linkHref="/donate"
			/>
		</div>
	);
}
