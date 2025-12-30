'use client';
import { FiImage, FiTrash2, FiLink, FiEye } from 'react-icons/fi';

export default function ImageInput({ label, value, onChange, placeholder = "/assets/uploads/..." }) {
  
  const hasImage = value && value.length > 5;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}

      <div className={`relative group border-2 border-dashed rounded-xl transition-all duration-200 overflow-hidden ${
        hasImage 
        ? 'border-blue-400 bg-blue-50' 
        : 'border-gray-300 bg-gray-50 hover:border-blue-400'
      }`}>
        
        {/* Zone d'affichage / Preview */}
        {hasImage ? (
          <div className="relative h-48 w-full bg-white flex items-center justify-center">
            <img 
              src={value} 
              alt="Preview" 
              className="h-full w-full object-contain p-2"
              onError={(e) => {
                e.target.src = "https://placehold.co/600x400?text=Image+Introuvable";
              }}
            />
            
            {/* Overlay au survol */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
              <a 
                href={value} 
                target="_blank" 
                className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 shadow-lg"
                title="Voir en grand"
              >
                <FiEye size={20} />
              </a>
              <button 
                onClick={() => onChange('')}
                className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50 shadow-lg"
                title="Supprimer"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="h-48 flex flex-col items-center justify-center text-gray-400">
            <FiImage size={48} className="mb-2 opacity-20" />
            <p className="text-xs">Aucune image sélectionnée</p>
          </div>
        )}

        {/* Barre d'input URL en bas */}
        <div className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
          <div className="text-gray-400">
            <FiLink size={16} />
          </div>
          <input 
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 text-sm outline-none border-none focus:ring-0 placeholder:text-gray-300"
            placeholder={placeholder}
          />
        </div>
      </div>
      
      {/* Helper text optionnel */}
      <p className="text-[10px] text-gray-400 italic uppercase tracking-wider px-1">
        Chemin relatif ou URL complète
      </p>
    </div>
  );
}