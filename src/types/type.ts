export interface FilterOption {
  id: string
  label: string
}
export interface AvailableFilters {
  categories: FilterOption[];
  status: FilterOption[];
  priceRanges: PriceRangeOption[];
}

export interface PriceRangeOption {
  id: string;
  label: string;
  range: [number, number];
}

export interface FilterCategory {
  id: string
  label: string
  options: FilterOption[]
}

export interface FilterState {
  categories: string[]
  status: string[]
  priceRange: [number, number] | null
}

export type FilterType = {
  categories: FilterOption[]
  status: FilterOption[]
  priceRanges: { id: string; label: string; range: [number, number] }[]
}