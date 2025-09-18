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
  const { isAuthenticated, user, logout, loading } = useAuth();
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
    <nav
      className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      style={{ fontFamily: "Nunito, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img
                src="/pureyellowlogo.png"
                alt="10000Ideas Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/ideas"
              className="text-[#061F59] hover:text-[#FDCC29] transition-colors font-semibold text-base"
            >
              Ideas
            </a>
            <a
              href="/categories"
              className="text-[#061F59] hover:text-[#FDCC29] transition-colors font-semibold text-base"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-[#061F59] hover:text-[#FDCC29] transition-colors font-semibold text-base"
            >
              About
            </a>

            {loading ? (
              // Skeleton Loading for Desktop
              <div className="flex items-center space-x-3 p-2">
                <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="hidden lg:block space-y-1">
                  <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-2 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#FDCC29]/10 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 bg-[#061F59] rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                    <img
                      src="/profileicon.png"
                      alt="Profile"
                      className="w-5 h-5 object-cover rounded-full text-white bg-white"
                    />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-[#061F59] font-semibold text-sm">
                      {user?.name || "User"}
                    </p>
                    <p className="text-[#061F59]/70 text-xs">View Profile</p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#061F59] transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-[#061F59] font-semibold text-sm">
                        {user?.name || "User"}
                      </p>
                      <p className="text-[#061F59]/60 text-xs">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>

                    <div className="py-2">
                      <a
                        href="/profile"
                        className="w-full flex items-center space-x-3 px-4 py-3 text-[#061F59] hover:bg-[#FDCC29]/10 transition-colors duration-200"
                      >
                        <UserCircle className="w-5 h-5 text-[#FDCC29]" />
                        <span className="font-medium">My Profile</span>
                      </a>

                      <a
                        href="/your-ideas"
                        className="w-full flex items-center space-x-3 px-4 py-3 text-[#061F59] hover:bg-[#FDCC29]/10 transition-colors duration-200"
                      >
                        <Lightbulb className="w-5 h-5 text-[#FDCC29]" />
                        <span className="font-medium">Your Ideas</span>
                      </a>

                      <button className="w-full flex items-center space-x-3 px-4 py-3 text-[#061F59] hover:bg-[#FDCC29]/10 transition-colors duration-200">
                        <Bookmark className="w-5 h-5 text-[#FDCC29]" />
                        <span className="font-medium">My Saved Ideas</span>
                      </button>

                      <button className="w-full flex items-center space-x-3 px-4 py-3 text-[#061F59] hover:bg-[#FDCC29]/10 transition-colors duration-200">
                        <Settings className="w-5 h-5 text-[#FDCC29]" />
                        <span className="font-medium">Settings</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={() => {
                          window.location.href = "/admin";
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Are you admin?</span>
                      </button>

                      <div className="border-t border-gray-100 my-2"></div>

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
                className="bg-[#FDCC29] hover:bg-[#061F59] text-[#061F59] hover:text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300"
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-[#061F59] hover:text-[#FDCC29] transition-colors"
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
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/ideas"
                className="block px-3 py-3 text-[#061F59] hover:text-[#FDCC29] hover:bg-[#FDCC29]/10 transition-colors font-semibold rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ideas
              </a>
              <a
                href="/categories"
                className="block px-3 py-3 text-[#061F59] hover:text-[#FDCC29] hover:bg-[#FDCC29]/10 transition-colors font-semibold rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </a>
              <a
                href="#"
                className="block px-3 py-3 text-[#061F59] hover:text-[#FDCC29] hover:bg-[#FDCC29]/10 transition-colors font-semibold rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>

              {loading ? (
                // Skeleton Loading for Mobile
                <div className="px-3 py-2 border-t border-gray-200 mt-2">
                  <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                    <div className="w-full h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                    <div className="w-full h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              ) : isAuthenticated ? (
                <div className="px-3 py-2 border-t border-gray-200 mt-2">
                  <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-[#061F59] rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                      <img
                        src="/profileicon.png"
                        alt="Profile"
                        className="w-8 h-8 object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-[#061F59] font-semibold text-sm">
                        {user?.name || "User"}
                      </p>
                      <p className="text-[#061F59]/70 text-xs">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href="/profile"
                      className="w-full flex items-center space-x-3 px-3 py-3 text-[#061F59] hover:bg-[#FDCC29]/10 rounded-lg transition-colors duration-200"
                    >
                      <UserCircle className="w-5 h-5 text-[#FDCC29]" />
                      <span className="font-medium">My Profile</span>
                    </a>

                    <a
                      href="/your-ideas"
                      className="w-full flex items-center space-x-3 px-3 py-3 text-[#061F59] hover:bg-[#FDCC29]/10 rounded-lg transition-colors duration-200"
                    >
                      <Lightbulb className="w-5 h-5 text-[#FDCC29]" />
                      <span className="font-medium">Your Ideas</span>
                    </a>

                    <button className="w-full flex items-center space-x-3 px-3 py-3 text-[#061F59] hover:bg-[#FDCC29]/10 rounded-lg transition-colors duration-200">
                      <Bookmark className="w-5 h-5 text-[#FDCC29]" />
                      <span className="font-medium">My Saved Ideas</span>
                    </button>

                    <button className="w-full flex items-center space-x-3 px-3 py-3 text-[#061F59] hover:bg-[#FDCC29]/10 rounded-lg transition-colors duration-200">
                      <Settings className="w-5 h-5 text-[#FDCC29]" />
                      <span className="font-medium">Settings</span>
                    </button>

                    <div className="border-t border-gray-200 my-2"></div>

                    <button
                      onClick={() => {
                        window.location.href = "/admin";
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">Are you admin?</span>
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
                <div className="px-3 py-2 border-t border-gray-200 mt-2">
                  <Button
                    onClick={() => {
                      window.location.href = "/auth";
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#FDCC29] hover:bg-[#061F59] text-[#061F59] hover:text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
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
