"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface FavoriteContextProps {
  favoriteDestinations: string[];
  addFavoriteDestination: (destinationId: string) => void;
  removeFavoriteDestination: (destinationId: string) => void;
  isFavorite: (destinationId: string) => boolean;
}

const FavoriteContext = createContext<FavoriteContextProps | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn, user } = useAuth();
  const [favoriteDestinations, setFavoriteDestinations] = useState<string[]>([]);

  // Load favorite destinations from localStorage when component mounts
  useEffect(() => {
    if (isLoggedIn && user) {
      const userId = user.id;
      const saved = localStorage.getItem(`favorite-destinations-${userId}`);
      if (saved) {
        try {
          setFavoriteDestinations(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse favorite destinations from localStorage", e);
          setFavoriteDestinations([]);
        }
      }
    } else {
      setFavoriteDestinations([]);
    }
  }, [isLoggedIn, user]);

  // Save to localStorage whenever favoriteDestinations changes
  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem(
        `favorite-destinations-${user.id}`,
        JSON.stringify(favoriteDestinations)
      );
    }
  }, [favoriteDestinations, isLoggedIn, user]);

  // Add a destination to favorite list
  const addFavoriteDestination = (destinationId: string) => {
    if (isLoggedIn && !favoriteDestinations.includes(destinationId)) {
      setFavoriteDestinations([...favoriteDestinations, destinationId]);
    }
  };

  // Remove a destination from favorite list
  const removeFavoriteDestination = (destinationId: string) => {
    if (isLoggedIn) {
      setFavoriteDestinations(
        favoriteDestinations.filter(id => id !== destinationId)
      );
    }
  };

  // Check if a destination is in favorites
  const isFavorite = (destinationId: string) => {
    return favoriteDestinations.includes(destinationId);
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoriteDestinations,
        addFavoriteDestination,
        removeFavoriteDestination,
        isFavorite
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
}
