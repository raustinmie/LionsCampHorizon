import React, { useState } from "react";
import Image from "next/image";
import { FaqQuestionAndAnswer } from "@/components/seo/faq-seo";

interface Faq2353Props {
	faqs: FaqQuestionAndAnswer[];
	imageSrc: string;
	imageAlt: string;
}
export default function Faq2353({ faqs, imageSrc, imageAlt }: Faq2353Props) {
	// Track which FAQ items are open
	const [activeIndex, setActiveIndex] = useState<number>(0); // first item open by default

	const toggleItem = (index: number) => {
		// If the clicked item is already open, close it; otherwise, open it
		setActiveIndex((prevIndex: number) => (prevIndex === index ? -1 : index));
	};

	return (
		<section id="faq-2352">
			<div className="cs-container">
				<div className="cs-wrapper">
					<div className="cs-content">
						<h2 className="cs-title">Frequently Asked Questions</h2>
					</div>
					<div className="cs-flex-group">
						<ul className="cs-faq-group">
							{faqs.map((item, index) => (
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
					</div>
				</div>
				<div className="cs-picture">
					<Image src={imageSrc} alt={imageAlt} width={606} height={606} />
				</div>
			</div>
		</section>
	);
}
