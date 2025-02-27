"use server";

import { cookies } from "next/headers";
import nexiosInstance from "@/config/nexious.config";
import { jwtDecode } from "jwt-decode";

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await nexiosInstance.post<{
      success: boolean;
      message: string;
      data: {
        accessToken: string;
        refreshToken: string;
        role: string; // Ensure role is included
      };
    }>("/auth/login", { email, password });

    if (res.data && res.data.data) {
      const cookieStore = cookies();

      await (
        await cookieStore
      ).set("accessToken", res.data.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      await (
        await cookieStore
      ).set("refreshToken", res.data.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return {
        success: true,
        message: res.data.message,
        role: res.data.data.role, // Now always included
      };
    }
  } catch (error) {
    console.error("Login failed", error);
    return {
      success: false,
      message: "Login failed. Please try again.",
      role: undefined,
    };
  }
};

export const logOut = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  console.log(accessToken);
  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      role: decodedToken.role,
      status: decodedToken.status,
    };
  }

  return decodedToken;
};

export const getCookies = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  console.log(accessToken);
  if (accessToken) {
    return accessToken;
  }
};

// export const getNewAccessToken = async () => {
//   try {
//     const refressToken = (await cookies()).get("refressToken")?.value;
//     const res = await nexiosInstance({
//       url: "/auth/refressToken",
//       method: "POST",
//       headers: {
//         cookies: `refressToken'=${refressToken}`,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
