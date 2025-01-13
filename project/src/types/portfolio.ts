export type VideoAspectRatio = '16:9' | '9:16';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'image';
  url: string;
  thumbnail: string;
  aspectRatio?: VideoAspectRatio;
  dimensions?: {
    width: number;
    height: number;
  };
  createdAt: any;
}