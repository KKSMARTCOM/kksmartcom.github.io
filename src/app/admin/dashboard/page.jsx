'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiBriefcase, FiPackage, FiFileText, FiArrowUpRight } from 'react-icons/fi';

const cards = [
  { href:'/admin/carrieres', key:'jobs', label:"Offres d'emploi", detail:'Recrutement', icon:FiBriefcase, accent:'text-blue-600' },
  { href:'/admin/services', key:'services', label:'Services', detail:'Catalogue', icon:FiPackage, accent:'text-pink-500' },
  { href:'/admin/articles', key:'posts', label:'Articles éditoriaux', detail:'Publications', icon:FiFileText, accent:'text-yellow-500' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState({ jobs:0, services:0, posts:0, categories:0 });
  useEffect(() => { Promise.all([fetch('/api/job-offers?admin=true').then(r=>r.json()),fetch('/api/service-categories').then(r=>r.json()),fetch('/api/blog/posts?admin=true').then(r=>r.json())]).then(([jobs,cats,posts])=>setStats({jobs:(jobs.jobOffers||[]).length,services:(cats.categories||[]).reduce((total,item)=>total+(item.services?.length||0),0),categories:(cats.categories||[]).length,posts:(posts.posts||[]).length})); }, []);
  return <div className="max-w-6xl mx-auto"><div className="mb-10 flex items-end justify-between"><div><p className="text-xs font-bold tracking-[.2em] text-blue-600 uppercase">KK SMART COM</p><h1 className="text-4xl font-bold text-gray-900 mt-2">Tableau de bord</h1><p className="mt-2 text-sm text-gray-500">Pilotez vos contenus et publications.</p></div><p className="hidden md:block text-sm text-gray-400">Espace administrateur</p></div><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{cards.map(({href,key,label,detail,icon:Icon,accent})=><Link key={key} href={href} className="bg-white p-6 rounded-2xl border hover:shadow-xl transition group"><div className="flex justify-between"><Icon className={`${accent} group-hover:scale-110 transition`} size={28}/><FiArrowUpRight className="text-gray-300 group-hover:text-blue-600 transition"/></div><p className="text-sm font-semibold text-gray-500 mt-6">{label}</p><p className="text-4xl font-bold text-gray-900 mt-1">{stats[key]}</p><p className="text-xs text-gray-400 mt-2">{detail}</p></Link>)}</div><div className="mt-8 bg-white rounded-2xl border p-6"><p className="text-xs font-bold tracking-[.16em] text-gray-400 uppercase">Vue d’ensemble</p><p className="mt-2 text-lg font-semibold">{stats.categories} catégories de services actives</p><p className="text-sm text-gray-500 mt-1">Utilisez la navigation latérale pour éditer, publier ou organiser chaque contenu.</p></div></div>;
}
