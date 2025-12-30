import Link from "next/link";
import React from "react";
import Image from "next/image";
import { isOpen } from "../../../../constants";

export default function HeroC2149() {
	return (
		<section id="hero-c-2149">
			<div className="cs-container">
				{/* Background Image */}
				<div className="cs-background">
					<Image
						src="/images/camp-hero2.avif"
						className="cs-image1"
						alt="A camper's luggage"
						width={1512}
						height={2016}
					/>{" "}
					<Image
						src="/images/camp-hero1.avif"
						className="cs-image2"
						alt="Staff ready to welcome campers"
						width={1916}
						height={1213}
					/>
					<Image
						src="/images/camp-hero3.avif"
						className="cs-image3"
						alt="Making a video of a camper"
						width={1512}
						height={2016}
					/>
				</div>
			</div>

			<div className="cs-content">
				<h1 className="cs-title">A Place to Belong</h1>
				<p className="cs-text">
					For over 50 years, Lions Camp Horizon has been creating unforgettable
					summer experiences for teens and adults with disabilities. Campers
					discover new activities, build confidence, and form friendships that
					last a lifetime — all in a safe, supportive environment where
					abilities shine.
				</p>
				{!isOpen ? (
					<div className="cs-fake-button">Registration opens January 5!</div>
				) : (
					<Link href="/camper-application" className="cs-button-solid">
						Apply Now
					</Link>
				)}
			</div>
		</section>
	);
}
