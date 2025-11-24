import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function HeroG2149() {
	return (
		<section id="hero-g-2149">
			<div className="cs-container">
				{/* Background Image */}
				<div className="cs-background">
					<Image
						src="/images/get-involved-hero1.avif"
						className="cs-image2"
						alt="a border patrol agent with a thank you card"
						width={1512}
						height={2016}
					/>
					<Image
						src="/images/get-involved-hero2.avif"
						className="cs-image1"
						alt="a camp conga line"
						width={1280}
						height={960}
					/>{" "}
					<Image
						src="/images/get-involved-hero3.avif"
						className="cs-image3"
						alt="a camper writing a thank you card"
						width={1511}
						height={1557}
					/>
				</div>
			</div>

			<div className="cs-content">
				<h1 className="cs-title">Get Involved</h1>
				<p className="cs-text">
					Camp Horizon thrives because of the generosity of people who give
					their time, energy, and talents to make camp possible. Whether you’re
					looking for a hands-on way to serve or a behind-the-scenes role, there
					are countless opportunities to make a meaningful difference in the
					lives of our campers.
				</p>
			</div>
		</section>
	);
}
