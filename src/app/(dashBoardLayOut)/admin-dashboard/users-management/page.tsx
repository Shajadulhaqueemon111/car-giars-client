/* eslint-disable @next/next/no-img-element */
"use client";
import { getCookies } from "@/app/(commonLayOut)/login";
import nexiosInstance from "@/config/nexious.config";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

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

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await nexiosInstance.get<ApiResponse<User[]>>(
          "/users"
        );
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data?.data)) {
          console.log("Total Users:", response.data.data.length);
          setUsers(response?.data?.data);
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

  if (users.length === 0) return <p>please wait.......</p>;
  const handleDelete = async (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = await getCookies();

          const response = await nexiosInstance.delete<ApiResponse<null>>(
            `/users/${userId}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          if (response.data.success) {
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user._id !== userId)
            );

            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted successfully.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: "Failed to delete the user.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the user.",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="table w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">
              <input type="checkbox" className="checkbox" />
            </th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Update</th>
            <th className="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="border p-2">
                <input type="checkbox" className="checkbox" />
              </td>
              <td className="border p-2">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        className="rounded-lg"
                        src={
                          user.img ||
                          "https://i.ibb.co.com/JFK4Wvwq/cartoon-cute-school-boy-photo.jpg"
                        }
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.name}</div>
                    <div className="text-sm opacity-50">
                      {user.location || "Unknown"}
                    </div>
                  </div>
                </div>
              </td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <span className="badge badge-ghost badge-sm">
                  {user.role || "User"}
                </span>
              </td>
              <td className="border p-2">
                <Link href={`/admin-dashboard/admin-actions/${user._id}`}>
                  <button className="btn btn-ghost btn-xs">Update</button>
                </Link>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-ghost btn-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersManagement;
