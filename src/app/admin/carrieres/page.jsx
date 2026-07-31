'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiBriefcase, FiEye, FiEyeOff } from 'react-icons/fi';
import { getAuthHeader } from '@/lib/clientAuth';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { ConfirmDialog, AdminNotice } from '@/components/admin/AdminDialog';

const EMPTY_FORM = {
  titleFr: '',
  titleEn: '',
  descriptionFr: '',
  descriptionEn: '',
  location: '',
  contractType: 'CDI',
  department: '',
  applicationEmail: 'hello@kksmartcom.com',
  status: 'draft',
};

export default function CarrieresAdminPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [notice, setNotice] = useState('');

  const loadJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/job-offers?admin=true');
      const data = await res.json();
      setJobs(data.jobOffers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadJobs(); }, [loadJobs]);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (job) => {
    setEditingId(job.id);
    setForm({
      titleFr: job.titleFr || '',
      titleEn: job.titleEn || '',
      descriptionFr: job.descriptionFr || '',
      descriptionEn: job.descriptionEn || '',
      location: job.location || '',
      contractType: job.contractType || 'CDI',
      department: job.department || '',
      applicationEmail: job.applicationEmail || '',
      status: job.status || 'draft',
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId ? `/api/job-offers/${editingId}` : '/api/job-offers';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Erreur');
      }
      setShowForm(false);
      loadJobs();
      setNotice(editingId ? 'Offre modifiée avec succès.' : 'Offre ajoutée avec succès.');
    } catch (err) {
      setNotice(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    await fetch(`/api/job-offers/${pendingDelete}`, { method: 'DELETE', headers: getAuthHeader() });
    setPendingDelete(null);
    loadJobs();
    setNotice('Offre supprimée avec succès.');
  };

  const toggleStatus = async (job) => {
    const newStatus = job.status === 'published' ? 'draft' : 'published';
    await fetch(`/api/job-offers/${job.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ ...job, status: newStatus }),
    });
    loadJobs();
    setNotice(newStatus === 'published' ? 'Offre publiée avec succès.' : 'Offre repassée en brouillon.');
  };

  return (
    <div className="admin-page max-w-6xl mx-auto">
      <div className="flex justify-between items-center pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Carrières</h1>
          <p className="text-gray-500 mt-1">Gestion des offres d&apos;emploi</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <FiPlus className="mr-2" /> Nouvelle offre
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">{editingId ? 'Modifier l\'offre' : 'Nouvelle offre'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre (FR) *</label>
                <input required className="w-full border rounded-lg px-3 py-2" value={form.titleFr} onChange={(e) => setForm({ ...form, titleFr: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre (EN)</label>
                <input className="w-full border rounded-lg px-3 py-2" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                <input className="w-full border rounded-lg px-3 py-2" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type de contrat</label>
                <select className="w-full border rounded-lg px-3 py-2" value={form.contractType} onChange={(e) => setForm({ ...form, contractType: e.target.value })}>
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Stage">Stage</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
                <input className="w-full border rounded-lg px-3 py-2" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email candidature</label>
                <input type="email" className="w-full border rounded-lg px-3 py-2" value={form.applicationEmail} onChange={(e) => setForm({ ...form, applicationEmail: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select className="w-full border rounded-lg px-3 py-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (FR) *</label>
              <RichTextEditor value={form.descriptionFr} onChange={(descriptionFr) => setForm({ ...form, descriptionFr })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
              <RichTextEditor value={form.descriptionEn} onChange={(descriptionEn) => setForm({ ...form, descriptionEn })} />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Annuler</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <p className="p-8 text-center text-gray-500">Chargement…</p>
        ) : jobs.length === 0 ? (
          <p className="p-8 text-center text-gray-500">Aucune offre. Créez votre première offre d&apos;emploi.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="text-left px-6 py-3">Titre</th>
                <th className="text-left px-6 py-3">Contrat</th>
                <th className="text-left px-6 py-3">Lieu</th>
                <th className="text-left px-6 py-3">Statut</th>
                <th className="text-right px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FiBriefcase className="text-gray-400" />
                      <span className="font-medium text-gray-900">{job.titleFr}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.contractType || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.location || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${job.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {job.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => toggleStatus(job)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50" title={job.status === 'published' ? 'Dépublier' : 'Publier'}>
                        {job.status === 'published' ? <FiEyeOff /> : <FiEye />}
                      </button>
                      <button onClick={() => openEdit(job)} className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50"><FiEdit2 /></button>
                      <button onClick={() => setPendingDelete(job.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Page publique : <Link href="/carrieres" className="text-blue-600 hover:underline">/carrieres</Link>
      </p>
      <ConfirmDialog open={Boolean(pendingDelete)} danger title="Supprimer cette offre ?" description="Cette offre ne sera plus disponible dans l’administration ni sur le site." confirmLabel="Supprimer l’offre" onClose={() => setPendingDelete(null)} onConfirm={handleDelete} />
      <AdminNotice message={notice} onClose={() => setNotice('')} />
    </div>
  );
}
