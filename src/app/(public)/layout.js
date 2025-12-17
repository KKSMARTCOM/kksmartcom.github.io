"use client";
import "./globals.css";
import { LangProvider } from '@/context/LangContext';
import Header from "../../components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import HeadTags from '../../components/HeadTags';
import GtmRouteTracker from '../../components/GtmRouteTracker';
import { useLang } from '@/context/LangContext';
// Ajout: le bouton Calendly contient désormais le CookiePopup
import BoutonReservationCalendly from '../../components/BoutonReservationCalendly';

export default function RootLayout({ children }) {
  return (
    <LangProvider>
      <RootComponent>{children}</RootComponent>
    </LangProvider>
  );
}

// We need a sub-component to access the context-provided lang
const RootComponent = ({ children }) => {
  const { lang, handleLangChange } = useLang();
  // This structure is a bit contrived but necessary because `<html>` and `<body>`
  // tags can't be inside the provider if we want the provider to be a client component
  // while the page itself can be a server component.
  // A cleaner approach in a real app might involve restructuring where the provider is placed.
  return (
    
    <html lang={lang}>{/* Default lang, will be updated by client-side logic if needed */}
      <head>
        <HeadTags />
        <Script id="gtm-consent-default" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('consent','default',{
            'ad_storage':'denied',
            'analytics_storage':'denied',
            'functionality_storage':'denied',
            'personalization_storage':'denied',
            'security_storage':'granted'
          });
        `}</Script>
        <Script id="gtm-base" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'? '&l='+l : '';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NG5S546');
        `}</Script>
      </head>
      <body>
        {/* Google Tag Manager noscript */}
        <noscript>
          <iframe rel="preconnect" src="https://www.googletagmanager.com/ns.html?id=GTM-NG5S546" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
        </noscript>

        <Header />
        <GtmRouteTracker />
        <div className="page-preloader" id="pageloader" data-src="wp-content/themes/kksmartcom/img/black-bg.png">
          <div className="wrap">
            <div className="preloader-wrap">
              <b>{lang === 'fr' ? 'Chargement:' : 'Loading:'}</b> <span id="loadcntr">001</span><sup><img loading="lazy" width="25" height="25" style={{height: "auto"}} src="/assets/img/k.png" alt="Home - Photo 1"/></sup>
            </div>
            <div className="bottom-divider" data-src="/assets/img/black-bg.png"></div>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: `block_scroll = true; can_go = true;` }} />

        {children}
        <div id="cursor"></div>
        <Footer />
        {/* Bouton Calendly (inclut le CookiePopup en interne) */}
        <BoutonReservationCalendly />






        {/* Import des scripts JS séparés */}
        <Script src="/js/jquery.min.js" strategy="beforeInteractive" />
        {/* Ajout: charger jQuery Validation avant les scripts qui l'utilisent */}
        <Script src="/js/jquery.validate.min.js" strategy="beforeInteractive" id="jquery-validate" />
        <Script src="/js/owl.carousel.min.js" strategy="afterInteractive" />
        <Script src="/js/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/js/common-min.js" strategy="afterInteractive" id="main-min-scripts-js" />
        <Script src="/js/old-js-code1.js" strategy="afterInteractive" />
        <Script src="/js/old-js-code2.js" strategy="afterInteractive" />
        <Script src="/js/old-js-code3.js" strategy="afterInteractive" />
        <Script src="/js/old-js-code4.js" strategy="afterInteractive" />
        <Script src="/js/old-js-code5.js" strategy="lazyOnload" />
        {/*  <Script src="/js/jquery.validate.min.js" strategy="afterInteractive" id="jquery-js"/>
        <Script src="/js/custom-loader.js" strategy="afterInteractive" />
        <Script src="/js/custom-validation.js" strategy="afterInteractive" />
        <Script src="/js/custom-vars.js" strategy="beforeInteractive" />*/}
      </body>
    </html>
    
  );
}
