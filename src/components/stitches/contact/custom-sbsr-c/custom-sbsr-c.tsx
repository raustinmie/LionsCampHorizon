import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function CustomSbsrC() {
	return (
		<section id="custom-sbsr-c">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">Contact Us!</h2>
					<p className="cs-text">
						Questions? Comments? Feel free to reach out!
					</p>
				</div>
			</div>
			{/*Background Image*/}
			<div className="cs-background">
				<Image
					src="/images/contact-hero.jpg"
					alt="counselors at the bowling alley"
					width={1920}
					height={660}
					loading="lazy"
					decoding="async"
					aria-hidden="true"
				/>
			</div>
		</section>
	);
}
