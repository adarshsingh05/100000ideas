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
  Image as ImageIcon,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { bannerService } from "@/lib/bannerService";

export default function AdminBannerManager() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    buttonText: "",
    redirectUrl: "",
    backgroundImage: "",
    isActive: true,
    displayOrder: 0,
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await bannerService.getAllBanners();
      if (response.success) {
        setBanners(response.data.banners);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      setMessage({ type: "error", text: "Failed to fetch banners" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (editingBanner) {
        // Update existing banner
        const response = await bannerService.updateBanner(
          editingBanner._id,
          formData
        );
        if (response.success) {
          setMessage({ type: "success", text: "Banner updated successfully" });
          await fetchBanners();
          resetForm();
        } else {
          setMessage({
            type: "error",
            text: response.error || "Failed to update banner",
          });
        }
      } else {
        // Create new banner
        const response = await bannerService.createBanner(formData);
        if (response.success) {
          setMessage({ type: "success", text: "Banner created successfully" });
          await fetchBanners();
          resetForm();
        } else {
          setMessage({
            type: "error",
            text: response.error || "Failed to create banner",
          });
        }
      }
    } catch (error) {
      console.error("Error saving banner:", error);
      setMessage({ type: "error", text: "Failed to save banner" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      description: banner.description,
      buttonText: banner.buttonText,
      redirectUrl: banner.redirectUrl,
      backgroundImage: banner.backgroundImage || "",
      isActive: banner.isActive,
      displayOrder: banner.displayOrder,
    });
    setShowForm(true);
  };

  const handleDelete = async (bannerId) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    try {
      setLoading(true);
      const response = await bannerService.deleteBanner(bannerId);
      if (response.success) {
        setMessage({ type: "success", text: "Banner deleted successfully" });
        await fetchBanners();
      } else {
        setMessage({
          type: "error",
          text: response.error || "Failed to delete banner",
        });
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      setMessage({ type: "error", text: "Failed to delete banner" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      buttonText: "",
      redirectUrl: "",
      backgroundImage: "",
      isActive: true,
      displayOrder: 0,
    });
    setEditingBanner(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
          <h2 className="text-2xl font-bold text-[#2D3748]">
            Banner Management
          </h2>
          <p className="text-gray-600">
            Manage promotional banners for the homepage
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-[#FDCC29] hover:bg-[#FDCC29]/90 text-[#061F59] px-6 py-2"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Banner
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
              {editingBanner ? "Edit Banner" : "Create New Banner"}
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title (Max 10 words)</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter banner title"
                    maxLength={50}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {
                      formData.title
                        .split(/\s+/)
                        .filter((word) => word.length > 0).length
                    }
                    /10 words
                  </p>
                </div>

                <div>
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleInputChange}
                    placeholder="e.g., Get Started"
                    maxLength={30}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="redirectUrl">Redirect URL</Label>
                  <Input
                    id="redirectUrl"
                    name="redirectUrl"
                    value={formData.redirectUrl}
                    onChange={handleInputChange}
                    placeholder="e.g., /ideas"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="displayOrder">Display Order</Label>
                  <Input
                    id="displayOrder"
                    name="displayOrder"
                    type="number"
                    value={formData.displayOrder}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter banner description"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDCC29] focus:border-transparent"
                  rows={3}
                  maxLength={200}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/200 characters
                </p>
              </div>

              <div>
                <Label htmlFor="backgroundImage">
                  Background Image URL (Optional)
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="backgroundImage"
                    name="backgroundImage"
                    value={formData.backgroundImage}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button type="button" variant="outline" className="px-3">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to use default blue gradient
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Active</span>
                </label>
              </div>

              <div className="flex space-x-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#061F59] hover:bg-[#061F59]/90 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading
                    ? "Saving..."
                    : editingBanner
                    ? "Update Banner"
                    : "Create Banner"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Banners List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#2D3748]">
          Current Banners
        </h3>

        {loading ? (
          <div className="text-center py-8">Loading banners...</div>
        ) : banners.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No banners found. Create your first banner above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {banners.map((banner) => (
              <Card key={banner._id} className="relative">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{banner.title}</CardTitle>
                    <div className="flex items-center space-x-1">
                      {banner.isActive ? (
                        <Eye className="w-4 h-4 text-green-500" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {banner.description}
                  </p>

                  <div className="space-y-2 text-xs text-gray-500">
                    <div>Button: {banner.buttonText}</div>
                    <div>URL: {banner.redirectUrl}</div>
                    <div>Order: {banner.displayOrder}</div>
                    {banner.backgroundImage && (
                      <div className="truncate">
                        Image: {banner.backgroundImage}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(banner)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(banner._id)}
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
