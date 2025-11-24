import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Services2198() {
	return (
		<section id="services-2198">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">What We're All About</h2>
				</div>
				<ul className="cs-card-group">
					<li className="cs-item">
						<div className="cs-picture">
							<Image
								src="/images/what-were-all-about1.avif"
								alt="a camper flexing his biceps"
								width={1670}
								height={994}
								loading="lazy"
								decoding="async"
							/>
						</div>
						<div className="cs-flex">
							<h3 className="cs-h3">Our Mission</h3>
						</div>
						<p className="cs-item-text">
							To provide recreational activities that encourage independence,
							build new skills, develop lifelong friendships and create lasting
							memories of camp.
						</p>
					</li>
					<li className="cs-item">
						<div className="cs-picture">
							<Image
								src="/images/what-were-all-about2.avif"
								alt="a camper and counselor hugging"
								width={2316}
								height={3057}
								loading="lazy"
								decoding="async"
								className="picture-2"
							/>
						</div>
						<div className="cs-flex">
							<h3 className="cs-h3">Our Vision</h3>
						</div>
						<p className="cs-item-text">
							To empower people challenged by disabilities through experiences
							that help develop life skills, foster independence and build
							self-esteem.
						</p>
					</li>
					<li className="cs-item">
						<div className="cs-picture">
							<Image
								src="/images/what-were-all-about3.jpeg"
								alt="two men arm wrestling"
								width={3024}
								height={2294}
								loading="lazy"
								decoding="async"
							/>
						</div>
						<div className="cs-flex">
							<h3 className="cs-h3">Core Values</h3>
						</div>
						<p className="cs-item-text">
							To respect the diversity we represent, create inclusive
							opportunities for individuals of all abilities, and empower each
							person to grow, succeed, and shine.
						</p>
					</li>
				</ul>
			</div>
		</section>
	);
}
