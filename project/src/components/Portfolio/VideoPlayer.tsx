import React from 'react';
import { getVideoEmbedUrl } from '../../utils/video';
import { VideoAspectRatio } from '../../types/portfolio';

interface VideoPlayerProps {
  url: string;
  title: string;
  aspectRatio?: VideoAspectRatio;
  dimensions?: { width: number; height: number };
}

export default function VideoPlayer({ url, title, aspectRatio, dimensions }: VideoPlayerProps) {
  const embedUrl = getVideoEmbedUrl(url);
  
  // Calculate aspect ratio padding
  const getPaddingBottom = () => {
    if (dimensions) {
      return (dimensions.height / dimensions.width) * 100;
    }
    return aspectRatio === '9:16' ? 177.78 : 56.25; // 16:9 = 56.25%, 9:16 = 177.78%
  };

  return (
    <div 
      className="relative w-full"
      style={{ paddingBottom: `${getPaddingBottom()}%` }}
    >
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg"
      />
    </div>
  );
}