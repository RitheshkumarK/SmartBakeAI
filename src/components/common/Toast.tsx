import React from 'react';
import { CheckCircle2, AlertTriangle, Info, AlertCircle, X } from 'lucide-react';
import { useBakery } from '../../context/BakeryContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useBakery();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-caramel-600 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-300 bg-white/95 text-emerald-950',
    warning: 'border-amber-300 bg-white/95 text-amber-950',
    error: 'border-rose-300 bg-white/95 text-rose-950',
    info: 'border-caramel-300 bg-white/95 text-chocolate-950'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-warm-lg backdrop-blur-md transition-all duration-300 transform animate-in slide-in-from-bottom-5 ${borders[toast.type]}`}
        >
          {icons[toast.type]}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-chocolate-900">{toast.title}</h4>
            <p className="text-xs text-chocolate-700 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-chocolate-400 hover:text-chocolate-800 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
