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

      {/* Professional Header Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D3748] via-[#1a202c] to-[#2D3748]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between"
          >
            {/* User Info Section */}
            <div className="flex items-start space-x-6 mb-8 lg:mb-0">
              {/* Profile Avatar */}
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-br from-[#B8860B] to-[#D4AF37] rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/30 group-hover:scale-105 transition-transform duration-300">
                  <User className="w-12 h-12 text-white" />
                </div>
                {/* Completion Badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white">
                  <span className="text-white text-sm font-bold">
                    {profileStats.completionPercentage}%
                  </span>
                </div>
                {/* Online Status */}
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>

              {/* User Details */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-4xl font-bold text-white">
                    {profileData.name || user?.name || "User"}
                  </h1>
                  <div className="w-8 h-8 bg-[#B8860B]/20 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#B8860B]" />
                  </div>
                </div>
                <p className="text-white/80 text-xl mb-3">
                  {profileData.email || user?.email || "user@example.com"}
                </p>

                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-[#B8860B]/20 text-[#B8860B] border-[#B8860B]/30 font-semibold px-4 py-2 text-sm">
                    <Crown className="w-4 h-4 mr-2" />
                    Premium Member
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-semibold px-4 py-2 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Active
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 font-semibold px-4 py-2 text-sm">
                    <Star className="w-4 h-4 mr-2" />
                    Verified
                  </Badge>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center space-x-6 text-white/70">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Joined {new Date().getFullYear()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4" />
                    <span className="text-sm">Last active now</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#B8860B] hover:bg-[#2D3748] text-white hover:text-white px-8 py-4 rounded-2xl font-semibold shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 min-w-[160px]"
                >
                  <Edit3 className="w-5 h-5" />
                  <span>Edit Profile</span>
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 min-w-[160px]"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    <span>{isLoading ? "Saving..." : "Save Changes"}</span>
                  </Button>
                  <Button
                    onClick={handleCancel}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 min-w-[160px]"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#2D3748] mb-2">
              Your Dashboard
            </h2>
            <p className="text-[#2D3748]/70 text-lg">
              Track your progress and achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Balance Icoins Card */}
            <Card className="bg-gradient-to-br from-amber-50 via-amber-100 to-yellow-100 border-amber-200/50 hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <CardContent className="p-8 relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-600 text-sm font-semibold mb-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +12.5%
                    </div>
                    <span className="text-green-600 text-xs">This month</span>
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-gray-800 mb-2">
                  {profileStats.balanceIcoins.toLocaleString()}
                </h3>
                <p className="text-gray-600 font-semibold text-lg mb-1">
                  Balance Icoins
                </p>
                <p className="text-gray-500 text-sm">Available for purchases</p>
              </CardContent>
            </Card>

            {/* Saved Ideas Card */}
            <Card className="bg-gradient-to-br from-[#B8860B]/5 via-[#B8860B]/10 to-[#B8860B]/15 border-[#B8860B]/20 hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B8860B]/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <CardContent className="p-8 relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#B8860B] to-[#D4AF37] rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-[#B8860B] text-sm font-semibold mb-1">
                      <Star className="w-4 h-4 mr-1" />
                      +3
                    </div>
                    <span className="text-[#B8860B] text-xs">This week</span>
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-[#2D3748] mb-2">
                  {profileStats.savedIdeas}
                </h3>
                <p className="text-[#2D3748]/70 font-semibold text-lg mb-1">
                  Saved Ideas
                </p>
                <p className="text-[#2D3748]/50 text-sm">Your collection</p>
              </CardContent>
            </Card>

            {/* Purchased Card */}
            <Card className="bg-gradient-to-br from-[#2D3748] via-gray-700 to-[#1a202c] border-[#2D3748]/50 hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <CardContent className="p-8 relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <ShoppingBag className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-400 text-sm font-semibold mb-1">
                      <Crown className="w-4 h-4 mr-1" />
                      Premium
                    </div>
                    <span className="text-yellow-400 text-xs">Buyer</span>
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">
                  {profileStats.purchased.toString().padStart(2, "0")}
                </h3>
                <p className="text-white/80 font-semibold text-lg mb-1">
                  Purchased
                </p>
                <p className="text-white/60 text-sm">Total orders</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Sidebar - Quick Actions */}
          <div className="xl:col-span-1">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-xl sticky top-8">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-bold text-[#2D3748] flex items-center">
                    <Zap className="w-6 h-6 mr-3 text-[#B8860B]" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription className="text-[#2D3748]/70">
                    Access your most used features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 hover:bg-[#B8860B]/5 rounded-xl transition-all duration-300 group border border-gray-200 hover:border-[#B8860B]/30 hover:shadow-md">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#B8860B]/10 to-[#B8860B]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <UserCircle className="w-6 h-6 text-[#B8860B]" />
                      </div>
                      <div className="text-left">
                        <span className="text-[#2D3748] font-semibold text-base">
                          View Activity
                        </span>
                        <p className="text-[#2D3748]/60 text-sm">
                          Recent actions
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#2D3748]/50 group-hover:text-[#B8860B] transition-colors" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 hover:bg-[#B8860B]/5 rounded-xl transition-all duration-300 group border border-gray-200 hover:border-[#B8860B]/30 hover:shadow-md">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#B8860B]/10 to-[#B8860B]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <BarChart3 className="w-6 h-6 text-[#B8860B]" />
                      </div>
                      <div className="text-left">
                        <span className="text-[#2D3748] font-semibold text-base">
                          Analytics
                        </span>
                        <p className="text-[#2D3748]/60 text-sm">
                          Performance data
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#2D3748]/50 group-hover:text-[#B8860B] transition-colors" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 hover:bg-[#B8860B]/5 rounded-xl transition-all duration-300 group border border-gray-200 hover:border-[#B8860B]/30 hover:shadow-md">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#B8860B]/10 to-[#B8860B]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Settings className="w-6 h-6 text-[#B8860B]" />
                      </div>
                      <div className="text-left">
                        <span className="text-[#2D3748] font-semibold text-base">
                          Preferences
                        </span>
                        <p className="text-[#2D3748]/60 text-sm">
                          Account settings
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#2D3748]/50 group-hover:text-[#B8860B] transition-colors" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 hover:bg-[#B8860B]/5 rounded-xl transition-all duration-300 group border border-gray-200 hover:border-[#B8860B]/30 hover:shadow-md">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#B8860B]/10 to-[#B8860B]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <HelpCircle className="w-6 h-6 text-[#B8860B]" />
                      </div>
                      <div className="text-left">
                        <span className="text-[#2D3748] font-semibold text-base">
                          Help Center
                        </span>
                        <p className="text-[#2D3748]/60 text-sm">Get support</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#2D3748]/50 group-hover:text-[#B8860B] transition-colors" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="xl:col-span-3 space-y-8">
            {/* Professional Profile Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Message Display */}
              {message.text && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl flex items-center space-x-3 shadow-lg ${
                    message.type === "success"
                      ? "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border border-green-200"
                      : "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  )}
                  <span className="font-semibold text-lg">{message.text}</span>
                </motion.div>
              )}

              {/* Personal Information Section */}
              <Card className="bg-white/95 backdrop-blur-sm border-gray-200/50 shadow-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#2D3748] via-[#1a202c] to-[#2D3748] text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                  </div>
                  <div className="relative">
                    <CardTitle className="text-2xl font-bold flex items-center mb-2">
                      <div className="w-10 h-10 bg-[#B8860B]/20 rounded-xl flex items-center justify-center mr-4">
                        <User className="w-6 h-6 text-[#B8860B]" />
                      </div>
                      Personal Information
                    </CardTitle>
                    <CardDescription className="text-white/80 text-lg">
                      Manage your personal details and contact information
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Name */}
                    <div className="space-y-4">
                      <Label className="text-[#2D3748] font-bold text-base flex items-center">
                        <div className="w-6 h-6 bg-[#B8860B]/10 rounded-lg flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-[#B8860B]" />
                        </div>
                        Full Name *
                      </Label>
                      {isEditing ? (
                        <div className="relative">
                          <Input
                            value={profileData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            className="h-14 border-2 border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded-2xl text-lg font-medium pl-6 pr-6 shadow-sm hover:shadow-md transition-all duration-300"
                            placeholder="Enter your full name"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                            <Edit3 className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 hover:border-[#B8860B]/30 transition-all duration-300 group">
                          <span
                            className={`text-lg font-semibold ${
                              profileData.name
                                ? "text-[#2D3748]"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.name || "Not provided"}
                          </span>
                          <div className="w-10 h-10 bg-[#B8860B]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <User className="w-5 h-5 text-[#B8860B]" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-4">
                      <Label className="text-[#2D3748] font-bold text-base flex items-center">
                        <div className="w-6 h-6 bg-[#B8860B]/10 rounded-lg flex items-center justify-center mr-3">
                          <Mail className="w-4 h-4 text-[#B8860B]" />
                        </div>
                        Email Address
                      </Label>
                      {isEditing ? (
                        <div className="relative">
                          <Input
                            type="email"
                            value={profileData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className="h-14 border-2 border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded-2xl text-lg font-medium pl-6 pr-6 shadow-sm hover:shadow-md transition-all duration-300"
                            placeholder="Enter your email"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                            <Mail className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 hover:border-[#B8860B]/30 transition-all duration-300 group">
                          <span
                            className={`text-lg font-semibold ${
                              profileData.email
                                ? "text-[#2D3748]"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.email || "Not provided"}
                          </span>
                          <div className="w-10 h-10 bg-[#B8860B]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Mail className="w-5 h-5 text-[#B8860B]" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-4">
                      <Label className="text-[#2D3748] font-bold text-base flex items-center">
                        <div className="w-6 h-6 bg-[#B8860B]/10 rounded-lg flex items-center justify-center mr-3">
                          <Phone className="w-4 h-4 text-[#B8860B]" />
                        </div>
                        Phone Number
                      </Label>
                      {isEditing ? (
                        <div className="relative">
                          <Input
                            value={profileData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            className="h-14 border-2 border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded-2xl text-lg font-medium pl-6 pr-6 shadow-sm hover:shadow-md transition-all duration-300"
                            placeholder="Enter your phone number"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                            <Phone className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 hover:border-[#B8860B]/30 transition-all duration-300 group">
                          <span
                            className={`text-lg font-semibold ${
                              profileData.phone
                                ? "text-[#2D3748]"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.phone || "Not provided"}
                          </span>
                          <div className="w-10 h-10 bg-[#B8860B]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Phone className="w-5 h-5 text-[#B8860B]" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="space-y-4">
                      <Label className="text-[#2D3748] font-bold text-base flex items-center">
                        <div className="w-6 h-6 bg-[#B8860B]/10 rounded-lg flex items-center justify-center mr-3">
                          <Users className="w-4 h-4 text-[#B8860B]" />
                        </div>
                        Gender
                      </Label>
                      {isEditing ? (
                        <div className="relative">
                          <select
                            value={profileData.gender}
                            onChange={(e) =>
                              handleInputChange("gender", e.target.value)
                            }
                            className="h-14 w-full border-2 border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded-2xl text-lg font-medium bg-white pl-6 pr-12 shadow-sm hover:shadow-md transition-all duration-300 appearance-none"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                            <Users className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 group">
                          <span
                            className={`text-lg font-semibold ${
                              profileData.gender
                                ? "text-[#2D3748]"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.gender || "Not provided"}
                          </span>
                          <div className="w-10 h-10 bg-[#B8860B]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Users className="w-5 h-5 text-[#B8860B]" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Age */}
                    <div className="space-y-4">
                      <Label className="text-[#2D3748] font-bold text-base flex items-center">
                        <div className="w-6 h-6 bg-[#B8860B]/10 rounded-lg flex items-center justify-center mr-3">
                          <Calendar className="w-4 h-4 text-[#B8860B]" />
                        </div>
                        Age
                      </Label>
                      {isEditing ? (
                        <div className="relative">
                          <Input
                            type="number"
                            value={profileData.age}
                            onChange={(e) =>
                              handleInputChange("age", e.target.value)
                            }
                            className="h-14 border-2 border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded-2xl text-lg font-medium pl-6 pr-6 shadow-sm hover:shadow-md transition-all duration-300"
                            placeholder="Enter your age"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                            <Calendar className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 hover:border-[#B8860B]/30 transition-all duration-300 group">
                          <span
                            className={`text-lg font-semibold ${
                              profileData.age
                                ? "text-[#2D3748]"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.age || "Not provided"}
                          </span>
                          <div className="w-10 h-10 bg-[#B8860B]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Calendar className="w-5 h-5 text-[#B8860B]" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Annual Income */}
                    <div className="space-y-4">
                      <Label className="text-[#2D3748] font-bold text-base flex items-center">
                        <div className="w-6 h-6 bg-[#B8860B]/10 rounded-lg flex items-center justify-center mr-3">
                          <DollarSign className="w-4 h-4 text-[#B8860B]" />
                        </div>
                        Annual Income
                      </Label>
                      {isEditing ? (
                        <div className="relative">
                          <select
                            value={profileData.annualIncome}
                            onChange={(e) =>
                              handleInputChange("annualIncome", e.target.value)
                            }
                            className="h-14 w-full border-2 border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded-2xl text-lg font-medium bg-white pl-6 pr-12 shadow-sm hover:shadow-md transition-all duration-300 appearance-none"
                          >
                            <option value="Below 5 Lakhs">Below 5 Lakhs</option>
                            <option value="5-10 Lakhs">5-10 Lakhs</option>
                            <option value="10-25 Lakhs">10-25 Lakhs</option>
                            <option value="25-50 Lakhs">25-50 Lakhs</option>
                            <option value="Above 50 Lakhs">
                              Above 50 Lakhs
                            </option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                            <DollarSign className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 hover:border-[#B8860B]/30 transition-all duration-300 group">
                          <span
                            className={`text-lg font-semibold ${
                              profileData.annualIncome
                                ? "text-[#2D3748]"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.annualIncome || "Not provided"}
                          </span>
                          <div className="w-10 h-10 bg-[#B8860B]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <DollarSign className="w-5 h-5 text-[#B8860B]" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Caste */}
                    <div className="space-y-3">
                      <Label className="text-[#2D3748] font-bold text-sm flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-[#B8860B]" />
                        Caste
                      </Label>
                      {isEditing ? (
                        <select
                          value={profileData.caste}
                          onChange={(e) =>
                            handleInputChange("caste", e.target.value)
                          }
                          className="h-12 w-full border-2 border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded-xl text-lg font-medium bg-white"
                        >
                          <option value="General">General</option>
                          <option value="OBC">OBC</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                        </select>
                      ) : (
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                          <span
                            className={`text-lg font-semibold ${
                              profileData.caste
                                ? "text-[#2D3748]"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.caste || "Not provided"}
                          </span>
                          <div className="w-8 h-8 bg-[#B8860B]/10 rounded-lg flex items-center justify-center">
                            <Shield className="w-4 h-4 text-[#B8860B]" />
                          </div>
                        </div>
                      )}
                      <p className="text-red-500 text-sm font-medium flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        This cannot be edited later
                      </p>
                    </div>

                    {/* Area */}
                    <div className="space-y-3">
                      <Label className="text-[#2D3748] font-bold text-sm flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-[#B8860B]" />
                        Area
                      </Label>
                      {isEditing ? (
                        <select
                          value={profileData.area}
                          onChange={(e) =>
                            handleInputChange("area", e.target.value)
                          }
                          className="h-12 w-full border-2 border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded-xl text-lg font-medium bg-white"
                        >
                          <option value="Urban">Urban</option>
                          <option value="Rural">Rural</option>
                          <option value="Semi-Urban">Semi-Urban</option>
                        </select>
                      ) : (
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-[#B8860B]/30 transition-colors">
                          <span
                            className={`text-lg font-semibold ${
                              profileData.area
                                ? "text-[#2D3748]"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.area || "Not provided"}
                          </span>
                          <div className="w-8 h-8 bg-[#B8860B]/10 rounded-lg flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-[#B8860B]" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Physically Challenged */}
                    <div className="space-y-3">
                      <Label className="text-[#2D3748] font-bold text-sm flex items-center">
                        <ShieldCheck className="w-4 h-4 mr-2 text-[#B8860B]" />
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
                          className="h-12 w-full border-2 border-gray-200 focus:border-[#B8860B] focus:ring-[#B8860B]/20 rounded-xl text-lg font-medium bg-white"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      ) : (
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
                          <span
                            className={`text-lg font-semibold ${
                              profileData.physicallyChallenged
                                ? "text-[#2D3748]"
                                : "text-gray-400 italic"
                            }`}
                          >
                            {profileData.physicallyChallenged || "Not provided"}
                          </span>
                          <div className="w-8 h-8 bg-[#B8860B]/10 rounded-lg flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings Section */}
              <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white rounded-t-xl">
                  <CardTitle className="text-xl font-bold flex items-center">
                    <Settings className="w-6 h-6 mr-3 text-white" />
                    Account Settings
                  </CardTitle>
                  <CardDescription className="text-white/90">
                    Manage your account preferences and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <button className="w-full flex items-center justify-between p-6 hover:bg-[#B8860B]/5 rounded-xl transition-colors group border-2 border-gray-200 hover:border-[#B8860B]/30">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#B8860B]/10 rounded-xl flex items-center justify-center">
                          <UserCircle className="w-6 h-6 text-[#B8860B]" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-[#2D3748]">
                            Proposed Ideas
                          </h3>
                          <p className="text-[#2D3748]/70 text-sm">
                            View and manage your submitted business ideas
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-[#2D3748]/50 group-hover:text-[#B8860B] transition-colors" />
                    </button>

                    <button className="w-full flex items-center justify-between p-6 hover:bg-[#B8860B]/5 rounded-xl transition-colors group border-2 border-gray-200 hover:border-[#B8860B]/30">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#B8860B]/10 rounded-xl flex items-center justify-center">
                          <Globe className="w-6 h-6 text-[#B8860B]" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-[#2D3748]">
                            Choose Language
                          </h3>
                          <p className="text-[#2D3748]/70 text-sm">
                            Select your preferred language and region
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-[#2D3748]/50 group-hover:text-[#B8860B] transition-colors" />
                    </button>

                    <button className="w-full flex items-center justify-between p-6 hover:bg-[#B8860B]/5 rounded-xl transition-colors group border-2 border-gray-200 hover:border-[#B8860B]/30">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#B8860B]/10 rounded-xl flex items-center justify-center">
                          <HelpCircle className="w-6 h-6 text-[#B8860B]" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-[#2D3748]">
                            About
                          </h3>
                          <p className="text-[#2D3748]/70 text-sm">
                            Learn more about our platform and services
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-[#2D3748]/50 group-hover:text-[#B8860B] transition-colors" />
                    </button>

                    <button className="w-full flex items-center justify-between p-6 hover:bg-[#B8860B]/5 rounded-xl transition-colors group border-2 border-gray-200 hover:border-[#B8860B]/30">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#B8860B]/10 rounded-xl flex items-center justify-center">
                          <Bell className="w-6 h-6 text-[#B8860B]" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-[#2D3748]">
                            Send Feedback
                          </h3>
                          <p className="text-[#2D3748]/70 text-sm">
                            Help us improve by sharing your thoughts
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-[#2D3748]/50 group-hover:text-[#B8860B] transition-colors" />
                    </button>

                    <Separator className="my-6" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between p-6 hover:bg-red-50 rounded-xl transition-colors group border-2 border-red-200 hover:border-red-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                          <LogOut className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-red-600">
                            Logout
                          </h3>
                          <p className="text-red-500/70 text-sm">
                            Sign out of your account
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-red-500/50 group-hover:text-red-600 transition-colors" />
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
