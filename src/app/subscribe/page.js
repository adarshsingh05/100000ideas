"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Crown,
  Star,
  Zap,
  Shield,
  Users,
  Check,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  Globe,
  Lock,
} from "lucide-react";

const SubscribePage = () => {
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [isProcessing, setIsProcessing] = useState(false);

  const features = [
    {
      icon: Zap,
      title: "Unlimited Access",
      description: "View all 10,000+ business ideas without restrictions",
    },
    {
      icon: Star,
      title: "Premium Content",
      description: "Exclusive high-value business opportunities and insights",
    },
    {
      icon: Shield,
      title: "Priority Support",
      description: "24/7 expert guidance and mentorship from industry leaders",
    },
    {
      icon: Users,
      title: "Community Access",
      description: "Connect with successful entrepreneurs and investors",
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Detailed market research and trend analysis reports",
    },
    {
      icon: Award,
      title: "Success Stories",
      description: "Real case studies and implementation guides",
    },
  ];

  const plans = [
    {
      id: "premium",
      name: "Premium",
      price: "₹999",
      originalPrice: "₹2999",
      period: "Lifetime",
      description: "One-time payment for lifetime access",
      features: [
        "Unlimited business idea access",
        "Premium content library",
        "Priority customer support",
        "Community access",
        "Market analysis reports",
        "Success story case studies",
      ],
      popular: true,
      color: "from-purple-500 to-purple-700",
    },
  ];

  const handleSubscribe = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      alert("Payment processed successfully! You now have premium access.");
      // In a real app, you'd redirect to a success page or update user state
      window.location.href = "/";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1F] via-[#1E1B4B] to-[#0A0F1F]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/30">
                <Crown className="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 className="text-5xl font-light text-white mb-4 leading-tight tracking-tight">
              Unlock Premium Access
            </h1>

            <p className="text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-6">
              Get unlimited access to our complete library of business ideas,
              premium content, and exclusive resources to accelerate your
              entrepreneurial journey.
            </p>

            <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 text-lg font-light tracking-wide shadow-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Limited Time Offer - 67% OFF
            </Badge>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-white mb-4 tracking-tight">
              What You Get
            </h2>
            <p className="text-gray-300 font-light text-lg">
              Everything you need to start and grow your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-lg mb-2 tracking-wide">
                            {feature.title}
                          </h3>
                          <p className="text-gray-400 text-sm font-light leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-white mb-4 tracking-tight">
              Choose Your Plan
            </h2>
            <p className="text-gray-300 font-light text-lg">
              Simple, transparent pricing with no hidden fees
            </p>
          </motion.div>

          <div className="flex justify-center">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 text-sm font-light shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card
                  className={`w-96 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-2 ${
                    plan.popular
                      ? "border-purple-500/50 shadow-2xl shadow-purple-500/20"
                      : "border-purple-500/20"
                  } transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20`}
                >
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-light text-white mb-2 tracking-wide">
                      {plan.name}
                    </CardTitle>
                    <div className="mb-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-5xl font-light text-white">
                          {plan.price}
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                          {plan.originalPrice}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm font-light">
                        {plan.period}
                      </p>
                      <p className="text-gray-400 text-xs font-light mt-1">
                        {plan.description}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-3"
                        >
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm font-light">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={handleSubscribe}
                      disabled={isProcessing}
                      className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-light tracking-wide py-4 px-8 rounded-xl shadow-lg transition-all duration-300 text-lg`}
                    >
                      {isProcessing ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Lock className="w-5 h-5" />
                          <span>Get Premium Access</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center space-x-3">
                <Shield className="w-8 h-8 text-green-400" />
                <div className="text-left">
                  <p className="text-white font-medium text-sm">
                    30-Day Guarantee
                  </p>
                  <p className="text-gray-400 text-xs font-light">
                    Money-back guarantee
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <Globe className="w-8 h-8 text-blue-400" />
                <div className="text-left">
                  <p className="text-white font-medium text-sm">
                    Secure Payment
                  </p>
                  <p className="text-gray-400 text-xs font-light">
                    SSL encrypted
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <Users className="w-8 h-8 text-purple-400" />
                <div className="text-left">
                  <p className="text-white font-medium text-sm">
                    10,000+ Users
                  </p>
                  <p className="text-gray-400 text-xs font-light">
                    Trusted by entrepreneurs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default SubscribePage;
