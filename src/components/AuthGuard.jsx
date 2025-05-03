"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sign-in");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default AuthGuard;
