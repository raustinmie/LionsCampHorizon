"use client";

import { useEffect, useState } from "react";

interface DonationModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
	const [amount, setAmount] = useState("");
	const [designation, setDesignation] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!isOpen) {
			setAmount("");
			setDesignation("");
			setLoading(false);
			setError(null);
		}
	}, [isOpen]);

	if (!isOpen) return null;

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const numericAmount = parseFloat(amount);
		if (!numericAmount || numericAmount <= 0) {
			setError("Please enter a valid amount.");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const res = await fetch("/api/create-checkout-session", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					amount: Math.round(numericAmount * 100),
					designation: designation.trim(),
				}),
			});
			const { url } = await res.json();
			if (!url) throw new Error("No URL returned from session creation");

			window.location.href = url;
		} catch (err) {
			console.error(err);
			setError("Something went wrong. Please try again.");
			setLoading(false);
		}
	};

	return (
		<div className="donation-modal-overlay" onClick={onClose}>
			<div
				className="donation-modal-content"
				onClick={(e) => e.stopPropagation()}
			>
				<button className="donation-modal-close" onClick={onClose}>
					&times;
				</button>
				<h3>Enter Donation Amount</h3>
				<form className="donation-modal-form" onSubmit={handleSubmit}>
					<input
						type="number"
						min="1"
						step=".01"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder="Amount in USD"
						required
					/>
					<textarea
						placeholder="What is this donation for? (optional)"
						value={designation}
						onChange={(e) => setDesignation(e.target.value)}
						rows={3}
					/>
					{error && <p className="donation-modal-error">{error}</p>}
					<button
						type="submit"
						disabled={loading}
						className="donation-modal-submit"
					>
						{loading ? "Redirecting..." : "Donate"}
					</button>
				</form>
			</div>
		</div>
	);
}
