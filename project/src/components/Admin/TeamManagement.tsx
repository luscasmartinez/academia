import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  MoveUp, 
  MoveDown,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import { TeamMember, saveTeamMember, updateTeamMember, deleteTeamMember, getTeamSnapshot } from '../../services/team';

const TeamManagement = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = getTeamSnapshot((newTeam) => {
      setTeam(newTeam);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    setError(null);
    try {
      const newMember = {
        ...editingMember,
        order: team.length
      };
      
      const result = await saveTeamMember(newMember);
      if (result.success) {
        setIsAdding(false);
        setEditingMember(null);
      } else {
        setError('Erro ao salvar membro da equipe');
      }
    } catch (error) {
      setError('Erro ao salvar membro da equipe');
    }
  };

  const handleUpdateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember?.id) return;

    setError(null);
    try {
      const { id, ...memberData } = editingMember;
      const result = await updateTeamMember(id, memberData);
      
      if (result.success) {
        setEditingMember(null);
      } else {
        setError('Erro ao atualizar membro da equipe');
      }
    } catch (error) {
      setError('Erro ao atualizar membro da equipe');
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este membro da equipe?')) return;

    setError(null);
    try {
      const result = await deleteTeamMember(id);
      if (!result.success) {
        setError('Erro ao excluir membro da equipe');
      }
    } catch (error) {
      setError('Erro ao excluir membro da equipe');
    }
  };

  const handleMoveOrder = async (member: TeamMember, direction: 'up' | 'down') => {
    const currentIndex = team.findIndex(m => m.id === member.id);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= team.length) return;
    
    const otherMember = team[newIndex];
    
    try {
      await updateTeamMember(member.id!, { order: otherMember.order });
      await updateTeamMember(otherMember.id!, { order: member.order });
    } catch (error) {
      setError('Erro ao reordenar a equipe');
    }
  };

  const startNewMember = () => {
    setEditingMember({
      name: '',
      role: '',
      image: '',
      order: team.length
    });
    setIsAdding(true);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold">Gerenciar Equipe</h2>
        <button
          onClick={startNewMember}
          className="flex items-center justify-center px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-400 transition-colors w-full sm:w-auto"
          disabled={isAdding || editingMember !== null}
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Membro
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <Loader2 className="animate-spin h-8 w-8 mx-auto text-red-500" />
          <p className="mt-2 text-gray-400">Carregando equipe...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Form de edição/adição */}
          {editingMember && (
            <form onSubmit={isAdding ? handleAddMember : handleUpdateMember} className="bg-white/5 p-4 sm:p-6 rounded-xl mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {isAdding ? 'Novo Membro' : 'Editar Membro'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome</label>
                  <input
                    type="text"
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Cargo</label>
                  <input
                    type="text"
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">URL da Imagem</label>
                <input
                  type="url"
                  value={editingMember.image}
                  onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                  placeholder="https://exemplo.com/imagem.jpg"
                  required
                />
                <p className="text-sm text-gray-400 mt-1">Use uma URL de imagem do Unsplash ou similar</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingMember(null);
                    setIsAdding(false);
                  }}
                  className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 w-full sm:w-auto"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-400 w-full sm:w-auto"
                >
                  <Save className="h-5 w-5 mr-2" />
                  {isAdding ? 'Criar Membro' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          )}

          {/* Lista de membros - Versão para desktop */}
          <div className="hidden md:block overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-white/5">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ordem</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Foto</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nome</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cargo</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/5 divide-y divide-white/10">
                    {team.map((member, index) => (
                      <tr key={member.id} className="hover:bg-white/10">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleMoveOrder(member, 'up')}
                              disabled={index === 0}
                              className="p-1 hover:bg-white/10 rounded disabled:opacity-50"
                            >
                              <MoveUp className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleMoveOrder(member, 'down')}
                              disabled={index === team.length - 1}
                              className="p-1 hover:bg-white/10 rounded disabled:opacity-50"
                            >
                              <MoveDown className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">{member.name}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{member.role}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingMember(member)}
                              className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg"
                              disabled={editingMember !== null}
                              title="Editar"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => member.id && handleDeleteMember(member.id)}
                              className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                              disabled={editingMember !== null}
                              title="Excluir"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Lista de membros - Versão para mobile */}
          <div className="md:hidden space-y-4">
            {team.map((member, index) => (
              <div key={member.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-gray-400">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingMember(member)}
                      className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg"
                      disabled={editingMember !== null}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => member.id && handleDeleteMember(member.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                      disabled={editingMember !== null}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex justify-between">
                  <div className="text-xs text-gray-400">Ordem: {member.order + 1}</div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveOrder(member, 'up')}
                      disabled={index === 0}
                      className="p-1 hover:bg-white/10 rounded disabled:opacity-50"
                    >
                      <MoveUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleMoveOrder(member, 'down')}
                      disabled={index === team.length - 1}
                      className="p-1 hover:bg-white/10 rounded disabled:opacity-50"
                    >
                      <MoveDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;