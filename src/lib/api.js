const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get auth token from localStorage
  getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  }

  // Set auth token in localStorage
  setToken(token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  }

  // Remove auth token from localStorage
  removeToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }

  // Get headers with auth token
  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };

    const token = this.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    console.log("Making API request to:", url);
    console.log("Request config:", config);

    try {
      const response = await fetch(url, config);
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }

  // Test method
  async testPost() {
    console.log("API Client testPost called");
    try {
      const response = await this.post("/test-post", { test: "data" });
      console.log("API Client testPost response:", response);
      return response;
    } catch (error) {
      console.error("API Client testPost error:", error);
      throw error;
    }
  }

  // Auth methods
  async signup(userData) {
    console.log("API Client signup called with:", userData);
    try {
      const response = await this.post("/auth/signup", userData);
      console.log("API Client signup response:", response);
      if (response.success && response.data.token) {
        this.setToken(response.data.token);
      }
      return response;
    } catch (error) {
      console.error("API Client signup error:", error);
      throw error;
    }
  }

  async login(credentials) {
    const response = await this.post("/auth/login", credentials);
    if (response.success && response.data.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  async logout() {
    try {
      await this.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      this.removeToken();
    }
  }

  async getCurrentUser() {
    return this.get("/auth/me");
  }

  async updateProfile(profileData) {
    return this.put("/auth/profile", profileData);
  }

  async changePassword(passwordData) {
    return this.post("/auth/change-password", passwordData);
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();
export default apiClient;
