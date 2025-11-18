import GenericSeo from "./generic-seo";
import {
	companyName,
	canonicalUrl,
	primaryEmail,
	primaryPhone,
	facebookUrl,
	instagramUrl,
	primaryAddress1,
	locality,
	state,
	zip,
} from "@/constants";

interface HomeSeoProps {
	description: string;
	ogDescription?: string;
}

export default function HomeSeo({ description, ogDescription }: HomeSeoProps) {
	// Safe fallbacks
	const safePhone = primaryPhone || "";
	const safeAddress = primaryAddress1 || "";
	const safeLocality = locality || "";
	const safeState = state || "";
	const safeZip = zip || "";

	// Clean social URLs (remove undefined, null, empty strings)
	const safeSameAs = [facebookUrl, instagramUrl].filter(
		(item): item is string => typeof item === "string" && item.trim() !== ""
	);

	// Build Organization JSON-LD only if something important exists
	const organizationLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: companyName,
		url: canonicalUrl,
		email: primaryEmail,
		telephone: safePhone || undefined, // Avoid empty strings in JSON-LD
		nonprofitStatus: "Nonprofit501c3",
		address:
			safeAddress || safeLocality || safeState || safeZip
				? {
						"@type": "PostalAddress",
						streetAddress: safeAddress || undefined,
						addressLocality: safeLocality || undefined,
						addressRegion: safeState || undefined,
						postalCode: safeZip || undefined,
						addressCountry: "US",
				  }
				: undefined,
		sameAs: safeSameAs.length > 0 ? safeSameAs : undefined,
	};

	// Clean out undefined fields so JSON-LD stays valid
	const cleanedOrganizationLd = JSON.parse(JSON.stringify(organizationLd));

	return (
		<GenericSeo
			title={`Home | ${companyName}`}
			description={description}
			ogDescription={ogDescription}
			jsonLd={[
				{
					"@context": "https://schema.org",
					"@type": "WebSite",
					name: companyName,
					url: canonicalUrl,
					description,
				},
				cleanedOrganizationLd,
			]}
		/>
	);
}
