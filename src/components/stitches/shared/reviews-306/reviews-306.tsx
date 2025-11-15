import React from "react";
import Image from "next/image";

interface Reviews306Props {
	imageSrc?: string;
	referralText: string;
	referrerName?: string;
	referrerTitle?: string;
}
export default function Reviews306({
	imageSrc,
	referralText,
	referrerName,
	referrerTitle,
}: Reviews306Props) {
	return (
		<section id="reviews-306">
			{imageSrc && (
				<div className="cs-image">
					<Image src={imageSrc} alt="building" width={842} height={548} />
				</div>
			)}
			<div className="cs-content">
				<Image src="/images/quote.png" alt="quote" width={40} height={33} />
				<p className="cs-review">{referralText}</p>
				<div className="cs-info">
					<div className="cs-flex">
						<span className="cs-name">{referrerName}</span>
						<span className="cs-job">{referrerTitle}</span>
					</div>
				</div>
				{/*Bottom watermark quote*/}
				<Image
					src="/images/quote.png"
					alt="quote"
					className="cs-watermark"
					width={136}
					height={120}
				/>
			</div>
		</section>
	);
}
