"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Lock,
  Upload,
  Plus,
  Save,
  X,
  Lightbulb,
  FileText,
  Tag,
  DollarSign,
  Users,
  Calendar,
  Trash2,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { ideasService } from "@/lib/ideasService";
import AdminBannerManager from "@/components/AdminBannerManager";
import AdminIdeaManager from "@/components/AdminIdeaManager";

export default function AdminPage() {
  const router = useRouter();
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("ideas");

  // Check if already authenticated
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
    }
  }, []);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate password check
    if (password === "1234") {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      localStorage.setItem("adminAuth", "true");
    } else {
      setError("Invalid password. Please try again.");
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    setShowPasswordModal(true);
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white border border-gray-200 shadow-xl">
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#FDCC29] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#2D3748]" />
              </div>
              <h1 className="text-2xl font-bold text-[#2D3748] mb-2">
                Admin Access
              </h1>
              <p className="text-[#2D3748]/60">
                Enter admin password to continue
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="password"
                  className="text-[#2D3748] font-medium"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1 focus:ring-[#FDCC29]/20 focus:border-[#FDCC29]"
                  required
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FDCC29] hover:bg-[#FDCC29]/90 text-[#2D3748] font-semibold py-2"
              >
                {isLoading ? "Verifying..." : "Access Admin Panel"}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFCFC] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#FDCC29] rounded-full flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-[#2D3748]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#2D3748]">
                  Admin Panel
                </h1>
                <p className="text-[#2D3748]/60">
                  Manage ideas and banners for the platform
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("ideas")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === "ideas"
                  ? "bg-white text-[#2D3748] shadow-sm"
                  : "text-gray-600 hover:text-[#2D3748]"
              }`}
            >
              <Lightbulb className="w-4 h-4 inline mr-2" />
              Ideas Management
            </button>
            <button
              onClick={() => setActiveTab("banners")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === "banners"
                  ? "bg-white text-[#2D3748] shadow-sm"
                  : "text-gray-600 hover:text-[#2D3748]"
              }`}
            >
              <ImageIcon className="w-4 h-4 inline mr-2" />
              Banner Management
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "ideas" && <AdminIdeaManager />}

        {activeTab === "banners" && <AdminBannerManager />}
      </div>
    </div>
  );
}
