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
      <DialogContent className="max-w-2xl bg-white border-2 border-[#061F59] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#061F59] hover:text-[#FDCC29] transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative">
          {/* Header */}
          <DialogHeader className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-[#061F59] rounded-xl flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-[#FDCC29]" />
              </div>
            </div>

            <DialogTitle className="text-2xl font-bold text-[#061F59] mb-2 tracking-tight">
              Unlock Premium Access
            </DialogTitle>

            <DialogDescription className="text-base text-gray-600 leading-relaxed max-w-md mx-auto">
              You've reached your free limit of 5 featured ideas. Upgrade to
              Premium for unlimited access to our complete library.
            </DialogDescription>

            <Badge className="bg-[#FDCC29] text-[#061F59] px-3 py-1.5 text-xs font-bold tracking-wide mt-3">
              Limited Time Offer
            </Badge>
          </DialogHeader>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#061F59] transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-[#061F59] rounded-md flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-4 h-4 text-[#FDCC29]" />
                  </div>
                  <div>
                    <h3 className="text-[#061F59] font-semibold text-sm mb-1 tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-snug">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pricing */}
          <div className="text-center mb-6">
            <div className="bg-[#FDCC29] rounded-xl p-6 border-2 border-[#061F59]">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-3xl font-bold text-[#061F59]">₹999</span>
                <span className="text-base text-gray-500 line-through">
                  ₹2999
                </span>
              </div>
              <p className="text-[#061F59] text-sm font-medium mb-3">
                One-time payment • Lifetime access
              </p>
              <div className="flex items-center justify-center space-x-2 text-[#061F59] text-sm font-semibold">
                <Check className="w-4 h-4" />
                <span>67% OFF - Limited Time</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              onClick={handleSubscribe}
              disabled={isSubscribing}
              className="w-full bg-[#061F59] hover:bg-[#FDCC29] text-[#FDCC29] hover:text-[#061F59] font-bold tracking-wide py-4 px-6 rounded-lg shadow-lg transition-all duration-300 text-base border-2 border-[#061F59] hover:border-[#FDCC29]"
            >
              {isSubscribing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-[#FDCC29]/30 border-t-[#FDCC29] rounded-full animate-spin"></div>
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

            <p className="text-gray-500 text-xs font-medium mt-3">
              30-day money-back guarantee • Secure payment
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
