import React from "react";
import Image from "next/image";
import { ContactFormV2 } from "component-library";
import { primaryAddress1, primaryAddress2 } from "@/constants";
import Link from "next/link";

export default function Contact2320() {
	const smtpSecure =
		process.env.NEXT_PUBLIC_PRIVATEEMAIL_SECURE !== undefined
			? process.env.NEXT_PUBLIC_PRIVATEEMAIL_SECURE === "true"
			: undefined;

	return (
		<section id="contact-2320">
			<div className="cs-container">
				<div className="cs-content">
					<span className="cs-topper">Contact</span>
					<h2 className="cs-title">Get In Touch</h2>
					{/*Form*/}
					<ContactFormV2
						toEmail="r.austin.mie@gmail.com"
						smtpHost={process.env.PRIVATEEMAIL_HOST!}
						smtpPort={process.env.PRIVATEEMAIL_PORT!}
						smtpUser={process.env.PRIVATEEMAIL_USER!}
						smtpPass={process.env.PRIVATEEMAIL_PASS!}
						smtpSecure={smtpSecure}
					/>
				</div>
				{/*Map Image, pin is made in the Figma then export as one image*/}
				<div className="cs-map">
					<div className="cs-iframe-wrapper">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.090611391116!2d-122.73731532319704!3d48.9136658713397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485c079683c38a1%3A0x99a426c59f97749c!2sLions%20Camp%20Horizon!5e0!3m2!1sen!2sus!4v1763170680686!5m2!1sen!2sus"
							width="600"
							height="450"
							style={{ border: 0 }}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</div>
					<div className="cs-box">
						<div className="cs-flex">
							<span className="cs-header">Location</span>
							<span className="cs-address">Lions Camp Horizon</span>
							<span className="cs-address">{primaryAddress1} </span>
							<span className="cs-address">{primaryAddress2} </span>
						</div>
					</div>
				</div>
			</div>
			<div className="cs-container2">
				<div className="cs-hours">
					<div className="cs-info">Office Hours</div>
					<span className="cs-text">
						Our office is open to the public Monday-Wednesday from 9 am – 3 pm. 
						You can call our office anytime at 360-371-0531 and leave a
						message.  Messages are checked Monday - Wednesday and will be
						returned as soon as possible. 
					</span>
					<br />
					<strong className="cs-text strong">
						For a faster response, please email{" "}
						<Link href="mailto:admin@lionscamphorizon.org" className="cs-link">
							admin@lionscamphorizon.org
						</Link>
					</strong>
				</div>
			</div>
			<div className="cs-container3">
				<strong className="cs-text strong light">
					For Lions Camp Horizon rental inquiries call 360-371-0531 or email{" "}
					<Link
						href="mailto:admin@lionscamphorizon.org"
						className="cs-link light"
					>
						admin@lionscamphorizon.org
					</Link>
				</strong>
			</div>
		</section>
	);
}
