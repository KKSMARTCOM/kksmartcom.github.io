import React from "react";
import Script from "next/script";

const HeadTags = () => (
  <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com/" />
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="" />

    {/* Google / local Montserrat to match original site */}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" />
    <link rel="stylesheet" href="/fonts/style.css" />
    <noscript>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&display=swap" rel="stylesheet" type="text/css" />
    </noscript>
    <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
    <link rel="apple-touch-icon" href="/assets/img/cropped-fv-180x180.png" />
    <link rel="icon" type="image/png" href="/assets/img/kksmartcomfavicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/assets/img/kksmartcomfavicon/favicon.svg" />
    <link rel="shortcut icon" href="/assets/img/kksmartcomfavicon/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/kksmartcomfavicon/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="KK SMART COM" />
    <link rel="manifest" href="/assets/img/kksmartcomfavicon/site.webmanifest" />

    {/* Force Montserrat as default font (keeps original look) */}
    <style>{`body{font-family: 'Montserrat', Arial, Helvetica, sans-serif;}`}</style>

    {/* Theme CSS from original site (internal paths) */}
    <link rel="stylesheet" id="reset-css" href="/css/reset.css" media="all" />
    <link rel="stylesheet" id="ui-css" href="/css/ui.css" media="all" />
    <link rel="stylesheet" id="main-css" href="/css/main.css" media="all" />

    {/* Inline vars from original head */}
    <script dangerouslySetInnerHTML={{ __html: `black_bg = "/assets/img/black-bg.png"; other_bg = "/assets/img/bg.png";` }} />

    {/* Small head script kept as Script component */}
    <Script src="/js/custom-pageloader.js" strategy="afterInteractive" />
    <Script src="/js/pace.min.js" strategy="afterInteractive" />
  </>
);

export default HeadTags;
