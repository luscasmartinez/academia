export interface Comment {
  text: string;
  createdAt: number;
}

export interface FormData {
  id?: string;
  businessName: string;
  email: string;
  phone: string;
  businessDescription: string;
  ideas: string;
  services: string[];
  createdAt: any;
  status?: 'pending' | 'completed';
  comments?: Comment[];
}