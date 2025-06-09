import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../ui/ScrollToTop";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen max-w-[2000px] mx-auto">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ScrollToTop threshold={400} offset={30} />
    </div>
  );
} 