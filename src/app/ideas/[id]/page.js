"use client";

import { useState, use } from "react";
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
} from "lucide-react";

import detailedBusinessIdeas from "@/data/detailedBusinessIdeas.json";

export default function IdeaDetailPage({ params }) {
  const [activeTab, setActiveTab] = useState("overview");
  const resolvedParams = use(params);

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

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "market", label: "Market Analysis" },
    { id: "investment", label: "Investment" },
    { id: "funding", label: "Funding" },
    { id: "business-model", label: "Business Model" },
    { id: "skills", label: "Skills Required" },
  ];

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
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
                    <Star className="w-6 h-6 sm:w-7 sm:h-7 text-[#B8860B] mx-auto mb-2" />
                    <p className="text-sm text-[#2D3748] font-medium mb-1">
                      Rating
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-[#2D3748]">
                      ⭐{idea.rating}/5
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
