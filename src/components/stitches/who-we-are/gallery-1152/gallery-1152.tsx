import React from "react";
import Image from "next/image";

export default function Gallery1152() {
	return (
		<section id="gallery-1152">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">
						Lions Camp Horizon is beyond grateful for our seasonal camp staff.
						We couldn't do it without their smiles and energy
					</h2>
				</div>
				<div className="cs-gallery">
					{/*Picture 1*/}
					<div className="cs-image">
						<Image
							src="/images/wwa-gallery1.jpg"
							alt="gallery"
							width={272}
							height={320}
							loading="lazy"
							decoding="async"
						/>
					</div>
					{/*Picture 2*/}
					<div className="cs-image">
						<Image
							src="/images/wwa-gallery2.jpg"
							alt="gallery"
							width={272}
							height={320}
							loading="lazy"
							decoding="async"
						/>
					</div>
					{/*Picture 3*/}
					<div className="cs-image">
						<Image
							src="/images/wwa-gallery3.jpg"
							alt="gallery"
							width={272}
							height={320}
							loading="lazy"
							decoding="async"
						/>
					</div>
					{/*Picture 4*/}
					<div className="cs-image">
						<Image
							src="/images/wwa-gallery4.jpg"
							alt="gallery"
							width={272}
							height={320}
							loading="lazy"
							decoding="async"
						/>
					</div>
					{/*Picture 5*/}
					<div className="cs-image">
						<Image
							src="/images/wwa-gallery5.jpg"
							alt="gallery"
							width={272}
							height={320}
							loading="lazy"
							decoding="async"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
