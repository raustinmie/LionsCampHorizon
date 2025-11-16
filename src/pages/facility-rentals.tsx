import GenericSeo from "@/components/seo/generic-seo";
import Cta403 from "@/components/stitches/shared/cta-403/cta-403";
import HeroF2149 from "@/components/stitches/facility-rentals/hero-f-2149/hero-f-2149";
import Services1168 from "@/components/stitches/facility-rentals/services-1168/services-1168";
import Services961 from "@/components/stitches/facility-rentals/services-961/services-961";
import Cta697 from "@/components/stitches/shared/cta-697/cta-697";
import Reviews306 from "@/components/stitches/shared/reviews-306/reviews-306";
import Image from "next/image";
export default function MarketInformation() {
	return (
		<div>
			<GenericSeo
				description="Browse 110 makers featured at Red Barn Market! Explore holiday gifts, décor, treats, and more from talented vendors across Whatcom County."
				ogDescription="Meet the 110 vendors bringing handmade goods, décor, treats, and festive finds to Red Barn Market. Discover your new favorite local maker this holiday season."
				title="Red Barn Market Events - Vendor Information"
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
