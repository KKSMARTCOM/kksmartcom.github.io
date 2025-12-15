import React from "react";  

const ArticleHeader = ({ activeSection }) => {
    const sectionLinks = {
        'ArticleHero': { href: '#main-screen-load', text: '▲' },
        'ArticleOverview': { href: '#overview', text: 'Overview' },
        'ArticleBussinesNeed': { href: '#BussnessNeed', text: 'Business Need' },
        'ArticleProblem': { href: '#problem', text: 'Problem' },
        'ArticleResearch': { href: '#research', text: 'Research' },
        'ArticleDesign': { href: '#design', text: 'Design' },
        'ArticleProject': { href: '#Project', text: 'Project' },
        'ArticleFunctional': { href: '#Functional', text: 'Functional' },
        'ArticleResult': { href: '#result', text: 'Result' }
    };

    return (
        <div className="case-nav-menu">
		<ul className="white-background case-nav-list-items">
			{activeSection && activeSection.map(section => {
				const link = sectionLinks[section];
				return link ? <li key={section}><a href={link.href}>{link.text}</a></li> : null;
			})}
		</ul>
	</div>
    );
};

export default ArticleHeader;