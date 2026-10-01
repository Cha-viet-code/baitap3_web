import { create } from 'zustand';
import type { Product } from '../../types';

interface FavoritesState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  addFavorite: (product) =>
    set((state) => {
      const exists = state.favorites.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return state;
      }

      return {
        favorites: [...state.favorites, product],
      };
    }),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter(
        (item) => item.id !== id
      ),
    })),

  toggleFavorite: (product) => {
    const exists = get().favorites.some(
      (item) => item.id === product.id
    );

    if (exists) {
      get().removeFavorite(product.id);
    } else {
      get().addFavorite(product);
    }
  },

  isFavorite: (id) =>
    get().favorites.some(
      (item) => item.id === id
    ),
}));