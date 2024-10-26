// src/app/layout.tsx
"use client";
import { useState } from "react";
import { Sidebar } from "@/src/components/sidebar/sidebar";
import { Header } from "@/src/components/header/header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Manage sidebar state

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev); // Toggle sidebar open state
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <Sidebar toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 flex flex-col transition-all p-2 bg-gray-200  duration-300 ${
          sidebarOpen ? "ml-56" : "ml-14"
        }`}
      >
        <div className="bg-white rounded-md min-h-[98vh]">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <div className="p-4 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
