'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  AuthError
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
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

const getOfficerFromFirebaseUser = (user: User | null): OfficerProfile | null => {
  if (!user || !user.email) return null;
  const trimmed = user.email.toLowerCase();
  const localPart = trimmed.split('@')[0];
  const formattedName =
    trimmed === 'inspector@example.com' || trimmed === 'r.sharma.lm@delhi.gov.in'
      ? DEFAULT_OFFICER.name
      : (user.displayName || localPart.replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));

  return {
    ...DEFAULT_OFFICER,
    id: user.uid,
    email: user.email,
    name: formattedName || DEFAULT_OFFICER.name
  };
};

interface AuthContextType {
  user: User | null;
  officer: OfficerProfile | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [officer, setOfficer] = useState<OfficerProfile | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setOfficer(getOfficerFromFirebaseUser(currentUser));
      setIsInitialized(true);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, password: string): Promise<void> => {
    const trimmed = email.trim();
    if (!trimmed || !password) {
      throw new Error('Please enter both email and password.');
    }

    try {
      await signInWithEmailAndPassword(auth, trimmed, password);
    } catch (err: unknown) {
      const authError = err as AuthError;
      if (
        authError.code === 'auth/invalid-credential' ||
        authError.code === 'auth/user-not-found' ||
        authError.code === 'auth/wrong-password' ||
        authError.code === 'auth/invalid-login-credentials'
      ) {
        throw new Error('Email or password is incorrect');
      } else if (authError.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      } else if (authError.code === 'auth/too-many-requests') {
        throw new Error('Too many unsuccessful attempts. Please try again later.');
      } else {
        throw new Error(authError.message || 'Email or password is incorrect');
      }
    }
  };

  const signUpWithEmail = async (email: string, password: string): Promise<void> => {
    const trimmed = email.trim();
    if (!trimmed || !password) {
      throw new Error('Please enter both email and password.');
    }

    try {
      await createUserWithEmailAndPassword(auth, trimmed, password);
    } catch (err: unknown) {
      const authError = err as AuthError;
      if (authError.code === 'auth/email-already-in-use') {
        throw new Error('User already exists. Please sign in');
      } else if (authError.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters.');
      } else if (authError.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address.');
      } else {
        throw new Error(authError.message || 'Failed to create account. Please try again.');
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Error signing out:', err);
    } finally {
      setUser(null);
      setOfficer(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        officer,
        isAuthenticated: Boolean(user),
        isInitialized,
        loginWithEmail,
        signUpWithEmail,
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
