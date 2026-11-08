import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('fighter_forge_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
      return [];
    }
  });

  const [toast, setToast] = useState(null); // { message, title, link }
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('fighter_forge_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (title, message = '', link = null) => {
    setToast({ title, message, link, id: Date.now() });
  };

  const hideToast = () => {
    setToast(null);
  };

  const addToCart = (product, options = {}) => {
    const selectedSize = options.size || product.defaultSize || (product.sizes ? product.sizes[0] : null);
    const selectedHeight = options.height || product.defaultHeight || (product.heightOptions ? product.heightOptions[0] : (product.elevationHeight || null));
    const selectedShape = options.shape || product.defaultShape || (product.shapes ? product.shapes[0] : null);
    const quantity = options.quantity || 1;

    setCartItems(prev => {
      // Find if identical configuration exists
      const existingIndex = prev.findIndex(item => 
        item.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedHeight === selectedHeight &&
        item.selectedShape === selectedShape
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      const newItem = {
        cartId: `${product.id}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        price: product.price,
        priceNumeric: product.priceNumeric,
        elevationType: product.elevationType,
        selectedSize,
        selectedHeight,
        selectedShape,
        quantity
      };
      return [...prev, newItem];
    });

    showToast(
      'ADDED TO ENQUIRY CART',
      `${product.name} (${selectedSize || ''}${selectedHeight ? ' • ' + selectedHeight : ''}) added.`,
      '/cart'
    );
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCartItems(prev => prev.map(item => item.cartId === cartId ? { ...item, quantity } : item));
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItems,
      toast,
      showToast,
      hideToast,
      quickViewProduct,
      openQuickView,
      closeQuickView
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
