import type React from 'react';

import { useState, useCallback } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { FilterDropdown } from './FilterDropdown';
import { FilterButton } from './FilterButton';
import { ProductFilterType } from '@/types/utils';

interface ProductFilterProps {
  onFilterChange: (filters: ProductFilterType) => void;
  initialFilters?: ProductFilterType;
  clearFilters?: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  onFilterChange,
  initialFilters,
}) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilterType>(
    initialFilters || {search: [],  categories: [], status: [], priceRange: null }
  )

  const appliedFiltersCount = filters.categories.length + filters.status.length + (filters.priceRange ? 1 : 0);

  const toggleFilterOption = useCallback(
    (filterType: keyof Omit<ProductFilterType, 'priceRange'>, optionId: string) => {
      setFilters((prev) => ({
        ...prev,
        [filterType]: prev[filterType].includes(optionId)
          ? prev[filterType].filter((id) => id !== optionId)
          : [...prev[filterType], optionId],
      }));
    },
    []
  );

  const setPriceRange = useCallback((range: [number, number] | null) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({search: [], categories: [], status: [], priceRange: null });
    onFilterChange({search: [], categories: [], status: [], priceRange: null });
  }, []);

  const clearFilterType = useCallback((filterType: keyof ProductFilterType) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: filterType === 'priceRange' ? null : [],
    }));
  }, []);

  const applyFilters = () => {
    onFilterChange(filters);
  }
  return (
    <div className='relative'>
      {/* Filter bar */}
      <div className='sticky z-30 bg-white border-b top-16'>
        <div className='container px-4 mx-auto'>
          <div className='flex items-center py-3 overflow-x-auto hide-scrollbar'>
            <button className='relative flex items-center mr-4'>
              <SlidersHorizontal size={18} className='mr-2' />
              <span className='whitespace-nowrap'>Filters</span>
              {appliedFiltersCount > 0 && (
                <span className='absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-black rounded-full -top-2 -right-2'>
                  {appliedFiltersCount}
                </span>
              )}
            </button>

            <FilterButton label='Category' count={filters.categories.length} filterKey='category' setActiveFilter={setActiveFilter} />
            <FilterButton label='Status' count={filters.status.length} filterKey='status' setActiveFilter={setActiveFilter} />
            <FilterButton label='Price' count={filters.priceRange ? 1 : 0} filterKey='price' setActiveFilter={setActiveFilter} />

            {appliedFiltersCount > 0 && (
              <button
                className='flex items-center ml-auto text-sm text-blue-600 whitespace-nowrap'
                onClick={clearFilters}
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter dropdowns */}
      <FilterDropdown
        activeFilter={activeFilter}
        filters={filters}
        toggleFilterOption={toggleFilterOption}
        setPriceRange={setPriceRange}
        clearFilterType={clearFilterType}
        applyFilters={applyFilters}
        setActiveFilter={setActiveFilter}
      />
    </div>
  );
};

export default ProductFilter;
