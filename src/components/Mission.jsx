"use client";
import React from "react";
import { useLang } from '@/context/LangContext';
import { getComponentData } from '@/lib/dataManager';

const AboutUsCard = ({id, title, text}) => (
        <div className="card"> <span>{id}</span>
						<div className="title" dangerouslySetInnerHTML={{ __html: title }}></div>
						<div className="txt">
							<p dangerouslySetInnerHTML={{ __html: text }}></p>
						</div>
					</div>
);

const Mission = () => {
	  const { lang } = useLang();
	  const data = getComponentData('Mission', lang);
	  const AboutUsCards  = data.cards;
	  
	return(
    	<div className="web_design_screen4 is_view white-background section">
			<div className="wrap view fadein">
				<div className="section-heading decorable">
					<div className="pc-visible" dangerouslySetInnerHTML={{ __html: data.title }}>
					</div>
					<div className="mob-visible" dangerouslySetInnerHTML={{ __html: data.title }}>
					</div>
				</div>
				<div className="about-us-alt-cards">
                {AboutUsCards.map((card, idx)=> (
                        <AboutUsCard key={card.id ?? idx} {...card} />
                    ))}

					{/*<div className="card"> <span>01</span>
						<div className="title"> Passion et <br/>personnalité </div>
						<div className="txt">
							<p>Notre équipe est composée de personnes passionnées et intelligentes. </p>
						</div>
					</div>
					<div className="card"> <span>02</span>
						<div className="title"> Mesurez deux fois, <br/>codez une fois </div>
						<div className="txt">
							<p>Notre dévouement et notre souci du détail nous permettent de fournir des produits et
								services de haute qualité.</p>
						</div>
					</div>
					<div className="card"> <span>03</span>
						<div className="title"> Non conventionnel — <br/>et très efficace </div>
						<div className="txt">
							<p>Nous considérons nos clients comme des partenaires et travaillons à leurs côtés pour
								réaliser de grandes choses.
								ensemble. </p>
						</div>
					</div>
					<div className="card"> <span>04</span>
						<div className="title"> Un nouveau design, des processus métiers intelligents </div>
						<div className="txt">
							<p>Nous adoptons une approche flexible et libr/e d'esprit pour chaque tâche, ce qui nous
								permet de livrer
								d'excellentes solutions pour nos clients.</p>
						</div>
					</div>*/}
				</div>
			</div>
		</div>
	);
};
export default Mission;
