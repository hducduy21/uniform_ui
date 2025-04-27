import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, ChevronDown, SlidersHorizontal } from "lucide-react"
import { useDispatch } from "react-redux"
import { setActiveCategory } from "../store/slices/categorySlice"
import images from "../assets"
import ProductCard from "@/components/modules/product/ProductCard"
import { ProductType } from "@/types"

const products: ProductType[] = [
    {
      id: "1",
      name: "AIRism UV Protection Full-Zip Hoodie",
      price: "$23.52",
      category: "WOMEN",
      sizeRange: "XS-XXL",
      rating: 4.9,
      reviewCount: 999,
      colors: ["#ffffff", "#000000", "#f5f5dc", "#808000", "#008080", "#add8e6"],
      images: [images.product1],
      madeInInfo: "Made from recycled materials",
    },
    {
      id: "2",
      name: "Pocketable UV Protection Parka | Printed",
      price: "$31.36",
      category: "WOMEN",
      sizeRange: "XS-XXL",
      rating: 4.7,
      reviewCount: 18,
      colors: ["#ffc0cb", "#000080"],
      images: [images.product2],
      madeInInfo: "Made from recycled materials",
    },
    {
      id: "3",
      name: "Pocketable UV Protection Jacket",
      price: "$31.36",
      category: "WOMEN",
      sizeRange: "XS-XXL",
      rating: 4.9,
      reviewCount: 89,
      colors: ["#ffffff", "#808080", "#000000", "#ffff00", "#add8e6"],
      images: [images.product3],
      madeInInfo: "Made from recycled materials",
    },
    {
      id: "4",
      name: "Reversible Parka",
      price: "$31.36",
      category: "WOMEN",
      sizeRange: "XS-XXL",
      rating: 4.9,
      reviewCount: 456,
      colors: ["#f5f5dc", "#000080", "#a52a2a", "#add8e6", "#008080", "#000033"],
      images: [images.product4],
      madeInInfo: "Made from recycled materials",
    },
    {
      id: "5",
      name: "AIRism Cotton UV Protection Long Sleeve T-Shirt",
      price: "$15.96",
      category: "WOMEN",
      sizeRange: "XS-XXL",
      rating: 4.8,
      reviewCount: 321,
      colors: ["#ffffff", "#000000", "#ffc0cb", "#d3d3d3"],
      images: [images.product5],
      madeInInfo: "Made from recycled materials",
    },
    {
      id: "6",
      name: "UV Protection Mesh Hoodie",
      price: "$27.96",
      category: "WOMEN",
      sizeRange: "XS-XXL",
      rating: 4.6,
      reviewCount: 210,
      colors: ["#000080", "#90ee90", "#ffffff", "#000000"],
      images: [images.product6],
      madeInInfo: "Made from recycled materials",
    },
    {
      id: "7",
      name: "Pocketable Parka (BlockTech)",
      price: "$48.00",
      category: "WOMEN",
      sizeRange: "XS-XXL",
      rating: 4.7,
      reviewCount: 145,
      colors: ["#000000", "#808000", "#f5f5dc"],
      images: [images.product7],
      madeInInfo: "Made from recycled materials",
    },
    {
      id: "8",
      name: "3D Cut UV Protection Jacket",
      price: "$42.00",
      category: "WOMEN",
      sizeRange: "XS-XXL",
      rating: 4.9,
      reviewCount: 512,
      colors: ["#ffffff", "#808080", "#a9a9a9", "#0000ff"],
      images: [images.product2],
      madeInInfo: "Made from recycled materials",
    }
];

const Products = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const dispatch = useDispatch()
  const handleCategoryClick = (categoryId: string) => {
    dispatch(setActiveCategory(categoryId.toLowerCase()))
  }

  const toggleFilter = (filter: string) => {
    if (activeFilter === filter) {
      setActiveFilter(null)
    } else {
      setActiveFilter(filter)
    }
  }

  return (
    <div className="pt-16 pb-24 bg-white">
      {/* Filter bar */}
      <div className="sticky z-30 bg-white shadow-md top-16">
        <div className="container px-4 mx-auto">
            <div className="flex items-center py-3 overflow-x-auto hide-scrollbar">
                <button className="flex items-center mr-4">
                    <SlidersHorizontal size={18} className="mr-2" />
                    <span className="whitespace-nowrap">Filter</span>
                </button>

                <button className="flex items-center mr-4 whitespace-nowrap" onClick={() => toggleFilter("category")}>
                    Category <ChevronDown size={18} className="ml-1" />
                </button>

                <button className="flex items-center mr-4 whitespace-nowrap" onClick={() => toggleFilter("promotion")}>
                    Promotions <ChevronDown size={18} className="ml-1" />
                </button>

                <button className="flex items-center mr-4 whitespace-nowrap" onClick={() => toggleFilter("size")}>
                    Size <ChevronDown size={18} className="ml-1" />
                </button>

                <button className="flex items-center mr-4 whitespace-nowrap" onClick={() => toggleFilter("color")}>
                    Color <ChevronDown size={18} className="ml-1" />
                </button>

                <button className="flex items-center mr-4 whitespace-nowrap" onClick={() => toggleFilter("price")}>
                    Price <ChevronDown size={18} className="ml-1" />
                </button>
                </div>
            </div>
        </div>

      {/* Product grid */}
      <div className="container px-4 mx-auto mt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  )
}

export default Products