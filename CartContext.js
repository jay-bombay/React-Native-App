import React, { createContext, useContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.variantId === product.variantId);
            if (existingItem) {
                return prevItems.map(item =>
                    item.variantId === product.variantId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1, variantId: product.variantId }];
            }
        });
    };    

    const removeFromCart = (variantId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.variantId !== variantId));
    };

    const getCartUrl = () => {
        const itemsQuery = cartItems
            .map(item => `${item.variantId.split('/').pop()}:${item.quantity}`)
            .join(',');
        return `https://kaas-testing.myshopify.com/cart/${itemsQuery}`;
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartUrl }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
