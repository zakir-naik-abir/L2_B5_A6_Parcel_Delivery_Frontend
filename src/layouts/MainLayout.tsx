import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import type { ReactNode } from "react"

interface IProps {
  children: ReactNode;
}

export default function MainLayout({children}: IProps) {
  return (
    <div className="min-h-screen flex flex-col max-w-[2540px] mx-auto xl:px-4 sm:px-2 px-4">
      <Navbar/>
      <div className="grow">{children}</div>
      <Footer/>
    </div>
  )
};
