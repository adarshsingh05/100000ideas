"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ideasService } from "@/lib/ideasService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  X,
  Plus,
  Trash2,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

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

export default function IdeaUploadModal({
  isOpen,
  onClose,
  onIdeaCreated,
  user,
  editIdea = null,
  isEdit = false,
}) {
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
      email: user?.email || "",
      phone: "",
    },
    imageUrl: "",
    tags: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Populate form data when editing
  useEffect(() => {
    if (isEdit && editIdea) {
      setFormData({
        title: editIdea.title || "",
        description: editIdea.description || "",
        category: editIdea.category || "",
        investmentRange: editIdea.investmentRange || "",
        timeToStart: editIdea.timeToStart || "",
        targetAudience: editIdea.targetAudience || "",
        keyFeatures:
          editIdea.keyFeatures?.length > 0 ? editIdea.keyFeatures : [""],
        businessModel: editIdea.businessModel || "",
        revenueStreams:
          editIdea.revenueStreams?.length > 0 ? editIdea.revenueStreams : [""],
        competitiveAdvantage: editIdea.competitiveAdvantage || "",
        challenges: editIdea.challenges || "",
        marketSize: editIdea.marketSize || "",
        requiredSkills:
          editIdea.requiredSkills?.length > 0 ? editIdea.requiredSkills : [""],
        contactInfo: {
          email: editIdea.contactInfo?.email || user?.email || "",
          phone: editIdea.contactInfo?.phone || "",
        },
        imageUrl: editIdea.imageUrl || "",
        tags: editIdea.tags || [],
      });
    } else {
      // Reset form for new idea
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
          email: user?.email || "",
          phone: "",
        },
        imageUrl: "",
        tags: [],
      });
    }
  }, [isEdit, editIdea, user?.email]);

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

    if (!user?.id && !user?._id) {
      setMessage({ type: "error", text: "User not authenticated" });
      return;
    }

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
        uploadedBy: user?.id || user?._id,
        uploadedByEmail: user?.email,
        uploadedByName: user?.name,
      };

      let response;
      if (isEdit && editIdea) {
        response = await ideasService.updateIdea(editIdea._id, filteredData);
      } else {
        response = await ideasService.createIdea(filteredData);
      }

      if (response.success) {
        onIdeaCreated(response.idea);

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
            email: user?.email || "",
            phone: "",
          },
          imageUrl: "",
          tags: [],
        });
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <Upload className="w-6 h-6 mr-2 text-[#B8860B]" />
            {isEdit ? "Edit Idea" : "Upload New Idea"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update your business idea details below."
              : "Share your innovative business idea with the community. Fill in all the details to make it compelling."}
          </DialogDescription>
        </DialogHeader>

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
                  onChange={(e) => handleInputChange("title", e.target.value)}
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
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B]"
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
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B]"
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
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B]"
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
              className="text-[#B8860B] border-[#B8860B] hover:bg-[#B8860B]/10"
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
                    handleArrayChange("revenueStreams", index, e.target.value)
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
              className="text-[#B8860B] border-[#B8860B] hover:bg-[#B8860B]/10"
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
                    handleArrayChange("requiredSkills", index, e.target.value)
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
              className="text-[#B8860B] border-[#B8860B] hover:bg-[#B8860B]/10"
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
                onChange={(e) => handleInputChange("imageUrl", e.target.value)}
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
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-white"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEdit ? "Updating..." : "Uploading..."}
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  {isEdit ? "Update Idea" : "Upload Idea"}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
