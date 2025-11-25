import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function CustomSbsD() {
	return (
		<section id="custom-sbs-d">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">Did you know?</h2>
					<p className="cs-text">
						Did you know many companies match donations made by their employees
						and retirees to non-profits like ours? If your employer will match
						your gift please contact us at admin@lionscamphorizon.org so we may
						provide the information you need to submit your match request.
					</p>
				</div>
			</div>
			{/*Background Image*/}
			<div className="cs-background">
				<Image
					src="/images/donate-did-you-know.avif"
					alt="A camper and counselor"
					width={1512}
					height={2016}
					loading="lazy"
					decoding="async"
					aria-hidden="true"
				/>
			</div>
		</section>
	);
}
