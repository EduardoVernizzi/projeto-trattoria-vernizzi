import React, { createContext, useContext, useState } from 'react';
import Swal from 'sweetalert2';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        Swal.fire({
          icon: 'success',
          title: 'Item adicionado ao carrinho!',
          showConfirmButton: false,
          timer: 1200,
          timerProgressBar: true,
        });
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }

      Swal.fire({
        icon: 'success',
        title: 'Item adicionado ao carrinho!',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
      });

      return [...prevItems, item];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        totalQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};