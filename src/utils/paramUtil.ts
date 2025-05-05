import { QueryParams } from "@/types/dto";

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
    ...(params.pagination ? {
      page: (params.pagination.page - 1).toString(),
      pageSize: params.pagination.size.toString(),
    } : {}),
  }).toString();
  return queryParams;
}
