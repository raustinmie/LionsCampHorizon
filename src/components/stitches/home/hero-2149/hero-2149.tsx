import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Hero2149() {
	return (
		<section id="hero-2149">
			<div className="cs-container">
				<span className="cs-topper">
					Welcome to
					<br />
					Lions Camp Horizon
				</span>

				{/* Background Image */}
				<div className="cs-background">
					<Image
						src="/images/home-header.avif"
						alt="campers sitting in a circle on the grass"
						fill
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
