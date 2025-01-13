import React from 'react';
import { VideoAspectRatio } from '../../../types/portfolio';
import { MonitorSmartphone, Smartphone } from 'lucide-react';

interface VideoAspectRatioSelectorProps {
  value: VideoAspectRatio;
  onChange: (ratio: VideoAspectRatio) => void;
}

export default function VideoAspectRatioSelector({ value, onChange }: VideoAspectRatioSelectorProps) {
  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={() => onChange('16:9')}
        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
          value === '16:9' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/30'
        }`}
      >
        <MonitorSmartphone className={`w-8 h-8 ${value === '16:9' ? 'text-primary' : 'text-gray-500'}`} />
        <span className={`text-sm font-medium ${value === '16:9' ? 'text-primary' : 'text-gray-700'}`}>
          Horizontal (16:9)
        </span>
      </button>

      <button
        type="button"
        onClick={() => onChange('9:16')}
        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
          value === '9:16' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/30'
        }`}
      >
        <Smartphone className={`w-8 h-8 ${value === '9:16' ? 'text-primary' : 'text-gray-500'}`} />
        <span className={`text-sm font-medium ${value === '9:16' ? 'text-primary' : 'text-gray-700'}`}>
          Vertical (9:16)
        </span>
      </button>
    </div>
  );
}