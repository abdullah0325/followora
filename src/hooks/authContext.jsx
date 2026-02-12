'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { callPublicApi, callPrivateApi } from '@/services/callApis';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasFetchedUser, setHasFetchedUser] = useState(false);

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  /* ======================================================
     LOAD USER ONCE (page refresh)
  ====================================================== */
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken && !hasFetchedUser) {
      setToken(storedToken);
      fetchCurrentUser(storedToken).finally(() => {
        setHasFetchedUser(true);
      });
    } else {
      setLoading(false);
    }
  }, [hasFetchedUser]);

  /* ======================================================
     SIGNUP
  ====================================================== */
  const signup = async (userData) => {
    try {
      const res = await callPublicApi('/auth/signup', 'POST', userData);
      console.log("Signup response:", res);

      // Handle both formats: { token, user } or { data: { token, user } }
      const token = res.token || res.data?.token;
      const user = res.user || res.data?.user;

      if (token && user) {
        localStorage.setItem('token', token);
        setToken(token);
        setUser(user);
        toast.success(res.message || 'Account created and logged in!');
        return true;
      } else {
        toast.success(res.message || 'Account created successfully');
        return true;
      }
    } catch (err) {
      console.error('Signup error:', err);
      toast.error(err?.message || 'Signup failed');
      return false;
    }
  };

  /* ======================================================
     LOGIN
  ====================================================== */
  const login = async (credentials) => {
    try {
      const res = await callPublicApi('/auth/login', 'POST', credentials);
      console.log("Login response:", res);

      if (res.token && res.user) {
        localStorage.setItem('token', res.token);
        setToken(res.token);
        setUser(res.user);
        toast.success('Login successful');
        return true;
      } else {
        toast.error('Invalid response format');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err?.message || 'Login failed');
      return false;
    }
  };

  /* ======================================================
     GET CURRENT USER
  ====================================================== */
  const fetchCurrentUser = async (tokenParam) => {
    try {
      const res = await callPrivateApi(
        '/auth/me',
        'GET',
        undefined,
        tokenParam
      );
      console.log("res me", res);

      setUser(res.data?.user || res.user);
    } catch (err) {
      console.error('Auth failed');
      logout();
    } finally {
      setLoading(false);
    }
  };

  /* ======================================================
     LOGOUT
  ====================================================== */
  const logout = async () => {
    try {
      await callPrivateApi('/auth/logout', 'POST');
    } catch (err) {
      console.log('Logout error ignored');
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
      setHasFetchedUser(false);
      router.push('/auth/login');
      toast.success('Logged out');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,

        signup,
        login,
        logout,
        fetchCurrentUser,

        isSidebarOpen,
        toggleSidebar,
        setSidebarOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ======================================================
   HOOK
 ====================================================== */
export const useAuth = () => useContext(AuthContext);
