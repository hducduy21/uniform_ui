import useCategory from '@/hooks/data/useCategory';
import { FilterOption, ProductFilterType } from '@/types/utils';
import { X } from 'lucide-react';

type FilterType = {
  categories: FilterOption[]
  status: FilterOption[]
  priceRanges: { id: string; label: string; range: [number, number] }[]
}

interface FilterDropdownProps {
  activeFilter: string | null;
  filters: ProductFilterType;
  toggleFilterOption: (filterType: keyof Omit<ProductFilterType, 'priceRange'>, optionId: string) => void;
  setPriceRange: (range: [number, number] | null) => void;
  clearFilterType: (filterType: keyof ProductFilterType) => void;
  applyFilters: () => void;
  setActiveFilter: (filter: string | null) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  activeFilter,
  filters,
  toggleFilterOption,
  setPriceRange,
  clearFilterType,
  applyFilters,
  setActiveFilter,
}) => {
  if (!activeFilter) return null;
  const { categories } = useCategory();

  const initFilter: FilterType = {
    categories: categories?.map((c) => ({ id: String(c.id), label: c.name })) || [],
    status: [{ id: 'FEATURED', label: 'Feature' }],
    priceRanges: [
      { id: 'under20', label: 'Under $20', range: [0, 20] as [number, number] },
      { id: '20to50', label: '$20 - $50', range: [20, 50] as [number, number] },
      { id: '50to100', label: '$50 - $100', range: [50, 100] as [number, number] },
      { id: '100plus', label: '$100+', range: [100, 5000] as [number, number] }
    ],
  };

  return (
    <div className='fixed inset-0 z-40 bg-opacity-50' onClick={() => setActiveFilter(null)}>
      <div
        className='absolute top-[calc(3rem)] right-0 left-0 z-50 bg-white p-4 shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='container mx-auto'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-medium'>
              {activeFilter === 'category' && 'Categories'}
              {activeFilter === 'status' && 'Status'}
              {activeFilter === 'price' && 'Price Range  Range'}
            </h3>
            <button onClick={() => setActiveFilter(null)}>
              <X size={20} />
            </button>
          </div>

          {/* Category filter */}
          {activeFilter === 'category' && (
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
              {initFilter.categories.map((category) => (
                <label key={category.id} className='flex items-center py-1 space-x-2'>
                  <input
                    type='checkbox'
                    checked={filters.categories.includes(category.id)}
                    onChange={() => toggleFilterOption('categories', category.id)}
                    className='border-gray-300 rounded'
                  />
                  <span>{category.label}</span>
                </label>
              ))}
            </div>
          )}

          {activeFilter === 'status' && (
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
              {initFilter.status.map((status) => (
                <label key={status.id} className='flex items-center py-1 space-x-2'>
                  <input
                    type='checkbox'
                    checked={filters.status.includes(status.id)}
                    onChange={() => toggleFilterOption('status', status.id)}
                    className='border-gray-300 rounded'
                  />
                  <span>{status.label}</span>
                </label>
              ))}
            </div>
          )}

          {/* Price filter */}
          {activeFilter === 'price' && (
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
              {initFilter.priceRanges.map((priceRange) => (
                <label key={priceRange.id} className='flex items-center py-1 space-x-2'>
                  <input
                    type='radio'
                    checked={
                      filters.priceRange !== null &&
                      filters.priceRange[0] === priceRange.range[0] &&
                      filters.priceRange[1] === priceRange.range[1]
                    }
                    onChange={() => setPriceRange(priceRange.range)}
                    className='border-gray-300 rounded'
                  />
                  <span>{priceRange.label}</span>
                </label>
              ))}
            </div>
          )}

          <div className='flex justify-between mt-6'>
            <button
              className='px-4 py-2 border border-gray-300 rounded'
              onClick={() => {
                if (activeFilter === 'category') clearFilterType('categories');
                else if (activeFilter === 'status') clearFilterType('status');
                else if (activeFilter === 'price') clearFilterType('priceRange');
              }}
            >
              Clear
            </button>
            <button className='px-4 py-2 text-white bg-black rounded' onClick={applyFilters}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
