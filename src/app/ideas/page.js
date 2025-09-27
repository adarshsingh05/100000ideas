"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useIdeaAccess } from "@/hooks/useIdeaAccess";
import { ideasService } from "@/lib/ideasService";
import { geminiService } from "@/lib/geminiService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Building2,
  Smartphone,
  Leaf,
  Utensils,
  Car,
  Laptop,
  ShoppingBag,
  Camera,
  Dumbbell,
  FileText,
  Megaphone,
  Award,
  TrendingUp,
  Users,
  Lightbulb,
  Star,
  Clock,
  DollarSign,
  ArrowRight,
  Search,
  Target,
  Shield,
  MapPin,
  X,
  User,
  Eye,
  Heart,
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  Zap,
  Briefcase,
  BarChart3,
  Rocket,
  Cpu,
  Sparkles,
  Bot,
  ChevronRight,
  ChevronLeft,
  Loader2,
} from "lucide-react";

// Icon mapping for dynamic icons
const iconMap = {
  Smartphone,
  Utensils,
  Building2,
  Leaf,
  Car,
  Heart,
  Laptop,
  ShoppingBag,
  Camera,
  Dumbbell,
  FileText,
  Megaphone,
  Award,
  TrendingUp,
  Users,
  Lightbulb,
  Clock,
  DollarSign,
  Target,
  Shield,
  MapPin,
  User,
  Eye,
  Zap,
  Sparkles,
};

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIdeas, setTotalIdeas] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedInvestment, setSelectedInvestment] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiStep, setAiStep] = useState(0);
  const [aiAnswers, setAiAnswers] = useState({});
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const ideasPerPage = 12; // Fixed to card view

  const { viewCount, hasAccess, incrementView } = useIdeaAccess();

  // Function to calculate time ago
  const getTimeAgo = (dateString) => {
    if (!dateString) return "Recently";

    const now = new Date();
    const createdDate = new Date(dateString);
    const diffInMs = now - createdDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 60) {
      return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
    } else if (diffInDays < 7) {
      return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }
  };

  // Fetch all ideas
  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const response = await ideasService.getAllIdeas(
        currentPage,
        ideasPerPage
      );
      if (response.success) {
        setIdeas(response.ideas);
        setTotalIdeas(response.pagination?.totalIdeas || 0);
      }
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedInvestment]);

  // Filter and sort ideas
  const filteredAndSortedIdeas = useMemo(() => {
    let filtered = ideas;

    // Search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (idea) =>
          idea.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.tags?.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (idea) =>
          idea.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Difficulty filter
    if (selectedDifficulty) {
      filtered = filtered.filter(
        (idea) =>
          idea.difficulty?.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }

    // Investment filter
    if (selectedInvestment) {
      filtered = filtered.filter((idea) => {
        const investment = idea.investmentRange || idea.investment;
        switch (selectedInvestment) {
          case "low":
            return investment?.includes("Under") || investment?.includes("1L");
          case "medium":
            return (
              investment?.includes("5L") ||
              investment?.includes("10L") ||
              investment?.includes("25L")
            );
          case "high":
            return (
              investment?.includes("50L") ||
              investment?.includes("1Cr") ||
              investment?.includes("Above")
            );
          default:
            return true;
        }
      });
    }

    // Sort ideas
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "views":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "likes":
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [
    ideas,
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    selectedInvestment,
    sortBy,
  ]);

  const handleCardClick = (id) => {
    // No view counting for regular ideas - only featured ideas count views
    // Route community ideas to community-ideas page, static ideas to ideas page
    // Community ideas have _id (MongoDB ObjectId), static ideas have id (number)
    if (id && typeof id === "string" && id.length > 10) {
      // This is a community idea (MongoDB ObjectId)
      window.location.href = `/community-ideas/${id}`;
    } else {
      // This is a static idea (number ID)
      window.location.href = `/ideas/${id}`;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedDifficulty("");
    setSelectedInvestment("");
    setSortBy("newest");
  };

  // AI Modal Questions
  const aiQuestions = [
    {
      id: "domain",
      question: "What domain or industry interests you most?",
      placeholder:
        "e.g., Technology, Healthcare, Food & Beverage, E-commerce...",
      type: "text",
    },
    {
      id: "budget",
      question: "What's your investment budget range?",
      placeholder: "e.g., Under ₹5L, ₹5L-₹50L, ₹50L+...",
      type: "select",
      options: [
        "Under ₹5L",
        "₹5L - ₹25L",
        "₹25L - ₹50L",
        "₹50L - ₹1Cr",
        "₹1Cr+",
      ],
    },
    {
      id: "location",
      question: "Where do you want to start your business?",
      placeholder: "e.g., Mumbai, Delhi, Bangalore, Online...",
      type: "text",
    },
    {
      id: "skills",
      question: "What are your key skills or expertise?",
      placeholder: "e.g., Marketing, Technology, Sales, Management...",
      type: "text",
    },
    {
      id: "experience",
      question: "What's your business experience level?",
      placeholder: "Select your experience level",
      type: "select",
      options: [
        "Complete Beginner",
        "Some Experience",
        "Experienced",
        "Very Experienced",
      ],
    },
    {
      id: "goals",
      question: "What are your main business goals?",
      placeholder: "e.g., Financial freedom, Social impact, Innovation...",
      type: "text",
    },
  ];

  // AI Modal Functions
  const handleAIAnswer = (questionId, answer) => {
    setAiAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const nextAIQuestion = () => {
    if (aiStep < aiQuestions.length - 1) {
      setAiStep(aiStep + 1);
    } else {
      generateAIIdeas();
    }
  };

  const prevAIQuestion = () => {
    if (aiStep > 0) {
      setAiStep(aiStep - 1);
    }
  };

  const generateAIIdeas = async () => {
    setAiLoading(true);
    setAiStep(aiQuestions.length + 1); // Move to loading step

    try {
      const prompt = `Based on the following information, generate 3 detailed business ideas:

Domain: ${aiAnswers.domain || "Not specified"}
Budget: ${aiAnswers.budget || "Not specified"}
Location: ${aiAnswers.location || "Not specified"}
Skills: ${aiAnswers.skills || "Not specified"}
Experience: ${aiAnswers.experience || "Not specified"}
Goals: ${aiAnswers.goals || "Not specified"}

Please provide 3 unique business ideas with the following format for each:

**Idea Title**
Brief description of the business concept.

**Investment Required**
Estimated initial investment needed.

**Time to Start**
How long it takes to launch this business.

**Revenue Potential**
Expected income potential and growth prospects.

**Key Steps to Start**
Step-by-step guide to get started.

**Challenges & Solutions**
Main challenges and how to overcome them.

**Target Market**
Who your customers will be.

Make sure each idea is practical, actionable, and tailored to the provided information. Remove any markdown formatting like ** and use clean, professional language.`;

      const response = await geminiService.generateIdeas(prompt);
      console.log("AI Response received:", response);

      // Move to results step immediately
      setAiStep(aiQuestions.length + 2);
      setAiResponse(response);
    } catch (error) {
      console.error("Error generating AI ideas:", error);
      setAiResponse(
        "Sorry, I couldn't generate ideas at the moment. Please try again."
      );
      setAiStep(aiQuestions.length + 2); // Move to results step even on error
    } finally {
      setAiLoading(false);
    }
  };

  const resetAIModal = () => {
    setAiStep(0);
    setAiAnswers({});
    setAiResponse("");
    setAiLoading(false);
  };

  const closeAIModal = () => {
    setShowAIModal(false);
    resetAIModal();
  };

  const categories = [
    "Technology",
    "Healthcare",
    "Education",
    "Finance",
    "E-commerce",
    "Food & Beverage",
    "Travel & Tourism",
    "Real Estate",
    "Entertainment",
    "Fashion",
    "Sports",
    "Automotive",
    "Agriculture",
    "Energy",
    "Manufacturing",
    "Other",
  ];

  const difficulties = ["Easy", "Medium", "Hard"];
  const investmentRanges = [
    { value: "low", label: "Under ₹5L" },
    { value: "medium", label: "₹5L - ₹50L" },
    { value: "high", label: "₹50L+" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "rating", label: "Highest Rated" },
    { value: "views", label: "Most Viewed" },
    { value: "likes", label: "Most Liked" },
  ];

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-700 mb-2 tracking-tight">
            Discover 10,000+ Ideas
          </h1>
        </motion.div>

        {/* Compact Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            {/* Compact Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search business ideas, categories, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29] transition-all duration-300 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Compact Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Left Controls */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  size="sm"
                  className="border-slate-300/30 text-slate-700 hover:bg-slate-800/10 text-xs px-3 py-2"
                >
                  <Filter className="w-3 h-3 mr-1" />
                  Filters
                </Button>

                <div className="flex items-center gap-2">
                  <SortAsc className="w-3 h-3 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-200 rounded-md px-2 py-1.5 text-xs focus:ring-1 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-3">
                {/* AI Custom Ideas Button */}
                <Button
                  onClick={() => setShowAIModal(true)}
                  className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-500 text-white text-xs px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-white/20 hover:border-white/40 animate-pulse hover:animate-none"
                  style={{
                    background:
                      "linear-gradient(45deg, #ff6b9d, #c44569, #f8b500, #4ecdc4)",
                    backgroundSize: "300% 300%",
                    animation: "gradientShift 3s ease infinite",
                    boxShadow:
                      "0 0 20px rgba(255, 107, 157, 0.4), 0 0 40px rgba(196, 69, 105, 0.2)",
                  }}
                >
                  <div className="relative">
                    <Sparkles className="w-3 h-3 animate-spin" />
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-sm"></div>
                  </div>
                  <span className="font-semibold">AI Ideas</span>
                </Button>

                {/* Clear Filters */}
                {(searchQuery ||
                  selectedCategory ||
                  selectedDifficulty ||
                  selectedInvestment) && (
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-slate-700 text-xs px-2 py-1"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Compact Filter Options */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 mt-3 border-t border-gray-100"
              >
                {/* Category Filter */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs focus:ring-1 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs focus:ring-1 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
                  >
                    <option value="">All Levels</option>
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Investment Filter */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Investment
                  </label>
                  <select
                    value={selectedInvestment}
                    onChange={(e) => setSelectedInvestment(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs focus:ring-1 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
                  >
                    <option value="">All Ranges</option>
                    {investmentRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Compact Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-slate-700 font-medium text-sm">
              {filteredAndSortedIdeas.length} ideas found
              {searchQuery && (
                <span className="text-gray-500 ml-2">
                  for &quot;{searchQuery}&quot;
                </span>
              )}
            </p>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Sparkles className="w-3 h-3" />
              <span>Community Ideas</span>
            </div>
          </div>
        </motion.div>

        {/* Ideas Display */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FDCC29]"></div>
          </div>
        ) : filteredAndSortedIdeas.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-3">
              No ideas found
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchQuery
                ? "No ideas match your search criteria. Try adjusting your filters or search terms."
                : "No ideas are available at the moment. Check back later for new ideas!"}
            </p>
            {(searchQuery ||
              selectedCategory ||
              selectedDifficulty ||
              selectedInvestment) && (
              <Button
                onClick={clearFilters}
                className="bg-emerald-600 hover:bg-slate-800 text-white hover:text-white"
              >
                Clear Filters
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredAndSortedIdeas.map((idea, index) => {
              const IconComponent = iconMap[idea.icon] || Lightbulb;

              return (
                <motion.div
                  key={idea._id || idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  <Card
                    className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-2xl overflow-hidden h-full"
                    onClick={() => handleCardClick(idea._id || idea.id)}
                  >
                    {/* Image Section */}
                    <div className="relative h-40 sm:mt-[-25px]">
                      <img
                        src={`/demo${(index % 7) + 1}.jpeg`}
                        alt={idea.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Top Left Banner - Price Range */}
                      <div className="absolute top-0 left-0">
                        <div className="bg-emerald-600 text-slate-700 px-4 py-4 text-sm font-bold shadow-md rounded-br-xl">
                          {idea.investmentRange ||
                            idea.investment ||
                            "< ₹ 3Lakhs"}
                        </div>
                      </div>

                      {/* Top Right Banner - Discount Corner Ribbon */}
                      <div className="absolute top-0 right-0">
                        <div className="bg-slate-800 text-white p-4 text-sm font-bold shadow-md rounded-bl-xl">
                          <span
                            style={{
                              transform: "rotate(-45deg)",
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            10% Off
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-3 flex flex-col flex-grow">
                      {/* Category */}
                      <div className="mb-1">
                        <span className="text-xs text-gray-500 font-medium">
                          {idea.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-700 mb-2 leading-tight">
                        {idea.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-xs leading-relaxed mb-2 line-clamp-2 flex-grow">
                        {idea.description}
                      </p>

                      {/* Rating */}
                      <div className="flex flex-col space-y-1 mb-2">
                        <div className="flex items-center justify-between w-full">
                          <div className="text-md font-semibold text-slate-700">
                            {(idea.rating || 4.5).toFixed(1)}
                          </div>

                          {/* 4 Random Business Icons - Spread evenly */}
                          <div className="flex items-center justify-center flex-1 space-x-2">
                            {(() => {
                              const businessIcons = [
                                Briefcase,
                                BarChart3,
                                Rocket,
                                Cpu,
                                Building2,
                                TrendingUp,
                                Target,
                                Zap,
                              ];
                              const selectedIcons = businessIcons
                                .sort(() => Math.random() - 0.5)
                                .slice(0, 4);

                              return selectedIcons.map((Icon, iconIndex) => (
                                <div
                                  key={iconIndex}
                                  className="w-7 h-7 sm:ml-2 sm:mr-1 bg-[#fdcc29] rounded-md flex items-center justify-center hover:bg-emerald-200 transition-colors space-x-1"
                                >
                                  <Icon className="w-4 h-4 text-emerald-600" />
                                </div>
                              ));
                            })()}
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.floor(idea.rating || 4.5)
                                  ? "text-emerald-500 fill-current"
                                  : star === Math.ceil(idea.rating || 4.5) &&
                                    (idea.rating || 4.5) % 1 !== 0
                                  ? "text-emerald-500 fill-current opacity-50"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center space-x-2">
                          {/* Lightbulb with count */}
                          <div className="flex items-center space-x-1 rounded-full px-2 py-2 bg-gray-100">
                            <Lightbulb className="w-4 h-4 text-slate-700" />
                            <span className="text-xs font-semibold text-slate-700">
                              {Math.floor(Math.random() * 100) + 20}
                            </span>
                          </div>

                          {/* Heart */}
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors">
                            <Heart className="w-5 h-5 text-slate-700 hover:text-red-500" />
                          </div>

                          {/* Comment */}
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors">
                            <svg
                              className="w-5 h-5 text-slate-700"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                          </div>

                          {/* More options */}
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <svg
                              className="w-5 h-5 text-slate-700"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Pagination */}
        {filteredAndSortedIdeas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex items-center space-x-1 sm:space-x-2 bg-white rounded-lg p-2 border border-gray-200 shadow-md max-w-full overflow-x-auto">
              {/* Previous Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-transparent border-slate-300/30 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed px-2 sm:px-3 py-2 font-medium text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {Array.from(
                  {
                    length: Math.min(5, Math.ceil(totalIdeas / ideasPerPage)),
                  },
                  (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={
                          pageNum === currentPage ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className={
                          pageNum === currentPage
                            ? "bg-slate-800 hover:bg-slate-800/90 text-white border-slate-300 px-2 sm:px-3 py-2 font-light tracking-wide shadow-md text-xs sm:text-sm"
                            : "bg-transparent border-slate-300/30 text-slate-700 px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                )}
              </div>

              {/* Next Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= Math.ceil(totalIdeas / ideasPerPage)}
                className="bg-transparent border-slate-300/30 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
              </Button>
            </div>
          </motion.div>
        )}

        {/* Page Info */}
        {filteredAndSortedIdeas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 text-center"
          >
            <p className="text-slate-700 text-base font-bold tracking-wide">
              Showing {(currentPage - 1) * ideasPerPage + 1}-
              {Math.min(currentPage * ideasPerPage, totalIdeas)} of {totalIdeas}{" "}
              ideas
            </p>
          </motion.div>
        )}
      </div>

      {/* AI Custom Ideas Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-xl border border-gray-200 max-w-2xl w-full max-h-[85vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#061F59] to-[#0A2A6B] p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      AI Business Ideas
                    </h2>
                    <p className="text-white/80 text-xs">
                      Get personalized recommendations
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeAIModal}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="relative p-6 max-h-[calc(85vh-100px)] overflow-y-auto">
              {aiStep < aiQuestions.length ? (
                // Question Step
                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#FDCC29] to-[#061F59] h-2 rounded-full transition-all duration-300 ease-out"
                        style={{
                          width: `${
                            ((aiStep + 1) / aiQuestions.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
                      {aiStep + 1}/{aiQuestions.length}
                    </span>
                  </div>

                  {/* Question */}
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-semibold text-slate-700 leading-tight">
                      {aiQuestions[aiStep].question}
                    </h3>

                    {/* Input Field */}
                    {aiQuestions[aiStep].type === "text" ? (
                      <input
                        type="text"
                        placeholder={aiQuestions[aiStep].placeholder}
                        value={aiAnswers[aiQuestions[aiStep].id] || ""}
                        onChange={(e) =>
                          handleAIAnswer(aiQuestions[aiStep].id, e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29] transition-all duration-300 text-center text-sm text-gray-700 placeholder-gray-400"
                        autoFocus
                      />
                    ) : (
                      <select
                        value={aiAnswers[aiQuestions[aiStep].id] || ""}
                        onChange={(e) =>
                          handleAIAnswer(aiQuestions[aiStep].id, e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29] transition-all duration-300 text-center text-sm text-gray-700 appearance-none"
                        autoFocus
                      >
                        <option value="" className="text-gray-400">
                          {aiQuestions[aiStep].placeholder}
                        </option>
                        {aiQuestions[aiStep].options.map((option) => (
                          <option
                            key={option}
                            value={option}
                            className="text-gray-700"
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4">
                    <Button
                      onClick={prevAIQuestion}
                      disabled={aiStep === 0}
                      variant="outline"
                      className="flex items-center space-x-2 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </Button>

                    <Button
                      onClick={nextAIQuestion}
                      disabled={!aiAnswers[aiQuestions[aiStep].id]}
                      className="bg-gradient-to-r from-[#061F59] to-[#0A2A6B] hover:from-[#0A2A6B] hover:to-[#061F59] text-white px-6 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
                    >
                      <span>
                        {aiStep === aiQuestions.length - 1
                          ? "Generate Ideas"
                          : "Next"}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : aiStep === aiQuestions.length + 1 ? (
                // Loading Step
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#FDCC29] to-[#061F59] rounded-full flex items-center justify-center mx-auto">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-slate-700">
                      Generating Ideas...
                    </h3>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-[#061F59] rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <p className="text-gray-600 text-sm max-w-sm mx-auto">
                      Analyzing your preferences and creating personalized
                      business ideas...
                    </p>
                  </div>
                </div>
              ) : aiStep === aiQuestions.length + 2 ? (
                // Results Step
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#FDCC29] to-[#061F59] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">
                      Your AI-Generated Ideas
                    </h3>
                    <p className="text-gray-600 text-sm max-w-lg mx-auto">
                      Here are 3 personalized business ideas tailored
                      specifically for you
                    </p>
                  </div>

                  {/* AI Response */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500 font-medium">
                        AI Generated Ideas
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent ml-2"></div>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                      <div className="whitespace-pre-wrap font-sans">
                        {aiResponse}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      onClick={resetAIModal}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Generate New Ideas</span>
                    </Button>
                    <Button
                      onClick={closeAIModal}
                      className="bg-gradient-to-r from-[#061F59] to-[#0A2A6B] hover:from-[#0A2A6B] hover:to-[#061F59] text-white px-6 py-2 rounded-lg"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                // Fallback - should not reach here
                <div className="text-center">
                  <p>Something went wrong. Please try again.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
