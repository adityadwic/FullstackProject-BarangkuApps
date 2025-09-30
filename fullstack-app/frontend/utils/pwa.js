// utils/pwa.js
import { useState, useEffect } from 'react';

export const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone === true;
};

export const isOnline = () => {
  return navigator.onLine;
};

export const addToHomeScreenPrompt = () => {
  // This will be set by the beforeinstallprompt event
  return window.deferredPrompt;
};

export const showInstallBanner = () => {
  const lastDismissed = localStorage.getItem('installPromptDismissed');
  if (!lastDismissed) return true;
  
  const daysSinceDismissed = (Date.now() - parseInt(lastDismissed)) / (1000 * 60 * 60 * 24);
  return daysSinceDismissed > 7; // Show again after 7 days
};

export const trackPWAUsage = (action, data = {}) => {
  // Analytics tracking for PWA usage
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: 'PWA',
      event_label: 'BarangApp',
      ...data
    });
  }
  
  console.log('PWA Action:', action, data);
};

// Hook for online/offline status
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);
  
  return isOnline;
};