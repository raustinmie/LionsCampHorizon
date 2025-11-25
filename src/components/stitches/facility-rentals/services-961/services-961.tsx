import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Services961() {
	return (
		<section id="services-961">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">Rental Information </h2>
				</div>
				<ul className="cs-card-group">
					<li className="cs-item">
						<h3 className="cs-h3">Who Do We Rent To?</h3>
						<p className="cs-item-text">
							Our campus is open to a wide variety of groups and events. Whether
							you’re planning a quiet day retreat, a weekend training, a family
							reunion, or a full-scale camp, we’re ready to host you. We
							accommodate everything from small meetings and parties to large
							overnight groups of up to 184 guests. Church groups, schools,
							nonprofits, clubs, caterers, and families have all found a place
							here.
						</p>
					</li>
					<li className="cs-item">
						<h3 className="cs-h3">Rental Availability</h3>
						<p className="cs-item-text">
							We offer flexible rental options for day use, weekend stays, or
							longer group events. Our rental season typically runs from
							mid-March through October. Our buildings were constructed in 1951,
							and may need to be winterized during the colder months. Some
							exceptions apply. Please reach out for late fall or winter
							rentals.
						</p>
					</li>
					<li className="cs-item">
						<h3 className="cs-h3">Want to See our Campus?</h3>
						<p className="cs-item-text">
							Our campus is located in Bay Horizon Park which is open to the
							public—feel free to take a walk or drive through anytime. If you’d
							like a closer look at the facilities, we’d be happy to show you
							around. Contact us to schedule a tour to walk through the
							buildings and ask any questions you have.
						</p>
					</li>
				</ul>
				<div className="cs-disclaimer">
					<strong>Please note:</strong> Our campus is not available for rentals
					during our summer camp sessions, which run July through early August.
					We recommend booking early to reserve your preferred dates!
				</div>
			</div>
			<div className="cs-background">
				<Image
					src="/images/facilities-parachute.jpg"
					alt="a parachute"
					width={1536}
					height={2048}
					loading="lazy"
					decoding="async"
				/>
			</div>
		</section>
	);
}
