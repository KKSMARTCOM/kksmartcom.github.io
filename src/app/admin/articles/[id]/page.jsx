'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FiSave, FiX, FiClock, FiUser, FiEdit2, FiChevronRight, FiEye, FiPlus, FiTrash2, FiUploadCloud, FiPlusCircle } from 'react-icons/fi';
import GeneralSection from '@/components/backPageComponents/ArticlesEditionComponents/GeneralSection';
import { generateNewArticleId } from '@/lib/urlUtils';

export default function ArticleEditor() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const isNew = id === 'nouveau';

  // 2. ÉTAT INITIAL BASÉ SUR LE JSON articlesData.json
  const [isLoading, setIsLoading] = useState(isNew);
  const [article, setArticle] = useState({
    uniqueId: isNew ? '' : id,
    author: 'KKsmartcom Team',
    date: new Date().toISOString().split('T')[0],
    id: isNew ? null : id,
  fr: {
    id: "",
    date: new Date().toISOString().split('T')[0],
    author: "KKsmartcom Team",
    activeSection: ["ArticleHero", "ArticleOverview", "ArticleBussinesNeed", "ArticleProblem", "ArticleResearch", "ArticleDesign", "ArticleProject", "ArticleFunctional", "ArticleResult"],
    cards: {
      url: "",
      title: "",
      images: "",
      tags: [], // Tableau d'objets { slug, label, href, category }
      description: ""
    },
    Hero: {
      title: "",
      description: "",
      image: "",
      imageAlt: "",
      tags: []
    },
    overview: {
      SectionTitle: "Aperçu",
      title: "",
      description: "",
      client: { name: "", location: "" },
      services: [],
      gallery: [] // Tableau d'objets { src, alt, width, height }
    },
    businessNeed: {
      SectionTitle: "Besoin client",
      clientRequestTitle: "",
      clientRequestDescription: "",
      ourRoleTitle: "",
      ourRoleDescription: "",
      ctaText: "Obtenir un devis",
      ctaLink: "#contact-form",
      gallery: []
    },
    problem: {
      SectionTitle: "Projet",
      MainTitle: "Problèmes & solutions",
      ProblemsTitle: "Problème",
      SolutionsTitle: "Solution",
      Problems: [], // { number, text }
      Solutions: []  // { number, text }
    },
    research: {
      SectionTitle: "Étapes de recherche",
      MainTitle: "",
      MainDescription: "",
      imagePrincipal: { src: "", alt: "", width: 1300, height: 630 },
      Stages: [],
      StagesData: [] // { stageTitle, title, description, problems: [], solutions, image: {} }
    },
    design: {
      SectionTitle: "Étapes de design",
      MainTitle: "",
      MainDescription: "",
      Stages: [],
      StagesData: []
    },
    project: {
      SectionTitle: "Projet",
      MainTitle: "",
      Features: [] // { title, description, image: {} }
    },
    functional: {
      SectionTitle: "Fonctionnalités",
      MainTitle: "",
      Features: [],
      Gallery: []
    },
    result: {
      SectionTitle: "Conclusion",
      MainTitle: "Résultats",
      Description: "",
      Achievements: [],
      Conclusion: "",
      Button: { text: "Obtenir un devis", href: "#contact-form" },
      Statistics: [] // { value, description, width, style }
    }
  }
  });

  const [activeSection, setActiveSection] = useState('main');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const articleSections = [
    { id: 'main', name: 'Informations principales' },
    { id: 'hero', name: 'Bannière' },
    { id: 'overview', name: 'Aperçu' },
    { id: 'businessNeed', name: 'Besoin métier' },
    { id: 'problem', name: 'Problème' },
    { id: 'research', name: 'Recherche' },
    { id: 'design', name: 'Design' },
    { id: 'project', name: 'Projet' },
    { id: 'functionality', name: 'Fonctionnalités' },
    { id: 'results', name: 'Résultats' }
  ];
  // 3. LA FONCTION MAGIQUE DE MISE À JOUR
  // Elle permet de faire : updateField('fr.Hero.title', 'Nouveau Titre')
  const updateField = (path, value) => {
    setArticle(prev => {
      // Copie profonde pour éviter les problèmes de référence
      const newArticle = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newArticle;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}; // Sécurité
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newArticle;
    });
  };

  // 4. GÉNÉRATION DE L'ID POUR LES NOUVEAUX ARTICLES
  const generateId = useCallback(async () => {
    if (isNew) {
      try {
        const newId = await generateNewArticleId();
        setArticle(prev => ({
          ...prev,
          id: newId,
          fr: {
            ...prev.fr,
            id: newId.toString()
          }
        }));
      } catch (error) {
        console.error('Erreur lors de la génération de l\'ID:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [isNew]);

  // 5. CHARGEMENT (MODE ÉDITION) ET GÉNÉRATION D'ID (MODE CRÉATION)
  useEffect(() => {
    if (!isNew) {
      const fetchArticle = async () => {
        try {
          const res = await fetch(`/api/articles/${id}`);
          const data = await res.json();
          if (res.ok) setArticle(data.article);
        } catch (err) { 
          console.error("Erreur chargement", err);
        }
      };
      fetchArticle();
    } else {
      generateId();
    }
  }, [id, isNew, generateId]);

  // 6. SAUVEGARDE
  const handleSave = async (e) => {
    e.preventDefault();
    if (isSubmitting || (isNew && !article.id)) {
      console.log('En attente de la génération de l\'ID...');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const articleToSave = {
        ...article,
        // S'assurer que l'ID est bien utilisé pour l'URL
        uniqueId: article.uniqueId || article.id.toString()
      };

      const method = isNew ? 'POST' : 'PUT';
      const url = isNew ? '/api/articles' : `/api/articles/${id}`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleToSave),
      });

      if (res.ok) {
        const savedArticle = await res.json();
        alert("Article enregistré avec succès !");
        router.push(`/admin/articles/${savedArticle.id}`);
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur détaillée:', error);
      alert(`Erreur: ${error.message || 'Une erreur est survenue lors de la sauvegarde'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 6. RENDU DES SECTIONS
  const renderMainContent = () => {
    switch(activeSection) {
      case 'main':
        return <GeneralSection data={article.fr.cards} updateField={updateField} />;
      case 'hero':
        return <HeroSection data={article.fr.Hero} updateField={updateField} />;
      default:
        return <div className="p-10 text-gray-400">Section {activeSection} en cours de développement...</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 1. Section En-tête */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {isNew ? 'Nouvel article' : 'Éditer l\'article'}
            </h1>
          </div>
          <div className="flex space-x-3">
            <Link 
              href="/admin/articles"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <FiX className="mr-2" />
              Annuler
            </Link>
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <FiSave className="mr-2" />
              {isNew ? 'Publier maintenant' : 'Mettre à jour'}
            </button>
            {!isNew && (
              <button
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 flex items-center"
                onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
              >
                <FiEye className="mr-2" />
                Prévisualiser
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Barre de contrôle */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <FiClock className="text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                {article.createdAt ? new Date(article.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'Chargement...'}
              </span>
            </div>
            <div className="flex items-center">
              <FiUser className="text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">{article.author}</span>
            </div>
            <div className="flex items-center">
              <FiEdit2 className="text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">
                {new Date(article.updatedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">ID:</span>
            <span className="text-sm font-medium">{article.id}</span>
          </div>
        </div>
      </div>

      {/* 3. Barre latérale et contenu principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* 3.1 Barre latérale des sections */}
        <div className="w-56 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">SECTIONS</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <FiPlus size={18} />
              </button>
            </div>
            <nav className="space-y-1">
              {articleSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="truncate">{section.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* 4. Contenu principal de l'éditeur */}
        <div className="flex-1 overflow-y-auto bg-gray-50 ">
          {isLoading && isNew ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="">
              {renderMainContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HeroSection({ data, updateField }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <h2 className="text-lg font-bold">Bannière (Hero)</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Titre Hero FR</label>
        <input 
          type="text" 
          value={data.title} 
          onChange={(e) => updateField('fr.Hero.title', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description Hero</label>
        <textarea 
          value={data.description} 
          onChange={(e) => updateField('fr.Hero.description', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
    </div>
  );
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-bold">Bannière (Hero)</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700">Titre Hero FR</label>
                <input 
                    type="text" 
                    value={data.title} 
                    onChange={(e) => updateField('fr.Hero.title', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description Hero</label>
                <textarea 
                    value={data.description} 
                    onChange={(e) => updateField('fr.Hero.description', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
            </div>
        </div>
    );
}