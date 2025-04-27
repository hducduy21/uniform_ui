import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, ChevronDown, SlidersHorizontal } from "lucide-react"
import { useDispatch } from "react-redux"
import { setActiveCategory } from "../store/slices/categorySlice"
import images from "../assets"
import ProductCard from "@/components/modules/product/ProductCard"
import { ProductType } from "@/types"
import { products } from "@/data/mock"

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