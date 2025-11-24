"use client";

import Link from "next/link";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";

export interface Cta403DProps {
	imageSrc: string;
	imageWidth: number;
	imageHeight: number;
	title: string;
	subtitle: string | ReactNode;
	buttonText: string;
	imageAlt: string;
}

export default function Cta403D({
	imageSrc,
	imageWidth,
	imageHeight,
	title,
	subtitle,
	buttonText,
	imageAlt,
}: Cta403DProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [amount, setAmount] = useState(0);
	const [loading, setLoading] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const stripePromise = loadStripe(
		"pk_live_51SFgRlE1VIxhDy5JIkRMWMvPoDscjHTte1WJVE8gLGGsMWCcYppwPTOoyUIVnmpibq1Q7OEyS8tc0FlJRNnEk75A00hvzNR1Zw"
	); // your publishable key

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (amount <= 0) return;

		setLoading(true);
		try {
			const res = await fetch("/api/create-checkout-session", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ amount: Math.round(amount * 100) }),
			});
			const { url } = await res.json();
			if (!url) throw new Error("No URL returned from session creation");

			// Redirect the user:
			window.location.href = url;
		} catch (err) {
			console.error(err);
			setLoading(false);
		}
	};

	return (
		<section id="cta-403d">
			<div className="cs-container">
				<div className="cs-content">
					<h2 className="cs-title">{title}</h2>
					<div className="cs-text">{subtitle}</div>
					<button className="cs-button-solid secondary" onClick={openModal}>
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

			{/* Modal */}
			{isModalOpen && (
				<div className="cta403-modal-overlay" onClick={closeModal}>
					<div
						className="cta403-modal-content"
						onClick={(e) => e.stopPropagation()}
					>
						<button className="cta403-modal-close" onClick={closeModal}>
							&times;
						</button>
						<h3>Enter Donation Amount</h3>
						<form onSubmit={handleSubmit}>
							<input
								type="number"
								min="1"
								step=".01"
								value={amount > 0 ? amount : ""}
								onChange={(e) => setAmount(parseFloat(e.target.value))}
								placeholder="Amount in USD"
								required
							/>
							<button type="submit" disabled={loading}>
								{loading ? "Redirecting..." : "Donate"}
							</button>
						</form>
					</div>
				</div>
			)}
		</section>
	);
}
