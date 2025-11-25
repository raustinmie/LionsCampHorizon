import React from "react";
import Image from "next/image";

export default function HeroD2149() {
	return (
		<section id="hero-d-2149">
			<div className="cs-container">
				{/* Background Image */}
				<div className="cs-background">
					<Image
						src="/images/donate-hero1.jpeg"
						alt="A collage of happy campers"
						height={300}
						width={200}
						className="cs-desktop-only"
					/>
					<Image
						src="/images/donate-hero2.jpeg"
						alt="A collage of happy campers"
						height={300}
						width={200}
					/>
					<Image
						src="/images/donate-hero3.jpeg"
						alt="A collage of happy campers"
						height={300}
						width={200}
					/>
					<Image
						src="/images/donate-hero4.jpeg"
						alt="A collage of happy campers"
						height={300}
						width={200}
					/>
					<Image
						src="/images/donate-hero5.jpeg"
						alt="A collage of happy campers"
						height={300}
						width={200}
						className="cs-desktop-only"
					/>
				</div>
			</div>

			<div className="cs-content">
				<h1 className="cs-title">Donate</h1>
				<p className="cs-text">
					Your generosity brings camp to life and makes every smile contagious!
					Your donations help support campers facing financial hardship, allow
					us to continually improve our programs, and keep Camp Horizon safe,
					accessible, and full of joy. Every dollar counts!
				</p>
			</div>
		</section>
	);
}
