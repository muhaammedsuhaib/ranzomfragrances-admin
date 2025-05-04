import { useMutation, useQuery } from "@tanstack/react-query";
import APIClientPrivate from "@/utils/apiClient";

/**
 * Get all items API call
 * @returns {Promise<Object>} - API response data
 */
const getItems = async () => {
  try {
    const response = await APIClientPrivate.get("/item/");
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("An unexpected error occurred.");
  }
};

const useGetItems = () => {
  return useQuery({
    queryKey: ["getItems"],
    queryFn: getItems,
  });
};
/**
 * Get single item by ID API call
 * @param {string} id - Item ID
 * @returns {Promise<Object>} - API response data
 */
const getItem = async (id) => {
  try {
    const response = await APIClientPrivate.get(`/item/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("An unexpected error occurred.");
  }
};
const useGetItem = () => {
  return useQuery({
    queryKey: ["getItem"],
    queryFn: getItem,
  });
};
/**
 * Create Item API call
 * @param {Object} data - The item payload { title ... }
 * @returns {Promise<Object>} - API response data
 */
const createItem = async (formData) => {
  try {
    const response = await APIClientPrivate.post("/item/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("An unexpected error occurred.");
  }
};

/**
 * 🧠 useCreateItem React Query Hook
 * Handles create item logic with error and loading states
 */
const useCreateItem = () => {
  return useMutation({
    mutationFn: createItem,
  });
};
/**
 * Update Item API call
 * @param {Object} data - The item payload with id
 * @returns {Promise<Object>} - API response data
 */
const updateItem = async (formData) => {
  try {
    const id = formData.get("id");
    const response = await APIClientPrivate.put(`/item/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("An unexpected error occurred.");
  }
};
/**
 * 🧠 useCreateItem React Query Hook
 * Handles create item logic with error and loading states
 */
const useUpdateItem = () => {
  return useMutation({
    mutationFn: updateItem,
  });
};

export { useGetItems, useGetItem, useCreateItem, useUpdateItem };
