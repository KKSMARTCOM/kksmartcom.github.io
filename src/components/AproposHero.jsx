"use client";

import React from "react";
import { useLang } from '@/context/LangContext';
import { getComponentData } from '@/lib/dataManager';

const AproposHero = () => {

	const { lang } = useLang();
    const data = getComponentData('AproposHero', lang);


	  return (
    	<div id="main-screen-load" className="new_footer_wrap">
		<div className="black-background about_alt_screen1 section">
			<div className="wrap">
				<div className="flex-container">
					<div className="left">
						<div className="section-heading decorable textslide">
							<h1>
								<div className="pc-visible" dangerouslySetInnerHTML={{ __html: data?.title?.desktop }}></div>
								<div className="mob-visible" style={{fontSize: 36}} dangerouslySetInnerHTML={{ __html: data?.title?.mobile || '' }} />
							</h1>
						</div>
						<div className="bottom view textslide">
							<div className="txt">
								<p dangerouslySetInnerHTML={{ __html: data?.description || '' }} />
							</div>
						</div>
					</div> 
					<img src={data?.image || ''} className="view textslide" alt="" style={{borderRadius: 10}}/>
				</div>
			</div>
		</div>
		</div>
	  );
};
export default AproposHero;