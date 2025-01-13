import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { PortfolioItem } from '../../../types/portfolio';
import { getPortfolioItems } from '../../../services/portfolioService';
import PortfolioItemsList from './PortfolioItemsList';
import PortfolioItemModal from './PortfolioItemModal';

export default function PortfolioManagement() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    loadPortfolioItems();
  }, []);

  const loadPortfolioItems = async () => {
    try {
      const data = await getPortfolioItems();
      setItems(data);
    } catch (error) {
      console.error('Error loading portfolio items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
    setShowModal(false);
  };

  const handleItemSaved = () => {
    loadPortfolioItems();
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciar Portfólio</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark 
            transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Novo Item
        </button>
      </div>

      <PortfolioItemsList
        items={items}
        isLoading={isLoading}
        onEdit={handleEdit}
        onItemSaved={handleItemSaved}
      />

      <PortfolioItemModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSaved={handleItemSaved}
        editingItem={editingItem}
      />
    </div>
  );
}