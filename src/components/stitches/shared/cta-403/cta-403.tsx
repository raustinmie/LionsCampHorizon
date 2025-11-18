import Link from "next/link";
import React, { ReactNode } from "react";
import Image from "next/image";

export interface Cta403Props {
	imageSrc: string;
	title: string;
	subtitle: string | ReactNode;
	buttonText: string;
	linkHref: string;
	imageAlt: string;
}
export default function Cta403({
	imageSrc,
	title,
	subtitle,
	buttonText,
	linkHref,
	imageAlt,
}: Cta403Props) {
	return (
		<section id="cta-403">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">{title}</h2>
					<div className="cs-text">{subtitle}</div>
					<Link href={linkHref} className="cs-button-solid secondary">
						{buttonText}
					</Link>
				</div>
			</div>
			{/*Background Image*/}
			<div className="cs-background">
				<Image
					src={imageSrc}
					alt={imageAlt}
					width={1920}
					height={660}
					loading="lazy"
					decoding="async"
					aria-hidden="true"
				/>
			</div>
		</section>
	);
}
