import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

interface CategoryDropdownProps {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}

const CategoryDropdown = ({ category, isOpen, onClose }: CategoryDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const formatSubcategoryLink = (subcategory: string) =>
    `/${category.id.toLowerCase()}/${subcategory.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div
      ref={dropdownRef}
      className={`category-dropdown fixed top-0 left-0 w-full bg-white z-40 shadow-md ${isOpen ? "open" : ""}`}
    >
      <div
        className="container relative p-8 mx-auto overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height: isOpen ? "auto" : "0" }}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {category.subcategories.map((subcategory, index) => (
            <Link
              key={index}
              to={formatSubcategoryLink(subcategory)}
              className="py-1 text-gray-800 hover:text-black hover:underline"
              onClick={onClose}
            >
              {subcategory}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
