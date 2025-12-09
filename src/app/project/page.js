'use client';

import { useSearchParams } from 'next/navigation';
import ProjectCard from '@/components/ProjectCard';
import ContactSection from '@/components/ContactSection';
import { filterProjects } from '@/lib/filters';
    
export default function Project() {
    const searchParams = useSearchParams();
    const tagParams = searchParams.get('tags');
    const activeTags = tagParams ? tagParams.split(',') : [];

    // Récupération des projets filtrés
    const filteredProjects = filterProjects(activeTags);



  return (
    <>
        <div className="screen2 case-screen1 white-background section" id="main-screen-load" style={{marginBottom:"65"}}>
            <div className="wrap view hidden-block">
                <div className="flex-row">
                    <div className="w100">
                        <h1 className="view b-block">
                            Explore our projects				
                        </h1>
                    </div>
                </div>
                <div id="load_wrap">
                    <div id="cases-inner">
                        <div className="flex-row" style={{marginTop: "0"}}>
                            <div className="w100">
                                <div className="tags-select-wrap mob-select-wrap">
                                    <span>Type: <b>All projects</b>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.5 6L6 11.5L11.5 6L10.6702 5.17022L6.5 9.2537L6.5 0.5L5.5 0.5L5.5 9.2537L1.32978 5.17022L0.5 6Z" fill="#1F2122"></path>
                                        </svg>
                                    </span>

                        
                                    <div className="tags-list">
                                        
                                    </div>
                                        
                                        
                                </div>
                                <div className="cats-select-wrap mob-select-wrap">
                                    <span>Industry: <b>All industries</b>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.5 6L6 11.5L11.5 6L10.6702 5.17022L6.5 9.2537L6.5 0.5L5.5 0.5L5.5 9.2537L1.32978 5.17022L0.5 6Z" fill="#1F2122"></path>
                                        </svg>
                                    </span>
                                    <div className="tags-list cats-list">
                                       
                                    </div>
                                </div>
                                    
                            </div>
                        </div>
                        <div className="flex-cases">
                            {filteredProjects.map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                        <div className="text-center view textslide">
                            <a href="projects869f.html?load=all" className="circle-btn black show_more_cases"><span>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0.5 6L6 11.5L11.5 6L10.6702 5.17022L6.5 9.2537L6.5 0.5L5.5 0.5L5.5 9.2537L1.32978 5.17022L0.5 6Z" fill="#1F2122"/>
                                </svg>
                                Voir plus
                            </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ContactSection />
    </>

        
  );
}