import Image from "next/image";
import React from "react";

export default function CustomCta() {
	return (
		<section id="custom-cta">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">
						Camp Applications open in January! Check back for more information
						soon!
					</h2>
				</div>
				<div className="cs-picture">
					<Image
						src="/images/camp-banana.jpg"
						alt="campers and counselors sitting around a campfire"
						fill
						loading="lazy"
						decoding="async"
					/>
				</div>
			</div>
		</section>
	);
}
