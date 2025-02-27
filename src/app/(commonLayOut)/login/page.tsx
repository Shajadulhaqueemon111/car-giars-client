/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EyeIcon, EyeOff } from "lucide-react";
import GoogleLoginBtn from "../components/pages/shared/GoogleLoginBtn";
import { loginUser } from ".";
import { useUser } from "@/context/AuthContext";
import toast from "react-hot-toast";
// Import server action

export default function LoginPage() {
  const { user, fetchUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handelLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;

    const result = await loginUser(email, password);

    console.log(result);
    if (result?.success) {
      toast.success("User login Successfully");
      await fetchUser();

      setTimeout(() => {
        if (user?.role === "admin") {
          router.push("/admin-dashboard");
        } else if (user?.role === "user") {
          router.push("/dashboard");
        } else if (user?.role === "driver") {
          router.push("/driver-dashboard");
        } else {
          router.push(redirect);
        }
      }, 500);
    } else {
      toast.error("Does not valid User");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handelLogin} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
        <div className="text-center">
          <GoogleLoginBtn></GoogleLoginBtn>
        </div>
      </div>
    </div>
  );
}
