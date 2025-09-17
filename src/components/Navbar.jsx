"use client";

import { useState, useRef, useEffect } from "react";
import {
  Lightbulb,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Settings,
  Bookmark,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#B8860B] to-[#2D3748] backdrop-blur-sm border-b border-[#B8860B]/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logos.png"
                alt="10000Ideas Logo"
                className="w-8 h-8 sm:w-[200px] sm:h-[40px] object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-white hover:text-[#B8860B] transition-colors font-semibold tracking-wide text-base"
            >
              Ideas
            </a>
            <a
              href="/categories"
              className="text-white hover:text-[#B8860B] transition-colors font-semibold tracking-wide text-base"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-white hover:text-[#B8860B] transition-colors font-semibold tracking-wide text-base"
            >
              About
            </a>

            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#B8860B]/10 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-[#B8860B] rounded-full flex items-center justify-center shadow-lg border-2 border-white overflow-hidden">
                    <img
                      src="/profileicon.png"
                      alt="Profile"
                      className="w-8 h-8 object-cover rounded-full"
                    />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-white font-semibold text-sm">
                      {user?.name || "User"}
                    </p>
                    <p className="text-white/70 text-xs">View Profile</p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-white transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#B8860B]/20 py-2 z-50">
                    <div className="px-4 py-3 border-b border-[#B8860B]/10">
                      <p className="text-[#2D3748] font-semibold text-sm">
                        {user?.name || "User"}
                      </p>
                      <p className="text-[#2D3748]/60 text-xs">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>

                    <div className="py-2">
                      <a
                        href="/profile"
                        className="w-full flex items-center space-x-3 px-4 py-3 text-[#2D3748] hover:bg-[#B8860B]/10 transition-colors duration-200"
                      >
                        <UserCircle className="w-5 h-5 text-[#B8860B]" />
                        <span className="font-medium">My Profile</span>
                      </a>

                      <button className="w-full flex items-center space-x-3 px-4 py-3 text-[#2D3748] hover:bg-[#B8860B]/10 transition-colors duration-200">
                        <Bookmark className="w-5 h-5 text-[#B8860B]" />
                        <span className="font-medium">My Saved Ideas</span>
                      </button>

                      <button className="w-full flex items-center space-x-3 px-4 py-3 text-[#2D3748] hover:bg-[#B8860B]/10 transition-colors duration-200">
                        <Settings className="w-5 h-5 text-[#B8860B]" />
                        <span className="font-medium">Settings</span>
                      </button>
                    </div>

                    <div className="border-t border-[#B8860B]/10 py-2">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => (window.location.href = "/auth")}
                className="bg-[#B8860B] hover:bg-[#2D3748] text-white hover:text-white px-6 py-2 rounded-lg font-semibold tracking-wide shadow-lg transition-all duration-300"
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-white hover:text-[#B8860B] transition-colors"
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
          <div className="md:hidden border-t border-[#B8860B]/30 bg-gradient-to-r from-[#B8860B] to-[#2D3748] backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-3 text-white hover:text-[#B8860B] hover:bg-[#B8860B]/10 transition-colors font-semibold tracking-wide rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ideas
              </a>
              <a
                href="/categories"
                className="block px-3 py-3 text-white hover:text-[#B8860B] hover:bg-[#B8860B]/10 transition-colors font-semibold tracking-wide rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </a>
              <a
                href="#"
                className="block px-3 py-3 text-white hover:text-[#B8860B] hover:bg-[#B8860B]/10 transition-colors font-semibold tracking-wide rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>

              {isAuthenticated ? (
                <div className="px-3 py-2 border-t border-[#B8860B]/20 mt-2">
                  <div className="flex items-center space-x-3 mb-4 p-3 bg-[#B8860B]/10 rounded-lg">
                    <div className="w-10 h-10 bg-[#B8860B] rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                      <img
                        src="/profileicon.png"
                        alt="Profile"
                        className="w-8 h-8 object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {user?.name || "User"}
                      </p>
                      <p className="text-white/70 text-xs">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href="/profile"
                      className="w-full flex items-center space-x-3 px-3 py-3 text-white hover:bg-[#B8860B]/10 rounded-lg transition-colors duration-200"
                    >
                      <UserCircle className="w-5 h-5 text-[#B8860B]" />
                      <span className="font-medium">My Profile</span>
                    </a>

                    <button className="w-full flex items-center space-x-3 px-3 py-3 text-white hover:bg-[#B8860B]/10 rounded-lg transition-colors duration-200">
                      <Bookmark className="w-5 h-5 text-[#B8860B]" />
                      <span className="font-medium">My Saved Ideas</span>
                    </button>

                    <button className="w-full flex items-center space-x-3 px-3 py-3 text-white hover:bg-[#B8860B]/10 rounded-lg transition-colors duration-200">
                      <Settings className="w-5 h-5 text-[#B8860B]" />
                      <span className="font-medium">Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-3 py-2 border-t border-[#B8860B]/20 mt-2">
                  <Button
                    onClick={() => {
                      window.location.href = "/auth";
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#B8860B] hover:bg-[#2D3748] text-white hover:text-white py-3 rounded-lg font-semibold tracking-wide shadow-lg transition-all duration-300"
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
