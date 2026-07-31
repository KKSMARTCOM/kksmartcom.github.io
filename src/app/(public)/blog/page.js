'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLang } from '@/context/LangContext';
import styles from './blog.module.css';

function BlogContent() {
  const { lang } = useLang();
  const search = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const department = search.get('department');
  useEffect(() => { const filter = department ? `&department=${encodeURIComponent(department)}` : ''; Promise.all([fetch(`/api/blog/posts?lang=${lang}${filter}`).then((r) => r.json()), fetch(`/api/blog/departments?lang=${lang}`).then((r) => r.json())]).then(([p, d]) => { setPosts(p.posts || []); setDepartments(d.departments || []); }); }, [lang, department]);
  return <main className="white-background section" style={{ paddingTop: 140, paddingBottom: 80 }}><div className="wrap"><h1 className="section-heading">{lang === 'en' ? 'Insights' : 'Blog'}</h1><div className="tags-wrap" style={{ margin: '28px 0' }}><Link className={`tag ${!department ? '' : 'empty'}`} href="/blog">{lang === 'en' ? 'All' : 'Tous'}</Link>{departments.map((item) => <Link key={item.id} className={`tag ${department === item.slug ? '' : 'empty'}`} href={`/blog?department=${item.slug}`}>{item.name}</Link>)}</div><div className={styles.cardGrid}>{posts.map((post) => <article className={styles.card} key={post.id}><Link className={styles.cardLink} href={`/blog/${post.slug}`} aria-label={post.title}>{post.coverImage ? <div className={styles.imageFrame}><img src={post.coverImage} alt="" className={styles.coverImage}/></div> : <div className={styles.imagePlaceholder}/>}<div className={styles.cardContent}><p className={styles.department}>{post.department?.name}</p><h2>{post.title}</h2><p className={styles.summary}>{lang === 'en' && post.summaryEn ? post.summaryEn : post.summaryFr}</p><span className={styles.readMore}>{lang === 'en' ? 'Read article' : 'Lire l’article'} <span aria-hidden="true">→</span></span></div></Link></article>)}</div>{posts.length === 0 && <p>{lang === 'en' ? 'No articles published yet.' : 'Aucun article publié pour le moment.'}</p>}</div></main>;
}

export default function BlogPage() { return <Suspense fallback={null}><BlogContent /></Suspense>; }
