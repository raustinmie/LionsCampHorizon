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
						<Link href="" className="cs-link">
							<div className="cs-picture">
								<Image
									src="/images/what-were-all-about1.png"
									alt="wedding photography"
									width={550}
									height={377}
									loading="lazy"
									decoding="async"
								/>
							</div>
							<div className="cs-flex">
								<h3 className="cs-h3">Our Mission</h3>
							</div>
							<p className="cs-item-text">
								To provide recreational activities that encourage independence,
								build new skills, develop lifelong friendships and create
								lasting memories of camp.
							</p>
						</Link>
					</li>
					<li className="cs-item">
						<Link href="" className="cs-link">
							<div className="cs-picture">
								<Image
									src="/images/what-were-all-about2.jpg"
									alt="wedding photography"
									width={550}
									height={377}
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
						</Link>
					</li>
					<li className="cs-item">
						<Link href="" className="cs-link">
							<div className="cs-picture">
								<Image
									src="/images/what-were-all-about3.jpg"
									alt="wedding photography"
									width={550}
									height={377}
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
						</Link>
					</li>
				</ul>
			</div>
		</section>
	);
}
