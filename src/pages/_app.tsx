import "../components/stitches/contact/contact-2320/contact-2320.css";
import "../components/stitches/contact/custom-sbsr-c/custom-sbsr-c.css";
import "../components/stitches/donate/cta-403d/cta-403d.css";
import "../components/stitches/donate/donation-modal/donation-modal.css";
import "../components/stitches/donate/custom-sbsr-d/custom-sbsr-d.css";
import "../components/stitches/donate/custom-sbs-d/custom-sbs-d.css";
import "../components/stitches/donate/sbs-d-2369/sbs-d-2369.css";
import "../components/stitches/donate/services-d-2198/services-d-2198.css";
import "../components/stitches/donate/hero-d-2149/hero-d-2149.css";
import "../components/stitches/get-involved/pricing-1842/pricing-1842.css";
import "../components/stitches/get-involved/custom-sbs/custom-sbs.css";
import "../components/stitches/get-involved/sbs-g-2376/sbs-g-2376.css";
import "../components/stitches/get-involved/hero-g-2149/hero-g-2149.css";
import "../components/stitches/staff/gallery-s-1152/gallery-s-1152.css";
import "../components/stitches/staff/services-2387/services-2387.css";
import "../components/stitches/staff/hero-s-2149/hero-s-2149.css";
import "../components/stitches/facility-rentals/services-1168/services-1168.css";
import "../components/stitches/shared/cta-403/cta-403.css";
import "../components/stitches/facility-rentals/services-961/services-961.css";
import "../components/stitches/facility-rentals/hero-f-2149/hero-f-2149.css";
import "../components/stitches/shared/cta-697/cta-697.css";
import "../components/stitches/who-we-are/sbsr-2217c/sbsr-2217c.css";
import "../components/stitches/who-we-are/sbsr-2217b/sbsr-2217b.css";
import "../components/stitches/who-we-are/sbsr-2217/sbsr-2217.css";
import "../components/stitches/who-we-are/board-section/board-section.css";
import "../components/stitches/who-we-are/gallery-1152/gallery-1152.css";
import "../components/stitches/who-we-are/meet-team-1141/meet-team-1141.css";
import "../components/stitches/who-we-are/services-2198/services-2198.css";
import "../components/stitches/who-we-are/custom-hero/custom-hero.css";
import "../components/stitches/camp/sbs-2375/sbs-2375.css";
import "../components/stitches/camp/sbs-2375-b/sbs-2375-b.css";
import "../components/stitches/home/cta-1132/cta-1132.css";
import "../components/stitches/shared/reviews-306/reviews-306.css";
import "../components/stitches/home/sbsr-2181/sbsr-2181.css";
import "../components/stitches/home/sbs-2369/sbs-2369.css";
import "../components/stitches/home/hero-2149/hero-2149.css";
import "../components/stitches/camp/hero-c-2149/hero-c-2149.css";
import "../components/stitches/nav/header/nav/nav.css";
import "../components/stitches/nav/footer-1391/footer-1391.css";
import "../components/stitches/camp/custom-cta/custom-cta.css";
import "../components/stitches/camp/faq-2216/faq-2216.css";
import "../styles/globals.css";
import "../styles/special-events.css";
import "../styles/camper-application.css";

import type { AppProps } from "next/app";
import Footer1391 from "@/components/stitches/nav/footer-1391/footer-1391";
import { Merriweather, Montserrat } from "next/font/google";
import Nav from "@/components/stitches/nav/header/nav/nav";
import Script from "next/script";

const merriweather = Merriweather({
	subsets: ["latin"],
	display: "swap",
	weight: ["300", "400", "700", "900"],
});

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
	weight: ["300", "400", "700", "900"],
});

declare global {
	interface Window {
		gtag?: (
			command: "config" | "event" | "js" | "consent",
			targetId: string,
			config?: Record<string, unknown>
		) => void;
	}
}

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className={`${montserrat.className} ${merriweather.className}`}>
			<Script src="https://js.stripe.com/v3/" strategy="beforeInteractive" />

			<div className="app-container">
				<Nav />
				<Component {...pageProps} />
				<Footer1391 />
			</div>
		</div>
	);
}
export default MyApp;
