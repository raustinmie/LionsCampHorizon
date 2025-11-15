import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Sbsr2217() {
	return (
		<section id="sbsr-2217">
			<div className="cs-container">
				<div className="cs-image-group">
					{/*Top left image*/}
					<div className="cs-picture cs-picture1">
						<Image
							src="/images/wwa-history1.jpg"
							alt="campers and staff on a monster truck"
							width={297}
							height={366}
							loading="lazy"
							decoding="async"
						/>
					</div>
					{/*Bottom right image*/}
					<div className="cs-picture cs-picture2">
						<Image
							src="/images/wwa-history2.jpg"
							alt="campers on a bleacher"
							width={405}
							height={376}
							loading="lazy"
							decoding="async"
						/>
					</div>
					{/*Middle image*/}
					<div className="cs-picture cs-picture3"></div>
				</div>
				<div className="cs-content">
					<h2 className="cs-title">History of Camp Horizon </h2>
					<p className="cs-text">
						Camp Horizon began in 1974 when the Lynden Jaycees recognized a need
						for recreational opportunities for adults with developmental and
						physical disabilities. The first summer, 17 campers gathered at the
						Lynden Fairgrounds for what would become the beginning of a lasting
						legacy. By 1981, the program had grown beyond the Jaycees’ capacity,
						and the Lynden Lions Club assumed leadership, hosting 85 campers
						that year. Continued growth led to a move in 1985 to the former
						Blaine Air Force Station, now Whatcom County’s Bay Horizon Park
						where Camp Horizon welcomed 130 campers during its first season at
						the new location.
					</p>
					<p className="cs-text">
						In 1986, the Camp Horizon Foundation was established as a 501(c)(3)
						nonprofit, owned by Lions Clubs of District 19H (NW Washington and
						SW British Columbia). As our programs expanded, so did our reach and
						impact. Over the years, our sessions grew into multiple one-week
						programs and eventually evolved into a combination of Base Camp and
						Adventure Camp sessions, allowing us to serve more campers with a
						wide range of abilities and support needs.
					</p>
				</div>
			</div>
		</section>
	);
}
