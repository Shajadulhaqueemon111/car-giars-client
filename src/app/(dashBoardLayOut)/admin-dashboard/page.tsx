/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import PyChart from "./pychart";
import { useEffect, useState } from "react";
import nexiosInstance from "@/config/nexious.config";
type User = {
  _id: string;
  name: string;
  email: string;
  role?: string;
  img?: string;
  location?: string;
};
type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};
const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await nexiosInstance.get<ApiResponse<User[]>>(
          "/users"
        );
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data?.data)) {
          setUsers(response?.data?.data);
          console.log("Total Users:", response.data.data.length); //
        } else {
          console.error("Unexpected API response structure:", response.data);
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="">
      <h1 className="text-2xl text-center mb-3 font-bold mx-auto">
        Admin Dashboard
      </h1>
      <div className="w-3/5 mx-auto">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total User</div>
            <div className="stat-value text-primary">{users?.length}</div>
            <div className="stat-desc"> last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Sale</div>
            <div className="stat-value text-secondary">2.6M</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </div>
            <div className="stat-value">86%</div>
            <div className="stat-title">Tasks done</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div>
          </div>
        </div>
      </div>
      <div>
        <PyChart></PyChart>
      </div>
    </div>
  );
};

export default AdminDashboard;
