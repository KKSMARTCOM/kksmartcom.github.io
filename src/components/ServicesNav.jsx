"use client";

import { useState, useEffect } from 'react';
import { useLang } from '@/context/LangContext';

export function useServicesNav() {
  const { lang } = useLang();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/services?nav=true&lang=${lang}`)
      .then((r) => r.json())
      .then((data) => setCategories(data.categories || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [lang]);

  return { categories, loading };
}

export function ServicesSubMenu({ staticFallback, ctaHref, ctaLabel }) {
  const { lang } = useLang();
  const { categories, loading } = useServicesNav();

  if (loading || categories.length === 0) {
    const cols = staticFallback?.subMenu?.columns || [];
    return (
      <>
        <a href={ctaHref || staticFallback?.href || '#'} className="circle-btn lime">
          <span>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.5 0L11 5.5L5.5 11L4.67022 10.1702L8.7537 6H0V5H8.7537L4.67022 0.829781L5.5 0Z" fill="#1F2122" />
            </svg>
            {ctaLabel || staticFallback?.subMenu?.cta}
          </span>
        </a>
        {cols.map((col, i) => (
          <div className="col" key={i}>
            <div className="menu-title section-title small">{col.title}</div>
            <ul>
              {(col.items || []).map((item, j) => (
                <li key={j}><a href={item.href} target="_self">{item.text}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <a href={ctaHref || '#'} className="circle-btn lime">
        <span>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.5 0L11 5.5L5.5 11L4.67022 10.1702L8.7537 6H0V5H8.7537L4.67022 0.829781L5.5 0Z" fill="#1F2122" />
          </svg>
          {ctaLabel || (lang === 'en' ? 'See all services' : 'Voir tous nos services')}
        </span>
      </a>
      {categories.map((cat) => (
        <div className="col" key={cat.id}>
          <div className="menu-title section-title small">{cat.title}</div>
          <ul>
            {cat.services.map((svc) => (
              <li key={svc.id}><a href={svc.href} target="_self">{svc.title}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export function ServicesMobileMenu({ staticFallback }) {
  const { categories, loading } = useServicesNav();
  const items = loading || categories.length === 0
    ? (staticFallback?.subMenu?.columns || []).flatMap((c) => c.items || [])
    : categories.flatMap((c) => c.services.map((s) => ({ href: s.href, text: s.title })));

  return items.map((item, i) => (
    <li key={i} className="menu-item menu-item-type-post_type menu-item-object-service">
      <a href={item.href}><span className="a-line"><span>{item.text}</span></span></a>
    </li>
  ));
}
