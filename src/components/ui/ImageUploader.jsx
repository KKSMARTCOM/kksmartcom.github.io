import { useState, useCallback } from 'react';
import { FiUpload, FiTrash2, FiImage } from 'react-icons/fi';

const ImageUploader = ({
  labelCover= 'Image miniature',
  value = '',
  onChange,
  className = '',
  maxSize = 2 * 1024 * 1024, // 2MB par défaut
  accept = 'image/png, image/jpeg, image/gif',
  label = 'Glissez-déposez une image ou cliquez pour sélectionner',
  helperText = 'Formats acceptés : PNG, JPG, GIF. Taille max : 2MB'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = useCallback((file) => {
    if (!file) return;

    // Vérification du type de fichier
    if (!file.type.match('image/(png|jpeg|gif)')) {
      setError('Format de fichier non supporté. Utilisez PNG, JPG ou GIF.');
      return;
    }

    // Vérification de la taille
    if (file.size > maxSize) {
      setError(`Le fichier est trop volumineux (max ${maxSize / (1024 * 1024)}MB)`);
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [maxSize, onChange]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleImageChange(file);
  };

  const removeImage = (e) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="space-y-1">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          <FiImage className="mr-2" /> {labelCover}
        </label>
        <div 
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${value ? 'p-1' : 'p-6'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {value ? (
            <div className="relative group">
              <img 
                src={value} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-md mx-auto"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                title="Supprimer l'image"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-center">
                <FiUpload className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">{label}</p>
              <p className="text-xs text-gray-500">{helperText}</p>
              <input
                type="file"
                accept={accept}
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      
      {/* Champ caché pour le formulaire */}
      <input 
        type="hidden" 
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ImageUploader;
