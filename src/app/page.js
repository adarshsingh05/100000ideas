"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useIdeaAccess } from "@/hooks/useIdeaAccess";
import PremiumModal from "@/components/PremiumModal";
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
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  Music,
  Zap,
  Sparkles,
} from "lucide-react";

// Featured Ideas Carousel Component
function FeaturedIdeasCarousel() {
  const [featuredIdeas, setFeaturedIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedIdeas = async () => {
      try {
        setLoading(true);
        console.log("🔍 Fetching featured ideas...");
        const response = await ideasService.getFeaturedIdeas(8);
        console.log("📊 Featured ideas response:", response);
        if (response.success) {
          setFeaturedIdeas(response.ideas);
          console.log("✅ Featured ideas set:", response.ideas.length);
        } else {
          console.log("❌ Failed to fetch featured ideas:", response.error);
        }
      } catch (error) {
        console.error("Error fetching featured ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedIdeas();
  }, []);

  const handleCardClick = (idea) => {
    // Route based on whether it's a static idea or community idea
    if (idea.isStaticIdea) {
      window.location.href = `/ideas/${idea._id}`;
    } else {
      window.location.href = `/community-ideas/${idea._id}`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FDCC29]"></div>
      </div>
    );
  }

  if (featuredIdeas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No featured ideas available</p>
      </div>
    );
  }

  return (
    <Carousel className="w-full relative">
      <CarouselContent className="-ml-2 sm:-ml-6">
        {featuredIdeas.map((idea, index) => {
          const rating = Math.round((Math.random() * 2 + 3) * 10) / 10; // Round to 1 decimal
          const reviewCount = Math.floor(Math.random() * 300) + 200;
          const lightbulbCount = Math.floor(Math.random() * 100) + 20;

          return (
            <CarouselItem
              key={idea._id}
              className="pl-2 sm:pl-6 basis-full sm:basis-1/2 lg:basis-1/4"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer h-full"
                onClick={() => handleCardClick(idea)}
              >
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-2xl overflow-hidden h-full">
                  {/* Image Section */}
                  <div className="relative h-[192px] sm:mt-[-25px]">
                    <img
                      src={`/demo${(index % 7) + 1}.jpeg`}
                      alt={idea.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Top Left Banner - Price Range */}
                    <div className="absolute top-0 left-0">
                      <div className="bg-[#FDCC29] text-[#2D3748] px-4 py-4 text-sm font-bold shadow-md rounded-br-xl">
                        {idea.investmentRange || "< ₹ 3Lakhs"}
                      </div>
                    </div>

                    {/* Top Right Banner - Discount Corner Ribbon */}
                    <div className="absolute top-0 right-0 ">
                      <div className="bg-[#2D3748] text-white p-2 text-lg font-bold text-green-500 shadow-md rounded-bl-xl">
                        <span className="text-green-500">
                          {Math.floor(Math.random() * 50) + 10}% Off
                        </span>
                      </div>
                    </div>

                    {/* Bottom Center Banner - Idea of the Day (only first card) */}
                    {index === 0 && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="bg-[#FDCC29] text-[#2D3748] px-3 py-2 rounded-full text-sm font-semibold shadow-md">
                          Idea of the Day
                        </div>
                      </div>
                    )}
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
                    <h3 className="text-lg font-bold text-[#2D3748] mb-2 leading-tight">
                      {idea.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-xs leading-relaxed mb-2 line-clamp-2 flex-grow">
                      {idea.description}
                    </p>

                    {/* Rating */}
                    <div className="flex flex-col space-y-1 mb-2">
                      <div className="text-md font-semibold text-[#2D3748]">
                        {rating}
                      </div>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.floor(rating)
                                ? "text-[#FDCC29] fill-current"
                                : star === Math.ceil(rating) && rating % 1 !== 0
                                ? "text-[#FDCC29] fill-current opacity-50"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">
                        ({reviewCount})
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center space-x-2">
                        {/* Lightbulb with count */}
                        <div
                          className={`flex items-center space-x-1 rounded-full px-2 py-2 ${
                            index === 0 ? "bg-[#FDCC29]" : "bg-gray-100"
                          }`}
                        >
                          <Lightbulb
                            className={`w-4 h-4 ${
                              index === 0 ? "text-[#2D3748]" : "text-[#2D3748]"
                            }`}
                          />
                          <span
                            className={`text-xs font-semibold ${
                              index === 0 ? "text-[#2D3748]" : "text-[#2D3748]"
                            }`}
                          >
                            {lightbulbCount}
                          </span>
                        </div>

                        {/* Heart */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors ${
                            index === 0 ? "bg-blue-500" : "bg-gray-100"
                          }`}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              index === 0 ? "text-white" : "text-[#2D3748]"
                            } hover:text-red-500`}
                          />
                        </div>

                        {/* Comment */}
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors">
                          <svg
                            className="w-5 h-5 text-[#2D3748]"
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
                            className="w-5 h-5 text-[#2D3748]"
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
            </CarouselItem>
          );
        })}
      </CarouselContent>

      {/* Navigation Arrows positioned on top of cards */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-10">
        <CarouselPrevious className="bg-[#FDCC29] text-[#2D3748] shadow-lg border border-[#2D3748] hover:bg-[#2D3748] hover:text-white transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10" />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-10">
        <CarouselNext className="bg-[#FDCC29] text-[#2D3748] shadow-lg border border-[#2D3748] hover:bg-[#2D3748] hover:text-white transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10" />
      </div>
    </Carousel>
  );
}

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
  Music,
};

// Sidebar links data
const sidebarLinks = {
  classifieds: [
    {
      title: "Business Ideas",
      description: "Find your next venture",
      icon: Lightbulb,
      href: "/ideas",
    },
    {
      title: "Community Ideas",
      description: "User-submitted concepts",
      icon: Users,
      href: "/community-ideas",
    },
    {
      title: "Featured Ideas",
      description: "Top-rated opportunities",
      icon: Star,
      href: "/ideas/featured",
    },
    {
      title: "Categories",
      description: "Browse by industry",
      icon: Building2,
      href: "/categories",
    },
  ],
  resources: [
    {
      title: "Business Plan Template",
      description: "Download free template",
      icon: FileText,
      href: "/resources/business-plan",
    },
    {
      title: "Market Research",
      description: "Industry insights",
      icon: TrendingUp,
      href: "/resources/market-research",
    },
    {
      title: "Funding Guide",
      description: "Investment strategies",
      icon: DollarSign,
      href: "/resources/funding",
    },
    {
      title: "Success Stories",
      description: "Real case studies",
      icon: Award,
      href: "/resources/success-stories",
    },
  ],
};

// Static Ideas Component (Explore More Ideas)
function StaticIdeas() {
  const [staticIdeas, setStaticIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  useEffect(() => {
    const fetchStaticIdeas = async () => {
      try {
        setLoading(true);
        const response = await ideasService.getStaticIdeas(1, 20); // Get more static ideas
        if (response.success) {
          setStaticIdeas(response.ideas);
        }
      } catch (error) {
        console.error("Error fetching static ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaticIdeas();
  }, []);

  const handleCardClick = (idea) => {
    // Route to static idea detail page
    window.location.href = `/ideas/${idea._id}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FDCC29]"></div>
      </div>
    );
  }

  if (staticIdeas.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-[#2D3748] mb-2">
          No static ideas available
        </h3>
        <p className="text-gray-500">
          Check back later for curated business ideas!
        </p>
      </div>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(staticIdeas.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = staticIdeas.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the static ideas section
    const element = document.getElementById("static-ideas");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* 4-column grid layout for full width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {currentCards.map((idea, index) => {
          const IconComponent = iconMap[idea.icon] || Lightbulb;
          return (
            <motion.div
              key={idea._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid mb-8"
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-2xl overflow-hidden h-full">
                {/* Image Section */}
                <div className="relative h-40 sm:mt-[-25px]">
                  <img
                    src={`/demo${(index % 7) + 1}.jpeg`}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Top Left Banner - Price Range */}
                  <div className="absolute top-0 left-0">
                    <div className="bg-[#FDCC29] text-[#2D3748] px-4 py-4 text-sm font-bold shadow-md rounded-br-xl">
                      {idea.investmentRange || idea.investment || "< ₹ 3Lakhs"}
                    </div>
                  </div>

                  {/* Top Right Banner - Discount Corner Ribbon */}
                  <div className="absolute top-0 right-0 ">
                    <div className="bg-[#2D3748] text-white p-2 text-lg font-bold text-green-500 shadow-md rounded-bl-xl">
                      <span className="text-green-500">
                        {Math.floor(Math.random() * 50) + 10}% Off
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
                  <h3 className="text-lg font-bold text-[#2D3748] mb-2 leading-tight">
                    {idea.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-xs leading-relaxed mb-2 line-clamp-2 flex-grow">
                    {idea.description}
                  </p>

                  {/* Rating */}
                  <div className="flex flex-col space-y-1 mb-2">
                    <div className="text-md font-semibold text-[#2D3748]">
                      {(idea.rating || 4.5).toFixed(1)}
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(idea.rating || 4.5)
                              ? "text-[#FDCC29] fill-current"
                              : star === Math.ceil(idea.rating || 4.5) &&
                                (idea.rating || 4.5) % 1 !== 0
                              ? "text-[#FDCC29] fill-current opacity-50"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      ({Math.floor(Math.random() * 50) + 10})
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-2">
                      {/* Lightbulb with count */}
                      <div className="flex items-center space-x-1 rounded-full px-2 py-2 bg-gray-100">
                        <Lightbulb className="w-4 h-4 text-[#2D3748]" />
                        <span className="text-xs font-semibold text-[#2D3748]">
                          {Math.floor(Math.random() * 100) + 20}
                        </span>
                      </div>

                      {/* Heart */}
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors">
                        <Heart className="w-5 h-5 text-[#2D3748] hover:text-red-500" />
                      </div>

                      {/* Comment */}
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors">
                        <svg
                          className="w-5 h-5 text-[#2D3748]"
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
                          className="w-5 h-5 text-[#2D3748]"
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
      </div>

      {/* Pagination for Static Ideas */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
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
                  length: Math.min(5, totalPages),
                },
                (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === currentPage ? "default" : "outline"}
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
              disabled={currentPage >= totalPages}
              className="bg-transparent border-[#2D3748]/30 text-[#2D3748] disabled:opacity-50 disabled:cursor-not-allowed px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Explore More Ideas Component (includes all ideas)
function ExploreMoreIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8; // 4 cards per row × 2 rows

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const response = await ideasService.getStaticIdeas(1, 100); // Get more ideas for pagination
        if (response.success) {
          setIdeas(response.ideas);
        }
      } catch (error) {
        console.error("Error fetching ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const totalPages = Math.ceil(ideas.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = ideas.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the explore ideas section
    const element = document.getElementById("explore-ideas");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FDCC29]"></div>
      </div>
    );
  }

  if (ideas.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-[#2D3748] mb-2">
          No ideas available yet
        </h3>
        <p className="text-gray-500">
          Check back soon for more innovative business ideas!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* 4x2 Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {currentCards.map((idea, index) => {
          return (
            <motion.div
              key={idea._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid mb-8"
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-2xl overflow-hidden h-full">
                {/* Image Section */}
                <div className="relative h-40 sm:mt-[-25px]">
                  <img
                    src={`/demo${(index % 7) + 1}.jpeg`}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Top Left Banner - Price Range */}
                  <div className="absolute top-0 left-0">
                    <div className="bg-[#FDCC29] text-[#2D3748] px-4 py-4 text-sm font-bold shadow-md rounded-br-xl">
                      {idea.investmentRange || idea.investment || "< ₹ 3Lakhs"}
                    </div>
                  </div>

                  {/* Top Right Banner - Discount Corner Ribbon */}
                  <div className="absolute top-0 right-0 ">
                    <div className="bg-[#2D3748] text-white p-2 text-lg font-bold text-green-500 shadow-md rounded-bl-xl">
                      <span className="text-green-500">
                        {Math.floor(Math.random() * 50) + 10}% Off
                      </span>
                    </div>
                  </div>
                  {/* </div> */}
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
                  <h3 className="text-lg font-bold text-[#2D3748] mb-2 leading-tight">
                    {idea.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-xs leading-relaxed mb-2 line-clamp-2 flex-grow">
                    {idea.description}
                  </p>

                  {/* Rating */}
                  <div className="flex flex-col space-y-1 mb-2">
                    <div className="text-md font-semibold text-[#2D3748]">
                      {(idea.rating || 4.5).toFixed(1)}
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(idea.rating || 4.5)
                              ? "text-[#FDCC29] fill-current"
                              : star === Math.ceil(idea.rating || 4.5) &&
                                (idea.rating || 4.5) % 1 !== 0
                              ? "text-[#FDCC29] fill-current opacity-50"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      ({Math.floor(Math.random() * 50) + 10})
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-2">
                      {/* Lightbulb with count */}
                      <div className="flex items-center space-x-1 rounded-full px-2 py-2 bg-gray-100">
                        <Lightbulb className="w-4 h-4 text-[#2D3748]" />
                        <span className="text-xs font-semibold text-[#2D3748]">
                          {Math.floor(Math.random() * 100) + 20}
                        </span>
                      </div>

                      {/* Heart */}
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors">
                        <Heart className="w-5 h-5 text-[#2D3748] hover:text-red-500" />
                      </div>

                      {/* Comment */}
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors">
                        <svg
                          className="w-5 h-5 text-[#2D3748]"
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
                          className="w-5 h-5 text-[#2D3748]"
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
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 text-sm ${
                    currentPage === pageNum
                      ? "bg-[#FDCC29] text-[#2D3748] hover:bg-[#FDCC29]/90"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// User Uploaded Ideas Component (Community Ideas Only)
function UserUploadedIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ideasPerPage = 8; // 4x2 grid

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const response = await ideasService.getCommunityIdeas(
          currentPage,
          ideasPerPage
        );
        if (response.success) {
          setIdeas(response.ideas);
        }
      } catch (error) {
        console.error("Error fetching ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the community section
    const element = document.getElementById("community-ideas");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FDCC29]"></div>
      </div>
    );
  }

  if (ideas.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-[#2D3748] mb-2">
          No community ideas yet
        </h3>
        <p className="text-gray-500">
          Be the first to share your innovative business idea!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* 4x2 Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {ideas.map((idea, index) => {
          return (
            <motion.div
              key={idea._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid mb-8"
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-2xl overflow-hidden h-full">
                {/* Image Section */}
                <div className="relative h-40 sm:mt-[-25px]">
                  <img
                    src={`/demo${(index % 7) + 1}.jpeg`}
                    alt={idea.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Top Left Banner - Price Range */}
                  <div className="absolute top-0 left-0">
                    <div className="bg-[#FDCC29] text-[#2D3748] px-4 py-4 text-sm font-bold shadow-md rounded-br-xl">
                      {idea.investmentRange || idea.investment || "< ₹ 3Lakhs"}
                    </div>
                  </div>

                  {/* Top Right Banner - Discount Corner Ribbon */}
                  <div className="absolute top-0 right-0">
                    <div className="absolute top-0 right-0 ">
                      <div className="bg-[#2D3748] text-white p-2 text-lg font-bold text-green-500 shadow-md rounded-bl-xl">
                        <span className="text-green-500">
                          {Math.floor(Math.random() * 50) + 10}% Off
                        </span>
                      </div>
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
                  <h3 className="text-lg font-bold text-[#2D3748] mb-2 leading-tight">
                    {idea.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-xs leading-relaxed mb-2 line-clamp-2 flex-grow">
                    {idea.description}
                  </p>

                  {/* Rating */}
                  <div className="flex flex-col space-y-1 mb-2">
                    <div className="text-md font-semibold text-[#2D3748]">
                      {(idea.rating || 4.5).toFixed(1)}
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(idea.rating || 4.5)
                              ? "text-[#FDCC29] fill-current"
                              : star === Math.ceil(idea.rating || 4.5) &&
                                (idea.rating || 4.5) % 1 !== 0
                              ? "text-[#FDCC29] fill-current opacity-50"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      ({Math.floor(Math.random() * 50) + 10})
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-2">
                      {/* Lightbulb with count */}
                      <div className="flex items-center space-x-1 rounded-full px-2 py-2 bg-gray-100">
                        <Lightbulb className="w-4 h-4 text-[#2D3748]" />
                        <span className="text-xs font-semibold text-[#2D3748]">
                          {Math.floor(Math.random() * 100) + 20}
                        </span>
                      </div>

                      {/* Heart */}
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors">
                        <Heart className="w-5 h-5 text-[#2D3748] hover:text-red-500" />
                      </div>

                      {/* Comment */}
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors">
                        <svg
                          className="w-5 h-5 text-[#2D3748]"
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
                          className="w-5 h-5 text-[#2D3748]"
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
      </div>

      {/* Pagination for Community Ideas */}
      {ideas.length > 0 && (
        <div className="mt-8 flex justify-center">
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
              {Array.from({ length: 5 }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className={
                    currentPage === pageNum
                      ? "bg-[#FDCC29] hover:bg-[#2D3748] text-[#2D3748] border-[#FDCC29] px-2 sm:px-3 py-2 font-light tracking-wide shadow-md text-xs sm:text-sm"
                      : "bg-transparent border-[#2D3748]/30 text-[#2D3748] px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
                  }
                >
                  {pageNum}
                </Button>
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={ideas.length < ideasPerPage}
              className="bg-transparent border-[#2D3748]/30 text-[#2D3748] disabled:opacity-50 disabled:cursor-not-allowed px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedInvestment, setSelectedInvestment] = useState("");

  const { viewCount, hasAccess, incrementView, remainingViews } =
    useIdeaAccess();

  // Note: Static ideas are now handled by the StaticIdeas component
  // The old filtering logic has been removed since we're fetching from API

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <Navbar />

      {/* Hero Section - Full Width */}
      <div className="relative w-full bg-[#FDCC29] py-12 sm:py-16 overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute inset-0">
          <div className="absolute top-4 left-8 w-16 h-16 bg-[#061F59] rounded-full opacity-20"></div>
          <div className="absolute top-8 left-16 w-8 h-8 bg-[#061F59] rounded-full opacity-30"></div>
          <div className="absolute bottom-6 left-12 w-12 h-12 bg-[#061F59] rounded-full opacity-25"></div>
          <div className="absolute top-6 right-12 w-10 h-10 bg-[#061F59] rounded-full opacity-20"></div>
          <div className="absolute bottom-8 right-8 w-6 h-6 bg-[#061F59] rounded-full opacity-30"></div>
          <div className="absolute top-1/2 right-16 w-14 h-14 bg-[#061F59] rounded-full opacity-15"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Heading */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#061F59] mb-4 leading-tight"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Discover 10,000+ Business Ideas
            </h1>

            {/* Subheading */}
            <p
              className="text-lg sm:text-xl text-[#061F59]/80 mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Find the perfect business opportunity that matches your skills and
              investment capacity
            </p>

            {/* CTA Button */}
            <div className="mb-8">
              <Button
                onClick={() => (window.location.href = "/ideas")}
                className="bg-[#061F59] hover:bg-[#061F59]/90 text-white px-8 py-3 text-lg font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center space-x-1 bg-[#061F59]/10 rounded-full px-4 py-2">
                <Star className="w-4 h-4 text-[#061F59]" />
                <span className="text-[#061F59] font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-1 bg-[#061F59]/10 rounded-full px-4 py-2">
                <Users className="w-4 h-4 text-[#061F59]" />
                <span className="text-[#061F59] font-medium">50K+ Users</span>
              </div>
              <div className="flex items-center space-x-1 bg-[#061F59]/10 rounded-full px-4 py-2">
                <Award className="w-4 h-4 text-[#061F59]" />
                <span className="text-[#061F59] font-medium">
                  Success Stories
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* Main Content Container */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="w-full">
          {/* Categories Section */}
          <div className="mb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Categories Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
                {/* Technology */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-pointer"
                  onClick={() =>
                    (window.location.href = "/categories?filter=Technology")
                  }
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-3 sm:p-4 text-center border border-gray-100 group-hover:border-[#FDCC29]/30">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center group-hover:from-[#FDCC29]/10 group-hover:to-[#FDCC29]/20 transition-all duration-300">
                      <img
                        src="/technology.png"
                        alt="Technology"
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                    </div>
                    <h3 className="text-xs font-semibold text-[#2D3748] group-hover:text-[#FDCC29] transition-colors">
                      Technology
                    </h3>
                  </div>
                </motion.div>

                {/* For Women */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-pointer"
                  onClick={() =>
                    (window.location.href = "/categories?filter=For Women")
                  }
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-3 sm:p-4 text-center border border-gray-100 group-hover:border-[#FDCC29]/30">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl flex items-center justify-center group-hover:from-[#FDCC29]/10 group-hover:to-[#FDCC29]/20 transition-all duration-300">
                      <img
                        src="/forwomen.png"
                        alt="For Women"
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                    </div>
                    <h3 className="text-xs font-semibold text-[#2D3748] group-hover:text-[#FDCC29] transition-colors">
                      For Women
                    </h3>
                  </div>
                </motion.div>

                {/* Startup Ideas */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-pointer"
                  onClick={() =>
                    (window.location.href = "/categories?filter=Startup Ideas")
                  }
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-3 sm:p-4 text-center border border-gray-100 group-hover:border-[#FDCC29]/30">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center group-hover:from-[#FDCC29]/10 group-hover:to-[#FDCC29]/20 transition-all duration-300">
                      <img
                        src="/startupideas.png"
                        alt="Startup Ideas"
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                    </div>
                    <h3 className="text-xs font-semibold text-[#2D3748] group-hover:text-[#FDCC29] transition-colors">
                      Startup Ideas
                    </h3>
                  </div>
                </motion.div>

                {/* Manufacturing */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-pointer"
                  onClick={() =>
                    (window.location.href = "/categories?filter=Manufacturing")
                  }
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-3 sm:p-4 text-center border border-gray-100 group-hover:border-[#FDCC29]/30">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center group-hover:from-[#FDCC29]/10 group-hover:to-[#FDCC29]/20 transition-all duration-300">
                      <img
                        src="/manufacturing.png"
                        alt="Manufacturing"
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                    </div>
                    <h3 className="text-xs font-semibold text-[#2D3748] group-hover:text-[#FDCC29] transition-colors">
                      Manufacturing
                    </h3>
                  </div>
                </motion.div>

                {/* Agriculture */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-pointer"
                  onClick={() =>
                    (window.location.href = "/categories?filter=Agriculture")
                  }
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-3 sm:p-4 text-center border border-gray-100 group-hover:border-[#FDCC29]/30">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center group-hover:from-[#FDCC29]/10 group-hover:to-[#FDCC29]/20 transition-all duration-300">
                      <img
                        src="/agriculture.png"
                        alt="Agriculture"
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                    </div>
                    <h3 className="text-xs font-semibold text-[#2D3748] group-hover:text-[#FDCC29] transition-colors">
                      Agriculture
                    </h3>
                  </div>
                </motion.div>

                {/* Food & Beverage */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-pointer"
                  onClick={() =>
                    (window.location.href =
                      "/categories?filter=Food & Beverage")
                  }
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-3 sm:p-4 text-center border border-gray-100 group-hover:border-[#FDCC29]/30">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center group-hover:from-[#FDCC29]/10 group-hover:to-[#FDCC29]/20 transition-all duration-300">
                      <img
                        src="/foodandbeverages.png"
                        alt="Food & Beverage"
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                    </div>
                    <h3 className="text-xs font-semibold text-[#2D3748] group-hover:text-[#FDCC29] transition-colors">
                      Food & Beverage
                    </h3>
                  </div>
                </motion.div>

                {/* Fashion - Hidden on mobile */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-pointer hidden sm:block"
                  onClick={() =>
                    (window.location.href = "/categories?filter=Fashion")
                  }
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-3 sm:p-4 text-center border border-gray-100 group-hover:border-[#FDCC29]/30">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center group-hover:from-[#FDCC29]/10 group-hover:to-[#FDCC29]/20 transition-all duration-300">
                      <img
                        src="/fashion.png"
                        alt="Fashion"
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                    </div>
                    <h3 className="text-xs font-semibold text-[#2D3748] group-hover:text-[#FDCC29] transition-colors">
                      Fashion
                    </h3>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile-Style Search Bar */}
          <div className="mb-8 sm:mb-12">
            <div className="w-full sm:w-[70%] mx-auto px-3 sm:px-4 lg:px-12">
              {/* Mobile-Style Search Component */}
              <div className="bg-[#FDCC29] rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <div className="bg-white rounded-full shadow-md overflow-hidden">
                      <div className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 lg:py-4">
                        <img
                          src="/searchicon.png"
                          alt="Search"
                          className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3"
                        />
                        <input
                          type="text"
                          placeholder="Search on 10000Ideas"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1 bg-transparent text-[#2D3748] placeholder-gray-500 focus:outline-none text-xs sm:text-sm lg:text-base font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Filter Funnel Button */}
                  <div className="bg-white rounded-full w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img
                      src="/filterfunnel.png"
                      alt="Filter"
                      className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                    />
                  </div>

                  {/* Settings/Advanced Filter Button */}
                  <div className="bg-white rounded-full w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img
                      src="/filter.png"
                      alt="Settings"
                      className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View Counter Banner */}
          {viewCount > 0 && (
            <div className="mb-6 flex justify-center px-4 sm:px-0">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200/50 shadow-sm">
                <p className="text-gray-600 text-sm font-medium text-center">
                  {hasAccess ? (
                    <span>
                      <span className="text-[#FDCC29] font-semibold">
                        {remainingViews}
                      </span>{" "}
                      free views remaining
                    </span>
                  ) : (
                    <span className="text-red-500">
                      Free limit reached -{" "}
                      <span className="text-[#2D3748] font-medium">
                        Upgrade to Premium
                      </span>
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Featured Ideas Carousel */}
          <div className="mb-8 sm:mb-12 ">
            <div className="text-center mb-4 sm:mb-6 px-4 sm:px-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2D3748] mb-3 tracking-tight">
                Featured Ideas
              </h2>
              <p className="text-base sm:text-lg text-[#2D3748] ftracking-wide">
                Discover trending business opportunities
              </p>
            </div>

            <FeaturedIdeasCarousel />
          </div>

          {/* Separator with Description */}
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center justify-center mb-6 px-4 sm:px-0">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FDCC29]/20 to-transparent"></div>
              <div className="mx-4 px-4 py-2 bg-[#FDCC29] rounded-lg shadow-sm">
                <span className="text-sm font-medium text-[#2D3748] tracking-wide">
                  Explore More Ideas
                </span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FDCC29]/20 to-transparent"></div>
            </div>
            <div className="text-center max-w-2xl mx-auto px-4 sm:px-0">
              <p className="text-sm text-[#2D3748] font-medium leading-relaxed">
                Each business idea card contains detailed information including
                investment requirements, revenue potential, difficulty level,
                and estimated timeline to help you make informed decisions.
                Click on any card to explore comprehensive business plans,
                market analysis, and step-by-step implementation guides.
              </p>
            </div>
          </div>

          {/* Explore More Ideas Component */}
          <div id="explore-ideas">
            <ExploreMoreIdeas />
          </div>

          {/* No Results Message - Removed since StaticIdeas component handles its own empty state */}

          {/* Old pagination removed - StaticIdeas component handles its own pagination */}
        </div>
      </div>

      {/* User Uploaded Ideas Section */}
      <div
        id="community-ideas"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#2D3748] mb-4">
            Community Ideas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover innovative business ideas shared by our community members
          </p>
        </div>

        <UserUploadedIdeas />
      </div>

      {/* Compact Sidebar Content - Horizontal Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Classifieds Section */}
          <Card className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="py-4 bg-[#2D3748] text-white">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#FDCC29] rounded-lg flex items-center justify-center">
                  <FileText className="w-3 h-3 text-[#2D3748]" />
                </div>
                <CardTitle className="text-lg font-bold text-white">
                  Classifieds
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sidebarLinks.classifieds.slice(0, 4).map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#FDCC29]/10 transition-all duration-300 cursor-pointer group border border-transparent hover:border-[#FDCC29]/30"
                    >
                      <div className="w-8 h-8 bg-[#FDCC29]/20 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-[#FDCC29]/30 transition-colors">
                        <IconComponent className="w-4 h-4 text-[#FDCC29]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-[#2D3748] group-hover:text-[#FDCC29] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                        <p className="text-xs text-[#FDCC29] mt-1 font-medium">
                          {item.time}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Resources Section */}
          <Card className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="py-4 bg-[#2D3748] text-white">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#FDCC29] rounded-lg flex items-center justify-center">
                  <Award className="w-3 h-3 text-[#2D3748]" />
                </div>
                <CardTitle className="text-lg font-bold text-white">
                  Resources
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sidebarLinks.resources.slice(0, 4).map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#FDCC29]/10 transition-all duration-300 cursor-pointer group border border-transparent hover:border-[#FDCC29]/30"
                    >
                      <div className="w-8 h-8 bg-[#FDCC29]/20 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-[#FDCC29]/30 transition-colors">
                        <IconComponent className="w-4 h-4 text-[#FDCC29]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-[#2D3748] group-hover:text-[#FDCC29] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-[#2D3748] py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 text-center">
          {/* Header */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <div className="flex items-center justify-center mb-2 sm:mb-3 lg:mb-4">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 flex items-center justify-center">
                <img
                  src="/pureyellowlogo.png"
                  alt="1000 Ideas Logo"
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
                />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 px-2">
              Stay Ahead with Fresh Ideas!
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed px-3 sm:px-2">
              Get the latest business ideas and startup tips delivered to your
              inbox
            </p>
          </div>

          {/* Newsletter Card */}
          <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-xl mx-2 sm:mx-0">
            <div className="mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg lg:text-xl font-light text-[#2D3748] mb-1 tracking-wide">
                Join 10,000+ Entrepreneurs
              </h3>
              <p className="text-gray-600 font-light tracking-wide text-xs sm:text-sm">
                Weekly ideas that grow your business
              </p>
            </div>

            {/* Email Form */}
            <div className="max-w-xs sm:max-w-sm mx-auto space-y-2 sm:space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-50/50 backdrop-blur-sm border border-[#FDCC29]/30 rounded-lg text-[#2D3748] placeholder-[#A0AEC0] focus:ring-2 focus:ring-[#10B981] focus:outline-none shadow-md text-xs sm:text-sm"
                />
              </div>
              <Button className="w-full bg-[#FDCC29] hover:bg-[#2D3748] text-[#2D3748] hover:text-white font-semibold tracking-wide py-2 sm:py-2.5 lg:py-3 shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm">
                Subscribe Now
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="mt-3 sm:mt-4 flex items-center justify-center space-x-2 text-gray-600">
              <Star className="w-3 h-3 text-[#FDCC29] fill-current" />
              <span className="text-xs font-light tracking-wide">
                No spam, unsubscribe anytime
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing between Newsletter and Footer */}
      <div className="py-8"></div>

      <Footer />

      {/* Premium Modal */}
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </div>
  );
}
