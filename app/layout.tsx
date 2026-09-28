import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClassFlow — Live classrooms made simple",
  description: "Modern live classrooms for teachers and students.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
