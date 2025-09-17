// Profile service for handling profile-related API calls
import apiClient from "./api";

export const profileService = {
  // Get user profile
  async getProfile(userId) {
    try {
      const response = await apiClient.get(`/profile?userId=${userId}`);
      return response;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  // Update user profile
  async updateProfile(userId, profileData) {
    try {
      const response = await apiClient.put("/profile", {
        userId,
        profileData,
      });
      return response;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  // Update profile stats (for internal use)
  async updateProfileStats(userId, stats) {
    try {
      const response = await apiClient.put("/profile/stats", {
        userId,
        stats,
      });
      return response;
    } catch (error) {
      console.error("Error updating profile stats:", error);
      throw error;
    }
  },
};

export default profileService;
