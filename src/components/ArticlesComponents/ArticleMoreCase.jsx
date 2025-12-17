import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { useLang } from '@/context/LangContext';
import { filterProjects } from '@/lib/filters';

export default function ArticleMoreCase({ data: tags = [] }) {
    const { lang } = useLang();
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const projectsData = {
        fr: {
            title: "Nos cas",
            subtitle: "Plus de cas",
            description: "Nous travaillons aussi bien avec des petites startups qu'avec de grandes entreprises.",
            allCasesText: "Tous les cas",
            noProjects: "Aucun projet similaire trouvé.",
            loading: "Chargement des projets..."
        },
        en: {
            title: "Our cases",
            subtitle: "More cases",
            description: "We work with both small startups and large corporations.",
            allCasesText: "All cases",
            noProjects: "No similar projects found.",
            loading: "Loading projects..."
        }
    };

    const currentData = projectsData[lang] || projectsData.fr;

    useEffect(() => {
        const loadProjects = () => {
            setIsLoading(true);
            try {
                // Extraire les noms des tags
                const tagNames = Array.isArray(tags) ? tags.map(tag => tag.name) : [];
                console.log('loadProjects - Noms des tags extraits:', tagNames);
                
                // Récupérer les projets filtrés
                console.log('loadProjects - Appel à filterProjects avec:', { tagNames, lang, limit: 2 });
                const projects = filterProjects(tagNames, lang, 2);
                console.log('loadProjects - Projets filtrés reçus:', projects);
                
                setFilteredProjects(projects);
            } catch (error) {
                console.error("Erreur lors du chargement des projets :", error);
                setFilteredProjects([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadProjects();
    }, [tags, lang]);

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
                    {isLoading ? (
                        <div>{currentData.loading}</div>
                    ) : filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <ProjectCard key={`${project.id || index}`} project={project} />
                        ))
                    ) : (
                        <div>{currentData.noProjects}</div>
                    )}
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