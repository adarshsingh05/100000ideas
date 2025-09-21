import { useState, useEffect } from "react";

const STORAGE_KEY = "ideaViews";
const MAX_FREE_VIEWS = 5;

export const useIdeaAccess = () => {
  const [viewCount, setViewCount] = useState(0);
  const [hasAccess, setHasAccess] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    setIsClient(true);

    try {
      const storedViews = localStorage.getItem(STORAGE_KEY);
      const currentViews = storedViews ? parseInt(storedViews, 10) : 0;

      setViewCount(currentViews);
      setHasAccess(currentViews < MAX_FREE_VIEWS);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      // Fallback values for SSR
      setViewCount(0);
      setHasAccess(true);
    }
  }, []);

  const incrementView = () => {
    if (!isClient) return;

    const newCount = viewCount + 1;
    setViewCount(newCount);
    setHasAccess(newCount < MAX_FREE_VIEWS);

    try {
      localStorage.setItem(STORAGE_KEY, newCount.toString());
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const resetViews = () => {
    if (!isClient) return;

    setViewCount(0);
    setHasAccess(true);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  };

  return {
    viewCount,
    hasAccess,
    incrementView,
    resetViews,
    maxFreeViews: MAX_FREE_VIEWS,
    remainingViews: Math.max(0, MAX_FREE_VIEWS - viewCount),
    isClient,
  };
};
