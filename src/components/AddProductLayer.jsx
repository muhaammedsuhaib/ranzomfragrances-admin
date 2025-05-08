"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useCreateItem } from "@/api/item";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import { useGetCategories } from "@/api/category";
import Select from "react-select";
import Link from "next/link";

const schema = z.object({
  hsnCode: z.string().min(1, "HSN Code is required"),
  title: z.string().min(1, "Item Name is required"),
  ml: z.string().min(1, "ML is required"),
  category: z.string().min(1, "Category is required"),
  gender: z.string().min(1, "Gender is required"),
  state: z.string().min(1, "State is required"),
  purchasePrice: z.string().min(1, "Required"),
  salePrice: z.string().min(1, "Required"),
  mrpPrice: z.string().min(1, "Required"),
  openQuantity: z.string().min(1, "Required"),
  manufactureDate: z.string().optional(),
  expiryDate: z.string().optional(),
  description: z.string().optional(),
});

const AddProductLayer = () => {
  const router = useRouter();
    const [urls, setUrls] = useState([]);
    const [currentUrl, setCurrentUrl] = useState("");
  const { isLoading, error, data, refetch } = useGetCategories();
  const categoryOptions =
    data?.data
      ?.filter((cat) => cat?.is_active)
      .map((cat) => ({
        value: cat._id,
        label: cat.title,
      })) || [];
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "women", label: "Women" },
    { value: "unisex", label: "Unisex" },
  ];
  const mlOptions = Array.from({ length: 1000 }, (_, i) => {
    const value = `${i + 1} ml`;
    return { value, label: value };
  });

  const [images, setImages] = useState([]);
  const {
    mutate,
    isPending: createLoading,
    error: createError,
    data: createData,
  } = useCreateItem();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    // Append all form fields
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    //Append urls
    if (urls.length > 0) {
      formData.append("urls", JSON.stringify(urls));
    }
    // Append images correctly
    images.forEach((file) => {
      formData.append("images", file); // Use SAME field name as Multer expects
    });
    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response?.message || "Item Created Successfully!");
        // Reset form fields
        reset();

        // // Clear uploaded images
        setImages([]);
        router.push("/product-list");
      },
      onError: (err) => {
        console.log(err);

        toast.error(
          err?.message || "An error occurred while creating the item."
        );
      },
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
    const handleAddUrl = () => {
      if (!currentUrl.trim()) return;
  
      try {
        // Validate URL format
        new URL(currentUrl);
        setUrls((prev) => [...prev, currentUrl]);
        setCurrentUrl("");
      } catch (error) {
        toast.error("Please enter a valid URL (e.g., https://example.com)");
      }
    };
  
    const handleUrlKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddUrl();
      }
    };
  
    const removeUrl = (index) => {
      setUrls((prev) => prev.filter((_, i) => i !== index));
    };

  if (isLoading || createLoading) {
    const msg = createLoading ? "Creating Item..." : "Loading...";
    return <Loader message={msg} />;
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card h-100 p-3 radius-12"
    >
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">HSN Code</label>
          <input
            {...register("hsnCode")}
            className="form-control radius-8"
            placeholder="Enter HSN Code"
          />
          {errors.hsnCode && (
            <p className="text-danger">{errors.hsnCode.message}</p>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Item Name</label>
          <input
            {...register("title")}
            className="form-control radius-8"
            placeholder="Enter Item Name"
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">ML</label>

          <Select
            options={mlOptions}
            onChange={(selectedOption) => setValue("ml", selectedOption?.value)}
            classNamePrefix="react-select"
            placeholder="Select Ml"
            isSearchable={true}
            name="ml"
          />
          {errors.ml && <p className="text-danger">{errors.ml.message}</p>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Category</label>
          <Select
            options={categoryOptions}
            onChange={(selectedOption) =>
              setValue("category", selectedOption?.value)
            }
            classNamePrefix="react-select"
            placeholder="Select Category"
            isSearchable={true}
            name="category"
          />
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Gender</label>
          <Select
            options={genderOptions}
            onChange={(selectedOption) =>
              setValue("gender", selectedOption?.value)
            }
            classNamePrefix="react-select"
            placeholder="Select Gender"
            isSearchable={true}
            name="gender"
          />
          {errors.gender && (
            <p className="text-danger">{errors.gender.message}</p>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">State</label>
          <input
            {...register("state")}
            className="form-control radius-8"
            placeholder="Enter State"
          />
          {errors.state && (
            <p className="text-danger">{errors.state.message}</p>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">Purchase Price</label>
          <input
            type="number"
            {...register("purchasePrice")}
            className="form-control radius-8"
          />
          {errors.purchasePrice && (
            <p className="text-danger">{errors.purchasePrice.message}</p>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">Sale Price</label>
          <input
            type="number"
            {...register("salePrice")}
            className="form-control radius-8"
          />
          {errors.salePrice && (
            <p className="text-danger">{errors.salePrice.message}</p>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">MRP Price</label>
          <input
            type="number"
            {...register("mrpPrice")}
            className="form-control radius-8"
          />
          {errors.mrpPrice && (
            <p className="text-danger">{errors.mrpPrice.message}</p>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Open Quantity</label>
          <input
            type="number"
            {...register("openQuantity")}
            className="form-control radius-8"
          />
          {errors.openQuantity && (
            <p className="text-danger">{errors.openQuantity.message}</p>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Manufacture Date</label>
          <input
            type="date"
            {...register("manufactureDate")}
            className="form-control radius-8"
          />
          {errors.manufactureDate && (
            <p className="text-danger">{errors.manufactureDate.message}</p>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Expiry Date</label>
          <input
            type="date"
            {...register("expiryDate")}
            className="form-control radius-8"
          />
        </div>

        <div className="col-md-12">
          <label className="form-label">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="form-control radius-8"
          />
          <div className="d-flex flex-wrap mt-3 gap-3">
            {images.map((img, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img
                  src={URL.createObjectURL(img)}
                  className="rounded"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    transform: "translate(50%, -50%)",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                    fontSize: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* upload urls  */}
        <div className="mb-3">
          <label className="form-label">Add URLs</label>
          <div className="input-group mb-2">
            <input
              type="url"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              onKeyPress={handleUrlKeyPress}
              placeholder="Enter URL (e.g., https://example.com)"
              className="form-control"
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddUrl}
            >
              Add URL
            </button>
          </div>

          {urls.length > 0 && (
            <div className="mt-3">
              <h6>Added URLs ({urls.length}):</h6>
              <ul className="list-group">
                {urls.map((url, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span className="text-truncate" style={{ maxWidth: "80%" }}>
                      {url}
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeUrl(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="col-md-12">
          <label className="form-label">Description</label>
          <textarea
            {...register("description")}
            className="form-control radius-8"
            rows="4"
          />
        </div>
      </div>

      <div className="d-flex justify-content-between flex-wrap gap-3 mt-5">
        <Link
          href="/product-list"
          style={{
            fontSize: "1rem",
            padding: "12px 24px",
            borderRadius: "8px",
            border: "2px solid #dc3545",
            color: "#dc3545",
            backgroundColor: "transparent",
            transition: "all 0.3s ease",
            textDecoration: "none",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#dc3545";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#dc3545";
          }}
        >
          Cancel
        </Link>

        <button
          type="submit"
          style={{
            fontSize: "1rem",
            padding: "12px 24px",
            borderRadius: "8px",
            border: "2px solid #0d6efd",
            color: "#0d6efd",
            backgroundColor: "transparent",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#0d6efd";
            e.target.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#0d6efd";
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddProductLayer;
