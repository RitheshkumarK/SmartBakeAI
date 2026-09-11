import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useBakery } from '../../context/BakeryContext';
import { Plus, Minus } from 'lucide-react';

interface StockAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  itemName: string;
  itemType: 'product' | 'ingredient';
  currentQty: number;
  unit: string;
}

export const StockAdjustModal: React.FC<StockAdjustModalProps> = ({
  isOpen,
  onClose,
  itemId,
  itemName,
  itemType,
  currentQty,
  unit
}) => {
  const { adjustProductStock, adjustIngredientStock } = useBakery();
  const [delta, setDelta] = useState<number>(5);
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [reason, setReason] = useState('Daily Morning Replenishment');

  const reasons = [
    'Daily Morning Replenishment',
    'Emergency Batch Bake',
    'Inventory Count Discrepancy',
    'Damaged in Showcase',
    'Staff Tasting / Quality Audit',
    'Vendor Direct Restock'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDelta = mode === 'add' ? delta : -delta;
    if (itemType === 'product') {
      adjustProductStock(itemId, finalDelta, reason);
    } else {
      adjustIngredientStock(itemId, finalDelta);
    }
    onClose();
  };

  const resultingQty = Math.max(0, mode === 'add' ? currentQty + delta : currentQty - delta);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="📦 Quick Stock Adjustment"
      subtitle={`Adjusting stock level for ${itemName}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current vs New preview */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-cream-100/80 border border-cream-200">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-chocolate-500">Current Stock</div>
            <div className="text-xl font-bold text-chocolate-900 mt-0.5">{currentQty} {unit}</div>
          </div>
          <div className="border-l border-cream-300/80 pl-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-caramel-700">Resulting Stock</div>
            <div className="text-xl font-bold text-caramel-600 mt-0.5">{resultingQty} {unit}</div>
          </div>
        </div>

        {/* Add / Deduct toggle */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode('add')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${
              mode === 'add'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white border border-cream-300 text-chocolate-700 hover:bg-cream-100'
            }`}
          >
            <Plus className="w-4 h-4" /> Add Stock (+)
          </button>
          <button
            type="button"
            onClick={() => setMode('remove')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${
              mode === 'remove'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-white border border-cream-300 text-chocolate-700 hover:bg-cream-100'
            }`}
          >
            <Minus className="w-4 h-4" /> Deduct Stock (-)
          </button>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
            Adjustment Quantity ({unit})
          </label>
          <input
            type="number"
            min="1"
            required
            value={delta}
            onChange={(e) => setDelta(Math.max(1, Number(e.target.value)))}
            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 font-bold text-base focus:outline-none focus:ring-2 focus:ring-caramel-500"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
            Reason for Adjustment
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
          >
            {reasons.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
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
            Save Adjustment
          </button>
        </div>
      </form>
    </Modal>
  );
};
