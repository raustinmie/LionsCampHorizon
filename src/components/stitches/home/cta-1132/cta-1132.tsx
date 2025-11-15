import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Cta1132() {
	return (
		<section id="cta-1132">
			<div className="cs-container">
				<div className="cs-content">
					<span className="cs-topper">Get Involved</span>
					<h2 className="cs-title">
						Help us prepare for the 2026 Camp Season - Ask how you can volunteer
						or become a donor today!{" "}
					</h2>
					<Link href="" className="cs-button-solid">
						Get Involved{" "}
					</Link>
				</div>
			</div>
			<div className="cs-background">
				<Image
					src="/images/home-cta.jpg"
					alt="a smiling camper"
					width={1280}
					height={568}
					loading="lazy"
					decoding="async"
				/>
			</div>
		</section>
	);
}
