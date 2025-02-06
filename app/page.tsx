"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      router.push("/sign-in"); 
    } else {
      switch (user.role) {
        case 'doctor':
          router.push('/UserAccounts/Doctor')
        case 'nurse':
          router.push('/UserAccounts/Nurse')
        case 'pharmacy':
            router.push('/UserAccounts/Pharmacy')
        case 'lab':
              router.push('/UserAccounts/Lab')
        case 'admin':
                router.push('/UserAccounts/Admin')      
        default:
          break;
      }
    }
  }, []);

  return <h1>You are not authorized to view this page kindly go back</h1>; // Placeholder while redirecting
}
