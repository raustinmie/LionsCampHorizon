import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Sbsr2181() {
	return (
		<section id="sbsr-2181">
			<div className="cs-container">
				<div className="cs-content">
					<span className="cs-topper">Our Legacy</span>
					<h2 className="cs-title">Celebrating 50 Years of Camp Horizon </h2>
					<p className="cs-text">
						Since 1974, Lions Camp Horizon has been creating a safe place for
						teens and adults with disabilities to laugh, grow, and belong.  What
						began as a single week of camp for 17 campers at the Lynden Fair
						Grounds has grown into a vibrant summer tradition.  Today, we are
						proud to call Bay Horizon Park our home, where we welcome up to 55
						campers a week during our camp season to experience friendship,
						adventure and endless summer fun. 
					</p>
					<div className="cs-button-box">
						<Link href="/who-we-are" className="cs-button-solid">
							{`Learn Our Story`}
						</Link>
					</div>
				</div>
				<div className="cs-picture">
					<Image
						src="/images/home-history.avif"
						alt="photo of campers from the past"
						width={1621}
						height={1108}
					/>
				</div>
			</div>
		</section>
	);
}
