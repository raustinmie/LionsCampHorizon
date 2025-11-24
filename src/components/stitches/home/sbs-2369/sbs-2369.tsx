import Link from "next/link";
import React from "react";
import Image from "next/image";
import { isOpen } from "@/constants";

export default function Sbs2369() {
	return (
		<section id="sbs-2369">
			<div className="cs-container">
				<div className="cs-image-group">
					{/*Main Image*/}
					<div className="cs-picture">
						<Image
							src="/images/home-circle.avif"
							alt="camper looking through a tube"
							width={1056}
							height={1074}
						/>
					</div>
					<Image
						className="cs-flower"
						src="/images/home-blur.avif"
						alt="flower blur"
						width={996}
						height={714}
					/>
				</div>
				<div className="cs-content">
					<span className="cs-topper">Quick Links</span>
					<h2 className="cs-title">What can we help you find?</h2>
					<ul className="cs-ul">
						<li className="cs-li">
							{!isOpen ? (
								<Link href="/camp" className="cs-li-link">
									<Image
										src="images/home-spiral.svg"
										alt="checkmark"
										width={24}
										height={24}
									/>
									Camp Information
								</Link>
							) : (
								<Link href="/camper-application" className="cs-li-link">
									<Image
										src="images/home-spiral.svg"
										alt="checkmark"
										width={24}
										height={24}
									/>
									Camper Registration
								</Link>
							)}
						</li>
						<li className="cs-li">
							<Link href="/facility-rentals" className="cs-li-link">
								<Image
									src="images/home-spiral.svg"
									alt="checkmark"
									width={24}
									height={24}
								/>
								Facility Rentals
							</Link>
						</li>
						<li className="cs-li">
							<Link href="/get-involved" className="cs-li-link">
								<Image
									src="images/home-spiral.svg"
									alt="checkmark"
									width={24}
									height={24}
								/>
								Get Involved
							</Link>
						</li>
					</ul>
					<Link href="/contact" className="cs-button-solid">
						Contact Us
					</Link>
				</div>
			</div>
		</section>
	);
}
