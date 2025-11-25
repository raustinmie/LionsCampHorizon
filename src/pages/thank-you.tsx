import Head from "next/head";
import Link from "next/link";

export default function ThankYou() {
	return (
		<>
			<Head>
				<title>Thank You | Lions Camp Horizon</title>
			</Head>
			<section className="thank-you">
				<div className="thank-you__container">
					<h1>Thank You!</h1>
					<p>
						Your generosity helps teens and adults with disabilities experience a
						summer full of connection, adventure, and belonging. We truly
						appreciate your support.
					</p>
					<p>
						If you have any questions about your donation, please feel free to{" "}
						<Link href="/contact">contact us</Link>.
					</p>
					<Link href="/" className="thank-you__button">
						Return Home
					</Link>
				</div>
			</section>
		</>
	);
}
