"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ideasService } from "@/lib/ideasService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Lightbulb,
  Plus,
  Eye,
  Heart,
  Calendar,
  DollarSign,
  Users,
  Target,
  Clock,
  MapPin,
  Edit,
  Trash2,
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import IdeaUploadModal from "@/components/IdeaUploadModal";
import IdeaViewModal from "@/components/IdeaViewModal";

export default function YourIdeasPage() {
  const { isAuthenticated, user } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [ideaToDelete, setIdeaToDelete] = useState(null);
  const [filterStatus, setFilterStatus] = useState("published");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const ideasPerPage = 6; // 3x2 grid

  // Fetch user's ideas
  const fetchIdeas = async () => {
    if (!user?.id && !user?._id) return;

    try {
      setLoading(true);
      const userId = user?.id || user?._id;
      const response = await ideasService.getUserIdeas(userId, filterStatus);

      if (response.success) {
        setIdeas(response.ideas);
      }
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchIdeas();
    }
  }, [isAuthenticated, user, filterStatus]);

  // Reset to first page when search term or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  // Handle idea creation
  const handleIdeaCreated = (newIdea) => {
    setIdeas((prev) => [newIdea, ...prev]);
    setIsUploadModalOpen(false);
    setMessage({ type: "success", text: "Idea uploaded successfully!" });
  };

  // Handle view idea
  const handleViewIdea = (idea) => {
    setSelectedIdea(idea);
    setIsViewModalOpen(true);
  };

  // Handle edit idea
  const handleEditIdea = (idea) => {
    setSelectedIdea(idea);
    setIsEditModalOpen(true);
  };

  // Handle delete idea
  const handleDeleteIdea = (idea) => {
    setIdeaToDelete(idea);
    setIsDeleteConfirmOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!ideaToDelete) return;

    try {
      const response = await ideasService.deleteIdea(ideaToDelete._id);

      if (response.success) {
        setIdeas((prev) =>
          prev.filter((idea) => idea._id !== ideaToDelete._id)
        );
        setMessage({ type: "success", text: "Idea deleted successfully!" });
        setIsDeleteConfirmOpen(false);
        setIdeaToDelete(null);
      } else {
        throw new Error(response.message || "Failed to delete idea");
      }
    } catch (error) {
      console.error("Error deleting idea:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to delete idea",
      });
    }
  };

  // Handle idea updated
  const handleIdeaUpdated = (updatedIdea) => {
    setIdeas((prev) =>
      prev.map((idea) => (idea._id === updatedIdea._id ? updatedIdea : idea))
    );
    setIsEditModalOpen(false);
    setMessage({ type: "success", text: "Idea updated successfully!" });
  };

  // Filter ideas based on search term
  const filteredIdeas = ideas.filter(
    (idea) =>
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredIdeas.length / ideasPerPage);
  const startIndex = (currentPage - 1) * ideasPerPage;
  const endIndex = startIndex + ideasPerPage;
  const currentIdeas = filteredIdeas.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the ideas section
    const element = document.getElementById("ideas-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Please log in to view your ideas
            </h1>
            <Button asChild>
              <a href="/auth">Login</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <Navbar />

      {/* Toast Notification */}
      {message.text && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full mx-4 ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          } rounded-lg shadow-sm animate-in slide-in-from-top-2 duration-300`}
        >
          <div className="p-3 flex items-center space-x-2">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                message.type === "success" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-3 h-3 text-green-600" />
              ) : (
                <AlertCircle className="w-3 h-3 text-red-600" />
              )}
            </div>
            <p className="text-sm font-medium flex-1">{message.text}</p>
            <button
              onClick={() => setMessage({ type: "", text: "" })}
              className="w-4 h-4 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#B8860B]/10 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-[#B8860B]" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Your Ideas
                </h1>
                <p className="text-sm text-gray-500">
                  Manage and showcase your business ideas
                </p>
              </div>
            </div>

            <Button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload Idea
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search your ideas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#B8860B]/20 focus:border-[#B8860B] transition-colors"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 flex-shrink-0">
              {["published", "draft", "archived"].map((status) => (
                <Button
                  key={status}
                  variant={filterStatus === status ? "default" : "outline"}
                  onClick={() => setFilterStatus(status)}
                  className={`capitalize ${
                    filterStatus === status
                      ? "bg-[#B8860B] text-white"
                      : "text-gray-600 border-gray-200"
                  }`}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Ideas Grid */}
        <div id="ideas-section">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B8860B]"></div>
            </div>
          ) : filteredIdeas.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No ideas found
              </h3>
              <p className="text-gray-500 mb-4 text-sm">
                {searchTerm
                  ? "No ideas match your search criteria."
                  : `You haven't uploaded any ${filterStatus} ideas yet.`}
              </p>
              <Button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-white text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Upload Your First Idea
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {currentIdeas.map((idea, index) => {
                console.log("Rendering idea:", idea._id, idea.title);
                return (
                  <motion.div
                    key={idea._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                              {idea.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant="secondary"
                                className="bg-[#B8860B]/10 text-[#B8860B] border-[#B8860B]/20"
                              >
                                {idea.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {idea.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditIdea(idea)}
                              className="text-gray-400 hover:text-[#B8860B] hover:bg-[#B8860B]/10"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteIdea(idea)}
                              className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <CardDescription className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {idea.description}
                        </CardDescription>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <DollarSign className="w-4 h-4 mr-2" />
                            <span>{idea.investmentRange}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{idea.timeToStart}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{idea.marketSize}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-3">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              <span>{idea.views || 0}</span>
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              <span>{idea.likes || 0}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(idea.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            console.log(
                              "Button clicked! Opening:",
                              `/community-ideas/${idea._id}`
                            );
                            window.location.href = `/community-ideas/${idea._id}`;
                          }}
                          className="w-full bg-[#B8860B] hover:bg-[#B8860B]/90 text-white text-sm py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-1 sm:space-x-2 bg-white rounded-lg p-2 border border-gray-200 shadow-md max-w-full overflow-x-auto">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-transparent border-[#2D3748]/30 text-[#2D3748] disabled:opacity-50 disabled:cursor-not-allowed px-2 sm:px-3 py-2 font-medium text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    if (pageNum < 1 || pageNum > totalPages) return null;

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          pageNum === currentPage ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className={
                          pageNum === currentPage
                            ? "bg-[#2D3748] hover:bg-[#2D3748]/90 text-white border-[#2D3748] px-2 sm:px-3 py-2 font-light tracking-wide shadow-md text-xs sm:text-sm"
                            : "bg-transparent border-[#2D3748]/30 text-[#2D3748] px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-transparent border-[#2D3748]/30 text-[#2D3748] disabled:opacity-50 disabled:cursor-not-allowed px-2 sm:px-3 py-2 font-light tracking-wide text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                </Button>
              </div>
            </div>
          )}

          {/* Page Info */}
          {totalPages > 1 && (
            <div className="mt-4 text-center">
              <p className="text-[#2D3748] text-base font-bold tracking-wide">
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredIdeas.length)} of{" "}
                {filteredIdeas.length} ideas
                {searchTerm && (
                  <span className="text-gray-600">
                    {" "}
                    (filtered from {ideas.length} total)
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <IdeaUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onIdeaCreated={handleIdeaCreated}
        user={user}
      />

      {/* View Modal */}
      <IdeaViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        idea={selectedIdea}
      />

      {/* Edit Modal */}
      <IdeaUploadModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onIdeaCreated={handleIdeaUpdated}
        user={user}
        editIdea={selectedIdea}
        isEdit={true}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
              Delete Idea
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{ideaToDelete?.title}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
