import React, { useState } from 'react';
import { Play, ExternalLink, X } from 'lucide-react';
import { PortfolioItem as PortfolioItemType } from '../../types/portfolio';
import VideoPlayer from './VideoPlayer';

export default function PortfolioItem({ 
  title, 
  description, 
  type, 
  url, 
  thumbnail,
  aspectRatio,
  dimensions 
}: PortfolioItemType) {
  const [showVideo, setShowVideo] = useState(false);

  const getThumbnailClassName = () => {
    if (type === 'video' && aspectRatio === '9:16') {
      return 'h-[600px] object-cover rounded-lg';
    }
    return 'h-64 object-cover rounded-lg';
  };

  const renderMedia = () => {
    if (type === 'video' && showVideo) {
      return (
        <VideoPlayer 
          url={url} 
          title={title}
          aspectRatio={aspectRatio}
          dimensions={dimensions}
        />
      );
    }

    return (
      <div className="relative group">
        <img
          src={thumbnail}
          alt={title}
          className={getThumbnailClassName()}
        />
        {type === 'video' && (
          <button
            onClick={() => setShowVideo(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Play className="w-16 h-16 text-white" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
      {renderMedia()}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-secondary-dark mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {type === 'image' && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-primary-dark gap-2"
          >
            Ver projeto completo
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
        {type === 'video' && showVideo && (
          <button
            onClick={() => setShowVideo(false)}
            className="inline-flex items-center text-primary hover:text-primary-dark gap-2"
          >
            Fechar vídeo
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}