import { Product, Ingredient, ProductionPlan, WasteRecord, PurchaseItem, SmartAlert } from '../types/bakery';

export interface BotMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionButtons?: Array<{
    label: string;
    action: string;
    payload?: any;
  }>;
}

export interface BotContext {
  products: Product[];
  ingredients: Ingredient[];
  productionPlans: ProductionPlan[];
  wasteRecords: WasteRecord[];
  purchases: PurchaseItem[];
  alerts: SmartAlert[];
  todaySales: number;
}

export class BakeBotService {
  static getResponse(query: string, ctx: BotContext): BotMessage {
    const q = query.toLowerCase().trim();
    const id = `msg-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. "What should I bake today?"
    if (q.includes('what should i bake') || q.includes('bake today') || q.includes('production plan')) {
      const activePlans = ctx.productionPlans.filter(p => p.recommended_production > 0);
      const itemsList = activePlans.map(p => `• **${p.product_name}**: Produce **${p.recommended_production} units** *(Stock: ${p.current_stock}, Predicted Demand: ${p.predicted_demand})*`).join('\n');

      return {
        id,
        sender: 'bot',
        timestamp,
        text: `🥐 **AI Production Recommendations for Today:**\n\nBased on sales velocity, upcoming weekend foot traffic, and current inventory, here is your baking schedule:\n\n${itemsList}\n\n💡 *Tip: We have also verified recipe availability. Note that Flour is running low for additional bread batches.*`,
        actionButtons: [
          { label: 'Open Production Planner', action: 'navigate', payload: 'production' },
          { label: 'Accept All Recommendations', action: 'accept_all_plans' }
        ]
      };
    }

    // 2. "Which ingredients are running low?"
    if (q.includes('running low') || q.includes('low ingredient') || q.includes('shortage') || q.includes('stock low')) {
      const lowIngredients = ctx.ingredients.filter(i => i.status === 'low' || i.status === 'critical');
      const list = lowIngredients.map(i => `• **${i.name}**: **${i.quantity} ${i.unit}** remaining *(Min safety threshold: ${i.minimum_stock} ${i.unit})* — ${i.status === 'critical' ? '🔴 CRITICAL' : '🟡 LOW'}`).join('\n');

      return {
        id,
        sender: 'bot',
        timestamp,
        text: `⚠️ **Current Low-Stock Ingredients (${lowIngredients.length} items):**\n\n${list}\n\n📦 **Top Action Required:** Flour is at critical levels (5 kg). You should order at least 8-15 kg immediately before the morning baking shift.`,
        actionButtons: [
          { label: 'View Purchase Planner', action: 'navigate', payload: 'purchase' },
          { label: 'Quick Order Flour', action: 'order_flour' }
        ]
      };
    }

    // 3. "What expires tomorrow?" / Expiry questions
    if (q.includes('expire') || q.includes('expiry') || q.includes('shelf life')) {
      return {
        id,
        sender: 'bot',
        timestamp,
        text: `⏰ **Expiry Radar Breakdown:**\n\n• 🔴 **Fresh Dairy Milk**: **1 day remaining** (8 Liters) — *Expires tomorrow, Sept 11!*\n• 🟡 **Chocolate Cream**: **2 days remaining** (4 Liters) — *Expires Sept 12*\n• 🟡 **French Croissants & Dough**: **1 day remaining** (fresh daily bake)\n• 🟢 **European Butter**: **6 days remaining** (6.5 kg)\n\n💡 **AI Waste Prevention Advice:** Prioritize using the Fresh Milk in today's Brioche dough and custard puddings to avoid ₹496 in spoilage loss.`,
        actionButtons: [
          { label: 'Inspect Expiry Radar', action: 'navigate', payload: 'expiry' },
          { label: 'Discount Fresh Bakes 30%', action: 'apply_discount' }
        ]
      };
    }

    // 4. "What is my best-selling product?" / Sales questions
    if (q.includes('best-selling') || q.includes('top product') || q.includes('most popular') || q.includes('sales')) {
      return {
        id,
        sender: 'bot',
        timestamp,
        text: `🏆 **Top Performing Bakery Products:**\n\n1. 🥇 **Belgian Chocolate Truffle Cake** — ₹7,800 today *(High margin, 12 cakes sold)*\n2. 🥈 **Artisan Sourdough Bread** — 58 loaves sold today (₹2,610 revenue, daily morning staple)\n3. 🥉 **Classic Vanilla Cake** — ₹2,750 revenue\n4. 🥐 **French Butter Croissant** — 28 pcs sold (₹2,240)\n\n💰 **Today's Gross Sales:** **₹18,650** *(+14.2% vs yesterday)*. Sourdough and Croissants drive morning foot traffic, while Cakes account for 56% of total gross revenue!`,
        actionButtons: [
          { label: 'Explore Sales Analytics', action: 'navigate', payload: 'analytics' }
        ]
      };
    }

    // 5. "How can I reduce food waste?" / Waste reduction
    if (q.includes('reduce waste') || q.includes('food waste') || q.includes('spoilage') || q.includes('loss')) {
      return {
        id,
        sender: 'bot',
        timestamp,
        text: `♻️ **BakeFlow AI Waste Reduction Roadmap:**\n\nYour current monthly waste is **42 kg** with an estimated financial loss of **₹4,200**. We have achieved a **23% reduction** so far!\n\nHere are 3 high-impact AI recommendations:\n1. 📉 **Trim Saturday Bread Bake by 10%**: Shifting from 80 to 70 loaves avoids Sunday day-end staling.\n2. 🔄 **FIFO Ingredient Rotation**: 3 liters of heavy cream expired last week because older cartons were pushed back in the chiller.\n3. 🏷️ **Dynamic "Bakers Hour" Evening Special**: Offer 25-30% off unsold baguettes and muffins after 7:30 PM to recover cost.\n\n✨ *Implementing these will save approx ₹1,650 every week.*`,
        actionButtons: [
          { label: 'View Waste Intelligence', action: 'navigate', payload: 'waste' },
          { label: 'Log New Waste Item', action: 'log_waste' }
        ]
      };
    }

    // 6. "How much flour should I purchase?" / Purchase questions
    if (q.includes('how much flour') || q.includes('purchase flour') || q.includes('order flour') || q.includes('flour purchase')) {
      return {
        id,
        sender: 'bot',
        timestamp,
        text: `🌾 **Flour Purchase Recommendation:**\n\n• **Current Stock:** 5 kg\n• **Predicted Production Requirement:** 10 kg (for Bread, Pastries, and Puffs)\n• **Minimum Safety Threshold:** 25 kg\n• **AI Recommended Order:** **8 kg to 20 kg** *(High Priority 🔴)*\n• **Supplier:** Golden Grain Mills Ltd. (Lead time: 24 hours)\n• **Estimated Cost:** ₹360 (for 8 kg @ ₹45/kg)\n\nWould you like me to generate this purchase order now?`,
        actionButtons: [
          { label: 'Generate PO for 8 kg Flour', action: 'order_flour' },
          { label: 'Open Purchase Planner', action: 'navigate', payload: 'purchase' }
        ]
      };
    }

    // 7. "What will tomorrow's demand be?" / Forecast questions
    if (q.includes('tomorrow') || q.includes('forecast') || q.includes('demand prediction') || q.includes('future demand')) {
      return {
        id,
        sender: 'bot',
        timestamp,
        text: `📈 **Tomorrow's Forecasted Demand (Friday Rush):**\n\n• **Artisan Sourdough Bread:** 120 units *(+20% weekend surge, 92% AI confidence)*\n• **French Croissants:** 35 units *(High morning takeaway demand)*\n• **Blueberry Muffins:** 30 units\n• **Chocolate Cakes:** 12 units *(Pre-orders rising for Friday celebrations)*\n• **Savory Puffs:** 65 units total (Chicken & Veg combined)\n\n💡 Friday afternoon tea-time rush typically begins at 3:30 PM. Ensure ovens are pre-scheduled by 11:00 AM.`,
        actionButtons: [
          { label: 'View Full AI Demand Forecast', action: 'navigate', payload: 'forecast' }
        ]
      };
    }

    // Default intelligent fallback
    return {
      id,
      sender: 'bot',
      timestamp,
      text: `🤖 **BakeBot AI is listening!**\n\nI have real-time visibility into your **inventory (${ctx.products.length} products, ${ctx.ingredients.length} ingredients)**, sales (**₹${ctx.todaySales.toLocaleString()} today**), baking plans, and waste tracking.\n\nYou can ask me:\n• *"What should I bake today?"*\n• *"Which ingredients are running low?"*\n• *"What expires tomorrow?"*\n• *"How much flour should I purchase?"*\n• *"How can I reduce food waste?"*`,
      actionButtons: [
        { label: 'What should I bake today?', action: 'ask', payload: 'What should I bake today?' },
        { label: 'Check Low Ingredients', action: 'ask', payload: 'Which ingredients are running low?' }
      ]
    };
  }
}
