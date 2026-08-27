'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { OfficerProfile } from '@/lib/types/officer';

const DEFAULT_OFFICER: OfficerProfile = {
  id: 'officer-dl-402',
  name: 'Rajesh Sharma',
  badgeNumber: 'LM-DEL-2024-88',
  designation: 'Senior Legal Metrology Inspector',
  department: 'Department of Consumer Affairs, Legal Metrology Division',
  circleZone: 'Delhi North Zone (Circle 04)',
  email: 'r.sharma.lm@delhi.gov.in',
  role: 'INSPECTOR',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  activeInspectionsToday: 6,
  totalInspectionsCount: 142
};

interface AuthContextType {
  officer: OfficerProfile | null;
  isAuthenticated: boolean;
  loginAsOfficer: (badgeId?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [officer, setOfficer] = useState<OfficerProfile | null>(DEFAULT_OFFICER);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('labellens_officer_session');
    if (stored) {
      try {
        setOfficer(JSON.parse(stored));
      } catch {
        setOfficer(DEFAULT_OFFICER);
      }
    }
  }, []);

  const loginAsOfficer = (badgeId?: string) => {
    const profile: OfficerProfile = {
      ...DEFAULT_OFFICER,
      badgeNumber: badgeId || DEFAULT_OFFICER.badgeNumber
    };
    setOfficer(profile);
    if (typeof window !== 'undefined') {
      localStorage.setItem('labellens_officer_session', JSON.stringify(profile));
    }
  };

  const logout = () => {
    setOfficer(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('labellens_officer_session');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        officer: mounted ? officer : DEFAULT_OFFICER,
        isAuthenticated: Boolean(officer),
        loginAsOfficer,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
