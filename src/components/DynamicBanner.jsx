"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";
import { bannerService } from "@/lib/bannerService";

export default function DynamicBanner() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      console.log("Fetching banners...");
      const response = await bannerService.getActiveBanners();
      console.log("Banner API response:", response);
      if (response.success) {
        setBanners(response.data.banners);
        console.log("Banners set:", response.data.banners);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      setLoading(false);
    }
  };

  const nextBanner = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (loading) {
    return (
      <div className="relative w-full">
        <div className="bg-gradient-to-br from-[#061F59] to-[#0A2A6B] rounded-3xl p-6 lg:p-8 shadow-2xl border border-[#FDCC29]/20 overflow-hidden relative min-h-[280px] lg:min-h-[350px] w-full ring-1 ring-[#FDCC29]/10 animate-pulse">
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-lg">Loading banner...</div>
          </div>
        </div>
      </div>
    );
  }

  if (banners.length === 0) {
    // Fallback banner if no banners in database
    return (
      <div className="relative w-full">
        <div className="bg-gradient-to-br from-[#061F59] to-[#0A2A6B] rounded-3xl p-6 lg:p-8 shadow-2xl border border-[#FDCC29]/20 overflow-hidden relative min-h-[280px] lg:min-h-[350px] w-full ring-1 ring-[#FDCC29]/10">
          {/* Decorative Spotlights */}
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#FDCC29]/15 to-transparent"></div>
          <div className="absolute top-2 left-4 w-12 h-12 bg-[#FDCC29]/20 rounded-full blur-sm"></div>
          <div className="absolute top-2 right-4 w-12 h-12 bg-[#FDCC29]/20 rounded-full blur-sm"></div>

          {/* Additional Decorative Elements */}
          <div className="absolute top-6 left-1/4 w-2 h-2 bg-[#FDCC29]/40 rounded-full"></div>
          <div className="absolute top-12 right-1/3 w-1.5 h-1.5 bg-[#FDCC29]/30 rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-[#FDCC29]/25 rounded-full"></div>
          <div className="absolute bottom-16 right-1/4 w-2.5 h-2.5 bg-[#FDCC29]/35 rounded-full"></div>

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-px bg-[#FDCC29]"></div>
            <div className="absolute top-8 left-0 w-full h-px bg-[#FDCC29]"></div>
            <div className="absolute top-16 left-0 w-full h-px bg-[#FDCC29]"></div>
            <div className="absolute top-24 left-0 w-full h-px bg-[#FDCC29]"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
            {/* Logo Section */}
            <div className="mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-xl sm:text-2xl font-bold text-[#FDCC29]">
                  10000
                </span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#FDCC29] rounded-full flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-[#061F59]" />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-[#FDCC29]">
                  IDEA
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="mb-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                <span className="text-white">WELCOME</span>
                <span className="text-[#FDCC29]">DAY</span>
              </h2>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                MANIA
              </h3>
            </div>

            {/* Sub-headline */}
            <p className="text-white text-base sm:text-lg lg:text-xl mb-8 leading-relaxed max-w-2xl">
              Collect your First day rewards at Reward Shelf
            </p>

            {/* CTA Button */}
            <Button
              onClick={() => (window.location.href = "/ideas")}
              className="bg-[#FDCC29] hover:bg-[#FDCC29]/90 text-[#061F59] px-8 py-4 text-base sm:text-lg font-bold rounded-xl shadow-xl transition-all duration-300 hover:scale-105 border-2 border-[#061F59]/20"
            >
              Earn My Icoins
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Bottom Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#FDCC29]/10 to-transparent"></div>
        </div>
      </div>
    );
  }

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative w-full">
      <div
        className="rounded-3xl p-6 lg:p-8 shadow-xl border border-[#FDCC29]/20 overflow-hidden relative min-h-[280px] lg:min-h-[350px] w-full ring-1 ring-[#FDCC29]/10"
        style={{
          backgroundImage: currentBanner.backgroundImage
            ? `linear-gradient(rgba(6, 31, 89, 0.8), rgba(10, 42, 107, 0.8)), url(${currentBanner.backgroundImage})`
            : "linear-gradient(to bottom right, #061F59, #0A2A6B)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Decorative Spotlights */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#FDCC29]/15 to-transparent"></div>
        <div className="absolute top-2 left-4 w-12 h-12 bg-[#FDCC29]/20 rounded-full blur-sm"></div>
        <div className="absolute top-2 right-4 w-12 h-12 bg-[#FDCC29]/20 rounded-full blur-sm"></div>

        {/* Additional Decorative Elements */}
        <div className="absolute top-6 left-1/4 w-2 h-2 bg-[#FDCC29]/40 rounded-full"></div>
        <div className="absolute top-12 right-1/3 w-1.5 h-1.5 bg-[#FDCC29]/30 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-[#FDCC29]/25 rounded-full"></div>
        <div className="absolute bottom-16 right-1/4 w-2.5 h-2.5 bg-[#FDCC29]/35 rounded-full"></div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-px bg-[#FDCC29]"></div>
          <div className="absolute top-8 left-0 w-full h-px bg-[#FDCC29]"></div>
          <div className="absolute top-16 left-0 w-full h-px bg-[#FDCC29]"></div>
          <div className="absolute top-24 left-0 w-full h-px bg-[#FDCC29]"></div>
        </div>

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={prevBanner}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-[#FDCC29]/20 hover:bg-[#FDCC29]/40 text-white p-2.5 rounded-full transition-all duration-300 z-20 backdrop-blur-sm border border-[#FDCC29]/30 hover:scale-110"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextBanner}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#FDCC29]/20 hover:bg-[#FDCC29]/40 text-white p-2.5 rounded-full transition-all duration-300 z-20 backdrop-blur-sm border border-[#FDCC29]/30 hover:scale-110"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {banners.length > 1 && (
          <div className="absolute top-3 right-4 flex space-x-2 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentIndex
                    ? "bg-[#FDCC29] shadow-lg shadow-[#FDCC29]/50"
                    : "bg-[#FDCC29]/60 hover:bg-[#FDCC29]/80"
                }`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center justify-center h-full text-center"
          >
            {/* Logo Section */}
            <div className="mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-xl sm:text-2xl font-bold text-[#FDCC29]">
                  10000
                </span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#FDCC29] rounded-full flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-[#061F59]" />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-[#FDCC29]">
                  IDEA
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="mb-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                {currentBanner.title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-white text-base sm:text-lg lg:text-xl mb-8 leading-relaxed max-w-2xl">
              {currentBanner.description}
            </p>

            {/* CTA Button */}
            <Button
              onClick={() => (window.location.href = currentBanner.redirectUrl)}
              className="bg-[#FDCC29] hover:bg-[#FDCC29]/90 text-[#061F59] px-8 py-4 text-base sm:text-lg font-bold rounded-xl shadow-xl transition-all duration-300 hover:scale-105 border-2 border-[#061F59]/20"
            >
              {currentBanner.buttonText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#FDCC29]/10 to-transparent"></div>
      </div>
    </div>
  );
}
