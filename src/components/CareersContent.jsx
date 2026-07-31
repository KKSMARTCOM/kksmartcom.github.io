'use client';

import { useEffect, useState } from 'react';
import { FiArrowUpRight, FiBriefcase, FiMapPin, FiSend } from 'react-icons/fi';
import { useLang } from '@/context/LangContext';
import styles from './CareersContent.module.css';

export default function CareersContent() {
  const { lang } = useLang();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    fetch(`/api/job-offers?lang=${lang}`).then((response) => response.ok ? response.json() : { jobOffers: [] }).then((data) => active && setOffers(data.jobOffers || [])).catch(() => active && setOffers([])).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [lang]);

  const copy = lang === 'en'
    ? { kicker: 'JOIN THE TEAM', title: 'Careers', intro: 'Bring your ideas to a creative, ambitious team and help us build meaningful digital experiences.', count: 'open positions', none: 'No openings are available at the moment.', spontaneous: 'Would you still like to join us?', spontaneousText: 'Send an unsolicited application to', apply: 'Apply now', location: 'Location', department: 'Department' }
    : { kicker: 'REJOIGNEZ L’ÉQUIPE', title: 'Carrières', intro: 'Apportez vos idées à une équipe créative et ambitieuse, et construisons ensemble des expériences digitales utiles.', count: 'postes ouverts', none: 'Aucune offre disponible pour le moment.', spontaneous: 'Vous souhaitez tout de même nous rejoindre ?', spontaneousText: 'Envoyez une candidature spontanée à', apply: 'Postuler', location: 'Localisation', department: 'Département' };

  return <main className={`screen2 white-background section ${styles.page}`}><div className="wrap"><header className={styles.hero}><div><p className={styles.kicker}>{copy.kicker}</p><h1 className="section-heading">{copy.title}</h1><p className={styles.intro}>{copy.intro}</p></div><div className={styles.count}><strong>{loading ? '—' : offers.length}</strong><span>{copy.count}</span></div></header>{loading ? <div className={styles.skeletonList}>{[0, 1].map((item) => <div className={styles.skeleton} key={item}/>)}</div> : offers.length === 0 ? <section className={styles.empty}><div className={styles.emptyIcon}><FiSend /></div><h2>{copy.none}</h2><p>{copy.spontaneous}</p><p>{copy.spontaneousText} <a href="mailto:hello@kksmartcom.com">hello@kksmartcom.com</a></p></section> : <section className={styles.offerList} aria-label={copy.title}>{offers.map((job, index) => <article className={styles.offerCard} key={job.id}><div className={styles.offerNumber}>{String(index + 1).padStart(2, '0')}</div><div className={styles.offerMain}><div className={styles.offerHeading}><div><p className={styles.department}>{job.department || copy.department}</p><h2>{job.title}</h2></div>{job.contractType && <span className={styles.contract}><FiBriefcase /> {job.contractType}</span>}</div><div className={styles.meta}>{job.location && <span><FiMapPin /> {job.location}</span>}</div><div className={styles.description} dangerouslySetInnerHTML={{ __html: job.description }}/></div><a href={`mailto:${job.applicationEmail || 'hello@kksmartcom.com'}?subject=${encodeURIComponent(`${copy.apply} - ${job.title}`)}`} className={styles.applyLink}><span>{copy.apply}</span><FiArrowUpRight /></a></article>)}</section>}</div></main>;
}
