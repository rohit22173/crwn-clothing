import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';


const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
});


const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem);

}

const clearCartItem = (cartItems, cartItemToClear) => (cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id));


const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

export const CartProvider = ({ children }) => {
    const [{ cartItems, cartCount, isCartOpen, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount }));
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }

    const addItemToCart = (productToAdd) => {
        // setCartItems(addCartItem(cartItems, productToAdd));
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        // setCartItems(removeCartItem(cartItems, cartItemToRemove));
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        // setCartItems(clearCartItem(cartItems, cartItemToClear));
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemReducer(newCartItems);
    }


    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}