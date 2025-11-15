import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function HeroS2149() {
	return (
		<section id="hero-s-2149">
			<div className="cs-container">
				{/* Background Image */}
				<div className="cs-background">
					<Image
						src="/images/staff-hero1.jpg"
						className="cs-image1"
						alt="campers sitting in a circle on the grass"
						width={817}
						height={517}
					/>{" "}
					<Image
						src="/images/staff-hero2.jpg"
						className="cs-image2"
						alt="campers sitting in a circle on the grass"
						width={388}
						height={517}
					/>
					<Image
						src="/images/staff-hero3.jpg"
						className="cs-image3"
						alt="campers sitting in a circle on the grass"
						width={529}
						height={517}
					/>
				</div>
			</div>

			<div className="cs-content">
				<h1 className="cs-title">Staff</h1>
				<p className="cs-text">
					Working at Camp Horizon isn’t just about helping others, it’s about
					discovering the very best parts of yourself. Here, laughter is daily,
					kindness is contagious, and joy shows up in the simplest moments.
					You’ll gain new friendships, share the biggest smiles, embrace warm
					hugs, and experience that “wow, I actually made a difference” feeling
					that sticks with you long after summer ends. This is the kind of job
					everyone should try at least once… because once you do, you’ll wonder
					why you didn’t do it sooner. Compassion, joy, silliness, teamwork,
					dance parties, kindness — all part of the package.
				</p>
			</div>
		</section>
	);
}
