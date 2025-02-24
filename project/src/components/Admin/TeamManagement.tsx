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
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Gerenciar Equipe</h2>
        <button
          onClick={startNewMember}
          className="flex items-center px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-400 transition-colors"
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
            <form onSubmit={isAdding ? handleAddMember : handleUpdateMember} className="bg-white/5 p-6 rounded-xl mb-6">
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

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingMember(null);
                    setIsAdding(false);
                  }}
                  className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-400"
                >
                  <Save className="h-5 w-5 mr-2" />
                  {isAdding ? 'Criar Membro' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          )}

          {/* Lista de membros */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="pb-3 px-4">Ordem</th>
                  <th className="pb-3 px-4">Foto</th>
                  <th className="pb-3 px-4">Nome</th>
                  <th className="pb-3 px-4">Cargo</th>
                  <th className="pb-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {team.map((member, index) => (
                  <tr key={member.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4 px-4">
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
                    <td className="py-4 px-4">
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
                    <td className="py-4 px-4">{member.name}</td>
                    <td className="py-4 px-4">{member.role}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;