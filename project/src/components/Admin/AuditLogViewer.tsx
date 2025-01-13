import React, { useState, useEffect } from 'react';
import { getAuditLogs } from '../../services/auditService';
import { AuditLog } from '../../types/audit';
import { Loader2, Clock, User, Filter } from 'lucide-react';

export default function AuditLogViewer() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    module: '' as AuditLog['module'] | '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    loadLogs();
  }, [filters]);

  const loadLogs = async () => {
    try {
      setIsLoading(true);
      const filterParams = {
        ...(filters.module && { module: filters.module }),
        ...(filters.startDate && { startDate: new Date(filters.startDate) }),
        ...(filters.endDate && { endDate: new Date(filters.endDate) })
      };
      
      const auditLogs = await getAuditLogs(filterParams);
      setLogs(auditLogs);
    } catch (error) {
      console.error('Error loading audit logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Módulo
            </label>
            <select
              value={filters.module}
              onChange={(e) => setFilters(prev => ({ ...prev, module: e.target.value as AuditLog['module'] }))}
              className="rounded-lg border-gray-300 focus:ring-primary focus:border-primary"
            >
              <option value="">Todos</option>
              <option value="portfolio">Portfólio</option>
              <option value="testimonials">Depoimentos</option>
              <option value="users">Usuários</option>
              <option value="submissions">Submissões</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Inicial
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
              className="rounded-lg border-gray-300 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Final
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
              className="rounded-lg border-gray-300 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Módulo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detalhes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.timestamp.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.userEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.module}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}