import React from "react";
import Hero2149 from "@/components/stitches/home/hero-2149/hero-2149";
import HomeSeo from "@/components/seo/home-seo";
import Sbs2369 from "@/components/stitches/home/sbs-2369/sbs-2369";
import Sbsr2181 from "@/components/stitches/home/sbsr-2181/sbsr-2181";
import Reviews306 from "@/components/stitches/shared/reviews-306/reviews-306";
import Cta1132 from "@/components/stitches/home/cta-1132/cta-1132";

export default function Home() {
	return (
		<div style={{ width: "100%" }}>
			<HomeSeo
				description="Discover Whatcom County’s favorite seasonal pop-up! Red Barn Market brings 110 local makers to the NW Washington Fairgrounds, Nov 14-15."
				ogDescription="Red Barn Market is Whatcom County’s top holiday market — 110 vendors, festive finds, and VIP early access Nov 14-15 at the NW Washington Fairgrounds."
			/>
			<Hero2149 />
			<Sbs2369 />
			<Sbsr2181 />
			<div className="header">Lions Camp Horizon's First 50 Years</div>
			<div className="video-container">
				<iframe
					className="video"
					src="https://player.vimeo.com/video/945544832?h=21c3b2c47d"
					title="YouTube video player"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
			<Reviews306
				imageSrc="/images/home-review.jpg"
				referralText="Camp Horizon is all about friendships, loving counselors and making summer memories!"
				referrerName="Megan H."
				referrerTitle="Lions Camp Horizon Camper"
			/>
			<Cta1132 />
		</div>
	);
}
