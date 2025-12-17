import React from 'react';
import PreuveSocial from '../../../components/PreuveSocial';
import AproposHero from '../../../components/AproposHero';
import WhoUs from '../../../components/WhoUs';
import Mission from '../../../components/Mission'
import ContactSection from '../../../components/ContactSection';
import SocialCta from '../../../components/SocialCta';
import Service from '../../../components/Service';


export const metadata = {
  title: 'À propos - KK SMART COM',
  description: 'Découvrez KK SMART COM, votre agence de communication digitale au Bénin.',
};

export default function Apropos() {
  return (
    <>
      <AproposHero />
      <div className="section-new-screen4 web_design_screen4 is_view section white-background" style={{paddingTop: "1px"}}>
      <WhoUs />
      <Mission />
      <PreuveSocial />
      </div>
      <ContactSection />

      <link rel="stylesheet" href="/css/about-alt.css" media="all" />
    </>

        
  );
}
