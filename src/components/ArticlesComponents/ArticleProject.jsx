import React from 'react';

const ArticleProject = ({ data }) => {
    return (
        <>
           <div id="Project" className="single-case-screen2 gray-background section is_view nullpaddb">
			<div className="wrap view hidden-block">

				<div className="flex-row view fadein">
					<div className="w50">
						<div className="section-subheading">{data.SectionTitle || "Project"}</div>
						<div className="section-title">
							{data.MainTitle || "Features we implemented"}</div>
					</div>
					<div className="w50">

					</div>
				</div>
				<div className="stages-slider-wrap view fadein">
					<div className="slider-counter"></div>
					<div className="stages-slider owl-carousel owl-theme">
						{data.Features && data.Features.map((feature, index) => (
							<div className="slide" key={index}>
								<div className="left-side">
									<div className="section-title small">
										{feature.title}</div>
									<div className="simple-text">
										<p>{feature.description}</p>
									</div>
								</div>
								<div className="right-side">
									<picture>
										{/*<source media="(min-width: 1600px)"
											srcSet={feature.image.src}/>
										<source media="(max-width: 1100px)"
											srcSet={feature.image.src}/>
										<source media="(min-width: 1101px) and (max-width:1599px)"
											srcSet={feature.image.src2x}/>*/}
										<img width={feature.image.width} height={feature.image.height} className="" loading="lazy"
											src={feature.image.src}
											alt={feature.image.alt}/>
									</picture>
								</div>
							</div>
						))}
					</div>
				</div>

			</div>
		</div>
    </>
    );
};

export default ArticleProject;