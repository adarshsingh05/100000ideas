import { useState, useEffect } from "react";

const STORAGE_KEY = "ideaViews";
const MAX_FREE_VIEWS = 10;

export const useIdeaAccess = () => {
  const [viewCount, setViewCount] = useState(0);
  const [hasAccess, setHasAccess] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedViews = localStorage.getItem(STORAGE_KEY);
    const currentViews = storedViews ? parseInt(storedViews, 10) : 0;

    setViewCount(currentViews);
    setHasAccess(currentViews < MAX_FREE_VIEWS);
  }, []);

  const incrementView = () => {
    const newCount = viewCount + 1;
    setViewCount(newCount);
    setHasAccess(newCount < MAX_FREE_VIEWS);
    localStorage.setItem(STORAGE_KEY, newCount.toString());
  };

  const resetViews = () => {
    setViewCount(0);
    setHasAccess(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    viewCount,
    hasAccess,
    incrementView,
    resetViews,
    maxFreeViews: MAX_FREE_VIEWS,
    remainingViews: Math.max(0, MAX_FREE_VIEWS - viewCount),
  };
};



