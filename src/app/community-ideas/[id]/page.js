"use client";

import React, { useState, use } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import apiClient from "@/lib/api";
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
  Send,
  ThumbsUp,
} from "lucide-react";

export default function CommunityIdeaDetailPage({ params }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newReview, setNewReview] = useState({ comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;
  const [idea, setIdea] = useState(null);

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
        ideaId: idea._id,
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

  // Load data on component mount
  React.useEffect(() => {
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
          <Link href="/your-ideas">
            <Button className="bg-[#B8860B] hover:bg-[#2D3748] text-white">
              Back to Your Ideas
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "business-model", label: "Business Model" },
    { id: "skills", label: "Skills Required" },
    { id: "reviews", label: "Reviews" },
  ];

  try {
    return (
      <div className="min-h-screen bg-[#FCFCFC]">
        <Toast message={message} onClose={clearMessage} />
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base text-[#2D3748] mb-4 sm:mb-6 overflow-x-auto">
            <Link
              href="/"
              className="hover:text-[#B8860B] transition-colors duration-200 flex items-center"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              href="/your-ideas"
              className="hover:text-[#B8860B] transition-colors duration-200"
            >
              Your Ideas
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500 truncate">{idea.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Idea Header */}
              <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg mb-6">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge
                          variant="secondary"
                          className="bg-[#B8860B]/10 text-[#B8860B] border-[#B8860B]/20"
                        >
                          {idea.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {idea.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl sm:text-3xl font-bold text-[#2D3748] mb-3 leading-tight">
                        {idea.title}
                      </CardTitle>
                      <CardDescription className="text-[#2D3748] text-base sm:text-lg leading-relaxed">
                        {idea.description}
                      </CardDescription>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <Card className="bg-gradient-to-br from-[#FDCC29]/15 to-[#FDCC29]/25 border-[#FDCC29]/50 shadow-lg">
                      <CardContent className="p-3 sm:p-4 text-center">
                        <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-[#B8860B] mx-auto mb-2" />
                        <p className="text-sm text-[#2D3748] font-medium mb-1">
                          Investment
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-[#2D3748]">
                          {idea.investmentRange}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-[#FDCC29]/15 to-[#FDCC29]/25 border-[#FDCC29]/50 shadow-lg">
                      <CardContent className="p-3 sm:p-4 text-center">
                        <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-[#B8860B] mx-auto mb-2" />
                        <p className="text-sm text-[#2D3748] font-medium mb-1">
                          Time to Start
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-[#2D3748]">
                          {idea.timeToStart}
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
                    <Card className="bg-gradient-to-br from-[#FDCC29]/15 to-[#FDCC29]/25 border-[#FDCC29]/50 shadow-lg">
                      <CardContent className="p-3 sm:p-4 text-center">
                        <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-[#B8860B] mx-auto mb-2" />
                        <p className="text-sm text-[#2D3748] font-medium mb-1">
                          Market
                        </p>
                        <p className="text-sm sm:text-base font-semibold text-[#2D3748]">
                          {idea.marketSize}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardHeader>
              </Card>

              {/* Tabs */}
              <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "ghost"}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${
                          activeTab === tab.id
                            ? "bg-[#B8860B] text-white"
                            : "text-[#2D3748] hover:bg-[#B8860B]/10"
                        }`}
                      >
                        {tab.label}
                      </Button>
                    ))}
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-[#2D3748] mb-3">
                          About This Idea
                        </h3>
                        <p className="text-[#2D3748] leading-relaxed">
                          {idea.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-[#2D3748] mb-2">
                            Investment Required
                          </h4>
                          <p className="text-[#2D3748]">
                            {idea.investmentRange}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2D3748] mb-2">
                            Time to Start
                          </h4>
                          <p className="text-[#2D3748]">{idea.timeToStart}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2D3748] mb-2">
                            Market Size
                          </h4>
                          <p className="text-[#2D3748]">{idea.marketSize}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2D3748] mb-2">
                            Category
                          </h4>
                          <p className="text-[#2D3748]">{idea.category}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Business Model Tab */}
                  {activeTab === "business-model" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-[#2D3748] mb-3">
                          Business Model
                        </h3>
                        <p className="text-[#2D3748] leading-relaxed mb-4">
                          {idea.businessModel}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-[#2D3748] mb-2">
                            Revenue Streams
                          </h4>
                          <div className="space-y-2">
                            {idea.revenueStreams?.map((stream, index) => (
                              <div key={index} className="flex items-center">
                                <div className="w-2 h-2 bg-[#B8860B] rounded-full mr-2"></div>
                                <span className="text-[#2D3748]">{stream}</span>
                              </div>
                            )) || (
                              <p className="text-gray-500">
                                No revenue streams specified
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2D3748] mb-2">
                            Target Audience
                          </h4>
                          <p className="text-[#2D3748]">
                            {idea.targetAudience}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2D3748] mb-2">
                            Competitive Advantage
                          </h4>
                          <p className="text-[#2D3748]">
                            {idea.competitiveAdvantage}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2D3748] mb-2">
                            Key Challenges
                          </h4>
                          <p className="text-[#2D3748]">{idea.challenges}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Skills Required Tab */}
                  {activeTab === "skills" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-[#2D3748] mb-3">
                          Skills Required
                        </h3>
                        <p className="text-[#2D3748] leading-relaxed mb-4">
                          Here are the key skills and expertise needed to
                          successfully implement this business idea:
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-[#2D3748] mb-3">
                            Required Skills
                          </h4>
                          <div className="space-y-2">
                            {idea.requiredSkills?.map((skill, index) => (
                              <div key={index} className="flex items-center">
                                <div className="w-2 h-2 bg-[#B8860B] rounded-full mr-2"></div>
                                <span className="text-[#2D3748]">{skill}</span>
                              </div>
                            )) || (
                              <p className="text-gray-500">
                                No specific skills listed
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2D3748] mb-3">
                            Key Features
                          </h4>
                          <div className="space-y-2">
                            {idea.keyFeatures?.map((feature, index) => (
                              <div key={index} className="flex items-center">
                                <div className="w-2 h-2 bg-[#B8860B] rounded-full mr-2"></div>
                                <span className="text-[#2D3748]">
                                  {feature}
                                </span>
                              </div>
                            )) || (
                              <p className="text-gray-500">
                                No key features specified
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reviews Tab */}
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
                                placeholder="Share your thoughts about this idea..."
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
                </CardContent>
              </Card>
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

                {/* Share Idea */}
                <Card className="bg-gradient-to-br from-white to-[#FDCC29]/10 border-[#B8860B]/30 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#2D3748] font-semibold tracking-wide text-lg">
                      Share This Idea
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-2 border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white font-semibold tracking-wide transition-all duration-300"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share on Social Media
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-2 border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white font-semibold tracking-wide transition-all duration-300"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
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
  } catch (error) {
    console.error("Error rendering community idea page:", error);
    return (
      <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[#2D3748] mb-2">
            Error Loading Page
          </h2>
          <p className="text-gray-600 mb-4">
            There was an error loading this idea page.
          </p>
          <Link href="/your-ideas">
            <Button className="bg-[#B8860B] hover:bg-[#2D3748] text-white">
              Back to Your Ideas
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
