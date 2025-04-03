
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export type AuthMethod = 'email' | 'phone' | 'google' | 'passkey';
export type TwoFactorMethod = 'none' | 'sms' | 'app' | 'email';

export interface UserProfile {
  id: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  twoFactorEnabled: boolean;
  twoFactorMethod: TwoFactorMethod;
  isVerified: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  authMethod: AuthMethod | null;
  twoFactorPending: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithPasskey: () => Promise<void>;
  signUp: (method: AuthMethod, credentials: any) => Promise<void>;
  signOut: () => Promise<void>;
  verifyTwoFactor: (code: string) => Promise<void>;
  setupTwoFactor: (method: TwoFactorMethod) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authMethod, setAuthMethod] = useState<AuthMethod | null>(null);
  const [twoFactorPending, setTwoFactorPending] = useState<boolean>(false);
  
  // Mock verification with localStorage for demo
  useEffect(() => {
    setIsLoading(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock authentication
      const mockUser: UserProfile = {
        id: Math.random().toString(36).substring(2, 15),
        displayName: email.split('@')[0],
        email: email,
        phoneNumber: null,
        photoURL: null,
        twoFactorEnabled: false,
        twoFactorMethod: 'none',
        isVerified: true
      };
      
      // For demo, check if user has 2FA enabled
      if (email.includes('2fa')) {
        setTwoFactorPending(true);
        setAuthMethod('email');
        // Store partial auth state
        sessionStorage.setItem('pendingAuth', JSON.stringify(mockUser));
        toast({
          title: "2FA Required",
          description: "Please check your email or authentication app for the verification code."
        });
        return;
      }

      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in."
      });
    } catch (error) {
      console.error('Email sign-in error:', error);
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: "Please check your credentials and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithPhone = async (phoneNumber: string) => {
    try {
      setIsLoading(true);
      // Mock authentication
      setAuthMethod('phone');
      setTwoFactorPending(true);
      
      const mockUser: UserProfile = {
        id: Math.random().toString(36).substring(2, 15),
        displayName: null,
        email: null,
        phoneNumber: phoneNumber,
        photoURL: null,
        twoFactorEnabled: false,
        twoFactorMethod: 'none',
        isVerified: false
      };
      
      sessionStorage.setItem('pendingAuth', JSON.stringify(mockUser));
      
      toast({
        title: "Verification code sent",
        description: `Please enter the code sent to ${phoneNumber}`
      });
    } catch (error) {
      console.error('Phone sign-in error:', error);
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: "Please check your phone number and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      // Mock Google authentication
      const mockUser: UserProfile = {
        id: Math.random().toString(36).substring(2, 15),
        displayName: "Google User",
        email: "user@gmail.com",
        phoneNumber: null,
        photoURL: null,
        twoFactorEnabled: false,
        twoFactorMethod: 'none',
        isVerified: true
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Welcome via Google!",
        description: "You have successfully signed in with Google."
      });
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast({
        variant: "destructive",
        title: "Google sign in failed",
        description: "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithPasskey = async () => {
    try {
      setIsLoading(true);
      // Mock passkey authentication
      const mockUser: UserProfile = {
        id: Math.random().toString(36).substring(2, 15),
        displayName: "Passkey User",
        email: "user@example.com",
        phoneNumber: null,
        photoURL: null,
        twoFactorEnabled: false,
        twoFactorMethod: 'none',
        isVerified: true
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Welcome via Passkey!",
        description: "You have successfully signed in with your passkey."
      });
    } catch (error) {
      console.error('Passkey sign-in error:', error);
      toast({
        variant: "destructive",
        title: "Passkey authentication failed",
        description: "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (method: AuthMethod, credentials: any) => {
    try {
      setIsLoading(true);
      setAuthMethod(method);
      
      let mockUser: UserProfile = {
        id: Math.random().toString(36).substring(2, 15),
        displayName: null,
        email: null,
        phoneNumber: null,
        photoURL: null,
        twoFactorEnabled: false,
        twoFactorMethod: 'none',
        isVerified: false
      };
      
      switch (method) {
        case 'email':
          mockUser.email = credentials.email;
          mockUser.displayName = credentials.email.split('@')[0];
          break;
        case 'phone':
          mockUser.phoneNumber = credentials.phone;
          mockUser.displayName = "Phone User";
          setTwoFactorPending(true);
          break;
        case 'google':
          mockUser.email = "new_user@gmail.com";
          mockUser.displayName = "New Google User";
          mockUser.isVerified = true;
          break;
        case 'passkey':
          mockUser.email = credentials.email;
          mockUser.displayName = credentials.email.split('@')[0];
          mockUser.isVerified = true;
          break;
      }
      
      if (method === 'phone' || method === 'email' && credentials.twoFactorSetup) {
        sessionStorage.setItem('pendingAuth', JSON.stringify(mockUser));
        toast({
          title: "Verification required",
          description: "Please verify your account to continue."
        });
      } else {
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast({
          title: "Account created!",
          description: "Your account has been successfully created."
        });
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: "Please check your information and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyTwoFactor = async (code: string) => {
    try {
      setIsLoading(true);
      // Mock verification
      const pendingAuth = sessionStorage.getItem('pendingAuth');
      
      if (!pendingAuth) {
        throw new Error('No pending authentication');
      }
      
      // Mock code verification (in a real app, this would call an API)
      if (code === '123456' || code.length === 6) {
        const mockUser = JSON.parse(pendingAuth);
        mockUser.isVerified = true;
        
        setUser(mockUser);
        setIsAuthenticated(true);
        setTwoFactorPending(false);
        localStorage.setItem('user', JSON.stringify(mockUser));
        sessionStorage.removeItem('pendingAuth');
        
        toast({
          title: "Verification successful",
          description: "You have successfully verified your account."
        });
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "Invalid verification code. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupTwoFactor = async (method: TwoFactorMethod) => {
    try {
      if (!user) return;
      
      setIsLoading(true);
      const updatedUser = {
        ...user,
        twoFactorEnabled: method !== 'none',
        twoFactorMethod: method
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: method === 'none' ? "Two-factor disabled" : "Two-factor enabled", 
        description: method === 'none' 
          ? "Two-factor authentication has been disabled" 
          : `Two-factor authentication has been enabled using ${method}`
      });
    } catch (error) {
      console.error('Two factor setup error:', error);
      toast({
        variant: "destructive",
        title: "Two-factor setup failed",
        description: "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    setIsAuthenticated(false);
    setAuthMethod(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('pendingAuth');
    toast({
      title: "Signed out",
      description: "You have been successfully signed out."
    });
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user) return;
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error) {
      console.error('Profile update error:', error);
      toast({
        variant: "destructive",
        title: "Profile update failed",
        description: "Please try again later."
      });
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated,
        user,
        isLoading,
        authMethod,
        twoFactorPending,
        signInWithEmail,
        signInWithPhone,
        signInWithGoogle,
        signInWithPasskey,
        signUp,
        signOut,
        verifyTwoFactor,
        setupTwoFactor,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
