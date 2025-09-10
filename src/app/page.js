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
  const cardsPerPage = 9;

  const { viewCount, hasAccess, incrementView, remainingViews } =
    useIdeaAccess();

  // Filter business ideas based on search query
  const filteredBusinessIdeas = useMemo(() => {
    if (!searchQuery.trim()) {
      return businessIdeas;
    }

    return businessIdeas.filter(
      (idea) =>
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [searchQuery]);

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
    <div className="min-h-screen bg-[#0A0F1F]">
      <Navbar />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Main Content - Pinterest Style Grid */}
          <div className="flex-1 max-w-6xl">
            {/* Header Section with Animated Background */}
            <div className="mb-12 relative">
              {/* Floating Animated Background */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#10B981]/20 rounded-full animate-pulse"></div>
                <div
                  className="absolute top-8 -right-8 w-16 h-16 bg-[#059669]/30 rounded-full animate-bounce"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute -bottom-6 left-1/4 w-20 h-20 bg-[#10B981]/15 rounded-full animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
                <div
                  className="absolute bottom-4 right-1/3 w-12 h-12 bg-[#059669]/25 rounded-full animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute top-1/2 left-8 w-8 h-8 bg-[#10B981]/20 rounded-full animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                ></div>
                <div
                  className="absolute top-1/3 right-12 w-14 h-14 bg-[#059669]/20 rounded-full animate-bounce"
                  style={{ animationDelay: "2.5s" }}
                ></div>
              </div>

              {/* Header Content */}
              <div className="relative z-10 text-center py-12 px-8">
                <h1 className="text-5xl font-light text-white mb-6 leading-tight tracking-tight">
                  Discover 10,000+ Business Ideas
                </h1>
                <p className="text-xl text-[#A0AEC0] mb-8 leading-relaxed max-w-3xl mx-auto">
                  Find the perfect business opportunity that matches your skills
                  and investment capacity
                </p>
              </div>
            </div>

            {/* Modern Search Bar */}
            <div className="mb-8 max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/20 to-[#059669]/20 rounded-md blur-sm"></div>
                <div className="relative bg-[#1E40AF]/20 border border-[#10B981]/30 rounded-md p-1 backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#10B981] w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search business ideas..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-transparent text-white placeholder-[#A0AEC0] focus:outline-none text-lg font-light tracking-wide"
                      />
                    </div>
                    <div className="w-px h-8 bg-[#10B981]/30 mx-4"></div>
                    {searchQuery && (
                      <Button
                        onClick={() => handleSearch("")}
                        variant="outline"
                        className="mr-2 px-4 py-4 border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/10 rounded-xl font-light tracking-wide transition-all duration-300"
                      >
                        Clear
                      </Button>
                    )}
                    <Button className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 rounded-xl font-light tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#10B981]/20">
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* View Counter */}
            {viewCount > 0 && (
              <div className="mb-6 flex justify-center">
                <div className="bg-[#1E40AF]/20 backdrop-blur-sm rounded-full px-4 py-2 border border-[#10B981]/30">
                  <p className="text-[#A0AEC0] text-sm font-light tracking-wide">
                    {hasAccess ? (
                      <span>
                        <span className="text-[#10B981] font-medium">
                          {remainingViews}
                        </span>{" "}
                        free views remaining
                      </span>
                    ) : (
                      <span className="text-red-400">
                        Free limit reached -{" "}
                        <span className="text-purple-400">
                          Upgrade to Premium
                        </span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Featured Ideas Carousel */}
            <div className="mb-12">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-light text-white mb-2 tracking-tight">
                  Featured Ideas
                </h2>
                <p className="text-[#A0AEC0] font-light tracking-wide">
                  Discover trending business opportunities
                </p>
              </div>

              <Carousel className="w-full px-4">
                <CarouselContent className="-ml-1 md:-ml-2">
                  {carouselIdeas.map((idea, index) => {
                    const IconComponent = idea.icon;
                    return (
                      <CarouselItem
                        key={idea.id}
                        className="pl-1 md:pl-2 basis-1/2 lg:basis-1/4"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card
                            className={`bg-[#1E40AF]/10 hover:shadow-xl hover:shadow-[#10B981]/20 transition-all duration-300 cursor-pointer group backdrop-blur-sm h-72 flex flex-col overflow-hidden border-2 ${
                              index % 2 === 0
                                ? "border-white/30 hover:border-white/50"
                                : "border-[#10B981]/20 hover:border-[#10B981]/50"
                            }`}
                            onClick={() => handleCardClick(idea.id)}
                          >
                            {/* Header Section */}
                            <div className="p-4 pb-3">
                              <div className="flex items-center justify-between mb-3">
                                <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 border border-[#059669]">
                                  <IconComponent className="w-4 h-4 text-white" />
                                </div>
                                <Badge
                                  variant="secondary"
                                  className={`text-xs font-medium tracking-wide px-2 py-1 ${
                                    idea.difficulty === "Easy"
                                      ? "bg-green-500 text-white"
                                      : idea.difficulty === "Medium"
                                      ? "bg-yellow-500 text-white"
                                      : "bg-red-500 text-white"
                                  }`}
                                >
                                  {idea.difficulty}
                                </Badge>
                              </div>

                              {/* Title */}
                              <CardTitle className="text-base font-light text-white group-hover:text-[#10B981] transition-colors leading-tight tracking-wide text-center mb-2">
                                {idea.title}
                              </CardTitle>

                              {/* Description */}
                              <CardDescription className="text-[#8A9BAE] text-xs leading-relaxed font-light tracking-wide text-center line-clamp-2">
                                {idea.description}
                              </CardDescription>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 px-4 pb-4 space-y-3">
                              {/* Rating & Category */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3 h-3 text-[#10B981] fill-current" />
                                  <span className="text-xs font-light text-white tracking-wide">
                                    {idea.rating}
                                  </span>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30 font-light tracking-wide px-2 py-1"
                                >
                                  {idea.category}
                                </Badge>
                              </div>

                              {/* Financial Info */}
                              <div className="bg-[#0A0F1F]/30 rounded-lg p-3 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <DollarSign className="w-3 h-3 text-[#A0AEC0]" />
                                    <span className="text-xs text-[#A0AEC0] font-light">
                                      Investment
                                    </span>
                                  </div>
                                  <span className="text-xs font-medium text-white tracking-wide">
                                    {idea.investment}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <TrendingUp className="w-3 h-3 text-[#10B981]" />
                                    <span className="text-xs text-[#A0AEC0] font-light">
                                      Revenue
                                    </span>
                                  </div>
                                  <span className="text-xs font-medium text-[#10B981] tracking-wide">
                                    {idea.revenue}
                                  </span>
                                </div>
                              </div>

                              {/* Timeline */}
                              <div className="flex items-center justify-center space-x-2 bg-[#10B981]/10 rounded-lg py-2">
                                <Clock className="w-3 h-3 text-[#10B981]" />
                                <span className="text-xs text-[#10B981] font-light tracking-wide">
                                  {idea.timeToStart} to start
                                </span>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="bg-[#10B981] hover:bg-[#059669] text-white border-[#10B981] hover:border-[#059669] w-8 h-8 -left-2" />
                <CarouselNext className="bg-[#10B981] hover:bg-[#059669] text-white border-[#10B981] hover:border-[#059669] w-8 h-8 -right-2" />
              </Carousel>
            </div>

            {/* Separator with Description */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#10B981]/30 to-transparent"></div>
                <div className="mx-6 px-4 py-2 bg-[#1E40AF]/20 border border-[#10B981]/30 rounded-full backdrop-blur-sm">
                  <span className="text-lg font-light text-[#10B981] tracking-wide">
                    Explore More Ideas
                  </span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#10B981]/30 to-transparent"></div>
              </div>
              <div className="text-center max-w-3xl mx-auto">
                <p className="text-[#A0AEC0] font-light tracking-wide leading-relaxed">
                  Each business idea card contains detailed information
                  including investment requirements, revenue potential,
                  difficulty level, and estimated timeline to help you make
                  informed decisions. Click on any card to explore comprehensive
                  business plans, market analysis, and step-by-step
                  implementation guides.
                </p>
              </div>
            </div>

            {/* 3-column grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        className="bg-[#1E40AF]/10 border-[#10B981]/20 hover:shadow-2xl hover:shadow-[#10B981]/30 transition-all duration-300 cursor-pointer group border-2 hover:border-[#10B981]/50 backdrop-blur-sm min-h-[320px]"
                        onClick={() => handleCardClick(idea.id)}
                      >
                        <CardHeader className="pb-6 px-6 pt-6">
                          {/* Header with icon and category */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 border border-[#059669]">
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <Badge
                                  variant="secondary"
                                  className="mb-1 bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30 text-xs font-light tracking-wide"
                                >
                                  {idea.category}
                                </Badge>
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 text-[#10B981] fill-current" />
                                    <span className="text-xs font-light text-white tracking-wide">
                                      {idea.rating}
                                    </span>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className="text-xs px-1 py-0 border-[#A0AEC0]/30 text-[#A0AEC0] font-light tracking-wide"
                                  >
                                    {idea.difficulty}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div
                                className={`text-sm text-white px-2 py-1 rounded-md font-light tracking-wide ${
                                  idea.difficulty === "Easy"
                                    ? "bg-green-500"
                                    : idea.difficulty === "Medium"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                              >
                                {idea.investment}
                              </div>
                            </div>
                          </div>

                          <CardTitle className="text-xl font-light text-white mb-3 group-hover:text-[#10B981] transition-colors leading-tight tracking-wide">
                            {idea.title}
                          </CardTitle>
                          <CardDescription className="text-[#8A9BAE] text-sm leading-relaxed line-clamp-2 font-light tracking-wide">
                            {idea.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0 px-6 pb-6">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {idea.tags.slice(0, 3).map((tag, tagIndex) => (
                              <Badge
                                key={tagIndex}
                                variant="outline"
                                className="text-xs bg-[#1E40AF]/20 text-[#A0AEC0] border-[#10B981]/30 hover:bg-[#10B981]/20 px-2 py-0 font-light tracking-wide"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <Separator className="my-3 bg-[#10B981]/20" />

                          {/* Metrics and Info */}
                          <div className="space-y-3">
                            {/* Revenue Potential */}
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-3 h-3 text-[#10B981]" />
                              <span className="text-xs text-white font-light tracking-wide">
                                {idea.revenue}
                              </span>
                            </div>

                            {/* Time to Market */}
                            <div className="flex items-center space-x-2">
                              <Clock className="w-3 h-3 text-[#A0AEC0]" />
                              <span className="text-xs text-[#A0AEC0] font-light tracking-wide">
                                Time:{" "}
                                <span className="font-light text-white tracking-wide">
                                  {idea.timeToMarket}
                                </span>
                              </span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="mt-4 pt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full group-hover:bg-[#10B981]/20 group-hover:border-[#10B981] group-hover:text-[#10B981] transition-all text-sm border-[#10B981]/50 text-[#10B981] font-light tracking-wide bg-[#10B981]/10"
                            >
                              View Details
                              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* No Results Message */}
            {filteredBusinessIdeas.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <div className="bg-[#1E40AF]/20 backdrop-blur-sm rounded-2xl p-8 border border-[#10B981]/30 max-w-md mx-auto">
                  <Search className="w-16 h-16 text-[#10B981] mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-light text-white mb-2">
                    No Results Found
                  </h3>
                  <p className="text-[#A0AEC0] mb-4">
                    No business ideas match your search for &quot;{searchQuery}
                    &quot;
                  </p>
                  <Button
                    onClick={() => handleSearch("")}
                    className="bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2 rounded-lg font-light tracking-wide"
                  >
                    Clear Search
                  </Button>
                </div>
              </div>
            )}

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center space-x-1 sm:space-x-2 bg-[#1E40AF]/20 backdrop-blur-sm rounded-2xl p-1 sm:p-2 border border-[#10B981]/30 shadow-lg max-w-full overflow-x-auto">
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-transparent border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/20 hover:border-[#10B981] disabled:opacity-50 disabled:cursor-not-allowed px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
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
                          className="bg-transparent border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/20 hover:border-[#10B981] px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
                        >
                          1
                        </Button>
                        {currentPage > 4 && (
                          <span className="text-[#A0AEC0] px-2 font-light">
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
                              ? "bg-[#10B981] hover:bg-[#059669] text-white border-[#10B981] px-2 sm:px-3 py-2 font-light tracking-wide shadow-md text-xs sm:text-sm"
                              : "bg-transparent border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/20 hover:border-[#10B981] px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
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
                          <span className="text-[#A0AEC0] px-2 font-light">
                            ...
                          </span>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(totalPages)}
                          className="bg-transparent border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/20 hover:border-[#10B981] px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
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
                    className="bg-transparent border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/20 hover:border-[#10B981] disabled:opacity-50 disabled:cursor-not-allowed px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
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
                <p className="text-[#A0AEC0] text-sm font-light tracking-wide">
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, filteredBusinessIdeas.length)} of{" "}
                  {filteredBusinessIdeas.length} business ideas
                  {searchQuery && (
                    <span className="text-[#10B981]">
                      {" "}
                      (filtered from {businessIdeas.length} total)
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-64 hidden lg:block flex-shrink-0 ml-auto">
            <div className="sticky top-32 space-y-4">
              {/* Classifieds Section */}
              <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 shadow-lg rounded-2xl overflow-hidden backdrop-blur-sm">
                <CardHeader className="py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-white">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-3 h-3 text-white" />
                    </div>
                    <CardTitle className="text-sm font-light text-white tracking-wide">
                      Classifieds
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-3 space-y-2">
                  {sidebarLinks.classifieds.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ x: 4, scale: 1.02 }}
                        className="flex items-start space-x-2 p-2 rounded-lg hover:bg-[#10B981]/10 transition-all duration-300 cursor-pointer group border border-transparent hover:border-[#10B981]/30 hover:shadow-md hover:shadow-[#10B981]/10"
                      >
                        <div className="w-6 h-6 bg-[#10B981]/20 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-[#10B981]/30 transition-colors">
                          <IconComponent className="w-3 h-3 text-[#10B981]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-light text-white group-hover:text-[#10B981] transition-colors tracking-wide">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#A0AEC0] mt-0.5 leading-relaxed font-light tracking-wide">
                            {item.description}
                          </p>
                          <p className="text-xs text-[#10B981] mt-0.5 font-light tracking-wide">
                            {item.time}
                          </p>
                        </div>
                        <ArrowRight className="w-3 h-3 text-[#A0AEC0] group-hover:text-[#10B981] transition-colors mt-0.5" />
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Resources Section */}
              <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 shadow-lg rounded-2xl overflow-hidden backdrop-blur-sm">
                <CardHeader className="py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-white">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                    <CardTitle className="text-sm font-light text-white tracking-wide">
                      Resources
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-3 space-y-2">
                  {sidebarLinks.resources.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ x: 4, scale: 1.02 }}
                        className="flex items-start space-x-2 p-2 rounded-lg hover:bg-[#10B981]/10 transition-all duration-300 cursor-pointer group border border-transparent hover:border-[#10B981]/30 hover:shadow-md hover:shadow-[#10B981]/10"
                      >
                        <div className="w-6 h-6 bg-[#10B981]/20 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-[#10B981]/30 transition-colors">
                          <IconComponent className="w-3 h-3 text-[#10B981]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-light text-white group-hover:text-[#10B981] transition-colors tracking-wide">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#A0AEC0] mt-0.5 leading-relaxed font-light tracking-wide">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight className="w-3 h-3 text-[#A0AEC0] group-hover:text-[#10B981] transition-colors mt-0.5" />
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-br from-[#0A0F1F] via-[#1E40AF]/20 to-[#0A0F1F] py-12 border-t border-[#10B981]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center shadow-md">
                <Lightbulb className="w-4 h-4 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-light text-white mb-3 tracking-tight">
              Stay Ahead with Fresh Ideas!
            </h2>
            <p className="text-lg text-[#A0AEC0] leading-relaxed font-light tracking-wide">
              Get the latest business ideas and startup tips delivered to your
              inbox
            </p>
          </div>

          {/* Newsletter Card */}
          <div className="bg-[#1E40AF]/20 backdrop-blur-sm rounded-sm p-6 border border-[#10B981]/30 shadow-xl">
            <div className="mb-4">
              <h3 className="text-xl font-light text-white mb-1 tracking-wide">
                Join 10,000+ Entrepreneurs
              </h3>
              <p className="text-[#A0AEC0] font-light tracking-wide text-sm">
                Weekly ideas that grow your business
              </p>
            </div>

            {/* Email Form */}
            <div className="max-w-sm mx-auto space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-[#0A0F1F]/50 backdrop-blur-sm border border-[#10B981]/30 rounded-lg text-white placeholder-[#A0AEC0] focus:ring-2 focus:ring-[#10B981] focus:outline-none shadow-md text-sm"
                />
              </div>
              <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-light tracking-wide py-2.5  shadow-md hover:shadow-lg transition-all duration-300 text-sm">
                Subscribe Now
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 flex items-center justify-center space-x-2 text-[#A0AEC0]">
              <Star className="w-3 h-3 text-[#10B981] fill-current" />
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
