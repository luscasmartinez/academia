import { useAuth } from './useAuth';
import { logAction } from '../services/auditService';
import { AuditLog } from '../types/audit';

export const useAudit = () => {
  const { user } = useAuth();

  const log = async (
    action: string,
    details: string,
    module: AuditLog['module']
  ) => {
    if (!user?.email || !user?.uid) return;

    await logAction(
      user.uid,
      user.email,
      action,
      details,
      module
    );
  };

  return { log };
};