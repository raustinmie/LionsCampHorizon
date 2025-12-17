import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2025-12-15.clover",
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return res.status(405).end("Method Not Allowed");
	}

	const { amount, designation } = req.body;

	if (!amount || amount < 1) {
		return res.status(400).json({ error: "Invalid amount" });
	}
	const trimmedDesignation =
		typeof designation === "string" ? designation.trim() : "";

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: "Donation",
							description: trimmedDesignation || undefined,
						},
						unit_amount: amount,
					},
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: `${req.headers.origin}/thank-you`,
			cancel_url: `${req.headers.origin}/donate`,
		});

		// Note: use session.url instead of session.id
		res.status(200).json({ url: session.url });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
}
