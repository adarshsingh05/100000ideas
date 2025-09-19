"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Lock,
  Upload,
  Plus,
  Save,
  X,
  Lightbulb,
  FileText,
  Tag,
  DollarSign,
  Users,
  Calendar,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { ideasService } from "@/lib/ideasService";

// Constants matching community form
const categories = [
  "Technology",
  "Healthcare",
  "Education",
  "Finance",
  "E-commerce",
  "Food & Beverage",
  "Travel & Tourism",
  "Real Estate",
  "Entertainment",
  "Fashion",
  "Sports",
  "Automotive",
  "Agriculture",
  "Energy",
  "Manufacturing",
  "Other",
];

const investmentRanges = [
  "Under ₹1 Lakh",
  "₹1-5 Lakhs",
  "₹5-10 Lakhs",
  "₹10-25 Lakhs",
  "₹25-50 Lakhs",
  "₹50 Lakhs - 1 Crore",
  "Above ₹1 Crore",
];

const timeToStartOptions = [
  "Immediately",
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "1-2 years",
  "More than 2 years",
];

const businessModels = [
  "B2B (Business to Business)",
  "B2C (Business to Consumer)",
  "B2B2C (Business to Business to Consumer)",
  "C2C (Consumer to Consumer)",
  "Subscription",
  "Freemium",
  "Marketplace",
  "SaaS (Software as a Service)",
  "E-commerce",
  "Other",
];

const marketSizes = [
  "Local (City/Town)",
  "Regional (State/Province)",
  "National",
  "International",
  "Global",
];

export default function AdminPage() {
  const router = useRouter();
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form states for idea upload - matching community form structure
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    investmentRange: "",
    timeToStart: "",
    targetAudience: "",
    keyFeatures: [""],
    businessModel: "",
    revenueStreams: [""],
    competitiveAdvantage: "",
    challenges: "",
    marketSize: "",
    requiredSkills: [""],
    contactInfo: {
      email: "admin@1000ideas.com",
      phone: "",
    },
    imageUrl: "",
    tags: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [uploadedIdeas, setUploadedIdeas] = useState([]);

  // Check if already authenticated
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      fetchUploadedIdeas();
    }
  }, []);

  // Fetch uploaded ideas when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchUploadedIdeas();
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate password check
    if (password === "1234") {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      localStorage.setItem("adminAuth", "true");
    } else {
      setError("Invalid password. Please try again.");
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    setShowPasswordModal(true);
    setPassword("");
  };

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      // Filter out empty array items
      const filteredData = {
        ...formData,
        keyFeatures: formData.keyFeatures.filter((item) => item.trim() !== ""),
        revenueStreams: formData.revenueStreams.filter(
          (item) => item.trim() !== ""
        ),
        requiredSkills: formData.requiredSkills.filter(
          (item) => item.trim() !== ""
        ),
        tags: formData.tags.filter((item) => item.trim() !== ""),
        uploadedBy: "admin",
        uploadedByEmail: "admin@1000ideas.com",
        uploadedByName: "Admin",
        isAdmin: true, // Mark as admin idea
        source: "admin", // Mark source as admin
      };

      console.log("Sending admin idea data:", filteredData);
      const response = await ideasService.createIdea(filteredData);
      console.log("Admin idea creation response:", response);

      if (response.success) {
        setMessage({ type: "success", text: "Idea uploaded successfully!" });

        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "",
          investmentRange: "",
          timeToStart: "",
          targetAudience: "",
          keyFeatures: [""],
          businessModel: "",
          revenueStreams: [""],
          competitiveAdvantage: "",
          challenges: "",
          marketSize: "",
          requiredSkills: [""],
          contactInfo: {
            email: "admin@1000ideas.com",
            phone: "",
          },
          imageUrl: "",
          tags: [],
        });

        // Fetch updated ideas list
        fetchUploadedIdeas();
      } else {
        throw new Error(response.message || "Failed to upload idea");
      }
    } catch (error) {
      console.error("Error uploading idea:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to upload idea. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUploadedIdeas = async () => {
    try {
      const response = await ideasService.getAllIdeas(1, 50);
      if (response.success) {
        console.log("All ideas:", response.ideas);
        // Filter only admin ideas - check both isAdmin and source fields
        const adminIdeas = response.ideas.filter(
          (idea) =>
            idea.isAdmin === true ||
            idea.source === "admin" ||
            idea.uploadedByName === "Admin"
        );
        console.log("Admin ideas found:", adminIdeas);
        setUploadedIdeas(adminIdeas);
      }
    } catch (error) {
      console.error("Error fetching uploaded ideas:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white border border-gray-200 shadow-xl">
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#FDCC29] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#2D3748]" />
              </div>
              <h1 className="text-2xl font-bold text-[#2D3748] mb-2">
                Admin Access
              </h1>
              <p className="text-[#2D3748]/60">
                Enter admin password to continue
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="password"
                  className="text-[#2D3748] font-medium"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
                  required
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FDCC29] hover:bg-[#FDCC29]/90 text-[#2D3748] font-semibold py-2"
              >
                {isLoading ? "Verifying..." : "Access Admin Panel"}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFCFC] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#FDCC29] rounded-full flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-[#2D3748]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#2D3748]">
                  Admin Panel
                </h1>
                <p className="text-[#2D3748]/60">
                  Upload static/migrated ideas
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Upload Form - Matching Community Modal Structure */}
        <Card className="bg-white border border-gray-200 shadow-lg">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Upload className="w-6 h-6 text-[#FDCC29]" />
              <h2 className="text-xl font-semibold text-[#2D3748]">
                Upload New Admin Idea
              </h2>
            </div>

            {/* Toast Messages */}
            {message.type === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-green-800 font-medium">{message.text}</p>
              </div>
            )}

            {message.type === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                <p className="text-red-800 font-medium">{message.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="title"
                      className="text-sm font-medium text-gray-700"
                    >
                      Idea Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Enter a compelling title for your idea"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="category"
                      className="text-sm font-medium text-gray-700"
                    >
                      Category *
                    </Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700"
                  >
                    Description *
                  </Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe your idea in detail..."
                    rows={4}
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B]"
                    required
                  />
                </div>
              </div>

              {/* Business Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Business Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="investmentRange"
                      className="text-sm font-medium text-gray-700"
                    >
                      Investment Range *
                    </Label>
                    <select
                      id="investmentRange"
                      value={formData.investmentRange}
                      onChange={(e) =>
                        handleInputChange("investmentRange", e.target.value)
                      }
                      className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
                      required
                    >
                      <option value="">Select investment range</option>
                      {investmentRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label
                      htmlFor="timeToStart"
                      className="text-sm font-medium text-gray-700"
                    >
                      Time to Start *
                    </Label>
                    <select
                      id="timeToStart"
                      value={formData.timeToStart}
                      onChange={(e) =>
                        handleInputChange("timeToStart", e.target.value)
                      }
                      className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
                      required
                    >
                      <option value="">Select time to start</option>
                      {timeToStartOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="targetAudience"
                    className="text-sm font-medium text-gray-700"
                  >
                    Target Audience *
                  </Label>
                  <Input
                    id="targetAudience"
                    value={formData.targetAudience}
                    onChange={(e) =>
                      handleInputChange("targetAudience", e.target.value)
                    }
                    placeholder="Who is your target audience?"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="businessModel"
                    className="text-sm font-medium text-gray-700"
                  >
                    Business Model *
                  </Label>
                  <select
                    id="businessModel"
                    value={formData.businessModel}
                    onChange={(e) =>
                      handleInputChange("businessModel", e.target.value)
                    }
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B]"
                    required
                  >
                    <option value="">Select business model</option>
                    {businessModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label
                    htmlFor="marketSize"
                    className="text-sm font-medium text-gray-700"
                  >
                    Market Size *
                  </Label>
                  <select
                    id="marketSize"
                    value={formData.marketSize}
                    onChange={(e) =>
                      handleInputChange("marketSize", e.target.value)
                    }
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B]"
                    required
                  >
                    <option value="">Select market size</option>
                    {marketSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Key Features
                </h3>

                {formData.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) =>
                        handleArrayChange("keyFeatures", index, e.target.value)
                      }
                      placeholder={`Key feature ${index + 1}`}
                      className="flex-1"
                    />
                    {formData.keyFeatures.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem("keyFeatures", index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("keyFeatures")}
                  className="text-[#FDCC29] border-[#FDCC29] hover:bg-[#FDCC29]/10"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Feature
                </Button>
              </div>

              {/* Revenue Streams */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Revenue Streams
                </h3>

                {formData.revenueStreams.map((stream, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={stream}
                      onChange={(e) =>
                        handleArrayChange(
                          "revenueStreams",
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Revenue stream ${index + 1}`}
                      className="flex-1"
                    />
                    {formData.revenueStreams.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem("revenueStreams", index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("revenueStreams")}
                  className="text-[#FDCC29] border-[#FDCC29] hover:bg-[#FDCC29]/10"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Revenue Stream
                </Button>
              </div>

              {/* Required Skills */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Required Skills
                </h3>

                {formData.requiredSkills.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={skill}
                      onChange={(e) =>
                        handleArrayChange(
                          "requiredSkills",
                          index,
                          e.target.value
                        )
                      }
                      placeholder={`Required skill ${index + 1}`}
                      className="flex-1"
                    />
                    {formData.requiredSkills.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem("requiredSkills", index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("requiredSkills")}
                  className="text-[#FDCC29] border-[#FDCC29] hover:bg-[#FDCC29]/10"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Skill
                </Button>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Additional Information
                </h3>

                <div>
                  <Label
                    htmlFor="competitiveAdvantage"
                    className="text-sm font-medium text-gray-700"
                  >
                    Competitive Advantage *
                  </Label>
                  <textarea
                    id="competitiveAdvantage"
                    value={formData.competitiveAdvantage}
                    onChange={(e) =>
                      handleInputChange("competitiveAdvantage", e.target.value)
                    }
                    placeholder="What makes your idea unique?"
                    rows={3}
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B]"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="challenges"
                    className="text-sm font-medium text-gray-700"
                  >
                    Potential Challenges *
                  </Label>
                  <textarea
                    id="challenges"
                    value={formData.challenges}
                    onChange={(e) =>
                      handleInputChange("challenges", e.target.value)
                    }
                    placeholder="What challenges do you anticipate?"
                    rows={3}
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B]"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="imageUrl"
                    className="text-sm font-medium text-gray-700"
                  >
                    Image URL (Optional)
                  </Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      handleInputChange("imageUrl", e.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="contactEmail"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email *
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactInfo.email}
                      onChange={(e) =>
                        handleInputChange("contactInfo.email", e.target.value)
                      }
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="contactPhone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone (Optional)
                    </Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactInfo.phone}
                      onChange={(e) =>
                        handleInputChange("contactInfo.phone", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setFormData({
                      title: "",
                      description: "",
                      category: "",
                      investmentRange: "",
                      timeToStart: "",
                      targetAudience: "",
                      keyFeatures: [""],
                      businessModel: "",
                      revenueStreams: [""],
                      competitiveAdvantage: "",
                      challenges: "",
                      marketSize: "",
                      requiredSkills: [""],
                      contactInfo: {
                        email: "admin@1000ideas.com",
                        phone: "",
                      },
                      imageUrl: "",
                      tags: [],
                    })
                  }
                  disabled={loading}
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Form
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#FDCC29] hover:bg-[#FDCC29]/90 text-[#2D3748]"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#2D3748] mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Idea
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </Card>

        {/* Uploaded Ideas Section */}
        <Card className="bg-white border border-gray-200 shadow-lg mt-6">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Lightbulb className="w-6 h-6 text-[#FDCC29]" />
              <h2 className="text-xl font-semibold text-[#2D3748]">
                Uploaded Admin Ideas ({uploadedIdeas.length})
              </h2>
            </div>

            {uploadedIdeas.length === 0 ? (
              <div className="text-center py-8">
                <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No admin ideas uploaded yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedIdeas.map((idea) => (
                  <Card
                    key={idea._id}
                    className="border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                          {idea.title}
                        </h3>
                        <span className="text-xs bg-[#FDCC29] text-[#2D3748] px-2 py-1 rounded-full">
                          Admin
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {idea.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {idea.category}
                        </span>
                        <span>
                          {new Date(idea.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
