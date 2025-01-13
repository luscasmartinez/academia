import React from 'react';
import PortfolioItem from './PortfolioItem';
import { PortfolioItem as PortfolioItemType } from '../../types/portfolio';

interface PortfolioGridProps {
  items: PortfolioItemType[];
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum item no portfólio ainda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] auto-rows-[minmax(200px,auto)] gap-6">
      {items.map((item) => (
        <div 
          key={item.id} 
          className={`${
            item.type === 'video' && item.aspectRatio === '9:16'
              ? 'row-span-2'  // Vídeos verticais ocupam 2 linhas
              : ''
          }`}
        >
          <PortfolioItem {...item} />
        </div>
      ))}
    </div>
  );
}