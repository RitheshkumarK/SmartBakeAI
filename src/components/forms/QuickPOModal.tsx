import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useBakery } from '../../context/BakeryContext';

interface QuickPOModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultIngredientId?: string;
}

export const QuickPOModal: React.FC<QuickPOModalProps> = ({
  isOpen,
  onClose,
  defaultIngredientId
}) => {
  const { ingredients, addPurchaseItem } = useBakery();

  const [ingredientId, setIngredientId] = useState(defaultIngredientId || ingredients[0]?.id || '');
  const [qty, setQty] = useState<number>(10);
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [requiredDate, setRequiredDate] = useState('2026-09-11');

  const selectedIng = ingredients.find(i => i.id === ingredientId) || ingredients[0];
  const unitCost = selectedIng?.cost_per_unit || 50;
  const totalCost = qty * unitCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIng) return;

    addPurchaseItem({
      ingredient: selectedIng.name,
      ingredient_id: selectedIng.id,
      current_stock: selectedIng.quantity,
      predicted_requirement: selectedIng.minimum_stock,
      recommended_purchase: Number(qty),
      unit: selectedIng.unit,
      supplier: selectedIng.supplier,
      cost_per_unit: unitCost,
      total_cost: totalCost,
      priority,
      status: 'Pending',
      order_date: '2026-09-10',
      required_date: requiredDate
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🛒 Create Purchase Order"
      subtitle="Restock bakery raw materials and ingredients"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
            Ingredient
          </label>
          <select
            value={ingredientId}
            onChange={(e) => setIngredientId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
          >
            {ingredients.map(i => (
              <option key={i.id} value={i.id}>
                {i.name} (Current: {i.quantity} {i.unit}, Min: {i.minimum_stock} {i.unit})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
              Order Quantity ({selectedIng?.unit})
            </label>
            <input
              type="number"
              min="1"
              required
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
            >
              <option value="High">🔴 High (Immediate)</option>
              <option value="Medium">🟡 Medium (48 hrs)</option>
              <option value="Low">🟢 Low (Routine)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
              Required Delivery Date
            </label>
            <input
              type="date"
              required
              value={requiredDate}
              onChange={(e) => setRequiredDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
              Estimated Total Cost
            </label>
            <div className="px-4 py-2 rounded-xl bg-cream-100 border border-cream-300 text-chocolate-900 font-extrabold text-base flex items-center">
              ₹{totalCost.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-cream-100/70 border border-cream-200 text-xs text-chocolate-600">
          <span className="font-bold text-chocolate-800">Supplier:</span> {selectedIng?.supplier} {selectedIng?.supplier_phone && `(${selectedIng.supplier_phone})`}
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-cream-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-chocolate-700 hover:bg-cream-200/70"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-caramel-500 hover:bg-caramel-600 text-white shadow-warm"
          >
            Create Purchase Order
          </button>
        </div>
      </form>
    </Modal>
  );
};
