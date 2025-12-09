import React from "react";
import { getComponentData } from '@/lib/dataManager';
import { useLang } from '@/context/LangContext';

const Hero = () => {
  const { lang } = useLang();
  const data = getComponentData('Hero', lang);

  if (!data || !data.imageSrcSet) {
    // Render a loader or null until data is available
    return null; 
  }

  return (
  <>
  <video className="vns" style={{width: 0, height: 0, position: "absolute", left: "-1px", visibility: "visible !important"}}
		preload="none" id="main-video2" src={data.videoSrc} controls="">
  </video>
  	<div className="screen1 black-background section" id="main-screen-load">
		<div className="wrap view hidden-block hidd_block">
			<div style={{display: "none",}}>
				<h1>{data.subTitle}</h1>
			</div>
			<h2 className="view h1" dangerouslySetInnerHTML={{ __html: data.title }}></h2>
			<picture>
				<source media="(min-width: 1600px)" srcSet={data.imageSrcSet.large}/>
				<source media="(max-width: 1100px)" srcSet={data.imageSrcSet.small}/>
				<source media="(min-width: 1101px) and (max-width:1599px)" srcSet={data.imageSrcSet.medium}/>
			</picture>
			<div className="fixed-background">
				<div className="video-wrap">
					<video width="1300" height="730" src={data.videoSrc}
						className="view-video view fadein delay0-7" id="main-video" muted loop autoPlay
						playsInline/>
				</div>

				{/*<button className="circle-btn play_video black">
					<span>
						<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd"
								d="M5.5 0L11 5.5L5.5 11L4.67022 10.1702L8.7537 6H0V5H8.7537L4.67022 0.829781L5.5 0Z"
								fill="#1F2122" />
						</svg>
						Embarquez-vous dans notre univers
					</span>
				</button>*/}
			</div>
		</div>
	</div>
	</>
  

);
}

export default Hero;