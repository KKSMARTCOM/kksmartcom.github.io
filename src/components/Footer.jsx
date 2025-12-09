"use client";

import { useLang } from '@/context/LangContext';
import { getComponentData } from '@/lib/dataManager';

// Composant pour les liens de navigation
const NavLink = ({ href, target = "_self", children }) => (
  <div className="address">
    <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>
      <div className="location">
        <span>{children}</span>
      </div>
    </a>
  </div>
);

// Composant pour les adresses des agences
const Location = ({ city, country, phone }) => (
  <div className="address">
    {!phone && <img src="/assets/img/pin.svg" alt="" />}
    <div className="location">
      {phone ? (
        <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
      ) : (
        <span>{city} / {country}</span>
      )}
    </div>
  </div>
);

// Composant pour les icônes des réseaux sociaux
const SocialIcon = ({ href, className, imgSrc, alt, width = 20, height = 20 }) => (
  <a 
    target="_blank" 
    rel="noopener noreferrer nofollow"
    href={href} 
    className={className}
  >
    <img 
      width={width} 
      height={height} 
      loading="lazy" 
      src={imgSrc} 
      alt={alt || className} 
    />
  </a>
);

// Composant pour la section de liens rapides
const QuickLinks = ({ title, links }) => (
  <div className="col" id="liensRapides">
    <div className="address">
      <div className="location">
        <a href={links[0].href}>
          <span id="lienrapide" style={{fontSize: 'x-large'}}>{title}</span>
        </a>
        {links.map((link, index) => (
          <NavLink key={index} href={link.href} target={link.target}>
            {link.text}
          </NavLink>
        ))}
      </div>
    </div>
  </div>
);

// Composant pour la section des agences
const Agencies = ({ title, locations, phone }) => (
  <div className="col" id="agences">
    <div className="section-subheading" style={{marginTop: 0, fontSize: 'x-large'}}>
      {title}
    </div>
    {locations.map((location, index) => (
      <Location key={index} city={location.city} country={location.country} />
    ))}
    <Location phone={phone} />
  </div>
);

// Composant pour les réseaux sociaux
const SocialMedia = ({ title, socialIcons, mapUrl }) => (
  <>
    <div className="section-subheading">{title}</div>
    <div className="socs-wrap">
      <div className="socs">
        {socialIcons.map((icon, index) => (
          <SocialIcon 
            key={index}
            href={icon.href}
            className={icon.className}
            imgSrc={icon.imgSrc}
            alt={icon.alt}
          />
        ))}
        <iframe
          src={mapUrl}
          className="map-container"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localisation KK SMART COM"
        ></iframe>
      </div>
    </div>
  </>
);

export default function Footer() {
  const { lang } = useLang();
  const data = getComponentData('Footer', lang);
  
  if (!data) return null;

  const { quickLinks, agencies, social, map, copyright } = data;

  return (
    <div>
      <div className="new_footer_wrap" style={{display: 'none'}}></div>
      <div className="before-footer lime-background section is_view footer-new"></div>
      <div className="footer-wrap lime-background hidden-block" style={{height: '941.25px',paddingRight : "20px",}}>
        <div className="footer" style={{transform: 'translateY(370.5px)', willChange: 'transform'}}>
          <div className="wrap">
            <div className="footer-top">
              <div className="left">
                <div className="locations">
                  <QuickLinks 
                    title={quickLinks.title} 
                    links={quickLinks.links} 
                  />
                  <Agencies 
                    title={agencies.title}
                    locations={agencies.locations}
                    phone={agencies.phone}
                  />
                </div>
              </div>
              <div className="right">
                <SocialMedia 
                  title={social.title}
                  socialIcons={social.icons}
                  mapUrl={map.embedUrl}
                />
              </div>
            </div>
          </div>

          <div className="wrap">
            <div className="flex-row bottom" id="clutch-widget-wrap">
              <p>{copyright} {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
