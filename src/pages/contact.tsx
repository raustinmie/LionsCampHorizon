import ContactSeo from "@/components/seo/contact-seo";
import Contact2320 from "@/components/stitches/contact/contact-2320/contact-2320";
import CustomSbsrC from "@/components/stitches/contact/custom-sbsr-c/custom-sbsr-c";
import Cta697 from "@/components/stitches/shared/cta-697/cta-697";

export default function Contact() {
	return (
		<div style={{ width: "100%" }}>
			<ContactSeo
				description="Have questions or want to get in touch with Lions Camp Horizon? Reach out to us via phone, email, or our online form. We’re happy to provide information on camper registration, volunteering, facility rentals, and more."
				ogDescription="Connect with Lions Camp Horizon! Whether you’re interested in camp programs, volunteering, or renting our facilities, we’re here to help. Contact us today and we’ll guide you every step of the way."
			/>
			<CustomSbsrC />
			<Contact2320 />
			<Cta697
				bannerText="Help us serve our campers!"
				buttonText="Donate"
				linkHref="/donate"
			/>
		</div>
	);
}
