import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [role, setRole] = useState('customer'); // 'customer' | 'merchant'

  const toggleRole = () => {
    setRole(prev => (prev === 'customer' ? 'merchant' : 'customer'));
  };

  return (
    <RoleContext.Provider value={{ role, setRole, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

