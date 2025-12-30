'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectCard from '@/components/ProjectCard';
import ContactSection from '@/components/ContactSection';
import { filterProjects } from '@/lib/filters';
import { useLang } from '@/context/LangContext';
import { getComponentData, getProjectTypes, getIndustries } from '@/lib/dataManager';

// Composant pour afficher un tag
function TagItem({ tag, isActive, className = '' }) {
    const tagClassName = `tag ${isActive ? '' : 'empty'} ${className}`;
    
    return (
        <a href={tag.href} className={tagClassName} data-hover={tag.label}>
            <span>{tag.label}</span>
        </a>
    );
}

// Composant pour afficher une liste de tags
function TagsList({ tags, activeItems, className = '', listClassName = '' }) {
    return (
        <div className={`tags-list2 ${listClassName}`}>
            {tags.map(tag => (
                <TagItem 
                    key={tag.id} 
                    tag={tag} 
                    isActive={activeItems.includes(tag.slug)}
                    className={className}
                />
            ))}
        </div>
    );
}
    
export default function Blog() {
    const [projectTypes, setProjectTypes] = useState([]);
    const [industries, setIndustries] = useState([]);

    useEffect(() => {
        // On crée une petite fonction interne pour gérer l'asynchrone
        const loadData = async () => {
        const types = await getProjectTypes();
        const inds = await getIndustries();
        
        setProjectTypes(types);
        setIndustries(inds);
        };

        loadData();
    }, []);

    console.log("donne project ",projectTypes )
    console.log("donne industries ",industries )
    const { lang } = useLang();
    const data = getComponentData('Blog',lang);
    const searchParams = useSearchParams();
    const tagParams = searchParams.get('tags');
    const catParams = searchParams.get('cat');
    
    const activeTags = tagParams ? tagParams.split(',') : [];
    const activeCategories = catParams ? catParams.split(',') : [];

    // Récupération des projets filtrés - prend en compte les tags ET les catégories, avec langue et limite
    const filteredProjects = filterProjects([...activeTags, ...activeCategories], lang, null);

  return (
    <>
        <div className="screen2 case-screen1 white-background section" id="main-screen-load" style={{marginBottom:"65"}}>
            <div className="wrap view hidden-block">
                <div className="flex-row">
                    <div className="w100">
                        <h1 className="view b-block" dangerouslySetInnerHTML={{ __html: data.title }}></h1>
                    </div>
                </div>
                <div id="load_wrap">
                    <div id="cases-inner">
                        <div className="flex-row" style={{marginTop: "0"}}>
                            <div className="w100">
                                <div className="tags-select-wrap mob-select-wrap">
                                    <span>{data.typeFilterLabel} <b>{data.typeFilterDefault}</b>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.5 6L6 11.5L11.5 6L10.6702 5.17022L6.5 9.2537L6.5 0.5L5.5 0.5L5.5 9.2537L1.32978 5.17022L0.5 6Z" fill="#1F2122"></path>
                                        </svg>
                                    </span>

                                    <TagsList 
                                        tags={projectTypes} 
                                        activeItems={activeTags.length > 0 ? activeTags : ['all']}
                                    />
                                </div>
                                <div className="cats-select-wrap mob-select-wrap">
                                    <span>{data.industryFilterLabel} <b>{data.industryFilterDefault}</b>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M0.5 6L6 11.5L11.5 6L10.6702 5.17022L6.5 9.2537L6.5 0.5L5.5 0.5L5.5 9.2537L1.32978 5.17022L0.5 6Z" fill="#1F2122"></path>
                                        </svg>
                                    </span>
                                    <TagsList 
                                        tags={industries} 
                                        activeItems={activeCategories.length > 0 ? activeCategories : ['all']}
                                        listClassName="cats-list"
                                    />
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
                                {data.seeMoreText}
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