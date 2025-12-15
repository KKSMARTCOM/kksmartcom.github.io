import React from "react";
import ProjectCard from "@/components/ProjectCard";
import { useLang } from '@/context/LangContext';

export default function ArticleMoreCase({ data }) {
    const { lang } = useLang();
    
    const projectsData = {
        fr: {
            title: "Nos cas",
            subtitle: "Plus de cas",
            description: "Nous travaillons aussi bien avec des petites startups qu'avec de grandes entreprises.",
            allCasesText: "Tous les cas",
            projects: [
                {
                    url: "/projects/pnswap-token-exchange-platform",
                    title: "PNSwap – plateforme d'échange de tokens",
                    images: {
                        x1: "/assets/uploads/2023/02/Cover-all-cases.jpg",
                        x2: "/assets/uploads/2023/02/Cover-all-cases@2x.jpg", 
                        x3: "/assets/uploads/2023/02/Cover-all-cases@3x.jpg"
                    },
                    tags: [
                        { name: "Crypto & NFT", url: "/projects?cat=crypto-nft" },
                        { name: "Web app", url: "/projects?tag=web-app" }
                    ],
                    description: "Une plateforme unique pour échanger, acheter et vendre des tokens."
                },
                {
                    url: "/projects/punk-panda-swap-stake-farm-platform",
                    title: "Punk Panda – plateforme Swap, Stake et Farming",
                    images: {
                        x1: "/assets/uploads/2022/12/Desktop1.5.jpg",
                        x2: "/assets/uploads/2022/12/Desktop@2x.jpg",
                        x3: "/assets/uploads/2022/12/Desktop@3x.jpg"
                    },
                    tags: [
                        { name: "Crypto & NFT", url: "/projects?cat=crypto-nft" },
                        { name: "Web app", url: "/projects?tag=web-app" }
                    ],
                    description: "Cette application permet le Swap et Stake PPM et le Farm PPM Token pour les tokens PPM-BNB LP alimentés par Pancake."
                }
            ]
        },
        en: {
            title: "Our cases",
            subtitle: "More cases",
            description: "We work with both small startups and large corporations.",
            allCasesText: "All cases",
            projects: [
                {
                    url: "/projects/pnswap-token-exchange-platform",
                    title: "PNSwap – token exchange platform",
                    images: {
                        x1: "/assets/uploads/2023/02/Cover-all-cases.jpg",
                        x2: "/assets/uploads/2023/02/Cover-all-cases@2x.jpg", 
                        x3: "/assets/uploads/2023/02/Cover-all-cases@3x.jpg"
                    },
                    tags: [
                        { name: "Crypto & NFT", url: "/projects?cat=crypto-nft" },
                        { name: "Web app", url: "/projects?tag=web-app" }
                    ],
                    description: "A unique platform to exchange, buy and sell tokens."
                },
                {
                    url: "/projects/punk-panda-swap-stake-farm-platform",
                    title: "Punk Panda – Swap, Stake, and Farming platform",
                    images: {
                        x1: "/assets/uploads/2022/12/Desktop1.5.jpg",
                        x2: "/assets/uploads/2022/12/Desktop@2x.jpg",
                        x3: "/assets/uploads/2022/12/Desktop@3x.jpg"
                    },
                    tags: [
                        { name: "Crypto & NFT", url: "/projects?cat=crypto-nft" },
                        { name: "Web app", url: "/projects?tag=web-app" }
                    ],
                    description: "This application allows Swap and Stake PPM and Farm PPM Token for PPM-BNB LP tokens powered by Pancake."
                }
            ]
        }
    };

    const currentData = projectsData[lang] || projectsData.fr;

    return (
        <>
        <div className="screen2 section white-background is_view cases-section">
			<div className="wrap view hidden-block">
				<div className="flex-row">
					<div className="w40 view textslide">
						<div className="section-subheading view textslide">
							{currentData.title}</div>
					</div>
					<div className="w60 view fadein">
						<div className="mw630">
							<div className="section-heading view">
								{currentData.subtitle}</div>
							<div className="view textslide p">{currentData.description}</div>
						</div>
					</div>
				</div>

				<div className="flex-cases">
					{currentData.projects.map((project, index) => (
						<ProjectCard key={index} project={project} />
					))}
				</div>
				<div className="text-center view textslide">
					<a href="/projects" className="circle-btn black"><span><svg width="11" height="11"
								viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" clipRule="evenodd"
									d="M5.5 0L11 5.5L5.5 11L4.67022 10.1702L8.7537 6H0V5H8.7537L4.67022 0.829781L5.5 0Z"
									fill="#1F2122" />
							</svg>
							{currentData.allCasesText}</span></a>
				</div>
			</div>
		</div>

        </>
    );
}