"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Lightbulb,
  Eye,
  EyeOff,
  Calendar,
  DollarSign,
  Users,
  Tag,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { ideasService } from "@/lib/ideasService";

// Constants matching the admin form
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

export default function AdminIdeaManager() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingIdea, setEditingIdea] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

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
      email: "admin@ideaforge.com",
      phone: "",
    },
    imageUrl: "",
    tags: [],
    isActive: true,
    isFeatured: false,
  });

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const response = await ideasService.getAllIdeas(1, 100);
      if (response.success) {
        // Filter only admin ideas
        const adminIdeas = response.ideas.filter(
          (idea) =>
            idea.isAdmin === true ||
            idea.source === "admin" ||
            idea.uploadedByName === "Admin"
        );
        setIdeas(adminIdeas);
      }
    } catch (error) {
      console.error("Error fetching ideas:", error);
      setMessage({ type: "error", text: "Failed to fetch ideas" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

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
        uploadedByEmail: "admin@ideaforge.com",
        uploadedByName: "Admin",
        isAdmin: true,
        source: "admin",
      };

      if (editingIdea) {
        // Update existing idea
        const response = await ideasService.updateIdea(
          editingIdea._id,
          filteredData
        );
        if (response.success) {
          setMessage({ type: "success", text: "Idea updated successfully" });
          await fetchIdeas();
          resetForm();
        } else {
          setMessage({
            type: "error",
            text: response.error || "Failed to update idea",
          });
        }
      } else {
        // Create new idea
        const response = await ideasService.createIdea(filteredData);
        if (response.success) {
          setMessage({ type: "success", text: "Idea created successfully" });
          await fetchIdeas();
          resetForm();
        } else {
          setMessage({
            type: "error",
            text: response.error || "Failed to create idea",
          });
        }
      }
    } catch (error) {
      console.error("Error saving idea:", error);
      setMessage({ type: "error", text: "Failed to save idea" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (idea) => {
    setEditingIdea(idea);
    setFormData({
      title: idea.title || "",
      description: idea.description || "",
      category: idea.category || "",
      investmentRange: idea.investmentRange || "",
      timeToStart: idea.timeToStart || "",
      targetAudience: idea.targetAudience || "",
      keyFeatures:
        idea.keyFeatures && idea.keyFeatures.length > 0
          ? idea.keyFeatures
          : [""],
      businessModel: idea.businessModel || "",
      revenueStreams:
        idea.revenueStreams && idea.revenueStreams.length > 0
          ? idea.revenueStreams
          : [""],
      competitiveAdvantage: idea.competitiveAdvantage || "",
      challenges: idea.challenges || "",
      marketSize: idea.marketSize || "",
      requiredSkills:
        idea.requiredSkills && idea.requiredSkills.length > 0
          ? idea.requiredSkills
          : [""],
      contactInfo: {
        email: idea.contactInfo?.email || "admin@ideaforge.com",
        phone: idea.contactInfo?.phone || "",
      },
      imageUrl: idea.imageUrl || "",
      tags: idea.tags && idea.tags.length > 0 ? idea.tags : [],
      isActive: idea.isActive !== undefined ? idea.isActive : true,
      isFeatured: idea.isFeatured || false,
    });
    setShowForm(true);
  };

  const handleDelete = async (ideaId) => {
    if (!confirm("Are you sure you want to delete this idea?")) return;

    try {
      setLoading(true);
      const response = await ideasService.deleteIdea(ideaId);
      if (response.success) {
        setMessage({ type: "success", text: "Idea deleted successfully" });
        await fetchIdeas();
      } else {
        setMessage({
          type: "error",
          text: response.error || "Failed to delete idea",
        });
      }
    } catch (error) {
      console.error("Error deleting idea:", error);
      setMessage({ type: "error", text: "Failed to delete idea" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
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
        email: "admin@ideaforge.com",
        phone: "",
      },
      imageUrl: "",
      tags: [],
      isActive: true,
      isFeatured: false,
    });
    setEditingIdea(null);
    setShowForm(false);
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

  // Auto-hide message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message.text]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-700">Idea Management</h2>
          <p className="text-gray-600">
            Manage business ideas for the platform
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-emerald-600 hover:bg-emerald-600/90 text-slate-800 px-6 py-2"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Idea
        </Button>
      </div>

      {/* Message */}
      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {editingIdea ? "Edit Idea" : "Create New Idea"}
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
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
                      className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
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
                  className="text-emerald-500 border-[#FDCC29] hover:bg-emerald-600/10"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Feature
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
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
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
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
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

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        handleInputChange("isActive", e.target.checked)
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Active</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        handleInputChange("isFeatured", e.target.checked)
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Featured</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-slate-800 hover:bg-slate-800/90 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading
                    ? "Saving..."
                    : editingIdea
                    ? "Update Idea"
                    : "Create Idea"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Ideas List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-700">
          Current Ideas ({ideas.length})
        </h3>

        {loading ? (
          <div className="text-center py-8">Loading ideas...</div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No ideas found. Create your first idea above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ideas.map((idea) => (
              <Card key={idea._id} className="relative">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg line-clamp-2">
                      {idea.title}
                    </CardTitle>
                    <div className="flex items-center space-x-1">
                      {idea.isActive ? (
                        <Eye className="w-4 h-4 text-green-500" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      )}
                      {idea.isFeatured && (
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {idea.description}
                  </p>

                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Tag className="w-3 h-3" />
                      <span>{idea.category}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-3 h-3" />
                      <span>{idea.investmentRange}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{idea.timeToStart}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{idea.targetAudience}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(idea.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(idea)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(idea._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
