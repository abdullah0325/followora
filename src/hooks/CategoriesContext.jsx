'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CategoriesContext = createContext();

export const useAppCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useAppCategories must be used within CategoriesProvider');
  }
  return context;
};

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categories?is_active=true&limit=100');
        const data = await response.json();

        if (data.success && data.data.categories) {
          setCategories(data.data.categories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoriesContext.Provider>
  );
};
