// Ideas service for handling idea-related API calls
import apiClient from "./api";

export const ideasService = {
  // Get user's ideas
  async getUserIdeas(userId, status = "published") {
    try {
      const response = await apiClient.get(
        `/ideas?userId=${userId}&status=${status}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching user ideas:", error);
      throw error;
    }
  },

  // Create a new idea
  async createIdea(ideaData) {
    try {
      const response = await apiClient.post("/ideas", ideaData);
      return response;
    } catch (error) {
      console.error("Error creating idea:", error);
      throw error;
    }
  },

  // Get all published ideas (for home page)
  async getAllIdeas(page = 1, limit = 10, category = null) {
    try {
      let url = `/ideas/all?page=${page}&limit=${limit}`;
      if (category) {
        url += `&category=${category}`;
      }
      const response = await apiClient.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching all ideas:", error);
      throw error;
    }
  },

  // Get single idea by ID
  async getIdeaById(ideaId) {
    try {
      const response = await apiClient.get(`/ideas/${ideaId}`);
      return response;
    } catch (error) {
      console.error("Error fetching idea:", error);
      throw error;
    }
  },

  // Update idea
  async updateIdea(ideaId, ideaData) {
    try {
      const response = await apiClient.put(`/ideas/${ideaId}`, ideaData);
      return response;
    } catch (error) {
      console.error("Error updating idea:", error);
      throw error;
    }
  },

  // Delete idea
  async deleteIdea(ideaId) {
    try {
      const response = await apiClient.delete(`/ideas/${ideaId}`);
      return response;
    } catch (error) {
      console.error("Error deleting idea:", error);
      throw error;
    }
  },

  // Update idea
  async updateIdea(ideaId, ideaData) {
    try {
      const response = await apiClient.put(`/ideas/${ideaId}`, ideaData);
      return response;
    } catch (error) {
      console.error("Error updating idea:", error);
      throw error;
    }
  },

  // Get static ideas (migrated from JSON)
  async getStaticIdeas(page = 1, limit = 10, category = null, search = null) {
    try {
      let url = `/ideas/static?page=${page}&limit=${limit}`;
      if (category) {
        url += `&category=${category}`;
      }
      if (search) {
        url += `&search=${search}`;
      }
      const response = await apiClient.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching static ideas:", error);
      throw error;
    }
  },

  // Get featured ideas for carousel (random mix of static and community ideas)
  async getFeaturedIdeas(limit = 8) {
    try {
      const response = await apiClient.get(`/ideas/featured?limit=${limit}`);
      return response;
    } catch (error) {
      console.error("Error fetching featured ideas:", error);
      throw error;
    }
  },

  // Get featured static ideas for carousel (legacy method)
  async getFeaturedStaticIdeas(limit = 8) {
    try {
      const response = await apiClient.post("/ideas/static", { limit });
      return response;
    } catch (error) {
      console.error("Error fetching featured static ideas:", error);
      throw error;
    }
  },

  // Get community ideas only (excludes admin/migrated ideas)
  async getCommunityIdeas(
    page = 1,
    limit = 10,
    category = null,
    search = null
  ) {
    try {
      let url = `/community-ideas?page=${page}&limit=${limit}`;
      if (category) {
        url += `&category=${category}`;
      }
      if (search) {
        url += `&search=${search}`;
      }
      const response = await apiClient.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching community ideas:", error);
      throw error;
    }
  },
};

export default ideasService;
