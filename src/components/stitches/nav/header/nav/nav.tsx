"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
	facebookUrl,
	instagramUrl,
	primaryPhone,
	primaryAddress1,
	primaryAddress2,
} from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import { MapPin, Phone } from "lucide-react";

export default function Nav() {
	const headerRef = useRef<HTMLElement | null>(null);
	const pathname = usePathname(); // current path
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen((prev) => !prev);
	};

	// Handle Escape key
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMenuOpen(false);
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	// Add/remove body class
	useEffect(() => {
		if (menuOpen) {
			document.body.classList.add("cs-open");
		} else {
			document.body.classList.remove("cs-open");
		}
	}, [menuOpen]);

	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/who-we-are", label: "Who We Are" },
		{ href: "/camp", label: "Camp" },
		{ href: "/facility-rentals", label: "Facility Rentals" },
		{ href: "/staff", label: "Staff" },
		{ href: "/special-events", label: "Special Events" },
		{ href: "/contact", label: "Contact" },
	];

	return (
		<header id="cs-navigation" className={menuOpen ? "cs-active" : ""}>
			<div className="cs-top-bar">
				<div className="cs-top-container">
					<div className="cs-top-social">
						<Link href={facebookUrl} className="cs-social-link">
							<SiFacebook color="#000" />
						</Link>
						<Link href={instagramUrl} className="cs-social-link">
							<SiInstagram color="#000" />
						</Link>
					</div>
					<div className="cs-top-contact">
						<Link
							href="https://www.google.com/maps/place/Lions+Camp+Horizon/@48.9128912,-122.7383547,1351m/data=!3m1!1e3!4m6!3m5!1s0x5485c079683c38a1:0x99a426c59f97749c!8m2!3d48.9136659!4d-122.7347404!16s%2Fg%2F1tdjqv3d?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D"
							className="cs-top-link"
						>
							<MapPin />
							{primaryAddress1}
							<br />
							{primaryAddress2}
						</Link>
						<Link href={`tel:${primaryPhone}`} className="cs-top-link">
							<Phone />
							{primaryPhone}
						</Link>
					</div>
				</div>
			</div>
			<div className="cs-container">
				{/*Nav Logo*/}
				<Link href="/" className="cs-logo" aria-label="back to home">
					<Image src="/images/logo.png" alt="logo" width={180} height={178} />
				</Link>
				{/*Navigation List*/}
				<nav className="cs-nav" role="navigation">
					{/*Mobile Nav Toggle*/}
					<button
						className={`cs-toggle ${menuOpen ? "cs-active" : ""}`}
						aria-label="mobile menu toggle"
						aria-expanded={menuOpen}
						onClick={toggleMenu}
					>
						<div className="cs-box" aria-hidden="true">
							<span className="cs-line cs-line1" aria-hidden="true"></span>
							<span className="cs-line cs-line2" aria-hidden="true"></span>
							<span className="cs-line cs-line3" aria-hidden="true"></span>
						</div>
					</button>
					{/* We need a wrapper div so we can set a fixed height on the cs-ul in case the nav list gets too long from too many dropdowns being opened and needs to have an overflow scroll. This wrapper acts as the background so it can go the full height of the screen and not cut off any overflowing nav items while the cs-ul stops short of the bottom of the screen, which keeps all nav items in view no matter how mnay there are*/}
					<div className="cs-ul-wrapper">
						<ul id="cs-expanded" className="cs-ul">
							{navLinks.map((link) => (
								<li key={link.href} className="cs-li">
									<Link
										href={link.href}
										className={`cs-li-link ${
											pathname === link.href ? "cs-active" : ""
										}`}
										onClick={() => setMenuOpen(false)}
									>
										{link.label}
									</Link>
								</li>
							))}
							<li className="cs-li non-desktop" key="/get-involved">
								<Link
									href="/get-involved"
									className={`cs-li-link ${
										pathname === "/get-involved" ? "cs-active" : ""
									}`}
									onClick={() => setMenuOpen(false)}
								>
									Get Involved{" "}
								</Link>
							</li>
							<li className="cs-li non-desktop" key="/donate">
								<Link
									href="/donate"
									className={`cs-li-link ${
										pathname === "/donate" ? "cs-active" : ""
									}`}
									onClick={() => setMenuOpen(false)}
								>
									Donate
								</Link>
							</li>
						</ul>
					</div>
				</nav>
				<div className="cs-desktop-nav-actions">
					<Link href="/get-involved" className="cs-donate">
						<Image
							src="/images/give-heart.svg"
							alt="logo"
							width={56}
							height={56}
						/>
						<div className="cs-flex">
							<span className="cs-desc">Get Involved</span>
							<span className="cs-header">Become a Volunteer</span>
						</div>
					</Link>
					<Link href="/donate" className="cs-button-solid cs-nav-button">
						Donate
					</Link>
				</div>
			</div>
		</header>
	);
}
