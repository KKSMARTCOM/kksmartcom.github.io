import React from 'react';

const ArticleOverview = () => {
    return (
        <>
            <div id="overview" className="target_section">
                            <div className="flex-row paddt80">
                                <div className="w40 view textslide">
                                    <div className="section-subheading view textslide">Overview</div>
                                </div>
                                <div className="w60">
                                    <h2 className="section-heading mw630" style={{}}>
                                    A service that allows you to create NFT collections in a few clicks				
                                </h2>
                                <div className="view textslide p mw630">
                                    <p>The service allows you to model a set of elements and generate a collection of NFTs based on them. Its functionality is aimed at a young audience &#8211; this application&#8217;s backgrounds, filters, and visual effects are extremely relevant and modern. With this application, users can also sell their artwork: once it&#8217;s finished, it can be exported to the popular NFT marketplaces.</p>
                                </div>
                                <div className="flex-way view textslide">
                                    <div className="w33">
                                        <b>Client</b>
                                        <p>JoCreate LLC,</p>
                                        <p>San Francisco</p>
                                    </div>							
                                    <div className="w33">
                                        <b>Services</b>
                                        <ul>
                                            <li>Research</li>
                                            <li>Wireframing</li>
                                            <li>UI design</li>
                                            <li>Development</li>
                                        </ul>
                                    </div>							
                                </div>
                            </div>
                        </div>
            </div>
            <div className="single-case-screen2 white-background section is_view" >
	            <div className="wrap view hidden-block">
	                <div className="flex-row gallery">
                        <picture>
                            <source media="(min-width: 1600px)" srcSet="../assets/uploads/2023/02/Frame-1519.jpg"/>
                            <source media="(max-width: 1100px)" srcSet="../assets/uploads/2023/02/Frame-1519.jpg"/>
                            <source media="(min-width: 1101px) and (max-width:1599px)" srcSet="../assets/uploads/2023/02/Frame-1519%402x.jpg"/>
                            <img width="630" height="650" className="view fadein" loading="lazy" src="../assets/uploads/2023/02/Frame-1519%402x.jpg" alt="JoCreate &#8211; Application for creating NFT collections - Website Development - Photo 2"/>
                        </picture>									
                                        
                        <picture>
                            <source media="(min-width: 1600px)" srcSet="../assets/uploads/2023/02/Frame-1520.jpg"/>
                            <source media="(max-width: 1100px)" srcSet="../assets/uploads/2023/02/Frame-1520.jpg"/>
                            <source media="(min-width: 1101px) and (max-width:1599px)" srcSet="../assets/uploads/2023/02/Frame-1520%402x.jpg"/>
                            <img width="630" height="650" className="view fadein" loading="lazy" src="../assets/uploads/2023/02/Frame-1520%402x.jpg" alt="JoCreate &#8211; Application for creating NFT collections - Website Development - Photo 3"/>
                        </picture>									
				    </div>
			    </div>
		    </div>
        </>
    );
};

export default ArticleOverview;