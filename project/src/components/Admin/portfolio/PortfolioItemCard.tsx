import React from 'react';
import { PortfolioItem } from '../../../types/portfolio';
import { Pencil, Trash2, Play } from 'lucide-react';
import { deletePortfolioItem } from '../../../services/portfolioService';

interface PortfolioItemCardProps {
  item: PortfolioItem;
  onEdit: (item: PortfolioItem) => void;
  onItemSaved: () => void;
}

export default function PortfolioItemCard({
  item,
  onEdit,
  onItemSaved
}: PortfolioItemCardProps) {
  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) {
      return;
    }

    try {
      await deletePortfolioItem(item.id);
      onItemSaved();
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative group">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Play className="w-12 h-12 text-white" />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(item)}
              className="p-1.5 text-gray-400 hover:text-primary rounded-full hover:bg-primary/5 
                transition-colors"
              title="Editar item"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 
                transition-colors"
              title="Excluir item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-sm">{item.description}</p>
        <div className="mt-2">
          <span className="text-xs font-medium text-gray-500">
            Tipo: {item.type === 'video' ? 'Vídeo' : 'Imagem'}
          </span>
        </div>
      </div>
    </div>
  );
}