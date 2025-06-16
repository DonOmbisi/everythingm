import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';

interface AdminContextType {
  isAdmin: boolean;
  loginAsAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  addSubcategory: (category: string, subcategory: string) => void;
  deleteSubcategory: (category: string, subcategory: string) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const loginAsAdmin = (password: string): boolean => {
    // Simple password check - in production, this would be more secure
    if (password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    await fetch('http://localhost:3001/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    await fetch(`http://localhost:3001/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
  };

  const deleteProduct = async (id: string) => {
    await fetch(`http://localhost:3001/api/products/${id}`, {
      method: 'DELETE'
    });
  };

  const addCategory = (category: string) => {
    // In a real app, this would make an API call
    console.log('Adding category:', category);
  };

  const deleteCategory = (category: string) => {
    // In a real app, this would make an API call
    console.log('Deleting category:', category);
  };

  const addSubcategory = (category: string, subcategory: string) => {
    // In a real app, this would make an API call
    console.log('Adding subcategory:', category, subcategory);
  };

  const deleteSubcategory = (category: string, subcategory: string) => {
    // In a real app, this would make an API call
    console.log('Deleting subcategory:', category, subcategory);
  };

  return (
    <AdminContext.Provider value={{
      isAdmin,
      loginAsAdmin,
      logoutAdmin,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      deleteCategory,
      addSubcategory,
      deleteSubcategory
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};