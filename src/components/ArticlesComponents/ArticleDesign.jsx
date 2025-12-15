import React from 'react';

const ArticleDesign = ({ data }) => {
    return (
        <div className="single-case-screen2 white-background section is_view nullpaddb target_section" id="design">
			<div className="wrap view hidden-block">
				<div className="flex-row ordinary-text">
					<div className="w40 view textslide">
							<div className="section-subheading view textslide">{data.SectionTitle || "Design stages"}</div>
						<div className="btn-with-arrow-wrap pc-visible">
							<a href="#contact-form" className="circle-btn lime toform"><span><svg width="11" height="11"
										viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd"
											d="M5.5 0L11 5.5L5.5 11L4.67022 10.1702L8.7537 6H0V5H8.7537L4.67022 0.829781L5.5 0Z"
											fill="#1F2122"></path>
									</svg>
									Get an estimate</span></a>
						</div>
					</div>
					<div className="w60 view textslide">
						<h3 className="section-title mw630">
							{data.MainTitle || "Design"}</h3>
						<div className="simple-text mw630">
							<p>{data.MainDescription || "Turn the analysis results into a user-friendly interface that follows good usability rules, solves users' needs, and makes their journey as smooth as possible."}</p>
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
					<div className="btn-with-arrow-wrap mob-visible">
						<a href="#contact-form" className="circle-btn lime toform"><span><svg width="11" height="11"
									viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" clipRule="evenodd"
										d="M5.5 0L11 5.5L5.5 11L4.67022 10.1702L8.7537 6H0V5H8.7537L4.67022 0.829781L5.5 0Z"
										fill="#1F2122"></path>
								</svg>
								Get an estimate</span></a>
					</div>
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
									{stageData.details && <p>{stageData.details}</p>}
								</div>
							</div>
						</div>

						{stageData.imageSplitter && (
							<div className="case-image view fadein full_image_template">
								<div className="image-spliter">
									<div className="mover"></div>
									<div className="img-left">
										<picture>
											<source media="(min-width: 1600px)" srcSet={stageData.imageSplitter.leftImage.src}/>
											<source media="(max-width: 1100px)" srcSet={stageData.imageSplitter.leftImage.src}/>
											<source media="(min-width: 1101px) and (max-width:1599px)" srcSet={stageData.imageSplitter.leftImage.src2x}/>
											<img width={stageData.imageSplitter.leftImage.width}
												height={stageData.imageSplitter.leftImage.height} className="img-left" loading="lazy"
												src={stageData.imageSplitter.leftImage.src2x}
												alt={stageData.imageSplitter.leftImage.alt}/>
										</picture>
									</div>
									<div className="img-right">
										<picture>
											<source media="(min-width: 1600px)" srcSet={stageData.imageSplitter.rightImage.src}/>
											<source media="(max-width: 1100px)" srcSet={stageData.imageSplitter.rightImage.src}/>
											<source media="(min-width: 1101px) and (max-width:1599px)" srcSet={stageData.imageSplitter.rightImage.src2x}/>
											<img width={stageData.imageSplitter.rightImage.width}
												height={stageData.imageSplitter.rightImage.height} className="img-right" loading="lazy"
												src={stageData.imageSplitter.rightImage.src2x}
												alt={stageData.imageSplitter.rightImage.alt}/>
										</picture>
									</div>
								</div>
								<style>
									{`
										.image-spliter .mover {
											transform: translateX(-50%);
										}
									`}
								</style>
								<script
									dangerouslySetInnerHTML={{
										__html: `
											(function () {
												var mover = document.querySelector('.mover');
												var splitter = document.querySelector('.image-spliter');
												var imgleft = document.querySelector('.img-left');

												if (!mover || !splitter || !imgleft) {
													return;
												}

												function resetMover() {
													var width = imgleft.getBoundingClientRect().width;
													mover.style.left = '50%';
													imgleft.style.clip = "rect(0px, " + (width / 2) + "px, " + 10000 + "px, 0px)";
												}

												document.addEventListener("DOMContentLoaded", resetMover);

												splitter.addEventListener("mousemove", function (e) {
													var x = e.offsetX;
													mover.style.left = x + 'px';
													imgleft.style.clip = "rect(0px, " + (parseInt(x)) + "px, " + 10000 + "px, 0px)";
												});
												splitter.addEventListener("touchmove", function (e) {
													var x = e.touches[0].clientX;
													mover.style.left = x + 'px';
													imgleft.style.clip = "rect(0px, " + (parseInt(x)) + "px, " + 10000 + "px, 0px)";
												});
												splitter.addEventListener("mouseleave", function (e) {
													resetMover();
												});
												splitter.addEventListener("touchend", function (e) {
													resetMover();
												});

												window.addEventListener("resize", function (f) {
													resetMover();
												});
											})();
										`
									}}
								/>
							</div>
						)}

						{stageData.gallery && (
							<div className="flex-row gallery">
								{stageData.gallery.map((image, galleryIndex) => (
									<picture key={galleryIndex}>
										<source media="(min-width: 1600px)" srcSet={image.src}/>
										<source media="(max-width: 1100px)" srcSet={image.src}/>
										<source media="(min-width: 1101px) and (max-width:1599px)" srcSet={image.src2x}/>
										<img width={image.width} height={image.height} className="view fadein" loading="lazy"
											src={image.src2x} alt={image.alt}/>
									</picture>
								))}
							</div>
						)}

						{stageData.finalImage && (
							<div className="case-image view fadein full_image_template">
								<picture>
									<source media="(min-width: 1600px)" srcSet={stageData.finalImage.src}/>
									<source media="(max-width: 1100px)" srcSet={stageData.finalImage.src}/>
									<source media="(min-width: 1101px) and (max-width:1599px)" srcSet={stageData.finalImage.src2x}/>
									<img width={stageData.finalImage.width} height={stageData.finalImage.height} className="" loading="lazy"
										src={stageData.finalImage.src2x} alt={stageData.finalImage.alt}/>
								</picture>
							</div>
						)}
					</React.Fragment>
				))}

			</div>
		</div>
    );
};

export default ArticleDesign;