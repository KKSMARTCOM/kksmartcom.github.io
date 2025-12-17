'use client';

import React from "react";
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

export default function ArticlesPage() {
    const { lang } = useLang();
    const searchParams = useSearchParams();
    const articleId = searchParams.get('id');
    
    console.log('ArticlesPage - articleId:', articleId);
    console.log('ArticlesPage - lang:', lang);
    
    // Récupérer les données de l'article
    const articleData = getArticleById(articleId, lang);
    
    console.log('ArticlesPage - articleData:', articleData);
    console.log('ArticlesPage - activeSection:', articleData.activeSection);
    
    // Vérifier si une section est active
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
                {/* ArticleHeader toujours affiché */}
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
            <style>{`
				body * {
					font-family: Syne;
					font-feature-settings: 'pnum' on, 'lnum' on;
				}

				.wrap {
					margin: 0 auto;
					width: 100%;
					max-width: 1330px;
					padding: 0 15px;
				}

				.black-background {
					background-image: url(../wp-content/themes/phenomenon/img/black-bg.png);
				}

				.white-background,
				.gray-background,
				.lime-background,
				.orange-background {
					background-image: url(https://phenomenonstudio.com/wp-content/themes/phenomenon/img/bg.png);
				}

				img {
					aspect-ratio: attr(width)/attr(height)
				}

				.bottom-divider {
					position: absolute;
					border-top: 2px solid #414243;
					height: calc(50% - 100px);
					bottom: 0;
					left: 0;
					z-index: 123123123;
					width: 100%;
					background: #1F2122;
					background-image: url(https://phenomenonstudio.com/wp-content/themes/phenomenon/img/black-bg.png);
					background-position: center;
					background-attachment: fixed;
					transition: 0.7s;
					transition-delay: 0.2s
				}

				.pace {
					display: none !important;
					position: absolute;
					top: -1px;
					left: -1px;
					width: 1px;
					height: 1px;
					z-index: -1
				}

				.page-preloader {
					height: 100vh;
					color: white;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					position: relative;
					z-index: 1000;
					font-size: 24px;
					font-weight: 700;
					background: #1F2122;
					background-image: url(https://phenomenonstudio.com/wp-content/themes/phenomenon/img/black-bg.png);
					background-position: center;
					overflow: hidden;
					position: fixed;
					top: 0;
					left: 0;
					width: 100%
				}

				.page-preloader.active {
					animation-name: loader;
					animation-iteration-count: 1;
					animation-duration: 0.5s;
					animation-timing-function: ease-in-out;
					animation-fill-mode: forwards;
					animation-delay: 0.5s
				}

				.page-preloader.active .bottom-divider {
					height: 100%
				}

				@keyframes loader {
					0% {
						height: 100vh
					}

					100% {
						height: 0;
						display: none
					}
				}

				.preloader-wrap span {
					font-size: 200px;
					margin-left: 20px;
					line-height: 100%
				}

				.preloader-wrap sup {
					display: inline-block;
					vertical-align: top;
					margin-left: 5px
				}

				.preloader-wrap sup img {
					width: 25px
				}

				.header {
					border-bottom: 1px solid transparent
				}

				@media (min-width: 1110px) {
					.header.mini {
						padding: 12px 0 !important;
						border-bottom: 1px solid #D9D9D9
					}
				}

				.view,
				.hidd_block {
					opacity: 0;
					visibility: hidden;
					-webkit-backface-visibility: hidden;
					backface-visibility: hidden
				}

				.logo svg {
					display: block
				}

				.viewed {
					-webkit-backface-visibility: hidden;
					backface-visibility: hidden;
					opacity: 1;
					visibility: visible
				}

				.view.textslide {
					visibility: hidden;
					-webkit-backface-visibility: hidden;
					backface-visibility: hidden;
					opacity: 0
				}

				.viewed.textslide {
					visibility: visible;
					-webkit-backface-visibility: hidden;
					backface-visibility: hidden;
					opacity: 0
				}

				.fadein {
					opacity: 0
				}

				.hidden-block.active {
					opacity: 1;
					-webkit-backface-visibility: hidden;
					backface-visibility: hidden
				}

				h1 i,
				.section-heading i,
				.one i,
				h2 i,
				h3 i,
				h4 i,
				.value .text i,
				.section-subheading:not(.notme) i {
					opacity: 0
				}

				.contacts-screen1 form .serv-wrap label input:checked+span::before {
					clip-path: circle(100% at 50% 50%)
				}

				.wls li {
					overflow: hidden
				}

				.wls li span.a-line {
					display: inline-block;
					overflow: hidden
				}

				.wls li span.a-line {
					overflow: hidden !important
				}

				.wls li span.a-line span {
					opacity: 1;
					transform: translate3d(0, 100%, 0);
					-webkit-transform: translate3d(0, 100%, 0);
					will-change: transform;
					display: block;
					line-height: 105%
				}

				h1.view:not(.done) span.a-line,
				.section-heading.view:not(.line-animation) span.a-line,
				h2.view span.a-line,
				h3.view span.a-line,
				.view.value .view.text span.a-line,
				.mobile-menu li a span.a-line {
					visibility: hidden;
					opacity: 0;
					-webkit-backface-visibility: hidden;
					margin: -1% 0 -1% -5px
				}

				h1.viewed:not(.done) span.a-line,
				.section-heading.viewed:not(.line-animation) span.a-line,
				h2.viewed span.a-line,
				h3.viewed span.a-line,
				.viewed.value .viewed.text span.a-line,
				.mobile-menu li a span.a-line {
					overflow: hidden !important;
					display: block;
					-webkit-backface-visibility: hidden;
					visibility: visible;
					opacity: 1;
					margin: -1% 0 -1% -5px
				}

				h1.viewed:not(.done) span.a-line span,
				.section-heading.viewed:not(.line-animation) span.a-line span,
				h2.viewed span.a-line span,
				h3.viewed span.a-line span,
				.viewed.value .viewed.text span.a-line span,
				.mobile-menu li a span.a-line span {
					transform: translateY(100%);
					display: block;
					line-height: 105%
				}

				h1.viewed:not(.done).active span.a-line span,
				.section-heading.viewed:not(.line-animation).active span.a-line span,
				h2.viewed.active span.a-line span,
				h3.viewed.active span.a-line span,
				.viewed.value .viewed.text.active span.a-line span,
				.mobile-menu li a.active span.a-line span {
					animation-name: texttotop;
					animation-duration: 0.8s;
					animation-iteration-count: 1;
					animation-fill-mode: forwards;
					animation-timing-function: ease
				}

				.one .a-line {
					overflow: hidden;
					-webkit-backface-visibility: hidden
				}

				.one .a-line .inn {
					transform: translateY(100%);
					display: block
				}

				.one.active .a-line .inn {
					animation-name: texttotop;
					animation-duration: 0.8s;
					animation-iteration-count: 1;
					animation-fill-mode: forwards;
					animation-timing-function: ease
				}

				.textslide.viewed {
					animation-name: textslide;
					animation-duration: 0.8s;
					animation-iteration-count: 1;
					animation-fill-mode: forwards;
					animation-timing-function: ease
				}

				.texttobottom.viewed {
					animation-name: textslidebottom;
					animation-duration: 0.8s;
					animation-iteration-count: 1;
					animation-fill-mode: forwards;
					animation-timing-function: ease
				}

				.delay0 {
					animation-delay: 0s !important
				}

				.delay0-2 {
					animation-delay: 0.2s !important
				}

				.delay0-5 {
					animation-delay: 0.5s !important
				}

				.delay0-7 {
					animation-delay: 0.7s !important
				}

				.delay1 {
					animation-delay: 1s !important
				}

				.delay1-2 {
					animation-delay: 1.2s !important
				}

				.delay1-5 {
					animation-delay: 1.5s !important
				}

				.delay1-7 {
					animation-delay: 1.7s !important
				}

				.delay2-2 {
					animation-delay: 2.2s !important
				}

				.viewed.fadein {
					animation-name: fadein;
					animation-duration: 1s;
					animation-iteration-count: 1;
					animation-fill-mode: forwards;
					animation-timing-function: ease;
					-webkit-backface-visibility: hidden
				}

				@keyframes texttotop {
					0% {
						opacity: 0;
						transform: translate3d(0, 100%, 0);
						-webkit-transform: translate3d(0, 100%, 0)
					}

					100% {
						opacity: 1;
						transform: translate3d(0, 0, 0);
						-webkit-transform: translate3d(0, 0, 0)
					}
				}

				@keyframes texttobottom {
					0% {
						opacity: 1;
						transform: translate3d(0, 0, 0);
						-webkit-transform: translate3d(0, 0, 0)
					}

					100% {
						opacity: 0;
						transform: translate3d(0, 100%, 0);
						-webkit-transform: translate3d(0, 100%, 0)
					}
				}

				@keyframes textslide {
					0% {
						opacity: 0;
						transform: translate3d(0, 30px, 0);
						-webkit-transform: translate3d(0, 30px, 0)
					}

					100% {
						opacity: 1;
						transform: translate3d(0, 0, 0);
						-webkit-transform: translate3d(0, 0, 0)
					}
				}

				@keyframes textslidebottom {
					0% {
						opacity: 1;
						transform: translate3d(0, 0, 0);
						-webkit-transform: translate3d(0, 0, 0)
					}

					100% {
						opacity: 0;
						transform: translate3d(0, 30px, 0);
						-webkit-transform: translate3d(0, 30px, 0)
					}
				}

				@keyframes fadein {
					0% {
						opacity: 0
					}

					100% {
						opacity: 1
					}
				}

				@media (max-width: 1210px) {
					.header.mini:not(.allways-white) {
						padding: 12px 0 !important;
						border-bottom: 1px solid #D9D9D9
					}

					.preloader-wrap span {
						font-size: 100px;
						margin-left: 0;
						line-height: 100%
					}

					.preloader-wrap b {
						display: block
					}

					.preloader-wrap sup {
						display: inline-block;
						vertical-align: top;
						margin-left: 5px
					}

					.preloader-wrap sup img {
						width: 25px
					}

					.bottom-divider {
						border-top: 2px solid #414243;
						height: calc(50% - 100px)
					}

					.page-preloader {
						height: 100vh;
						font-size: 24px
					}

					h1.view:not(.done) span.a-line,
					.section-heading.view:not(.line-animation) span.a-line,
					h2.view span.a-line,
					h3.view span.a-line,
					.view.value .view.text span.a-line,
					.mobile-menu li a span.a-line {
						margin-left: -2px;
						margin-top: 0;
						margin-bottom: 0
					}

					.header.mini:not(.allways-white) {
						padding: 15px 0 !important;
						border-bottom: 1px solid #D9D9D9
					}

					h1.viewed:not(.done) span.a-line,
					.section-heading.viewed:not(.line-animation) span.a-line,
					h2.viewed span.a-line,
					h3.viewed span.a-line,
					.viewed.value .viewed.text span.a-line,
					.mobile-menu li a span.a-line {
						margin-left: -2px;
						margin-top: 0;
						margin-bottom: 0
					}

					h1.viewed:not(.done) span.a-line {
						margin-top: -0.5%;
						margin-bottom: -0.5%
					}
				}
			`}</style>
			
			
        </>
    );
}