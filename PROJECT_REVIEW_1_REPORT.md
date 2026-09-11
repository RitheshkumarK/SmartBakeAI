# Phase 1: 30% Project Progress Review Report
## **BakeFlow AI (SmartBakeAI)**
### *AI-Powered Smart Inventory Management & Demand Prediction System for Bakeries*

---

## 1. Project Details

| Parameter | Description |
| :--- | :--- |
| **Project Title** | AI-Powered Smart Inventory Management System for Bakeries |
| **Platform Name** | **BakeFlow AI** (SmartBakeAI) |
| **Tagline** | *“Smarter Inventory. Less Waste. Better Bakery.”* |
| **Current Stage** | **Phase 1: 30% Progress Review** |
| **Repository** | [https://github.com/RitheshkumarK/SmartBakeAI](https://github.com/RitheshkumarK/SmartBakeAI) |
| **Technology Stack** | React 18, TypeScript, Tailwind CSS, Vite, Recharts, Lucide Icons |

---

## 2. Executive Summary & Problem Definition

### 2.1 The Problem
Artisanal and commercial bakeries suffer from high product perishability and volatile demand:
1. **Unpredictable Customer Footfall**: Footfall surges on weekends (+35%) and drops during mid-week or bad weather.
2. **High Food Waste**: 10% to 15% of baked goods are discarded at day-end. Perishable ingredients (fresh milk, whipping cream, yeast) spoil in cold storage.
3. **Pantry Shortages**: Manual tracking leads to ingredient stockouts (e.g. running out of flour during morning baking).

### 2.2 The Solution (BakeFlow AI)
An intelligent bakery operations management platform combining:
* **Multivariate AI Demand Forecasting**: Predicts future demand using sales history, day-of-week patterns, and seasonality.
* **Recipe Bill of Materials (BOM)**: Converts production plans into exact ingredient quantities.
* **Expiry Radar**: Shelf-life countdown tracking to minimize dairy/cream spoilage.
* **BakeBot AI**: 24/7 conversational operations assistant.

---

## 3. Work Completed for the 30% Milestone

In software engineering and academic project reviews, the **30% Milestone** marks the completion of the **Architecture, Database Modeling, UI/UX Design System, and Core Functional Prototype**:

| Module / Component | Work Completed in Phase 1 (30%) | Status |
| :--- | :--- | :--- |
| **1. Architecture & Setup** | Vite + React 18 + TypeScript + Tailwind CSS configured with custom bakery palette (`cream`, `chocolate`, `caramel`). | ✅ Completed |
| **2. Database Schema Design** | Relational schema designed for 9 entities: `Users`, `Products`, `Inventory`, `Sales`, `Production`, `Waste`, `Predictions`, `Purchases`, `Alerts`. | ✅ Completed |
| **3. Recipe BOM Modeling** | Bill of Materials linking finished products (Bread, Cakes, Croissants, Puffs) to raw ingredients (Flour, Sugar, Eggs, Butter, Milk, Cream, Yeast). | ✅ Completed |
| **4. Landing Page** | Public SaaS hero, floating metrics (+18% Demand, 92% Health, -23% Waste), 8-feature bento grid, and interactive ROI calculator. | ✅ Completed |
| **5. Authentication System** | Login & Sign-up forms, remember me, forgot password, and 1-click demo personas (*Bakery Manager*, *Head Baker*, *Store Owner*). | ✅ Completed |
| **6. AI Command Center** | Bento dashboard with 5 core KPIs (Sales ₹18,650, 92% Health, 8 Low Stock, 7 Expiring, 42 kg Waste) + BakeFlow AI Insight card. | ✅ Completed |
| **7. Core Inventory Management** | Dual-view tracking for Baked Products & Raw Ingredients, stock adjustment modal, status badges (🟢, 🟡, 🔴). | ✅ Completed |
| **8. Git Version Control** | Repository initialized, 43 files committed to `main` branch, and pushed to GitHub. | ✅ Completed |

---

## 4. Mathematical Model Formulated (AI Prediction Engine)

### 4.1 Demand Forecast Formula
$$\hat{D}_{i,t} = \bar{S}_{i,14} \times (1 + T_i + W_t) \times S_{\text{sens}}$$

Where:
* $\hat{D}_{i,t}$: Forecasted demand for product $i$ on day $t$.
* $\bar{S}_{i,14}$: 14-day moving average sales volume.
* $T_i$: Sales velocity trend ($\frac{\bar{S}_{3\text{d}} - \bar{S}_{7\text{d}}}{\bar{S}_{7\text{d}}}$).
* $W_t$: Weekend surge multiplier ($+35\%$ for Friday–Sunday).
* $S_{\text{sens}}$: Sensitivity tuning factor ($0.9$ Conservative, $1.0$ Balanced, $1.15$ Aggressive).

### 4.2 Recommended Production Quantity
$$P_{i,t} = \max\left(0, \hat{D}_{i,t} - Q_{i,t} + B_{i}\right)$$

Where $Q_{i,t}$ is current stock and $B_i$ is the safety threshold buffer.

---

## 5. Roadmap for Remaining Phases

* **Phase 2 (60% Milestone - Mid-Term Review)**: Complete deployment of Production Scheduler, Expiry Radar clearance discount automation, and Purchase Order procurement lifecycle.
* **Phase 3 (100% Milestone - Final Viva)**: BakeBot conversational assistant, Sales Analytics heatmaps, Food Waste sustainability reporting, and cloud deployment.
