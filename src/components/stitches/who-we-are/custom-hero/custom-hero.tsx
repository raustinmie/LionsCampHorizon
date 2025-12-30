import Image from "next/image";

export default function CustomHero() {
	return (
		<section id="custom-hero">
			<div className="cs-container">
				<Image
					src="/images/whoweare-hero1.avif"
					className="cs-image1"
					alt="A thank you letter from a camper"
					width={436}
					height={640}
				/>
				<div className="cs-content">
					<h1 className="cs-title">Who We Are</h1>
					<p className="cs-text">
						We are more than just a summer camp. We are a safe, welcoming place
						where teens and adults with disabilities can relax, connect, and
						grow. Lions Camp Horizon gives campers the chance to unwind, make
						friends, and gently stretch outside their comfort zones in a
						supportive environment. By focusing on what each person can do, we
						build confidence, independence, and self-esteem. Abilities, not
						disabilities, lead the way… and FUN is always the top priority
					</p>
				</div>
				<Image
					src="/images/whoweare-hero2.avif"
					className="cs-image3"
					alt="A thank you letter from a camper"
					width={422}
					height={640}
				/>
			</div>
		</section>
	);
}
