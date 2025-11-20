import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function HeroC2149() {
	const now = new Date();
	const year = now.getFullYear();
	const openDate = new Date(`${year}-01-15T00:00:00`);
	const closeDate = new Date(`${year}-07-15T23:59:59`);
	const isOpen = now >= openDate && now <= closeDate;

	const buttonHref = isOpen ? "/camper-application" : "/contact";
	const buttonText = isOpen ? "Apply Now" : "Registration opens January 15!";

	return (
		<section id="hero-c-2149">
			<div className="cs-container">
				{/* Background Image */}
				<div className="cs-background">
					<Image
						src="/images/camp-hero2.jpg"
						className="cs-image1"
						alt="A camper's luggage"
						width={817}
						height={517}
					/>{" "}
					<Image
						src="/images/camp-hero1.jpg"
						className="cs-image2"
						alt="Staff ready to welcome campers"
						width={388}
						height={517}
					/>
					<Image
						src="/images/camp-hero3.jpg"
						className="cs-image3"
						alt="Making a video of a camper"
						width={529}
						height={517}
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
					<div className="cs-fake-button">Registration opens January 15!</div>
				) : (
					<Link href="/camper-application" className="cs-button-solid">
						Apply Now
					</Link>
				)}
			</div>
		</section>
	);
}
