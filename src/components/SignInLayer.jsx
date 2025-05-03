"use client";
import { useAdminLogin } from "@/api/auth";
import { setLoginToken } from "@/utils/apiClient";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const SignInLayer = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading, error, data } = useAdminLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and Password are required.");
      return;
    }
    // Password must be at least 6 characters long
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    mutate(
      { email, password },
      {
        onSuccess: (response) => {
          toast.success(response?.message || "Login Successful!");
          setLoginToken(response?.data?.token);
          router.push("/");
        },
        onError: (err) => {
          toast.error(err?.message || "Invalid credentials");
        },
      }
    );
  };

  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="assets/images/auth/auth-img.png" alt="" />
        </div>
      </div>
      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <div>
            <Link href="/" className="mb-40 max-w-290-px">
              <img src="assets/images/logo.png" alt="" />
            </Link>
            <h4 className="mb-12">Sign In to your Account</h4>
            <p className="mb-32 text-secondary-light text-lg">
              Welcome back! please enter your detail
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:email" />
              </span>
              <input
                type="email"
                value={email}
                required
                autoComplete="email"
                id="email"
                name="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Email"
              />
            </div>
            <div className="position-relative mb-20">
              <div className="icon-field">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="solar:lock-password-outline" />
                </span>
                <input
                  type="password"
                  value={password}
                  required
                  autoComplete="current-password"
                  name="password"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e);
                    }
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  id="your-password"
                  placeholder="Password"
                />
              </div>
              <span
                className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                data-toggle="#your-password"
                data-show="ri-eye-line"
                data-hide="ri-eye-off-line"
                onClick={(e) => {
                  const passwordField =
                    document.getElementById("your-password");
                  if (passwordField.type === "password") {
                    passwordField.type = "text";
                    e.currentTarget.setAttribute(
                      "data-show",
                      "ri-eye-off-line"
                    );
                    e.currentTarget.setAttribute("data-hide", "ri-eye-line");
                  } else {
                    passwordField.type = "password";
                    e.currentTarget.setAttribute("data-show", "ri-eye-line");
                    e.currentTarget.setAttribute(
                      "data-hide",
                      "ri-eye-off-line"
                    );
                  }
                }}
              />
            </div>
            <div className="">
              <div className="d-flex justify-content-end gap-2">
                {/* <div className="form-check style-check d-flex align-items-center">
                  <input
                    className="form-check-input border border-neutral-300"
                    type="checkbox"
                    defaultValue=""
                    id="remeber"
                  />
                  <label className="form-check-label" htmlFor="remeber">
                    Remember me{" "}
                  </label>
                </div> */}
                <Link href="#" className="text-primary-600 fw-medium">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
              disabled={isLoading}
            >
              {" "}
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            {/* <div className="mt-32 center-border-horizontal text-center">
              <span className="bg-base z-1 px-4">Or sign in with</span>
            </div> */}
            {/* <div className="mt-32 d-flex align-items-center gap-3">
              <button
                type="button"
                className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
              >
                <Icon
                  icon="ic:baseline-facebook"
                  className="text-primary-600 text-xl line-height-1"
                />
                Google
              </button>
              <button
                type="button"
                className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
              >
                <Icon
                  icon="logos:google-icon"
                  className="text-primary-600 text-xl line-height-1"
                />
                Google
              </button>
            </div> */}
            {/* <div className="mt-32 text-center text-sm">
              <p className="mb-0">
                Don’t have an account?{" "}
                <Link href="/sign-up" className="text-primary-600 fw-semibold">
                  Sign Up
                </Link>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
