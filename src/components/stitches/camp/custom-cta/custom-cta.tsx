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
					<h3 className="cs-h3">2026 Camp Dates</h3>
					<ul className="cs-ul">
						<li>Adventure Camp 1 - July 6-10 </li>
						<li>Base Camp 1 - July 13-17</li>
						<li>Base Camp 2 - July 20-24</li>
						<li>Adventure Camp 2 - Aug 3-7</li>
					</ul>
				</div>
				<div className="cs-picture">
					<Image
						src="/images/camp-banana.avif"
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
