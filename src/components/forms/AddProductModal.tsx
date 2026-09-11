import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useBakery } from '../../context/BakeryContext';
import { ProductCategory, IngredientCategory } from '../../types/bakery';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'product' | 'ingredient';
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, type }) => {
  const { addProduct, addIngredient } = useBakery();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('Breads');
  const [quantity, setQuantity] = useState<number>(20);
  const [unit, setUnit] = useState<string>(type === 'product' ? 'units' : 'kg');
  const [minStock, setMinStock] = useState<number>(15);
  const [price, setPrice] = useState<number>(80);
  const [cost, setCost] = useState<number>(35);
  const [supplier, setSupplier] = useState(type === 'product' ? 'In-House Bakery' : 'Golden Grain Mills Ltd.');
  const [expiryDate, setExpiryDate] = useState('2026-09-14');
  const [shelfLifeDays, setShelfLifeDays] = useState(2);
  const [description, setDescription] = useState('');

  const productCategories: ProductCategory[] = [
    'Breads',
    'Cakes & Gateaux',
    'Viennoiserie & Pastries',
    'Muffins & Cupcakes',
    'Donuts',
    'Savory & Puffs'
  ];

  const ingredientCategories: IngredientCategory[] = [
    'Flour & Grains',
    'Sweeteners',
    'Dairy & Eggs',
    'Fats & Oils',
    'Chocolates & Cocoa',
    'Leaveners & Yeast',
    'Spices & Flavoring',
    'Packaging'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (type === 'product') {
      addProduct({
        name,
        category: category as ProductCategory,
        price: Number(price),
        cost: Number(cost),
        quantity: Number(quantity),
        unit,
        minimum_stock: Number(minStock),
        supplier,
        expiry_date: expiryDate,
        shelf_life_days: Number(shelfLifeDays),
        description: description || `${name} freshly baked daily.`,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80'
      });
    } else {
      addIngredient({
        name,
        category: category as IngredientCategory,
        quantity: Number(quantity),
        unit: unit as any,
        minimum_stock: Number(minStock),
        cost_per_unit: Number(cost),
        supplier,
        expiry_date: expiryDate,
        image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=200&auto=format&fit=crop&q=80'
      });
    }

    onClose();
    // Reset
    setName('');
    setDescription('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === 'product' ? '✨ Add Baked Product' : '📦 Add Raw Ingredient'}
      subtitle={type === 'product' ? 'Register a ready-to-sell bakery item' : 'Track raw material supplies & inventory'}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
            {type === 'product' ? 'Product Name' : 'Ingredient Name'} *
          </label>
          <input
            type="text"
            required
            placeholder={type === 'product' ? 'e.g. Sourdough Baguette' : 'e.g. Almond Flour'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
            >
              {type === 'product' 
                ? productCategories.map(c => <option key={c} value={c}>{c}</option>)
                : ingredientCategories.map(c => <option key={c} value={c}>{c}</option>)
              }
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
              Initial Quantity & Unit
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                required
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-2/3 px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
              />
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="unit"
                className="w-1/3 px-3 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 text-center"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
              {type === 'product' ? 'Selling Price (₹)' : 'Unit Cost (₹)'}
            </label>
            <input
              type="number"
              min="0"
              required
              value={type === 'product' ? price : cost}
              onChange={(e) => type === 'product' ? setPrice(Number(e.target.value)) : setCost(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
              Minimum Safety Stock
            </label>
            <input
              type="number"
              min="0"
              required
              value={minStock}
              onChange={(e) => setMinStock(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
              Expiry Date
            </label>
            <input
              type="date"
              required
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
              Supplier / Source
            </label>
            <input
              type="text"
              required
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
            />
          </div>
        </div>

        {type === 'product' && (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
              Product Description
            </label>
            <textarea
              rows={2}
              placeholder="Flavors, crust style, allergen notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
            />
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-cream-200">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-chocolate-700 hover:bg-cream-200/70 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-caramel-500 hover:bg-caramel-600 text-white shadow-warm transition-all"
          >
            {type === 'product' ? 'Save Baked Product' : 'Save Ingredient'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
