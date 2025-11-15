import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function CustomHero() {
	const now = new Date();
	const year = now.getFullYear();
	const openDate = new Date(`${year}-01-15T00:00:00`);
	const closeDate = new Date(`${year}-07-15T23:59:59`);
	const isOpen = now >= openDate && now <= closeDate;

	const buttonHref = isOpen ? "/camper-application" : "/contact";
	const buttonText = isOpen ? "Apply Now" : "Registration opens January 15!";

	return (
		<section id="custom-hero">
			<div className="cs-container">
				<Image
					src="/images/whoweare-hero1.jpg"
					className="cs-image1"
					alt="campers sitting in a circle on the grass"
					width={464 * 0.7}
					height={618 * 0.7}
				/>
				<div className="cs-content">
					<h1 className="cs-title">Who We Are</h1>
					<p className="cs-text">
						We are more than just a summer camp. We are a safe, welcoming place
						where teens and adults with disabilities can relax, connect, and
						grow. Lions Camp Horizon gives campers the chance to unwind, make
						friends, and gently stretch outside their comfort zones in a
						supportive environment. By focusing on what each person can do, we
						build confidence, independence, and self-esteem. Abilities, not
						disabilities, lead the way… and FUN is always the top priority
					</p>
				</div>
				<Image
					src="/images/whoweare-hero2.jpg"
					className="cs-image3"
					alt="campers sitting in a circle on the grass"
					width={464 * 0.7}
					height={618 * 0.7}
				/>
			</div>
		</section>
	);
}
