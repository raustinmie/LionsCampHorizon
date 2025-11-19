import { companyName, canonicalUrl, primaryEmail } from "@/constants";
import LegalModal from "./legal-modal";
import Link from "next/link";

export default function PrivacyPolicy() {
	const policy = (
		<div>
			<h1>Privacy Policy</h1>
			<p>
				Your privacy is important to us. To better protect your privacy we
				provide this notice explaining our online information practices and the
				choices you can make about the way your information is collected and
				used. This Policy explains when and why we collect personal information
				about people who visit our website, how we use it, the conditions under
				which we may disclose it to others and how we keep it secure. We may
				change this Policy from time to time, so please check this page
				occasionally. By using our website, you are agreeing to be bound by this
				policy.
			</p>
			<h3>How do we collect information from you?</h3>
			<p>
				We obtain information about you when you use our website, for example,
				when you fill out one of the forms on our website.
			</p>
			<h3>What type of information is collected from you?</h3>
			<p>
				The personal information we collect may include your name, address,
				email address, IP address, phone number, and information regarding what
				pages are accessed and when.
			</p>
			<p>Other types of information we may collect via third parties:</p>
			<ul>
				<li>
					Analytics: We use Google Analytics, which uses cookies and similar
					technologies to collect and analyze information about use of the
					services and report on activities and trends. This service may also
					collect information regarding the use of other websites, apps, and
					online resources. You can learn about Google’s practices by going to
					www.google.com/policies/privacy/‌partners/, and opt out of them by
					downloading the Google Analytics opt-out browser add-on, available at
					https://tools.google.com/dlpage/gaoptout.
				</li>
				<li>
					IP Address: Your IP address is a number that is automatically assigned
					to the computer that you are using by your internet service provider.
					An IP address may be logged automatically in our server log files
					whenever you access our site, along with the time of the visit and the
					pages visited. Collecting IP addresses is done automatically by many
					websites, applications, and other services. We use IP addresses for
					purposes such as calculating usage levels and diagnosing server
					problems. We may also derive your approximate location from your IP
					address.
				</li>
				<li>
					Using pixel tags and similar technologies: Pixel tags (also known as
					web beacons and clear GIFs) may be used in connection with some
					services to, among other things, track the actions of users (including
					email recipients), measure the success of our marketing campaigns and
					compile statistics about use of the services and response rates.
				</li>
			</ul>
			<h3>How is your information used?</h3>
			We may use your information to:
			<ul>
				<li>
					to carry out our obligations arising from any contracts entered into
					by you and us;
				</li>
				<li>seek your views or comments on the services we provide;</li>
				<li>notify you of changes to our services;</li>
				<li>
					send you communications which you have requested and that may be of
					interest to you;
				</li>
				<li>activities, promotions, of our associated services.</li>
			</ul>
			<p>
				We review our retention periods for personal information on a regular
				basis. We will hold your personal information on our systems for as long
				as is necessary for the relevant activity, or as long as is set out in
				any relevant contract you hold with us.
			</p>
			<h3>Who has access to your information?</h3>
			<p>
				We use return email addresses to answer the email we receive. We will
				not sell or rent your information to third parties. We will not share
				your information with third parties for marketing purposes.
			</p>
			<p>
				Third Party Service Providers working on our behalf: We may pass your
				information to our third party service providers, agents,
				subcontractors, and other associated organizations for the purposes of
				completing tasks and providing services to you on our behalf. However,
				when we use third party service providers, we disclose only the personal
				information that is necessary to deliver the service.
			</p>
			<p>
				We may transfer your personal information to a third party as part of a
				sale of some or all of our business and assets to any third party or as
				part of any business restructuring or reorganization, or if we’re under
				a duty to disclose or share your personal data in order to comply with
				any legal obligation or to enforce or apply our terms of use or to
				protect the rights, property, or safety of our supporters and customers.
				However, we will take steps with the aim of ensuring that your privacy
				rights continue to be protected.
			</p>
			<p>
				Finally, we never use or share the personally identifiable information
				provided to us online in ways unrelated to the ones described above
				without also providing you an opportunity to opt-out or otherwise
				prohibit such unrelated uses.
			</p>
			<h3>Your Choices</h3>
			<p>
				You have a choice about whether or not you wish to receive information
				from us. We may have forms which connect to our direct marketing email
				lists. If you do not want to receive direct marketing communications
				from us about our services, then you can select your choices by ticking
				the relevant boxes situated on the specific form(s) on which we collect
				your information for direct marketing purposes.
			</p>
			<p>
				We will not contact you for marketing purposes by email, phone or text
				message unless you have given your prior consent. We will not contact
				you for marketing purposes by post if you have indicated that you do not
				wish to be contacted. You can change your marketing preferences at any
				time by contacting us. Any messages sent via our direct marketing will
				have an option to unsubscribe.
			</p>
			<h3>How You Can Access and Update Your Information</h3>
			<p>
				The accuracy of your information is important to us. If you need to
				update any of the information we hold, please contact us. We will
				respond to your request within a reasonable period of time upon
				verification of your identity in accordance with local laws. We
				recommend you include documents that prove your identity and a clear and
				precise description of the information which you request access to.
			</p>
			<p>
				You have the right to ask for a copy of the information Lions Camp
				Horizon Foundation holds about you.
			</p>
			<h3>
				Security Precautions in Place to Protect the Loss, Misuse, or Alteration
				of Your Information
			</h3>
			<p>
				To prevent unauthorized access, maintain data accuracy, and ensure the
				correct use of information, Lions Camp Horizon Foundation has put in
				place appropriate physical, electronic, and managerial procedures to
				safeguard and secure the information we collect online. All pages are
				encrypted and protected with the following software 128 Bit encryption
				on SSL. When you are on a secure page, a lock icon will appear on the
				bottom of web browsers such as Microsoft Internet Explorer.
			</p>
			<p>
				Non-sensitive details (your email address etc.) are transmitted normally
				over the Internet, and this can never be guaranteed to be 100% secure.
				As a result, while we strive to protect your personal information, we
				cannot guarantee the security of any information you transmit to us, and
				you do so at your own risk. Once we receive your information, we make
				our best effort to ensure its security on our systems. Where we have
				given (or where you have chosen) a password which enables you to access
				certain parts of our websites, you are responsible for keeping this
				password confidential. We ask you not to share your password with
				anyone.
			</p>
			<h3>Use of ‘cookies’</h3>
			<p>
				A cookie is a small file which asks permission to be placed on your
				computer’s hard drive. Once you agree, the file is added and the cookie
				helps analyze web traffic or lets you know when you visit a particular
				site. Cookies allow web applications to respond to you as an individual.
				The web application can tailor its operations to your needs, likes, and
				dislikes by gathering and remembering information about your
				preferences.
			</p>
			<p>
				We use traffic log cookies to identify which pages are being used. This
				helps us analyze data about webpage traffic and improve our website in
				order to tailor it to customer needs. We only use this information for
				statistical analysis purposes.
			</p>
			<p>
				Overall, cookies help us provide you with a better website by enabling
				us to monitor which pages you find useful and which you do not. A cookie
				in no way gives us access to your computer or any information about you,
				other than the data you choose to share with us.
			</p>
			<p>
				You can choose to accept or decline cookies. Most web browsers
				automatically accept cookies, but you can usually modify your browser
				setting to decline cookies if you prefer. This may prevent you from
				taking full advantage of the website.
			</p>
			<h3>Links to Other Websites</h3>
			<p>
				Our website may contain links to other websites run by other
				organizations. This privacy policy applies only to our website‚ so we
				encourage you to read the privacy statements on the other websites you
				visit. We cannot be responsible for the privacy policies and practices
				of other sites even if you access them using links from our website.
			</p>
			<p>
				In addition, if you linked to our website from a third party site, we
				cannot be responsible for the privacy policies and practices of the
				owners and operators of that third party site and recommend that you
				check the policy of that third party site.
			</p>
			<h3>13 or Under</h3>
			<p>
				Protecting the privacy of the very young is especially important. For
				that reason, we never collect or maintain information at our website
				from those we actually know are under 13. Users with legal guardians,
				regardless of user age, are intended to only use our website with
				guardian consent.
			</p>
			<h3>Transferring Your Information</h3>
			<p>
				If you choose to provide us with personally identifiable information,
				Lions Camp Horizon Foundation may transfer that information to third
				parties, across borders, and from your country or jurisdiction to other
				countries or jurisdictions around the world. If you are visiting from
				the European Union or other regions with laws governing data collection
				and use that may differ from U.S. law, please note that you are
				transferring your personally identifiable information to the United
				States which does not have the same data protection laws as the EU and
				by providing your personally identifiable information you consent to:
			</p>
			<ul>
				<li>
					the use of your personally identifiable information for the uses
					identified above in accordance with this privacy policy; and
				</li>
				<li>
					the transfer of your personally identifiable information to the United
					States as indicated above.
				</li>
			</ul>
			<h3>Review of this Policy</h3>
			<p>
				We may update this Privacy Policy from time to time to reflect changes
				to our information practices. If we make any material changes we will
				notify you by a notice on our site prior to the change becoming
				effective. We encourage you to periodically review this page for the
				latest information on our privacy practices.
			</p>
			<p>This Policy was last updated on November 12, 2019.</p>
			<p>
				This privacy policy is adapted from the{" "}
				<Link href="https://www.bbb.org/">Better Business Bureau.</Link>
			</p>
		</div>
	);

	return (
		<div>
			<LegalModal title="Privacy Policy" content={policy} />
		</div>
	);
}
