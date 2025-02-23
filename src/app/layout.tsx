import type { Metadata } from "next";

import "./globals.css";
import Providers from "./lib/Provider";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Applo Gears",
  description: "Wellcome To Appolo Gears",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <AuthProvider>
          <Toaster />
          <Providers>
            <div className="mx-auto container">{children} </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
