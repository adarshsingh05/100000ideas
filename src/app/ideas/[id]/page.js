"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-[#0A0F1F]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-[#A0AEC0] mb-6">
          <div className="flex items-center">
            <Home className="w-4 h-4 mr-1" />
            <span>Home</span>
          </div>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span>Business Ideas</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white">{idea.title}</span>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#10B981] rounded-2xl flex items-center justify-center shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-light text-white mb-2 tracking-tight">
                      {idea.title}
                    </h1>
                    <div className="flex items-center space-x-3">
                      {idea.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30 font-light tracking-wide"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
                    <p className="text-xs text-[#A0AEC0] font-light mb-1">
                      Investment Required
                    </p>
                    <p className="text-lg font-light text-white">
                      {idea.investment}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
                    <p className="text-xs text-[#A0AEC0] font-light mb-1">
                      Market Growth
                    </p>
                    <p className="text-sm font-light text-white">
                      {idea.marketAnalysis?.growthRate || "Growing Market"}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
                    <p className="text-xs text-[#A0AEC0] font-light mb-1">
                      Time to Market
                    </p>
                    <p className="text-sm font-light text-white">
                      {idea.timeToMarket}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <Star className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
                    <p className="text-xs text-[#A0AEC0] font-light mb-1">
                      Rating
                    </p>
                    <p className="text-sm font-light text-white">
                      ⭐{idea.rating}/5
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button className="bg-[#10B981] hover:bg-[#059669] text-white px-6 py-3 rounded-xl font-light tracking-wide shadow-lg">
                  <Download className="w-4 h-4 mr-2" />
                  Download Detailed Report & Business Plan
                </Button>
                <Button
                  variant="outline"
                  className="border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/20 hover:text-white hover:border-[#10B981] px-6 py-3 rounded-xl font-light tracking-wide transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask Expert
                </Button>
                <Button
                  variant="outline"
                  className="border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/20 hover:text-white hover:border-[#10B981] px-6 py-3 rounded-xl font-light tracking-wide transition-all duration-300"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-[#10B981]/20 mb-8">
                <nav className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-light tracking-wide transition-colors ${
                        activeTab === tab.id
                          ? "border-[#10B981] text-[#10B981]"
                          : "border-transparent text-[#A0AEC0] hover:text-white"
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
                    <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white font-light tracking-wide">
                          Business Description
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#A0AEC0] font-light tracking-wide leading-relaxed text-lg">
                          {idea.detailedDescription}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Implementation Plan */}
                    <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white font-light tracking-wide">
                          Implementation Plan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {Object.entries(idea.implementation || {}).map(
                          ([phase, description], index) => (
                            <div
                              key={index}
                              className="p-4 bg-[#1E40AF]/5 rounded-lg"
                            >
                              <h4 className="text-white font-medium tracking-wide mb-2 capitalize">
                                {phase.replace(/([A-Z])/g, " $1").trim()}
                              </h4>
                              <p className="text-[#A0AEC0] font-light tracking-wide leading-relaxed">
                                {description}
                              </p>
                            </div>
                          )
                        )}
                      </CardContent>
                    </Card>

                    {/* Success Factors */}
                    <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white font-light tracking-wide">
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
                              <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                              <p className="text-[#A0AEC0] font-light tracking-wide">
                                {factor}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Challenges */}
                    <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white font-light tracking-wide flex items-center">
                          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
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
                              <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                              <p className="text-[#A0AEC0] font-light tracking-wide">
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
                      <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-white font-light tracking-wide flex items-center">
                            <BarChart3 className="w-5 h-5 text-[#10B981] mr-2" />
                            Market Size
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-medium text-[#10B981] mb-2">
                            {idea.marketAnalysis?.marketSize ||
                              "Market Data Available"}
                          </p>
                          <p className="text-[#A0AEC0] font-light tracking-wide">
                            {idea.marketAnalysis?.growthRate ||
                              "Growing Market"}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-white font-light tracking-wide flex items-center">
                            <Target className="w-5 h-5 text-[#10B981] mr-2" />
                            Target Audience
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-[#A0AEC0] font-light tracking-wide leading-relaxed">
                            {idea.marketAnalysis?.targetAudience ||
                              "General market"}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Competition Analysis */}
                    <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white font-light tracking-wide flex items-center">
                          <Users className="w-5 h-5 text-[#10B981] mr-2" />
                          Competition Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="text-white font-light tracking-wide mb-2">
                            Competition Level
                          </h4>
                          <p className="text-[#A0AEC0] font-light tracking-wide leading-relaxed">
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
                    <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white font-light tracking-wide flex items-center">
                          <DollarSign className="w-5 h-5 text-[#10B981] mr-2" />
                          Total Investment Required
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-medium text-[#10B981] mb-4">
                          {idea.investment}
                        </p>
                        <p className="text-[#A0AEC0] font-light tracking-wide">
                          {idea.revenue}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Revenue Model */}
                    <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white font-light tracking-wide flex items-center">
                          <TrendingUp className="w-5 h-5 text-[#10B981] mr-2" />
                          Revenue Model
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(idea.revenueModel || {}).map(
                            ([type, description], index) => (
                              <div
                                key={index}
                                className="p-3 bg-[#1E40AF]/5 rounded-lg"
                              >
                                <h4 className="text-white font-medium tracking-wide mb-1 capitalize">
                                  {type.replace(/([A-Z])/g, " $1").trim()}
                                </h4>
                                <p className="text-[#A0AEC0] font-light tracking-wide">
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
                    <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white font-light tracking-wide flex items-center">
                          <Briefcase className="w-5 h-5 text-[#10B981] mr-2" />
                          Funding Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {Object.entries(idea.funding || {}).map(
                          ([type, amount], index) => (
                            <div
                              key={index}
                              className="p-4 bg-[#1E40AF]/5 rounded-lg"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-white font-medium tracking-wide capitalize">
                                  {type.replace(/([A-Z])/g, " $1").trim()}
                                </h4>
                                <span className="text-[#10B981] font-medium">
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
                    <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white font-light tracking-wide flex items-center">
                          <TrendingUp className="w-5 h-5 text-[#10B981] mr-2" />
                          Revenue Model
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(idea.revenueModel || {}).map(
                            ([type, description], index) => (
                              <div
                                key={index}
                                className="p-3 bg-[#1E40AF]/5 rounded-lg"
                              >
                                <h4 className="text-white font-medium tracking-wide mb-1 capitalize">
                                  {type.replace(/([A-Z])/g, " $1").trim()}
                                </h4>
                                <p className="text-[#A0AEC0] font-light tracking-wide">
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
                    <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white font-light tracking-wide flex items-center">
                          <Users className="w-5 h-5 text-[#10B981] mr-2" />
                          Team Requirements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {(idea.teamRequirements || []).map((role, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3 p-3 bg-[#1E40AF]/5 rounded-lg"
                            >
                              <User className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                              <p className="text-[#A0AEC0] font-light tracking-wide">
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
              <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white font-light tracking-wide">
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
                      className="w-full justify-start border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/20 hover:text-white hover:border-[#10B981] font-light tracking-wide transition-all duration-300"
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      {action}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Key Information */}
              <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white font-light tracking-wide">
                    Key Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-white font-light tracking-wide mb-2">
                      Category
                    </h4>
                    <p className="text-[#A0AEC0] font-light tracking-wide text-sm">
                      {idea.category}
                    </p>
                  </div>
                  <Separator className="bg-[#10B981]/20" />
                  <div>
                    <h4 className="text-white font-light tracking-wide mb-2">
                      Difficulty Level
                    </h4>
                    <p className="text-[#A0AEC0] font-light tracking-wide text-sm">
                      {idea.difficulty}
                    </p>
                  </div>
                  <Separator className="bg-[#10B981]/20" />
                  <div>
                    <h4 className="text-white font-light tracking-wide mb-2">
                      Time to Market
                    </h4>
                    <p className="text-[#A0AEC0] font-light tracking-wide text-sm">
                      {idea.timeToMarket}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Expert Guidance */}
              <Card className="bg-[#1E40AF]/10 border-[#10B981]/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white font-light tracking-wide">
                    Need Expert Guidance?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#A0AEC0] font-light tracking-wide leading-relaxed text-sm mb-4">
                    Get personalized advice from our business experts.
                  </p>
                  <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-light tracking-wide">
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
