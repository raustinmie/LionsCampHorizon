import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Services2387() {
	return (
		<section id="services-2387">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">Seasonal Opportunities </h2>
					<p className="cs-text">
						We’re looking for upbeat, patient, positive, fun-loving people to
						join us during our July and August sessions. If you’re ready for a
						summer full of memories, magic, and meaning — your spot is waiting!
						Available positions are listed below.
					</p>
				</div>
				<div className="cs-wrapper">
					<div className="cs-picture">
						<Image
							src="/images/staff-seasonal.jpg"
							alt="people"
							width={402}
							height={416}
							loading="lazy"
							decoding="async"
						/>
					</div>
					<ul className="cs-card-group">
						<li className="cs-item">
							<h3 className="cs-h3">Counselor & Specialized Counselor</h3>
							<p className="cs-item-text">
								Counselors are the heart of camp! Support and encourage teens
								and adults with disabilities as they participate in camp
								activities. Counselors assist with daily care needs, recreation,
								and camper safety while creating a fun, inclusive experience for
								all. No prior experience needed — just empathy, patience, and a
								team spirit. Overnight stay is required in most cases. Sunday PM
								– Friday afternoon.
							</p>
						</li>
						<li className="cs-item">
							<h3 className="cs-h3">Activities Coordinator and Assistants</h3>
							<p className="cs-item-text">
								Our Activities Team brings the fun to life at camp! This role
								plans and leads daily programs like arts & crafts, music, games,
								sports, clubs, special events, and more — all adapted so campers
								of every ability can join in and shine. We’re looking for
								upbeat, energetic, playful leaders who love cheering others on,
								getting silly, and creating memorable experiences. Flexible
								schedule options available.
							</p>
						</li>
						<li className="cs-item">
							<h3 className="cs-h3">Cooks and Kitchen Assistants</h3>
							<p className="cs-item-text">
								Our kitchen team keeps camp fueled and happy! AM and PM Cooks
								are full-time seasonal positions responsible for planning and
								preparing nutritious, tasty meals for up to 100 individuals.
								Kitchen Assistants (full or part-time) help with prep, serving,
								and clean-up. This is a great role for someone who enjoys
								teamwork, fast-paced fun, and spreading smiles through great
								food! A valid food handler’s permit is required for all kitchen
								positions.
							</p>
						</li>
						<li className="cs-item">
							<h3 className="cs-h3">RN/LPN/Med Tech</h3>
							<p className="cs-item-text">
								Our Med Room team plays a vital role in supporting camper health
								and well-being. This position is responsible for administering
								daily medications, providing basic first aid, maintaining
								accurate documentation, and communicating with caregivers as
								needed. Applicants must hold current licensing (RN, LPN, CMA,
								CNA, or similar, depending on role). Full and part-time
								available.
							</p>
						</li>
						<li className="cs-item">
							<h3 className="cs-h3">Firewatch</h3>
							<p className="cs-item-text">
								This overnight position helps keep camp safe and running
								smoothly while campers and staff sleep. Firewatch staff complete
								hourly dorm checks, monitor for safety concerns, complete
								nightly checklists and light cleaning tasks, and report anything
								out of the ordinary to leadership staff. It’s a great fit for
								someone who is responsible, observant, and comfortable working
								independently during quiet hours. Overnight stay required.
							</p>
						</li>
						<li className="cs-item">
							<h3 className="cs-h3">Nightwatch</h3>
							<p className="cs-item-text">
								Nightwatch staff provide overnight support for campers who may
								need assistance during the night. In addition to safety checks,
								this role includes responding to camper needs, offering personal
								care, and helping ensure everyone stays safe and comfortable
								until morning. Applicants must be comfortable providing hands-on
								support. Overnight stay required.
							</p>
						</li>
						<li className="cs-note">
							<strong>Please Note:</strong> All employees must pass a criminal
							background check
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
