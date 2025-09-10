"use client";

import { useState } from "react";
import { Lightbulb, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0F1F]/95 backdrop-blur-sm border-b border-[#10B981]/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center shadow-lg">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-light text-white tracking-wide">
                10000Ideas
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-[#A0AEC0] hover:text-[#10B981] transition-colors font-light tracking-wide"
            >
              Ideas
            </a>
            <a
              href="#"
              className="text-[#A0AEC0] hover:text-[#10B981] transition-colors font-light tracking-wide"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-[#A0AEC0] hover:text-[#10B981] transition-colors font-light tracking-wide"
            >
              About
            </a>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-medium text-lg">
                    {user?.name?.charAt(0)?.toUpperCase() || (
                      <User className="w-5 h-5" />
                    )}
                  </span>
                </div>
                <span className="text-white font-light tracking-wide">
                  {user?.name || "User"}
                </span>
                <button
                  onClick={logout}
                  className="p-2 text-[#A0AEC0] hover:text-[#10B981] hover:bg-[#10B981]/10 rounded-lg transition-all duration-300 group"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Button
                onClick={() => (window.location.href = "/auth")}
                className="bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2 rounded-lg font-light tracking-wide shadow-lg"
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-[#A0AEC0] hover:text-[#10B981] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#10B981]/20 bg-[#0A0F1F]/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 text-[#A0AEC0] hover:text-[#10B981] transition-colors font-light tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ideas
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-[#A0AEC0] hover:text-[#10B981] transition-colors font-light tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-[#A0AEC0] hover:text-[#10B981] transition-colors font-light tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>

              {isAuthenticated ? (
                <div className="px-3 py-2 border-t border-[#10B981]/20 mt-2">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-medium text-sm">
                        {user?.name?.charAt(0)?.toUpperCase() || (
                          <User className="w-4 h-4" />
                        )}
                      </span>
                    </div>
                    <span className="text-white font-light tracking-wide text-sm">
                      {user?.name || "User"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-[#A0AEC0] hover:text-[#10B981] hover:bg-[#10B981]/10 rounded-lg transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="px-3 py-2 border-t border-[#10B981]/20 mt-2">
                  <Button
                    onClick={() => {
                      window.location.href = "/auth";
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2 rounded-lg font-light tracking-wide shadow-lg"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
