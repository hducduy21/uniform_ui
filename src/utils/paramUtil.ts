import { PagingParams, QueryParams } from '@/types/dto';
import { FilterType, ProductFilterType } from '@/types/utils';

export const toStringRecord = (filters: Object): Record<string, string> =>
  Object.entries(filters).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = value.toString();
    }
    return acc;
  }, {});

export const getQueryString = (params: QueryParams) => {
  const queryParams = new URLSearchParams({
    ...toStringRecord(params.filters),
    ...(params.pagination
      ? {
          page: (params.pagination.page - 1).toString(),
          pageSize: params.pagination.size.toString(),
        }
      : {}),
  }).toString();
  return queryParams;
};

export function convertProductFilterToUrlParams(
  filter: ProductFilterType,
  pagination: PagingParams = { page: 1, size: 10 }
): string {
  const params = new URLSearchParams();

  if (filter.search) {
    params.append('search', filter.search.join(','));
  }

  if (filter.categories?.length) {
    params.append('categories', filter.categories.join(','));
  }

  if (filter.status?.length) {
    params.append('status', filter.status.join(','));
  }

  if (filter.priceRange) {
    params.append('minPrice', filter.priceRange[0].toString());
    params.append('maxPrice', filter.priceRange[1].toString());
  }

  params.append('page', (pagination.page - 1).toString());
  params.append('size', pagination.size.toString());

  return params.toString();
}

export function convertFilterToUrlParams(
  filter: FilterType,
  pagination: PagingParams = { page: 1, size: 10 }
): string {
  const params = new URLSearchParams();

  if (filter) {
    if (filter.category) {
      params.append('categories', filter.category);
    }

    if (filter.status) {
      params.append('status', filter.status);
    }

    if (filter.minPrice) {
      params.append('minPrice', filter.minPrice);
    }

    if (filter.maxPrice) {
      params.append('maxPrice', filter.maxPrice);
    }

    if (filter.search) {
      params.append('search', filter.search);
    }

    if (filter.sortBy) {
      if (filter.direction) {
        params.append('sort', `${filter.sortBy},${filter.direction}`);
      }
      if (filter.direction) {
        params.append('sort', filter.sortBy);
      }
    }
  }

  params.append('page', (pagination.page - 1).toString());
  params.append('size', pagination.size.toString());

  return params.toString();
}
