import React from "react";
import Image from "next/image";
import PrivacyPolicy from "@/components/legalese/privacy-policy";
import TermsOfService from "@/components/legalese/terms-of-service";
import Link from "next/link";
import {
	facebookUrl,
	instagramUrl,
	primaryEmail,
	primaryPhone,
	staffApplicationLink,
} from "@/constants";
import { MailIcon, MapPin, PhoneIcon } from "lucide-react";

export default function Footer1391() {
	return (
		<footer id="cs-footer-1862">
			<div className="cs-container">
				{/*Top Section*/}
				<div className="cs-top">
					<div className="cs-flex">
						<Link href="/" className="cs-logo">
							<Image
								src="/images/logo.png"
								alt="logo"
								width={317}
								height={49}
								aria-hidden="true"
								loading="lazy"
								decoding="async"
							/>
						</Link>
						<div className="ein-tax-id">EIN/Tax ID: 91-1412783</div>
						<ul className="cs-social">
							<li className="cs-social-li">
								<Link
									href={facebookUrl}
									className="cs-social-link"
									rel="noopener"
									target="_blank"
									aria-label=""
								>
									<Image
										src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/grey-facebook.svg"
										alt="icon"
										width={24}
										height={24}
										className="cs-social-icon cs-default"
										loading="lazy"
										decoding="async"
										aria-hidden="true"
									/>
								</Link>
							</li>
							<li className="cs-social-li">
								<Link
									href={instagramUrl}
									className="cs-social-link"
									rel="noopener"
									target="_blank"
									aria-label=""
								>
									<Image
										src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/instagram-derm-footer.svg"
										alt="icon"
										width={24}
										height={24}
										className="cs-social-icon cs-default"
										loading="lazy"
										decoding="async"
										aria-hidden="true"
									/>
								</Link>
							</li>
						</ul>
					</div>
					<div className="cs-about">
						<strong>
							Want to learn more about Lions Club International (LCI) the
							world's largest service organization?
						</strong>
						<Link href="https://www.lionsclubs.org/en">
							Lions Club International
						</Link>
						<Link href="https://lionsmd19.org/districts.php">
							Lions Mulitiple District 19
						</Link>
					</div>
					<ul className="cs-ul cs-quick-links">
						<li className="cs-li">
							<span className="cs-header">Quick Links</span>
						</li>
						<li className="cs-li">
							<Link href="/camper-application" className="cs-link">
								Camper Application
							</Link>
						</li>
						<li className="cs-li">
							<Link href="/physical-examination-form.pdf" className="cs-link">
								LCH Physical Exam Form{" "}
							</Link>
						</li>
						<li className="cs-li">
							<Link href="/policies" className="cs-link">
								Camp Policies
							</Link>
						</li>
						<li className="cs-li">
							<Link href={staffApplicationLink} className="cs-link">
								Staff Application
							</Link>
						</li>
						<li className="cs-li">
							<Link href="/packing-list.pdf" className="cs-link">
								Camp Packing/Need to Know
							</Link>
						</li>
					</ul>
					<ul className="cs-ul cs-site-map">
						<li className="cs-li">
							<span className="cs-header">Site Map</span>
						</li>
						<li className="cs-li">
							<Link href="/" className="cs-link">
								Home
							</Link>
						</li>
						<li className="cs-li">
							<Link href="/camp" className="cs-link">
								Camp
							</Link>
						</li>
						<li className="cs-li">
							<Link href="/who-we-are" className="cs-link">
								Who We Are
							</Link>
						</li>
						<li className="cs-li">
							<Link href="/rentals" className="cs-link">
								Rentals
							</Link>
						</li>
						<li className="cs-li">
							<Link href="/staff" className="cs-link">
								Staff
							</Link>
						</li>
						<li className="cs-li">
							<Link href="/get-involved" className="cs-link">
								Get Involved
							</Link>
						</li>
						<li className="cs-li">
							<Link href="/donate" className="cs-link">
								Donate
							</Link>
						</li>
						<li className="cs-li">
							<Link href="/special-events" className="cs-link">
								Special Events
							</Link>
						</li>
						<li className="cs-li">
							<Link href="/contact" className="cs-link">
								Contact
							</Link>
						</li>
					</ul>
					<ul className="cs-ul cs-contact-ul">
						<li className="cs-li">
							<span className="cs-header">Contact</span>
						</li>
						<li className="cs-li">
							<PhoneIcon />
							<Link href={`tel:${primaryPhone}`} className="cs-link">
								{primaryPhone}
							</Link>
						</li>
						<li className="cs-li">
							<MailIcon />
							<Link href={`mailto:${primaryEmail}`} className="cs-link">
								{primaryEmail}
							</Link>
						</li>
						<li className="cs-li">
							<MapPin className="cs-icon" />
							<Link
								href="https://www.google.com/maps/place/Lions+Camp+Horizon/@48.9128912,-122.7383547,1351m/data=!3m1!1e3!4m6!3m5!1s0x5485c079683c38a1:0x99a426c59f97749c!8m2!3d48.9136659!4d-122.7347404!16s%2Fg%2F1tdjqv3d?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D"
								className="cs-link"
								target="_blank"
								rel="noopener"
							>
								Lions Camp Horizon
								<br />
								7506 Gemini Street
								<br />
								Blaine, WA 98230
							</Link>
						</li>
					</ul>
				</div>
				{/*Bottom Section*/}
				<div className="cs-bottom">
					{/*Navigation*/}
					<ul className="cs-nav">
						<li className="cs-nav-li">
							<PrivacyPolicy />
						</li>
						<li className="cs-nav-li">
							<TermsOfService />
						</li>
					</ul>
					<span className="cs-copyright">
						© Copyright 2025 -{" "}
						<Link
							href="https://harborviewwebdesign.com"
							className="cs-copyright-link"
						>
							Harborview Web Design
						</Link>
					</span>
				</div>
			</div>
		</footer>
	);
}
