'use client';

import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLang } from '@/context/LangContext';
import styles from './blog-post.module.css';

const labels = {
  fr: { summary: 'Aperçu', introduction: 'Contexte', content: 'À découvrir', conclusion: 'Perspective', section: 'Section' },
  en: { summary: 'Overview', introduction: 'Context', content: 'Explore', conclusion: 'Outlook', section: 'Section' },
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const { lang } = useLang();
  const [post, setPost] = useState(null);
  const locale = lang === 'en' ? 'en' : 'fr';
  useEffect(() => { fetch(`/api/blog/posts/${slug}?lang=${locale}`).then((response) => response.ok ? response.json() : null).then((data) => setPost(data?.post || null)); }, [slug, locale]);
  const pick = (fr, en) => locale === 'en' && en ? en : fr;
  const articleSections = (() => {
    if (!post) return [];
    const copy = labels[locale];
    const dynamic = (locale === 'en' && post.sectionsEn?.length ? post.sectionsEn : post.sectionsFr || []).filter((section) => section.content?.trim()).map((section, index) => ({ id: `section-${section.id}`, label: section.title?.trim() || `${copy.section} ${index + 1}`, title: section.title, content: section.content, isDynamic: true }));
    return [{ id: 'summary', label: copy.summary, content: pick(post.summaryFr, post.summaryEn), isDynamic: false }, { id: 'introduction', label: copy.introduction, content: pick(post.introductionFr, post.introductionEn), isDynamic: false }, ...dynamic, { id: 'content', label: copy.content, content: pick(post.bodyFr, post.bodyEn), isDynamic: false }, { id: 'conclusion', label: copy.conclusion, content: pick(post.conclusionFr, post.conclusionEn), isDynamic: false }].filter((section) => section.content?.trim());
  })();
  if (!post) return <main className="section white-background" style={{ paddingTop: 140 }}>Article introuvable.</main>;
  const imageAfterSection = articleSections.some((section) => section.id === 'introduction') ? 'introduction' : articleSections[0]?.id;
  return <main className="white-background section" style={{ paddingTop: 112, paddingBottom: 80 }}><article className={`wrap ${styles.article}`}><nav className={styles.sectionNavigation} aria-label={locale === 'fr' ? 'Navigation de l’article' : 'Article navigation'}><span className={styles.navigationLabel}>{locale === 'fr' ? 'Dans cet article' : 'In this article'}</span><div className={styles.navigationLinks}>{articleSections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.label}</a>)}</div></nav><p className={styles.category}>{post.department?.name}</p><h1 className="section-heading">{post.title}</h1><div className={styles.content}>{articleSections.map((section) => <Fragment key={section.id}><section id={section.id} className={styles.articleSection}>{section.isDynamic && <h2>{section.title || section.label}</h2>}<div dangerouslySetInnerHTML={{ __html: section.content }}/></section>{post.coverImage && section.id === imageAfterSection && <figure className={styles.coverFrame}><img src={post.coverImage} alt="" className={styles.coverImage}/></figure>}</Fragment>)}</div></article></main>;
}
