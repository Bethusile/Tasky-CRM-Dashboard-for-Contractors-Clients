// src/contexts/AuthContext.tsx

import { useEffect, useState, useContext, createContext, ReactNode } from 'react';
import { createClient, Session, User } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // This is the key part that updates state on auth events
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Initial check for a session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Here is the new, asynchronous login function
  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    // Supabase has no concept of roles in the signInWithPassword call,
    // so the 'role' parameter is not used here. You would handle roles
    // and profile management in a separate function or database table.
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login failed:', error.message);
      return false;
    }

    // A successful login returns a session and user, which will
    // trigger the onAuthStateChange listener above and update the state.
    // The login component will then see a 'success' value and redirect.
    return !!data.session;
  };

  const value = { user, session, login };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};