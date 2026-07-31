'use client';

import { useEffect, useState } from 'react';
import { getAuthHeader } from '@/lib/clientAuth';
import { AdminNotice, ConfirmDialog } from '@/components/admin/AdminDialog';

export default function BlogCategories() {
  const [items, setItems] = useState([]);
  const [department, setDepartment] = useState({ nameFr: '', nameEn: '', order: 0 });
  const [subcategory, setSubcategory] = useState({ nameFr: '', nameEn: '', departmentId: '', order: 0 });
  const [pending, setPending] = useState(null);
  const [notice, setNotice] = useState('');
  const load = () => fetch('/api/blog/departments', { headers: getAuthHeader() }).then((r) => r.json()).then((d) => setItems(d.departments || []));
  useEffect(() => { load(); }, []);
  const request = async (url, method, body, successMessage) => {
    const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json', ...getAuthHeader() }, body: body ? JSON.stringify(body) : undefined });
    if (!response.ok) return setNotice((await response.json()).message || 'Une erreur est survenue.');
    load(); setNotice(successMessage);
  };
  const remove = async () => { if (!pending) return; await request(pending.url, 'DELETE', undefined, 'Élément supprimé avec succès.'); setPending(null); };
  return <><div className="admin-page max-w-5xl mx-auto"><div className="admin-articles-hero"><div><p className="admin-kicker">ORGANISATION</p><h1> du blog</h1><p>Structurez vos départements et sous-catégories.</p></div></div><div className="grid md:grid-cols-2 gap-6 mt-6"><form onSubmit={(e) => { e.preventDefault(); request('/api/blog/departments', 'POST', department, 'Département ajouté avec succès.'); setDepartment({ nameFr: '', nameEn: '', order: 0 }); }} className="bg-white border p-5 rounded-2xl space-y-3"><h2 className="font-bold">Nouveau département</h2><input required placeholder="Nom FR" value={department.nameFr} onChange={(e) => setDepartment({ ...department, nameFr: e.target.value })}/><input placeholder="Nom EN" value={department.nameEn} onChange={(e) => setDepartment({ ...department, nameEn: e.target.value })}/><button className="bg-blue-600 text-white px-4 py-2 rounded">Ajouter</button></form><form onSubmit={(e) => { e.preventDefault(); request('/api/blog/subcategories', 'POST', subcategory, 'Sous-catégorie ajoutée avec succès.'); setSubcategory({ nameFr: '', nameEn: '', departmentId: '', order: 0 }); }} className="bg-white border p-5 rounded-2xl space-y-3"><h2 className="font-bold">Nouvelle sous-catégorie</h2><select required value={subcategory.departmentId} onChange={(e) => setSubcategory({ ...subcategory, departmentId: e.target.value })}><option value="">Département</option>{items.map((item) => <option key={item.id} value={item.id}>{item.nameFr}</option>)}</select><input required placeholder="Nom FR" value={subcategory.nameFr} onChange={(e) => setSubcategory({ ...subcategory, nameFr: e.target.value })}/><input placeholder="Nom EN" value={subcategory.nameEn} onChange={(e) => setSubcategory({ ...subcategory, nameEn: e.target.value })}/><button className="bg-blue-600 text-white px-4 py-2 rounded">Ajouter</button></form></div><div className="bg-white border rounded-2xl mt-6 overflow-hidden">{items.map((item) => <div className="p-5 border-b" key={item.id}><div className="flex justify-between"><b>{item.nameFr}</b><button className="text-red-600" onClick={() => setPending({ url: `/api/blog/departments/${item.id}`, title: 'Supprimer ce département ?', description: 'Ses sous-catégories seront également supprimées.' })}>Supprimer</button></div>{item.subcategories.map((sub) => <div className="flex justify-between mt-3 text-sm" key={sub.id}><span>— {sub.nameFr}</span><button className="text-red-600" onClick={() => setPending({ url: `/api/blog/subcategories/${sub.id}`, title: 'Supprimer cette sous-catégorie ?', description: 'Cette action est définitive.' })}>Supprimer</button></div>)}</div>)}</div></div><ConfirmDialog open={Boolean(pending)} danger title={pending?.title} description={pending?.description} confirmLabel="Supprimer" onClose={() => setPending(null)} onConfirm={remove}/><AdminNotice message={notice} onClose={() => setNotice('')}/></>;
}
