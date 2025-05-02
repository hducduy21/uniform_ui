export type FilterOption = {
  id: string
  label: string
}
export type AvailableFilters = {
  categories: FilterOption[];
  status: FilterOption[];
  priceRanges: PriceRangeOption[];
}

export type PriceRangeOption = {
  id: string;
  label: string;
  range: [number, number];
}

export type FilterCategory = {
  id: string
  label: string
  options: FilterOption[]
}

export type FilterState = {
  categories: string[]
  status: string[]
  priceRange: [number, number] | null
}

export type FilterType = {
  categories: FilterOption[]
  status: FilterOption[]
  priceRanges: { id: string; label: string; range: [number, number] }[]
}

export type ErrorType<T> = Partial<Record<keyof T, string>>;