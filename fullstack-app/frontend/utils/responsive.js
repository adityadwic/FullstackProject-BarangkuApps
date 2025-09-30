// utils/responsive.js
// Fungsi-fungsi utilitas untuk tampilan responsif

// Fungsi untuk mendapatkan ukuran layar
export const getScreenSize = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    
    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    if (width < 1536) return 'xl';
    
    return '2xl';
  }
  
  return null;
};

// Fungsi untuk mengecek apakah perangkat mobile
export const isMobile = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768;
  }
  return false;
};

// Fungsi untuk mengecek apakah perangkat tablet
export const isTablet = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    return width >= 768 && width < 1024;
  }
  return false;
};

// Fungsi untuk mengecek apakah perangkat desktop
export const isDesktop = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth >= 1024;
  }
  return false;
};

// Fungsi untuk mengecek orientasi layar
export const getOrientation = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  }
  return null;
};