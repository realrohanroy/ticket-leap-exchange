
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/types';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing Supabase session on mount
  useEffect(() => {
    const checkAuthSession = async () => {
      try {
        const { data: sessionData, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          return;
        }
        
        if (sessionData?.session) {
          const { data: userData } = await supabase.auth.getUser();
          
          // Get profile data
          if (userData?.user) {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', userData.user.id)
              .single();
              
            const userWithProfile: User = {
              id: userData.user.id,
              email: userData.user.email || '',
              name: profileData?.name || userData.user.email?.split('@')[0] || '',
            };
            
            setUser(userWithProfile);
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        if (session) {
          try {
            // Get profile data
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
              
            const userWithProfile: User = {
              id: session.user.id,
              email: session.user.email || '',
              name: profileData?.name || session.user.email?.split('@')[0] || '',
            };
            
            setUser(userWithProfile);
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        } else {
          setUser(null);
        }
      }
    );
    
    checkAuthSession();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Logged in successfully!");
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error(error.message || "Login failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      setIsLoading(true);
      
      // Add name to user metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Account created successfully!");
      
      if (data?.user && !data?.session) {
        toast.info("Please check your email to confirm your account.");
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
      toast.error(error.message || "Registration failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });
      
      if (error) {
        throw error;
      }
      
      // The redirect will happen automatically, so we don't need to do anything else here
    } catch (error: any) {
      console.error('Google sign in failed:', error);
      toast.error(error.message || "Google sign-in failed. Please try again.");
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    supabase.auth.signOut()
      .then(() => {
        setUser(null);
        toast.success("Logged out successfully!");
      })
      .catch(error => {
        console.error('Logout failed:', error);
        toast.error("Logout failed. Please try again.");
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        signInWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
