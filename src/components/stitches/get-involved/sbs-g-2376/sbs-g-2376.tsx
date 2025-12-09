import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ImageRotator } from "../../camp/sbs-2375/sbs-2375";

export default function SbsG2376() {
	const activitiesImages = [
		"/images/g-activities.avif",
		"/images/g-activities2.avif",
		"/images/g-activities3.avif",
	];
	const serviceImages = [
		"/images/g-service.avif",
		"/images/g-service2.avif",
		"/images/g-service3.avif",
	];
	const kitchenImages = [
		"/images/g-food.avif",
		"/images/g-food2.avif",
		"/images/g-food3.avif",
	];
	return (
		<section id="sbs-g-2376">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">We Invite You to Be Part of the Magic!</h2>
					<p className="cs-text">
						Camp Horizon comes to life because of the generous people who give
						their time, energy, and love to our campers. Every year, volunteers
						contribute hundreds of hours to help our campers experience
						unforgettable summer memories. And there is always space for one
						more helping hand or helping heart. Whether you love gardening,
						building, cleaning, painting, arts & crafts, cheering others on, or
						simply showing up with a smile, there’s a place for you here. You
						can serve a meal, join a spring clean-up day, help with grounds and
						facility projects, share a talent, or support camp as a financial
						partner.
						<br />
						We’d love to have you join us!
						<br />
						Please reach out to{" "}
						<Link href="mailto:admin@lionscamphorizon.org">
							admin@lionscamphorizon.org
						</Link>
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
						<ImageRotator
							images={activitiesImages}
							intervalMs={6000}
							alt="camp activity volunteer photo"
						/>
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
								teamwork make a lasting difference for campers all year long.
								Come roll up your sleeves and help us keep the magic growing!
							</p>
						</div>
						<ImageRotator
							images={serviceImages}
							intervalMs={5000}
							alt="camp maintenance service photo"
						/>
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
						<ImageRotator
							images={kitchenImages}
							intervalMs={4000}
							alt="kitchen volunteer photo"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
