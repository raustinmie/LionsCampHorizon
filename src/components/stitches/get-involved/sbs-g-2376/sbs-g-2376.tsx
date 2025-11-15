import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function SbsG2376() {
	return (
		<section id="sbs-g-2376">
			<div className="cs-container">
				<div className="cs-content">
					<span className="cs-topper">Why Choose Us</span>
					<h2 className="cs-title">Guided Therapy Services</h2>
					<p className="cs-text">
						We offer comprehensive support for individuals, couples, and
						families facing various life transitions, emotional hurdles, and
						relationship issues. Our dedicated services are designed to help you
						navigate these challenges with understanding and care.
					</p>
				</div>
				<div className="cs-wrapper">
					{/*Side By Side*/}
					<div className="cs-flex">
						<div className="cs-content2">
							<h3 className="cs-h3">Activities and Entertainment</h3>
							<p className="cs-text">
								Do you have a skill, performance, craft, or activity you’d love
								to share? We’re always looking for musicians, artists,
								entertainers, animal handlers, and community groups who want to
								bring joy, creativity, and fun to our campers. Whether it’s a
								performance, a hands-on activity, or a unique talent you’d like
								to showcase, we’d love to welcome you to camp.
								<br />
								<br />
								Come brighten a day, create a memory, and be part of the magic
								at Camp Horizon!
							</p>
						</div>
						<div className="cs-picture">
							<Image
								src="/images/get-involved-activities.png"
								alt="a camper riding a horse"
								width={528}
								height={378}
								loading="lazy"
								decoding="async"
							/>
						</div>
					</div>
					{/*SBS Reverse*/}
					<div className="cs-flex">
						<div className="cs-content2">
							<h3 className="cs-h3">Help Us Keep Camp in Top Shape!</h3>
							<p className="cs-text">
								Camp Horizon relies on caring hands and generous hearts to keep
								our campus safe and beautiful for every camper. We’re always
								looking for those who are interested in facility improvements,
								grounds maintenance, landscaping, flower bed care, and other
								hands-on service projects. These projects make fantastic team
								building opportunities for workplaces, youth groups, service
								clubs, and community organizations.
							</p>
							<p className="cs-text">
								Whether you’re skilled with tools, love working outdoors, or
								simply enjoy pitching in where it’s needed, your time and
								teamwork make a lasting difference for campers all year
								long.Come roll up your sleeves and help us keep the magic
								growing!
							</p>
						</div>
						<div className="cs-picture">
							<Image
								src="/images/get-involved-maintenance.png"
								alt="a crew working on concrete"
								width={528}
								height={378}
								loading="lazy"
								decoding="async"
							/>
						</div>
					</div>
					{/*Side By Side*/}
					<div className="cs-flex">
						<div className="cs-content2">
							<h3 className="cs-h3">Serve Meals, Serve Smiles!</h3>
							<p className="cs-text">
								Mealtime is one of the happiest parts of the day at Camp Horizon
								and volunteers make it possible! We rely on caring volunteers to
								help serve meals, which allows us to keep camp fees affordable
								for our families while still creating a fun, welcoming dining
								experience for our campers.
								<br />
								<br />
								No kitchen experience is required, just a friendly heart, a love
								of helping others, and a willingness to share a smile. If you
								enjoy feeding people, connecting with others, and brightening
								someone’s day, we’d love to have you in the dining hall with us!
							</p>
						</div>
						<div className="cs-picture">
							<Image
								src="/images/get-involved-food.png"
								alt="volunteers in the camp kitchen"
								width={528}
								height={378}
								loading="lazy"
								decoding="async"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
