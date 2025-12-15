import React from 'react';

const ArticleResult = ({ data }) => {
    return (
        <>
            <div className="single-case-screen2 black-background section is_view target_section" id="result">
			<div className="wrap view hidden-block">
				<div className="flex-row quote-wrap">
					<div className="w40 relative">
						<div className="section-subheading">{data.SectionTitle || "Conclusion"}</div>
						<div className="btn-with-arrow-wrap pc-visible">
							<a href="#contact-form" className="circle-btn lime toform"><span><svg width="11" height="11"
										viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd"
											d="M5.5 0L11 5.5L5.5 11L4.67022 10.1702L8.7537 6H0V5H8.7537L4.67022 0.829781L5.5 0Z"
											fill="#1F2122"></path>
									</svg>
									{data.Button?.text || "Get an estimate"}</span></a>
						</div>
					</div>
					<div className="w60">
						<div className="mw630">
							<div className="section-title">
								{data.MainTitle || "Results"}</div>
							<div className="simple-text">
								<p>{data.Description || "The team created a thoughtful, straightforward design that helped client make a name for itself in crypto & NFT market."}</p>
								<ul>
									{data.Achievements && data.Achievements.map((achievement, index) => (
										<li key={index}>{achievement}</li>
									))}
								</ul>
								<p>{data.Conclusion || "We are very grateful to JoCreate for their confidence in our services, and our team is happy to be an important part of such an ambitious product!"}</p>
							</div>
						</div>
						<div className="awards-details">
							{data.Statistics && data.Statistics.map((stat, index) => (
							<div className={`row ${stat.width} ${stat.style}`} key={index}>
								<div className="h">{stat.value}</div>
								<p className="p">{stat.description}</p>
							</div>
						))}
						</div>
					</div>
					<div className="btn-with-arrow-wrap mob-visible">
						<a href={data.Button?.href || "#contact-form"} className="circle-btn lime toform"><span><svg width="11" height="11"
								viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd"
									d="M5.5 0L11 5.5L5.5 11L4.67022 10.1702L8.7537 6H0V5H8.7537L4.67022 0.829781L5.5 0Z"
									fill="#1F2122"></path>
							</svg>
							{data.Button?.text || "Get an estimate"}</span></a>
                        </div>
					</div>
			</div>
		</div>
        </>
    );
};

export default ArticleResult;