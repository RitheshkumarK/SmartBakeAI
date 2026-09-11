import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useBakery } from '../../context/BakeryContext';

interface LogWasteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogWasteModal: React.FC<LogWasteModalProps> = ({ isOpen, onClose }) => {
  const { products, ingredients, logWaste } = useBakery();

  const [itemType, setItemType] = useState<'product' | 'ingredient'>('product');
  const [selectedId, setSelectedId] = useState(products[0]?.id || '');
  const [quantity, setQuantity] = useState<number>(4);
  const [reason, setReason] = useState<'Expired Date' | 'Unsold Day-End' | 'Burnt/Defect' | 'Handling Damage' | 'Trimmings'>('Unsold Day-End');
  const [notes, setNotes] = useState('');

  const currentItem = itemType === 'product' 
    ? products.find(p => p.id === selectedId) || products[0]
    : ingredients.find(i => i.id === selectedId) || ingredients[0];

  const unit = currentItem?.unit || 'units';
  const unitLoss = itemType === 'product' 
    ? (currentItem as any)?.price || 45 
    : (currentItem as any)?.cost_per_unit || 50;

  const totalLoss = Math.round(quantity * unitLoss);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentItem) return;

    logWaste({
      product_id: itemType === 'product' ? currentItem.id : undefined,
      ingredient_id: itemType === 'ingredient' ? currentItem.id : undefined,
      item_name: currentItem.name,
      quantity: Number(quantity),
      unit,
      reason,
      date: '2026-09-10',
      estimated_loss: totalLoss,
      notes: notes || undefined
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="♻️ Log Food Waste & Loss"
      subtitle="Track spoilage and overproduction to improve AI forecast accuracy"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type selector */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setItemType('product');
              setSelectedId(products[0]?.id || '');
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              itemType === 'product'
                ? 'bg-caramel-500 text-white shadow-sm'
                : 'bg-cream-100 text-chocolate-700 hover:bg-cream-200'
            }`}
          >
            Baked Product
          </button>
          <button
            type="button"
            onClick={() => {
              setItemType('ingredient');
              setSelectedId(ingredients[0]?.id || '');
            }}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              itemType === 'ingredient'
                ? 'bg-caramel-500 text-white shadow-sm'
                : 'bg-cream-100 text-chocolate-700 hover:bg-cream-200'
            }`}
          >
            Raw Ingredient
          </button>
        </div>

        {/* Item select */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
            Select Item
          </label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
          >
            {itemType === 'product'
              ? products.map(p => <option key={p.id} value={p.id}>{p.name} ({p.quantity} {p.unit} in stock)</option>)
              : ingredients.map(i => <option key={i.id} value={i.id}>{i.name} ({i.quantity} {i.unit} in stock)</option>)
            }
          </select>
        </div>

        {/* Quantity & Loss preview */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
              Wasted Quantity ({unit})
            </label>
            <input
              type="number"
              min="1"
              required
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-rose-700 mb-1.5">
              Calculated Loss
            </label>
            <div className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-extrabold text-lg flex items-center">
              ₹{totalLoss.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
            Root Cause / Reason
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value as any)}
            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
          >
            <option value="Unsold Day-End">Unsold Day-End (Overproduction)</option>
            <option value="Expired Date">Expired Date (Cold storage spoilage)</option>
            <option value="Burnt/Defect">Burnt / Defect (Oven calibration / dough failure)</option>
            <option value="Handling Damage">Handling Damage (Display tray drop / transit)</option>
            <option value="Trimmings">Trimmings (Excess pastry scrap)</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
            Shift Notes / Comments
          </label>
          <textarea
            rows={2}
            placeholder="Context on weather, shift issues, or corrective plan..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
          />
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
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-warm"
          >
            Record Waste
          </button>
        </div>
      </form>
    </Modal>
  );
};
