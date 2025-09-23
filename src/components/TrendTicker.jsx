"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Zap,
  Star,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

const TrendTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real trend data from Gemini API
  const fetchTrendData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/gemini/trends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Generate 8 current trending business ideas with realistic market data. For each idea, provide:
          1. Category (AI Tools, E-commerce, SaaS, Fintech, HealthTech, EdTech, GreenTech, FoodTech)
          2. Business idea name
          3. Market growth percentage (realistic range 150-500%)
          4. Market size in USD
          5. Competition level (Low/Medium/High)
          6. Investment required (Low/Medium/High)
          7. Time to market (months)
          
          Return as JSON array with fields: category, idea, growth, marketSize, competition, investment, timeToMarket, icon, color, bgColor`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trend data");
      }

      const data = await response.json();

      // Process and enhance the data
      const processedData = data.map((item, index) => ({
        ...item,
        id: index,
        growth: (() => {
          const growthStr = item.growth.toString();
          console.log("Processing growth:", growthStr); // Debug log
          if (growthStr.includes("%")) {
            return growthStr;
          } else if (growthStr.startsWith("+")) {
            return `${growthStr}%`;
          } else {
            return `+${growthStr}%`;
          }
        })(),
        marketSize: formatMarketSize(item.marketSize),
        competition: item.competition,
        investment: item.investment,
        timeToMarket: `${item.timeToMarket} months`,
        icon: getCategoryIcon(item.category),
        color: getCategoryColor(item.category),
        bgColor: getCategoryBgColor(item.category),
        trendScore: calculateTrendScore(
          item.growth,
          item.marketSize,
          item.competition
        ),
      }));

      setTrendingData(processedData);
    } catch (err) {
      console.error("Error fetching trend data:", err);
      setError(err.message);
      // Fallback to hardcoded data
      setTrendingData(getFallbackData());
    } finally {
      setLoading(false);
    }
  };

  // Fallback data in case API fails
  const getFallbackData = () => [
    {
      id: 0,
      category: "AI Tools",
      idea: "AI-Powered Content Creation Platform",
      growth: 340,
      marketSize: "$2.1B",
      competition: "Medium",
      investment: "Medium",
      timeToMarket: "8 months",
      icon: "🤖",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trendScore: 85,
    },
    {
      id: 1,
      category: "E-commerce",
      idea: "Sustainable Product Marketplace",
      growth: 280,
      marketSize: "$1.8B",
      competition: "High",
      investment: "High",
      timeToMarket: "12 months",
      icon: "🌱",
      color: "text-green-600",
      bgColor: "bg-green-50",
      trendScore: 78,
    },
    {
      id: 2,
      category: "SaaS",
      idea: "Remote Team Collaboration Tool",
      growth: 420,
      marketSize: "$3.2B",
      competition: "Medium",
      investment: "Medium",
      timeToMarket: "6 months",
      icon: "💼",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trendScore: 92,
    },
  ];

  // Helper functions
  const formatMarketSize = (size) => {
    if (typeof size === "number") {
      if (size >= 1000000000) return `$${(size / 1000000000).toFixed(1)}B`;
      if (size >= 1000000) return `$${(size / 1000000).toFixed(1)}M`;
      return `$${size.toFixed(0)}K`;
    }
    return size;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "AI Tools": "🤖",
      "E-commerce": "🌱",
      SaaS: "💼",
      Fintech: "💰",
      HealthTech: "🧘",
      EdTech: "🎓",
      GreenTech: "🌍",
      FoodTech: "🍳",
    };
    return icons[category] || "💡";
  };

  const getCategoryColor = (category) => {
    const colors = {
      "AI Tools": "text-blue-600",
      "E-commerce": "text-green-600",
      SaaS: "text-purple-600",
      Fintech: "text-orange-600",
      HealthTech: "text-pink-600",
      EdTech: "text-indigo-600",
      GreenTech: "text-emerald-600",
      FoodTech: "text-red-600",
    };
    return colors[category] || "text-gray-600";
  };

  const getCategoryBgColor = (category) => {
    const bgColors = {
      "AI Tools": "bg-blue-50",
      "E-commerce": "bg-green-50",
      SaaS: "bg-purple-50",
      Fintech: "bg-orange-50",
      HealthTech: "bg-pink-50",
      EdTech: "bg-indigo-50",
      GreenTech: "bg-emerald-50",
      FoodTech: "bg-red-50",
    };
    return bgColors[category] || "bg-gray-50";
  };

  const calculateTrendScore = (growth, marketSize, competition) => {
    let score = 0;

    // Growth impact (0-40 points)
    const growthNum = parseInt(growth.toString().replace(/[+%]/g, ""));
    if (growthNum >= 400) score += 40;
    else if (growthNum >= 300) score += 35;
    else if (growthNum >= 200) score += 30;
    else if (growthNum >= 100) score += 25;
    else score += 20;

    // Market size impact (0-30 points)
    if (marketSize.includes("B")) score += 30;
    else if (marketSize.includes("M")) score += 20;
    else score += 10;

    // Competition impact (0-30 points) - lower competition = higher score
    if (competition === "Low") score += 30;
    else if (competition === "Medium") score += 20;
    else score += 10;

    return Math.min(score, 100);
  };

  useEffect(() => {
    fetchTrendData();
  }, []);

  useEffect(() => {
    if (trendingData.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingData.length);
      }, 3000); // Change every 3 seconds

      return () => clearInterval(interval);
    }
  }, [trendingData]);

  const currentTrend = trendingData[currentIndex];

  // Loading state
  if (loading) {
    return (
      <div className="w-full bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="bg-gray-50 rounded-lg px-4 py-3 flex items-center space-x-2">
              <Loader2 className="w-4 h-4 text-[#FDCC29] animate-spin" />
              <span className="text-gray-600 text-sm font-medium">
                Loading trends...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="bg-gray-50 rounded-lg px-4 py-3 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              <span className="text-gray-600 text-sm font-medium">
                Using cached data
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border-b border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-4">
        {/* Minimal Header */}
        <div className="flex items-center justify-center mb-3">
          <div className="flex items-center space-x-2 bg-[#061F59] text-white px-3 py-1 rounded-full text-xs font-medium">
            <TrendingUp className="w-3 h-3 text-[#FDCC29]" />
            <span>Live Trends</span>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Compact Ticker Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {currentTrend && (
              <motion.div
                key={currentTrend.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <div className="bg-gray-50 rounded-lg px-4 py-3 max-w-4xl w-full border border-gray-200">
                  <div className="flex items-center justify-between">
                    {/* Left - Category & Idea */}
                    <div className="flex items-center space-x-3 flex-1">
                      <div
                        className={`${currentTrend.bgColor} ${currentTrend.color} px-2 py-1 rounded-md text-xs font-semibold flex items-center space-x-1`}
                      >
                        <span>{currentTrend.icon}</span>
                        <span>{currentTrend.category}</span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-[#2D3748] leading-tight">
                          {currentTrend.idea}
                        </h3>
                        <div className="flex items-center space-x-3 text-xs text-gray-500 mt-0.5">
                          <span>Market: {currentTrend.marketSize}</span>
                          <span>•</span>
                          <span>Score: {currentTrend.trendScore}/100</span>
                        </div>
                      </div>
                    </div>

                    {/* Center - Growth */}
                    <div className="flex items-center space-x-2 mx-4">
                      <Zap className="w-4 h-4 text-green-500" />
                      <span className="text-lg font-bold text-green-500">
                        {currentTrend.growth}
                      </span>
                    </div>

                    {/* Right - Action */}
                    <button className="flex items-center space-x-1 bg-[#FDCC29] hover:bg-[#FDCC29]/90 text-[#2D3748] px-3 py-1.5 rounded-md font-medium text-xs transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimal Progress Dots */}
          <div className="flex justify-center mt-2 space-x-1">
            {trendingData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-[#FDCC29] w-4"
                    : "bg-gray-300 w-1 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendTicker;
