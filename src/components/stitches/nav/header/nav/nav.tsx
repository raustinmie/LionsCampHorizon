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
						<Link href="" className="cs-social-link">
							<Image
								src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/facebook-dark.svg"
								alt="logo"
								width={12}
								height={12}
							/>
						</Link>
						<Link href="" className="cs-social-link">
							<Image
								src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/instagram-dark.svg"
								alt="logo"
								width={12}
								height={12}
							/>
						</Link>
					</div>
					<div className="cs-top-contact">
						<Link href="" className="cs-top-link">
							<Image
								src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/charity-pin-green.svg"
								alt="logo"
								width={16}
								height={16}
							/>
							{primaryAddress1}
							<br />
							{primaryAddress2}
						</Link>
						<Link href="" className="cs-top-link">
							<Image
								src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/charity-phone-green.svg"
								alt="logo"
								width={16}
								height={16}
							/>
							{primaryPhone}
						</Link>
					</div>
				</div>
			</div>
			<div className="cs-container">
				{/*Nav Logo*/}
				<Link href="" className="cs-logo" aria-label="back to home">
					<Image src="/images/logo.png" alt="logo" width={43} height={43} />
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
							<span className="cs-desc">Join Us Now</span>
							<span className="cs-header">Become a Volunteer</span>
						</div>
					</Link>
					<Link href="/donate" className="cs-button-solid cs-nav-button">
						Donate Now
					</Link>
				</div>
				{/*Dark Mode toggle, uncomment button code if you want to enable a dark mode toggle*/}
				{/* <button id="dark-mode-toggle" aria-label="dark mode toggle">
            <svg className="cs-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" style="enable-background:new 0 0 480 480" xml:space="preserve"><path d="M459.782 347.328c-4.288-5.28-11.488-7.232-17.824-4.96-17.76 6.368-37.024 9.632-57.312 9.632-97.056 0-176-78.976-176-176 0-58.4 28.832-112.768 77.12-145.472 5.472-3.712 8.096-10.4 6.624-16.832S285.638 2.4 279.078 1.44C271.59.352 264.134 0 256.646 0c-132.352 0-240 107.648-240 240s107.648 240 240 240c84 0 160.416-42.688 204.352-114.176 3.552-5.792 3.04-13.184-1.216-18.496z"/></svg>
            <Image src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons%2Fsun.svg" alt="moon" width={15} height={15} />
        </button> */}
			</div>
		</header>
	);
}
