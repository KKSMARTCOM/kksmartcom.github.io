import React from 'react';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="pb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-1 text-sm text-gray-500">Bienvenue sur votre tableau de bord</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Statistiques */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700">Articles publiés</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700">Utilisateurs</h3>
          <p className="text-3xl font-bold text-green-600">1</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-700">Activité récente</h3>
          <p className="text-gray-500">Aucune activité récente</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Aperçu rapide</h2>
        <p className="text-gray-600">Bienvenue sur votre tableau de bord. Utilisez le menu de gauche pour naviguer.</p>
      </div>
    </div>
  );
}
