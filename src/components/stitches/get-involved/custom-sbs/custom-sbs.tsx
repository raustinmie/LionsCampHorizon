import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function CustomSbs() {
	return (
		<section id="custom-sbs">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">Become a Financial Partner</h2>
					<p className="cs-text">
						There are many ways to support Camp Horizon, and every gift, big or
						small, helps bring joy to our campers. As a 501(c)(3) nonprofit,
						your donation may also be tax-deductible.
					</p>
					<h3 className="cs-h3">General Fund</h3>
					<p className="cs-text">
						Supports our daily operations and allows us to direct resources
						where they’re needed most.
					</p>
					<h3 className="cs-h3">Endowment Fund</h3>
					<p className="cs-text">
						Ideal for legacy or long-term gifts designed to sustain camp for
						years to come.
					</p>
					<h3 className="cs-h3">Program Sponsorships</h3>
					<p className="cs-text">
						Individuals, businesses, and organizations can sponsor seasonal camp
						programs such as meals, activities, or special events. A meaningful
						way to make a direct impact.
					</p>
					<h3 className="cs-h3">
						Please visit our{" "}
						<Link className="cs-link" href="/donate">
							Donate page
						</Link>{" "}
						to learn more about options available for financial contributions.
					</h3>
				</div>
			</div>
			{/*Background Image*/}
			<div className="cs-background">
				<Image
					src="/images/get-involved-partner.avif"
					alt="a camper dancing with a counselor"
					width={1512}
					height={2016}
					loading="lazy"
					decoding="async"
					aria-hidden="true"
				/>
			</div>
		</section>
	);
}
