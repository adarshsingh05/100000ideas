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
    age: "",
    monthlyIncome: "",
    gender: "",
    isPhysicallyDisabled: "",
    maritalStatus: "",
    area: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

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

  // Reset step when switching between sign in/up
  useEffect(() => {
    setCurrentStep(1);
  }, [isSignUp]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return (
          formData.name &&
          formData.email &&
          formData.password &&
          formData.confirmPassword
        );
      case 2:
        return formData.age && formData.monthlyIncome && formData.gender;
      case 3:
        return formData.isPhysicallyDisabled && formData.maritalStatus;
      case 4:
        return formData.area;
      default:
        return false;
    }
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
    <div className="min-h-screen bg-[#FCFCFC]">
      <Navbar />

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
        {/* Left Section - Login/Signup Form */}
        <div className="flex-1 bg-[#FCFCFC] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
          {/* Decorative Background Icons */}
          <div className="absolute top-10 left-10 w-20 h-20 opacity-5">
            <img
              src="/Group 482171.png"
              alt="Decorative icon"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute bottom-10 right-10 w-16 h-16 opacity-5">
            <img
              src="/window.svg"
              alt="Decorative window"
              className="w-full h-full object-contain"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md mx-auto relative z-10"
          >
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex justify-center mb-4">
                <img
                  src="/logos.png"
                  alt="10000Ideas Logo"
                  className="h-12 sm:h-16 w-auto object-contain"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#2D3748] mb-2">
                {isSignUp ? "Create Your Account" : "Welcome Back"}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {isSignUp
                  ? "Join thousands of entrepreneurs discovering profitable business opportunities"
                  : "Sign in to access your business ideas and reports"}
              </p>
            </div>

            {/* Auth Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-4 sm:mb-6">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2 px-3 sm:px-4 rounded-md font-medium transition-all duration-300 text-sm sm:text-base ${
                  !isSignUp
                    ? "bg-[#FDCC29] text-[#2D3748] shadow-sm"
                    : "text-gray-600 hover:text-[#2D3748]"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2 px-3 sm:px-4 rounded-md font-medium transition-all duration-300 text-sm sm:text-base ${
                  isSignUp
                    ? "bg-[#FDCC29] text-[#2D3748] shadow-sm"
                    : "text-gray-600 hover:text-[#2D3748]"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Step Indicator for Sign Up */}
            {isSignUp && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#2D3748]">
                    Step {currentStep} of {totalSteps}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#FDCC29] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">Personal Info</span>
                  <span className="text-xs text-gray-500">Details</span>
                  <span className="text-xs text-gray-500">Status</span>
                  <span className="text-xs text-gray-500">Location</span>
                </div>
              </div>
            )}

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
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Basic Information */}
                  {isSignUp && currentStep === 1 && (
                    <>
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-gray-700 font-medium text-sm"
                        >
                          Full Name
                        </Label>
                        <div className="relative mt-2">
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10 py-3 border-gray-300 focus:border-[#FDCC29] focus:ring-[#FDCC29] rounded-lg"
                            required
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="email"
                          className="text-gray-700 font-medium text-sm"
                        >
                          Email Address
                        </Label>
                        <div className="relative mt-2">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 py-3 border-gray-300 focus:border-[#FDCC29] focus:ring-[#FDCC29] rounded-lg"
                            required
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="password"
                          className="text-gray-700 font-medium text-sm"
                        >
                          Password
                        </Label>
                        <div className="relative mt-2">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="pl-10 pr-10 py-3 border-gray-300 focus:border-[#FDCC29] focus:ring-[#FDCC29] rounded-lg"
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

                      <div>
                        <Label
                          htmlFor="confirmPassword"
                          className="text-gray-700 font-medium text-sm"
                        >
                          Confirm Password
                        </Label>
                        <div className="relative mt-2">
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="pl-10 py-3 border-gray-300 focus:border-[#FDCC29] focus:ring-[#FDCC29] rounded-lg"
                            required
                          />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 2: Personal Details */}
                  {isSignUp && currentStep === 2 && (
                    <>
                      <div>
                        <Label
                          htmlFor="age"
                          className="text-gray-700 font-medium text-sm"
                        >
                          Age
                        </Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          placeholder="Enter your age"
                          value={formData.age}
                          onChange={handleInputChange}
                          className="py-3 border-gray-300 focus:border-[#FDCC29] focus:ring-[#FDCC29] rounded-lg"
                          required
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="monthlyIncome"
                          className="text-gray-700 font-medium text-sm"
                        >
                          Monthly Income
                        </Label>
                        <select
                          id="monthlyIncome"
                          name="monthlyIncome"
                          value={formData.monthlyIncome}
                          onChange={handleInputChange}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:border-[#FDCC29] focus:ring-[#FDCC29] mt-2"
                          required
                        >
                          <option value="">Select income range</option>
                          <option value="0-25000">₹0 - ₹25,000</option>
                          <option value="25000-50000">₹25,000 - ₹50,000</option>
                          <option value="50000-100000">
                            ₹50,000 - ₹1,00,000
                          </option>
                          <option value="100000-200000">
                            ₹1,00,000 - ₹2,00,000
                          </option>
                          <option value="200000+">₹2,00,000+</option>
                        </select>
                      </div>

                      <div>
                        <Label
                          htmlFor="gender"
                          className="text-gray-700 font-medium text-sm"
                        >
                          Gender
                        </Label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:border-[#FDCC29] focus:ring-[#FDCC29] mt-2"
                          required
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">
                            Prefer not to say
                          </option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Step 3: Status Information */}
                  {isSignUp && currentStep === 3 && (
                    <>
                      <div>
                        <Label
                          htmlFor="isPhysicallyDisabled"
                          className="text-gray-700 font-medium text-sm"
                        >
                          Are you physically disabled?
                        </Label>
                        <select
                          id="isPhysicallyDisabled"
                          name="isPhysicallyDisabled"
                          value={formData.isPhysicallyDisabled}
                          onChange={handleInputChange}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:border-[#FDCC29] focus:ring-[#FDCC29] mt-2"
                          required
                        >
                          <option value="">Select option</option>
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
                          <option value="prefer-not-to-say">
                            Prefer not to say
                          </option>
                        </select>
                      </div>

                      <div>
                        <Label
                          htmlFor="maritalStatus"
                          className="text-gray-700 font-medium text-sm"
                        >
                          Marital Status
                        </Label>
                        <select
                          id="maritalStatus"
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleInputChange}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:border-[#FDCC29] focus:ring-[#FDCC29] mt-2"
                          required
                        >
                          <option value="">Select marital status</option>
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                          <option value="prefer-not-to-say">
                            Prefer not to say
                          </option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Step 4: Location */}
                  {isSignUp && currentStep === 4 && (
                    <>
                      <div>
                        <Label
                          htmlFor="area"
                          className="text-gray-700 font-medium text-sm"
                        >
                          Area/Location
                        </Label>
                        <Input
                          id="area"
                          name="area"
                          type="text"
                          placeholder="Enter your city/area"
                          value={formData.area}
                          onChange={handleInputChange}
                          className="py-3 border-gray-300 focus:border-[#FDCC29] focus:ring-[#FDCC29] rounded-lg mt-2"
                          required
                        />
                      </div>
                    </>
                  )}

                  {/* Sign In Form */}
                  {!isSignUp && (
                    <>
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-gray-700 font-medium text-sm"
                        >
                          Email Address
                        </Label>
                        <div className="relative mt-2">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 py-3 border-gray-300 focus:border-[#FDCC29] focus:ring-[#FDCC29] rounded-lg"
                            required
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="password"
                          className="text-gray-700 font-medium text-sm"
                        >
                          Password
                        </Label>
                        <div className="relative mt-2">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="pl-10 pr-10 py-3 border-gray-300 focus:border-[#FDCC29] focus:ring-[#FDCC29] rounded-lg"
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

                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="text-sm text-[#FDCC29] hover:text-[#2D3748] font-medium"
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex space-x-4 mt-8">
                    {isSignUp && currentStep > 1 && (
                      <Button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-lg font-medium transition-all duration-300"
                      >
                        Previous
                      </Button>
                    )}

                    {isSignUp && currentStep < totalSteps ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid(currentStep)}
                        className="flex-1 bg-[#FDCC29] hover:bg-[#2D3748] disabled:bg-gray-400 disabled:cursor-not-allowed text-[#2D3748] hover:text-white py-4 rounded-lg font-medium transition-all duration-300"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={
                          loading || (isSignUp && !isStepValid(currentStep))
                        }
                        className="flex-1 bg-[#FDCC29] hover:bg-[#2D3748] disabled:bg-gray-400 disabled:cursor-not-allowed text-[#2D3748] hover:text-white py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
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
                    )}
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    {isSignUp
                      ? "Already have an account?"
                      : "Don't have an account?"}{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-[#FDCC29] hover:text-[#2D3748] font-medium"
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
        <div className="flex-1 bg-[#FDCC29] relative overflow-hidden hidden lg:flex">
          {/* Decorative Circles - matching landing page style */}
          <div className="absolute inset-0">
            <div className="absolute top-4 left-8 w-16 h-16 bg-[#061F59] rounded-full opacity-20"></div>
            <div className="absolute top-8 left-16 w-8 h-8 bg-[#061F59] rounded-full opacity-30"></div>
            <div className="absolute bottom-6 left-12 w-12 h-12 bg-[#061F59] rounded-full opacity-25"></div>
            <div className="absolute top-6 right-12 w-10 h-10 bg-[#061F59] rounded-full opacity-20"></div>
            <div className="absolute bottom-8 right-8 w-6 h-6 bg-[#061F59] rounded-full opacity-30"></div>
            <div className="absolute top-1/2 right-16 w-14 h-14 bg-[#061F59] rounded-full opacity-15"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 flex flex-col justify-center h-full p-12 text-[#061F59]"
          >
            <div className="max-w-lg">
              <h2
                className="text-4xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                Unlock Your Business Potential
              </h2>
              <p
                className="text-lg text-[#061F59]/80 mb-8 leading-relaxed"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                Access comprehensive business plans, market research, and
                funding guides for thousands of profitable business ideas.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#061F59] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <img
                      src="/file.svg"
                      alt="Document"
                      className="w-4 h-4"
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                      }}
                    />
                  </div>
                  <p className="text-[#061F59]/90">
                    Detailed market analysis and growth projections
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#061F59] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-[#061F59]/90">
                    Investment breakdowns and funding options
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#061F59] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <img src="/bulb.png" alt="Lightbulb" className="w-4 h-4" />
                  </div>
                  <p className="text-[#061F59]/90">
                    Expert guidance and business plan templates
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#061F59] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <img src="/globe.svg" alt="Global" className="w-4 h-4" />
                  </div>
                  <p className="text-[#061F59]/90">
                    Government schemes and subsidy information
                  </p>
                </div>
              </div>

              {/* Featured Business Ideas Card */}
              <Card className="bg-white/90 border border-[#061F59]/20 shadow-lg">
                <CardContent className="p-6">
                  <h3
                    className="text-xl font-semibold text-[#061F59] mb-2"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    Featured Business Ideas
                  </h3>
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span
                      className="text-3xl font-bold text-[#FDCC29]"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      10,000+
                    </span>
                    <span className="text-[#061F59]/70">ideas</span>
                  </div>
                  <p className="text-[#061F59]/80 text-sm">
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
