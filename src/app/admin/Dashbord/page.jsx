"use client";

import { FiTrendingUp, FiUsers, FiDollarSign, FiPackage, FiActivity } from 'react-icons/fi';

export default function Dashboard() {
  // Données factices pour les cartes de statistiques
  const stats = [
    { 
      title: 'Ventes totales', 
      value: '24,780', 
      change: '+12.5%', 
      icon: <FiTrendingUp className="w-6 h-6" />,
      trend: 'up',
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200'
    },
    { 
      title: 'Nouveaux clients', 
      value: '1,245', 
      change: '+8.3%', 
      icon: <FiUsers className="w-6 h-6" />,
      trend: 'up',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200'
    },
    { 
      title: 'Revenus', 
      value: '$48,560', 
      change: '-2.4%', 
      icon: <FiDollarSign className="w-6 h-6" />,
      trend: 'down',
      color: 'text-red-500',
      bgColor: 'bg-red-100',
      borderColor: 'border-red-200'
    },
    { 
      title: 'Commandes', 
      value: '1,845', 
      change: '+5.7%', 
      icon: <FiPackage className="w-6 h-6" />,
      trend: 'up',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-200'
    },
  ];

  // Données factices pour le graphique d'activité
  const activityData = [
    { day: 'Lun', value: 30 },
    { day: 'Mar', value: 45 },
    { day: 'Mer', value: 25 },
    { day: 'Jeu', value: 60 },
    { day: 'Ven', value: 40 },
    { day: 'Sam', value: 35 },
    { day: 'Dim', value: 50 },
  ];

  // Trouver la valeur maximale pour l'échelle du graphique
  const maxValue = Math.max(...activityData.map(item => item.value));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-1 text-sm text-gray-500">Bienvenue sur votre tableau de bord</p>
      </div>
    </div>
  );
}