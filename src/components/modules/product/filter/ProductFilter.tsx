import type React from 'react';

import { useState, useEffect, useCallback } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { FilterDropdown } from './FilterDropdown';
import { FilterState, FilterType } from '@/types/type';
import { FilterButton } from './FilterButton';

interface ProductFilterProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
  availableFilters: FilterType;
}
const ProductFilter: React.FC<ProductFilterProps> = ({
  onFilterChange,
  initialFilters,
  availableFilters,
}) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(
    initialFilters ?? { categories: [], status: [], priceRange: null }
  );

  const appliedFiltersCount = filters.categories.length + filters.status.length + (filters.priceRange ? 1 : 0);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const toggleFilterOption = useCallback(
    (filterType: keyof Omit<FilterState, 'priceRange'>, optionId: string) => {
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
    setFilters({ categories: [], status: [], priceRange: null });
  }, []);

  const clearFilterType = useCallback((filterType: keyof FilterState) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: filterType === 'priceRange' ? null : [],
    }));
  }, []);

  const applyFilters = useCallback(() => {
    setActiveFilter(null);
  }, []);

  return (
    <div className='relative'>
      {/* Filter bar */}
      <div className='sticky top-16 z-30 border-b bg-white'>
        <div className='container mx-auto px-4'>
          <div className='hide-scrollbar flex items-center overflow-x-auto py-3'>
            <button className='relative mr-4 flex items-center'>
              <SlidersHorizontal size={18} className='mr-2' />
              <span className='whitespace-nowrap'>Filters</span>
              {appliedFiltersCount > 0 && (
                <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white'>
                  {appliedFiltersCount}
                </span>
              )}
            </button>

            <FilterButton label='Category' count={filters.categories.length} filterKey='category' setActiveFilter={setActiveFilter} />
            <FilterButton label='Status' count={filters.status.length} filterKey='status' setActiveFilter={setActiveFilter} />
            <FilterButton label='Price' count={filters.priceRange ? 1 : 0} filterKey='price' setActiveFilter={setActiveFilter} />

            {appliedFiltersCount > 0 && (
              <button
                className='ml-auto flex items-center text-sm whitespace-nowrap text-blue-600'
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
        availableFilters={availableFilters}
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
