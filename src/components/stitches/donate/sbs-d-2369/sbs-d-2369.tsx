import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function SbsD2369() {
	return (
		<section id="sbs-d-2369">
			<div className="cs-container">
				{/*Main Image*/}
				<div className="cs-picture">
					<Image
						src="/images/donate-other.avif"
						alt="campers having fun"
						width={3024}
						height={4032}
						loading="lazy"
						decoding="async"
					/>
				</div>
				<div className="cs-content">
					<ul className="cs-ul">
						<li className="cs-li">
							<h3 className="cs-h3">• In-Kind Donations</h3>
							<p className="cs-text">
								Supplies, materials, equipment, and items that help camp
								operate.
							</p>
						</li>
						<li className="cs-li">
							<h3 className="cs-h3">• Employee Matching Gifts</h3>
							<p className="cs-text">
								Many employers will match your donation, doubling your impact.
								Check with your employer today!
							</p>
						</li>
						<li className="cs-li">
							<h3 className="cs-h3">• Memorial Gifts</h3>
							<p className="cs-text">
								Honor a loved one by supporting camp in their name.
							</p>
						</li>
						<li className="cs-li">
							<h3 className="cs-h3">• Planned Giving / Estate Gifts</h3>
							<p className="cs-text">
								Leave a lasting legacy through your estate or will.{" "}
							</p>
						</li>
						<li className="cs-li">
							<h3 className="cs-h3">• Fred Meyer Community Rewards</h3>
							<p className="cs-text">
								Select Camp Horizon as your nonprofit of choice and a portion of
								your shopping supports camp at no cost to you.{" "}
							</p>
						</li>
						<li className="cs-li">
							<h3 className="cs-h3">• Host a Fundraiser</h3>
							<p className="cs-text">
								Businesses, service clubs, churches, schools, or individuals are
								welcome to organize a fundraiser on our behalf.{" "}
							</p>
						</li>
						<li className="cs-li">
							<h3 className="cs-h3">• Donate Services</h3>
							<p className="cs-text">
								Entertainment, skilled labor, professional services, or group
								service projects are always welcomed and appreciated.{" "}
							</p>
						</li>
						<li className="cs-li">
							<h3 className="cs-h3">• Donor Advised Funds</h3>
							<p className="cs-text">
								Give through your DAF to support camp now or periodically.{" "}
							</p>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
