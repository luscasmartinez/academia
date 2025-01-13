import React from 'react';
import { PortfolioItem } from '../../../types/portfolio';
import { Loader2 } from 'lucide-react';
import PortfolioItemCard from './PortfolioItemCard';

interface PortfolioItemsListProps {
  items: PortfolioItem[];
  isLoading: boolean;
  onEdit: (item: PortfolioItem) => void;
  onItemSaved: () => void;
}

export default function PortfolioItemsList({
  items,
  isLoading,
  onEdit,
  onItemSaved
}: PortfolioItemsListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum item no portfólio ainda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4 md:px-0">
      {items.map((item) => (
        <PortfolioItemCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onItemSaved={onItemSaved}
        />
      ))}
    </div>
  );
}