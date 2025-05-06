import { CategoryType } from "@/types/model";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";

interface CategoryDropdownProps {
  categories: CategoryType[];
  isOpen: boolean;
  onClose: () => void;
}

const CategoryDropdown = ({ categories, isOpen, onClose }: CategoryDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeCategory = useSelector((state: any) => state.category.activeCategory);

  const categoryState = useMemo(() => {
    return categories.find((cat) => cat.id === activeCategory) || { children: [] };
  }, [categories, activeCategory]);

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

  return (
    <div
      ref={dropdownRef}
      className={`category-dropdown fixed bot-0 left-0 w-full bg-white z-40 shadow-md ${isOpen ? "open" : " hidden"}`}
    >
      <div
        className="container relative p-8 mx-auto overflow-hidden transition-all duration-500 ease-in-out min-h-10"
        style={{ height: isOpen ? "auto" : "0" }}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categoryState && categoryState.children?.map((category, index) => (
            <Link
              key={index}
              to={`/products?categories=${category.id}`}
              className="py-1 text-gray-800 hover:text-black hover:underline"
              onClick={onClose}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
