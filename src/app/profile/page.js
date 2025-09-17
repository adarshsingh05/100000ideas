"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { profileService } from "@/lib/profileService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  User,
  Edit3,
  Save,
  X,
  Target,
  Heart,
  ShoppingBag,
  Mail,
  Phone,
  Calendar,
  MapPin,
  DollarSign,
  UserCircle,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Camera,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Activity,
  BarChart3,
  PieChart,
  Users,
  Star,
  Clock,
  Globe,
  Briefcase,
  GraduationCap,
  Home,
  Building,
  Zap,
  ShieldCheck,
  Crown,
  Sparkles,
} from "lucide-react";

export default function ProfilePage() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [toastProgress, setToastProgress] = useState(100);

  // Auto-dismiss toast notifications with progress bar
  useEffect(() => {
    if (message.text) {
      setToastProgress(100);

      const progressInterval = setInterval(() => {
        setToastProgress((prev) => {
          if (prev <= 0) {
            setMessage({ type: "", text: "" });
            return 100;
          }
          return prev - 2; // Decrease by 2% every 100ms (5 seconds total)
        });
      }, 100);

      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
        setToastProgress(100);
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [message.text]);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    annualIncome: "",
    caste: "",
    area: "",
    physicallyChallenged: "",
    profilePicture: null,
  });

  const [profileStats, setProfileStats] = useState({
    balanceIcoins: 0,
    savedIdeas: 0,
    purchased: 0,
    completionPercentage: 0,
  });

  // Redirect to login if not authenticated (only after loading is complete)
  useEffect(() => {
    console.log("Profile page auth check:", { loading, isAuthenticated, user });
    if (!loading && !isAuthenticated) {
      console.log("Redirecting to auth page");
      router.push("/auth");
      return;
    }
  }, [isAuthenticated, loading, router]);

  // Load user profile data
  useEffect(() => {
    const loadProfileData = async () => {
      const userId = user?.id || user?._id;
      if (!userId) return;

      setIsDataLoading(true);
      try {
        const response = await profileService.getProfile(userId);
        if (response.success) {
          setProfileData({
            name: response.profile.name || "",
            email: response.profile.email || "",
            phone: response.profile.phone || "",
            gender: response.profile.gender || "",
            age: response.profile.age || "",
            annualIncome: response.profile.annualIncome || "",
            caste: response.profile.caste || "",
            area: response.profile.area || "",
            physicallyChallenged: response.profile.physicallyChallenged || "",
            profilePicture: response.profile.profilePicture || null,
          });

          setProfileStats({
            balanceIcoins: response.profile.balanceIcoins || 0,
            savedIdeas: response.profile.savedIdeas || 0,
            purchased: response.profile.purchased || 0,
            completionPercentage: response.profile.completionPercentage || 0,
          });
        } else {
          // If no profile data exists, initialize with user data
          setProfileData({
            name: user.name || "",
            email: user.email || "",
            phone: "",
            gender: "",
            age: "",
            annualIncome: "",
            caste: "",
            area: "",
            physicallyChallenged: "",
            profilePicture: null,
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        // Initialize with user data as fallback
        setProfileData({
          name: user.name || "",
          email: user.email || "",
          phone: "",
          gender: "",
          age: "",
          annualIncome: "",
          caste: "",
          area: "",
          physicallyChallenged: "",
          profilePicture: null,
        });
      } finally {
        setIsDataLoading(false);
      }
    };

    // Only load profile data if user is authenticated and not loading
    const userId = user?.id || user?._id;
    console.log("Profile data loading check:", {
      loading,
      isAuthenticated,
      userId,
    });
    if (!loading && isAuthenticated && userId) {
      console.log("Loading profile data for user:", userId);
      loadProfileData();
    } else if (!loading && !isAuthenticated) {
      // If not authenticated and not loading, set data loading to false
      console.log("Not authenticated, stopping data loading");
      setIsDataLoading(false);
    }
  }, [isAuthenticated, user, loading]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const userId = user?.id || user?._id;
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const response = await profileService.updateProfile(userId, profileData);

      if (response.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);

        // Update local state with the response data
        setProfileData((prev) => ({
          ...prev,
          ...response.profile,
        }));

        // Refresh profile data from server
        setTimeout(async () => {
          try {
            const refreshedProfile = await profileService.getProfile(userId);
            if (refreshedProfile.success) {
              setProfileData(refreshedProfile.profile);
            }
          } catch (error) {
            console.error("Error refreshing profile:", error);
          }
        }, 500);
      } else {
        throw new Error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to original loaded data
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      gender: "",
      age: "",
      annualIncome: "",
      caste: "",
      area: "",
      physicallyChallenged: "",
      profilePicture: null,
    });
    setIsEditing(false);
    setMessage({ type: "", text: "" });
  };

  const handleLogout = () => {
    logout();
  };

  // Show loading state while checking authentication or loading data
  if (loading || isDataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#B8860B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#2D3748] text-lg font-medium">
              {loading
                ? "Checking authentication..."
                : "Loading your profile..."}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show redirect message if not authenticated (only after loading is complete)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-[#B8860B] mx-auto mb-4" />
            <p className="text-[#2D3748] text-lg font-medium">
              Redirecting to login...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <Navbar />

      {/* Toast Notification - Fixed Overlay */}
      {message.text && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4 ${
            message.type === "success"
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25"
              : "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25"
          } rounded-xl border border-white/20 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300`}
        >
          <div className="p-4 flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === "success" ? "bg-white/20" : "bg-white/20"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <AlertCircle className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">
                {message.type === "success" ? "Success!" : "Error!"}
              </p>
              <p className="text-white/90 text-sm">{message.text}</p>
            </div>
            <button
              onClick={() => {
                setMessage({ type: "", text: "" });
                setToastProgress(100);
              }}
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-xl overflow-hidden">
            <div
              className={`h-full transition-all duration-100 ease-linear ${
                message.type === "success" ? "bg-white/60" : "bg-white/60"
              }`}
              style={{ width: `${toastProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Professional Header Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D3748] via-[#1a202c] to-[#2D3748]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between"
          >
            {/* User Info Section */}
            <div className="flex items-center space-x-3 mb-3 lg:mb-0">
              {/* Profile Avatar */}
              <div className="relative group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#B8860B] to-[#D4AF37] rounded-lg flex items-center justify-center shadow-md border border-white/20">
                  <User className="w-6 h-6 text-white" />
                </div>
                {/* Completion Badge */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border border-white">
                  <span className="text-white text-xs font-medium">
                    {profileStats.completionPercentage}%
                  </span>
                </div>
              </div>

              {/* User Details */}
              <div>
                <div className="mb-1">
                  <h1 className="text-lg font-semibold text-white">
                    {profileData.name || user?.name || "User"}
                  </h1>
                </div>
                <p className="text-white/70 text-xs mb-1">
                  {profileData.email || user?.email || "user@example.com"}
                </p>

                {/* Status Badges */}
                <div className="flex items-center gap-1">
                  <Badge className="bg-[#B8860B]/20 text-[#B8860B] border-[#B8860B]/30 text-xs px-1.5 py-0.5">
                    Premium
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-1.5 py-0.5">
                    Active
                  </Badge>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors duration-200"
                >
                  <Edit3 className="w-3 h-3 mr-1" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-1">
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors duration-200 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                    ) : (
                      <Save className="w-3 h-3 mr-1" />
                    )}
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors duration-200"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Compact Stats Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="text-center mb-4">
            <h2 className="text-xl font-medium text-[#2D3748] mb-1">
              Welcome to the Dashboard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Balance Icoins Card */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 hover:shadow-md transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full -translate-y-6 translate-x-6"></div>
              <CardContent className="p-4 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-center flex-1">
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-gray-700 font-medium text-sm">
                        Balance Icoins
                      </p>
                      <h3 className="text-xl font-bold text-gray-800">
                        {profileStats.balanceIcoins.toLocaleString()}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-600 text-xs font-semibold">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12.5%
                    </div>
                    <span className="text-green-600 text-xs">This month</span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mb-2">
                  Available for purchases
                </p>
                <div className="flex items-center text-amber-600">
                  <Activity className="w-3 h-3 mr-1" />
                  <span className="text-xs font-medium">Active balance</span>
                </div>
              </CardContent>
            </Card>

            {/* Saved Ideas Card */}
            <Card className="bg-gradient-to-br from-[#B8860B]/10 to-[#D4AF37]/20 border border-[#B8860B]/30 hover:shadow-md transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-14 h-14 bg-gradient-to-br from-[#B8860B]/20 to-transparent rounded-full -translate-y-7 translate-x-7"></div>
              <CardContent className="p-4 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#B8860B] to-[#D4AF37] rounded-lg flex items-center justify-center shadow-md">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-center flex-1">
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-gray-700 font-medium text-sm">
                        Saved Ideas
                      </p>
                      <h3 className="text-xl font-bold text-[#2D3748]">
                        {profileStats.savedIdeas}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-[#B8860B] text-xs font-semibold">
                      <Star className="w-3 h-3 mr-1" />
                      +3
                    </div>
                    <span className="text-[#B8860B] text-xs">This week</span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mb-2">Your collection</p>
                <div className="flex items-center text-[#B8860B]">
                  <Sparkles className="w-3 h-3 mr-1" />
                  <span className="text-xs font-medium">
                    Growing collection
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Purchased Card */}
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-300 hover:shadow-md transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-gray-200/40 to-transparent rounded-full -translate-y-6 translate-x-6"></div>
              <CardContent className="p-4 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center shadow-md">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-center flex-1">
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-gray-700 font-medium text-sm">
                  Purchased
                </p>
                      <h3 className="text-xl font-bold text-[#2D3748]">
                        {profileStats.purchased.toString().padStart(2, "0")}
                      </h3>
          </div>
                      </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-600 text-xs font-semibold">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                      </div>
                    <span className="text-yellow-600 text-xs">Buyer</span>
                    </div>
                      </div>
                <p className="text-gray-500 text-xs mb-2">Total orders</p>
                <div className="flex items-center text-gray-600">
                  <Award className="w-3 h-3 mr-1" />
                  <span className="text-xs font-medium">Premium member</span>
                      </div>
                </CardContent>
              </Card>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Section - Profile Edit Form */}
          <div className="xl:col-span-3 space-y-4">
            {/* Professional Profile Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              {/* Personal Information Section */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                  <CardTitle className="text-base font-medium flex items-center">
                    <div className="w-6 h-6 bg-[#B8860B]/10 rounded-lg flex items-center justify-center mr-2">
                      <User className="w-4 h-4 text-[#B8860B]" />
                      </div>
                      Personal Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <Label className="text-gray-700 font-medium text-xs">
                        Full Name *
                      </Label>
                      {isEditing ? (
                          <Input
                            value={profileData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                          className="h-8 border border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded text-xs px-2 transition-colors duration-200"
                            placeholder="Enter your full name"
                          />
                      ) : (
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                          <span
                            className={`text-xs font-medium ${
                              profileData.name
                                ? "text-gray-900"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.name || "Not provided"}
                          </span>
                          <User className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <Label className="text-gray-700 font-medium text-xs">
                        Email Address
                      </Label>
                      {isEditing ? (
                          <Input
                            type="email"
                            value={profileData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                          className="h-8 border border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded text-xs px-2 transition-colors duration-200"
                            placeholder="Enter your email"
                          />
                      ) : (
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                          <span
                            className={`text-xs font-medium ${
                              profileData.email
                                ? "text-gray-900"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.email || "Not provided"}
                          </span>
                          <Mail className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <Label className="text-gray-700 font-medium text-xs">
                        Phone Number
                      </Label>
                      {isEditing ? (
                          <Input
                            value={profileData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                          className="h-8 border border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded text-xs px-2 transition-colors duration-200"
                            placeholder="Enter your phone number"
                          />
                      ) : (
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                          <span
                            className={`text-xs font-medium ${
                              profileData.phone
                                ? "text-gray-900"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.phone || "Not provided"}
                          </span>
                          <Phone className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="space-y-1">
                      <Label className="text-gray-700 font-medium text-xs">
                        Gender
                      </Label>
                      {isEditing ? (
                          <select
                            value={profileData.gender}
                            onChange={(e) =>
                              handleInputChange("gender", e.target.value)
                            }
                          className="h-8 w-full border border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded text-xs bg-white px-2 transition-colors duration-200"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                      ) : (
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                          <span
                            className={`text-xs font-medium ${
                              profileData.gender
                                ? "text-gray-900"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.gender || "Not provided"}
                          </span>
                          <Users className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Age */}
                    <div className="space-y-1">
                      <Label className="text-gray-700 font-medium text-xs">
                        Age
                      </Label>
                      {isEditing ? (
                          <Input
                            type="number"
                            value={profileData.age}
                            onChange={(e) =>
                              handleInputChange("age", e.target.value)
                            }
                          className="h-8 border border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded text-xs px-2 transition-colors duration-200"
                            placeholder="Enter your age"
                          />
                      ) : (
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                          <span
                            className={`text-xs font-medium ${
                              profileData.age
                                ? "text-gray-900"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.age || "Not provided"}
                          </span>
                          <Calendar className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Annual Income */}
                    <div className="space-y-1">
                      <Label className="text-gray-700 font-medium text-xs">
                        Annual Income
                      </Label>
                      {isEditing ? (
                          <select
                            value={profileData.annualIncome}
                            onChange={(e) =>
                              handleInputChange("annualIncome", e.target.value)
                            }
                          className="h-8 w-full border border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded text-xs bg-white px-2 transition-colors duration-200"
                          >
                            <option value="Below 5 Lakhs">Below 5 Lakhs</option>
                            <option value="5-10 Lakhs">5-10 Lakhs</option>
                            <option value="10-25 Lakhs">10-25 Lakhs</option>
                            <option value="25-50 Lakhs">25-50 Lakhs</option>
                          <option value="Above 50 Lakhs">Above 50 Lakhs</option>
                          </select>
                      ) : (
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                          <span
                            className={`text-xs font-medium ${
                              profileData.annualIncome
                                ? "text-gray-900"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.annualIncome || "Not provided"}
                          </span>
                          <DollarSign className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Caste */}
                    <div className="space-y-1">
                      <Label className="text-gray-700 font-medium text-xs">
                        Caste
                      </Label>
                      {isEditing ? (
                        <select
                          value={profileData.caste}
                          onChange={(e) =>
                            handleInputChange("caste", e.target.value)
                          }
                          className="h-8 w-full border border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded text-xs bg-white px-2 transition-colors duration-200"
                        >
                          <option value="General">General</option>
                          <option value="OBC">OBC</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                        </select>
                      ) : (
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                          <span
                            className={`text-xs font-medium ${
                              profileData.caste
                                ? "text-gray-900"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.caste || "Not provided"}
                          </span>
                          <Shield className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                      <p className="text-red-500 text-xs flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        This cannot be edited later
                      </p>
                    </div>

                    {/* Area */}
                    <div className="space-y-1">
                      <Label className="text-gray-700 font-medium text-xs">
                        Area
                      </Label>
                      {isEditing ? (
                        <select
                          value={profileData.area}
                          onChange={(e) =>
                            handleInputChange("area", e.target.value)
                          }
                          className="h-8 w-full border border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded text-xs bg-white px-2 transition-colors duration-200"
                        >
                          <option value="Urban">Urban</option>
                          <option value="Rural">Rural</option>
                          <option value="Semi-Urban">Semi-Urban</option>
                        </select>
                      ) : (
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                          <span
                            className={`text-xs font-medium ${
                              profileData.area
                                ? "text-gray-900"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.area || "Not provided"}
                          </span>
                          <MapPin className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Physically Challenged */}
                    <div className="space-y-1">
                      <Label className="text-gray-700 font-medium text-xs">
                        Physically Challenged
                      </Label>
                      {isEditing ? (
                        <select
                          value={profileData.physicallyChallenged}
                          onChange={(e) =>
                            handleInputChange(
                              "physicallyChallenged",
                              e.target.value
                            )
                          }
                          className="h-8 w-full border border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded text-xs bg-white px-2 transition-colors duration-200"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      ) : (
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                          <span
                            className={`text-xs font-medium ${
                              profileData.physicallyChallenged
                                ? "text-gray-900"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.physicallyChallenged || "Not provided"}
                          </span>
                          <ShieldCheck className="w-3 h-3 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Sidebar - Quick Actions & Account Settings */}
          <div className="xl:col-span-1 space-y-4">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-[#2D3748] flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-[#B8860B]" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 group border border-gray-100 hover:border-gray-200">
                    <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-[#B8860B]/10 rounded-lg flex items-center justify-center">
                        <UserCircle className="w-4 h-4 text-[#B8860B]" />
                          </div>
                      <div className="text-left">
                        <span className="text-[#2D3748] font-medium text-sm">
                          View Activity
                        </span>
                        <p className="text-gray-500 text-xs">Recent actions</p>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#B8860B] transition-colors" />
                  </button>

                  <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 group border border-gray-100 hover:border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#B8860B]/10 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-[#B8860B]" />
                  </div>
                      <div className="text-left">
                        <span className="text-[#2D3748] font-medium text-sm">
                          Analytics
                        </span>
                        <p className="text-gray-500 text-xs">
                          Performance data
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#B8860B] transition-colors" />
                  </button>

                  <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 group border border-gray-100 hover:border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#B8860B]/10 rounded-lg flex items-center justify-center">
                        <Settings className="w-4 h-4 text-[#B8860B]" />
                      </div>
                      <div className="text-left">
                        <span className="text-[#2D3748] font-medium text-sm">
                          Preferences
                        </span>
                        <p className="text-gray-500 text-xs">
                          Account settings
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#B8860B] transition-colors" />
                  </button>

                  <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 group border border-gray-100 hover:border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#B8860B]/10 rounded-lg flex items-center justify-center">
                        <HelpCircle className="w-4 h-4 text-[#B8860B]" />
                      </div>
                      <div className="text-left">
                        <span className="text-[#2D3748] font-medium text-sm">
                          Help Center
                        </span>
                        <p className="text-gray-500 text-xs">Get support</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#B8860B] transition-colors" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Account Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                  <CardTitle className="text-base font-medium flex items-center">
                    <Settings className="w-4 h-4 mr-2 text-[#B8860B]" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group border border-gray-100 hover:border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#B8860B]/10 rounded-lg flex items-center justify-center">
                          <UserCircle className="w-4 h-4 text-[#B8860B]" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-sm font-medium text-gray-900">
                            Proposed Ideas
                          </h3>
                          <p className="text-gray-500 text-xs">
                            View and manage your submitted business ideas
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#B8860B] transition-colors" />
                    </button>

                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group border border-gray-100 hover:border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#B8860B]/10 rounded-lg flex items-center justify-center">
                          <Globe className="w-4 h-4 text-[#B8860B]" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-sm font-medium text-gray-900">
                            Choose Language
                          </h3>
                          <p className="text-gray-500 text-xs">
                            Select your preferred language and region
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#B8860B] transition-colors" />
                    </button>

                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group border border-gray-100 hover:border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#B8860B]/10 rounded-lg flex items-center justify-center">
                          <HelpCircle className="w-4 h-4 text-[#B8860B]" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-sm font-medium text-gray-900">
                            About
                          </h3>
                          <p className="text-gray-500 text-xs">
                            Learn more about our platform and services
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#B8860B] transition-colors" />
                    </button>

                    <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group border border-gray-100 hover:border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#B8860B]/10 rounded-lg flex items-center justify-center">
                          <Bell className="w-4 h-4 text-[#B8860B]" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-sm font-medium text-gray-900">
                            Send Feedback
                          </h3>
                          <p className="text-gray-500 text-xs">
                            Help us improve by sharing your thoughts
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#B8860B] transition-colors" />
                    </button>

                    <Separator className="my-3" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between p-3 hover:bg-red-50 rounded-lg transition-colors group border border-red-100 hover:border-red-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <LogOut className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-sm font-medium text-red-600">
                            Logout
                          </h3>
                          <p className="text-red-500 text-xs">
                            Sign out of your account
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-red-400 group-hover:text-red-600 transition-colors" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
