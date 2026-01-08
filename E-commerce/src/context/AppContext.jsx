
import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/mockData';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('swiftshop_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('swiftshop_reviews');
    return saved ? JSON.parse(saved) : [];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('swiftshop_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('swiftshop_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('swiftshop_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('swiftshop_cart', JSON.stringify(cart));
  }, [cart]);

  const addProduct = (p) => setProducts([...products, p]);
  
  const updateProduct = (p) => {
    setProducts(products.map(item => item.id === p.id ? p : item));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addReview = (r) => setReviews([...reviews, r]);

  const addToCart = (p) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === p.id);
      if (existing) {
        return prev.map(item => item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...p, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      products, reviews, cart,
      addProduct, updateProduct, deleteProduct,
      addReview, addToCart, removeFromCart, clearCart
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};