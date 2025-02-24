import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Star, 
  Gift, 
  Save, 
  X, 
  MoveUp, 
  MoveDown,
  Loader2 
} from 'lucide-react';
import { Plan, savePlan, updatePlan, deletePlan, getPlansSnapshot } from '../../services/plans';

const PlanManagement = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = getPlansSnapshot((newPlans) => {
      setPlans(newPlans);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    setError(null);
    try {
      const newPlan = {
        ...editingPlan,
        order: plans.length,
        features: editingPlan.features.filter(f => f.trim() !== '')
      };
      
      const result = await savePlan(newPlan);
      if (result.success) {
        setIsAdding(false);
        setEditingPlan(null);
      } else {
        setError('Erro ao salvar o plano');
      }
    } catch (error) {
      setError('Erro ao salvar o plano');
    }
  };

  const handleUpdatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan?.id) return;

    setError(null);
    try {
      const { id, ...planData } = editingPlan;
      const result = await updatePlan(id, {
        ...planData,
        features: planData.features.filter(f => f.trim() !== '')
      });
      
      if (result.success) {
        setEditingPlan(null);
      } else {
        setError('Erro ao atualizar o plano');
      }
    } catch (error) {
      setError('Erro ao atualizar o plano');
    }
  };

  const handleDeletePlan = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este plano?')) return;

    setError(null);
    try {
      const result = await deletePlan(id);
      if (!result.success) {
        setError('Erro ao excluir o plano');
      }
    } catch (error) {
      setError('Erro ao excluir o plano');
    }
  };

  const handleMoveOrder = async (plan: Plan, direction: 'up' | 'down') => {
    const currentIndex = plans.findIndex(p => p.id === plan.id);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= plans.length) return;
    
    const otherPlan = plans[newIndex];
    
    try {
      await updatePlan(plan.id!, { order: otherPlan.order });
      await updatePlan(otherPlan.id!, { order: plan.order });
    } catch (error) {
      setError('Erro ao reordenar os planos');
    }
  };

  const handleAddFeature = () => {
    if (!editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: [...editingPlan.features, '']
    });
  };

  const handleUpdateFeature = (index: number, value: string) => {
    if (!editingPlan) return;
    const newFeatures = [...editingPlan.features];
    newFeatures[index] = value;
    setEditingPlan({
      ...editingPlan,
      features: newFeatures
    });
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: editingPlan.features.filter((_, i) => i !== index)
    });
  };

  const startNewPlan = () => {
    setEditingPlan({
      name: '',
      price: '',
      features: [''],
      highlight: false,
      special: false,
      order: plans.length
    });
    setIsAdding(true);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Gerenciar Planos</h2>
        <button
          onClick={startNewPlan}
          className="flex items-center px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-400 transition-colors"
          disabled={isAdding || editingPlan !== null}
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Plano
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
          <p className="mt-2 text-gray-400">Carregando planos...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Form de edição/adição */}
          {editingPlan && (
            <form onSubmit={isAdding ? handleAddPlan : handleUpdatePlan} className="bg-white/5 p-6 rounded-xl mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {isAdding ? 'Novo Plano' : 'Editar Plano'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome do Plano</label>
                  <input
                    type="text"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Preço</label>
                  <input
                    type="text"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Características</label>
                {editingPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleUpdateFeature(index, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                      placeholder="Característica do plano"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="text-sm text-red-500 hover:text-red-400 flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar característica
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingPlan.highlight}
                    onChange={(e) => setEditingPlan({ ...editingPlan, highlight: e.target.checked })}
                    className="rounded border-white/10 text-red-500 focus:ring-red-500"
                  />
                  Destacar plano
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingPlan.special}
                    onChange={(e) => setEditingPlan({ ...editingPlan, special: e.target.checked })}
                    className="rounded border-white/10 text-red-500 focus:ring-red-500"
                  />
                  Plano recomendado
                </label>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingPlan(null);
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
                  {isAdding ? 'Criar Plano' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          )}

          {/* Lista de planos */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="pb-3 px-4">Ordem</th>
                  <th className="pb-3 px-4">Nome</th>
                  <th className="pb-3 px-4">Preço</th>
                  <th className="pb-3 px-4">Características</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, index) => (
                  <tr key={plan.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveOrder(plan, 'up')}
                          disabled={index === 0}
                          className="p-1 hover:bg-white/10 rounded disabled:opacity-50"
                        >
                          <MoveUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleMoveOrder(plan, 'down')}
                          disabled={index === plans.length - 1}
                          className="p-1 hover:bg-white/10 rounded disabled:opacity-50"
                        >
                          <MoveDown className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4">{plan.name}</td>
                    <td className="py-4 px-4">{plan.price}</td>
                    <td className="py-4 px-4">
                      <ul className="list-disc list-inside">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="text-sm text-gray-300">{feature}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        {plan.highlight && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-500/10 text-red-500">
                            <Star className="h-3 w-3 mr-1" />
                            Destacado
                          </span>
                        )}
                        {plan.special && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-500/10 text-purple-500">
                            <Gift className="h-3 w-3 mr-1" />
                            Recomendado
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingPlan(plan)}
                          className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg"
                          disabled={editingPlan !== null}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => plan.id && handleDeletePlan(plan.id)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                          disabled={editingPlan !== null}
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

export default PlanManagement;