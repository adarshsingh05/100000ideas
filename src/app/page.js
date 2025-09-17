"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useIdeaAccess } from "@/hooks/useIdeaAccess";
import PremiumModal from "@/components/PremiumModal";
import businessIdeasData from "@/data/businessIdeas.json";
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
  Star,
  Clock,
  DollarSign,
  ArrowRight,
  Search,
  Target,
  Shield,
  MapPin,
  X,
} from "lucide-react";

// Dummy data for carousel ideas
const carouselIdeas = [
  {
    id: 11,
    title: "AI Chatbot Service",
    description: "Custom AI chatbots for businesses",
    icon: Smartphone,
    category: "AI",
    investment: "₹50L",
    difficulty: "Medium",
    rating: 4.8,
    timeToStart: "2-3 months",
    revenue: "₹2-5L/month",
    tags: ["AI", "SaaS", "Automation"],
  },
  {
    id: 12,
    title: "Eco Packaging",
    description: "Sustainable packaging solutions",
    icon: Leaf,
    category: "Green",
    investment: "₹30L",
    difficulty: "Easy",
    rating: 4.6,
    timeToStart: "1-2 months",
    revenue: "₹1-3L/month",
    tags: ["Eco", "B2B", "Manufacturing"],
  },
  {
    id: 13,
    title: "Food Delivery App",
    description: "Local restaurant delivery platform",
    icon: Utensils,
    category: "Food",
    investment: "₹80L",
    difficulty: "Hard",
    rating: 4.9,
    timeToStart: "4-6 months",
    revenue: "₹5-10L/month",
    tags: ["Food", "App", "Delivery"],
  },
  {
    id: 14,
    title: "Fitness Coaching",
    description: "Online personal training platform",
    icon: Dumbbell,
    category: "Health",
    investment: "₹25L",
    difficulty: "Easy",
    rating: 4.7,
    timeToStart: "1 month",
    revenue: "₹1-4L/month",
    tags: ["Health", "Online", "Coaching"],
  },
  {
    id: 15,
    title: "Photo Studio",
    description: "Professional photography services",
    icon: Camera,
    category: "Creative",
    investment: "₹40L",
    difficulty: "Medium",
    rating: 4.5,
    timeToStart: "2-3 months",
    revenue: "₹2-6L/month",
    tags: ["Creative", "Photography", "Events"],
  },
  {
    id: 16,
    title: "E-commerce Store",
    description: "Online retail business",
    icon: ShoppingBag,
    category: "Retail",
    investment: "₹60L",
    difficulty: "Medium",
    rating: 4.4,
    timeToStart: "3-4 months",
    revenue: "₹3-8L/month",
    tags: ["Retail", "Online", "Dropshipping"],
  },
  {
    id: 17,
    title: "Digital Marketing",
    description: "Social media marketing agency",
    icon: TrendingUp,
    category: "Marketing",
    investment: "₹35L",
    difficulty: "Medium",
    rating: 4.6,
    timeToStart: "2-3 months",
    revenue: "₹2-5L/month",
    tags: ["Marketing", "Social", "Agency"],
  },
  {
    id: 18,
    title: "Online Education",
    description: "Skill-based learning platform",
    icon: Users,
    category: "Education",
    investment: "₹45L",
    difficulty: "Medium",
    rating: 4.8,
    timeToStart: "3-4 months",
    revenue: "₹3-7L/month",
    tags: ["Education", "Online", "Skills"],
  },
];

// Dummy data for business ideas
const businessIdeas = [
  {
    id: 1,
    title: "AI-Powered Personal Finance App",
    description:
      "Smart budgeting app that uses machine learning to provide personalized financial advice and investment recommendations for modern users.",
    icon: Smartphone,
    category: "Technology",
    investment: "₹1.2Cr",
    difficulty: "Hard",
    rating: 4.7,
    tags: ["AI", "Finance", "Mobile"],
    metrics: [8.5, 9.2, 8.8],
    timeToMarket: "8 months",
    revenue: "High recurring revenue potential",
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: 2,
    title: "Traditional Indian Bakery",
    description:
      "Authentic Indian bakery offering fresh daily breads, traditional sweets, savory snacks, and regional specialties with time-tested recipes.",
    icon: Utensils,
    category: "Food & Beverage",
    investment: "₹15L",
    difficulty: "Medium",
    rating: 4.1,
    tags: ["Food", "Traditional", "Local"],
    metrics: [8.2, 8.5, 8.8],
    timeToMarket: "3-6 months",
    revenue: "Steady returns with growing demand",
    color: "bg-orange-50 border-orange-200",
  },
  {
    id: 3,
    title: "Vertical Urban Farming System",
    description:
      "Automated indoor farming solution for growing fresh produce in urban environments using vertical space efficiently and sustainably.",
    icon: Leaf,
    category: "Agriculture",
    investment: "₹65L",
    difficulty: "Medium",
    rating: 4.4,
    tags: ["Sustainability", "Agriculture", "Urban"],
    metrics: [7.8, 8.5, 9.1],
    timeToMarket: "6 months",
    revenue: "Steady returns with growing demand",
    color: "bg-green-50 border-green-200",
  },
  {
    id: 4,
    title: "Premium Fitness Studio Chain",
    description:
      "Luxury fitness studios offering personalized training, wellness programs, and premium equipment in prime urban locations.",
    icon: Dumbbell,
    category: "Health & Wellness",
    investment: "₹85L",
    difficulty: "Hard",
    rating: 4.6,
    tags: ["Fitness", "Wellness", "Premium"],
    metrics: [8.1, 8.8, 8.9],
    timeToMarket: "6-9 months",
    revenue: "High recurring revenue potential",
    color: "bg-purple-50 border-purple-200",
  },
  {
    id: 5,
    title: "Eco-Friendly Packaging Solutions",
    description:
      "Sustainable packaging alternatives for businesses looking to reduce their environmental footprint with innovative biodegradable materials.",
    icon: Leaf,
    category: "Sustainability",
    investment: "₹35L",
    difficulty: "Medium",
    rating: 4.3,
    tags: ["Eco-friendly", "Packaging", "B2B"],
    metrics: [7.9, 8.3, 8.7],
    timeToMarket: "4-6 months",
    revenue: "Growing market demand",
    color: "bg-emerald-50 border-emerald-200",
  },
  {
    id: 6,
    title: "Digital Marketing Agency",
    description:
      "Full-service digital marketing agency specializing in social media, SEO, content marketing, and growth strategies for small businesses.",
    icon: Laptop,
    category: "Marketing",
    investment: "₹25L",
    difficulty: "Medium",
    rating: 4.2,
    tags: ["Digital", "Marketing", "Services"],
    metrics: [8.0, 8.4, 8.6],
    timeToMarket: "2-4 months",
    revenue: "Scalable service business",
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    id: 7,
    title: "Premium Pet Care Services",
    description:
      "Luxury pet grooming, boarding, and wellness services for pet owners who want the best care for their beloved companions.",
    icon: Heart,
    category: "Pet Care",
    investment: "₹45L",
    difficulty: "Medium",
    rating: 4.5,
    tags: ["Pet Care", "Luxury", "Services"],
    metrics: [8.3, 8.6, 8.9],
    timeToMarket: "3-5 months",
    revenue: "Steady recurring revenue",
    color: "bg-pink-50 border-pink-200",
  },
  {
    id: 8,
    title: "Smart Home Automation",
    description:
      "Custom smart home solutions integrating IoT devices, security systems, and energy management for modern connected homes.",
    icon: Building2,
    category: "Technology",
    investment: "₹75L",
    difficulty: "Hard",
    rating: 4.4,
    tags: ["IoT", "Smart Home", "Tech"],
    metrics: [8.4, 8.7, 9.0],
    timeToMarket: "6-8 months",
    revenue: "High-value installations",
    color: "bg-cyan-50 border-cyan-200",
  },
  {
    id: 9,
    title: "Artisan Coffee Roastery",
    description:
      "Specialty coffee roasting business sourcing premium beans and creating unique blends for cafes and retail customers.",
    icon: Utensils,
    category: "Food & Beverage",
    investment: "₹40L",
    difficulty: "Medium",
    rating: 4.3,
    tags: ["Coffee", "Artisan", "Premium"],
    metrics: [7.7, 8.2, 8.5],
    timeToMarket: "4-6 months",
    revenue: "Growing specialty market",
    color: "bg-amber-50 border-amber-200",
  },
  {
    id: 10,
    title: "Professional Photography Studio",
    description:
      "High-end photography services for weddings, corporate events, and commercial shoots with state-of-the-art equipment and expertise.",
    icon: Camera,
    category: "Creative Services",
    investment: "₹30L",
    difficulty: "Medium",
    rating: 4.4,
    tags: ["Photography", "Events", "Creative"],
    metrics: [8.1, 8.5, 8.8],
    timeToMarket: "2-4 months",
    revenue: "Premium service pricing",
    color: "bg-violet-50 border-violet-200",
  },
  {
    id: 11,
    title: "AI-Powered Language Learning App",
    description:
      "Interactive language learning platform using AI to personalize lessons and provide real-time pronunciation feedback for multiple languages.",
    icon: Users,
    category: "Education Technology",
    investment: "₹80L",
    difficulty: "Hard",
    rating: 4.6,
    tags: ["AI", "Education", "Language"],
    metrics: [8.8, 9.0, 8.7],
    timeToMarket: "6-8 months",
    revenue: "Subscription-based model",
    color: "bg-indigo-50 border-indigo-200",
  },
  {
    id: 12,
    title: "Sustainable Packaging Solutions",
    description:
      "Eco-friendly packaging alternatives for businesses, focusing on biodegradable materials and reducing environmental impact.",
    icon: Leaf,
    category: "Sustainability",
    investment: "₹45L",
    difficulty: "Medium",
    rating: 4.3,
    tags: ["Eco-friendly", "Packaging", "B2B"],
    metrics: [8.3, 8.6, 8.9],
    timeToMarket: "4-6 months",
    revenue: "B2B sales model",
    color: "bg-green-50 border-green-200",
  },
  {
    id: 13,
    title: "Virtual Reality Fitness Studio",
    description:
      "Immersive VR fitness experiences combining gaming elements with workout routines for engaging home fitness solutions.",
    icon: Dumbbell,
    category: "Health & Fitness",
    investment: "₹55L",
    difficulty: "Hard",
    rating: 4.5,
    tags: ["VR", "Fitness", "Gaming"],
    metrics: [8.6, 8.8, 8.4],
    timeToMarket: "7-9 months",
    revenue: "App subscriptions + hardware",
    color: "bg-red-50 border-red-200",
  },
  {
    id: 14,
    title: "Smart Home Automation Service",
    description:
      "Complete smart home setup and management service, helping homeowners integrate IoT devices for enhanced living experiences.",
    icon: Building2,
    category: "Technology Services",
    investment: "₹35L",
    difficulty: "Medium",
    rating: 4.2,
    tags: ["IoT", "Smart Home", "Automation"],
    metrics: [8.2, 8.4, 8.6],
    timeToMarket: "3-5 months",
    revenue: "Installation + maintenance fees",
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: 15,
    title: "Artisan Coffee Roasting Business",
    description:
      "Premium coffee roasting and retail business, sourcing beans directly from farmers and creating unique blends for coffee enthusiasts.",
    icon: Utensils,
    category: "Food & Beverage",
    investment: "₹25L",
    difficulty: "Medium",
    rating: 4.4,
    tags: ["Coffee", "Artisan", "Retail"],
    metrics: [8.4, 8.7, 8.5],
    timeToMarket: "2-4 months",
    revenue: "Retail + wholesale sales",
    color: "bg-amber-50 border-amber-200",
  },
  {
    id: 16,
    title: "Blockchain Supply Chain Platform",
    description:
      "Transparent supply chain management platform using blockchain technology to track products from source to consumer.",
    icon: TrendingUp,
    category: "Blockchain Technology",
    investment: "₹1.5Cr",
    difficulty: "Hard",
    rating: 4.7,
    tags: ["Blockchain", "Supply Chain", "B2B"],
    metrics: [9.0, 9.2, 8.8],
    timeToMarket: "10-12 months",
    revenue: "Enterprise licensing model",
    color: "bg-purple-50 border-purple-200",
  },
  {
    id: 17,
    title: "Pet Care Mobile App",
    description:
      "Comprehensive pet care platform connecting pet owners with veterinarians, groomers, and pet services in their area.",
    icon: Heart,
    category: "Pet Services",
    investment: "₹40L",
    difficulty: "Medium",
    rating: 4.3,
    tags: ["Pet Care", "Mobile App", "Services"],
    metrics: [8.3, 8.5, 8.7],
    timeToMarket: "5-7 months",
    revenue: "Commission-based model",
    color: "bg-pink-50 border-pink-200",
  },
  {
    id: 18,
    title: "Renewable Energy Consulting",
    description:
      "Expert consulting services for businesses and homeowners looking to transition to solar, wind, and other renewable energy solutions.",
    icon: Leaf,
    category: "Energy Consulting",
    investment: "₹20L",
    difficulty: "Medium",
    rating: 4.5,
    tags: ["Renewable Energy", "Consulting", "Sustainability"],
    metrics: [8.5, 8.8, 8.6],
    timeToMarket: "2-3 months",
    revenue: "Consulting fees + project management",
    color: "bg-emerald-50 border-emerald-200",
  },
  {
    id: 19,
    title: "AI-Powered Content Creation Tool",
    description:
      "Automated content generation platform for social media, blogs, and marketing materials using advanced AI and natural language processing.",
    icon: FileText,
    category: "Content Technology",
    investment: "₹70L",
    difficulty: "Hard",
    rating: 4.6,
    tags: ["AI", "Content Creation", "Marketing"],
    metrics: [8.7, 9.0, 8.5],
    timeToMarket: "6-8 months",
    revenue: "SaaS subscription model",
    color: "bg-cyan-50 border-cyan-200",
  },
  {
    id: 20,
    title: "Local Food Delivery Network",
    description:
      "Hyperlocal food delivery service connecting neighborhood restaurants with customers, focusing on quick delivery and community support.",
    icon: Car,
    category: "Food Delivery",
    investment: "₹50L",
    difficulty: "Medium",
    rating: 4.2,
    tags: ["Food Delivery", "Local Business", "Logistics"],
    metrics: [8.2, 8.4, 8.6],
    timeToMarket: "4-6 months",
    revenue: "Commission from restaurants + delivery fees",
    color: "bg-orange-50 border-orange-200",
  },
];

// Sidebar links data
const sidebarLinks = {
  classifieds: [
    {
      title: "New Business Opportunity",
      description: "Local restaurant looking for delivery partners",
      time: "2 hours ago",
      icon: TrendingUp,
    },
    {
      title: "Investment Opportunity",
      description: "Tech startup seeking angel investors",
      time: "5 hours ago",
      icon: Users,
    },
    {
      title: "Partnership Available",
      description: "E-commerce platform seeking suppliers",
      time: "1 day ago",
      icon: Building2,
    },
    {
      title: "Franchise Opportunity",
      description: "Popular coffee chain expanding",
      time: "2 days ago",
      icon: Award,
    },
  ],
  resources: [
    {
      title: "Business Plan Template",
      description: "Free downloadable templates",
      icon: FileText,
    },
    {
      title: "Funding Guide",
      description: "Complete guide to business funding",
      icon: TrendingUp,
    },
    {
      title: "Market Research Tools",
      description: "Tools for market analysis",
      icon: Lightbulb,
    },
    {
      title: "Legal Resources",
      description: "Business registration & compliance",
      icon: FileText,
    },
    {
      title: "Mentorship Program",
      description: "Connect with experienced entrepreneurs",
      icon: Users,
    },
    {
      title: "Success Stories",
      description: "Real entrepreneur success stories",
      icon: Award,
    },
  ],
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedInvestment, setSelectedInvestment] = useState("");
  const cardsPerPage = 4;

  const { viewCount, hasAccess, incrementView, remainingViews } =
    useIdeaAccess();

  // Filter business ideas based on search query and filters
  const filteredBusinessIdeas = useMemo(() => {
    let filtered = businessIdeas;

    // Search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (idea) =>
          idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (idea) => idea.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Location filter (assuming we add location to business ideas data)
    if (selectedLocation) {
      filtered = filtered.filter(
        (idea) =>
          idea.location?.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    // Investment filter
    if (selectedInvestment) {
      filtered = filtered.filter((idea) => {
        const investment = idea.investment;
        switch (selectedInvestment) {
          case "0-1L":
            return investment.includes("₹1L") || investment.includes("₹50K");
          case "1L-5L":
            return (
              investment.includes("₹2L") ||
              investment.includes("₹3L") ||
              investment.includes("₹5L")
            );
          case "5L-10L":
            return investment.includes("₹8L") || investment.includes("₹10L");
          case "10L-25L":
            return (
              investment.includes("₹15L") ||
              investment.includes("₹20L") ||
              investment.includes("₹25L")
            );
          case "25L-50L":
            return (
              investment.includes("₹30L") ||
              investment.includes("₹40L") ||
              investment.includes("₹50L")
            );
          case "50L+":
            return (
              investment.includes("₹80L") ||
              investment.includes("₹1Cr") ||
              investment.includes("₹2Cr")
            );
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedLocation, selectedInvestment]);

  const handleCardClick = (id) => {
    if (hasAccess) {
      // Allow access and increment view count
      incrementView();
      window.location.href = `/ideas/${id}`;
    } else {
      // Show premium modal
      setShowPremiumModal(true);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredBusinessIdeas.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = filteredBusinessIdeas.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the grid
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

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
            <div className="mb-6 sm:mb-8 max-w-6xl mx-auto px-4 sm:px-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FDCC29]/20 to-[#2D3748]/20 rounded-lg blur-sm"></div>
                <div className="relative bg-white/90 border border-[#FDCC29]/30 rounded-lg p-2 backdrop-blur-sm shadow-lg">
                  <div className="flex flex-col lg:flex-row items-stretch lg:items-center space-y-3 lg:space-y-0 lg:space-x-3">
                    {/* Search Input */}
                    <div className="flex-1 flex items-center space-x-3 bg-white rounded-lg p-2 border border-gray-200">
                      <Search className="w-5 h-5 text-[#FDCC29] ml-2" />
                      <input
                        type="text"
                        placeholder="Search for business ideas..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="flex-1 py-2 px-2 bg-transparent text-[#2D3748] placeholder-gray-500 focus:outline-none text-sm sm:text-base"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => handleSearch("")}
                          className="p-1 text-gray-400 hover:text-[#2D3748] rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center space-x-2 bg-white rounded-lg p-2 border border-gray-200 min-w-[180px]">
                      <Building2 className="w-4 h-4 text-[#FDCC29]" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="flex-1 py-2 px-2 bg-transparent text-[#2D3748] focus:outline-none text-sm border-none"
                      >
                        <option value="">All Categories</option>
                        <option value="Technology">Technology</option>
                        <option value="Food & Beverage">Food & Beverage</option>
                        <option value="Health & Fitness">
                          Health & Fitness
                        </option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Education">Education</option>
                        <option value="Finance">Finance</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Beauty & Fashion">
                          Beauty & Fashion
                        </option>
                      </select>
                    </div>

                    {/* Location Filter */}
                    <div className="flex items-center space-x-2 bg-white rounded-lg p-2 border border-gray-200 min-w-[160px]">
                      <MapPin className="w-4 h-4 text-[#FDCC29]" />
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="flex-1 py-2 px-2 bg-transparent text-[#2D3748] focus:outline-none text-sm border-none"
                      >
                        <option value="">All Locations</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Online">Online</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>

                    {/* Investment Range Filter */}
                    <div className="flex items-center space-x-2 bg-white rounded-lg p-2 border border-gray-200 min-w-[140px]">
                      <DollarSign className="w-4 h-4 text-[#FDCC29]" />
                      <select
                        value={selectedInvestment}
                        onChange={(e) => setSelectedInvestment(e.target.value)}
                        className="flex-1 py-2 px-2 bg-transparent text-[#2D3748] focus:outline-none text-sm border-none"
                      >
                        <option value="">Any Investment</option>
                        <option value="0-1L">Under ₹1L</option>
                        <option value="1L-5L">₹1L - ₹5L</option>
                        <option value="5L-10L">₹5L - ₹10L</option>
                        <option value="10L-25L">₹10L - ₹25L</option>
                        <option value="25L-50L">₹25L - ₹50L</option>
                        <option value="50L+">₹50L+</option>
                      </select>
                    </div>

                    {/* Search Button */}
                    <button
                      onClick={() => {}} // We'll handle this with the search input
                      className="bg-[#FDCC29] text-[#2D3748] px-6 py-3 rounded-lg font-medium text-sm hover:bg-[#2D3748] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Search className="w-4 h-4" />
                      <span>Search</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* View Counter */}
            {viewCount > 0 && (
              <div className="mb-4 sm:mb-6 flex justify-center px-4 sm:px-0">
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 border border-[#FDCC29]/30 shadow-lg">
                  <p className="text-gray-600 text-xs sm:text-sm font-light tracking-wide text-center">
                    {hasAccess ? (
                      <span>
                        <span className="text-[#FDCC29] font-medium">
                          {remainingViews}
                        </span>{" "}
                        free views remaining
                      </span>
                    ) : (
                      <span className="text-red-500">
                        Free limit reached -{" "}
                        <span className="text-[#2D3748]">
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

              <Carousel className="w-full px-4 sm:px-6 ">
                <CarouselContent className="-ml-2 sm:-ml-3">
                  {carouselIdeas.map((idea, index) => {
                    const IconComponent = idea.icon;
                    return (
                      <CarouselItem
                        key={idea.id}
                        className="pl-2 sm:pl-3 basis-1/2 sm:basis-1/3 lg:basis-1/4"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card
                            className="bg-white shadow-sm cursor-pointer border border-gray-200 rounded-lg overflow-hidden"
                            onClick={() => handleCardClick(idea.id)}
                          >
                            {/* Image Placeholder */}
                            <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200">
                              <div className="absolute inset-0 bg-gradient-to-br from-[#FDCC29]/20 to-[#2D3748]/20"></div>
                              <div className="absolute top-3 left-3">
                                <div className="bg-[#FDCC29] text-[#2D3748] px-2 py-1 rounded text-xs font-medium">
                                  {idea.investment}
                                </div>
                              </div>
                              <div className="absolute top-3 right-3">
                                <div className="bg-white/90 text-[#2D3748] px-2 py-1 rounded text-xs font-medium">
                                  {idea.difficulty}
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
                                    {idea.rating}
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
                                  <span className="text-gray-500">
                                    Revenue Potential
                                  </span>
                                  <span className="text-[#2D3748] font-medium">
                                    {idea.revenue}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">
                                    Time to Market
                                  </span>
                                  <span className="text-[#2D3748] font-medium">
                                    {idea.timeToStart}
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
                <CarouselPrevious className="bg-[#FDCC29] text-[#2D3748] border-[#FDCC29] w-8 h-8 sm:w-10 sm:h-10 -left-2 sm:-left-3" />
                <CarouselNext className="bg-[#FDCC29] text-[#2D3748] border-[#FDCC29] w-8 h-8 sm:w-10 sm:h-10 -right-2 sm:-right-3" />
              </Carousel>
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

            {/* 4-column grid layout for full width */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {currentCards.map((idea, index) => {
                const IconComponent = idea.icon;
                return (
                  <motion.div
                    key={idea.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="break-inside-avoid mb-8"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="bg-white border border-gray-200 shadow-sm cursor-pointer rounded-lg overflow-hidden"
                        onClick={() => handleCardClick(idea.id)}
                      >
                        {/* Image Placeholder */}
                        <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#FDCC29]/20 to-[#2D3748]/20"></div>
                          <div className="absolute top-4 left-4">
                            <div className="bg-[#FDCC29] text-[#2D3748] px-3 py-1 rounded text-sm font-medium">
                              {idea.investment}
                            </div>
                          </div>
                          <div className="absolute top-4 right-4">
                            <div className="bg-white/90 text-[#2D3748] px-3 py-1 rounded text-sm font-medium">
                              {idea.difficulty}
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
                                {idea.rating}
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
                            {idea.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Metrics */}
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                Revenue Potential
                              </span>
                              <span className="text-sm text-[#2D3748] font-medium">
                                {idea.revenue}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                Time to Market
                              </span>
                              <span className="text-sm text-[#2D3748] font-medium">
                                {idea.timeToMarket}
                              </span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <Button
                            variant="outline"
                            className="w-full text-sm font-medium border border-[#2D3748] text-[#2D3748] py-2"
                          >
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* No Results Message */}
            {filteredBusinessIdeas.length === 0 && searchQuery && (
              <div className="text-center py-8 sm:py-12 px-4 sm:px-0">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-[#FDCC29]/30 max-w-md mx-auto">
                  <Search className="w-12 h-12 sm:w-16 sm:h-16 text-[#FDCC29] mx-auto mb-3 sm:mb-4 opacity-50" />
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2D3748] mb-3">
                    No Results Found
                  </h3>
                  <p className="text-base sm:text-lg text-[#2D3748] font-bold mb-4">
                    No business ideas match your search for &ldquo;{searchQuery}
                    &rdquo;
                  </p>
                  <Button
                    onClick={() => handleSearch("")}
                    className="bg-[#FDCC29] text-[#2D3748] px-4 sm:px-6 py-2 rounded-lg font-bold text-base"
                  >
                    Clear Search
                  </Button>
                </div>
              </div>
            )}

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
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
                    {/* First page */}
                    {currentPage > 3 && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(1)}
                          className="bg-transparent border-[#2D3748]/30 text-[#2D3748] px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
                        >
                          1
                        </Button>
                        {currentPage > 4 && (
                          <span className="text-gray-600 px-2 font-light">
                            ...
                          </span>
                        )}
                      </>
                    )}

                    {/* Pages around current page */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      if (pageNum < 1 || pageNum > totalPages) return null;

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
                              ? "bg-[#FDCC29] hover:bg-[#2D3748] text-[#2D3748] border-[#FDCC29] px-2 sm:px-3 py-2 font-light tracking-wide shadow-md text-xs sm:text-sm"
                              : "bg-transparent border-[#2D3748]/30 text-[#2D3748] px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
                          }
                        >
                          {pageNum}
                        </Button>
                      );
                    })}

                    {/* Last page */}
                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && (
                          <span className="text-gray-600 px-2 font-light">
                            ...
                          </span>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(totalPages)}
                          className="bg-transparent border-[#2D3748]/30 text-[#2D3748] px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Next Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-transparent border-[#2D3748]/30 text-[#2D3748] disabled:opacity-50 disabled:cursor-not-allowed px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Page Info */}
            {totalPages > 1 && (
              <div className="mt-4 text-center">
                <p className="text-[#2D3748] text-base font-bold tracking-wide">
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, filteredBusinessIdeas.length)} of{" "}
                  {filteredBusinessIdeas.length} business ideas
                  {searchQuery && (
                    <span className="text-[#FDCC29]">
                      {" "}
                      (filtered from {businessIdeas.length} total)
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
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
