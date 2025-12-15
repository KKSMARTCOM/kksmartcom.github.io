import React from 'react';

const ArticleOverview = ({ data }) => {
    console.log('ArticleOverview - received data:', data);
    
    return (
        <>
            <div id="overview" className="target_section">
                <div className="flex-row paddt80">
                    <div className="w40 view textslide">
                        <div className="section-subheading view textslide">{data.SectionTitle}</div>
                    </div>
                    <div className="w60">
                        {data.title && (
                            <h2 className="section-heading mw630" style={{}}>
                                {data.title}
                            </h2>
                        )}
                        {data.description && (
                            <div className="view textslide p mw630">
                                <p>{data.description}</p>
                            </div>
                        )}
                        <div className="flex-way view textslide">
                            {data.client && (
                                <div className="w33">
                                    <b>Client</b>
                                    <p>{data.client.name}</p>
                                    <p>{data.client.location}</p>
                                </div>
                            )}
                            {data.services && data.services.length > 0 && (
                                <div className="w33">
                                    <b>Services</b>
                                    <ul>
                                        {data.services.map((service, index) => (
                                            <li key={index}>{service}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {data.gallery && data.gallery.length > 0 && (
                <div className="single-case-screen2 white-background section is_view">
                    <div className="wrap view hidden-block">
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
                    </div>
                </div>
            )}
        </>
    );
};

export default ArticleOverview;