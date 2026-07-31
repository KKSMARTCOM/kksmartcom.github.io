"use client";
import React, { useState, useEffect } from 'react';
import { useLang } from '@/context/LangContext';
import { getComponentData } from '@/lib/dataManager';
import Link from 'next/link';

const ServiceCard = ({ href, imgSources, img, name, btnHref, tags, description, consultBtn }) => (
	<div className="case view textslide delay0">
		<a href={href} className="img-wrap view">
			<picture>
				{imgSources.map((source, idx) => (
					<source key={idx} media={source.media} srcSet={source.srcSet} />
				))}
				<img width="630" height="600" className="" loading="lazy" src={img.src} alt={img.alt} />
			</picture>
		</a>
		<div className="name-wrap">
			<a href={href} className="name">{name}</a>
			<a href={btnHref} className="main-btn arrow">
				<span>
					<svg fill="none" height="10" viewBox="0 0 9 10" width="9" xmlns="http://www.w3.org/2000/svg">
						<path clipRule="evenodd" d="m.455752.5h8.544248v8.54425h-1.28906v-6.34368l-6.799434 6.79943-.911506-.91151 6.79943-6.79943h-6.343678z" fill="#fffefd" fillRule="evenodd" />
					</svg>
					{consultBtn}
				</span>
			</a>
		</div>
		<div className="tags-wrap">
			{tags.map((tag, idx) => (
				<a key={idx} href={tag.href} className="tag">{tag.label}</a>
			))}
		</div>
		<p>{description}</p>
	</div>
);

function buildCardFromService(service, consultBtn) {
	const imgSrc = service.imageUrl || '/assets/projets/digital.png';
	return {
		href: service.href,
		imgSources: [
			{ media: '(min-width: 1600px)', srcSet: imgSrc },
			{ media: '(max-width: 1100px)', srcSet: imgSrc },
			{ media: '(min-width: 1101px) and (max-width:1599px)', srcSet: imgSrc },
		],
		img: { src: imgSrc, alt: service.imageAlt || service.title },
		name: service.title,
		btnHref: service.href,
		tags: service.category ? [{ href: service.href, label: service.category.title }] : [],
		description: service.description || '',
		consultBtn,
	};
}

const Service = () => {
  const { lang } = useLang();
  const staticData = getComponentData('Service', lang) || { cards: [], bottomSection: {}, subheading: '', heading: '', cta: 'Voir plus' };
  const [cards, setCards] = useState(staticData.cards || []);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/services?homepage=true&lang=${lang}`);
        const data = await res.json();
        if (data.services?.length) {
          setCards(data.services.map((s) => buildCardFromService(s, lang === 'en' ? 'Consult' : 'Consulter')));
        }
      } catch (err) {
        console.error('Erreur chargement services:', err);
      } finally {
        setLoaded(true);
      }
    };
    load();
  }, [lang]);

  const data = staticData;

  if (!loaded && cards.length === 0) {
    return null;
  }

  return (
	<div className="screen2 white-background section is_view">
		<div className="wrap view hidden-block hidd_block">
			<div className="flex-row">
				<div className="w40">
					<div className="section-subheading view textslide">{data.subheading}</div>
				</div>
				<div className="w60">
					<h2 className="section-heading view meow" dangerouslySetInnerHTML={{ __html: data.heading }}></h2>
				</div>
			</div>
			<div className="flex-cases">
				{cards.map((card, idx) => (
					<ServiceCard key={idx} {...card} />
				))}
			</div>
			<div className="text-center view textslide"> <Link href="/blog" className="circle-btn black"><span><svg
							width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd"
								d="M5.5 0L11 5.5L5.5 11L4.67022 10.1702L8.7537 6H0V5H8.7537L4.67022 0.829781L5.5 0Z"
								fill="#1F2122" />
			</svg>{data.cta}</span></Link> </div>
			<div className="flex-row bottom-row">
				<div className="w30"> 
                    <picture>
						<source media="(min-width: 1600px)"
							srcSet="/assets/uploads/2021/10/chain.svg"/>
						<source media="(max-width: 1100px)"
							srcSet="/assets/uploads/2021/10/chain.svg"/>
						<source media="(min-width: 1101px) and (max-width:1599px)"
							srcSet="/assets/uploads/2021/10/chain.svg"/>
						<img width="400" height="400" className="rotate-star view fadein active viewed" loading="lazy"
							src="assets/uploads/2021/10/chain.svg" alt="Projets"/>
					</picture> 
                </div>
				<div className="w60">
					<h2 className="section-heading view textslide">{data.bottomSection?.heading}</h2>
					<p className="view textslide">{data.bottomSection?.paragraph}</p>
				</div>
			</div>
		</div>
	</div>
);
}

export default Service;
