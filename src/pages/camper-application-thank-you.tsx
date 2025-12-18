import Head from "next/head";
import Link from "next/link";

export default function CamperApplicationThankYou() {
	return (
		<>
			<Head>
				<title>Camper Application Submitted | Lions Camp Horizon</title>
			</Head>
			<section className="thank-you">
				<div className="thank-you__container">
					<h1>Application Received!</h1>
					<p>
						Thank you for submitting your camper application. Our admissions team
						will review the information and reach out soon with next steps and any
						additional requirements.
					</p>
					<p>
						If you have questions in the meantime, please <Link href="/contact">contact us</Link> or call the office.
					</p>
					<Link href="/" className="thank-you__button">
						Return Home
					</Link>
				</div>
			</section>
		</>
	);
}
