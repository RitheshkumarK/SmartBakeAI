import { 
  Product, 
  Ingredient, 
  SaleRecord, 
  ProductionPlan, 
  WasteRecord, 
  DemandPrediction, 
  PurchaseItem, 
  SmartAlert, 
  BakeryUser, 
  BakerySettings 
} from '../types/bakery';

export const INITIAL_USER: BakeryUser = {
  id: 'usr-1',
  name: 'Aryan Sharma',
  email: 'manager@bakeflow.ai',
  bakery_name: 'La Petite Pâtisserie & Boulangerie',
  role: 'Bakery Manager',
  avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&auto=format&fit=crop&q=80'
};

export const INITIAL_SETTINGS: BakerySettings = {
  bakeryName: 'La Petite Pâtisserie & Boulangerie',
  currency: '₹',
  lowStockThresholdPercent: 30,
  expiryWarningDays: 3,
  aiSensitivity: 'Balanced',
  autoAlertsEnabled: true,
  weekendSurgeMultiplier: 1.35,
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Artisan Sourdough Bread',
    category: 'Breads',
    price: 45,
    cost: 22,
    quantity: 70,
    unit: 'loaves',
    minimum_stock: 50,
    supplier: 'In-House Bakery',
    expiry_date: '2026-09-12',
    shelf_life_days: 2,
    status: 'healthy',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80',
    description: 'Slow-fermented 24-hour crusty artisanal sourdough loaf with airy crumb.'
  },
  {
    id: 'prod-2',
    name: 'Belgian Chocolate Truffle Cake',
    category: 'Cakes & Gateaux',
    price: 650,
    cost: 320,
    quantity: 15,
    unit: 'cakes',
    minimum_stock: 10,
    supplier: 'In-House Bakery',
    expiry_date: '2026-09-13',
    shelf_life_days: 3,
    status: 'healthy',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80',
    description: 'Decadent 55% dark chocolate ganache layered with moist sponge.'
  },
  {
    id: 'prod-3',
    name: 'Classic Madagascar Vanilla Cake',
    category: 'Cakes & Gateaux',
    price: 550,
    cost: 260,
    quantity: 12,
    unit: 'cakes',
    minimum_stock: 8,
    supplier: 'In-House Bakery',
    expiry_date: '2026-09-13',
    shelf_life_days: 3,
    status: 'healthy',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=400&auto=format&fit=crop&q=80',
    description: 'Pure Madagascar bourbon vanilla bean buttercream with fluffy genoise.'
  },
  {
    id: 'prod-4',
    name: 'French Butter Croissant',
    category: 'Viennoiserie & Pastries',
    price: 80,
    cost: 35,
    quantity: 25,
    unit: 'pieces',
    minimum_stock: 35,
    supplier: 'In-House Bakery',
    expiry_date: '2026-09-11',
    shelf_life_days: 1,
    status: 'low',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop&q=80',
    description: 'Golden honeycomb laminated 27-layer flaky butter viennoiserie.'
  },
  {
    id: 'prod-5',
    name: 'Blueberry Crumble Muffin',
    category: 'Muffins & Cupcakes',
    price: 60,
    cost: 25,
    quantity: 18,
    unit: 'pieces',
    minimum_stock: 30,
    supplier: 'In-House Bakery',
    expiry_date: '2026-09-12',
    shelf_life_days: 2,
    status: 'low',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&auto=format&fit=crop&q=80',
    description: 'Bursting fresh organic blueberries topped with cinnamon streusel.'
  },
  {
    id: 'prod-6',
    name: 'Glazed Chocolate Ganache Donut',
    category: 'Donuts',
    price: 70,
    cost: 28,
    quantity: 22,
    unit: 'pieces',
    minimum_stock: 30,
    supplier: 'In-House Bakery',
    expiry_date: '2026-09-11',
    shelf_life_days: 1,
    status: 'low',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&auto=format&fit=crop&q=80',
    description: 'Brioche yeast donut with silky mirror glaze and hazelnut nibs.'
  },
  {
    id: 'prod-7',
    name: 'Crispy Butter Chicken Puff',
    category: 'Savory & Puffs',
    price: 50,
    cost: 22,
    quantity: 24,
    unit: 'pieces',
    minimum_stock: 25,
    supplier: 'In-House Bakery',
    expiry_date: '2026-09-11',
    shelf_life_days: 1,
    status: 'low',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&auto=format&fit=crop&q=80',
    description: 'Golden puff pastry pouch stuffed with aromatic slow-roasted butter chicken.'
  },
  {
    id: 'prod-8',
    name: 'Spiced Potato & Pea Veg Puff',
    category: 'Savory & Puffs',
    price: 40,
    cost: 18,
    quantity: 28,
    unit: 'pieces',
    minimum_stock: 30,
    supplier: 'In-House Bakery',
    expiry_date: '2026-09-11',
    shelf_life_days: 1,
    status: 'low',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&auto=format&fit=crop&q=80',
    description: 'Flaky traditional bakery puff filled with mildly spiced farm peas and potatoes.'
  }
];

export const INITIAL_INGREDIENTS: Ingredient[] = [
  {
    id: 'ing-1',
    name: 'Organic Wheat Flour (Maida/Atta)',
    category: 'Flour & Grains',
    quantity: 5,
    unit: 'kg',
    minimum_stock: 25,
    cost_per_unit: 45,
    supplier: 'Golden Grain Mills Ltd.',
    supplier_phone: '+91 98450 12345',
    expiry_date: '2026-11-15',
    status: 'critical',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'ing-2',
    name: 'Fine Baker’s Sugar',
    category: 'Sweeteners',
    quantity: 18,
    unit: 'kg',
    minimum_stock: 15,
    cost_per_unit: 42,
    supplier: 'SweetLife Agro Mills',
    supplier_phone: '+91 98230 45678',
    expiry_date: '2027-01-20',
    status: 'healthy',
    image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'ing-3',
    name: 'Farm Fresh Eggs (Brown)',
    category: 'Dairy & Eggs',
    quantity: 45,
    unit: 'pcs',
    minimum_stock: 60,
    cost_per_unit: 7,
    supplier: 'Sunrise Poultry Farms',
    supplier_phone: '+91 97110 88990',
    expiry_date: '2026-09-18',
    status: 'low',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'ing-4',
    name: 'European Unsalted Butter',
    category: 'Fats & Oils',
    quantity: 6.5,
    unit: 'kg',
    minimum_stock: 10,
    cost_per_unit: 480,
    supplier: 'DairyPure Agro Corp.',
    supplier_phone: '+91 98401 22334',
    expiry_date: '2026-09-16', // 6 days remaining
    status: 'low',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'ing-5',
    name: 'Fresh Whole Dairy Milk',
    category: 'Dairy & Eggs',
    quantity: 8,
    unit: 'liters',
    minimum_stock: 20,
    cost_per_unit: 62,
    supplier: 'DairyPure Agro Corp.',
    supplier_phone: '+91 98401 22334',
    expiry_date: '2026-09-11', // 1 day remaining
    status: 'critical',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'ing-6',
    name: 'Whipping Heavy Cream (36% Fat)',
    category: 'Dairy & Eggs',
    quantity: 4,
    unit: 'liters',
    minimum_stock: 10,
    cost_per_unit: 280,
    supplier: 'DairyPure Agro Corp.',
    supplier_phone: '+91 98401 22334',
    expiry_date: '2026-09-12', // 2 days remaining
    status: 'critical',
    image: 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'ing-7',
    name: 'Belgian Dark Chocolate Couverture',
    category: 'Chocolates & Cocoa',
    quantity: 7,
    unit: 'kg',
    minimum_stock: 12,
    cost_per_unit: 750,
    supplier: 'Belgian Cocoa Imports',
    supplier_phone: '+91 99100 55443',
    expiry_date: '2026-12-30',
    status: 'low',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'ing-8',
    name: 'Active Instant Dry Yeast',
    category: 'Leaveners & Yeast',
    quantity: 1.2,
    unit: 'kg',
    minimum_stock: 2,
    cost_per_unit: 320,
    supplier: 'BioFerment Labs',
    supplier_phone: '+91 94440 66778',
    expiry_date: '2026-09-24', // 14 days
    status: 'low',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_PRODUCTION_PLANS: ProductionPlan[] = [
  {
    id: 'plan-1',
    product_id: 'prod-1',
    product_name: 'Artisan Sourdough Bread',
    current_stock: 70,
    predicted_demand: 120,
    recommended_production: 50,
    status: 'recommended',
    date: '2026-09-10',
    raw_materials_ready: false, // missing flour
    missing_ingredients: ['Flour (Short by 20kg)']
  },
  {
    id: 'plan-2',
    product_id: 'prod-5',
    product_name: 'Blueberry Crumble Muffin',
    current_stock: 18,
    predicted_demand: 30,
    recommended_production: 12,
    status: 'scheduled',
    date: '2026-09-10',
    raw_materials_ready: true
  },
  {
    id: 'plan-3',
    product_id: 'prod-4',
    product_name: 'French Butter Croissant',
    current_stock: 25,
    predicted_demand: 35,
    recommended_production: 10,
    status: 'in_oven',
    date: '2026-09-10',
    raw_materials_ready: true
  },
  {
    id: 'plan-4',
    product_id: 'prod-2',
    product_name: 'Belgian Chocolate Truffle Cake',
    current_stock: 15,
    predicted_demand: 12,
    recommended_production: 0,
    status: 'skipped',
    date: '2026-09-10',
    batch_notes: 'Sufficient current stock (15 units) covers predicted demand (12 units).',
    raw_materials_ready: true
  },
  {
    id: 'plan-5',
    product_id: 'prod-6',
    product_name: 'Glazed Chocolate Ganache Donut',
    current_stock: 22,
    predicted_demand: 40,
    recommended_production: 18,
    status: 'recommended',
    date: '2026-09-10',
    raw_materials_ready: true
  },
  {
    id: 'plan-6',
    product_id: 'prod-7',
    product_name: 'Crispy Butter Chicken Puff',
    current_stock: 24,
    predicted_demand: 45,
    recommended_production: 20,
    status: 'recommended',
    date: '2026-09-10',
    raw_materials_ready: true
  }
];

export const INITIAL_PURCHASES: PurchaseItem[] = [
  {
    id: 'po-1',
    ingredient: 'Organic Wheat Flour',
    ingredient_id: 'ing-1',
    current_stock: 5,
    predicted_requirement: 10,
    recommended_purchase: 8,
    unit: 'kg',
    supplier: 'Golden Grain Mills Ltd.',
    cost_per_unit: 45,
    total_cost: 360,
    priority: 'High',
    status: 'Pending',
    order_date: '2026-09-10',
    required_date: '2026-09-11'
  },
  {
    id: 'po-2',
    ingredient: 'Fresh Whole Dairy Milk',
    ingredient_id: 'ing-5',
    current_stock: 8,
    predicted_requirement: 18,
    recommended_purchase: 15,
    unit: 'liters',
    supplier: 'DairyPure Agro Corp.',
    cost_per_unit: 62,
    total_cost: 930,
    priority: 'High',
    status: 'Pending',
    order_date: '2026-09-10',
    required_date: '2026-09-11'
  },
  {
    id: 'po-3',
    ingredient: 'European Unsalted Butter',
    ingredient_id: 'ing-4',
    current_stock: 6.5,
    predicted_requirement: 12,
    recommended_purchase: 6,
    unit: 'kg',
    supplier: 'DairyPure Agro Corp.',
    cost_per_unit: 480,
    total_cost: 2880,
    priority: 'Medium',
    status: 'Pending',
    order_date: '2026-09-10',
    required_date: '2026-09-12'
  },
  {
    id: 'po-4',
    ingredient: 'Farm Fresh Eggs (Brown)',
    ingredient_id: 'ing-3',
    current_stock: 45,
    predicted_requirement: 80,
    recommended_purchase: 50,
    unit: 'pcs',
    supplier: 'Sunrise Poultry Farms',
    cost_per_unit: 7,
    total_cost: 350,
    priority: 'Medium',
    status: 'Ordered',
    order_date: '2026-09-09',
    required_date: '2026-09-11'
  }
];

export const INITIAL_ALERTS: SmartAlert[] = [
  {
    id: 'alt-1',
    type: 'low_stock',
    title: 'Low Stock Alert',
    message: 'Flour stock is below the minimum level (5 kg remaining, min: 25 kg).',
    status: 'unread',
    severity: 'critical',
    date: '2026-09-10',
    time: '08:15 AM',
    action_label: 'Order Flour',
    action_target: 'purchase'
  },
  {
    id: 'alt-2',
    type: 'expiry',
    title: 'Expiry Warning',
    message: 'Milk expires tomorrow (1 day remaining). Use in morning pastry wash or bake specials.',
    status: 'unread',
    severity: 'critical',
    date: '2026-09-10',
    time: '07:45 AM',
    action_label: 'View Expiry Radar',
    action_target: 'expiry'
  },
  {
    id: 'alt-3',
    type: 'demand',
    title: 'High Demand Surge',
    message: 'Bread demand is expected to increase this weekend by 20% due to local community festival.',
    status: 'unread',
    severity: 'warning',
    date: '2026-09-10',
    time: '07:30 AM',
    action_label: 'Review Production',
    action_target: 'production'
  },
  {
    id: 'alt-4',
    type: 'overstock',
    title: 'Overstock Caution',
    message: 'Muffin inventory is higher than predicted demand. Consider evening bundle promotion.',
    status: 'read',
    severity: 'info',
    date: '2026-09-09',
    time: '04:10 PM',
    action_label: 'Adjust Price / Discount',
    action_target: 'inventory'
  },
  {
    id: 'alt-5',
    type: 'expiry',
    title: 'Expiring Chocolate Cream',
    message: 'Chocolate Cream has 2 days remaining. Integrate into Eclairs or Truffle cakes.',
    status: 'unread',
    severity: 'warning',
    date: '2026-09-10',
    time: '06:50 AM',
    action_label: 'Add to Bake Plan',
    action_target: 'production'
  },
  {
    id: 'alt-6',
    type: 'production',
    title: 'Morning Croissant Batch',
    message: 'French Butter Croissant batch #104 is proofed and currently baking in oven 2.',
    status: 'read',
    severity: 'info',
    date: '2026-09-10',
    time: '08:00 AM',
    action_label: 'View Oven Timer',
    action_target: 'production'
  }
];

export const INITIAL_WASTE_RECORDS: WasteRecord[] = [
  {
    id: 'wst-1',
    product_id: 'prod-1',
    item_name: 'Artisan Sourdough Bread',
    quantity: 14,
    unit: 'loaves',
    reason: 'Unsold Day-End',
    date: '2026-09-06',
    estimated_loss: 630,
    logged_by: 'Aryan Sharma',
    notes: 'Rainy Saturday evening reduced foot traffic.'
  },
  {
    id: 'wst-2',
    ingredient_id: 'ing-6',
    item_name: 'Whipping Heavy Cream',
    quantity: 3,
    unit: 'liters',
    reason: 'Expired Date',
    date: '2026-09-05',
    estimated_loss: 840,
    logged_by: 'Chef Marcus',
    notes: 'Stored at back of chiller; was not used in FIFO rotation.'
  },
  {
    id: 'wst-3',
    product_id: 'prod-4',
    item_name: 'French Butter Croissant',
    quantity: 12,
    unit: 'pieces',
    reason: 'Burnt/Defect',
    date: '2026-09-07',
    estimated_loss: 420,
    logged_by: 'Chef Marcus',
    notes: 'Oven temperature calibration spike.'
  },
  {
    id: 'wst-4',
    product_id: 'prod-5',
    item_name: 'Blueberry Crumble Muffin',
    quantity: 8,
    unit: 'pieces',
    reason: 'Unsold Day-End',
    date: '2026-09-08',
    estimated_loss: 480,
    logged_by: 'Priya Verma',
    notes: 'Mid-week surplus display.'
  },
  {
    id: 'wst-5',
    ingredient_id: 'ing-5',
    item_name: 'Fresh Dairy Milk',
    quantity: 5,
    unit: 'liters',
    reason: 'Expired Date',
    date: '2026-09-04',
    estimated_loss: 310,
    logged_by: 'Priya Verma',
    notes: 'Vendor delivered short-dated crate.'
  },
  {
    id: 'wst-6',
    product_id: 'prod-7',
    item_name: 'Crispy Butter Chicken Puff',
    quantity: 15,
    unit: 'pieces',
    reason: 'Handling Damage',
    date: '2026-09-09',
    estimated_loss: 750,
    logged_by: 'Aryan Sharma',
    notes: 'Tray slip during display showcase reload.'
  },
  {
    id: 'wst-7',
    product_id: 'prod-8',
    item_name: 'Spiced Veg Puff',
    quantity: 19,
    unit: 'pieces',
    reason: 'Unsold Day-End',
    date: '2026-09-03',
    estimated_loss: 760,
    logged_by: 'Chef Marcus',
    notes: 'Rainy Tuesday.'
  }
];

// Generates 30 days of sales history with today equaling ₹18,650
export const generateRealisticSales = (): SaleRecord[] => {
  const sales: SaleRecord[] = [];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Today's specific target: ₹18,650
  const todaysSales: Array<{ prodId: string; name: string; qty: number; price: number; time: string; channel: 'In-Store' | 'Online' | 'Pre-Order' | 'Catering' }> = [
    { prodId: 'prod-1', name: 'Artisan Sourdough Bread', qty: 58, price: 45, time: '08:30 AM', channel: 'In-Store' }, // ₹2,610
    { prodId: 'prod-2', name: 'Belgian Chocolate Truffle Cake', qty: 12, price: 650, time: '11:15 AM', channel: 'Online' }, // ₹7,800
    { prodId: 'prod-3', name: 'Classic Madagascar Vanilla Cake', qty: 5, price: 550, time: '01:45 PM', channel: 'Pre-Order' }, // ₹2,750
    { prodId: 'prod-4', name: 'French Butter Croissant', qty: 28, price: 80, time: '09:00 AM', channel: 'In-Store' }, // ₹2,240
    { prodId: 'prod-5', name: 'Blueberry Crumble Muffin', qty: 14, price: 60, time: '10:20 AM', channel: 'In-Store' }, // ₹840
    { prodId: 'prod-6', name: 'Glazed Chocolate Ganache Donut', qty: 15, price: 70, time: '03:10 PM', channel: 'Online' }, // ₹1,050
    { prodId: 'prod-7', name: 'Crispy Butter Chicken Puff', qty: 12, price: 50, time: '04:30 PM', channel: 'In-Store' }, // ₹600
    { prodId: 'prod-8', name: 'Spiced Potato & Pea Veg Puff', qty: 19, price: 40, time: '05:00 PM', channel: 'In-Store' }, // ₹760
  ];

  let idCounter = 1;
  // Today is 2026-09-10
  todaysSales.forEach(s => {
    sales.push({
      id: `sale-${idCounter++}`,
      product_id: s.prodId,
      product_name: s.name,
      quantity: s.qty,
      price: s.price,
      total: s.qty * s.price,
      date: '2026-09-10',
      time: s.time,
      day_of_week: 'Thursday',
      channel: s.channel
    });
  });

  // Previous 29 days
  const basePrices: Record<string, number> = {
    'prod-1': 45, 'prod-2': 650, 'prod-3': 550, 'prod-4': 80,
    'prod-5': 60, 'prod-6': 70, 'prod-7': 50, 'prod-8': 40
  };
  const prodNames: Record<string, string> = {
    'prod-1': 'Artisan Sourdough Bread',
    'prod-2': 'Belgian Chocolate Truffle Cake',
    'prod-3': 'Classic Madagascar Vanilla Cake',
    'prod-4': 'French Butter Croissant',
    'prod-5': 'Blueberry Crumble Muffin',
    'prod-6': 'Glazed Chocolate Ganache Donut',
    'prod-7': 'Crispy Butter Chicken Puff',
    'prod-8': 'Spiced Potato & Pea Veg Puff'
  };

  for (let i = 1; i <= 29; i++) {
    const d = new Date(2026, 8, 10 - i); // September is month 8
    const dateStr = d.toISOString().split('T')[0];
    const dow = daysOfWeek[d.getDay()];
    const isWeekend = dow === 'Saturday' || dow === 'Sunday';
    const multiplier = isWeekend ? 1.4 : (dow === 'Friday' ? 1.2 : 0.95);

    Object.keys(basePrices).forEach(pId => {
      let baseQty = 15;
      if (pId === 'prod-1') baseQty = 55; // Bread sells high
      else if (pId === 'prod-4') baseQty = 35; // Croissant
      else if (pId === 'prod-2') baseQty = 6; // Cakes
      else if (pId === 'prod-3') baseQty = 5;
      else if (pId === 'prod-7' || pId === 'prod-8') baseQty = 25;

      const randomJitter = 0.85 + (Math.sin(i * 3 + Number(pId.replace('prod-', ''))) * 0.15);
      const qty = Math.max(2, Math.round(baseQty * multiplier * randomJitter));
      const price = basePrices[pId];

      sales.push({
        id: `sale-${idCounter++}`,
        product_id: pId,
        product_name: prodNames[pId],
        quantity: qty,
        price: price,
        total: qty * price,
        date: dateStr,
        time: `${Math.floor(8 + (i % 10))}:00`,
        day_of_week: dow,
        channel: i % 3 === 0 ? 'Online' : 'In-Store'
      });
    });
  }

  return sales;
};
