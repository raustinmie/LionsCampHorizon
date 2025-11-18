import { FAQPage, Service, WithContext } from "schema-dts";
import GenericSeo from "./generic-seo";
import { canonicalUrl, companyName } from "@/constants";

interface CampSeoProps {
	description: string;
	ogDescription?: string;
	faqData: { question: string; answer: string }[];
}

function buildFaqJsonLd(
	faqData: { question: string; answer: string }[]
): WithContext<FAQPage> {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqData.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};
}

export default function CampSeo({
	description,
	ogDescription,
	faqData,
}: CampSeoProps) {
	const faqJsonLd: WithContext<FAQPage> = buildFaqJsonLd(faqData);

	const campServicesJsonLd: WithContext<Service> = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: "Summer Camp Programs for Teens and Adults with Disabilities",
		provider: {
			"@type": "Organization",
			name: "Lions Camp Horizon",
		},
		serviceType: "Overnight Summer Camp",
		areaServed: {
			"@type": "Place",
			address: {
				"@type": "PostalAddress",
				addressLocality: "Blaine",
				addressRegion: "WA",
				addressCountry: "US",
			},
		},
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Camp Sessions",
			itemListElement: [
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Base Camp",
						description:
							"Overnight on-site camp for teens and adults with disabilities, offering 1:1 to 4:1 care ratios, nursing staff, and accessible activities.",
						areaServed: "Blaine, WA",
					},
					priceSpecification: {
						"@type": "PriceSpecification",
						priceCurrency: "USD",
						price: "900",
						alternateName: "3:1 and 4:1 ratio pricing",
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Base Camp (1:1 and 2:1 ratio)",
						description:
							"Overnight camp with enhanced support levels including 1:1 and 2:1 care ratios.",
						areaServed: "Blaine, WA",
					},
					priceSpecification: {
						"@type": "PriceSpecification",
						priceCurrency: "USD",
						price: "1300",
					},
				},
			],
		},
	};

	return (
		<GenericSeo
			title={`Camp | ${companyName}`}
			description={description}
			ogDescription={ogDescription}
			canonicalUrlPath="camp"
			jsonLd={[
				{
					"@context": "https://schema.org",
					"@type": "WebPage",
					name: "Camp",
					url: `${canonicalUrl}/camp`,
					description: description,
				},
				// Services (Base + Adventure Camp)
				campServicesJsonLd,
				// FAQ
				faqJsonLd,
			]}
		/>
	);
}
