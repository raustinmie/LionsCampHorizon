import type { NextConfig } from "next";

const ONE_YEAR = 31536000;
const ONE_WEEK = 604800;

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: "/_next/static/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: `public, max-age=${ONE_YEAR}, immutable`,
					},
				],
			},
			{
				source: "/images/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: `public, max-age=${ONE_YEAR}, immutable`,
					},
				],
			},
			{
				source: "/fonts/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: `public, max-age=${ONE_WEEK}, immutable`,
					},
				],
			},
			{
				source: "/((?!api|_next/static|images|fonts).*)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=0, must-revalidate",
					},
				],
			},
		];
	},
};

export default nextConfig;
