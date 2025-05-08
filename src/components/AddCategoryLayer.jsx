"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import { useCreateCategory } from "@/api/category";
import Link from "next/link";

export const categorySchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
});

const AddCategoryLayer = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const { mutate, isPending: isLoading } = useCreateCategory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    // Append text fields
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    //Append urls
    if (urls.length > 0) {
      formData.append("urls", JSON.stringify(urls));
    }
    // Append image files
    images.forEach((file) => {
      formData.append("images", file);
    });

    mutate(formData, {
      onSuccess: (response) => {
        toast.success(response?.message || "Category created successfully!");
        reset();
        setImages([]);
        setUrls([]);
        router.push("/category-list");
      },
      onError: (err) => {
        console.log(err);
        toast.error(err?.message || "An error occurred.");
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
  if (isLoading) {
    return <Loader message="Creating Category..." />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // encType="multipart/form-data"
      className="card h-100 p-3 radius-12"
    >
      <div className="mb-3">
        <label className="form-label fw-semibold">Title</label>
        <input
          type="text"
          {...register("title")}
          placeholder="Enter title name"
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
        />
        {errors.title && (
          <div className="invalid-feedback">{errors.title.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Description</label>
        <textarea
          {...register("description")}
          placeholder="Enter description"
          className="form-control"
          rows={3}
        />
      </div>

      <div className="mb-3">
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

      <div className="d-flex justify-content-between flex-wrap gap-3 mt-5">
        <Link
          href="/category-list"
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

export default AddCategoryLayer;
