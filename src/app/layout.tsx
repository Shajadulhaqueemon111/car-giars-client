import type { Metadata } from "next";

import "./globals.css";
import Providers from "./lib/Provider";

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
        <Providers>
          <div className="mx-auto container">{children} </div>
        </Providers>
      </body>
    </html>
  );
}
