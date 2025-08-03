import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description?: string;
  category: string;
  subCategory?: string;
  weight: string;
  serves: string;
  inStock: boolean;
  addedAt: string;
}

interface WishlistState {
  items: WishlistItem[];
}

// Load wishlist from localStorage on initialization
const loadWishlistFromStorage = (): WishlistItem[] => {
  try {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading wishlist from localStorage:', error);
    return [];
  }
};

const initialState: WishlistState = {
  items: loadWishlistFromStorage(),
};

// Helper function to save wishlist to localStorage
const saveWishlistToStorage = (items: WishlistItem[]) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Omit<WishlistItem, 'addedAt'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (!existingItem) {
        const newItem = {
          ...action.payload,
          addedAt: new Date().toISOString(),
        };
        state.items.push(newItem);
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveWishlistToStorage(state.items);
    },
    toggleWishlist: (state, action: PayloadAction<Omit<WishlistItem, 'addedAt'>>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push({
          ...action.payload,
          addedAt: new Date().toISOString(),
        });
      }
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer; 