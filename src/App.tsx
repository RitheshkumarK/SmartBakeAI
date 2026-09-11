import React, { useState } from 'react';
import { useBakery } from './context/BakeryContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/common/Toast';
import { QuickSearch } from './components/common/QuickSearch';
import { BakeBotModal } from './components/bot/BakeBotModal';

// Modals
import { AddProductModal } from './components/forms/AddProductModal';
import { LogWasteModal } from './components/forms/LogWasteModal';
import { QuickPOModal } from './components/forms/QuickPOModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { CommandCenter } from './pages/CommandCenter';
import { InventoryView } from './pages/InventoryView';
import { DemandPredictionView } from './pages/DemandPredictionView';
import { ProductionPlannerView } from './pages/ProductionPlannerView';
import { ExpiryRadarView } from './pages/ExpiryRadarView';
import { SmartAlertsView } from './pages/SmartAlertsView';
import { PurchasePlannerView } from './pages/PurchasePlannerView';
import { SalesAnalyticsView } from './pages/SalesAnalyticsView';
import { WasteIntelligenceView } from './pages/WasteIntelligenceView';
import { SettingsView } from './pages/SettingsView';

export const App: React.FC = () => {
  const { activeTab } = useBakery();

  // Layout states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);

  // Global modals
  const [addModalConfig, setAddModalConfig] = useState<{ isOpen: boolean; type: 'product' | 'ingredient' }>({
    isOpen: false,
    type: 'product'
  });
  const [isWasteModalOpen, setIsWasteModalOpen] = useState(false);
  const [isPOModalOpen, setIsPOModalOpen] = useState(false);

  // Standalone pages without dashboard shell:
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-cream-50">
        <LandingPage />
        <ToastContainer />
      </div>
    );
  }

  if (activeTab === 'auth') {
    return (
      <div className="min-h-screen bg-cream-50">
        <AuthPage />
        <ToastContainer />
      </div>
    );
  }

  // Active view renderer
  const renderActiveView = () => {
    switch (activeTab) {
      case 'command':
        return (
          <CommandCenter
            onOpenAddModal={(type) => setAddModalConfig({ isOpen: true, type })}
            onOpenWasteModal={() => setIsWasteModalOpen(true)}
            onOpenPOModal={() => setIsPOModalOpen(true)}
          />
        );
      case 'inventory':
        return (
          <InventoryView
            onOpenAddModal={(type) => setAddModalConfig({ isOpen: true, type })}
          />
        );
      case 'forecast':
        return <DemandPredictionView />;
      case 'production':
        return <ProductionPlannerView />;
      case 'expiry':
        return <ExpiryRadarView />;
      case 'alerts':
        return <SmartAlertsView />;
      case 'purchase':
        return <PurchasePlannerView />;
      case 'analytics':
        return <SalesAnalyticsView />;
      case 'waste':
        return <WasteIntelligenceView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <CommandCenter
            onOpenAddModal={(type) => setAddModalConfig({ isOpen: true, type })}
            onOpenWasteModal={() => setIsWasteModalOpen(true)}
            onOpenPOModal={() => setIsPOModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-cream-50 text-chocolate-900">
      {/* Desktop Collapsible Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen pb-20 md:pb-8">
        {/* Top Navigation Bar */}
        <Navbar
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onOpenQuickSearch={() => setQuickSearchOpen(true)}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom & Slide-over Navigation */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Global Quick Search (Ctrl+K) */}
      <QuickSearch
        isOpen={quickSearchOpen}
        onClose={() => setQuickSearchOpen(false)}
      />

      {/* Floating BakeBot AI Assistant */}
      <BakeBotModal />

      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Global Modals */}
      {addModalConfig.isOpen && (
        <AddProductModal
          isOpen={addModalConfig.isOpen}
          onClose={() => setAddModalConfig({ ...addModalConfig, isOpen: false })}
          type={addModalConfig.type}
        />
      )}

      {isWasteModalOpen && (
        <LogWasteModal
          isOpen={isWasteModalOpen}
          onClose={() => setIsWasteModalOpen(false)}
        />
      )}

      {isPOModalOpen && (
        <QuickPOModal
          isOpen={isPOModalOpen}
          onClose={() => setIsPOModalOpen(false)}
        />
      )}
    </div>
  );
};
