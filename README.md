# 🥐 BakeFlow AI (SmartBakeAI)
### *“Smarter Inventory. Less Waste. Better Bakery.”*

An AI-powered smart bakery management and inventory prediction system designed for modern artisanal and commercial bakeries. Built with a 2026 SaaS bento-grid aesthetic, warm bakery palette, multivariate demand forecasting, recipe BOM calculations, and the **BakeBot** operations co-pilot.

---

## 🌟 Overview & Key Metrics

Many bakeries struggle with manual inventory tracking, erratic footfall, perishable ingredient spoilage, and day-end food waste. **BakeFlow AI** bridges sales history, live shelf quantities, cold-storage expiry dates, and day-of-week demand surges to provide automated baking schedules and purchasing orders.

* 📈 **Demand Forecast Accuracy**: +18% to +25% peak capture
* 📦 **Inventory Health**: Real-time health index (optimal 92% benchmark)
* ♻️ **Food Waste Reduction**: -23% average reduction in discarded goods
* 🤖 **BakeBot AI**: 24/7 conversational operations assistant

---

## 🚀 Core Features

### 1. 🏠 AI Command Center
* Bento-grid morning operations overview with 5 core KPIs:
  * **Today's Sales**: ₹18,650 (+14.2% vs yesterday)
  * **Inventory Health**: 92%
  * **Low Stock Alerts**: 8 items requiring replenishment
  * **Expiring Items**: 7 perishables within critical window
  * **Food Waste**: 42 kg (-23% reduction this month)
* **BakeFlow AI Insight Banner**: Dynamic recommendations (e.g. *“Bread demand expected to increase 20% this weekend. Consider producing 50 additional units.”*) with 1-click acceptance into the oven schedule.

### 2. 📦 Inventory Management
* Dual-view management for **Baked Products** (Bread, Truffle Cake, Vanilla Cake, Croissants, Muffins, Donuts, Chicken Puff, Veg Puff) and **Raw Ingredients** (Flour, Sugar, Eggs, Butter, Milk, Cream, Chocolate, Yeast).
* Status indicators: 🟢 Healthy | 🟡 Low Stock | 🔴 Critical.
* Search, multi-category filters, sorting, and inline `+ / -` stock adjustment modals with audit logging.
* Switchable между Card Grid view and Data Spreadsheet table.

### 3. 🤖 AI Demand Prediction
* Multivariate engine analyzing 30-day sales history, day-of-week patterns, upcoming holidays, weather, and footfall.
* Interactive multi-layer charts: **Historical Sales → Current Trend → AI Forecast**.
* Time horizons: *Today | 7 Days | 30 Days | 3 Months*.
* Product deep-dive cards with confidence scores (e.g. 92% for sourdough) and reasoning breakdowns.

### 4. 🥐 Smart Production Planner (“What Should I Bake Today?”)
* Automatically calculates optimal morning batch quantities based on:
  $$\text{Recommended Production} = \max(0, \text{Predicted Demand} - \text{Current Stock} + \text{Safety Buffer})$$
* **Bill of Materials (BOM) Feasibility Check**: Verifies whether sufficient flour, butter, milk, and eggs exist before starting a bake.
* Interactive baking buttons: Deducts raw materials from pantry stock and credits finished goods to showcase upon completion!

### 5. ⏰ Expiry Radar
* Shelf-life countdown tracking:
  * 🔴 **Fresh Whole Dairy Milk**: 1 day remaining
  * 🟡 **Chocolate Whipping Cream**: 2 days remaining
  * 🟢 **European Butter**: 6 days remaining
* AI Waste Prevention Advice with 1-click *"Incorporate into Daily Special"* or *"Apply 30% Clearance Discount"*.

### 6. 🔔 Smart Alerts & Notifications
* Real-time notifications for Low Stock, Expiry Warnings, Demand Surges, Overstock Risk, and Oven Timers.
* Severity filters (Critical, Warning, Info), mark as read, and quick direct action links.

### 7. 🛒 Purchase Planner
* Recipe-driven ingredient re-stocking calculator.
* Highlights priority deficits (e.g., *Flour: 5 kg on hand, 10 kg required, 8 kg recommended order, High Priority*).
* Tracks supplier lead times, estimated ₹ costs, and status (*Pending → Ordered → Delivered*).

### 8. 📊 Sales Analytics
* Revenue metrics, hourly customer rush heatmaps (08:00 AM breakfast and 04:00 PM tea rush), best-sellers (Truffle Cake, Sourdough Bread), and category profit margin shares.

### 9. ♻️ Waste Intelligence
* Sustainability and financial recovery dashboard: 42 kg monthly waste, ₹4,200 loss, 23% waste reduction.
* Waste by root cause (Unsold day-end, Expired date, Burnt defect, Handling damage).
* Root-cause logger with auto-calculated rupee loss.

### 10. 💬 BakeBot AI Assistant
* Floating conversational assistant accessible from anywhere in the app.
* Context-aware answers pulling directly from live inventory, sales, batches, and waste records.
* Pre-configured quick prompt shortcuts + custom questions.

### 11. ⚙️ Settings & Scenario Simulator
* Bakery profile, currency selection (₹, $, €, £), safety stock thresholds, and expiry warning windows.
* **1-Click Test Drive Scenarios**:
  * *Standard Operations (Normal)*
  * *Weekend Rush (+35% Demand Surge)*
  * *Perishable Waste Risk (Expiring Dairy)*
  * *Flour Shortage Crisis (Critical Stockout)*

---

## 🛠️ Technology Stack

* **Frontend**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS (Custom bakery palette: Warm cream, chocolate brown, caramel amber)
* **Icons**: Lucide React
* **Charts**: Recharts
* **State & Storage**: React Context API with persistent localStorage synchronization
* **AI Engine**: Local algorithmic predictive intelligence + optional external Google Gemini API integration

---

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/RitheshkumarK/SmartBakeAI.git
cd SmartBakeAI
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Visit `http://localhost:3000` in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 👥 Demo Personas
* **Aryan Sharma** — Bakery Manager
* **Chef Marcus Laurent** — Head Baker
* **Priya Verma** — Store Owner

---

## 📜 License
MIT License. Crafted for modern bakery owners and artisan pastry chefs.
