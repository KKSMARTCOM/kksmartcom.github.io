import React from 'react';

const ArticleDesign = () => {
    return (
        <div className="single-case-screen2 white-background section is_view nullpaddb   target_section" id="design">
			<div className="wrap view hidden-block">

				<div className="flex-row ordinary-text">
					<div className="w40 view textslide">
						<div className="section-subheading view textslide">Design stages</div>
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
							Design </h3>
						<div className="simple-text mw630">
							<p>Turn the analysis results into a user-friendly interface that follows good usability
								rules, solves users&#8217; needs, and makes their journey as smooth as possible.</p>
							<div className="stages-wrap">
								<h6>Stages</h6>
								<ul>
									<li>Wireframe</li>
									<li>Moodboard</li>
									<li>Design Concept</li>
									<li>UI Design</li>
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

				<div className="flex-row ordinary-text">
					<div className="w40 view textslide">
						<div className="section-subheading view textslide">Stage 1</div>
					</div>
					<div className="w60 view textslide">
						<div className="simple-text mw630">
							<h6>Wireframes</h6>
							<p>We created wireframes and clickable prototypes as an integral part of working on the
								design structure, testing and improving the user journey before moving on to the final
								mockup design.</p>
							<p>This stage helped us understand the logic and structure of the future service. We created
								and approved prototypes for each flow, working out all possible states for each screen,
								deciding on the size and number of containers for illustrations, and checking the
								usability and clarity of each flow.</p>

						</div>

					</div>
				</div>

				<div className="case-image view fadein full_image_template">
					<div className="image-spliter">
						<div className="mover"></div>
						<div className="img-left">
							<picture>
								<source media="(min-width: 1600px)" srcSet="/assets/uploads/2023/02/UI-scaled.jpg"/>
								<source media="(max-width: 1100px)" srcSet="/assets/uploads/2023/02/UI-scaled.jpg"/>
								<source media="(min-width: 1101px) and (max-width:1599px)" srcSet="/assets/uploads/2023/02/UI%402x-scaled.jpg"/>
                                <img width="1300"
									height="630" className="img-left" loading="lazy"
									src="/assets/uploads/2023/02/UI%402x-scaled.jpg"
									alt="JoCreate &#8211; Application for creating NFT collections - Website Development - Photo 10"/>
							</picture>
						</div>
						<div className="img-right">
							<picture>
								<source media="(min-width: 1600px)" srcSet="/assets/uploads/2023/02/Wireframes-scaled.jpg"/>
								<source media="(max-width: 1100px)" srcSet="/assets/uploads/2023/02/Wireframes-scaled.jpg"/>
								<source media="(min-width: 1101px) and (max-width:1599px)" srcSet="/assets/uploads/2023/02/Wireframes%402x-scaled.jpg"/>
                                <img width="1300"
									height="630" className="img-right" loading="lazy"
									src="/assets/uploads/2023/02/Wireframes%402x-scaled.jpg"
									alt="JoCreate &#8211; Application for creating NFT collections - Website Development - Photo 11"/>
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



				<div className="flex-row ordinary-text">
					<div className="w40 view textslide">
						<div className="section-subheading view textslide">Stage 2</div>
					</div>
					<div className="w60 view textslide">
						<div className="simple-text mw630">
							<h6>Moodboard &amp; Design Concept</h6>
							<p>To determine the visual direction and style of the interface, our team created a mood
								board and coordinated it with the client. It allowed us to choose the most appropriate
								solution at the earliest stage.</p>
							<p>Based on the research and the direction chosen in the mood board, our team created the
								first visual concept of the site, which demonstrated the chosen style in real conditions
								before creating the finished UI design. The mood board helped us decide that the
								platform should be in light pastel colors, with an emphasis on typography and muted
								color accents, minimalist line icons, and illustrations.</p>

						</div>

					</div>
				</div>

				<div className="flex-row ordinary-text">
					<div className="w40 view textslide">
						<div className="section-subheading view textslide">Stage 3</div>
					</div>
					<div className="w60 view textslide">
						<div className="simple-text mw630">
							<h6>UI Design</h6>
							<p>The main color for the interface was chosen to be a pastel beige so that it doesn&#8217;t
								distract from important information and doesn&#8217;t overload the design, in addition
								to the bright N assets. We chose a specific color for each step in the process of
								creating a collection and uploading it to the marketplace, which is associated only with
								that step. The general style is in the form of cards, which resembles an NFT asset.</p>

						</div>

					</div>
				</div>
				<div className="flex-row gallery">

					<picture>
						<source media="(min-width: 1600px)" srcSet="/assets/uploads/2023/02/11.jpg"/>
						<source media="(max-width: 1100px)" srcSet="/assets/uploads/2023/02/11.jpg"/>
						<source media="(min-width: 1101px) and (max-width:1599px)" srcSet="/assets/uploads/2023/02/11@2x.jpg"/>
                        <img width="630"
							height="650" className="view fadein" loading="lazy"
							src="/assets/uploads/2023/02/11%402x.jpg"
							alt="JoCreate &#8211; Application for creating NFT collections - Website Development - Photo 12"/>
					</picture>

					<picture>
						<source media="(min-width: 1600px)" srcSet="/assets/uploads/2023/02/22.jpg"/>
						<source media="(max-width: 1100px)" srcSet="/assets/uploads/2023/02/22.jpg"/>
						<source media="(min-width: 1101px) and (max-width:1599px)" srcSet="/assets/uploads/2023/02/22@2x.jpg"/>
                        <img width="630"
							height="650" className="view fadein" loading="lazy"
							src="/assets/uploads/2023/02/22%402x.jpg"
							alt="JoCreate &#8211; Application for creating NFT collections - Website Development - Photo 13"/>
					</picture>
				</div>

				<div className="case-image view fadein full_image_template">
					<picture>
						<source media="(min-width: 1600px)"
							srcSet="/assets/uploads/2023/02/Images4-scaled.jpg"/>
						<source media="(max-width: 1100px)"
							srcSet="/assets/uploads/2023/02/Images4-scaled.jpg"/>
						<source media="(min-width: 1101px) and (max-width:1599px)"
							srcSet="/assets/uploads/2023/02/Images4@2x-scaled.jpg"/>
                            <img
							width="1300" height="630" className="" loading="lazy"
							src="/assets/uploads/2023/02/Images4%402x-scaled.jpg"
							alt="JoCreate &#8211; Application for creating NFT collections - Website Development - Photo 14"/>
					</picture>
				</div>

			</div>
		</div>
    );
};

export default ArticleDesign;