import React, { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  AlertTriangle, 
  ClockAlert, 
  TrendingUp, 
  Package, 
  ChefHat, 
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { BentoCard } from '../components/common/BentoCard';
import { Badge } from '../components/common/Badge';

export const SmartAlertsView: React.FC = () => {
  const { 
    alerts, 
    markAlertAsRead, 
    markAllAlertsAsRead, 
    deleteAlert, 
    setActiveTab, 
    addToast 
  } = useBakery();

  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredAlerts = alerts.filter(a => {
    const matchesSeverity = severityFilter === 'all' || a.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSeverity && matchesStatus;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'low_stock':
        return <Package className="w-5 h-5 text-rose-600" />;
      case 'expiry':
        return <ClockAlert className="w-5 h-5 text-rose-600" />;
      case 'demand':
        return <TrendingUp className="w-5 h-5 text-caramel-600" />;
      case 'overstock':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'production':
        return <ChefHat className="w-5 h-5 text-sky-600" />;
      default:
        return <Bell className="w-5 h-5 text-chocolate-600" />;
    }
  };

  const handleActionClick = (target?: string) => {
    if (!target) return;
    setActiveTab(target);
    addToast('info', 'Navigation', `Opened ${target} view.`);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-chocolate-950 tracking-tight">
              Smart Alerts & Notifications 🔔
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-caramel-100 text-caramel-900 text-xs font-bold border border-caramel-300">
              {alerts.filter(a => a.status === 'unread').length} Unresolved
            </span>
          </div>
          <p className="text-sm text-chocolate-600 mt-1">
            Real-time triggers for critical shortages, upcoming perishables, and surge demand events.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={markAllAlertsAsRead}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-cream-100 text-chocolate-800 border border-cream-300 text-xs sm:text-sm font-bold shadow-warm-sm transition-all"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>Mark All as Read</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-cream-100/80 border border-cream-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-chocolate-500 uppercase tracking-wider mr-1">Severity:</span>
          {['all', 'critical', 'warning', 'info'].map(s => (
            <button
              key={s}
              onClick={() => setSeverityFilter(s as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                severityFilter === s ? 'bg-white text-chocolate-950 shadow-warm-sm' : 'text-chocolate-600 hover:text-chocolate-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-chocolate-500 uppercase tracking-wider mr-1">Status:</span>
          {['all', 'unread', 'read'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                statusFilter === st ? 'bg-white text-chocolate-950 shadow-warm-sm' : 'text-chocolate-600 hover:text-chocolate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl glass-card border border-cream-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-chocolate-950">All Clear! No alerts in this filter.</h3>
            <p className="text-xs text-chocolate-500 mt-1">Inventory and production are operating optimally.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const isUnread = alert.status === 'unread';
            const isCritical = alert.severity === 'critical';
            const isWarning = alert.severity === 'warning';

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isUnread 
                    ? (isCritical 
                        ? 'bg-rose-50/50 border-rose-200/90 shadow-warm' 
                        : (isWarning ? 'bg-amber-50/40 border-amber-200/90 shadow-warm' : 'bg-white border-cream-200 shadow-warm'))
                    : 'bg-white/60 border-cream-200 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                    isCritical ? 'bg-rose-100 text-rose-700' : (isWarning ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700')
                  }`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm sm:text-base text-chocolate-950">{alert.title}</h4>
                      <Badge 
                        status={isCritical ? 'critical' : (isWarning ? 'low' : 'info')} 
                        size="sm"
                      >
                        {alert.severity}
                      </Badge>
                      {isUnread && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-chocolate-700 mt-1 leading-relaxed max-w-2xl">
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-chocolate-400 mt-2">
                      <span>{alert.date} at {alert.time}</span>
                      <span>•</span>
                      <span className="uppercase font-semibold tracking-wider text-chocolate-500">{alert.type.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {alert.action_label && (
                    <button
                      onClick={() => handleActionClick(alert.action_target)}
                      className="px-3.5 py-1.5 rounded-xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-xs shadow-warm transition-all flex items-center gap-1"
                    >
                      <span>{alert.action_label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {isUnread && (
                    <button
                      onClick={() => markAlertAsRead(alert.id)}
                      className="p-2 text-chocolate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="p-2 text-chocolate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Delete alert"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
