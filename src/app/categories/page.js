"use client";

import { useState, useMemo } from "react";
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
  Home,
  ChevronRight,
  Filter,
  Grid3X3,
  List,
} from "lucide-react";

// Category data with comprehensive information
const categories = [
  {
    id: "technology",
    name: "Technology",
    description: "AI, software, apps, and digital innovations",
    icon: Smartphone,
    color: "from-blue-500 to-purple-600",
    ideaCount: 45,
    avgInvestment: "₹75L",
    difficulty: "Medium",
    marketGrowth: "18.5%",
    popularTags: ["AI", "SaaS", "Mobile App", "Blockchain"],
    featured: true,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Medical devices, health apps, and wellness solutions",
    icon: Heart,
    color: "from-red-500 to-pink-600",
    ideaCount: 32,
    avgInvestment: "₹1.2Cr",
    difficulty: "Hard",
    marketGrowth: "12.3%",
    popularTags: ["Telemedicine", "Wearables", "Mental Health", "Fitness"],
    featured: true,
  },
  {
    id: "sustainability",
    name: "Sustainability",
    description: "Green tech, renewable energy, and eco-friendly solutions",
    icon: Leaf,
    color: "from-green-500 to-emerald-600",
    ideaCount: 28,
    avgInvestment: "₹90L",
    difficulty: "Medium",
    marketGrowth: "22.1%",
    popularTags: [
      "Renewable Energy",
      "Waste Management",
      "Carbon Neutral",
      "Eco Products",
    ],
    featured: true,
  },
  {
    id: "food-beverage",
    name: "Food & Beverage",
    description: "Restaurants, food delivery, and culinary innovations",
    icon: Utensils,
    color: "from-orange-500 to-red-600",
    ideaCount: 38,
    avgInvestment: "₹60L",
    difficulty: "Medium",
    marketGrowth: "8.7%",
    popularTags: ["Delivery", "Cloud Kitchen", "Organic", "Beverages"],
    featured: false,
  },
  {
    id: "automotive",
    name: "Automotive",
    description: "Electric vehicles, mobility solutions, and auto tech",
    icon: Car,
    color: "from-gray-600 to-blue-600",
    ideaCount: 25,
    avgInvestment: "₹2.5Cr",
    difficulty: "Hard",
    marketGrowth: "15.8%",
    popularTags: ["EV", "Charging", "Mobility", "Auto Tech"],
    featured: false,
  },
  {
    id: "education",
    name: "Education",
    description: "EdTech, online learning, and educational tools",
    icon: FileText,
    color: "from-indigo-500 to-blue-600",
    ideaCount: 41,
    avgInvestment: "₹45L",
    difficulty: "Easy",
    marketGrowth: "16.4%",
    popularTags: ["EdTech", "Online Learning", "Skills", "Training"],
    featured: true,
  },
  {
    id: "retail-ecommerce",
    name: "Retail & E-commerce",
    description: "Online stores, marketplaces, and retail innovations",
    icon: ShoppingBag,
    color: "from-purple-500 to-pink-600",
    ideaCount: 52,
    avgInvestment: "₹35L",
    difficulty: "Easy",
    marketGrowth: "11.2%",
    popularTags: ["E-commerce", "Marketplace", "D2C", "Retail Tech"],
    featured: false,
  },
  {
    id: "media-entertainment",
    name: "Media & Entertainment",
    description: "Content creation, streaming, and digital media",
    icon: Camera,
    color: "from-pink-500 to-rose-600",
    ideaCount: 29,
    avgInvestment: "₹55L",
    difficulty: "Medium",
    marketGrowth: "13.6%",
    popularTags: ["Content", "Streaming", "Social Media", "Gaming"],
    featured: false,
  },
  {
    id: "fitness-wellness",
    name: "Fitness & Wellness",
    description: "Gym equipment, wellness apps, and health services",
    icon: Dumbbell,
    color: "from-yellow-500 to-orange-600",
    ideaCount: 33,
    avgInvestment: "₹40L",
    difficulty: "Easy",
    marketGrowth: "14.9%",
    popularTags: ["Fitness", "Wellness", "Nutrition", "Mental Health"],
    featured: false,
  },
  {
    id: "marketing-advertising",
    name: "Marketing & Advertising",
    description: "Digital marketing, advertising tech, and brand solutions",
    icon: Megaphone,
    color: "from-cyan-500 to-blue-600",
    ideaCount: 27,
    avgInvestment: "₹25L",
    difficulty: "Easy",
    marketGrowth: "9.8%",
    popularTags: ["Digital Marketing", "Ad Tech", "Branding", "Analytics"],
    featured: false,
  },
  {
    id: "finance-fintech",
    name: "Finance & FinTech",
    description: "Banking, payments, and financial technology solutions",
    icon: DollarSign,
    color: "from-emerald-500 to-green-600",
    ideaCount: 36,
    avgInvestment: "₹1.8Cr",
    difficulty: "Hard",
    marketGrowth: "19.2%",
    popularTags: ["Payments", "Banking", "Investment", "Insurance"],
    featured: true,
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Property tech, construction, and real estate services",
    icon: Building2,
    color: "from-amber-500 to-yellow-600",
    ideaCount: 24,
    avgInvestment: "₹3.2Cr",
    difficulty: "Hard",
    marketGrowth: "7.5%",
    popularTags: ["PropTech", "Construction", "Rental", "Property Management"],
    featured: false,
  },
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  const filteredCategories = useMemo(() => {
    let filtered = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.popularTags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (filterDifficulty !== "all") {
      filtered = filtered.filter(
        (category) => category.difficulty.toLowerCase() === filterDifficulty
      );
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "ideas":
          return b.ideaCount - a.ideaCount;
        case "investment":
          return a.avgInvestment.localeCompare(b.avgInvestment);
        case "growth":
          return parseFloat(b.marketGrowth) - parseFloat(a.marketGrowth);
        default:
          return 0;
      }
    });
  }, [searchTerm, sortBy, filterDifficulty]);

  const featuredCategories = categories.filter((cat) => cat.featured);

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#B8860B] to-[#2D3748] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Business Categories
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Explore diverse business opportunities across multiple industries.
              Find the perfect category that matches your interests and
              expertise.
            </p>

            {/* Breadcrumbs */}
            <nav className="flex items-center justify-center space-x-2 text-white/80 mb-8">
              <Link href="/" className="hover:text-[#B8860B] transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Categories</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#2D3748] mb-4">
              Featured Categories
            </h2>
            <p className="text-[#2D3748]/70 max-w-2xl mx-auto">
              Discover the most promising business categories with high growth
              potential
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-[#B8860B]/20 hover:border-[#B8860B]/40 bg-gradient-to-br from-white to-[#B8860B]/5">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-[#2D3748] group-hover:text-[#B8860B] transition-colors">
                          {category.name}
                        </CardTitle>
                        <Badge className="bg-[#B8860B]/15 text-[#2D3748] border-[#B8860B]/30 font-semibold">
                          {category.ideaCount} Ideas
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#2D3748]/70 mb-4">
                      {category.description}
                    </CardDescription>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#2D3748]/60">
                          Avg Investment
                        </span>
                        <span className="font-semibold text-[#2D3748]">
                          {category.avgInvestment}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#2D3748]/60">
                          Market Growth
                        </span>
                        <span className="font-semibold text-green-600">
                          {category.marketGrowth}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#2D3748]/60">
                          Difficulty
                        </span>
                        <Badge
                          className={`${
                            category.difficulty === "Easy"
                              ? "bg-green-100 text-green-700"
                              : category.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {category.difficulty}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#B8860B]/20">
                      <div className="flex flex-wrap gap-2">
                        {category.popularTags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs border-[#B8860B]/30 text-[#2D3748]/70"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full mt-4 bg-[#B8860B] hover:bg-[#2D3748] text-white hover:text-white font-semibold"
                    >
                      <Link href={`/categories/${category.id}`}>
                        Explore Ideas
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Categories Section */}
      <section className="py-16 bg-[#FCFCFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-[#2D3748] mb-4">
              All Categories
            </h2>

            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2D3748]/50 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#B8860B]/30 rounded-lg focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B] bg-white"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-[#B8860B]/30 rounded-lg focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B] bg-white"
                >
                  <option value="name">Sort by Name</option>
                  <option value="ideas">Sort by Ideas</option>
                  <option value="investment">Sort by Investment</option>
                  <option value="growth">Sort by Growth</option>
                </select>

                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="px-4 py-3 border border-[#B8860B]/30 rounded-lg focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B] bg-white"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>

                <div className="flex border border-[#B8860B]/30 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 ${
                      viewMode === "grid"
                        ? "bg-[#B8860B] text-white"
                        : "bg-white text-[#2D3748] hover:bg-[#B8860B]/10"
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 ${
                      viewMode === "list"
                        ? "bg-[#B8860B] text-white"
                        : "bg-white text-[#2D3748] hover:bg-[#B8860B]/10"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Categories Grid */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.05 }}
              >
                <Card
                  className={`group hover:shadow-xl transition-all duration-300 border-[#B8860B]/20 hover:border-[#B8860B]/40 bg-gradient-to-br from-white to-[#B8860B]/5 ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <CardHeader
                    className={viewMode === "list" ? "flex-shrink-0 w-48" : ""}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-[#2D3748] group-hover:text-[#B8860B] transition-colors">
                          {category.name}
                        </CardTitle>
                        <Badge className="bg-[#B8860B]/15 text-[#2D3748] border-[#B8860B]/30 font-semibold">
                          {category.ideaCount} Ideas
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className={viewMode === "list" ? "flex-1" : ""}>
                    <CardDescription className="text-[#2D3748]/70 mb-4">
                      {category.description}
                    </CardDescription>

                    <div
                      className={`space-y-3 ${
                        viewMode === "list" ? "grid grid-cols-3 gap-4" : ""
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#2D3748]/60">
                          Avg Investment
                        </span>
                        <span className="font-semibold text-[#2D3748]">
                          {category.avgInvestment}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#2D3748]/60">
                          Market Growth
                        </span>
                        <span className="font-semibold text-green-600">
                          {category.marketGrowth}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#2D3748]/60">
                          Difficulty
                        </span>
                        <Badge
                          className={`${
                            category.difficulty === "Easy"
                              ? "bg-green-100 text-green-700"
                              : category.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {category.difficulty}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#B8860B]/20">
                      <div className="flex flex-wrap gap-2">
                        {category.popularTags.slice(0, 4).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs border-[#B8860B]/30 text-[#2D3748]/70"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full mt-4 bg-[#B8860B] hover:bg-[#2D3748] text-white hover:text-white font-semibold"
                    >
                      <Link href={`/categories/${category.id}`}>
                        Explore Ideas
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search className="w-16 h-16 text-[#2D3748]/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#2D3748] mb-2">
                No categories found
              </h3>
              <p className="text-[#2D3748]/70">
                Try adjusting your search terms or filters
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}


