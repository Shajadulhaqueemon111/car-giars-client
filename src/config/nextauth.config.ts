/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import nexiosInstance from "./nexious.config";

export const AuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile, account }: any) {
      try {
        console.log({ profile, account });
        if (!profile || !account) {
          return false;
        }

        if (account?.provider === "google") {
          const response: any = await nexiosInstance.post("/auth/login", {
            name: profile.name,
            email: profile.email,
            img: profile.picture, // profile.picture instead of profile.image
          });

          if (
            response.data.data.accessToken ||
            response.data.data.refreshToken
          ) {
            (await cookies()).set(
              "accessToken",
              response.data.data.accessToken
            );
            (await cookies()).set(
              "refreshToken",
              response.data.data.refreshToken
            );

            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};
