"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Shield,
  Star,
  User,
  AlertCircle,
} from "lucide-react";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const { login, signup, error, clearError, isAuthenticated, loading } =
    useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  // Clear error when switching between sign in/up
  useEffect(() => {
    clearError();
  }, [isSignUp, clearError]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    clearError();

    try {
      if (isSignUp) {
        // Validate password confirmation
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        console.log("Attempting signup...");
        const result = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        console.log("Signup result:", result);
        if (result.success) {
          router.push("/");
        }
      } else {
        console.log("Attempting login...");
        const result = await login({
          email: formData.email,
          password: formData.password,
        });

        console.log("Login result:", result);
        if (result.success) {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1F]">
      <Navbar />

      <div className="flex min-h-[calc(100vh-140px)]">
        {/* Left Section - Login/Signup Form */}
        <div className="flex-1 bg-white flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#10B981] mb-2">
                10000Ideas
              </h1>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {isSignUp ? "Create Your Account" : "Welcome Back"}
              </h2>
              <p className="text-gray-600">
                {isSignUp
                  ? "Join thousands of entrepreneurs discovering profitable business opportunities"
                  : "Sign in to access your business ideas and reports"}
              </p>
            </div>

            {/* Auth Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
                  !isSignUp
                    ? "bg-[#10B981] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
                  isSignUp
                    ? "bg-[#10B981] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </motion.div>
            )}

            {/* Form */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-gray-700 font-medium"
                      >
                        Full Name
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10 border-gray-300 focus:border-[#10B981] focus:ring-[#10B981]"
                          required={isSignUp}
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-medium"
                    >
                      Email Address
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 border-gray-300 focus:border-[#10B981] focus:ring-[#10B981]"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="password"
                      className="text-gray-700 font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 border-gray-300 focus:border-[#10B981] focus:ring-[#10B981]"
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {isSignUp && (
                    <div>
                      <Label
                        htmlFor="confirmPassword"
                        className="text-gray-700 font-medium"
                      >
                        Confirm Password
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pl-10 border-gray-300 focus:border-[#10B981] focus:ring-[#10B981]"
                          required={isSignUp}
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  )}

                  {!isSignUp && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="text-sm text-[#10B981] hover:text-[#059669] font-medium"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#10B981] hover:bg-[#059669] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {isSignUp ? "Creating Account..." : "Signing In..."}
                      </>
                    ) : (
                      <>
                        {isSignUp ? "Create Account" : "Sign In"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    {isSignUp
                      ? "Already have an account?"
                      : "Don't have an account?"}{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-[#10B981] hover:text-[#059669] font-medium"
                    >
                      {isSignUp ? "Sign in here" : "Sign up here"}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Section - Promotional Content */}
        <div className="flex-1 bg-gradient-to-br from-[#0A0F1F] to-[#1a1a1a] relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/20 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10B981]/10 rounded-full translate-y-32 -translate-x-32"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#10B981]/5 rounded-full -translate-x-16 -translate-y-16"></div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 flex flex-col justify-center h-full p-12 text-white"
          >
            <div className="max-w-lg">
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Unlock Your Business Potential
              </h2>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                Access comprehensive business plans, market research, and
                funding guides for thousands of profitable business ideas.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-200">
                    Detailed market analysis and growth projections
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-200">
                    Investment breakdowns and funding options
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-200">
                    Expert guidance and business plan templates
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-200">
                    Government schemes and subsidy information
                  </p>
                </div>
              </div>

              {/* Featured Business Ideas Card */}
              <Card className="bg-[#10B981]/10 border-[#10B981]/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Featured Business Ideas
                  </h3>
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-3xl font-bold text-[#10B981]">
                      10,000+
                    </span>
                    <span className="text-gray-300">ideas</span>
                  </div>
                  <p className="text-gray-200 text-sm">
                    From traditional bakeries to tech startups, discover
                    opportunities across all industries.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
