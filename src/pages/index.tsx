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
				description="Lions Camp Horizon offers safe, joyful overnight summer camps for teens and adults with disabilities. Located in Blaine, WA, our weekly sessions build confidence, independence and lifelong friendships in an inclusive environment where everyone belongs."
				ogDescription="Experience the joy of summer at Lions Camp Horizon. For over 50 years, we’ve welcomed teens and adults with all types of disabilities to a safe, fun-filled overnight camp that celebrates abilities, encourages independence and creates lifelong friendships."
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
