import Link from "next/link";
import React from "react";
import Image from "next/image";
import { button } from "framer-motion/client";

export interface Cta697Props {
	bannerText: string;
	buttonText: string;
	linkHref: string;
}
export default function Cta697({
	bannerText,
	buttonText,
	linkHref,
}: Cta697Props) {
	return (
		<section id="cta-697">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">{bannerText}</h2>
					<Link href={linkHref} className="cs-button-solid secondary">
						{buttonText}
					</Link>
				</div>
			</div>
		</section>
	);
}
