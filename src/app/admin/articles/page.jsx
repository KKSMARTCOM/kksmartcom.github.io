'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiFileText, FiPlus, FiSearch, FiFilter, FiEye, FiEdit2, FiTrash2, FiClock, FiBarChart2 } from 'react-icons/fi';

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('tous');

  // Données de démonstration
  const articles = [
    {
      id: 'ART-001',
      title: 'Introduction à Next.js 14',
      status: 'publié',
      tags: ['Next.js', 'React', 'Tutoriel'],
      date: '2025-12-20',
      category: 'Technologie',
      readTime: '5 min',
      image: '/images/nextjs.jpg'
    },
    {
      id: 'ART-002',
      title: 'Les meilleures pratiques SEO',
      status: 'brouillon',
      tags: ['SEO', 'Référencement', 'Marketing'],
      date: '2025-12-18',
      category: 'Marketing',
      readTime: '8 min',
      image: '/images/seo.jpg'
    },
    {
      id: 'ART-003',
      title: 'Guide complet de React',
      status: 'publié',
      tags: ['React', 'Frontend', 'JavaScript', 'Tutoriel'],
      date: '2025-12-15',
      category: 'Développement',
      readTime: '12 min',
      image: '/images/react.jpg'
    }
  ];

  const stats = {
    total: 156,
    published: 124,
    drafts: 12,
    scheduled: 20,
    totalViews: 45289,
    avgReadTime: '6 min'
  };

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeFilter === 'tous' || article.status === activeFilter)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="pb-6">
        <h1 className="text-4xl font-bold text-gray-900">Gestion des Articles</h1>
        <p className="mt-1 text-l text-gray-500">Bienvenue sur votre tableau de bord</p>
      </div>

      {/* Barre de contrôle avec stats */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
                <FiFileText size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-lg font-semibold">{stats.total} articles</p>
              </div>
            </div>
            
            <div className="h-8 w-px bg-gray-200"></div>
            
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-green-50 text-green-600 mr-3">
                <FiEye size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Vues</p>
                <p className="text-lg font-semibold">{new Intl.NumberFormat('fr-FR').format(stats.totalViews)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-36"
                
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="published">Publiés ({stats.published})</option>
                <option value="draft">Brouillons ({stats.drafts})</option>
              </select>
              <FiFilter className="absolute right-3 top-2.5 text-gray-400" />
            </div>

            <Link 
              href="/admin/articles/nouveau"
              className="rounded-lg px-4 py-2 text-sm inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              <FiPlus className="mr-2" />
              Nouvel article
            </Link>
          </div>
        </div>
      </div>

      {/* Liste des articles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* En-tête du tableau */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-5">Article</div>
          <div className="col-span-3">Tags</div>
          <div className="col-span-1">ID</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>
        
        {/* Corps du tableau */}
        <div className="divide-y divide-gray-100">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div key={article.id} className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-gray-50 transition-colors">
                <div className="col-span-5 flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gray-200 overflow-hidden mr-4">
                    <div className="h-full w-full bg-gray-300 flex items-center justify-center text-gray-500">
                      <FiFileText className="text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{article.title}</h3>
                    <p className="text-xs text-gray-500">{article.category} • {article.readTime} de lecture</p>
                  </div>
                </div>
                
                <div className="col-span-3">
                  {article.tags && article.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 2).map((tag, i) => (
                        <span 
                          key={i}
                          className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 2 && (
                        <span className="px-2 py-1 text-xs text-gray-500">
                          +{article.tags.length - 2}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Aucun tag</span>
                  )}
                </div>
                
                <div className="col-span-1 text-sm text-gray-900 font-mono">
                  {article.id}
                </div>
                
                <div className="col-span-2">
                  <div className="text-sm text-gray-900">
                    {new Date(article.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(article.date).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                
                <div className="col-span-1 flex justify-end space-x-2">
                  <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50">
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50">
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50">
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                <FiFileText className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun article trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm 
                  ? 'Aucun résultat pour votre recherche.'
                  : activeFilter !== 'tous'
                    ? `Aucun article dans la catégorie "${activeFilter}".`
                    : 'Commencez par créer votre premier article.'
                }
              </p>
              <div className="mt-6">
                <Link
                  href="/admin/articles/nouveau"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                  Nouvel article
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* Pied de tableau */}
        {filteredArticles.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Précédent
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Suivant
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Affichage de <span className="font-medium">1</span> à <span className="font-medium">3</span> sur{' '}
                  <span className="font-medium">3</span> résultats
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Précédent</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Suivant</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
