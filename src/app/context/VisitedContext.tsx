"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface VisitedContextProps {
  visitedDestinations: string[];
  addVisitedDestination: (destinationId: string) => void;
  removeVisitedDestination: (destinationId: string) => void;
  isVisited: (destinationId: string) => boolean;
}

const VisitedContext = createContext<VisitedContextProps | undefined>(undefined);

export function VisitedProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn, user } = useAuth();
  const [visitedDestinations, setVisitedDestinations] = useState<string[]>([]);

  // Load visited destinations from localStorage when component mounts
  useEffect(() => {
    if (isLoggedIn && user) {
      const userId = user.id;
      const saved = localStorage.getItem(`visited-destinations-${userId}`);
      if (saved) {
        try {
          setVisitedDestinations(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse visited destinations from localStorage", e);
          setVisitedDestinations([]);
        }
      }
    } else {
      setVisitedDestinations([]);
    }
  }, [isLoggedIn, user]);

  // Save to localStorage whenever visitedDestinations changes
  useEffect(() => {
    if (isLoggedIn && user && visitedDestinations.length > 0) {
      localStorage.setItem(
        `visited-destinations-${user.id}`,
        JSON.stringify(visitedDestinations)
      );
    }
  }, [visitedDestinations, isLoggedIn, user]);

  // Add a destination to visited list
  const addVisitedDestination = (destinationId: string) => {
    if (isLoggedIn && !visitedDestinations.includes(destinationId)) {
      setVisitedDestinations([...visitedDestinations, destinationId]);
    }
  };

  // Remove a destination from visited list
  const removeVisitedDestination = (destinationId: string) => {
    if (isLoggedIn) {
      setVisitedDestinations(
        visitedDestinations.filter(id => id !== destinationId)
      );
    }
  };

  // Check if a destination has been visited
  const isVisited = (destinationId: string) => {
    return visitedDestinations.includes(destinationId);
  };

  return (
    <VisitedContext.Provider
      value={{
        visitedDestinations,
        addVisitedDestination,
        removeVisitedDestination,
        isVisited
      }}
    >
      {children}
    </VisitedContext.Provider>
  );
}

export function useVisited() {
  const context = useContext(VisitedContext);
  if (context === undefined) {
    throw new Error("useVisited must be used within a VisitedProvider");
  }
  return context;
}
