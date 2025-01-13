import React, { useState, useEffect } from 'react';
import PortfolioHeader from './PortfolioHeader';
import PortfolioGrid from './PortfolioGrid';
import { getPortfolioItems } from '../../services/portfolioService';
import { PortfolioItem } from '../../types/portfolio';
import { Loader2 } from 'lucide-react';

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <section className="py-24 bg-[#F1003E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioHeader />
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : (
          <PortfolioGrid items={items} />
        )}

        
      </div>
      
    </section>

    
  );
}