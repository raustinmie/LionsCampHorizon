import Link from "next/link";
import React from "react";

export default function BoardSection() {
	return (
		<section id="board-section">
			<div className="cs-container">
				<div className="cs-content">
					<div className="cs-flex">
						<h2 className="cs-title">Our Board </h2>
					</div>
					<p className="cs-text">
						Lions Camp Horizon is owned and operated by the Camp Horizon
						Foundation a 501(c)3 organization. The Foundation has a Board of
						Directors comprised of District 19H Lions and other community
						members who share our passion to provide services to individuals
						with disabilities. All Directors are unpaid volunteers.Interested in
						serving on our board? Let’s talk.{" "}
						<Link className="cs-link" href="president@lionscamphorizon.org">
							Email our board president
						</Link>{" "}
						to start a conversation.
					</p>
					<h3 className="cs-h3">Board of Directors</h3>
					<ul className="cs-board">
						<li className="cs-item">President - Melisa VanderStelt</li>
						<li className="cs-item">Vice President - Christina Thomas</li>
						<li className="cs-item">Treasurer - Vacant</li>
						<li className="cs-item">Secretary - Wendy Canessa</li>
						<li className="cs-item">Facilities Advisor - George Henderson</li>
						<li className="cs-item">
							Canadian Outreach Coordinator - Lynda Davidson
						</li>
						<li className="cs-item">Bill Briggs</li>
						<li className="cs-item">Don Webster</li>
						<li className="cs-item">Spencer Koch</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
