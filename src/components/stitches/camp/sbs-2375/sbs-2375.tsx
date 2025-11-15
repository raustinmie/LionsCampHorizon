import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Sbs2375() {
	return (
		<section id="sbs-2375">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">A Camp For Everyone</h2>
					<p className="cs-text">
						At Lions Camp Horizon, we believe everyone deserves the summer camp
						experience — at every age. While many programs stop once individuals
						reach adulthood, Lions Camp Horizon continues to welcome campers
						throughout their lifetime. We have no upper age limit, because we
						believe fun, friendship, and belonging are for every age. Our
						campers range in age from 12 to 75+, and some have been part of our
						camp family for more than 35 years. Here, traditions continue,
						friendships deepen, and every year brings new opportunities for
						connection. Our program is designed for teens and adults with
						physical and developmental disabilities, offering a safe, inclusive,
						and opportunity-filled environment where every camper can shine.
						From arts and crafts and games to music, sports and talent shows,
						each day is created with accessibility, creativity, and community in
						mind. With a dedicated team of trained staff and volunteers, we
						focus on ability, not disability, and celebrate every person for who
						they are. Camp Horizon is more than a camp, it’s a place of
						belonging, laughter, and lifelong memories. We offer two types of
						overnight sessions — <strong>Base Camp</strong> and{" "}
						<strong>Adventure Camp</strong> — each running 5 days and 4 nights
						(Monday–Friday).
						<br />
						<br />
						Please review the eligibility guidelines below and contact us with
						any questions.
					</p>
				</div>
				<div className="cs-wrapper">
					{/*Side By Side*/}
					<div className="cs-flex">
						<div className="cs-content2">
							<h3 className="cs-h3">Base Camp</h3>
							<p className="cs-text">
								Base Camp is the center of the Camp Horizon experience — a full,
								exciting session filled with activities and adventure right here
								on campus. While first-time campers begin here, many choose to
								remain in Base Camp year after year because they love the
								familiar environment, the strong sense of community, and the
								variety of on-site fun. Base Camp also provides a higher level
								of support for campers who benefit from 1:1 or 2:1 care,
								ensuring that everyone can participate comfortably and
								confidently. It offers the same joy, energy, and connection as
								Adventure Camp, just without off-campus travel making it a
								perfect fit for campers of all ages and support needs
							</p>
							<ul className="cs-ul">
								<li className="cs-li">
									Overnight camp. All onsite. (Monday-Friday).
								</li>
								<li className="cs-li">Ages 12 and up </li>
								<li className="cs-li">
									Camper to Staff ratios from 1:1 - 4:1{" "}
								</li>
								<li className="cs-li">
									Two sessions offered. (Campers can attend multiple sessions
									based on availability)
								</li>
								<li className="cs-li">Nursing Staff </li>
								<li className="cs-li">
									Meals provided to meet dietary requirements{" "}
								</li>
							</ul>
						</div>
						<div className="cs-picture">
							<Image
								src="/images/camp-base-camp.jpg"
								alt="campers at base camp"
								width={528}
								height={378}
								loading="lazy"
								decoding="async"
								className="cs-position-top"
							/>
						</div>
					</div>
					{/*SBS Reverse*/}
					<div className="cs-flex">
						<div className="cs-content2">
							<h3 className="cs-h3">Adventure Camp</h3>
							<p className="cs-text">
								Adventure Camp is for campers who are a little more independent
								and ready to keep the fun going — both on campus and out in the
								community! It still offers the fun and adventure you know and
								love from camp, but the excitement doesn’t stop at the camp
								gates. We offer two offsite field trips including a beach day
								and an adventure to be announced! To ensure the safety of
								campers and staff, campers must attend a Base Camp session first
								or complete a site-visit meeting before joining Adventure Camp.
								3:1-4:1 camper to staff ratio is required for Adventure Camp
							</p>
							<ul className="cs-ul">
								<li className="cs-li">Overnight camp. (Monday-Friday).</li>
								<li className="cs-li">Ages 12 and up </li>
								<li className="cs-li">
									Camper to Staff ratios from 3:1 - 4:1{" "}
								</li>
								<li className="cs-li">
									Two sessions offered. (Campers can attend multiple sessions
									based on availability)
								</li>
								<li className="cs-li">Nursing Staff </li>
								<li className="cs-li">
									Meals provided to meet dietary requirements{" "}
								</li>
								<li className="cs-li">Offsite fieldtrips</li>
							</ul>
						</div>
						<div className="cs-picture">
							<Image
								src="/images/camp-adventure-camp.jpg"
								alt="campers at mini golf"
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
