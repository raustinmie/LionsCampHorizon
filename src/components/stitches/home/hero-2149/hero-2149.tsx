import React from "react";
import Image from "next/image";

const blurDataUrl =
	"data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";

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
						className="cs-header-image cs-header-image1"
						sizes="(max-width: 768px) 100vw, 50vw"
						quality={85}
						loading="lazy"
						placeholder="blur"
						blurDataURL={blurDataUrl}
					/>
					<Image
						src="/images/logo.png"
						alt="logo"
						height={1512}
						width={2016}
						sizes="(max-width: 768px) 45vw, 25vw"
						quality={80}
						priority
						placeholder="blur"
						blurDataURL={blurDataUrl}
						className="cs-header-image cs-header-image2"
					/>
					<Image
						src="/images/home-hero-circle.jpg"
						alt="campers sitting in a circle on the grass"
						height={1512}
						width={2016}
						sizes="(max-width: 768px) 70vw, 30vw"
						quality={80}
						loading="lazy"
						placeholder="blur"
						blurDataURL={blurDataUrl}
						className="cs-header-image cs-header-image3"
					/>
				</div>
			</div>

			<div className="cs-content">
				<h1 className="cs-title">
					Where everyone belongs! Spreading sunshine, smiles, and the joy of
					summer camp to teens and adults of all abilities for over 50 years.{" "}
				</h1>
				<p className="cs-text">
					We provide safe, joyful summer camp experiences that build confidence,
					independence, and lifelong friendships.
				</p>
			</div>
		</section>
	);
}
