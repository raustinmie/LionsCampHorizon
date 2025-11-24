import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function ServicesD2198() {
	return (
		<section id="services-d-2198">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">Ways to Give</h2>
					<p className="cs-text">
						Lions Camp Horizon Foundation is a 501(3)c non-profit. Tax ID:
						91-1412783
					</p>
				</div>
				<ul className="cs-card-group">
					<li className="cs-item">
						<div className="cs-picture">
							<Image
								src="/images/donate-ways1.avif"
								alt="happy campers"
								width={1080}
								height={810}
								loading="lazy"
								decoding="async"
							/>
						</div>
						<div className="cs-flex">
							<h3 className="cs-h3">General Donation</h3>
						</div>
						<p className="cs-item-text">
							General donations help keep camp running strong by supporting
							daily supplies, camp expenses, facility maintenance, repairs, and
							ongoing upgrades to our campus. These gifts ensure Lions Camp
							Horizon remains safe, welcoming, and ready for every new
							adventure.
						</p>
					</li>
					<li className="cs-item">
						<div className="cs-picture">
							<Image
								src="/images/donate-ways2.avif"
								alt="happy campers"
								width={2016}
								height={1512}
								loading="lazy"
								decoding="async"
								className="picture-2"
							/>
						</div>
						<div className="cs-flex">
							<h3 className="cs-h3">CAMPERship Donation</h3>
						</div>
						<p className="cs-item-text">
							CAMPership donations act as scholarships that go directly toward
							covering camp session fees for individuals facing financial
							hardship. Your gift, big or small, helps make sure cost is never a
							barrier to a life-changing camp experience.
						</p>
					</li>
					<li className="cs-item">
						<div className="cs-picture">
							<Image
								src="/images/donate-ways3.avif"
								alt="a camper doing inflatable axe throwing"
								width={4032}
								height={3024}
								loading="lazy"
								decoding="async"
							/>
						</div>
						<div className="cs-flex">
							<h3 className="cs-h3">Activity & Meal Sponsorships</h3>
						</div>
						<p className="cs-item-text">
							Activity and meal sponsorships fund the fun, and the fuel behind
							it!These donations go directly toward covering the cost of meals
							or specific camp activities, helping us create joyful moments and
							meaningful memories for every camper.
						</p>
					</li>
				</ul>
			</div>
		</section>
	);
}
