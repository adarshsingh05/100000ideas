"use client";

import React, { useState, use, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/ui/toast";
import AIFloatingButton from "@/components/AIFloatingButton";
import { useAuth } from "@/contexts/AuthContext";
import apiClient from "@/lib/api";
import { geminiService } from "@/lib/geminiService";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Clock,
  DollarSign,
  Users,
  MapPin,
  Building,
  Target,
  TrendingUp,
  Shield,
  Award,
  Globe,
  ChevronDown,
  ChevronRight,
  Heart,
  Share2,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Send,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  BarChart3,
  PieChart,
  Settings,
  User,
  Calendar,
  Zap,
  Home,
  Smartphone,
  Leaf,
  Utensils,
  Car,
  Laptop,
  ShoppingBag,
  Camera,
  Dumbbell,
  FileText,
  Crown,
  Banknote,
  BookOpen,
  Brain,
  Building2,
  DollarSign as DollarIcon,
  Users as UsersIcon,
  Loader2,
} from "lucide-react";

export default function IdeaDetailPage({ params }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newReview, setNewReview] = useState({ comment: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedSections, setExpandedSections] = useState({});
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showMarketGraph, setShowMarketGraph] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const reviewsPerPage = 3;
  const [idea, setIdea] = useState(null);

  // Interactive graph data
  const graphData = [
    { month: "Jan 2022", value: 2000, x: 50, y: 280 },
    { month: "Jun 2022", value: 3600, x: 150, y: 250 },
    { month: "Dec 2022", value: 8500, x: 250, y: 180 },
    { month: "Jun 2023", value: 25000, x: 350, y: 100 },
    { month: "Dec 2023", value: 45000, x: 450, y: 70 },
    { month: "Jun 2024", value: 75000, x: 550, y: 50 },
    { month: "Dec 2024", value: 120000, x: 650, y: 30 },
    { month: "Jun 2025", value: 110000, x: 750, y: 15 },
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handlePointHover = (point) => {
    setHoveredPoint(point);
  };

  const handlePointLeave = () => {
    setHoveredPoint(null);
  };

  // Detail modal data
  const detailData = {
    timeToStart: {
      title: "Time to Start",
      score: 6,
      level: "Moderate",
      description:
        "Moderate complexity with high revenue potential makes it appealing.",
      about:
        "A score that gauges how realistically a small founding team can build and launch the first version.",
      details: [
        "Requires 6-12 months of development",
        "Moderate technical complexity",
        "Good market timing opportunity",
        "Manageable resource requirements",
      ],
    },
    targetAudience: {
      title: "Target Audience",
      score: 8,
      level: "Ideal",
      description: "Clear target market with high purchasing power and demand.",
      about:
        "A score that evaluates the clarity and accessibility of your target customer base.",
      details: [
        "Well-defined customer segments",
        "High purchasing power",
        "Clear pain points identified",
        "Accessible through multiple channels",
      ],
    },
    marketSize: {
      title: "Market Size",
      score: 9,
      level: "Large",
      description:
        "Significant market opportunity with room for growth and expansion.",
      about:
        "A score that measures the total addressable market and growth potential.",
      details: [
        "Global market reach",
        "Growing market trends",
        "Multiple expansion opportunities",
        "High revenue potential",
      ],
    },
    category: {
      title: "Category",
      score: 7,
      level: "Strong",
      description:
        "Technology sector with proven business models and investor interest.",
      about:
        "A score that assesses the industry category's growth potential and stability.",
      details: [
        "High-growth technology sector",
        "Proven business models",
        "Strong investor interest",
        "Innovation opportunities",
      ],
    },
  };

  const handleDetailClick = (detailType) => {
    setSelectedDetail(detailData[detailType]);
    setShowDetailModal(true);
  };

  const clearMessage = () => {
    setMessage({ type: "", text: "" });
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAIAnalysis = async () => {
    if (!idea) return;

    setIsAnalyzing(true);
    try {
      const prompt = `Analyze the business idea "${idea.title}" and provide information about:
1. Current companies doing similar business ideas
2. Their revenue models and estimated revenue
3. Market competition analysis
4. Key players in this space
5. Market opportunities and gaps

Please provide specific company names, their business models, and revenue estimates where possible. Format the response as a structured analysis.`;

      const response = await geminiService.sendMessage(idea, prompt, []);

      if (response.success) {
        setAiAnalysis(response.message);
      } else {
        setMessage({
          type: "error",
          text: "Failed to get AI analysis. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error getting AI analysis:", error);
      setMessage({
        type: "error",
        text: "Failed to get AI analysis. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const { isAuthenticated } = useAuth();
  const resolvedParams = use(params);

  // Pagination logic
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fetch idea details
  const fetchIdea = async () => {
    try {
      setLoading(true);
      console.log("Fetching idea with ID:", resolvedParams.id);
      const data = await apiClient.get(`/ideas/${resolvedParams.id}`);
      console.log("API response:", data);
      if (data.success) {
        console.log("Setting idea data:", data.data.idea);
        setIdea(data.data.idea);
        console.log("Idea state should be set now");
      } else {
        console.log("API returned error:", data.message);
      }
    } catch (error) {
      console.error("Error fetching idea:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const data = await apiClient.get(`/reviews?ideaId=${resolvedParams.id}`);
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Submit review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    console.log("Form submitted!", { newReview, isAuthenticated });

    if (!isAuthenticated) {
      setMessage({
        type: "error",
        text: "Please log in to submit a review",
      });
      return;
    }

    if (!newReview.comment.trim()) {
      setMessage({
        type: "error",
        text: "Please enter a review comment",
      });
      return;
    }

    try {
      setSubmitting(true);
      const response = await apiClient.post("/reviews", {
        ideaId: resolvedParams.id,
        comment: newReview.comment,
        rating: newReview.rating,
      });

      if (response.success) {
        setMessage({
          type: "success",
          text: "Review submitted successfully!",
        });
        setNewReview({ comment: "", rating: 5 });
        fetchReviews(); // Refresh reviews
      } else {
        setMessage({
          type: "error",
          text: response.message || "Failed to submit review",
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage({
        type: "error",
        text: "Failed to submit review. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    console.log("Idea page loaded with ID:", resolvedParams.id);
    fetchIdea();
    fetchReviews();
  }, [resolvedParams.id]);

  console.log("Rendering idea page:", {
    loading,
    idea,
    resolvedParams,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8860B] mx-auto mb-4"></div>
          <p className="text-[#2D3748]">Loading idea...</p>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[#2D3748] mb-2">
            Idea Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The idea you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/">
            <Button className="bg-[#B8860B] hover:bg-[#2D3748] text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate average rating from real reviews
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + (review.rating || 5), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconMap = {
      Technology: Laptop,
      Healthcare: Heart,
      Education: BookOpen,
      Finance: DollarSign,
      "E-commerce": ShoppingBag,
      "Food & Beverage": Utensils,
      "Travel & Tourism": Globe,
      "Real Estate": Building,
      Entertainment: Camera,
      Fashion: ShoppingBag,
      Sports: Dumbbell,
      Automotive: Car,
      Agriculture: Leaf,
      Energy: Zap,
      Manufacturing: Settings,
      Other: Lightbulb,
    };
    return iconMap[category] || Lightbulb;
  };

  const CategoryIcon = getCategoryIcon(idea.category);

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <Toast message={message} onClose={clearMessage} />
      <Navbar />

      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="w-5 h-5 text-[#2D3748]" />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#2D3748] rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Share2 className="w-4 h-4 text-[#2D3748]" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative w-full h-64 sm:h-80 lg:h-96 mb-6 mt-6">
          <img
            src={`/demo${Math.floor(Math.random() * 7) + 1}.jpeg`}
            alt={idea.title}
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Investment Range Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-[#FDCC29] text-[#2D3748] px-4 py-2 text-sm font-bold">
              {idea.investmentRange}
            </Badge>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-[#2D3748] text-white px-4 py-2 text-sm font-bold">
              {idea.category}
            </Badge>
          </div>

          {/* Featured Badge for Admin Ideas */}
          {idea.featured && (
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-[#B8860B] text-white px-4 py-2 text-sm font-bold">
                <Crown className="w-4 h-4 mr-1" />
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Title and Rating Section */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2D3748] mb-2">
              {idea.title}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-[#2D3748]">
                  {averageRating}
                </span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.floor(averageRating)
                          ? "text-[#FDCC29] fill-current"
                          : star === Math.ceil(averageRating) &&
                            averageRating % 1 !== 0
                          ? "text-[#FDCC29] fill-current opacity-50"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({reviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Key Info Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDetailClick("timeToStart")}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-[#B8860B]" />
                  <span className="text-sm font-medium text-[#2D3748]">
                    Time to Start
                  </span>
                </div>
                <p className="text-lg font-bold text-[#2D3748]">
                  {idea.timeToStart}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDetailClick("targetAudience")}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-[#B8860B]" />
                  <span className="text-sm font-medium text-[#2D3748]">
                    Target Audience
                  </span>
                </div>
                <p className="text-sm text-[#2D3748] line-clamp-2">
                  {idea.targetAudience}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDetailClick("marketSize")}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-[#B8860B]" />
                    <span className="text-sm font-medium text-[#2D3748]">
                      Market Size
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMarketGraph(true);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
                  >
                    View Market
                  </button>
                </div>
                <p className="text-sm text-[#2D3748]">{idea.marketSize}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDetailClick("category")}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <CategoryIcon className="w-5 h-5 text-[#B8860B]" />
                  <span className="text-sm font-medium text-[#2D3748]">
                    Category
                  </span>
                </div>
                <p className="text-sm text-[#2D3748]">{idea.category}</p>
              </motion.div>
            </div>
          </div>

          {/* Modern Single-Page Layout with Progressive Disclosure */}
          <div className="space-y-8">
            {/* Quick Navigation Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() =>
                  document
                    .getElementById("description")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-4 py-2 bg-[#FDCC29]/10 text-[#2D3748] rounded-full hover:bg-[#FDCC29]/20 transition-colors flex items-center space-x-2 border border-[#FDCC29]/20"
              >
                <FileText className="w-4 h-4" />
                <span>Description</span>
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("features")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-4 py-2 bg-[#FDCC29]/10 text-[#2D3748] rounded-full hover:bg-[#FDCC29]/20 transition-colors flex items-center space-x-2 border border-[#FDCC29]/20"
              >
                <Target className="w-4 h-4" />
                <span>Features</span>
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("business-model")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-4 py-2 bg-[#FDCC29]/10 text-[#2D3748] rounded-full hover:bg-[#FDCC29]/20 transition-colors flex items-center space-x-2 border border-[#FDCC29]/20"
              >
                <Building className="w-4 h-4" />
                <span>Business Model</span>
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("competitive-advantage")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-4 py-2 bg-[#FDCC29]/10 text-[#2D3748] rounded-full hover:bg-[#FDCC29]/20 transition-colors flex items-center space-x-2 border border-[#FDCC29]/20"
              >
                <Award className="w-4 h-4" />
                <span>Advantage</span>
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("reviews")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-4 py-2 bg-[#FDCC29]/10 text-[#2D3748] rounded-full hover:bg-[#FDCC29]/20 transition-colors flex items-center space-x-2 border border-[#FDCC29]/20"
              >
                <Star className="w-4 h-4" />
                <span>Reviews ({reviews.length})</span>
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("ai-analysis")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-4 py-2 bg-[#FDCC29]/10 text-[#2D3748] rounded-full hover:bg-[#FDCC29]/20 transition-colors flex items-center space-x-2 border border-[#FDCC29]/20"
              >
                <Brain className="w-4 h-4" />
                <span>AI Analysis</span>
              </button>
            </div>

            {/* Description Section */}
            <motion.div
              id="description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#2D3748] flex items-center space-x-3 text-xl">
                    <div className="w-10 h-10 bg-[#FDCC29] rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#2D3748]" />
                    </div>
                    <span>About This Idea</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#2D3748] leading-relaxed text-lg">
                    {idea.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Features Section */}
            <motion.div
              id="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#2D3748] flex items-center space-x-3 text-xl">
                    <div className="w-10 h-10 bg-[#FDCC29] rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-[#2D3748]" />
                    </div>
                    <span>Key Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {idea.keyFeatures?.map((feature, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-8 h-8 bg-[#FDCC29]/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-[#2D3748]" />
                        </div>
                        <span className="text-[#2D3748] font-medium">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Business Model & Revenue Section */}
            <motion.div
              id="business-model"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#2D3748] flex items-center space-x-3 text-xl">
                    <div className="w-10 h-10 bg-[#FDCC29] rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-[#2D3748]" />
                    </div>
                    <span>Business Model</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#2D3748] leading-relaxed text-lg font-medium">
                    {idea.businessModel}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#2D3748] flex items-center space-x-3 text-xl">
                    <div className="w-10 h-10 bg-[#FDCC29] rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-[#2D3748]" />
                    </div>
                    <span>Revenue Streams</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {idea.revenueStreams?.length > 0 ? (
                      idea.revenueStreams.map((stream, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm"
                        >
                          <div className="w-3 h-3 bg-[#FDCC29] rounded-full"></div>
                          <span className="text-[#2D3748] font-medium">
                            {stream}
                          </span>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-lg italic">
                        No revenue streams defined yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Competitive Advantage Section */}
            <motion.div
              id="competitive-advantage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#2D3748] flex items-center space-x-3 text-xl">
                    <div className="w-10 h-10 bg-[#FDCC29] rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-[#2D3748]" />
                    </div>
                    <span>Competitive Advantage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#2D3748] leading-relaxed text-lg">
                    {idea.competitiveAdvantage}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#2D3748] flex items-center space-x-3 text-xl">
                    <div className="w-10 h-10 bg-[#FDCC29] rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-[#2D3748]" />
                    </div>
                    <span>Challenges</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#2D3748] leading-relaxed text-lg">
                    {idea.challenges}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Required Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#2D3748] flex items-center space-x-3 text-xl">
                    <div className="w-10 h-10 bg-[#FDCC29] rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-[#2D3748]" />
                    </div>
                    <span>Required Skills</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {idea.requiredSkills?.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge className="bg-[#FDCC29]/20 text-[#2D3748] px-4 py-2 text-sm font-medium hover:bg-[#FDCC29]/30 transition-colors">
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              id="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#2D3748] flex items-center space-x-3 text-xl">
                      <div className="w-10 h-10 bg-[#FDCC29] rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-[#2D3748]" />
                      </div>
                      <span>Reviews & Feedback</span>
                    </CardTitle>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#2D3748]">
                          {averageRating}
                        </div>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.floor(averageRating)
                                  ? "text-[#FDCC29] fill-current"
                                  : star === Math.ceil(averageRating) &&
                                    averageRating % 1 !== 0
                                  ? "text-[#FDCC29] fill-current opacity-50"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {reviews.length} review
                          {reviews.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Review Form Toggle */}
                  {isAuthenticated && (
                    <div className="mb-6">
                      <Button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="bg-[#FDCC29] hover:bg-[#FDCC29]/90 text-[#2D3748] font-medium"
                      >
                        {showReviewForm ? "Cancel" : "Write a Review"}
                      </Button>
                    </div>
                  )}

                  {/* Review Form */}
                  {showReviewForm && isAuthenticated && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 p-6 bg-white rounded-xl border border-gray-200"
                    >
                      <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-[#2D3748] mb-2">
                            Rating
                          </label>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() =>
                                  setNewReview({ ...newReview, rating: star })
                                }
                                className="focus:outline-none hover:scale-110 transition-transform"
                              >
                                <Star
                                  className={`w-6 h-6 ${
                                    star <= newReview.rating
                                      ? "text-[#FDCC29] fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#2D3748] mb-2">
                            Comment
                          </label>
                          <textarea
                            value={newReview.comment}
                            onChange={(e) =>
                              setNewReview({
                                ...newReview,
                                comment: e.target.value,
                              })
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCC29] focus:border-transparent"
                            rows={4}
                            placeholder="Share your thoughts about this idea..."
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="bg-[#FDCC29] hover:bg-[#FDCC29]/90 text-[#2D3748] font-medium"
                        >
                          {submitting ? "Submitting..." : "Submit Review"}
                        </Button>
                      </form>
                    </motion.div>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {currentReviews.length > 0 ? (
                      currentReviews.map((review, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-[#FDCC29] rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-[#2D3748]" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="flex items-center space-x-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-4 h-4 ${
                                        star <= (review.rating || 5)
                                          ? "text-[#FDCC29] fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-[#2D3748] leading-relaxed">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-[#2D3748] text-lg font-medium">
                          No reviews yet. Be the first to review this idea!
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center space-x-2 mt-8">
                      <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="outline"
                        className="text-[#2D3748] border-[#2D3748] hover:bg-[#2D3748] hover:text-white"
                      >
                        Previous
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`${
                              currentPage === page
                                ? "bg-[#2D3748] text-white"
                                : "text-[#2D3748] border-[#2D3748] hover:bg-[#2D3748] hover:text-white"
                            }`}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                          >
                            {page}
                          </Button>
                        )
                      )}
                      <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        className="text-[#2D3748] border-[#2D3748] hover:bg-[#2D3748] hover:text-white"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Analysis Section */}
            <motion.div
              id="ai-analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#2D3748] flex items-center space-x-3 text-xl">
                    <div className="w-10 h-10 bg-[#FDCC29] rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-[#2D3748]" />
                    </div>
                    <span>AI Market Analysis</span>
                  </CardTitle>
                  <p className="text-gray-600">
                    Get AI-powered insights about competitors and market
                    analysis
                  </p>
                </CardHeader>
                <CardContent>
                  {!aiAnalysis && !isAnalyzing && (
                    <div className="text-center py-12">
                      <Brain className="w-16 h-16 text-[#FDCC29] mx-auto mb-6" />
                      <h3 className="text-2xl font-semibold text-[#2D3748] mb-4">
                        Get AI-Powered Market Analysis
                      </h3>
                      <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
                        Discover current companies in this space, their revenue
                        models, and market opportunities
                      </p>
                      <Button
                        onClick={handleAIAnalysis}
                        className="bg-[#FDCC29] hover:bg-[#FDCC29]/90 text-[#2D3748] px-8 py-4 text-lg font-medium"
                      >
                        <Brain className="w-5 h-5 mr-2" />
                        Analyze Market
                      </Button>
                    </div>
                  )}

                  {isAnalyzing && (
                    <div className="py-12">
                      <div className="flex items-center justify-center mb-8">
                        <div className="w-16 h-16 bg-[#FDCC29]/10 rounded-full flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-[#FDCC29] animate-spin" />
                        </div>
                      </div>
                      <div className="space-y-4 max-w-2xl mx-auto">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                      </div>
                      <p className="text-center text-[#2D3748] mt-6 font-medium text-lg">
                        AI is analyzing the market...
                      </p>
                    </div>
                  )}

                  {aiAnalysis && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-semibold text-[#2D3748]">
                          Market Analysis Results
                        </h3>
                        <Button
                          onClick={handleAIAnalysis}
                          variant="outline"
                          className="text-[#2D3748] border-[#2D3748] hover:bg-[#2D3748] hover:text-white"
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Refresh Analysis
                        </Button>
                      </div>
                      <div className="prose prose-lg max-w-none">
                        <div className="whitespace-pre-wrap text-[#2D3748] leading-relaxed text-lg">
                          {aiAnalysis?.replace(/\*\*/g, "")}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />

      {/* AI Floating Button */}
      {idea && <AIFloatingButton idea={idea} />}

      {/* Market Size Graph Modal */}
      {showMarketGraph && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#FDCC29] rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#2D3748]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2D3748]">
                    Market Analysis
                  </h3>
                  <p className="text-sm text-gray-600">{idea.title}</p>
                </div>
              </div>
              <button
                onClick={() => setShowMarketGraph(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-600 text-lg">×</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Keyword and Metrics */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-600">Keyword:</span>
                    <span className="ml-2 font-medium text-[#2D3748]">
                      {idea.title}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      110.0K
                    </div>
                    <div className="text-sm text-gray-600">Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      +5689%
                    </div>
                    <div className="text-sm text-gray-600">Growth</div>
                  </div>
                </div>
              </div>

              {/* Interactive Graph */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div
                  className="h-64 relative cursor-crosshair"
                  onMouseMove={handleMouseMove}
                >
                  <svg className="w-full h-full" viewBox="0 0 800 300">
                    {/* Grid Lines */}
                    <defs>
                      <pattern
                        id="grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 40 0 L 0 0 0 40"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                      </pattern>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="100%"
                          stopColor="#3b82f6"
                          stopOpacity="0.1"
                        />
                      </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Y-axis labels */}
                    <text x="20" y="20" className="text-xs fill-gray-500">
                      140k
                    </text>
                    <text x="20" y="80" className="text-xs fill-gray-500">
                      105k
                    </text>
                    <text x="20" y="140" className="text-xs fill-gray-500">
                      70k
                    </text>
                    <text x="20" y="200" className="text-xs fill-gray-500">
                      35k
                    </text>
                    <text x="20" y="260" className="text-xs fill-gray-500">
                      0
                    </text>

                    {/* X-axis labels */}
                    <text x="100" y="290" className="text-xs fill-gray-500">
                      2022
                    </text>
                    <text x="300" y="290" className="text-xs fill-gray-500">
                      2023
                    </text>
                    <text x="500" y="290" className="text-xs fill-gray-500">
                      2024
                    </text>
                    <text x="700" y="290" className="text-xs fill-gray-500">
                      2025
                    </text>

                    {/* Data points for the line graph */}
                    <path
                      d="M 50 280 Q 100 270 150 250 Q 200 200 250 180 Q 300 120 350 100 Q 400 80 450 70 Q 500 60 550 50 Q 600 40 650 30 Q 700 20 750 15"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      className="drop-shadow-sm"
                    />

                    {/* Area fill under the line */}
                    <path
                      d="M 50 280 Q 100 270 150 250 Q 200 200 250 180 Q 300 120 350 100 Q 400 80 450 70 Q 500 60 550 50 Q 600 40 650 30 Q 700 20 750 15 L 750 280 L 50 280 Z"
                      fill="url(#gradient)"
                      opacity="0.3"
                    />

                    {/* Interactive data points */}
                    {graphData.map((point, index) => (
                      <g key={index}>
                        {/* Invisible larger hit area */}
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="12"
                          fill="transparent"
                          onMouseEnter={() => handlePointHover(point)}
                          onMouseLeave={handlePointLeave}
                          className="cursor-pointer"
                        />
                        {/* Visible data point */}
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r={hoveredPoint === point ? "6" : "4"}
                          fill={hoveredPoint === point ? "#1d4ed8" : "#3b82f6"}
                          stroke="white"
                          strokeWidth="2"
                          className="transition-all duration-200 drop-shadow-sm"
                        />
                        {/* Glow effect for hovered point */}
                        {hoveredPoint === point && (
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="8"
                            fill="#3b82f6"
                            opacity="0.3"
                            className="animate-pulse"
                          />
                        )}
                      </g>
                    ))}

                    {/* Crosshair lines */}
                    {hoveredPoint && (
                      <>
                        <line
                          x1={hoveredPoint.x}
                          y1="0"
                          x2={hoveredPoint.x}
                          y2="280"
                          stroke="#3b82f6"
                          strokeWidth="1"
                          strokeDasharray="4,4"
                          opacity="0.6"
                        />
                        <line
                          x1="0"
                          y1={hoveredPoint.y}
                          x2="800"
                          y2={hoveredPoint.y}
                          stroke="#3b82f6"
                          strokeWidth="1"
                          strokeDasharray="4,4"
                          opacity="0.6"
                        />
                      </>
                    )}
                  </svg>

                  {/* Interactive Tooltip */}
                  {hoveredPoint && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute bg-white rounded-lg shadow-xl p-4 border border-gray-200 pointer-events-none z-10"
                      style={{
                        left: Math.min(hoveredPoint.x + 20, 600),
                        top: Math.max(hoveredPoint.y - 60, 20),
                        transform:
                          hoveredPoint.x > 600 ? "translateX(-100%)" : "none",
                      }}
                    >
                      <div className="text-sm font-bold text-[#2D3748] mb-1">
                        {hoveredPoint.month}
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        {hoveredPoint.value.toLocaleString()} searches
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Monthly volume
                      </div>
                    </motion.div>
                  )}

                  {/* Mouse cursor indicator */}
                  <div
                    className="absolute w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-20"
                    style={{
                      left: mousePosition.x - 4,
                      top: mousePosition.y - 4,
                      opacity: hoveredPoint ? 0 : 0.6,
                    }}
                  />
                </div>
              </div>

              {/* Market Insights */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-blue-800 mb-1">
                    Peak Growth
                  </div>
                  <div className="text-xl font-bold text-blue-600">+5689%</div>
                  <div className="text-xs text-blue-600">Q4 2024</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-green-800 mb-1">
                    Current Volume
                  </div>
                  <div className="text-xl font-bold text-green-600">110.0K</div>
                  <div className="text-xs text-green-600">Monthly searches</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-purple-800 mb-1">
                    Market Trend
                  </div>
                  <div className="text-xl font-bold text-purple-600">
                    Rising
                  </div>
                  <div className="text-xs text-purple-600">
                    Consistent growth
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#2D3748]">
                {selectedDetail.title}
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-600 text-lg">×</span>
              </button>
            </div>

            {/* Score Section */}
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-[#2D3748] mb-2">
                {selectedDetail.score}
              </div>
              <div className="text-lg font-semibold text-[#2D3748] mb-3">
                {selectedDetail.level}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-[#FDCC29] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(selectedDetail.score / 10) * 100}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                {selectedDetail.description}
              </p>
            </div>

            {/* View Detailed Analysis Button */}
            <div className="text-center mb-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center mx-auto">
                View detailed analysis
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            {/* About Section */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-semibold text-[#2D3748] mb-2">
                About this score
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {selectedDetail.about}
              </p>

              {/* Details List */}
              <div className="space-y-2">
                {selectedDetail.details.map((detail, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#FDCC29] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
