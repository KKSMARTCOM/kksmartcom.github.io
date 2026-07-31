'use client';

import './articlespages.css';

import React, { Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import ArticleHero from "@/components/ArticlesComponents/ArticleHero";
import ArticleProblem from "@/components/ArticlesComponents/ArticleProblem";
import ArticleDesign from "@/components/ArticlesComponents/ArticleDesign";
import ArticleResearch from "@/components/ArticlesComponents/ArticleResearch";
import ArticleResult from "@/components/ArticlesComponents/ArticleResult";
import ArticleHeader from "@/components/ArticlesComponents/ArticleHeader";
import ArticleOverview from "@/components/ArticlesComponents/ArticleOverview";
import ArticleBussinesNeed from "@/components/ArticlesComponents/ArticleBussinesNeed";
import ArticleProject from "@/components/ArticlesComponents/ArticleProject";
import ArticleFunctional from "@/components/ArticlesComponents/ArticleFunctional"
import ArticleMoreCase from "@/components/ArticlesComponents/ArticleMoreCase"
import ContactSection from '@/components/ContactSection';
import { useLang } from '@/context/LangContext';
import { getArticleById } from '@/lib/dataManager';
import Script from "next/script";

function ArticlesPageContent() {
    const { lang } = useLang();
    const searchParams = useSearchParams();
    const articleId = searchParams.get('id');
    
    console.log('ArticlesPage - articleId:', articleId);
    console.log('ArticlesPage - lang:', lang);
    
    // RÃ©cupÃ©rer les donnÃ©es de l'article
    const articleData = getArticleById(articleId, lang);
    
    console.log('ArticlesPage - articleData:', articleData);
    console.log('ArticlesPage - activeSection:', articleData.activeSection);
    
    // VÃ©rifier si une section est active
    const isSectionActive = (sectionName) => {
        const isActive = articleData.activeSection && articleData.activeSection.includes(sectionName);
        console.log(`isSectionActive(${sectionName}):`, isActive);
        return isActive;
    };
    
    // Mapper les composants avec leurs noms de section
    const sectionComponents = {
        'ArticleHero': <ArticleHero data={articleData.Hero ||  {}} />,
        'ArticleOverview': <ArticleOverview data={articleData.overview || {}} />,
        'ArticleBussinesNeed': <ArticleBussinesNeed data={articleData.businessNeed || {}} />,
        'ArticleProblem': <ArticleProblem data={articleData.problem || {}} />,
        'ArticleResearch': <ArticleResearch data={articleData.research || {}} />,
        'ArticleDesign': <ArticleDesign data={articleData.design || {}} />,
        'ArticleProject': <ArticleProject data={articleData.project || {}} />,
        'ArticleFunctional': <ArticleFunctional data={articleData.functional || {}} />,
        'ArticleResult': <ArticleResult data={articleData.result || {}} />,
    };

    return (
        <>  
		<Script src="/js/footer-scripts-fixed.js" strategy="afterInteractive" />
            <link rel="stylesheet" href="/css/case-new.css" />
            <div className="single-case-content-wrap">
                {/* ArticleHeader toujours affichÃ© */}
                <ArticleHeader activeSection={articleData.activeSection || []} />
                
                <div className="single-screen single-screen1 section white-background" id="main-screen-load">
                    <div className="wrap view hidden-block">
                        {/* Sections dans le wrapper principal */}
                        {isSectionActive('ArticleHero') && sectionComponents.ArticleHero}
                        {isSectionActive('ArticleOverview') && sectionComponents.ArticleOverview}                 
                    </div>
                </div>
                
                {/* Sections hors du wrapper principal */}
                {isSectionActive('ArticleBussinesNeed') && sectionComponents.ArticleBussinesNeed}
                {isSectionActive('ArticleProblem') && sectionComponents.ArticleProblem}
                {isSectionActive('ArticleResearch') && sectionComponents.ArticleResearch}
                {isSectionActive('ArticleDesign') && sectionComponents.ArticleDesign}
                {isSectionActive('ArticleProject') && sectionComponents.ArticleProject}
                {isSectionActive('ArticleFunctional') && sectionComponents.ArticleFunctional}
                {isSectionActive('ArticleResult') && sectionComponents.ArticleResult}
                <ArticleMoreCase data={articleData.cards.tags || {}} />
            </div> 

            <ContactSection />
			
			
        </>
    );
}

export default function ArticlesPage() {
  return (
    <Suspense fallback={null}>
      <ArticlesPageContent />
    </Suspense>
  );
}

