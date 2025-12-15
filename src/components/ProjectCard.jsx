import React from "react";
import { useLang } from '@/context/LangContext';
/**
 * Composant de carte de projet
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.project - L'objet contenant les données du projet
 * @param {string} props.project.url - URL de la page du projet
 * @param {string} props.project.title - Titre du projet
 * @param {Object} props.project.images - Objet contenant les URLs des images responsives
 * @param {string} props.project.images.x1 - URL de l'image pour écrans jusqu'à 1100px de large
 * @param {string} props.project.images.x2 - URL de l'image pour écrans entre 1101px et 1599px
 * @param {string} [props.project.images.x3] - URL de l'image pour écrans de 1600px et plus (optionnel)
 * @param {Array<{name: string, url: string}>} [props.project.tags] - Tableau des tags du projet (optionnel)
 * @param {string} [props.project.description] - Description du projet (optionnel)
 * @example
 * <ProjectCard 
 *   project={{
 *     url: "/projects/mon-projet",
 *     title: "Mon Projet",
 *     images: {
 *       x1: "/images/projet-1x.jpg",
 *       x2: "/images/projet-2x.jpg",
 *       x3: "/images/projet-3x.jpg"
 *     },
 *     tags: [
 *       { name: "Web", url: "/categorie/web" },
 *       { name: "Mobile", url: "/categorie/mobile" }
 *     ],
 *     description: "Description du projet..."
 *   }} 
 * />
 */
const ProjectCard = ({ project }) => (
<div className="case view textslide delay0">
    <a href={project.url} className="img-wrap view">
        <picture style={{height: "100%"}}>
            {project.images.x3 && <source media="(min-width: 1600px)" srcSet={project.images.x3} />}
            {project.images.x1 && <source media="(max-width: 1100px)" srcSet={project.images.x1} />}
            {project.images.x2 && <source media="(min-width: 1101px) and (max-width:1599px)" srcSet={project.images.x2} />}
            <img 
                style={{height: "100%"}}
                width="630" 
                height="804" 
                className="" 
                loading="lazy" 
                src={project.images.x2 || project.images.x1}  
                alt={`${project.title} - Website Development - Photo`}
            />
        </picture>                
    </a>

    <div className="name-wrap">
        <a href={project.url} className="name">{project.title}</a>
        <a href={project.url} className="main-btn arrow">
            <span>
                <svg fill="none" height="10" viewBox="0 0 9 10" width="9" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="m.455752.5h8.544248v8.54425h-1.28906v-6.34368l-6.799434 6.79943-.911506-.91151 6.79943-6.79943h-6.343678z" fill="#fffefd" fillRule="evenodd"/>
                </svg>
                {useLang().lang === 'fr' ? 'Voir le projet' : 'See case'}
            </span>
        </a>
    </div>
    {project.tags && project.tags.length > 0 && (
        <div className="tags-wrap">
            {project.tags.map((tag, index) => (
                <a key={index} className="tag" href={tag.url || '#'}>{tag.name}</a>
            ))}
        </div>
    )}
    {project.description && <p>{project.description}</p>}
</div>  
                            );

export default ProjectCard;