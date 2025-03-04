"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user =localStorage.getItem('userId');

    if (!user && pathname !== "/login") {
      router.push("/login"); 
    } else {
      router.push("/dashboard"); 
    }
  }, [pathname, router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
};


export default ProtectedRoute;
