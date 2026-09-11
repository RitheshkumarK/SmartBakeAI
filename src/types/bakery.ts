export type ProductCategory = 
  | 'Breads' 
  | 'Cakes & Gateaux' 
  | 'Viennoiserie & Pastries' 
  | 'Muffins & Cupcakes' 
  | 'Donuts' 
  | 'Savory & Puffs';

export type IngredientCategory = 
  | 'Flour & Grains' 
  | 'Sweeteners' 
  | 'Dairy & Eggs' 
  | 'Fats & Oils' 
  | 'Chocolates & Cocoa' 
  | 'Leaveners & Yeast' 
  | 'Spices & Flavoring' 
  | 'Packaging';

export type StockStatus = 'healthy' | 'low' | 'critical';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;        // Selling price in ₹
  cost: number;         // Production cost in ₹
  quantity: number;     // Finished units on hand
  unit: string;         // 'units', 'pieces', 'loaves'
  minimum_stock: number;
  supplier: string;
  expiry_date: string;  // YYYY-MM-DD
  shelf_life_days: number;
  status: StockStatus;
  image: string;
  description: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  quantity: number;     // Current stock in raw units
  unit: 'kg' | 'g' | 'liters' | 'ml' | 'pcs' | 'packets';
  minimum_stock: number;
  cost_per_unit: number; // Cost in ₹
  supplier: string;
  supplier_phone?: string;
  expiry_date: string;
  status: StockStatus;
  image: string;
}

export interface RecipeItem {
  ingredientId: string;
  ingredientName: string;
  quantityPerBatch: number; // quantity needed per batch of product
  unit: string;
}

export interface ProductRecipe {
  productId: string;
  batchSize: number; // e.g., 20 units
  ingredients: RecipeItem[];
}

export interface SaleRecord {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  total: number;
  date: string;        // YYYY-MM-DD
  time: string;        // HH:mm
  day_of_week: string; // 'Monday', 'Saturday', etc.
  channel: 'In-Store' | 'Online' | 'Pre-Order' | 'Catering';
}

export interface ProductionPlan {
  id: string;
  product_id: string;
  product_name: string;
  current_stock: number;
  predicted_demand: number;
  recommended_production: number;
  actual_produced?: number;
  status: 'recommended' | 'scheduled' | 'in_oven' | 'completed' | 'skipped';
  date: string;
  batch_notes?: string;
  raw_materials_ready: boolean;
  missing_ingredients?: string[];
}

export interface WasteRecord {
  id: string;
  product_id?: string;
  ingredient_id?: string;
  item_name: string;
  quantity: number;
  unit: string;
  reason: 'Expired Date' | 'Unsold Day-End' | 'Burnt/Defect' | 'Handling Damage' | 'Trimmings';
  date: string;
  estimated_loss: number; // in ₹
  logged_by: string;
  notes?: string;
}

export interface DemandPrediction {
  product_id: string;
  product_name: string;
  current_stock: number;
  predicted_demand: number;
  recommended_production: number;
  confidence: number;   // 0 - 100%
  date: string;
  growth_trend: number; // e.g. +18%
  reasoning: string[];
  historical_avg: number;
}

export interface PurchaseItem {
  id: string;
  ingredient: string;
  ingredient_id: string;
  current_stock: number;
  predicted_requirement: number;
  recommended_purchase: number;
  unit: string;
  supplier: string;
  cost_per_unit: number;
  total_cost: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Ordered' | 'Delivered';
  order_date: string;
  required_date: string;
}

export type AlertType = 'low_stock' | 'expiry' | 'demand' | 'overstock' | 'production';

export interface SmartAlert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  status: 'unread' | 'read';
  severity: 'critical' | 'warning' | 'info';
  date: string;
  time: string;
  action_label?: string;
  action_target?: string;
}

export interface BakeryUser {
  id: string;
  name: string;
  email: string;
  bakery_name: string;
  role: 'Bakery Manager' | 'Head Baker' | 'Store Owner' | 'Inventory Specialist';
  avatar: string;
}

export interface BakerySettings {
  bakeryName: string;
  currency: string;
  lowStockThresholdPercent: number;
  expiryWarningDays: number;
  aiSensitivity: 'Conservative' | 'Balanced' | 'Aggressive';
  autoAlertsEnabled: boolean;
  weekendSurgeMultiplier: number;
  geminiApiKey?: string;
}
