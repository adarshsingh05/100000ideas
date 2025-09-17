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
    <Carousel className="w-full px-4 sm:px-6">
      <CarouselContent className="-ml-2 sm:-ml-3">
        {featuredIdeas.map((idea, index) => {
          // Map category to icon
          const getIcon = (category) => {
            switch (category) {
              case "Technology":
                return Smartphone;
              case "Healthcare":
                return Heart;
              case "Education":
                return Users;
              case "Finance":
                return DollarSign;
              case "E-commerce":
                return ShoppingBag;
              case "Food & Beverage":
                return Utensils;
              case "Travel & Tourism":
                return MapPin;
              case "Real Estate":
                return Home;
              case "Entertainment":
                return Music;
              case "Fashion":
                return Shirt;
              case "Sports":
                return Dumbbell;
              case "Automotive":
                return Car;
              case "Agriculture":
                return Leaf;
              case "Energy":
                return Zap;
              case "Manufacturing":
                return Settings;
              default:
                return Lightbulb;
            }
          };

          const IconComponent = getIcon(idea.category);

          return (
            <CarouselItem
              key={idea._id}
              className="pl-2 sm:pl-3 basis-1/2 sm:basis-1/3 lg:basis-1/4"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="bg-white shadow-sm cursor-pointer border border-gray-200 rounded-lg overflow-hidden"
                  onClick={() => handleCardClick(idea)}
                >
                  {/* Image Placeholder */}
                  <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FDCC29]/20 to-[#2D3748]/20"></div>
                    <div className="absolute top-3 left-3">
                      <div className="bg-[#FDCC29] text-[#2D3748] px-2 py-1 rounded text-xs font-medium">
                        {idea.investmentRange}
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/90 text-[#2D3748] px-2 py-1 rounded text-xs font-medium">
                        {idea.timeToStart}
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                        <IconComponent className="w-3 h-3 text-[#2D3748]" />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4">
                    {/* Category and Rating */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {idea.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-[#FDCC29] fill-current" />
                        <span className="text-xs text-[#2D3748] font-medium">
                          {Math.random() * 2 + 3.5}{" "}
                          {/* Random rating between 3.5-5.5 */}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <CardTitle className="text-sm font-semibold text-[#2D3748] leading-tight mb-2">
                      {idea.title}
                    </CardTitle>

                    {/* Description */}
                    <CardDescription className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
                      {idea.description}
                    </CardDescription>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {idea.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Revenue Potential</span>
                        <span className="text-[#2D3748] font-medium">High</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Market Size</span>
                        <span className="text-[#2D3748] font-medium">
                          {idea.marketSize}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
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
              <Card
                className="bg-white border border-gray-200 shadow-sm cursor-pointer rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleCardClick(idea)}
              >
                {/* Image Placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FDCC29]/20 to-[#2D3748]/20"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-[#FDCC29] text-[#2D3748] px-3 py-1 rounded text-sm font-medium">
                      {idea.investmentRange || idea.investment || "₹25L"}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 text-[#2D3748] px-3 py-1 rounded text-sm font-medium">
                      {idea.difficulty || "Medium"}
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-[#2D3748]" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
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

                  <h3 className="text-lg font-semibold text-[#2D3748] leading-tight mb-2 line-clamp-2">
                    {idea.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                    {idea.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {idea.tags?.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    )) || (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        Business
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Revenue</span>
                      <span className="text-sm text-[#2D3748] font-medium">
                        {idea.revenue || "High potential"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Timeline</span>
                      <span className="text-sm text-[#2D3748] font-medium">
                        {idea.timeToStart || idea.timeToMarket || "2-3 months"}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(idea);
                    }}
                    className="w-full text-sm font-medium border border-[#2D3748] text-[#2D3748] py-2 hover:bg-[#2D3748] hover:text-white transition-colors duration-300"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
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

// User Uploaded Ideas Component
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
        console.error("Error fetching community ideas:", error);
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
        {ideas.map((idea, index) => (
          <motion.div
            key={idea._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="break-inside-avoid mb-8"
          >
            <Card className="bg-white border border-gray-200 shadow-sm cursor-pointer rounded-lg overflow-hidden">
              {/* Image Placeholder */}
              <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FDCC29]/20 to-[#2D3748]/20"></div>
                <div className="absolute top-4 left-4">
                  <div className="bg-[#FDCC29] text-[#2D3748] px-3 py-1 rounded text-sm font-medium">
                    {idea.investmentRange || "₹25L"}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 text-[#2D3748] px-3 py-1 rounded text-sm font-medium">
                    {idea.difficulty || "Medium"}
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-[#2D3748]" />
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
                <CardTitle className="text-lg font-semibold text-[#2D3748] leading-tight mb-3">
                  {idea.title}
                </CardTitle>

                {/* Description */}
                <CardDescription className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                  {idea.description}
                </CardDescription>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {idea.tags?.slice(0, 3).map((tag, tagIndex) => (
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
                      {idea.timeToStart || "2-3 months"}
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
                      {idea.uploadedByName?.split(" ")[0] || "Anonymous"}
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
                  onClick={() => {
                    console.log(
                      "Homepage View Details clicked! Opening:",
                      `/community-ideas/${idea._id}`
                    );
                    window.location.href = `/community-ideas/${idea._id}`;
                  }}
                  className="w-full text-sm font-medium border border-[#2D3748] text-[#2D3748] py-2"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
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

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="w-full">
          {/* Main Content - Full Width */}
          <div className="w-full">
            {/* Enhanced Header Section */}
            <div className="mb-12">
              {/* Main Hero Section */}
              <div className="relative bg-gradient-to-r from-[#FDCC29] to-[#2D3748] rounded-2xl p-8 sm:p-12 shadow-lg overflow-hidden mb-8">
                {/* Decorative Background Elements */}
                <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div
                  className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full blur-xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute bottom-6 left-12 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
                <div
                  className="absolute bottom-4 right-6 w-14 h-14 bg-white/10 rounded-full blur-xl animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>

                {/* Floating Icons */}
                <div className="absolute top-6 left-8 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <div
                  className="absolute top-12 right-12 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
                <div
                  className="absolute bottom-8 left-16 w-7 h-7 bg-white/20 rounded-full flex items-center justify-center animate-bounce"
                  style={{ animationDelay: "1s" }}
                >
                  <DollarSign className="w-3 h-3 text-white" />
                </div>
                <div
                  className="absolute bottom-6 right-8 w-9 h-9 bg-white/20 rounded-full flex items-center justify-center animate-bounce"
                  style={{ animationDelay: "1.5s" }}
                >
                  <Target className="w-4 h-4 text-white" />
                </div>

                <div className="relative z-10 text-center">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                    Discover 10,000+ Business Ideas
                  </h1>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                    <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <Star className="w-4 h-4 text-[#FDCC29]" />
                      <span className="text-white text-sm font-medium">
                        4.9/5 Rating
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <Users className="w-4 h-4 text-[#FDCC29]" />
                      <span className="text-white text-sm font-medium">
                        50K+ Users
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <Award className="w-4 h-4 text-[#FDCC29]" />
                      <span className="text-white text-sm font-medium">
                        Success Stories
                      </span>
                    </div>
                  </div>

                  <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
                    Find the perfect business opportunity that matches your
                    skills and investment capacity
                  </p>

                  {/* Enhanced CTA Section */}
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                      <span className="text-white font-medium text-base">
                        Start Your Journey Today
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-white/80">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Quick Setup</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm">Secure Platform</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-2xl mx-auto mb-8">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                        10K+
                      </div>
                      <div className="text-sm text-white/80">
                        Business Ideas
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                        50+
                      </div>
                      <div className="text-sm text-white/80">Categories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                        95%
                      </div>
                      <div className="text-sm text-white/80">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                        24/7
                      </div>
                      <div className="text-sm text-white/80">Support</div>
                    </div>
                  </div>

                  {/* Featured Business Categories - Scattered Around Hero Box */}

                  {/* Top Left Card */}
                  <div className="absolute top-4 left-4 w-64 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer group z-20">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-white leading-tight">
                        High Profit Business Ideas
                      </h3>
                      <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform p-1">
                        <img
                          src="/amountbag.png"
                          alt="Money Bag"
                          className="w-7 h-7"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-white/80 mb-2">
                      Maximum returns with strategic investments
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white font-medium">
                        25 Ideas
                      </span>
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Top Right Card */}
                  <div className="absolute top-4 right-4 w-64 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer group z-20">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-white leading-tight">
                        5AM Business Ideas
                      </h3>
                      <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform p-1">
                        <img src="/clock.png" alt="Clock" className="w-7 h-7" />
                      </div>
                    </div>
                    <p className="text-xs text-white/80 mb-2">
                      Early morning opportunities for early risers
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white font-medium">
                        18 Ideas
                      </span>
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Bottom Left Card */}
                  <div className="absolute bottom-4 left-4 w-64 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer group z-20">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-white leading-tight">
                        How Senior Citizens can Get Rich
                      </h3>
                      <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform p-1">
                        <img
                          src="/Group 482166.png"
                          alt="Senior"
                          className="w-7 h-7"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-white/80 mb-2">
                      Age-appropriate business opportunities
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white font-medium">
                        15 Ideas
                      </span>
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Bottom Right Card */}
                  <div className="absolute bottom-4 right-4 w-64 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer group z-20">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-white leading-tight">
                        Ideas for Talkative Women
                      </h3>
                      <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform p-1">
                        <img
                          src="/mic.png"
                          alt="Microphone"
                          className="w-7 h-7"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-white/80 mb-2">
                      Perfect business opportunities for outgoing personalities
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white font-medium">
                        12 Ideas
                      </span>
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Center Left Card */}
                  <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-64 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer group z-20">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-white leading-tight">
                        Travel Business Ideas
                      </h3>
                      <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform p-1">
                        <img src="/plane.png" alt="Plane" className="w-7 h-7" />
                      </div>
                    </div>
                    <p className="text-xs text-white/80 mb-2">
                      Earn while exploring the world
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white font-medium">
                        20 Ideas
                      </span>
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Center Right Card */}
                  <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-64 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer group z-20">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-white leading-tight">
                        Tech Startup Ideas
                      </h3>
                      <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform p-1">
                        <img
                          src="/bulb.png"
                          alt="Lightbulb"
                          className="w-7 h-7"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-white/80 mb-2">
                      Innovative technology business opportunities
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white font-medium">
                        30 Ideas
                      </span>
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Search Bar */}

            {/* Stylish Search Section */}
            <div className="mb-12">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Enhanced Search Bar */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/10 to-[#2D3748]/5 rounded-2xl blur-sm"></div>
                  <div className="relative bg-white/95 backdrop-blur-sm border border-[#B8860B]/20 rounded-2xl shadow-lg overflow-hidden">
                    <div className="flex items-center">
                      <div className="flex-1 relative">
                        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#B8860B] w-6 h-6" />
                        <input
                          type="text"
                          placeholder="Search business ideas, categories, or keywords..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-14 pr-6 py-5 bg-transparent text-[#2D3748] placeholder-[#2D3748]/60 text-lg font-medium focus:outline-none"
                        />
                      </div>
                      <div className="px-6 py-5">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#B8860B] to-[#2D3748] rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                          <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Filter Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/5 to-[#2D3748]/5 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="relative w-full px-4 py-4 bg-white/90 backdrop-blur-sm border border-[#B8860B]/20 rounded-xl focus:ring-2 focus:ring-[#B8860B]/30 focus:border-[#B8860B] text-[#2D3748] font-medium appearance-none cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group-hover:shadow-lg"
                    >
                      <option value="">All Categories</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Retail">Retail</option>
                      <option value="Services">Services</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Education">Education</option>
                      <option value="Entertainment">Entertainment</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <div className="w-2 h-2 border-r-2 border-b-2 border-[#B8860B] transform rotate-45"></div>
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/5 to-[#2D3748]/5 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="relative w-full px-4 py-4 bg-white/90 backdrop-blur-sm border border-[#B8860B]/20 rounded-xl focus:ring-2 focus:ring-[#B8860B]/30 focus:border-[#B8860B] text-[#2D3748] font-medium appearance-none cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group-hover:shadow-lg"
                    >
                      <option value="">All Locations</option>
                      <option value="Urban">Urban</option>
                      <option value="Rural">Rural</option>
                      <option value="Online">Online</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <div className="w-2 h-2 border-r-2 border-b-2 border-[#B8860B] transform rotate-45"></div>
                    </div>
                  </div>

                  {/* Investment Filter */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/5 to-[#2D3748]/5 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                    <select
                      value={selectedInvestment}
                      onChange={(e) => setSelectedInvestment(e.target.value)}
                      className="relative w-full px-4 py-4 bg-white/90 backdrop-blur-sm border border-[#B8860B]/20 rounded-xl focus:ring-2 focus:ring-[#B8860B]/30 focus:border-[#B8860B] text-[#2D3748] font-medium appearance-none cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md group-hover:shadow-lg"
                    >
                      <option value="">All Investment Ranges</option>
                      <option value="₹1L - ₹5L">₹1L - ₹5L</option>
                      <option value="₹5L - ₹10L">₹5L - ₹10L</option>
                      <option value="₹10L - ₹25L">₹10L - ₹25L</option>
                      <option value="₹25L - ₹50L">₹25L - ₹50L</option>
                      <option value="₹50L+">₹50L+</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <div className="w-2 h-2 border-r-2 border-b-2 border-[#B8860B] transform rotate-45"></div>
                    </div>
                  </div>

                  {/* Clear Filters Button */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/10 to-[#2D3748]/5 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("");
                        setSelectedLocation("");
                        setSelectedInvestment("");
                      }}
                      className="relative w-full px-4 py-4 bg-gradient-to-r from-[#B8860B] to-[#2D3748] text-white rounded-xl hover:from-[#B8860B]/90 hover:to-[#2D3748]/90 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Clear Filters
                    </button>
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
                  Each business idea card contains detailed information
                  including investment requirements, revenue potential,
                  difficulty level, and estimated timeline to help you make
                  informed decisions. Click on any card to explore comprehensive
                  business plans, market analysis, and step-by-step
                  implementation guides.
                </p>
              </div>
            </div>

            {/* Static Ideas Component */}
            <div id="static-ideas">
              <StaticIdeas />
            </div>

            {/* No Results Message - Removed since StaticIdeas component handles its own empty state */}

            {/* Old pagination removed - StaticIdeas component handles its own pagination */}
          </div>
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
            <CardHeader className="py-4 bg-gradient-to-r from-[#FDCC29] to-[#2D3748] text-white">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-3 h-3 text-white" />
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
            <CardHeader className="py-4 bg-gradient-to-r from-[#FDCC29] to-[#2D3748] text-white">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                  <Award className="w-3 h-3 text-white" />
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
      <div className="bg-gradient-to-r from-[#FDCC29] to-[#2D3748] py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center shadow-md">
                <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">
              Stay Ahead with Fresh Ideas!
            </h2>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed px-2">
              Get the latest business ideas and startup tips delivered to your
              inbox
            </p>
          </div>

          {/* Newsletter Card */}
          <div className="bg-white rounded-lg p-6 sm:p-8 shadow-xl">
            <div className="mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl font-light text-[#2D3748] mb-1 tracking-wide">
                Join 10,000+ Entrepreneurs
              </h3>
              <p className="text-gray-600 font-light tracking-wide text-xs sm:text-sm">
                Weekly ideas that grow your business
              </p>
            </div>

            {/* Email Form */}
            <div className="max-w-sm mx-auto space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50/50 backdrop-blur-sm border border-[#FDCC29]/30 rounded-lg text-[#2D3748] placeholder-[#A0AEC0] focus:ring-2 focus:ring-[#10B981] focus:outline-none shadow-md text-sm"
                />
              </div>
              <Button className="w-full bg-[#FDCC29] hover:bg-[#2D3748] text-[#2D3748] font-light tracking-wide py-2 sm:py-2.5 shadow-md hover:shadow-lg transition-all duration-300 text-sm">
                Subscribe Now
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 flex items-center justify-center space-x-2 text-gray-600">
              <Star className="w-3 h-3 text-[#FDCC29] fill-current" />
              <span className="text-xs font-light tracking-wide">
                No spam, unsubscribe anytime
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Premium Modal */}
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </div>
  );
}
