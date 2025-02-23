/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react";
import GoogleLoginBtn from "../components/pages/shared/GoogleLoginBtn";

import nexiosInstance from "@/config/nexious.config";
import toast from "react-hot-toast";
interface RegisterResponse {
  success?: boolean;
  message?: string;
  data?: any;
}
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handelRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;

    const newUser = {
      name,
      email,
      password,
    };
    console.log(newUser);

    try {
      const res = await nexiosInstance.post<RegisterResponse>(
        "/auth/register",
        newUser
      );
      console.log(res.data, "res.data");

      if (res.data?.success) {
        toast.success("User registered successfully");
      } else {
        toast.error("User Already Exists");
      }
    } catch (error: any) {
      console.log(error);

      // Check if the error response contains a message
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handelRegister} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
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
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
        <div className="text-center">
          <GoogleLoginBtn />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
