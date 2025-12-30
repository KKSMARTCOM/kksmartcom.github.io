'use client';
import { useEffect, useState } from 'react';
import { FiLink, FiType, FiImage, FiTag, FiPlus, FiTrash2, FiInfo, FiUploadCloud } from 'react-icons/fi';

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
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = (file) => {
    if (!file) return;
    
    // Vérification de la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux. Taille maximale: 5MB');
      return;
    }

    // Vérification du type de fichier
    if (!file.type.match('image.*')) {
      alert('Veuillez sélectionner un fichier image valide');
      return;
    }

    // Création d'une URL pour la prévisualisation
    const imageUrl = URL.createObjectURL(file);
    updateField('fr.cards.images', imageUrl);
    
    // Ici, vous pourriez ajouter la logique pour uploader le fichier
    // uploadImage(file).then(publicUrl => {
    //   updateField('fr.cards.images', publicUrl);
    //   URL.revokeObjectURL(imageUrl); // Nettoyer l'URL de l'objet
    // });
  };
  
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
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Header de Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
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

          {/* Image avec prévisualisation */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center text-sm font-semibold text-gray-700">
              <FiImage className="mr-2" /> Image miniature
            </div>
            
            <div 
              className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleImageChange(e.dataTransfer.files[0]);
                }
              }}
            >
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleImageChange(e.target.files[0]);
                  }
                }}
              />
              
              {data.images ? (
                <div className="space-y-4">
                  <div className="relative mx-auto w-full max-w-xs h-40 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={data.images.startsWith('blob:') ? data.images : data.images} 
                      alt="Prévisualisation" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateField('fr.cards.images', '');
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md text-red-500 hover:bg-red-50"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {typeof data.images === 'string' && data.images.split('/').pop()}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <FiUploadCloud className="text-gray-400" size={20} />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Glissez et déposez votre image ici</p>
                    <p className="text-xs mt-1">ou</p>
                  </div>
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors"
                  >
                    Sélectionner un fichier
                  </label>
                  <p className="text-xs text-gray-500">
                    Formats supportés: JPG, PNG, WEBP (max. 5MB)
                  </p>
                </div>
              )}
            </div>
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
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
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