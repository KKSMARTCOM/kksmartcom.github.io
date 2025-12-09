"use client";

import React from "react";
import { useLang } from '@/context/LangContext';
import { getComponentData } from '@/lib/dataManager';
import "./WhoUs.css";

const WhoUs = () => {
	const { lang } = useLang();
  	const data = getComponentData('WhoUs', lang);

	return (
        <div className="wrap">
			<div className="text-image-wrap"> 
                <img className="" src={data.image} alt="" loading="lazy"/>
				<div className="right">
					<div className="section-heading"> Qui sommes-nous ?</div>
					<div className="txt simple-text">
						{data.description.map((paragraph, index) => (
              				<p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
			            ))}
                        <ul style={{listStyleType: "none"}}>
							<li style={{listStyleType: "none"}}><strong style={{color: "#4385f3", fontWeight: "bold"}}>{data.agencies[0].name}
									</strong>{data.agencies[0].description}
							</li>
							<li style={{listStyleType: "none"}}><strong style={{color: "#fe0162", fontWeight: "bold"}}>{data.agencies[1].name}
									</strong>{data.agencies[1].description}
							</li>
							<li style={{listStyleType: "none"}}><strong style={{color: "#fabb07", fontWeight: "bold"}}>{data.agencies[2].name}
									</strong>{data.agencies[2].description}
							</li>
                        </ul>
					</div>
				</div>
			</div>
			<div className="our-map">

				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.1639292867094!2d2.3553105746980005!3d6.372826593617385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10235798a3364b93%3A0x2e31cf5b35f72be8!2sKK%20SMART%20COM!5e0!3m2!1sfr!2sbj!4v1686445030526!5m2!1sfr!2sbj0"
                    height="500" width="2000" style={{border: "0", borderRadius: "10px", marginTop: "34px"}}
                    allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade">
				</iframe>
			</div>
		</div>
	);
};
export default WhoUs;
