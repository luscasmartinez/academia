import React from 'react';
import { Archive, Inbox } from 'lucide-react';

interface AdminTabsProps {
  showArchived: boolean;
  onToggleArchived: () => void;
}

export default function AdminTabs({ showArchived, onToggleArchived }: AdminTabsProps) {
  return (
    <div className="mb-8">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => !showArchived && onToggleArchived()}
            className={`
              ${!showArchived 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
              whitespace-nowrap py-4 px-1 border-b-2 font-medium flex items-center gap-2
            `}
          >
            <Inbox className="w-5 h-5" />
            Ativos
          </button>
          <button
            onClick={() => showArchived && onToggleArchived()}
            className={`
              ${showArchived 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
              whitespace-nowrap py-4 px-1 border-b-2 font-medium flex items-center gap-2
            `}
          >
            <Archive className="w-5 h-5" />
            Arquivados
          </button>
        </nav>
      </div>
    </div>
  );
}