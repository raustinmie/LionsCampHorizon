import { useState } from "react";
import GenericSeo from "@/components/seo/generic-seo";
import { companyName } from "@/constants";
import HeroD2149 from "@/components/stitches/donate/hero-d-2149/hero-d-2149";
import ServicesD2198 from "@/components/stitches/donate/services-d-2198/services-d-2198";
import SbsD2369 from "@/components/stitches/donate/sbs-d-2369/sbs-d-2369";
import CustomSbsD from "@/components/stitches/donate/custom-sbs-d/custom-sbs-d";
import CustomSbsrD from "@/components/stitches/donate/custom-sbsr-d/custom-sbsr-d";
import Link from "next/link";
import { canonicalUrl } from "@/constants";
import Cta403D from "@/components/stitches/donate/cta-403d/cta-403d";
import DonationModal from "@/components/stitches/donate/donation-modal/donation-modal";
export default function Donate() {
	const [isDonateModalOpen, setDonateModalOpen] = useState(false);
	const openDonateModal = () => setDonateModalOpen(true);
	const closeDonateModal = () => setDonateModalOpen(false);

	return (
		<div>
			<GenericSeo
				title={`Donate | ${companyName}`}
				description="Support Lions Camp Horizon and help teens and adults with disabilities experience a summer full of fun, friendships, and life-changing memories. Your donation, big or small, makes a difference!"
				ogDescription="Your generosity brings Camp Horizon to life! Donate, give in-kind, participate in matching gift programs, planned giving, or fundraisers to support our campers and programs."
				canonicalUrlPath="/donate"
				jsonLd={{
					"@context": "https://schema.org",
					"@type": "WebPage",
					name: "Donate",
					url: `${canonicalUrl}donate`,
					description:
						"Support Lions Camp Horizon and help teens and adults with disabilities experience a summer full of fun, friendships, and life-changing memories. Your donation, big or small, makes a difference!",
				}}
			/>
			<HeroD2149 onDonateClick={openDonateModal} />
			<ServicesD2198 />
			<SbsD2369 />
			<CustomSbsD />
			<CustomSbsrD />
			<Cta403D
				imageSrc="/images/donate-bbq.avif"
				imageWidth={2048}
				imageHeight={1536}
				imageAlt="A couple in front of a barbecue"
				title="How to Donate"
				buttonText="
			Donate Today"
				onDonateClick={openDonateModal}
				subtitle={
					<div>
						<p className="cs-text">
							Your support makes a real impact on camp. If you’d like to discuss
							donation options or learn more about giving to Camp Horizon,
							please contact us.{" "}
							<Link className="cs-link" href="tel:3603710531">
								360-371-0531
							</Link>{" "}
							or{" "}
							<Link className="cs-link" href="tel:3603710531">
								admin@lionscamphorizon.org
							</Link>
						</p>
						<ul>
							<li>
								Donations can be mailed to Lions Camp Horizon 7506 Gemini St.
								Blaine, WA 98230. Or click the button below!
							</li>
							<li>
								<strong>Please note:</strong> online donations include a
								processing fee. To give without this fee, checks can be mailed
								to Lions Camp Horizon 7506 Gemini St., Blaine WA 98230
							</li>
						</ul>
					</div>
				}
			/>
			<DonationModal
				isModalOpen={isDonateModalOpen}
				onClose={closeDonateModal}
			/>
		</div>
	);
}
