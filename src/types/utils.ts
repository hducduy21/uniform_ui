export type FilterOption = {
  id: string
  label: string
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

export type ProductFilterType = {
  search: string[]
  categories: string[]
  status: string[]
  priceRange: [number, number] | null
}

export type FilterType = {
  category?: string | undefined;
  status?: string | undefined;
  minPrice?: string | undefined;
  maxPrice?: string | undefined;
  search?: string | undefined;
  sortBy?: string | undefined;
  direction?: 'ASC' | 'DESC' | undefined;
};

export type ErrorType<T> = Partial<Record<keyof T, string>>;