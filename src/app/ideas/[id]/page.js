"use client";

import React, { useState, use } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
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
import {
  Building2,
  Smartphone,
  Leaf,
  Utensils,
  Car,
  Heart,
  Laptop,
  ShoppingBag,
  Camera,
  Dumbbell,
  TrendingUp,
  Users,
  Lightbulb,
  Star,
  Clock,
  DollarSign,
  ArrowRight,
  Download,
  MessageCircle,
  Share2,
  CheckCircle,
  Target,
  Zap,
  Calendar,
  MapPin,
  BarChart3,
  PieChart,
  Settings,
  User,
  ChevronRight,
  Home,
  AlertTriangle,
  Briefcase,
  Code,
  ThumbsUp,
  Edit,
  Trash2,
  Send,
} from "lucide-react";

import detailedBusinessIdeas from "@/data/detailedBusinessIdeas.json";
import apiClient from "@/lib/api";

export default function IdeaDetailPage({ params }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newReview, setNewReview] = useState({ comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const clearMessage = () => {
    setMessage({ type: "", text: "" });
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

  // Find the idea by ID from the detailed JSON data
  const idea =
    detailedBusinessIdeas.find(
      (item) => item.id === parseInt(resolvedParams.id)
    ) || detailedBusinessIdeas[0];

  // Map icon names to actual components
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
  };

  const IconComponent = iconMap[idea.icon] || Smartphone;

  // Fetch reviews
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get(`/reviews?ideaId=${idea.id}`);
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // Submit review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    console.log("Form submitted!", { newReview, isAuthenticated });

    if (!newReview.comment.trim()) {
      console.log("No comment provided");
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      console.log("User not authenticated");
      setMessage({
        type: "error",
        text: "You need to be logged in to add a review. Please sign in first.",
      });
      return;
    }

    console.log("Starting review submission...");
    setSubmitting(true);
    try {
      const data = await apiClient.post("/reviews", {
        ideaId: idea.id,
        comment: newReview.comment,
      });

      if (data.success) {
        setMessage({ type: "success", text: "Review submitted successfully!" });
        setNewReview({ comment: "" });
        fetchReviews(); // Refresh reviews
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      if (error.message.includes("Access denied")) {
        setMessage({
          type: "error",
          text: "You need to be logged in to add a review. Please sign in first.",
        });
      } else {
        setMessage({
          type: "error",
          text: error.message || "Failed to submit review",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Mark review as helpful
  const handleHelpful = async (reviewId) => {
    try {
      const data = await apiClient.post("/reviews/helpful", { reviewId });
      if (data.success) {
        fetchReviews(); // Refresh reviews
      }
    } catch (error) {
      console.error("Error marking review as helpful:", error);
    }
  };

  // Load reviews when reviews tab is active
  React.useEffect(() => {
    if (activeTab === "reviews") {
      fetchReviews();
    }
  }, [activeTab, idea.id]);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "market", label: "Market Analysis" },
    { id: "investment", label: "Investment" },
    { id: "funding", label: "Funding" },
    { id: "business-model", label: "Business Model" },
    { id: "skills", label: "Skills Required" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <Toast message={message} onClose={clearMessage} />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base text-[#2D3748] mb-4 sm:mb-6 overflow-x-auto">
          <Link
            href="/"
            className="flex items-center hover:text-[#B8860B] transition-colors duration-200 whitespace-nowrap font-medium"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 mx-1 sm:mx-2 flex-shrink-0" />
          <span className="whitespace-nowrap font-medium">Business Ideas</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 mx-1 sm:mx-2 flex-shrink-0" />
          <span className="text-[#2D3748] truncate max-w-[150px] sm:max-w-none font-semibold">
            {idea.title}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FDCC29] to-[#2D3748] rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#2D3748] mb-2 tracking-tight leading-tight">
                      {idea.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      {idea.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-[#B8860B]/15 text-[#2D3748] border-[#B8860B]/40 font-semibold tracking-wide"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Card className="bg-gradient-to-br from-[#FDCC29]/15 to-[#FDCC29]/25 border-[#FDCC29]/50 shadow-lg">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-[#B8860B] mx-auto mb-2" />
                    <p className="text-sm text-[#2D3748] font-medium mb-1">
                      Investment Required
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-[#2D3748]">
                      {idea.investment}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-[#FDCC29]/15 to-[#FDCC29]/25 border-[#FDCC29]/50 shadow-lg">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-[#B8860B] mx-auto mb-2" />
                    <p className="text-sm text-[#2D3748] font-medium mb-1">
                      Market Growth
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-[#2D3748]">
                      {idea.marketAnalysis?.growthRate || "Growing Market"}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-[#FDCC29]/15 to-[#FDCC29]/25 border-[#FDCC29]/50 shadow-lg">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-[#B8860B] mx-auto mb-2" />
                    <p className="text-sm text-[#2D3748] font-medium mb-1">
                      Time to Market
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-[#2D3748]">
                      {idea.timeToMarket}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-[#FDCC29]/15 to-[#FDCC29]/25 border-[#FDCC29]/50 shadow-lg">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <Users className="w-6 h-6 sm:w-7 sm:h-7 text-[#B8860B] mx-auto mb-2" />
                    <p className="text-sm text-[#2D3748] font-medium mb-1">
                      Reviews
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-[#2D3748]">
                      {reviews.length}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Button className="bg-[#B8860B] hover:bg-[#2D3748] text-white hover:text-white px-4 sm:px-6 py-3 rounded-xl font-semibold tracking-wide shadow-lg text-sm sm:text-base transition-all duration-300">
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">
                    Download Detailed Report & Business Plan
                  </span>
                  <span className="sm:hidden">Download Report</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white px-4 sm:px-6 py-3 rounded-xl font-semibold tracking-wide transition-all duration-300 text-sm sm:text-base"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask Expert
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white px-4 sm:px-6 py-3 rounded-xl font-semibold tracking-wide transition-all duration-300 text-sm sm:text-base"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Tab Navigation */}
              <div className="border-b-2 border-[#B8860B]/30 mb-6 sm:mb-8">
                <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 sm:py-4 px-1 border-b-2 font-semibold tracking-wide transition-colors whitespace-nowrap text-sm sm:text-base ${
                        activeTab === tab.id
                          ? "border-[#B8860B] text-[#B8860B]"
                          : "border-transparent text-[#2D3748]/70 hover:text-[#B8860B]"
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
                    <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#2D3748] font-medium tracking-wide">
                          Business Description
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#2D3748] font-medium tracking-wide leading-relaxed text-lg">
                          {idea.detailedDescription}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Implementation Plan */}
                    <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#2D3748] font-medium tracking-wide">
                          Implementation Plan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {Object.entries(idea.implementation || {}).map(
                          ([phase, description], index) => (
                            <div
                              key={index}
                              className="p-4 bg-[#B8860B]/10 rounded-lg"
                            >
                              <h4 className="text-[#2D3748] font-medium tracking-wide mb-2 capitalize">
                                {phase.replace(/([A-Z])/g, " $1").trim()}
                              </h4>
                              <p className="text-[#2D3748] font-medium tracking-wide leading-relaxed">
                                {description}
                              </p>
                            </div>
                          )
                        )}
                      </CardContent>
                    </Card>

                    {/* Success Factors */}
                    <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#2D3748] font-medium tracking-wide">
                          Success Factors
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          {(idea.successFactors || []).map((factor, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3"
                            >
                              <CheckCircle className="w-5 h-5 text-[#B8860B] mt-0.5 flex-shrink-0" />
                              <p className="text-[#2D3748] font-medium tracking-wide">
                                {factor}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Challenges */}
                    <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#2D3748] font-medium tracking-wide flex items-center">
                          <AlertTriangle className="w-5 h-5 text-[#B8860B] mr-2" />
                          Challenges
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          {(idea.challenges || []).map((challenge, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3"
                            >
                              <AlertTriangle className="w-4 h-4 text-[#B8860B] mt-1 flex-shrink-0" />
                              <p className="text-[#2D3748] font-medium tracking-wide">
                                {challenge}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "market" && (
                  <div className="space-y-8">
                    {/* Market Overview */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-[#2D3748] font-medium tracking-wide flex items-center">
                            <BarChart3 className="w-5 h-5 text-[#B8860B] mr-2" />
                            Market Size
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-medium text-[#B8860B] mb-2">
                            {idea.marketAnalysis?.marketSize ||
                              "Market Data Available"}
                          </p>
                          <p className="text-[#2D3748] font-medium tracking-wide">
                            {idea.marketAnalysis?.growthRate ||
                              "Growing Market"}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-[#2D3748] font-medium tracking-wide flex items-center">
                            <Target className="w-5 h-5 text-[#B8860B] mr-2" />
                            Target Audience
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-[#2D3748] font-medium tracking-wide leading-relaxed">
                            {idea.marketAnalysis?.targetAudience ||
                              "General market"}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Competition Analysis */}
                    <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#2D3748] font-medium tracking-wide flex items-center">
                          <Users className="w-5 h-5 text-[#B8860B] mr-2" />
                          Competition Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="text-[#2D3748] font-medium tracking-wide mb-2">
                            Competition Level
                          </h4>
                          <p className="text-[#2D3748] font-medium tracking-wide leading-relaxed">
                            {idea.marketAnalysis?.competition ||
                              "Moderate competition"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "investment" && (
                  <div className="space-y-8">
                    {/* Investment Overview */}
                    <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#2D3748] font-medium tracking-wide flex items-center">
                          <DollarSign className="w-5 h-5 text-[#B8860B] mr-2" />
                          Total Investment Required
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-medium text-[#B8860B] mb-4">
                          {idea.investment}
                        </p>
                        <p className="text-[#2D3748] font-medium tracking-wide">
                          {idea.revenue}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Revenue Model */}
                    <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#2D3748] font-medium tracking-wide flex items-center">
                          <TrendingUp className="w-5 h-5 text-[#B8860B] mr-2" />
                          Revenue Model
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(idea.revenueModel || {}).map(
                            ([type, description], index) => (
                              <div
                                key={index}
                                className="p-3 bg-[#B8860B]/10 rounded-lg"
                              >
                                <h4 className="text-[#2D3748] font-medium tracking-wide mb-1 capitalize">
                                  {type.replace(/([A-Z])/g, " $1").trim()}
                                </h4>
                                <p className="text-[#2D3748] font-medium tracking-wide">
                                  {description}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "funding" && (
                  <div className="space-y-8">
                    {/* Funding Information */}
                    <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#2D3748] font-medium tracking-wide flex items-center">
                          <Briefcase className="w-5 h-5 text-[#B8860B] mr-2" />
                          Funding Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {Object.entries(idea.funding || {}).map(
                          ([type, amount], index) => (
                            <div
                              key={index}
                              className="p-4 bg-[#B8860B]/10 rounded-lg"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-[#2D3748] font-medium tracking-wide capitalize">
                                  {type.replace(/([A-Z])/g, " $1").trim()}
                                </h4>
                                <span className="text-[#B8860B] font-medium">
                                  {amount}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "business-model" && (
                  <div className="space-y-8">
                    {/* Revenue Model */}
                    <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#2D3748] font-medium tracking-wide flex items-center">
                          <TrendingUp className="w-5 h-5 text-[#B8860B] mr-2" />
                          Revenue Model
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(idea.revenueModel || {}).map(
                            ([type, description], index) => (
                              <div
                                key={index}
                                className="p-3 bg-[#B8860B]/10 rounded-lg"
                              >
                                <h4 className="text-[#2D3748] font-medium tracking-wide mb-1 capitalize">
                                  {type.replace(/([A-Z])/g, " $1").trim()}
                                </h4>
                                <p className="text-[#2D3748] font-medium tracking-wide">
                                  {description}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "skills" && (
                  <div className="space-y-8">
                    {/* Team Requirements */}
                    <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#2D3748] font-medium tracking-wide flex items-center">
                          <Users className="w-5 h-5 text-[#B8860B] mr-2" />
                          Team Requirements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {(idea.teamRequirements || []).map((role, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3 p-3 bg-[#B8860B]/10 rounded-lg"
                            >
                              <User className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                              <p className="text-[#2D3748] font-medium tracking-wide">
                                {role}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-8">
                    {/* Add Review Form */}
                    <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#2D3748] font-medium tracking-wide flex items-center">
                          <MessageCircle className="w-5 h-5 text-[#B8860B] mr-2" />
                          Write a Review
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form
                          onSubmit={handleSubmitReview}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-[#2D3748] font-medium mb-2">
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
                              placeholder="Share your thoughts about this business idea..."
                              className="w-full p-3 border border-[#B8860B]/30 rounded-lg focus:ring-2 focus:ring-[#B8860B]/50 focus:border-[#B8860B] resize-none"
                              rows={4}
                              required
                            />
                          </div>
                          <Button
                            type="submit"
                            disabled={submitting || !newReview.comment.trim()}
                            onClick={() =>
                              console.log("Button clicked!", {
                                submitting,
                                comment: newReview.comment,
                                disabled:
                                  submitting || !newReview.comment.trim(),
                              })
                            }
                            className="bg-[#B8860B] hover:bg-[#2D3748] text-white hover:text-white px-6 py-3 rounded-xl font-semibold tracking-wide transition-all duration-300"
                          >
                            {submitting ? (
                              "Submitting..."
                            ) : (
                              <>
                                <Send className="w-4 h-4 mr-2" />
                                Submit Review
                              </>
                            )}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>

                    {/* Reviews List */}
                    <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-[#2D3748] font-medium tracking-wide flex items-center">
                          <Users className="w-5 h-5 text-[#B8860B] mr-2" />
                          Community Reviews
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {loading ? (
                          <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B8860B] mx-auto"></div>
                            <p className="text-[#2D3748] mt-2">
                              Loading reviews...
                            </p>
                          </div>
                        ) : reviews.length === 0 ? (
                          <div className="text-center py-8">
                            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-[#2D3748] font-medium">
                              No reviews yet
                            </p>
                            <p className="text-gray-600">
                              Be the first to review this idea!
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {currentReviews.map((review) => (
                              <div
                                key={review._id}
                                className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-[#B8860B] to-[#2D3748] rounded-full flex items-center justify-center">
                                      <User className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                      <p className="font-semibold text-[#2D3748] text-sm">
                                        {review.userName}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {new Date(
                                      review.createdAt
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                                <p className="text-[#2D3748] text-sm leading-relaxed">
                                  {review.comment}
                                </p>
                              </div>
                            ))}

                            {/* Pagination */}
                            {totalPages > 1 && (
                              <div className="flex justify-center items-center space-x-2 mt-6">
                                <Button
                                  onClick={() =>
                                    handlePageChange(currentPage - 1)
                                  }
                                  disabled={currentPage === 1}
                                  variant="outline"
                                  size="sm"
                                  className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white"
                                >
                                  Previous
                                </Button>

                                <div className="flex space-x-1">
                                  {Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1
                                  ).map((page) => (
                                    <Button
                                      key={page}
                                      onClick={() => handlePageChange(page)}
                                      variant={
                                        currentPage === page
                                          ? "default"
                                          : "outline"
                                      }
                                      size="sm"
                                      className={
                                        currentPage === page
                                          ? "bg-[#B8860B] text-white"
                                          : "border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white"
                                      }
                                    >
                                      {page}
                                    </Button>
                                  ))}
                                </div>

                                <Button
                                  onClick={() =>
                                    handlePageChange(currentPage + 1)
                                  }
                                  disabled={currentPage === totalPages}
                                  variant="outline"
                                  size="sm"
                                  className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white"
                                >
                                  Next
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-32 space-y-6">
              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#2D3748] font-semibold tracking-wide text-lg">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "Business Plan Template",
                    "Expert Consultation",
                    "Find Partners",
                  ].map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start border-2 border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white font-semibold tracking-wide transition-all duration-300"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      {action}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Key Information */}
              <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#2D3748] font-semibold tracking-wide text-lg">
                    Key Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-[#2D3748] font-semibold tracking-wide mb-2">
                      Category
                    </h4>
                    <p className="text-[#2D3748] font-medium tracking-wide">
                      {idea.category}
                    </p>
                  </div>
                  <Separator className="bg-[#B8860B]/30" />
                  <div>
                    <h4 className="text-[#2D3748] font-semibold tracking-wide mb-2">
                      Difficulty Level
                    </h4>
                    <p className="text-[#2D3748] font-medium tracking-wide">
                      {idea.difficulty}
                    </p>
                  </div>
                  <Separator className="bg-[#B8860B]/30" />
                  <div>
                    <h4 className="text-[#2D3748] font-semibold tracking-wide mb-2">
                      Time to Market
                    </h4>
                    <p className="text-[#2D3748] font-medium tracking-wide">
                      {idea.timeToMarket}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Expert Guidance */}
              <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#2D3748] font-semibold tracking-wide text-lg">
                    Need Expert Guidance?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#2D3748] font-medium tracking-wide leading-relaxed mb-4">
                    Get personalized advice from our business experts.
                  </p>
                  <Button className="w-full bg-[#B8860B] hover:bg-[#2D3748] text-white hover:text-white font-semibold tracking-wide transition-all duration-300">
                    Contact Expert
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
