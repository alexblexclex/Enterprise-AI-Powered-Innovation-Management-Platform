import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  activeRoute?: string;
}

export default function MainLayout({ children, title, activeRoute }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeRoute={activeRoute} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
