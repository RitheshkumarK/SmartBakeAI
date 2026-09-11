import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  SlidersHorizontal, 
  LayoutGrid, 
  Table, 
  Layers, 
  AlertTriangle,
  ArrowUpDown,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { Badge } from '../components/common/Badge';
import { StockAdjustModal } from '../components/forms/StockAdjustModal';

interface InventoryViewProps {
  onOpenAddModal: (type: 'product' | 'ingredient') => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ onOpenAddModal }) => {
  const { 
    products, 
    ingredients, 
    deleteProduct, 
    deleteIngredient,
    setActiveTab
  } = useBakery();

  // Tab: 'products' or 'ingredients'
  const [activeTab, setActiveInventoryTab] = useState<'products' | 'ingredients'>('products');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'stock' | 'expiry' | 'price'>('name');

  // Stock Adjust Modal state
  const [adjustTarget, setAdjustTarget] = useState<{
    id: string;
    name: string;
    type: 'product' | 'ingredient';
    currentQty: number;
    unit: string;
  } | null>(null);

  // Categories list
  const productCategories = ['All', 'Breads', 'Cakes & Gateaux', 'Viennoiserie & Pastries', 'Muffins & Cupcakes', 'Donuts', 'Savory & Puffs'];
  const ingredientCategories = ['All', 'Flour & Grains', 'Sweeteners', 'Dairy & Eggs', 'Fats & Oils', 'Chocolates & Cocoa', 'Leaveners & Yeast'];

  const currentCategories = activeTab === 'products' ? productCategories : ingredientCategories;

  // Filter and sort items
  const rawList = activeTab === 'products' ? products : ingredients;

  const filteredItems = rawList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'stock') return a.quantity - b.quantity;
    if (sortBy === 'expiry') return new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime();
    if (sortBy === 'price') {
      const priceA = (a as any).price || (a as any).cost_per_unit || 0;
      const priceB = (b as any).price || (b as any).cost_per_unit || 0;
      return priceB - priceA;
    }
    return 0;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-chocolate-950 tracking-tight">
            Inventory Management 📦
          </h1>
          <p className="text-sm text-chocolate-600 mt-1">
            Manage finished baked products and raw ingredient stock levels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenAddModal(activeTab === 'products' ? 'product' : 'ingredient')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-xs sm:text-sm shadow-warm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add {activeTab === 'products' ? 'Product' : 'Ingredient'}</span>
          </button>
        </div>
      </div>

      {/* Primary Tab Switcher: Baked Products vs Raw Ingredients */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-cream-200">
        <div className="flex bg-cream-200/80 p-1 rounded-2xl w-fit">
          <button
            onClick={() => {
              setActiveInventoryTab('products');
              setSelectedCategory('All');
            }}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-white text-chocolate-950 shadow-warm-sm'
                : 'text-chocolate-600 hover:text-chocolate-900'
            }`}
          >
            <span>🥐 Baked Products (Ready to Sell)</span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-cream-200 text-chocolate-800">
              {products.length}
            </span>
          </button>
          <button
            onClick={() => {
              setActiveInventoryTab('ingredients');
              setSelectedCategory('All');
            }}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'ingredients'
                ? 'bg-white text-chocolate-950 shadow-warm-sm'
                : 'text-chocolate-600 hover:text-chocolate-900'
            }`}
          >
            <span>🌾 Raw Ingredients & Supplies</span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-cream-200 text-chocolate-800">
              {ingredients.length}
            </span>
          </button>
        </div>

        {/* View mode toggle (Cards vs Table) */}
        <div className="flex items-center gap-2">
          <div className="flex bg-cream-100 p-1 rounded-xl border border-cream-300/80">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'cards' ? 'bg-white text-chocolate-900 shadow-sm' : 'text-chocolate-500'}`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white text-chocolate-900 shadow-sm' : 'text-chocolate-500'}`}
              title="Spreadsheet Table View"
            >
              <Table className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        {/* Search */}
        <div className="lg:col-span-5 relative">
          <Search className="w-4 h-4 text-chocolate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={`Search ${activeTab === 'products' ? 'products' : 'ingredients'} or suppliers...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-cream-300/90 text-chocolate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 shadow-warm-sm"
          />
        </div>

        {/* Category select */}
        <div className="lg:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-cream-300/90 text-chocolate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 shadow-warm-sm"
          >
            {currentCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Status filter */}
        <div className="lg:col-span-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-cream-300/90 text-chocolate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 shadow-warm-sm"
          >
            <option value="all">All Statuses</option>
            <option value="healthy">🟢 Healthy</option>
            <option value="low">🟡 Low Stock</option>
            <option value="critical">🔴 Critical</option>
          </select>
        </div>

        {/* Sort by */}
        <div className="lg:col-span-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-cream-300/90 text-chocolate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 shadow-warm-sm"
          >
            <option value="name">Sort: Name</option>
            <option value="stock">Sort: Stock Level</option>
            <option value="expiry">Sort: Expiry Date</option>
            <option value="price">Sort: Price / Cost</option>
          </select>
        </div>
      </div>

      {/* Content Area: Cards or Table */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map(item => {
            const isProduct = activeTab === 'products';
            const priceOrCost = isProduct ? (item as any).price : (item as any).cost_per_unit;
            const stockPct = Math.min(100, Math.round((item.quantity / Math.max(1, item.minimum_stock * 2)) * 100));

            return (
              <div
                key={item.id}
                className="rounded-3xl glass-card border border-cream-200 hover:border-caramel-400/70 shadow-warm hover:shadow-warm-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image & Status Badge Header */}
                  <div className="relative h-40 overflow-hidden bg-chocolate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white">
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge status={item.status} size="sm">
                        {item.status === 'healthy' ? 'Healthy' : (item.status === 'low' ? 'Low Stock' : 'Critical')}
                      </Badge>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5">
                    <h3 className="font-bold text-base text-chocolate-950 tracking-tight truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-chocolate-500 mt-0.5">
                      Supplier: {item.supplier}
                    </p>

                    {/* Stock Level Progress */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-chocolate-900">
                          {item.quantity} {item.unit}
                        </span>
                        <span className="text-[11px] text-chocolate-500">
                          Min: {item.minimum_stock} {item.unit}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-cream-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.status === 'critical' 
                              ? 'bg-rose-500' 
                              : (item.status === 'low' ? 'bg-amber-500' : 'bg-emerald-500')
                          }`}
                          style={{ width: `${stockPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Meta Row: Price & Expiry */}
                    <div className="mt-4 pt-3 border-t border-cream-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] font-semibold text-chocolate-400 uppercase">
                          {isProduct ? 'Price' : 'Cost'}
                        </span>
                        <div className="font-extrabold text-chocolate-950 text-sm">₹{priceOrCost}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-semibold text-chocolate-400 uppercase">Expires</span>
                        <div className="font-medium text-chocolate-700 text-xs">{item.expiry_date}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-3 bg-cream-50/80 border-t border-cream-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setAdjustTarget({
                      id: item.id,
                      name: item.name,
                      type: isProduct ? 'product' : 'ingredient',
                      currentQty: item.quantity,
                      unit: item.unit
                    })}
                    className="flex-1 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-caramel-50 text-caramel-700 border border-caramel-300 transition-colors shadow-warm-sm"
                  >
                    Adjust Stock
                  </button>
                  <button
                    onClick={() => isProduct ? deleteProduct(item.id) : deleteIngredient(item.id)}
                    className="p-1.5 rounded-xl text-chocolate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-3xl glass-card border border-cream-200 shadow-warm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-100/80 border-b border-cream-200 text-chocolate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Item</th>
                  <th className="py-3.5 px-3">Category</th>
                  <th className="py-3.5 px-3 text-center">Current Stock</th>
                  <th className="py-3.5 px-3 text-center">Safety Min</th>
                  <th className="py-3.5 px-3 text-center">Price / Cost</th>
                  <th className="py-3.5 px-3">Expiry Date</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100">
                {filteredItems.map(item => {
                  const isProduct = activeTab === 'products';
                  const priceOrCost = isProduct ? (item as any).price : (item as any).cost_per_unit;
                  return (
                    <tr key={item.id} className="hover:bg-cream-100/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-chocolate-950 flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-9 h-9 rounded-xl object-cover" />
                        <div>
                          <div>{item.name}</div>
                          <div className="text-[10px] text-chocolate-500 font-normal">{item.supplier}</div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-chocolate-700">{item.category}</td>
                      <td className="py-3 px-3 text-center font-bold text-chocolate-900">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="py-3 px-3 text-center text-chocolate-500">
                        {item.minimum_stock} {item.unit}
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-chocolate-950">
                        ₹{priceOrCost}
                      </td>
                      <td className="py-3 px-3 text-chocolate-700 font-medium">
                        {item.expiry_date}
                      </td>
                      <td className="py-3 px-3">
                        <Badge status={item.status} size="sm">
                          {item.status === 'healthy' ? 'Healthy' : (item.status === 'low' ? 'Low Stock' : 'Critical')}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => setAdjustTarget({
                            id: item.id,
                            name: item.name,
                            type: isProduct ? 'product' : 'ingredient',
                            currentQty: item.quantity,
                            unit: item.unit
                          })}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-cream-100 hover:bg-caramel-50 text-caramel-800 border border-cream-300"
                        >
                          Adjust
                        </button>
                        <button
                          onClick={() => isProduct ? deleteProduct(item.id) : deleteIngredient(item.id)}
                          className="p-1 text-chocolate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stock Adjust Modal */}
      {adjustTarget && (
        <StockAdjustModal
          isOpen={!!adjustTarget}
          onClose={() => setAdjustTarget(null)}
          itemId={adjustTarget.id}
          itemName={adjustTarget.name}
          itemType={adjustTarget.type}
          currentQty={adjustTarget.currentQty}
          unit={adjustTarget.unit}
        />
      )}
    </div>
  );
};
