import React from 'react';

const ArticleHero = () => {
    return (
        <>
	        
                    <h1 className="view text-left">JoCreate &#8211; Application for creating NFT collections</h1>
                    <div className="tags-wrap view textslide text-left">
                        <a href="../projects4230.html?cat=crypto-nft" className="tag">Crypto &amp; NFT</a>
                        <a href="../projectsb62f.html?tag=web-app" className="tag">Web app</a>
                        <a href="../projectsb43a.html?tag=website" className="tag">Website</a>
                        <a href="../projects69b3.html?tag=mobile-app" className="tag">Mobile app</a>
                    </div>
                    <div className="case-image view fadein delay0-5">
                        <picture>
                            <source media="(min-width: 1600px)" srcSet="https://phenomenonstudio.com/wp-content/uploads/2023/02/0-scaled.jpg"/>
                            <source media="(max-width: 1100px)" srcSet="https://phenomenonstudio.com/wp-content/uploads/2023/02/Cover-mobile.jpg"/>
                            <source media="(min-width: 1101px) and (max-width:1599px)" srcSet="https://phenomenonstudio.com/wp-content/uploads/2023/02/0@2x-scaled.jpg"/>
                            <img width="1300" height="630" className="" loading="lazy" src="../wp-content/uploads/2023/02/0%402x-scaled.jpg"  alt="JoCreate &#8211; Application for creating NFT collections - Website Development - Photo 1"/>
                        </picture>		
                    </div>
        </>
    );
};

export default ArticleHero;