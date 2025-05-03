import { useMutation } from "@tanstack/react-query";
import APIClientPrivate from "@/utils/apiClient";

/**
 * 🔐 Admin Login API call
 * @param {Object} data - The login payload { email, password }
 * @returns {Promise<Object>} - API response data
 */
const adminLogin = async (data) => {
  try {
    const response = await APIClientPrivate.post("/auth/admin", data);
    return response.data;
  } catch (error) {
    // Throw detailed error if available, else generic error
    throw error.response?.data || new Error("An unexpected error occurred.");
  }
};

/**
 * 🧠 useAdminLogin React Query Hook
 * Handles login logic with error and loading states
 */
const useAdminLogin = () => {
  return useMutation({
    mutationFn: adminLogin,
  });
};

export { useAdminLogin };
