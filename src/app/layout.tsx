import type { Metadata } from "next";


import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"


import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "carePulse",
  description: "A health care management system",
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
          "min-h-screen bg-dark-300 text-white font-sans antialiased",
          fontSans.variable
        )}
      >
            <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            
          >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}