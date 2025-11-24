import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Sbs2375B() {
	return (
		<section id="sbs-2375-b">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">Camper Fees</h2>
				</div>
				{/*SBS Reverse*/}
				<div className="cs-flex">
					<div className="cs-content2">
						<p className="cs-text">
							We offer several payment options to make camp accessible for all
							campers. Families may pay privately, use DSHS/DDA respite funding
							(check with your case worker to see if you qualify), or apply for
							a CAMPERship for additional financial assistance with private pay.
						</p>
						<div className="cs-text-section">
							<h3>Base Camp</h3>
							<p>$900 (3:1 and 4:1 ratio)</p>
							<p>$1,300 (1:1 and 2:1 ratio)</p>
						</div>
						<div className="cs-text-section">
							<h3>Adventure Camp</h3>
							<p>$975</p>
						</div>
						<div className="cs-text-section">
							<h3>Deposits</h3>
							<ul className="cs-ul">
								<li className="cs-li">
									$50.00 deposit per session is required from all private pay
									campers.
								</li>
								<li className="cs-li">
									Campers using DSHS/DDA funding do not pay a deposit. 
								</li>
								<li className="cs-li">
									Deposits are credited to your session fees and refunded in
									accordance with the terms of our ”Cancellation Policy.”
								</li>
								<li className="cs-li">
									If Lions Camp Horizon cancels a session or does not admit a
									camper, you will be fully refunded.
								</li>
							</ul>
						</div>
						<div className="cs-text-section">
							<h3>CAMPERships (Camp Scholarships):</h3>
							<ul className="cs-ul">
								<li className="cs-li">
									CAMPERships are available in limited quantities for campers
									who do not receive benefits to cover the cost of camp and are
									on a limited income (Proof of income is required).
								</li>
								<li className="cs-li">
									CAMPership awards do not cover the full cost of camp. 
									Scholarship amounts are made on a case-by-case basis and the
									remaining balance must be paid in full by June 1 st.{" "}
								</li>
								<li className="cs-li">
									$50 deposit is required at the time of application. 
								</li>
								<li className="cs-li">
									To request an application packet, please email{` `}
									<Link href="mailto:admin@lionscamphorizon.org">
										admin@lionscamphorizon.org
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="cs-picture">
						<Image
							src="/images/camp-fees.avif"
							alt="A camper at a carnival with lots of tickets"
							width={2268}
							height={3633}
							loading="lazy"
							decoding="async"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
