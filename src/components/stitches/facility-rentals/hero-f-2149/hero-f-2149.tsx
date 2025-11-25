import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function HeroF2149() {
	return (
		<section id="hero-f-2149">
			<div className="cs-container">
				<span className="cs-topper">Facility Rentals </span>

				{/* Background Image */}
				<div className="cs-background">
					<Image
						src="/images/facilities-hero.avif"
						alt="rows of camp horizon dorms"
						fill
					/>
				</div>
			</div>

			<div className="cs-content">
				<h1 className="cs-title">More Than Just a Summer Camp</h1>
				<p className="cs-text">
					While our campus proudly hosts Lions Camp Horizon each summer, it’s
					also an ideal venue for group retreats, family reunions, conferences,
					trainings, special events, and even commercial kitchen use. Tucked
					away in Bay Horizon Park, our campus is just minutes from Birch Bay
					and conveniently located near I-5—only 10 minutes from Canada and 20
					minutes from Bellingham. Come explore all we have to offer!
				</p>
			</div>
		</section>
	);
}
