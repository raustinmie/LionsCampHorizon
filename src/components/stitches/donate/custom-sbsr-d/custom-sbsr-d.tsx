import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function CustomSbsrD() {
	return (
		<section id="custom-sbsr-d">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">Donor Advised Funds</h2>
					<p className="cs-text">
						Do you know about Donor Advised Funds? A Donor Advised Fund (DAF) is
						a special charitable giving account that lets you set aside money
						for donations now and distribute it to nonprofits over time.
					</p>
					<p className="cs-text">
						You receive the tax benefit when you contribute to your DAF, and
						then you can recommend gifts to organizations like Lions Camp
						Horizon whenever you’re ready. It’s an easy and flexible way to
						support the causes you care about today or in the future. Ask your
						financial advisor for more information.
					</p>

					<p className="cs-h3">Some Examples of DAFs are</p>
					<ul className="cs-list">
						<li className="cs-item">Fidelity Charitable</li>
						<li className="cs-item">National Philanthropic</li>
						<li className="cs-item">Schwab Charitable Trust</li>
						<li className="cs-item">Thrivent Mutual Funds</li>
						<li className="cs-item">Vanguard Charitable Endowment</li>
						<li className="cs-item">Goldman Sach Philanthropy Fund</li>
						<li className="cs-item">Bank of America Charitable Gift Fund</li>
					</ul>
				</div>
			</div>
			{/*Background Image*/}
			<div className="cs-background">
				<Image
					src="/images/donate-daf.jpg"
					alt="A bus full of campers and counselors"
					width={1920}
					height={660}
					loading="lazy"
					decoding="async"
					aria-hidden="true"
				/>
			</div>
		</section>
	);
}
