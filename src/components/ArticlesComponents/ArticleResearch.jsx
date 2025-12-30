import React from 'react';

const ArticleResearch = ({ data }) => {
	console.log('ArticleResearch - received data:', data);
	
    return (
        <div className="single-case-screen2 white-background section is_view target_section" id="research">
			<div className="wrap view hidden-block">
				<div className="flex-row ordinary-text">
					<div className="w40 view textslide">
						<div className="section-subheading view textslide">{data.SectionTitle || "Research stages"}</div>
					</div>
					<div className="w60 view textslide">
						<h3 className="section-title mw630">
							{data.MainTitle || "Research process"}</h3>
						<div className="simple-text mw630">
							<p>{data.MainDescription || "We analyzed the best competitors in the field of crypto & NFT using a SWOT analysis. We conducted a business analysis to find the best way to implement the features correctly and bring profit to the product."}</p>
							<div className="stages-wrap">
								<h6>Stages</h6>
								<ul>
									{data.Stages && data.Stages.map((stage, index) => (
										<li key={index}>{stage}</li>
									))}
								</ul>
							</div>

						</div>

					</div>
				</div>

				<div className="case-image view fadein full_image_template">
					<picture>
						{/*<source media="(min-width: 1600px)" srcSet={data.imagePrincipal.src}/>
						<source media="(max-width: 1100px)" srcSet={data.imagePrincipal.src}/>
						<source media="(min-width: 1101px) and (max-width:1599px)" srcSet={data.imagePrincipal.src2x}/>*/}
                            <img width={data.imagePrincipal.width} height={data.imagePrincipal.height}
							className="" loading="lazy" src={data.imagePrincipal.src}
							alt={data.imagePrincipal.alt}/>
					</picture>
				</div>

				{data.StagesData && data.StagesData.map((stageData, index) => (
					<React.Fragment key={index}>
						<div className="flex-row ordinary-text">
							<div className="w40 view textslide">
								<div className="section-subheading view textslide">{stageData.stageTitle}</div>
							</div>
							<div className="w60 view textslide">
								<div className="simple-text mw630">
									<h6>{stageData.title}</h6>
									<p>{stageData.description}</p>
									
									{stageData.analysisPoints && (
										<>
											<ul>
												{stageData.analysisPoints.map((point, pointIndex) => (
													<li key={pointIndex}>{point}</li>
												))}
											</ul>
										</>
									)}
									
									{stageData.whatWeDidTitle && (
										<h6><strong>{stageData.whatWeDidTitle}</strong></h6>
									)}
									
									{stageData.problems && (
										<>
											<p><span data-preserver-spaces="true">During the SWOT analysis, we found the following problems:</span></p>
											<ul>
												{stageData.problems.map((problem, problemIndex) => (
													<li key={problemIndex}><span data-preserver-spaces="true">{problem}</span></li>
												))}
											</ul>
										</>
									)}
									
									{stageData.solutions && (
										<p>
											<span data-preserver-spaces="true">{stageData.solutions}</span>
										</p>
									)}
									
									{stageData.achievements && (
										<>
											<p><span data-preserver-spaces="true">During the BA, we explained to the client the characteristics of the solutions we had collected and outlined their benefits and risks.</span></p>
											<ul>
												{stageData.achievements.map((achievement, achievementIndex) => (
													<li key={achievementIndex}><span data-preserver-spaces="true">{achievement}</span></li>
												))}
											</ul>
										</>
									)}
									
									{stageData.details && (
										<p>{stageData.details}</p>
									)}

								</div>
							</div>
						</div>

						{stageData.image && (
							<div className="case-image view fadein full_image_template">
								<picture>
									{/*<source media="(min-width: 1600px)" srcSet={stageData.image.src}/>
									<source media="(max-width: 1100px)" srcSet={stageData.image.src}/>
									<source media="(min-width: 1101px) and (max-width:1599px)" srcSet={stageData.image.src2x}/>*/}
									<img width={stageData.image.width} height={stageData.image.height}
										className="" loading="lazy" src={stageData.image.src}
										alt={stageData.image.alt}/>
								</picture>
							</div>
						)}
					</React.Fragment>
				))}

			</div>
		</div>
    );
};

export default ArticleResearch;