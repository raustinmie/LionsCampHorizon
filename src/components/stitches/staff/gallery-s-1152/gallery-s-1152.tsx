import React from "react";
import Image from "next/image";

export default function GalleryS1152() {
	return (
		<section id="gallery-s-1152">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">Join the Fun</h2>
				</div>
				<div className="cs-gallery">
					{/*Picture 1*/}
					<div className="cs-image">
						<Image
							src="/images/staff-gallery1.jpg"
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
							src="/images/staff-gallery2.jpg"
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
							src="/images/staff-gallery3.jpg"
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
							src="/images/staff-gallery4.jpg"
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
							src="/images/staff-gallery5.jpg"
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
