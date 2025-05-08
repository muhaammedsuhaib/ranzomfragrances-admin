"use client";
import { useGetItems, useUpdateItem } from "@/api/item";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import Loader from "./Loader";
import { BASE_URL } from "@/utils/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import Pagination from "@/helper/Pagination";
import { format } from "date-fns";

const ProductListLayer = () => {
  const { isLoading, error, data, refetch } = useGetItems();
  const items = data?.data || [];
  const {
    mutate,
    isPending: updateLoading,
    error: updateError,
    data: updateData,
  } = useUpdateItem();
  const handleUpdate = async (item, active) => {
    const formData = new FormData();
    formData.append("id", item?._id);
    if (active) {
      formData.append("is_active", !item?.is_active);
    } else {
      formData.append("is_deleted", !item?.is_deleted);
    }
    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response?.message || "Item Update Successfully!");
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
  if (isLoading || updateLoading)
    return <Loader message="Loading Products..." />;
  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        {/* <div className="d-flex align-items-center flex-wrap gap-3">
          <span className="text-md fw-medium text-secondary-light mb-0">
            Show
          </span>
          <select
            className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
            defaultValue="Select Number"
          >
            <option value="Select Number" disabled>
              Select Number
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <form className="navbar-search">
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="Search"
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
          <select
            className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
            defaultValue="Select Status"
          >
            <option value="Select Status" disabled>
              Select Status
            </option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div> */}
        <Link
          href="/add-product"
          className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
        >
          <Icon
            icon="ic:baseline-plus"
            className="icon text-xl line-height-1"
          />
          Add Product
        </Link>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">
                  <div className="d-flex align-items-center gap-10">
                    {/* <div className="form-check style-check d-flex align-items-center">
                      <input
                        className="form-check-input radius-4 border input-form-dark"
                        type="checkbox"
                        name="checkbox"
                        id="selectAll"
                      />
                    </div> */}
                    Hsn Code
                  </div>
                </th>
                <th scope="col">Create Date</th>
                <th scope="col">Update Date</th>
                <th scope="col">Product</th>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">ML</th>
                <th scope="col">Gender</th>
                {/* <th scope="col">Designation</th> */}
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
                    <div className="d-flex align-items-center gap-10">
                      {/* <div className="form-check style-check d-flex align-items-center">
                        <input
                          className="form-check-input radius-4 border border-neutral-400"
                          type="checkbox"
                          name="checkbox"
                        />
                      </div> */}
                      {item?.hsnCode || ""}
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
                  <td>
                    {" "}
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          item?.images[0] ||
                          "https://res.cloudinary.com/dmildebio/image/upload/v1746551298/ujz0bcly43gxeytotmtc.png"
                        }
                        alt="Wowdash"
                        className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                      />
                    </div>{" "}
                  </td>
                  <td>
                    <div className="flex-grow-1">
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {item?.title || ""}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="text-md mb-0 fw-normal text-secondary-light">
                      {item?.category?.title || ""}
                    </span>
                  </td>
                  <td>{item?.ml || ""}</td>
                  <td>{item?.gender || ""}</td>
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
                      >
                        <Icon
                          icon="majesticons:eye-line"
                          className="menu-icon"
                        />
                      </button>
                      <button
                        type="button"
                        className="bg-info-focus text-info-600 bg-hover-info-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
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
        {/* <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
          <span>Showing 1 to 10 of 12 entries</span>
          <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
            <li className="page-item">
              <Link
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px  text-md"
                href="#"
              >
                <Icon icon="ep:d-arrow-left" className="" />
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md bg-primary-600 text-white"
                href="#"
              >
                1
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px"
                href="#"
              >
                2
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                href="#"
              >
                3
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                href="#"
              >
                4
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                href="#"
              >
                5
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px  text-md"
                href="#"
              >
                {" "}
                <Icon icon="ep:d-arrow-right" className="" />{" "}
              </Link>
            </li>
          </ul>
        </div> */}
        {/* Pagination Controls */}
        {/* <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, items.length)} of{" "}
            {items.length} entries
          </span>
          <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
            <li className="page-item">
              <button
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <Icon icon="ep:d-arrow-left" />
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li className="page-item" key={i}>
                <button
                  className={`page-link fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md ${
                    currentPage === i + 1
                      ? "bg-primary-600 text-white"
                      : "bg-neutral-200 text-secondary-light"
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <Icon icon="ep:d-arrow-right" />
              </button>
            </li>
          </ul>
        </div> */}
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

export default ProductListLayer;
