import { useState, useEffect, useCallback } from 'react';

const configuredMode = (import.meta.env.VITE_PORTAL_MODE || '').toLowerCase();

export const isLockedPortal = configuredMode === 'customer' || configuredMode === 'merchant';

export const isDedicatedMerchant = isLockedPortal
  ? configuredMode === 'merchant'
  : (typeof window !== 'undefined' && window.location.hostname.toLowerCase().includes('merchant'));

export const isDedicatedCustomer = isLockedPortal
  ? configuredMode === 'customer'
  : (typeof window !== 'undefined' && window.location.hostname.toLowerCase().includes('customer'));

export const hideRoleSwitchers = isLockedPortal || isDedicatedMerchant || isDedicatedCustomer;

function detectPortalFromLocation() {
  // 1. Check build-time or runtime environment lock (e.g. Vercel deployment)
  if (configuredMode === 'customer') return 'customer';
  if (configuredMode === 'merchant' || configuredMode === 'admin') return 'merchant';

  if (typeof window === 'undefined') return 'launcher';

  // 2. Check hostname (e.g. foodlink-merchant.vercel.app or merchant.foodlink.app)
  const hostname = window.location.hostname.toLowerCase();
  if (hostname.includes('merchant')) return 'merchant';
  if (hostname.includes('customer')) return 'customer';

  const pathname = window.location.pathname.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.toLowerCase();

  // 3. Check path
  if (pathname.includes('/customer')) return 'customer';
  if (pathname.includes('/merchant') || pathname.includes('/admin')) return 'merchant';

  // 4. Check query params (ideal for static hosts without SPA rewrites)
  const roleParam = searchParams.get('role') || searchParams.get('portal') || searchParams.get('view');
  if (roleParam === 'customer') return 'customer';
  if (roleParam === 'merchant' || roleParam === 'admin') return 'merchant';

  // 5. Check hash fragments
  if (hash.includes('customer')) return 'customer';
  if (hash.includes('merchant') || hash.includes('admin')) return 'merchant';

  // 6. Default root
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
    // If locked to a single portal, do not navigate away
    if (isLockedPortal) return;

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
    merchantUrl,
    hideRoleSwitchers,
    isLockedPortal
  };
}
