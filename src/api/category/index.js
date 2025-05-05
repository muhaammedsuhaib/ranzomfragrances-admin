import { useMutation, useQuery } from "@tanstack/react-query";
import APIClientPrivate from "@/utils/apiClient";

/**
 * Get all categories API call
 * @returns {Promise<Object>} - API response data
 */
const getCategories = async () => {
  try {
    const response = await APIClientPrivate.get("/category");
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("An unexpected error occurred.");
  }
};

const useGetCategories = () => {
  return useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });
};
/**
 * Create category API call
 * @param {Object} data - The category payload { title ... }
 * @returns {Promise<Object>} - API response data
 */
const createCategory = async (data) => {
  try {
    const response = await APIClientPrivate.post("/category", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("An unexpected error occurred.");
  }
};

/**
 * 🧠 useCreateCategory React Query Hook
 * Handles create category logic with error and loading states
 */
const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
  });
};
/**
 * Update category API call
 * @param {Object} data - The category payload with id
 * @returns {Promise<Object>} - API response data
 */
const updateCategory = async (data) => {
  try {
    const response = await APIClientPrivate.put(`/category/${data?.id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("An unexpected error occurred.");
  }
};
/**
 * 🧠 useUpdateCategory React Query Hook
 * Handles create category logic with error and loading states
 */
const useUpdateCategory = () => {
  return useMutation({
    mutationFn: updateCategory,
  });
};

export { useGetCategories, useCreateCategory, useUpdateCategory };
