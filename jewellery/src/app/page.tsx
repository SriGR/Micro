"use client";
import { useEffect } from "react";
import ProtectedRoute from "./Components/ProtechedRoute";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
  
    const user = localStorage.getItem("userId");
    if (!user) {
      router.replace("/login");
    } else {
      router.replace("/dashboard");
    }
  }, []);
  return (
    <ProtectedRoute>
      <div>Loading...</div>
    </ProtectedRoute>
  );
}
