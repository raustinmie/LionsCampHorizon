import React from "react";
import Image from "next/image";

interface Reviews306Props {
	imageSrc?: string;
	imageWidth?: number;
	imageHeight?: number;
	referralText: string;
	referrerName?: string;
	referrerTitle?: string;
}
export default function Reviews306({
	imageSrc,
	imageWidth,
	imageHeight,
	referralText,
	referrerName,
	referrerTitle,
}: Reviews306Props) {
	return (
		<section id="reviews-306">
			{imageSrc && imageWidth && imageHeight && (
				<div className="cs-image">
					<Image
						src={imageSrc}
						alt="building"
						width={imageWidth}
						height={imageHeight}
					/>
				</div>
			)}
			<div className="cs-content">
				<Image src="/images/quote.avif" alt="quote" width={40} height={33} />
				<p className="cs-review">{referralText}</p>
				<div className="cs-info">
					<div className="cs-flex">
						<span className="cs-name">{referrerName}</span>
						<span className="cs-job">{referrerTitle}</span>
					</div>
				</div>
				{/*Bottom watermark quote*/}
				<Image
					src="/images/quote.avif"
					alt="quote"
					className="cs-watermark"
					width={40}
					height={33}
				/>
			</div>
		</section>
	);
}
