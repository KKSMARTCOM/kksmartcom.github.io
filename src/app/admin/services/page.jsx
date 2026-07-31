'use client';

import { useState, useEffect, useCallback } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiLayers, FiPackage } from 'react-icons/fi';
import { getAuthHeader } from '@/lib/clientAuth';
import ImageUploader from '@/components/ui/ImageUploader';
import { ConfirmDialog, AdminNotice } from '@/components/admin/AdminDialog';

const EMPTY_CATEGORY = { titleFr: '', titleEn: '', order: 0 };
const EMPTY_SERVICE = {
  titleFr: '',
  titleEn: '',
  descriptionFr: '',
  descriptionEn: '',
  categoryId: '',
  href: '#',
  imageUrl: '',
  imageAltFr: '',
  imageAltEn: '',
  order: 0,
  isPublished: true,
  showInNav: true,
  showOnHomepage: false,
};

export default function ServicesAdminPage() {
  const [tab, setTab] = useState('services');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [catForm, setCatForm] = useState(EMPTY_CATEGORY);
  const [editingCatId, setEditingCatId] = useState(null);
  const [showCatForm, setShowCatForm] = useState(false);

  const [svcForm, setSvcForm] = useState(EMPTY_SERVICE);
  const [editingSvcId, setEditingSvcId] = useState(null);
  const [showSvcForm, setShowSvcForm] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [notice, setNotice] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/service-categories');
      const data = await res.json();
      setCategories(data.categories || []);
      setActiveCategoryId((current) => current || data.categories?.[0]?.id?.toString() || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const allServices = categories.flatMap((c) =>
    (c.services || []).map((s) => ({ ...s, categoryTitle: c.titleFr }))
  );
  const displayedServices = allServices.filter((service) =>
    (!activeCategoryId || service.categoryId.toString() === activeCategoryId) &&
    service.titleFr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ── Catégories CRUD ──
  const openCreateCat = () => {
    setEditingCatId(null);
    setCatForm(EMPTY_CATEGORY);
    setShowCatForm(true);
  };

  const openEditCat = (cat) => {
    setEditingCatId(cat.id);
    setCatForm({ titleFr: cat.titleFr, titleEn: cat.titleEn || '', order: cat.order });
    setShowCatForm(true);
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const url = editingCatId ? `/api/service-categories/${editingCatId}` : '/api/service-categories';
    const method = editingCatId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(catForm),
    });
    if (!res.ok) {
      setNotice((await res.json()).message || 'Erreur');
      return;
    }
    setShowCatForm(false);
    loadData();
    setNotice(editingCatId ? 'Catégorie modifiée avec succès.' : 'Catégorie ajoutée avec succès.');
  };

  const deleteCategory = async () => {
    if (!pendingDelete) return;
    await fetch(`/api/service-categories/${pendingDelete.id}`, { method: 'DELETE', headers: getAuthHeader() });
    setPendingDelete(null);
    loadData();
    setNotice('Catégorie supprimée avec succès.');
  };

  // ── Services CRUD ──
  const openCreateSvc = () => {
    setEditingSvcId(null);
    setSvcForm({ ...EMPTY_SERVICE, categoryId: categories[0]?.id?.toString() || '' });
    setShowSvcForm(true);
  };

  const openEditSvc = (svc) => {
    setEditingSvcId(svc.id);
    setSvcForm({
      titleFr: svc.titleFr,
      titleEn: svc.titleEn || '',
      descriptionFr: svc.descriptionFr || '',
      descriptionEn: svc.descriptionEn || '',
      categoryId: svc.categoryId.toString(),
      href: svc.href || '#',
      imageUrl: svc.imageUrl || '',
      imageAltFr: svc.imageAltFr || '',
      imageAltEn: svc.imageAltEn || '',
      order: svc.order,
      isPublished: svc.isPublished,
      showInNav: svc.showInNav,
      showOnHomepage: svc.showOnHomepage,
    });
    setShowSvcForm(true);
  };

  const saveService = async (e) => {
    e.preventDefault();
    const url = editingSvcId ? `/api/services/items/${editingSvcId}` : '/api/services/items';
    const method = editingSvcId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ ...svcForm, categoryId: parseInt(svcForm.categoryId, 10) }),
    });
    if (!res.ok) {
      setNotice((await res.json()).message || 'Erreur');
      return;
    }
    setShowSvcForm(false);
    loadData();
    setNotice(editingSvcId ? 'Service modifié avec succès.' : 'Service ajouté avec succès.');
  };

  const deleteService = async () => {
    if (!pendingDelete) return;
    await fetch(`/api/services/items/${pendingDelete.id}`, { method: 'DELETE', headers: getAuthHeader() });
    setPendingDelete(null);
    loadData();
    setNotice('Service supprimé avec succès.');
  };

  return (
    <div className="admin-page max-w-6xl mx-auto">
      <div className="flex justify-between items-center pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-500 mt-1">CRUD catégories et services du site</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setTab('services')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${tab === 'services' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
        >
          <FiPackage className="inline mr-1" /> Services ({allServices.length})
        </button>
        <button
          onClick={() => setTab('categories')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${tab === 'categories' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
        >
          <FiLayers className="inline mr-1" /> Catégories ({categories.length})
        </button>
      </div>

      {tab === 'categories' && (
        <>
          <div className="flex justify-end mb-4">
            <button onClick={openCreateCat} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              <FiPlus className="mr-1" /> Nouvelle catégorie
            </button>
          </div>

          {showCatForm && (
            <form onSubmit={saveCategory} className="bg-white border rounded-xl p-6 mb-4 space-y-4 shadow-sm">
              <h3 className="font-semibold">{editingCatId ? 'Modifier' : 'Créer'} une catégorie</h3>
              <div className="grid grid-cols-3 gap-4">
                <input required placeholder="Titre FR *" className="border rounded-lg px-3 py-2" value={catForm.titleFr} onChange={(e) => setCatForm({ ...catForm, titleFr: e.target.value })} />
                <input placeholder="Titre EN" className="border rounded-lg px-3 py-2" value={catForm.titleEn} onChange={(e) => setCatForm({ ...catForm, titleEn: e.target.value })} />
                <input type="number" placeholder="Ordre" className="border rounded-lg px-3 py-2" value={catForm.order} onChange={(e) => setCatForm({ ...catForm, order: parseInt(e.target.value, 10) || 0 })} />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Enregistrer</button>
                <button type="button" onClick={() => setShowCatForm(false)} className="px-4 py-2 border rounded-lg text-sm">Annuler</button>
              </div>
            </form>
          )}

          <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
            {loading ? <p className="p-6 text-gray-500">Chargement…</p> : (
              <table className="w-full">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="text-left px-6 py-3">Titre FR</th>
                    <th className="text-left px-6 py-3">Slug</th>
                    <th className="text-left px-6 py-3">Ordre</th>
                    <th className="text-left px-6 py-3">Services</th>
                    <th className="text-right px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium">{cat.titleFr}</td>
                      <td className="px-6 py-3 text-sm text-gray-500">{cat.slug}</td>
                      <td className="px-6 py-3 text-sm">{cat.order}</td>
                      <td className="px-6 py-3 text-sm">{cat.services?.length || 0}</td>
                      <td className="px-6 py-3 text-right">
                        <button onClick={() => openEditCat(cat)} className="p-2 text-gray-400 hover:text-green-600"><FiEdit2 /></button>
                        <button onClick={() => setPendingDelete({ type: 'category', id: cat.id })} className="p-2 text-gray-400 hover:text-red-600"><FiTrash2 /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {tab === 'services' && (
        <>
          <div className="services-browser mb-5">
            <div className="services-browser-top"><div><p className="text-xs font-bold tracking-widest text-gray-400">CATALOGUE</p><h2 className="text-xl font-bold">Services par catégorie</h2></div><button onClick={openCreateSvc} disabled={categories.length === 0} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50">
              <FiPlus className="mr-1" /> Nouveau service
            </button></div>
            <div className="services-browser-controls"><div className="services-category-tabs">{categories.map((category) => <button key={category.id} onClick={() => setActiveCategoryId(category.id.toString())} className={activeCategoryId === category.id.toString() ? 'active' : ''}>{category.titleFr}<span>{category.services?.length || 0}</span></button>)}</div><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Rechercher dans cette catégorie…" /></div>
          </div>

          {showSvcForm && (
            <form onSubmit={saveService} className="bg-white border rounded-xl p-6 mb-4 space-y-4 shadow-sm">
              <h3 className="font-semibold">{editingSvcId ? 'Modifier' : 'Créer'} un service</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required placeholder="Titre FR *" className="border rounded-lg px-3 py-2" value={svcForm.titleFr} onChange={(e) => setSvcForm({ ...svcForm, titleFr: e.target.value })} />
                <input placeholder="Titre EN" className="border rounded-lg px-3 py-2" value={svcForm.titleEn} onChange={(e) => setSvcForm({ ...svcForm, titleEn: e.target.value })} />
                <select required className="border rounded-lg px-3 py-2" value={svcForm.categoryId} onChange={(e) => setSvcForm({ ...svcForm, categoryId: e.target.value })}>
                  <option value="">Catégorie *</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.titleFr}</option>)}
                </select>
                <input type="number" placeholder="Ordre" className="border rounded-lg px-3 py-2" value={svcForm.order} onChange={(e) => setSvcForm({ ...svcForm, order: parseInt(e.target.value, 10) || 0 })} />
                <input placeholder="Lien (href)" className="border rounded-lg px-3 py-2 md:col-span-2" value={svcForm.href} onChange={(e) => setSvcForm({ ...svcForm, href: e.target.value })} />
                <div className="md:col-span-2">
                  <ImageUploader labelCover="Image du service" value={svcForm.imageUrl} onChange={(imageUrl) => setSvcForm({ ...svcForm, imageUrl })} />
                  <input placeholder="…ou URL externe de l'image" className="w-full border rounded-lg px-3 py-2 mt-2" value={svcForm.imageUrl} onChange={(e) => setSvcForm({ ...svcForm, imageUrl: e.target.value })} />
                </div>
                <input placeholder="Alt image FR" className="border rounded-lg px-3 py-2" value={svcForm.imageAltFr} onChange={(e) => setSvcForm({ ...svcForm, imageAltFr: e.target.value })} />
                <input placeholder="Alt image EN" className="border rounded-lg px-3 py-2" value={svcForm.imageAltEn} onChange={(e) => setSvcForm({ ...svcForm, imageAltEn: e.target.value })} />
              </div>
              <textarea placeholder="Description FR" rows={3} className="w-full border rounded-lg px-3 py-2" value={svcForm.descriptionFr} onChange={(e) => setSvcForm({ ...svcForm, descriptionFr: e.target.value })} />
              <textarea placeholder="Description EN" rows={2} className="w-full border rounded-lg px-3 py-2" value={svcForm.descriptionEn} onChange={(e) => setSvcForm({ ...svcForm, descriptionEn: e.target.value })} />
              <div className="flex flex-wrap gap-4 text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" checked={svcForm.isPublished} onChange={(e) => setSvcForm({ ...svcForm, isPublished: e.target.checked })} /> Publié</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={svcForm.showInNav} onChange={(e) => setSvcForm({ ...svcForm, showInNav: e.target.checked })} /> Menu navigation</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={svcForm.showOnHomepage} onChange={(e) => setSvcForm({ ...svcForm, showOnHomepage: e.target.checked })} /> Page d&apos;accueil</label>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Enregistrer</button>
                <button type="button" onClick={() => setShowSvcForm(false)} className="px-4 py-2 border rounded-lg text-sm">Annuler</button>
              </div>
            </form>
          )}

          <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
            {loading ? <p className="p-6 text-gray-500">Chargement…</p> : allServices.length === 0 ? (
              <p className="p-6 text-gray-500">Aucun service. Créez d&apos;abord une catégorie.</p>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="text-left px-6 py-3">Titre</th>
                    <th className="text-left px-6 py-3">Catégorie</th>
                    <th className="text-left px-6 py-3">Visibilité</th>
                    <th className="text-left px-6 py-3">Statut</th>
                    <th className="text-right px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {displayedServices.map((svc) => (
                    <tr key={svc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium">{svc.titleFr}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">{svc.categoryTitle}</td>
                      <td className="px-6 py-3 text-xs">
                        {svc.showInNav && <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded mr-1">Nav</span>}
                        {svc.showOnHomepage && <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded">Accueil</span>}
                      </td>
                      <td className="px-6 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${svc.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {svc.isPublished ? 'Publié' : 'Masqué'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <button onClick={() => openEditSvc(svc)} className="p-2 text-gray-400 hover:text-green-600"><FiEdit2 /></button>
                        <button onClick={() => setPendingDelete({ type: 'service', id: svc.id })} className="p-2 text-gray-400 hover:text-red-600"><FiTrash2 /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
      <ConfirmDialog open={Boolean(pendingDelete)} danger title={pendingDelete?.type === 'category' ? 'Supprimer cette catégorie ?' : 'Supprimer ce service ?'} description={pendingDelete?.type === 'category' ? 'Tous les services associés seront supprimés.' : 'Cette action est définitive.'} confirmLabel="Supprimer" onClose={() => setPendingDelete(null)} onConfirm={pendingDelete?.type === 'category' ? deleteCategory : deleteService} />
      <AdminNotice message={notice} onClose={() => setNotice('')} />
    </div>
  );
}
