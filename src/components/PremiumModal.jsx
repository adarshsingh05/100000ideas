import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Star,
  Zap,
  Shield,
  Users,
  ArrowRight,
  X,
  Check,
} from "lucide-react";

const PremiumModal = ({ isOpen, onClose }) => {
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribing(true);
    // Simulate subscription process
    setTimeout(() => {
      window.location.href = "/subscribe";
    }, 500);
  };

  const features = [
    {
      icon: Zap,
      title: "Unlimited Access",
      description: "View all business ideas without restrictions",
    },
    {
      icon: Star,
      title: "Premium Content",
      description: "Exclusive high-value business opportunities",
    },
    {
      icon: Shield,
      title: "Priority Support",
      description: "24/7 expert guidance and mentorship",
    },
    {
      icon: Users,
      title: "Community Access",
      description: "Connect with successful entrepreneurs",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-[#0A0F1F] via-[#1E1B4B] to-[#0A0F1F] border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500/20 rounded-full animate-pulse"></div>
            <div
              className="absolute top-8 -right-8 w-16 h-16 bg-purple-400/30 rounded-full animate-bounce"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute -bottom-6 left-1/4 w-20 h-20 bg-purple-500/15 rounded-full animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative z-10">
            {/* Header */}
            <DialogHeader className="text-center mb-6">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Crown className="w-6 h-6 text-white" />
                </div>
              </div>

              <DialogTitle className="text-2xl font-light text-white mb-2 tracking-tight">
                Unlock Premium Access
              </DialogTitle>

              <DialogDescription className="text-base text-gray-300 font-light leading-relaxed max-w-md mx-auto">
                You've reached your free limit of 10 business ideas. Upgrade to
                Premium for unlimited access to our complete library.
              </DialogDescription>

              <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-3 py-1.5 text-xs font-light tracking-wide mt-3">
                Limited Time Offer
              </Badge>
            </DialogHeader>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-purple-500/20 rounded-md flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-xs mb-1 tracking-wide">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-xs font-light leading-snug">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pricing */}
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-purple-500/20 to-purple-700/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-3xl font-light text-white">₹999</span>
                  <span className="text-base text-gray-400 line-through">
                    ₹2999
                  </span>
                </div>
                <p className="text-gray-300 text-xs font-light mb-3">
                  One-time payment • Lifetime access
                </p>
                <div className="flex items-center justify-center space-x-2 text-green-400 text-xs">
                  <Check className="w-3 h-3" />
                  <span>67% OFF - Limited Time</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button
                onClick={handleSubscribe}
                disabled={isSubscribing}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-light tracking-wide py-3 px-6 rounded-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 text-base"
              >
                {isSubscribing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Crown className="w-4 h-4" />
                    <span>Upgrade to Premium</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>

              <p className="text-gray-400 text-xs font-light mt-3">
                30-day money-back guarantee • Secure payment
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
