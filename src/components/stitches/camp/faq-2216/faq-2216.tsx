import { useState } from "react";
import Image from "next/image";
import { FaqQuestionAndAnswer } from "@/components/seo/faq-seo";

export interface Faq2216Props {
	faqData: FaqQuestionAndAnswer[];
}
export default function Faq2216({ faqData }: Faq2216Props) {
	// Track which FAQ items are open
	const [activeIndex, setActiveIndex] = useState<number>(0); // first item open by default

	const toggleItem = (index: number) => {
		// If the clicked item is already open, close it; otherwise, open it
		setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
	};

	return (
		<section id="faq-2216">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">Frequently Asked Questions</h2>
					<div className="cs-wrapper">
						<ul className="cs-faq-group">
							{faqData.map((item, index) => (
								<li
									key={index}
									className={`cs-faq-item ${
										activeIndex === index ? "active" : ""
									}`}
								>
									<button
										className="cs-button"
										onClick={() => toggleItem(index)}
									>
										<span className="cs-button-text">{item.question}</span>
									</button>
									<p className="cs-item-p">{item.answer}</p>
								</li>
							))}
						</ul>

						<picture className="cs-picture">
							<Image
								loading="lazy"
								decoding="async"
								src="/images/camp-faq.avif"
								alt="A man in a chicken costume"
								width={2268}
								height={3456}
								aria-hidden="true"
							/>
						</picture>
					</div>
				</div>
			</div>
		</section>
	);
}
