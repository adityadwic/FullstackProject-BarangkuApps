// components/OfflineIndicator.js
import { useState, useEffect } from 'react';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (!online) {
        setShowOfflineMessage(true);
      } else if (showOfflineMessage) {
        // Show brief "back online" message
        setTimeout(() => setShowOfflineMessage(false), 3000);
      }
    };

    updateOnlineStatus(); // Check initial status

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [showOfflineMessage]);

  if (!showOfflineMessage) return null;

  return (
    <div className={`fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm transition-all duration-500 ${
      isOnline ? 'translate-y-0' : 'translate-y-0'
    }`}>
      <div className={`p-4 rounded-2xl shadow-modern-xl border ${
        isOnline 
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
          : 'bg-amber-50 border-amber-200 text-amber-800'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
            isOnline ? 'bg-emerald-100' : 'bg-amber-100'
          }`}>
            {isOnline ? (
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 2.83L3 21m9-13.828a4.978 4.978 0 00-1.414 2.83M3 21l2.828-2.828m0 0a9.002 9.002 0 012.12-5.86m2.12 5.86L12 15.172m0 0L9.172 12.343M12 15.172l2.828 2.828M15 12.343L12 15.172M12 15.172L9.172 18M15 12.343L12.172 9.515" />
              </svg>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">
              {isOnline ? 'Back Online' : 'You\'re Offline'}
            </p>
            <p className="text-xs opacity-80">
              {isOnline 
                ? 'Connection restored. All features are available.' 
                : 'Some features may be limited. Data will sync when reconnected.'
              }
            </p>
          </div>
          
          <button 
            onClick={() => setShowOfflineMessage(false)}
            className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflineIndicator;