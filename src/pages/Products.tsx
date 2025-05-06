import { useState } from "react"
import ProductCard from "@/components/modules/product/ProductCard"
import { ProductFilterType } from "@/types/utils"
import { useProducts } from "@/hooks/useProducts "
import ProductFilter from "@/components/modules/product/filter/ProductFilter"
import { useParams, useSearchParams } from "react-router-dom"

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductFilterType>({
    search: searchParams.get('search') || '',
    categories: [],
    status: [],
    priceRange: null,
  })

  const {products, updateFilters} = useProducts({filters})
  
  const handleFilterChange = (newFilters: ProductFilterType) => {
    setFilters(newFilters)
    updateFilters({ filters: newFilters })
  }

  return (
    <div className="pt-16 pb-24 bg-white">
      {/* Filter bar */}
      <ProductFilter onFilterChange={handleFilterChange} initialFilters={filters}/>

      {/* Product grid */}
      <div className="container px-4 mx-auto mt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products && products.content.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </div>
  )
}

export default Products