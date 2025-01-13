export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  details: string;
  timestamp: Date;
  module: 'portfolio' | 'testimonials' | 'users' | 'submissions';
}