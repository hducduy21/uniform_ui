import ProductFilter from "@/components/modules/product/filter/ProductFilter";
import ProductCard from "@/components/modules/product/ProductCard";
import { filtersMock, products } from "@/data/mock";
import { FilterState } from "@/types/type";
import { useState } from "react";

const WishList = () => {
    const [filters, setFilters] = useState<FilterState>({
    categories: [],
    status: [],
    priceRange: null,
    })

    const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    }
  return (
    <div className="pt-16 pb-24 bg-white">

      {/* Filter bar */}
      <ProductFilter onFilterChange={handleFilterChange} initialFilters={filters} availableFilters={filtersMock} />

      {/* Product grid */}
      <div className="container px-4 mx-auto mt-6">
        <h1 className="my-8 text-2xl font-bold">WISHLIST</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  );
}

export default WishList