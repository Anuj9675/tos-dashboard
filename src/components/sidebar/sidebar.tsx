"use client";
import Link from "next/link";
import { FC, useState } from "react";
import {
  FaBars,
  FaInfoCircle,
  FaBriefcase,
  FaServicestack,
  FaQuestionCircle,
  FaChevronRight,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";

interface SidebarProps {
  toggleSidebar: (open: boolean) => void;
}

const navData = [
  { href: "/client/about", icon: FaInfoCircle, label: "About" },
  { href: "/client/careers", icon: FaBriefcase, label: "Careers" },
  { href: "/client/service", icon: FaServicestack, label: "Services" },
  { href: "/client/faq", icon: FaQuestionCircle, label: "FAQ" },
  { href: "/client/contact", icon: MdMessage , label: "Message" },
  { href: "/client/jobcategories", icon: TbCategoryFilled , label: "Job Category" },
];

export const Sidebar: FC<SidebarProps> = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("");

  const handleToggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    toggleSidebar(newState);
  };

  const handleLinkClick = (label: string) => {
    setActiveTab(label);
  };

  return (
    <div
      className={`bg-gray-100 text-gray-800 max-h-screen p-4 transition-all duration-300 ${
        isOpen ? "w-56" : "w-14"
      } fixed top-0 left-0 h-full`}
    >
      {/* Toggle Button */}
      <button
        className={`flex flex-row items-center mb-10 ${
          isOpen
            ? "hover:bg-gray-500  p-2 hover:bg-opacity-30 hover:backdrop-blur-lg"
            : ""
        } transition-all duration-300 rounded-md w-full`}
        onClick={handleToggleSidebar}
      >
        <FaBars className="text-2xl rounded-md" />
        {isOpen && (
          <div className="ml-4 flex flex-col">
            <span className="text-start text-xs font-bold">Totally</span>
            <span className="text-start text-xs font-bold">Optimised Solutions</span>
          </div>
        )}
      </button>

      <nav className="space-y-5">
        {navData.map(({ href, icon: Icon, label }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center transition-all duration-300 rounded-md w-full ${
              activeTab === label ? "text-black" : "text-gray-600"
            } ${isOpen ? "p-2 hover:bg-gray-500 hover:bg-opacity-30 hover:backdrop-blur-lg" : ""}`}
            onClick={() => handleLinkClick(label)}
          >
            <Icon
              className={`text-xl ${activeTab === label ? "text-black" : "text-gray-600"} ${
                isOpen ? "mr-2" : "mx-auto"
              }`}
            />
            {isOpen && <span>{label}</span>}
            <FaChevronRight
              className={`ml-auto transition-transform ${isOpen ? "transform-none" : "hidden"}`}
            />
          </Link>
        ))}
      </nav>
    </div>
  );
};
