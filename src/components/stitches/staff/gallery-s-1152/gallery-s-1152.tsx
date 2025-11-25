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
							src="/images/staff-gallery1.avif"
							alt="gallery"
							width={3024}
							height={4032}
							loading="lazy"
							decoding="async"
						/>
					</div>
					{/*Picture 2*/}
					<div className="cs-image">
						<Image
							src="/images/staff-gallery2.avif"
							alt="gallery"
							width={1080}
							height={810}
							loading="lazy"
							decoding="async"
						/>
					</div>
					{/*Picture 3*/}
					<div className="cs-image cs-image3">
						<Image
							src="/images/staff-gallery3.avif"
							alt="gallery"
							width={2268}
							height={4032}
							loading="lazy"
							decoding="async"
						/>
					</div>
					{/*Picture 4*/}
					<div className="cs-image">
						<Image
							src="/images/staff-gallery4.avif"
							alt="gallery"
							width={4032}
							height={3024}
							loading="lazy"
							decoding="async"
						/>
					</div>
					{/*Picture 5*/}
					<div className="cs-image">
						<Image
							src="/images/staff-gallery5.avif"
							alt="gallery"
							width={4032}
							height={3024}
							loading="lazy"
							decoding="async"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
