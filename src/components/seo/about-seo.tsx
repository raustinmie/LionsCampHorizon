import GenericSeo from "./generic-seo";
import {
	companyName,
	canonicalUrl,
	primaryEmail,
	primaryPhone,
	primaryAddress1,
	locality,
	state,
	zip,
	facebookUrl,
	instagramUrl,
} from "@/constants";
import { WithContext, AboutPage, Organization } from "schema-dts";

interface AboutSeoProps {
	description: string;
	ogDescription?: string;
}

export default function AboutSeo({
	description,
	ogDescription,
}: AboutSeoProps) {
	const jsonLd: WithContext<AboutPage | Organization>[] = [
		{
			"@context": "https://schema.org",
			"@type": "AboutPage",
			name: `About ${companyName}`,
			url: `${canonicalUrl}/about`,
			description,
		},
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			name: companyName,
			url: canonicalUrl,
			email: primaryEmail,
			telephone: primaryPhone,
			nonprofitStatus: "Nonprofit501c3",
			address: {
				"@type": "PostalAddress",
				streetAddress: primaryAddress1,
				addressLocality: locality,
				addressRegion: state,
				postalCode: zip,
				addressCountry: "US",
			},
			sameAs: [facebookUrl, instagramUrl],
		},
	];

	return (
		<GenericSeo
			title={`About | ${companyName}`}
			description={description}
			ogDescription={ogDescription}
			canonicalUrlPath="/who-we-are"
			jsonLd={jsonLd}
		/>
	);
}
