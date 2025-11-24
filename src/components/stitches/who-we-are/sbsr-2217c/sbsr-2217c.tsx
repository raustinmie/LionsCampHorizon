import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Sbsr2217C() {
	return (
		<section id="sbsr-2217c">
			<div className="cs-container">
				<div className="cs-image-group">
					{/*Top left image*/}
					<div className="cs-picture cs-picture1">
						<Image
							src="/images/wwa-history5.avif"
							alt="the old radar tower on campus"
							width={640}
							height={787}
							loading="lazy"
							decoding="async"
						/>
					</div>
					{/*Bottom right image*/}
					<div className="cs-picture cs-picture2">
						<Image
							src="/images/wwa-history6.avif"
							alt="a sign for Blaine airforce station"
							width={640}
							height={498}
							loading="lazy"
							decoding="async"
						/>
					</div>
					{/*Middle image*/}
					<div className="cs-picture cs-picture3"></div>
				</div>
				<div className="cs-content">
					<h2 className="cs-title">History of Our Campus </h2>
					<p className="cs-text">
						The Blaine Air Force Station was established in 1951 as part of the
						United States’ early- warning radar network during the Cold War.
						Perched near the Canadian border and the Salish Sea, it played a key
						role in monitoring the Pacific Northwest airspace for potential
						incoming aircraft. Airmen stationed here worked around the clock
						tracking radar data and communicating with other defense sites to
						ensure national security. Although its primary mission was national
						defense, the station was designed as a fully functioning post,
						equipped with facilities to support those living on-site. It even
						included a commissary, hobby shops, and a small two-lane bowling
						alley, which still exists today and is enjoyed by Camp Horizon
						campers. Advancing radar and monitoring technology eventually
						consolidated operations into fewer locations, and the Blaine Air
						Force Station was decommissioned in 1979. The land was later
						repurposed into Bay Horizon Park, where it now serves a very
						different, and much more joyful, purpose as the home of Lions Camp
						Horizon.
					</p>
				</div>
			</div>
		</section>
	);
}
