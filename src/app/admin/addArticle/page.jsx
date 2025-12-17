// src/app/admin/add-article/page.jsx
'use client';

import React, { useState } from 'react';
import { getAuthHeader } from '@/lib/clientAuth';

export default function AddArticlePage() {
  const [jsonInput, setJsonInput] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // 1. On vérifie si le JSON est valide localement
      const parsedData = JSON.parse(jsonInput);
      
      // Votre JSON a une clé "1", on doit extraire le contenu
      const articleId = Object.keys(parsedData)[0];
      const articleData = parsedData[articleId];

      // 2. Préparation du payload pour notre API
      const payload = {
        uniqueId: articleId,
        date: articleData.fr.date,
        author: articleData.fr.author,
        contentFr: articleData.fr,
        contentEn: articleData.en || null
      };

      // 3. Envoi au backend avec le token de sécurité
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader() // Ajoute le header Authorization: Bearer <token>
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Article enregistré avec succès dans la BDD !' });
        setJsonInput('');
      } else {
        setStatus({ type: 'error', message: result.message || 'Erreur lors de l\'enregistrement.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'JSON invalide. Vérifiez le format.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Ajouter un Article (Format JSON)</h1>
      <p>Collez ici le bloc JSON de l'article (ex: le bloc commencant par "1": ...)</p>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{ "1": { "fr": { ... } } }'
          style={{ width: '100%', height: '400px', fontFamily: 'monospace', padding: '10px', marginBottom: '20px' }}
          required
        />
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {loading ? 'Envoi en cours...' : 'Enregistrer l\'article'}
        </button>
      </form>

      {status.message && (
        <div style={{ marginTop: '20px', padding: '15px', borderRadius: '5px', backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da', color: status.type === 'success' ? '#155724' : '#721c24' }}>
          {status.message}
        </div>
      )}
    </main>
  );
}