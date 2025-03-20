import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import type { CartItem } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

interface CartContextType {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'psyche-cart';

function cartReducer(state: CartState, action: CartAction): CartState {
  let newState: CartState;

  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => 
          item.id === action.payload.id &&
          item.selectedAroma === action.payload.selectedAroma &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedDecoration === action.payload.selectedDecoration
      );

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
        newState = {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
        };
      } else {
        const newItems = [...state.items, action.payload];
        newState = {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
        };
      }
      break;
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      newState = {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
      break;
    }
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      newState = {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
      break;
    }
    case 'CLEAR_CART':
      newState = {
        items: [],
        total: 0,
      };
      break;
    case 'LOAD_CART':
      newState = action.payload;
      break;
    default:
      return state;
  }

  // Persist cart state to localStorage
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
  return newState;
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}