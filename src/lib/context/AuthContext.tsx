'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { OfficerProfile } from '@/lib/types/officer';

export const DEFAULT_OFFICER: OfficerProfile = {
  id: 'officer-dl-402',
  name: 'Rajesh Sharma',
  badgeNumber: 'LM-DEL-2024-88',
  designation: 'Senior Legal Metrology Inspector',
  department: 'Department of Consumer Affairs, Legal Metrology Division',
  circleZone: 'Delhi North Zone (Circle 04)',
  email: 'inspector@example.com',
  role: 'INSPECTOR',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  activeInspectionsToday: 6,
  totalInspectionsCount: 142
};

interface AuthContextType {
  officer: OfficerProfile | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  loginWithEmail: (email: string, password?: string) => Promise<boolean>;
  loginAsOfficer: (emailOrBadge?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [officer, setOfficer] = useState<OfficerProfile | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('labellens_officer_session');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          setOfficer(parsed);
        } else {
          setOfficer(null);
        }
      } else {
        setOfficer(null);
      }
    } catch {
      setOfficer(null);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const loginWithEmail = async (email: string, password?: string): Promise<boolean> => {
    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      throw new Error('Please enter a valid authorized inspector email address.');
    }

    // Format display name from email if custom email entered, or use default officer details
    const localPart = trimmed.split('@')[0];
    const formattedName =
      trimmed === 'inspector@example.com' || trimmed === 'r.sharma.lm@delhi.gov.in'
        ? DEFAULT_OFFICER.name
        : localPart
            .replace(/[._-]/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());

    const profile: OfficerProfile = {
      ...DEFAULT_OFFICER,
      email: trimmed,
      name: formattedName || DEFAULT_OFFICER.name
    };

    setOfficer(profile);

    if (typeof window !== 'undefined') {
      localStorage.setItem('labellens_officer_session', JSON.stringify(profile));
      localStorage.setItem('labellens_auth_token', `auth-token-${Date.now()}`);
    }

    return true;
  };

  const loginAsOfficer = (emailOrBadge?: string) => {
    const identifier = emailOrBadge || 'inspector@example.com';
    if (identifier.includes('@')) {
      loginWithEmail(identifier);
    } else {
      const profile: OfficerProfile = {
        ...DEFAULT_OFFICER,
        badgeNumber: identifier
      };
      setOfficer(profile);
      if (typeof window !== 'undefined') {
        localStorage.setItem('labellens_officer_session', JSON.stringify(profile));
        localStorage.setItem('labellens_auth_token', `auth-token-${Date.now()}`);
      }
    }
  };

  const logout = () => {
    setOfficer(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('labellens_officer_session');
      localStorage.removeItem('labellens_auth_token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        officer,
        isAuthenticated: Boolean(officer),
        isInitialized,
        loginWithEmail,
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
