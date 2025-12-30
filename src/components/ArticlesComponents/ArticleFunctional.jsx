import React from "react";

export default function ArticleFunctional({ data }) {
    return (
        <>
        <div id="Functional" className="single-case-screen2 white-background section is_view nullpaddb">
			<div className="wrap view hidden-block">

				<div className="flex-row view fadein">
					<div className="w50">
						<div className="section-subheading">{data.SectionTitle || "Functional"}</div>
						<div className="section-title">
							{data.MainTitle || "Work continues on new features"}</div>
					</div>
					<div className="w50">

					</div>
				</div>
				<div className="tech-blocks view fadein">
					{data.Features && data.Features.map((feature, index) => (
					<div className="tech-line full" key={index}>
						<div className="name">
							<div className="section-title small">
								{feature.title}</div>
						</div>
						<div className="txt">
							<div className="simple-text">
								<p>{feature.description}</p>
							</div>
						</div>
					</div>
				))}
				</div>

				<div className="flex-row gallery">

					{data.Gallery && data.Gallery.map((image, index) => (
					<picture key={index}>
						{/*<source media="(min-width: 1600px)"
							srcSet={image.src}/>
						<source media="(max-width: 1100px)"
							srcSet={image.src}/>
						<source media="(min-width: 1101px) and (max-width:1599px)"
							srcSet={image.src2x}/>
						*/}
						<img width={image.width} height={image.height} className="view fadein" loading="lazy"
							src={image.src}
							alt={image.alt}/>
					</picture>
				))}
				</div>
			</div>
		</div>

        </>
    );
}