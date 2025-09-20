// Banner service for handling banner-related API calls
import apiClient from "./api";

export const bannerService = {
  // Get all active banners
  async getActiveBanners() {
    try {
      const response = await apiClient.get("/banners?active=true");
      return response;
    } catch (error) {
      console.error("Error fetching active banners:", error);
      throw error;
    }
  },

  // Get all banners (admin)
  async getAllBanners() {
    try {
      const response = await apiClient.get("/banners");
      return response;
    } catch (error) {
      console.error("Error fetching all banners:", error);
      throw error;
    }
  },

  // Create new banner
  async createBanner(bannerData) {
    try {
      const response = await apiClient.post("/banners", bannerData);
      return response;
    } catch (error) {
      console.error("Error creating banner:", error);
      throw error;
    }
  },

  // Update banner
  async updateBanner(bannerId, bannerData) {
    try {
      const response = await apiClient.put(`/banners/${bannerId}`, bannerData);
      return response;
    } catch (error) {
      console.error("Error updating banner:", error);
      throw error;
    }
  },

  // Delete banner
  async deleteBanner(bannerId) {
    try {
      const response = await apiClient.delete(`/banners/${bannerId}`);
      return response;
    } catch (error) {
      console.error("Error deleting banner:", error);
      throw error;
    }
  },

  // Get single banner
  async getBannerById(bannerId) {
    try {
      const response = await apiClient.get(`/banners/${bannerId}`);
      return response;
    } catch (error) {
      console.error("Error fetching banner:", error);
      throw error;
    }
  },
};

export default bannerService;
