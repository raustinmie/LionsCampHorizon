import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function MeetTeam1141() {
	return (
		<section id="meet-team-1141">
			<div className="cs-container">
				<div className="cs-content">
					<div className="cs-flex">
						<h2 className="cs-title">Our Team </h2>
					</div>
					<h3 className="cs-subtitle">Our Staff</h3>
				</div>
				<ul className="cs-card-group">
					<li className="cs-item">
						<div className="cs-picture">
							<Image
								src="/images/meet-angie.avif"
								alt="a headshot of Angie Dixon"
								width={498}
								height={406}
								loading="lazy"
								decoding="async"
							/>
						</div>
						<div className="cs-info">
							<span className="cs-name">Angie Dixon</span>
							<span className="cs-job">Business Administrator</span>
						</div>
						<div className="cs-text">
							I’m honored to be Camp Horizon’s first year-round, full-time
							employee, joining the team in January 2024. I’m a lifelong Blaine
							resident who cares deeply about this community and the people who
							make it special. I graduated from Blaine High School and spent
							many years working for the Blaine School District. I also served
							on the Blaine Parks Board, where I helped with fundraising for the
							Marine Park Playground. I’ve always loved being part of projects
							that bring people together and feel that same connection at Camp
							Horizon. After seeing firsthand the joy, laughter, and pure
							happiness this place brings to campers, I completely fell in love
							with camp. You simply can’t help but smile when you’re
							here.Outside of camp life, I enjoy spending time with family and
							friends, and I’m always out exploring this beautiful state
							whenever I get the chance.
						</div>
					</li>
					<li className="cs-item">
						<div className="cs-picture">
							<Image
								src="/images/meet-nakita.avif"
								alt="Nakita Zylstra"
								width={1512}
								height={2016}
								loading="lazy"
								decoding="async"
							/>
						</div>
						<div className="cs-info">
							<span className="cs-name">Na'Kita Zylstra</span>
							<span className="cs-job">Program Manager</span>
						</div>
						<div className="cs-text">
							My name is Na’Kita, and my camp name is Ranger (because I love the
							New York Rangers)! I have an associate’s degree in integrated arts
							in education, a bachelor’s degree in disabilities and
							exceptionalities, and a master’s degree in special education. In
							my free time, I enjoy a variety of activities such as playing ice
							hockey, dancing ballet, practicing my cello, and painting. I
							travel to volunteer and learn about how people with disabilities
							are cared for in other countries, and I speak German, Chinese, and
							basic ASL.  I emphasize life skills, creativity, and social
							connection in all the activities I plan for camp. Using my
							experience, education, and enthusiasm for this career field, I
							work hard to provide all campers with a fun and valuable adventure
							each summer!
						</div>
					</li>
				</ul>
			</div>
		</section>
	);
}
