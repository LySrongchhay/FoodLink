import { useState, useEffect, useCallback } from 'react';

function detectPortalFromLocation() {
  if (typeof window === 'undefined') return 'launcher';

  const pathname = window.location.pathname.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.toLowerCase();

  // 1. Check path
  if (pathname.includes('/customer')) return 'customer';
  if (pathname.includes('/merchant') || pathname.includes('/admin')) return 'merchant';

  // 2. Check query params (ideal for static hosts without SPA rewrites)
  const roleParam = searchParams.get('role') || searchParams.get('portal') || searchParams.get('view');
  if (roleParam === 'customer') return 'customer';
  if (roleParam === 'merchant' || roleParam === 'admin') return 'merchant';

  // 3. Check hash fragments
  if (hash.includes('customer')) return 'customer';
  if (hash.includes('merchant') || hash.includes('admin')) return 'merchant';

  // 4. Default root
  return 'launcher';
}

export function usePortalRouter() {
  const [portal, setPortal] = useState(detectPortalFromLocation);

  useEffect(() => {
    const handleLocationChange = () => {
      setPortal(detectPortalFromLocation());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('foodlink:navigate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('foodlink:navigate', handleLocationChange);
    };
  }, []);

  const navigateTo = useCallback((newPortal) => {
    let targetPath = '/';
    if (newPortal === 'customer') targetPath = '/customer';
    if (newPortal === 'merchant') targetPath = '/merchant';

    try {
      window.history.pushState({}, '', targetPath);
    } catch {
      // Fallback for strict origin restrictions
      window.location.hash = newPortal === 'launcher' ? '' : `#/${newPortal}`;
    }

    setPortal(newPortal);
    window.dispatchEvent(new Event('foodlink:navigate'));
  }, []);

  // Compute absolute URLs for QR codes
  const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}` : '';
  const customerUrl = `${baseUrl}/customer`;
  const merchantUrl = `${baseUrl}/merchant`;

  return {
    portal,
    navigateTo,
    customerUrl,
    merchantUrl
  };
}

