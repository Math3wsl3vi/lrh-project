"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!storedUser || storedUser.role !== "doctor") {
      router.push("/sign-in"); 
    } else {
      setUser(storedUser);
    }
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return <h1>Doctor Dashboard</h1>;
}
