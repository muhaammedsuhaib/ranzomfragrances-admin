"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Loader from "./Loader";
import { useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import Pagination from "@/helper/Pagination";
import {
  useCreateCategory,
  useGetCategories,
  useUpdateCategory,
} from "@/api/category";

const CategoryListLayer = () => {
  const [categoryInput, setCategoryInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const { isLoading, error, data, refetch } = useGetCategories();
  const items = data?.data || [];
  const {
    mutate,
    isLoading: updateLoading,
    error: updateError,
    data: updateData,
  } = useUpdateCategory();
  const {
    mutate: createMutate,
    isLoading: createLoading,
    error: createError,
    data: createData,
  } = useCreateCategory();
  const handleUpdate = async (item, active) => {
    const data = {};
    data.id = item?._id;
    if (active) {
      data.is_active = !item?.is_active;
    } else {
      data.is_deleted = !item?.is_deleted;
    }

    mutate(data, {
      onSuccess: (response) => {
        toast.success(response?.message || "Category Update Successfully!");
        refetch();
      },
      onError: (err) => {
        console.log(err);
        toast.error(
          err?.message || "An error occurred while updating the item."
        );
      },
    });
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleEditClick = (item) => {
    setCategoryInput(item?.title);
    setEditMode(true);
    setEditId(item?._id);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!categoryInput.trim()) return;

    if (editMode && editId) {
      const data = {
        id: editId,
        title: categoryInput,
      };
      mutate(data, {
        onSuccess: (response) => {
          toast.success(response?.message || "Category Update Successfully!");
          refetch();
        },
        onError: (err) => {
          console.log(err);
          toast.error(
            err?.message || "An error occurred while updating the category."
          );
        },
      });
    } else {
      const data = {
        title: categoryInput,
      };
      createMutate(data, {
        onSuccess: (response) => {
          toast.success(response?.message || "Category created Successfully!");
          refetch();
        },
        onError: (err) => {
          console.log(err);
          toast.error(
            err?.message || "An error occurred while creating the category."
          );
        },
      });
    }

    // Reset form state
    setCategoryInput("");
    setEditMode(false);
    setEditId(null);
  };

  const isAnyLoading = isLoading || updateLoading || createLoading;

  if (isAnyLoading) {
    return <Loader message="Loading Categories..." />;
  }
  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <form
          className="navbar-search d-flex align-items-center gap-3"
          onSubmit={handleAddCategory}
        >
          <input
            type="text"
            name="category"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            placeholder="Add New Category"
            required
            className="form-control bg-base h-40-px w-auto px-3 text-sm"
          />
          <button
            type="submit"
            className="btn btn-primary d-flex align-items-center gap-2 px-12 py-8 radius-8 text-sm"
            disabled={createLoading || updateLoading}
          >
            {editMode ? "Update Category" : "Add Category"}
          </button>
          {editMode && (
            <button
              type="button"
              className="btn btn-outline-danger d-flex align-items-center gap-2 px-12 py-8 radius-8 text-sm"
              onClick={() => {
                setCategoryInput("");
                setEditMode(false);
                setEditId(null);
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Create Date</th>
                <th scope="col">Update Date</th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex-grow-1">
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item?.title || ""}
                      </span>
                    </div>
                  </td>
                  <td>
                    {item?.createdAt
                      ? format(new Date(item.createdAt), "dd-MM-yyyy hh:mm a")
                      : ""}
                  </td>
                  <td>
                    {item?.updatedAt
                      ? format(new Date(item.updatedAt), "dd-MM-yyyy hh:mm a")
                      : ""}
                  </td>

                  <td className="text-center">
                    <span
                      className={`${
                        item?.is_active
                          ? "bg-success-focus text-success-600 border border-success-main"
                          : "bg-danger-focus text-danger-600 border border-danger-main"
                      } px-24 py-4 radius-4 fw-medium text-sm`}
                    >
                      {item?.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="text-center">
                    <div className="d-flex align-items-center gap-10 justify-content-center">
                      <button
                        type="button"
                        className="bg-info-focus text-info-600 bg-hover-info-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        onClick={() => handleEditClick(item)}
                      >
                        <Icon icon="lucide:edit" className="menu-icon" />
                      </button>
                      <button
                        type="button"
                        className={`${
                          item?.is_active
                            ? "bg-success-focus bg-hover-success-200 text-success-600"
                            : "bg-danger-focus bg-hover-danger-200 text-danger-600"
                        } fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle`}
                        onClick={() => handleUpdate(item, true)}
                      >
                        <Icon
                          icon={
                            item?.is_active
                              ? "mdi:lock-open-outline"
                              : "mdi:lock-outline"
                          }
                          className="icon text-xl"
                        />
                      </button>
                      <button
                        type="button"
                        className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        onClick={() => handleUpdate(item, false)}
                      >
                        <Icon
                          icon="fluent:delete-24-regular"
                          className="menu-icon"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalItems={items.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CategoryListLayer;
