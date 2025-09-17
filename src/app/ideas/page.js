"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useIdeaAccess } from "@/hooks/useIdeaAccess";
import { ideasService } from "@/lib/ideasService";
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
  Sparkles,
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
  const [viewMode, setViewMode] = useState("card"); // "card" or "list"
  const ideasPerPage = viewMode === "card" ? 12 : 10; // Show more ideas per page

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

  // Reset to page 1 when view mode changes
  useEffect(() => {
    setCurrentPage(1);
  }, [viewMode]);

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
    if (hasAccess) {
      incrementView();
      // Route community ideas to community-ideas page, static ideas to ideas page
      // Community ideas have _id (MongoDB ObjectId), static ideas have id (number)
      if (id && typeof id === "string" && id.length > 10) {
        // This is a community idea (MongoDB ObjectId)
        window.location.href = `/community-ideas/${id}`;
      } else {
        // This is a static idea (number ID)
        window.location.href = `/ideas/${id}`;
      }
    } else {
      // Show premium modal or redirect to auth
      window.location.href = "/auth";
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
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FDCC29] to-[#2D3748] rounded-xl flex items-center justify-center shadow-md">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D3748] mb-2 tracking-tight">
            Discover Business Ideas
          </h1>
          <p className="text-sm sm:text-base text-[#2D3748]/70 max-w-2xl mx-auto leading-relaxed">
            Explore innovative business ideas from our community. Find the
            perfect opportunity that matches your skills and investment
            capacity.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for business ideas, categories, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29] transition-all duration-300 text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="border-[#2D3748]/30 text-[#2D3748] hover:bg-[#2D3748]/10"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <div className="flex items-center space-x-2">
                  <SortAsc className="w-4 h-4 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#2D3748] font-medium">
                  View:
                </span>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("card")}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      viewMode === "card"
                        ? "bg-[#2D3748] text-white"
                        : "bg-white text-[#2D3748] hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-[#2D3748] text-white"
                        : "bg-white text-[#2D3748] hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-4 h-4 flex flex-col space-y-0.5">
                      <div className="bg-current h-1 rounded-sm"></div>
                      <div className="bg-current h-1 rounded-sm"></div>
                      <div className="bg-current h-1 rounded-sm"></div>
                    </div>
                  </button>
                </div>
              </div>
              {(searchQuery ||
                selectedCategory ||
                selectedDifficulty ||
                selectedInvestment) && (
                <Button
                  onClick={clearFilters}
                  variant="ghost"
                  className="text-gray-500 hover:text-[#2D3748]"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Filter Options */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100"
              >
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-[#2D3748] mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
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
                  <label className="block text-sm font-medium text-[#2D3748] mb-2">
                    Difficulty
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
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
                  <label className="block text-sm font-medium text-[#2D3748] mb-2">
                    Investment Range
                  </label>
                  <select
                    value={selectedInvestment}
                    onChange={(e) => setSelectedInvestment(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
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

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-[#2D3748] font-medium">
              {filteredAndSortedIdeas.length} ideas found
              {searchQuery && (
                <span className="text-gray-500 ml-2">
                  for &quot;{searchQuery}&quot;
                </span>
              )}
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Sparkles className="w-4 h-4" />
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
            <h3 className="text-xl font-semibold text-[#2D3748] mb-3">
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
                className="bg-[#FDCC29] hover:bg-[#2D3748] text-white hover:text-white"
              >
                Clear Filters
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={
              viewMode === "card"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredAndSortedIdeas.map((idea, index) => {
              const IconComponent = iconMap[idea.icon] || Lightbulb;

              if (viewMode === "card") {
                return (
                  <motion.div
                    key={idea._id || idea.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                  >
                    <Card
                      className="bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-lg"
                      onClick={() => handleCardClick(idea._id || idea.id)}
                    >
                      {/* Image Placeholder */}
                      <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FDCC29]/20 to-[#2D3748]/20"></div>
                        <div className="absolute top-4 left-4">
                          <div className="bg-[#FDCC29] text-[#2D3748] px-3 py-1 rounded-lg text-sm font-medium">
                            {idea.investmentRange || idea.investment || "₹25L"}
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 text-[#2D3748] px-3 py-1 rounded-lg text-sm font-medium">
                            {idea.difficulty || "Medium"}
                          </div>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-[#2D3748]" />
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-5">
                        {/* Category and Rating */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                            {idea.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-[#FDCC29] fill-current" />
                            <span className="text-sm text-[#2D3748] font-medium">
                              {idea.rating || 4.5}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <CardTitle className="text-lg font-semibold text-[#2D3748] leading-tight mb-3 line-clamp-2">
                          {idea.title}
                        </CardTitle>

                        {/* Description */}
                        <CardDescription className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                          {idea.description}
                        </CardDescription>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {idea.tags?.slice(0, 2).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          )) || [
                            <span
                              key="0"
                              className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                            >
                              Community
                            </span>,
                            <span
                              key="1"
                              className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                            >
                              Innovation
                            </span>,
                          ]}
                        </div>

                        {/* Metrics */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Revenue Potential
                            </span>
                            <span className="text-sm text-[#2D3748] font-medium">
                              {idea.revenue || "High potential"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Time to Market
                            </span>
                            <span className="text-sm text-[#2D3748] font-medium">
                              {idea.timeToStart ||
                                idea.timeToMarket ||
                                "2-3 months"}
                            </span>
                          </div>
                        </div>

                        {/* User Info - Compact */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-[#FDCC29] rounded-full flex items-center justify-center">
                              <User className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs text-gray-500">
                              {idea.uploadedByName?.split(" ")[0] ||
                                "Anonymous"}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              <span>{idea.views || 0}</span>
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" />
                              <span>{idea.likes || 0}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(idea._id || idea.id);
                          }}
                          className="w-full text-sm font-medium border border-[#2D3748] text-[#2D3748] py-2 group-hover:bg-[#2D3748] group-hover:text-white transition-all duration-300"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              } else {
                // List View
                return (
                  <motion.div
                    key={idea._id || idea.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    className="group"
                  >
                    <Card
                      className="bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-[#FDCC29]/30"
                      onClick={() => handleCardClick(idea._id || idea.id)}
                    >
                      <div className="flex">
                        {/* Image Section with Additional Info Below */}
                        <div className="w-32 flex-shrink-0">
                          {/* Main Image */}
                          <div className="relative w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#FDCC29]/20 to-[#2D3748]/20"></div>

                            {/* Investment Badge */}
                            <div className="absolute top-2 left-2">
                              <div className="bg-[#FDCC29] text-[#2D3748] px-2 py-1 rounded text-xs font-semibold shadow-md">
                                {idea.investmentRange ||
                                  idea.investment ||
                                  "₹25L"}
                              </div>
                            </div>

                            {/* Difficulty Badge */}
                            <div className="absolute top-2 right-2">
                              <div className="bg-white/95 text-[#2D3748] px-2 py-1 rounded text-xs font-semibold shadow-md border border-gray-200">
                                {idea.difficulty || "Medium"}
                              </div>
                            </div>

                            {/* Category Icon */}
                            <div className="absolute bottom-2 right-2">
                              <div className="w-8 h-8 bg-white/95 rounded-full flex items-center justify-center shadow-md border border-gray-200">
                                <IconComponent className="w-4 h-4 text-[#2D3748]" />
                              </div>
                            </div>

                            {/* Decorative Dots */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <div className="flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-[#FDCC29]/40 rounded-full"></div>
                                <div className="w-1.5 h-1.5 bg-[#2D3748]/40 rounded-full"></div>
                                <div className="w-1.5 h-1.5 bg-[#FDCC29]/40 rounded-full"></div>
                              </div>
                            </div>
                          </div>

                          {/* Additional Info Below Image */}
                          <div className="mt-2 space-y-2">
                            {/* Category Badge */}
                            <div className="text-center">
                              <span className="bg-[#FDCC29] text-[#2D3748] px-2 py-1 rounded-full text-xs font-semibold">
                                {idea.category || "Business"}
                              </span>
                            </div>

                            {/* Time to Market */}
                            <div className="bg-gradient-to-r from-[#FDCC29]/10 to-[#2D3748]/10 p-2 rounded border border-[#FDCC29]/20">
                              <div className="flex items-center justify-center space-x-1 text-[#2D3748] text-xs">
                                <Clock className="w-3 h-3" />
                                <span className="font-semibold">
                                  {idea.timeToStart ||
                                    idea.timeToMarket ||
                                    "Immediately"}
                                </span>
                              </div>
                            </div>

                            {/* Revenue Potential */}
                            <div className="bg-gradient-to-r from-[#FDCC29]/10 to-[#2D3748]/10 p-2 rounded border border-[#FDCC29]/20">
                              <div className="text-center">
                                <div className="flex items-center justify-center space-x-1 text-[#2D3748] text-xs mb-1">
                                  <TrendingUp className="w-3 h-3" />
                                  <span className="font-medium">Revenue</span>
                                </div>
                                <span className="text-xs font-semibold text-[#2D3748]">
                                  {idea.revenue || "High potential"}
                                </span>
                              </div>
                            </div>

                            {/* Status Indicator */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded border border-green-200">
                              <div className="flex items-center justify-center space-x-1 text-green-700 text-xs">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="font-semibold">Active</span>
                              </div>
                            </div>

                            {/* Quick Stats Row */}
                            <div className="grid grid-cols-3 gap-1 pt-1">
                              <div className="text-center">
                                <div className="flex items-center justify-center space-x-1 text-[#FDCC29] text-xs mb-1">
                                  <Star className="w-2.5 h-2.5" />
                                  <span className="font-semibold">
                                    {idea.rating || 4.5}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-600">
                                  Rating
                                </span>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center space-x-1 text-gray-600 text-xs mb-1">
                                  <Eye className="w-2.5 h-2.5" />
                                  <span className="font-semibold">
                                    {idea.views || 0}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-600">
                                  Views
                                </span>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center space-x-1 text-red-500 text-xs mb-1">
                                  <Heart className="w-2.5 h-2.5" />
                                  <span className="font-semibold">
                                    {idea.likes || 0}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-600">
                                  Likes
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Main Content Section */}
                        <div className="flex-1 p-6">
                          {/* Header with Category and Rating */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-[#FDCC29] rounded-full"></div>
                                <span className="text-xs text-[#2D3748] uppercase tracking-wider font-semibold">
                                  {idea.category}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1 bg-[#FDCC29]/10 px-3 py-1 rounded-full">
                                <Star className="w-4 h-4 text-[#FDCC29] fill-current" />
                                <span className="text-sm text-[#2D3748] font-semibold">
                                  {idea.rating || 4.5}
                                </span>
                              </div>
                            </div>

                            {/* Status Indicator */}
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-xs text-green-600 font-medium">
                                Active
                              </span>
                            </div>
                          </div>

                          {/* Title and Description */}
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold text-[#2D3748] leading-tight mb-3 group-hover:text-[#FDCC29] transition-colors duration-300">
                              {idea.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-base line-clamp-2">
                              {idea.description ||
                                "A promising business opportunity with great potential for growth and success."}
                            </p>
                          </div>

                          {/* Enhanced Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {idea.tags?.slice(0, 5).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="text-xs bg-gradient-to-r from-[#FDCC29]/10 to-[#2D3748]/10 text-[#2D3748] px-4 py-2 rounded-full font-medium border border-[#FDCC29]/20"
                              >
                                {tag}
                              </span>
                            )) || [
                              <span
                                key="0"
                                className="text-xs bg-gradient-to-r from-[#FDCC29]/10 to-[#2D3748]/10 text-[#2D3748] px-4 py-2 rounded-full font-medium border border-[#FDCC29]/20"
                              >
                                Community
                              </span>,
                              <span
                                key="1"
                                className="text-xs bg-gradient-to-r from-[#FDCC29]/10 to-[#2D3748]/10 text-[#2D3748] px-4 py-2 rounded-full font-medium border border-[#FDCC29]/20"
                              >
                                Innovation
                              </span>,
                              <span
                                key="2"
                                className="text-xs bg-gradient-to-r from-[#FDCC29]/10 to-[#2D3748]/10 text-[#2D3748] px-4 py-2 rounded-full font-medium border border-[#FDCC29]/20"
                              >
                                Business
                              </span>,
                            ]}
                          </div>

                          {/* Enhanced Metrics Grid */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="bg-gradient-to-br from-[#FDCC29]/5 to-[#2D3748]/5 p-3 rounded-xl border border-[#FDCC29]/20">
                              <div className="flex items-center space-x-2 mb-2">
                                <TrendingUp className="w-4 h-4 text-[#FDCC29]" />
                                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                                  Revenue Potential
                                </p>
                              </div>
                              <p className="text-base text-[#2D3748] font-bold">
                                {idea.revenue || "High potential"}
                              </p>
                            </div>

                            <div className="bg-gradient-to-br from-[#FDCC29]/5 to-[#2D3748]/5 p-3 rounded-xl border border-[#FDCC29]/20">
                              <div className="flex items-center space-x-2 mb-2">
                                <Clock className="w-4 h-4 text-[#FDCC29]" />
                                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                                  Time to Market
                                </p>
                              </div>
                              <p className="text-base text-[#2D3748] font-bold">
                                {idea.timeToStart ||
                                  idea.timeToMarket ||
                                  "2-3 months"}
                              </p>
                            </div>

                            <div className="bg-gradient-to-br from-[#FDCC29]/5 to-[#2D3748]/5 p-3 rounded-xl border border-[#FDCC29]/20">
                              <div className="flex items-center space-x-2 mb-2">
                                <Eye className="w-4 h-4 text-[#FDCC29]" />
                                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                                  Views
                                </p>
                              </div>
                              <p className="text-base text-[#2D3748] font-bold">
                                {idea.views || 0}
                              </p>
                            </div>

                            <div className="bg-gradient-to-br from-[#FDCC29]/5 to-[#2D3748]/5 p-3 rounded-xl border border-[#FDCC29]/20">
                              <div className="flex items-center space-x-2 mb-2">
                                <Heart className="w-4 h-4 text-[#FDCC29]" />
                                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                                  Likes
                                </p>
                              </div>
                              <p className="text-base text-[#2D3748] font-bold">
                                {idea.likes || 0}
                              </p>
                            </div>
                          </div>

                          {/* Enhanced Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-[#FDCC29] to-[#2D3748] rounded-full flex items-center justify-center shadow-md">
                                <User className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="text-sm text-[#2D3748] font-semibold">
                                  {idea.uploadedByName?.split(" ")[0] ||
                                    "Anonymous"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Community Member
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>
                                    {getTimeAgo(
                                      idea.createdAt || idea.created_at
                                    )}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Zap className="w-4 h-4" />
                                  <span>Trending</span>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardClick(idea._id || idea.id);
                                }}
                                className="text-sm font-semibold border-2 border-[#2D3748] text-[#2D3748] px-6 py-2 group-hover:bg-[#2D3748] group-hover:text-white transition-all duration-300 rounded-lg"
                              >
                                View Details
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              }
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
                className="bg-transparent border-[#2D3748]/30 text-[#2D3748] disabled:opacity-50 disabled:cursor-not-allowed px-2 sm:px-3 py-2 font-medium text-xs sm:text-sm"
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
                            ? "bg-[#2D3748] hover:bg-[#2D3748]/90 text-white border-[#2D3748] px-2 sm:px-3 py-2 font-light tracking-wide shadow-md text-xs sm:text-sm"
                            : "bg-transparent border-[#2D3748]/30 text-[#2D3748] px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
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
                className="bg-transparent border-[#2D3748]/30 text-[#2D3748] disabled:opacity-50 disabled:cursor-not-allowed px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
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
            <p className="text-[#2D3748] text-base font-bold tracking-wide">
              Showing {(currentPage - 1) * ideasPerPage + 1}-
              {Math.min(currentPage * ideasPerPage, totalIdeas)} of {totalIdeas}{" "}
              ideas
            </p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
