import React from "react";

export default function ArticleFunctional() {
    return (
        <>
        <div id="Functional" className="single-case-screen2 white-background section is_view nullpaddb">
			<div className="wrap view hidden-block">

				<div className="flex-row view fadein">
					<div className="w50">
						<div className="section-subheading">Functional</div>
						<div className="section-title">
							Work continues on new features </div>
					</div>
					<div className="w50">

					</div>
				</div>
				<div className="tech-blocks view fadein">
					<div className="tech-line full">
						<div className="name">
							<div className="section-title small">
								Additional content types </div>
						</div>
						<div className="txt">
							<div className="simple-text">
								<p>Our team is currently working on adding 2 new content types - virtual worlds and
									domain names - to attract even more talented people and companies to our platform.
								</p>
							</div>
						</div>
					</div>
					<div className="tech-line full">
						<div className="name">
							<div className="section-title small">
								Dedicated Marketplace </div>
						</div>
						<div className="txt">
							<div className="simple-text">
								<p>We plan to develop our marketplace so users can sell collections and NFTs directly on
									our platform via 3 blockchains (Ethereum, Bitcoin, and Polygon).</p>
							</div>
						</div>
					</div>
					<div className="tech-line full">
						<div className="name">
							<div className="section-title small">
								The platform's NFT collection </div>
						</div>
						<div className="txt">
							<div className="simple-text">
								<p>Our design team is creating the platform's collection of NFTs - animated 2D heroes
									that will be sold on our platform and third-party services.</p>
							</div>
						</div>
					</div>
				</div>

				<div className="flex-row gallery">

					<picture>
						<source media="(min-width: 1600px)"
							srcSet="/assets/uploads/2023/02/1.jpg"/>
						<source media="(max-width: 1100px)"
							srcSet="/assets/uploads/2023/02/1.jpg"/>
						<source media="(min-width: 1101px) and (max-width:1599px)"
							srcSet="/assets/uploads/2023/02/1@2x.jpg"/>
                        <img width="630"
							height="650" className="view fadein" loading="lazy"
							src="/assets/uploads/2023/02/1%402x.jpg"
							alt="JoCreate &#8211; Application for creating NFT collections - Website Development - Photo 21"/>
					</picture>

					<picture>
						<source media="(min-width: 1600px)"
							srcSet="/assets/uploads/2023/02/2.jpg"/>
						<source media="(max-width: 1100px)"
							srcSet="/assets/uploads/2023/02/2.jpg"/>
						<source media="(min-width: 1101px) and (max-width:1599px)"
							srcSet="/assets/uploads/2023/02/2@2x.jpg"/>
                            <img width="630"
							height="650" className="view fadein" loading="lazy"
							src="/assets/uploads/2023/02/2%402x.jpg"
							alt="JoCreate &#8211; Application for creating NFT collections - Website Development - Photo 22"/>
					</picture>
				</div>
			</div>
		</div>

        </>
    );
}