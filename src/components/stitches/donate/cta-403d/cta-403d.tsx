"use client";

import Link from "next/link";
import React, { ReactNode } from "react";
import Image from "next/image";

export interface Cta403DProps {
	imageSrc: string;
	imageWidth: number;
	imageHeight: number;
	title: string;
	subtitle: string | ReactNode;
	buttonText: string;
	imageAlt: string;
	onDonateClick: () => void;
}

export default function Cta403D({
	imageSrc,
	imageWidth,
	imageHeight,
	title,
	subtitle,
	buttonText,
	imageAlt,
	onDonateClick,
}: Cta403DProps) {
	return (
		<section id="cta-403d">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">{title}</h2>
					<div className="cs-text">{subtitle}</div>
					<button className="cs-button-solid secondary" onClick={onDonateClick}>
						{buttonText}
					</button>
				</div>
			</div>

			{/* Background Image */}
			<div className="cs-background">
				<Image
					src={imageSrc}
					alt={imageAlt}
					width={imageWidth}
					height={imageHeight}
					loading="lazy"
					decoding="async"
					aria-hidden="true"
				/>
			</div>

		</section>
	);
}
