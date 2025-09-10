"use client";

import { Lightbulb, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-50 bg-[#0A0F1F]/95 backdrop-blur-sm border-b border-[#10B981]/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center shadow-lg">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-light text-white tracking-wide">
                10000Ideas
              </span>
            </div>
          </div>

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
              <div className="flex items-center space-x-4">
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
        </div>
      </div>
    </nav>
  );
}
