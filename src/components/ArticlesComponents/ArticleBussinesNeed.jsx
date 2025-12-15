import React from 'react';

const ArticleBussinesNeed = ({ data }) => {
    console.log('ArticleBussinesNeed - received data:', data);
    
    return (
        <>
            <div id="BussnessNeed" className="single-case-screen2 gray-background section is_view nullpaddb">
                <div className="wrap view hidden-block">
                    <div className="flex-row ordinary-text">
                        <div className="w40 view textslide">
                            <div className="section-subheading view textslide">
                                {data.SectionTitle || "Business need"}
                            </div>
                            <div className="btn-with-arrow-wrap pc-visible">
                                <a href={data.ctaLink || "#contact-form"} className="circle-btn lime toform">
                                    <span>
                                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.5 0L11 5.5L5.5 11L4.67022 10.1702L8.7537 6H0V5H8.7537L4.67022 0.829781L5.5 0Z" fill="#1F2122"></path>
                                        </svg>
                                        {data.ctaText || "Get an estimate"}
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="w60 view textslide">
                            <h3 className="section-title mw630">
                                {data.clientRequestTitle || "Client request"}
                            </h3>
                            <div className="simple-text mw630">
                                <p>
                                    {data.clientRequestDescription || "Client request description"}
                                </p>
                                <h6>{data.ourRoleTitle || "Our role"}</h6>
                                <p>
                                    {data.ourRoleDescription || "Our role description"}
                                </p>
                            </div>
                        </div>
                        <div className="btn-with-arrow-wrap mob-visible">
                            <a href={data.ctaLink || "#contact-form"} className="circle-btn lime toform">
                                <span>
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.5 0L11 5.5L5.5 11L4.67022 10.1702L8.7537 6H0V5H8.7537L4.67022 0.829781L5.5 0Z" fill="#1F2122"></path>
                                    </svg>
                                    {data.ctaText || "Get an estimate"}
                                </span>
                            </a>
                        </div>
                    </div>
                    
                    {data.gallery && data.gallery.length > 0 && (
                        <div className="flex-row gallery">
                            {data.gallery.map((image, index) => (
                                <picture key={index}>
                                    <source media="(min-width: 1600px)" srcSet={image.src}/>
                                    <source media="(max-width: 1100px)" srcSet={image.src}/>
                                    <source media="(min-width: 1101px) and (max-width:1599px)" srcSet={image.src2x || image.src}/>
                                    <img 
                                        width={image.width || 630} 
                                        height={image.height || 650} 
                                        className="view fadein" 
                                        loading="lazy" 
                                        src={image.src2x || image.src} 
                                        alt={image.alt || "Gallery image"}
                                    />
                                </picture>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ArticleBussinesNeed;