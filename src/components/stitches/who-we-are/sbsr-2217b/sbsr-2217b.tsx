import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Sbsr2217B() {
	return (
		<section id="sbsr-2217b">
			<div className="cs-container">
				<div className="cs-image-group">
					{/*Top left image*/}
					<div className="cs-picture cs-picture1">
						<Image
							src="/images/wwa-history3.jpg"
							alt="a mime performing for campers"
							width={297}
							height={366}
							loading="lazy"
							decoding="async"
						/>
					</div>
					{/*Bottom right image*/}
					<div className="cs-picture cs-picture2">
						<Image
							src="/images/wwa-history4.jpg"
							alt="campers in front of a Lions Camp Horizon sign"
							width={405}
							height={376}
							loading="lazy"
							decoding="async"
						/>
					</div>
				</div>
				<div className="cs-content">
					<p className="cs-text">
						For more than 50 years, tens of thousands of volunteer hours from
						Lions Club members and community supporters have helped maintain and
						improve our campus. Thousands more hours have been donated during
						the camp season, helping us keep operational costs as low as
						possible for campers and families. Generous financial support from
						Lions Clubs, individual donors, and members of our community has
						made continual improvements possible, from kitchen remodels to
						facility upgrades and general maintenance. In 2024, we were honored
						to be chosen by Andersen Construction as their community giving
						project, resulting in a significant facility updates and a facelift
						to the interior of our buildings. Their partnership continues, and
						they will also be building a new covered pavilion in 2026.
					</p>
				</div>
			</div>
		</section>
	);
}
