import { useEffect, useState } from 'react';
import ProductCard from '@/components/modules/product/ProductCard';
import { ProductFilterType } from '@/types/utils';
import { useProducts } from '@/hooks/data/useProducts ';
import ProductFilter from '@/components/modules/product/filter/ProductFilter';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/components/Pagination';

const Products = () => {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState<ProductFilterType>({
    search: [searchParams.get('search') || ''],
    categories: searchParams.get('categories')?.split(',') || [],
    status: [],
    priceRange: null,
  });

  const { products, updateFilters } = useProducts({
    filters,
    pagination: { page: parseInt(searchParams.get('page') || '') || 1, size: 8 },
  });

  const handleFilterChange = (newFilters: ProductFilterType) => {
    setFilters(newFilters);
    updateFilters({ filters: newFilters });
  };

  const handlePageChange = (page: number) => {
    updateFilters({ filters, pagination: { page, size: 8 } });
  };

  useEffect(() => {
    updateFilters({
      filters: {
        ...filters,
        search: [searchParams.get('search') || ''],
        categories: searchParams.get('categories')?.split(',') || [],
      },
      pagination: { page: parseInt(searchParams.get('page') || '') || 1, size: 8 },
    });
  }
  , [searchParams]);
  

  return (
    <div className='pt-16 pb-24 bg-white'>
      {/* Filter bar */}
      <ProductFilter onFilterChange={handleFilterChange} initialFilters={filters} />

      {/* Product grid */}
      <div className='container px-4 mx-auto mt-6'>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {products &&
            products.content.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
      <Pagination
        currentPage={(products?.number && products?.number + 1) || 1}
        totalPages={products?.totalPages || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Products;
