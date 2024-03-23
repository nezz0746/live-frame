import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./provider";
import Navigation from "@components/Navigation";
import { Separator } from "@components/ui/separator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={(inter.className, " min-h-screen")}>
        <div className="p-4">
          <Providers>
            <Navigation />
            <Separator className="my-4" />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
