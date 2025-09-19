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

export default function CommunityIdeaDetailPage({ params }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newReview, setNewReview] = useState({ comment: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedSections, setExpandedSections] = useState({});
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const reviewsPerPage = 3;
  const [idea, setIdea] = useState(null);

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
      const data = await apiClient.get(`/community-ideas/${resolvedParams.id}`);
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
    console.log("Community idea page loaded with ID:", resolvedParams.id);
    fetchIdea();
    fetchReviews();
  }, [resolvedParams.id]);

  console.log("Rendering community idea page:", {
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

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Details" },
    { id: "reviews", label: "Reviews" },
    { id: "ai-analysis", label: "AI Analysis" },
  ];

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
        <div className="relative w-full h-64 sm:h-80 lg:h-96 mb-6 sm:mt-6">
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
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-[#B8860B]" />
                  <span className="text-sm font-medium text-[#2D3748]">
                    Time to Start
                  </span>
                </div>
                <p className="text-lg font-bold text-[#2D3748]">
                  {idea.timeToStart}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-[#B8860B]" />
                  <span className="text-sm font-medium text-[#2D3748]">
                    Target Audience
                  </span>
                </div>
                <p className="text-sm text-[#2D3748] line-clamp-2">
                  {idea.targetAudience}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-5 h-5 text-[#B8860B]" />
                  <span className="text-sm font-medium text-[#2D3748]">
                    Market Size
                  </span>
                </div>
                <p className="text-sm text-[#2D3748]">{idea.marketSize}</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <CategoryIcon className="w-5 h-5 text-[#B8860B]" />
                  <span className="text-sm font-medium text-[#2D3748]">
                    Category
                  </span>
                </div>
                <p className="text-sm text-[#2D3748]">{idea.category}</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-[#2D3748] text-[#2D3748]"
                      : "border-transparent text-gray-500 hover:text-[#2D3748]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Description */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-[#2D3748] flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Description</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#2D3748] leading-relaxed">
                      {idea.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Key Features */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-[#2D3748] flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Key Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {idea.keyFeatures?.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-3 bg-[#FDCC29]/10 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                          <span className="text-[#2D3748] text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Business Model & Revenue */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-white shadow-sm border border-gray-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-[#2D3748] flex items-center space-x-2">
                        <Building className="w-5 h-5" />
                        <span>Business Model</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-[#2D3748] font-medium">
                        {idea.businessModel}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-sm border border-gray-200">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-[#2D3748] flex items-center space-x-2">
                        <DollarSign className="w-5 h-5" />
                        <span>Revenue Streams</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {idea.revenueStreams?.length > 0 ? (
                          idea.revenueStreams.map((stream, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-2 h-2 bg-[#B8860B] rounded-full"></div>
                              <span className="text-[#2D3748] text-sm">
                                {stream}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm italic">
                            None for now
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-8">
                {/* Competitive Advantage */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-[#2D3748] flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>Competitive Advantage</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#2D3748] leading-relaxed">
                      {idea.competitiveAdvantage}
                    </p>
                  </CardContent>
                </Card>

                {/* Challenges */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-[#2D3748] flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Challenges</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#2D3748] leading-relaxed">
                      {idea.challenges}
                    </p>
                  </CardContent>
                </Card>

                {/* Required Skills */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-[#2D3748] flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Required Skills</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {idea.requiredSkills?.map((skill, index) => (
                        <Badge
                          key={index}
                          className="bg-[#FDCC29] text-[#2D3748] px-3 py-1"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-[#2D3748] flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>Contact Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-[#2D3748]">
                          Email:
                        </span>
                        <span className="text-sm text-[#2D3748]">
                          {idea.contactInfo?.email}
                        </span>
                      </div>
                      {idea.contactInfo?.phone && (
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-[#2D3748]">
                            Phone:
                          </span>
                          <span className="text-sm text-[#2D3748]">
                            {idea.contactInfo.phone}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-[#2D3748]">
                          Submitted by:
                        </span>
                        <span className="text-sm text-[#2D3748]">
                          {idea.uploadedByName}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                {/* Review Summary */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-[#2D3748] flex items-center space-x-2">
                      <Star className="w-5 h-5" />
                      <span>Reviews ({reviews.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
                      </div>
                      <div className="flex-1">
                        <p className="text-[#2D3748] text-sm">
                          Based on {reviews.length} review
                          {reviews.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Review Form */}
                {isAuthenticated && (
                  <Card className="bg-white shadow-sm border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-[#2D3748]">
                        Write a Review
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
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
                                className="focus:outline-none"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
                            rows={4}
                            placeholder="Share your thoughts about this idea..."
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="bg-[#B8860B] hover:bg-[#2D3748] text-white"
                        >
                          {submitting ? "Submitting..." : "Submit Review"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Reviews List */}
                <div className="space-y-4 mb-8">
                  {currentReviews.length > 0 ? (
                    currentReviews.map((review, index) => (
                      <Card
                        key={index}
                        className="bg-white shadow-sm border border-gray-200"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-[#FDCC29] rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-[#2D3748]" />
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
                              <p className="text-[#2D3748]">{review.comment}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="bg-white shadow-sm border border-gray-200">
                      <CardContent className="p-8 text-center">
                        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-[#2D3748] text-lg">
                          No reviews yet. Be the first to review this idea!
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center space-x-2 mb-12">
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
                          variant={currentPage === page ? "default" : "outline"}
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
              </div>
            )}

            {activeTab === "ai-analysis" && (
              <div className="space-y-8">
                {/* AI Analysis Section */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-[#2D3748] flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>AI Market Analysis</span>
                    </CardTitle>
                    <CardDescription>
                      Get AI-powered insights about competitors and market
                      analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!aiAnalysis && !isAnalyzing && (
                      <div className="text-center py-8">
                        <Brain className="w-12 h-12 text-[#FDCC29] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-[#2D3748] mb-2">
                          Get AI-Powered Market Analysis
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Discover current companies in this space, their
                          revenue models, and market opportunities
                        </p>
                        <Button
                          onClick={handleAIAnalysis}
                          className="bg-[#FDCC29] hover:bg-[#FDCC29]/90 text-[#2D3748]"
                        >
                          <Brain className="w-4 h-4 mr-2" />
                          Analyze Market
                        </Button>
                      </div>
                    )}

                    {isAnalyzing && (
                      <div className="py-8">
                        <div className="flex items-center justify-center mb-6">
                          <div className="w-12 h-12 bg-[#FDCC29]/10 rounded-full flex items-center justify-center">
                            <Loader2 className="w-6 h-6 text-[#FDCC29] animate-spin" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                        </div>
                        <p className="text-center text-[#2D3748] mt-4 font-medium">
                          AI is analyzing the market...
                        </p>
                      </div>
                    )}

                    {aiAnalysis && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-[#2D3748]">
                            Market Analysis Results
                          </h3>
                          <Button
                            onClick={handleAIAnalysis}
                            variant="outline"
                            size="sm"
                            className="text-[#2D3748] border-[#2D3748] hover:bg-[#2D3748] hover:text-white"
                          >
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Refresh Analysis
                          </Button>
                        </div>

                        <div className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-wrap text-[#2D3748] leading-relaxed">
                            {aiAnalysis?.replace(/\*\*/g, "")}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* AI Floating Button */}
      {idea && <AIFloatingButton idea={idea} />}
    </div>
  );
}
