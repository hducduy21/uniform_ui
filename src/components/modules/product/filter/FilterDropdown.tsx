import { AvailableFilters, FilterState } from "@/types/type";
import { X } from "lucide-react"

interface FilterDropdownProps {
    activeFilter: string | null;
    filters: FilterState;
    availableFilters: AvailableFilters;
    toggleFilterOption: (filterType: keyof Omit<FilterState, 'priceRange'>, optionId: string) => void;
    setPriceRange: (range: [number, number] | null) => void;
    clearFilterType: (filterType: keyof FilterState) => void;
    applyFilters: () => void;
    setActiveFilter: (filter: string | null) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
    activeFilter,
    filters,
    availableFilters,
    toggleFilterOption,
    setPriceRange,
    clearFilterType,
    applyFilters,
    setActiveFilter,
  }) => {
  
    if (!activeFilter) return null;
  
    return (
      <div className="fixed inset-0 bg-opacity-50 z-40" onClick={() => setActiveFilter(null)}>
        <div
          className="absolute top-[calc(4rem+1px)] left-0 right-0 bg-white p-4 shadow-lg z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {availableFilters.categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2 py-1">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.id)}
                      onChange={() => toggleFilterOption('categories', category.id)}
                      className="rounded border-gray-300"
                    />
                    <span>{category.label}</span>
                  </label>
                ))}
              </div>
            )}
  
            {/* Price filter */}
            {activeFilter === 'price' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {availableFilters.priceRanges.map((priceRange) => (
                  <label key={priceRange.id} className="flex items-center space-x-2 py-1">
                    <input
                      type="radio"
                      checked={
                        filters.priceRange !== null &&
                        filters.priceRange[0] === priceRange.range[0] &&
                        filters.priceRange[1] === priceRange.range[1]
                      }
                      onChange={() => setPriceRange(priceRange.range)}
                      className="rounded border-gray-300"
                    />
                    <span>{priceRange.label}</span>
                  </label>
                ))}
              </div>
            )}
  
            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded"
                onClick={() => {
                  if (activeFilter === 'category') clearFilterType('categories');
                  else if (activeFilter === 'status') clearFilterType('status');
                  else if (activeFilter === 'price') clearFilterType('priceRange');
                }}
              >
                Clear
              </button>
              <button className="px-4 py-2 bg-black text-white rounded" onClick={applyFilters}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  