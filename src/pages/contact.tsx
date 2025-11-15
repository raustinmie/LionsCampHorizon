import ContactSeo from "@/components/seo/contact-seo";
import Contact2320 from "@/components/stitches/contact/contact-2320/contact-2320";
import CustomSbsrC from "@/components/stitches/contact/custom-sbsr-c/custom-sbsr-c";
import Cta697 from "@/components/stitches/shared/cta-697/cta-697";

export default function Contact() {
	return (
		<div style={{ width: "100%" }}>
			<ContactSeo
				description="Questions about Red Barn Market? Get in touch with our team — we’re happy to help vendors and shoppers alike."
				ogDescription="Reach the Red Barn Market crew for vendor inquiries, ticket info, or general questions about Whatcom County’s favorite seasonal pop-up."
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
