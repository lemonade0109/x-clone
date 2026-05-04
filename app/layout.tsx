import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/components/providers/session-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "X. It's what's happening / X",
  description:
    "A clone of the X (formerly Twitter) platform built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  auth,
  children,
  modal,
}: Readonly<{
  auth: React.ReactNode;
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-black dark:bg-black dark:text-white`}
      >
        <TooltipProvider>
          <ThemeProvider>
            <AuthSessionProvider>
              {auth}
              {children}
              {modal}
              <Toaster />
            </AuthSessionProvider>
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
