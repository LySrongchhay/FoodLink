import React from 'react';
import clsx from 'clsx';

export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    primary: 'bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/20 font-semibold',
    accent: 'bg-[#FF8A3D]/10 text-[#FF8A3D] border-[#FF8A3D]/25 font-bold',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium',
    warning: 'bg-amber-50 text-amber-700 border-amber-200 font-medium',
    danger: 'bg-rose-50 text-rose-700 border-rose-200 font-medium',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border tracking-tight',
        variants[variant] || variants.default,
        className
      )}
    >
      {children}
    </span>
  );
}

