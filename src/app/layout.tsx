import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Raleway } from "next/font/google";
import { ThemeProvider } from "./ThemeProvider";
import { cn } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import "./index.css";
import "./utilities.css";

const plus_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus_sans",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Care Pulse",
  description: "A health care management system",
  icons: {
    icon: "/icons/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          plus_sans.className,
          raleway.className,
          plus_sans.variable,
          raleway.variable,
          // "font-raleway font-plus_sans",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <NextTopLoader />
          <div className="wrapper">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
