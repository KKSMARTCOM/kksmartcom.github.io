'use client';
import { useEffect } from 'react';
import ImageUploader from "../../ui/ImageUploader"
import { FiLink, FiType, FiImage, FiTag, FiPlus, FiTrash2, FiInfo } from 'react-icons/fi';

// Listes de référence pour les tags (à adapter selon tes besoins)
const TAG_OPTIONS = {
  projectType: [
    { slug: 'web-app', label: 'Application web' },
    { slug: 'mobile-app', label: 'Application mobile' },
    { slug: 'ui-ux', label: 'UI/UX Design' },
    { slug: 'branding', label: 'Branding' }
  ],
  industry: [
    { slug: 'crypto-nft', label: 'Crypto & NFT' },
    { slug: 'e-commerce', label: 'E-commerce' },
    { slug: 'fintech', label: 'Fintech' },
    { slug: 'health', label: 'Santé' }
  ]
};

export default function CardsSection({ data, articleId, updateField }) {
  
  // LOGIQUE : Génération automatique de l'URL
  useEffect(() => {
    const generatedUrl = `/articlespages?id=${articleId || ''}`;
    if (data.url !== generatedUrl) {
      updateField('fr.cards.url', generatedUrl);
    }
  }, [articleId, updateField, data.url]);

  // LOGIQUE : Ajouter un tag
  const addTag = (category, selection) => {
    if (!selection) return;
    const selectedOption = TAG_OPTIONS[category].find(opt => opt.slug === selection);
    
    const newTag = {
      ...selectedOption,
      category: category,
      href: category === 'projectType' ? `/blog?tags=${selection}` : `/blog?cat=${selection}`
    };

    // Vérifier si le tag existe déjà
    if (data.tags.some(t => t.slug === selection)) return;

    updateField('fr.cards.tags', [...(data.tags || []), newTag]);
  };

  // LOGIQUE : Supprimer un tag
  const removeTag = (slug) => {
    const filteredTags = data.tags.filter(t => t.slug !== slug);
    updateField('fr.cards.tags', filteredTags);
  };

  return (
    <div className="space-y-0 animate-in fade-in duration-500">
      
      {/* 1. Header de Section */}
      <div className="bg-white p-6  border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <FiInfo size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Aperçu de la Carte</h2>
            <p className="text-sm text-gray-500">Ces informations s'afficheront sur la grille de vos projets.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Titre de la carte */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <FiType className="mr-2" /> Titre de la carte
            </label>
            <input 
              type="text"
              value={data.title || ''}
              onChange={(e) => updateField('fr.cards.title', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              placeholder="Ex: JoCreate – App NFT"
            />
          </div>

          {/* URL (Auto-générée) */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-400">
              <FiLink className="mr-2" /> URL de destination (Auto)
            </label>
            <input 
              type="text"
              value={data.url || ''}
              readOnly
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Upload d'image avec aperçu */}
          <div className="md:col-span-2 w-full">
              {/*<div className="space-y-1 text-center">
                {data.images ? (
                  <div className="relative group">
                    <img 
                      src={data.images} 
                      alt="Aperçu de l'image" 
                      className="mx-auto h-40 w-auto object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                      <button
                        type="button"
                        onClick={() => updateField('fr.cards.images', '')}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        title="Supprimer l'image"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Téléverser une image</span>
                        <input 
                          id="file-upload" 
                          name="file-upload" 
                          type="file" 
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                updateField('fr.cards.images', reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <p className="pl-1">ou glisser-déposer</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF jusqu'à 2MB
                    </p>
                  </>
                )}
              </div>*/}
             <ImageUploader
                labelCover="Image de couverture (Miniature)"
                value={data.images || ''}
                onChange={(value) => updateField('fr.cards.images', value)}
                className="w-full"
                label="Glissez-déposez l'image de couverture ou cliquez pour sélectionner"
                helperText="Formats acceptés : PNG, JPG, GIF. Taille maximale : 2MB"
              />
          </div>

          {/* Description */}
          <div className="md:col-span-2 space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <FiType className="mr-2" /> Description courte
            </label>
            <textarea 
              rows="3"
              value={data.description || ''}
              onChange={(e) => updateField('fr.cards.description', e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Décrivez brièvement le projet..."
            />
          </div>
        </div>
      </div>

      {/* 2. Gestion des Tags */}
      <div className="bg-white p-6  border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
            <FiTag size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Tags & Catégories</h2>
            <p className="text-sm text-gray-500">Ajoutez les types de projets et secteurs d'activité.</p>
          </div>
        </div>

        {/* Sélecteurs de Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex space-x-2">
            <select 
              id="select-projectType"
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm outline-none"
              onChange={(e) => addTag('projectType', e.target.value)}
              value=""
            >
              <option value="" disabled>+ Type de projet</option>
              {TAG_OPTIONS.projectType.map(opt => <option key={opt.slug} value={opt.slug}>{opt.label}</option>)}
            </select>
          </div>

          <div className="flex space-x-2">
            <select 
              id="select-industry"
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm outline-none"
              onChange={(e) => addTag('industry', e.target.value)}
              value=""
            >
              <option value="" disabled>+ Secteur d'activité</option>
              {TAG_OPTIONS.industry.map(opt => <option key={opt.slug} value={opt.slug}>{opt.label}</option>)}
            </select>
          </div>
        </div>

        {/* Liste des Tags actifs */}
        <div className="flex flex-wrap gap-2">
          {data.tags?.map((tag) => (
            <span 
              key={tag.slug} 
              className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                tag.category === 'projectType' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-purple-50 text-purple-700 border border-purple-200'
              }`}
            >
              {tag.label}
              <button 
                onClick={() => removeTag(tag.slug)}
                className="ml-2 hover:text-red-500 transition-colors"
              >
                <FiTrash2 size={14} />
              </button>
            </span>
          ))}
          {(!data.tags || data.tags.length === 0) && (
            <p className="text-sm text-gray-400 italic">Aucun tag ajouté pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}