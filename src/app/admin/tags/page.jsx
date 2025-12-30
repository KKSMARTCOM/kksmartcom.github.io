// src/app/admin/tags/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { getProjectTypes, getIndustries } from  '@/lib/dataManager';
import { getAuthHeader } from '@/lib/clientAuth';


export default function AdminTagsPage() {
  const [projectTypes, setProjectTypes] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  // État pour le formulaire d'ajout
  const [newTag, setNewTag] = useState({ slug: '', label: '', href: '', category: 'projectType' });

  const loadTags = async () => {
    setLoading(true);
    const types = await getProjectTypes();
    const inds = await getIndustries();
    setProjectTypes(types);
    setIndustries(inds);
    setLoading(false);
  };

  useEffect(() => {
    loadTags();
  }, []);

  const handleAddTag = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(newTag),
      });

      if (response.ok) {
        setNewTag({ slug: '', label: '', href: '', category: 'projectType' });
        loadTags(); // Recharger la liste
      }
    } catch (err) {
      alert("Erreur lors de l'ajout");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce tag ?")) return;
    
    try {
      const response = await fetch(`/api/tags/${id}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
      });
      if (response.ok) loadTags();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <main style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Gestion des Tags</h1>
      </div>

      {/* FORMULAIRE D'AJOUT */}
      <section style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>Ajouter un nouveau Tag</h3>
        <form onSubmit={handleAddTag} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
          <div>
            <label>Label</label>
            <input type="text" value={newTag.label} onChange={e => setNewTag({...newTag, label: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-'), href: `/blog?tags=${e.target.value.toLowerCase().replace(/ /g, '-')}`})} required />
          </div>
          <div>
            <label>Slug</label>
            <input type="text" value={newTag.slug} readOnly />
          </div>
          <div>
            <label>Catégorie</label>
            <select value={newTag.category} onChange={e => setNewTag({...newTag, category: e.target.value})}>
              <option value="projectType">Type de Projet</option>
              <option value="industry">Industrie</option>
            </select>
          </div>
          <button type="submit" style={{ backgroundColor: '#0070f3', color: 'white', border: 'none', padding: '10px' }}>Ajouter</button>
        </form>
      </section>

      {/* LISTE DES TAGS */}
      {loading ? <p>Chargement...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div>
            <h2>Types de Projets</h2>
            <TagList tags={projectTypes} onDelete={handleDelete} />
          </div>
          <div>
            <h2>Industries</h2>
            <TagList tags={industries} onDelete={handleDelete} />
          </div>
        </div>
      )}
    </main>
  );
}

// Petit composant interne pour la liste
function TagList({ tags, onDelete }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #ccc' }}>
          <th style={{ textAlign: 'left' }}>Label</th>
          <th style={{ textAlign: 'right' }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {tags.map(tag => (
          <tr key={tag.id} style={{ borderBottom: '1px solid #eee' }}>
            <td>{tag.label}</td>
            <td style={{ textAlign: 'right', padding: '10px 0' }}>
              <button onClick={() => onDelete(tag.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}