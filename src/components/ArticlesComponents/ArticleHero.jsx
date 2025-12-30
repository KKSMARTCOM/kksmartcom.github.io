import React from 'react';

const ArticleHero = ({ data }) => {
    console.log('ArticleHero - received data:', data);
    console.log('ArticleHero - data.title:', data.title);
    console.log('ArticleHero - data.tags:', data.tags);
    
    return (
        <>
            {/* Titre principal de l'article */}
            {data.title && (
                <h1 className="view text-left" dangerouslySetInnerHTML={{ __html: data.title }}></h1>
            )}
            
            {/* Tags/Catégories de l'article */}
            {data.tags && data.tags.length > 0 && (
                <div className="tags-wrap view textslide text-left">
                    {data.tags.map((tag, index) => (
                        <a key={index} href={tag.href || "#"} className="tag">{tag.label}</a>
                    ))}
                </div>
            )}
            
            {/* Image principale de l'article */}
            {data.image && (
                <div className="case-image view fadein delay0-5">
                    <picture>
                       {/* <source media="(min-width: 1600px)" srcSet={data.image}/>
                        <source media="(max-width: 1100px)" srcSet={data.image}/>
                        <source media="(min-width: 1101px) and (max-width:1599px)" srcSet={data.image}/>
                        */}
                        <img 
                            width="1300" 
                            height="630" 
                            className="" 
                            loading="lazy" 
                            src={data.image} 
                            alt={data.imageAlt || data.title || "Article hero image"}
                        />
                    </picture>		
                </div>
            )}
        </>
    );
};

export default ArticleHero;