import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Hero2149() {
	return (
		<section id="hero-2149">
			<div className="cs-container">
				{/* Background Image */}
				<div className="cs-background">
					<Image
						src="/images/home-hero-bumper.jpg"
						alt="camper and counselor in a go kart"
						height={728}
						width={720}
						priority
						className="cs-header-image cs-header-image1"
					/>
					<Image
						src="/images/logo.png"
						alt="logo"
						height={1512}
						width={2016}
						priority
						className="cs-header-image cs-header-image2"
					/>
					<Image
						src="/images/home-hero-circle.jpg"
						alt="campers sitting in a circle on the grass"
						height={1512}
						width={2016}
						className="cs-header-image cs-header-image3"
						priority
					/>
				</div>
			</div>

			<div className="cs-content">
				<h1 className="cs-title">
					Where everyone belongs! Spreading sunshine, smiles and the joy of
					summer camp to teens and adults of all abilities for over 50 years.{" "}
				</h1>
				<p className="cs-text">
					At Lions Camp Horizon, abilities—not disabilities—guide us. We provide
					safe, joyful summer camp experiences that build confidence,
					independence, and lifelong friendships.
				</p>
			</div>
		</section>
	);
}
