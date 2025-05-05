import userService from '@/services/userService';
import { Page, PagingParams, QueryParams, UserFilter } from '@/types/dto';
import { UserDetailType } from '@/types/model';
import { getQueryString } from '@/utils/paramUtil';
import { useState } from 'react';
import useSWR from 'swr';

const useManageUser = ({
  filters,
  pagination = { page: 1, size: 10 },
}: {
  filters: UserFilter;
  pagination?: PagingParams;
}) => {
  const [query, setQuery] = useState<string>(() => {
    return getQueryString({ filters, pagination });
  });

  const {
    data: users,
    error,
    isLoading,
    mutate,
  } = useSWR<Page<UserDetailType>>(`/users${'?' + query}`, userService.getAllUser);

  const updateFilters = ({ filters, pagination = { page: 1, size: 10 } }: QueryParams) => {
    setQuery(getQueryString({ filters, pagination }));
    mutate();
  };

	const lockUser = async (userId: string) => {
		await userService.lockUser(userId)
		mutate();
	}

	const unlockUser = async (userId: string) => {
		await userService.unlockUser(userId)
		mutate();
	}

  return {
    users,
    isLoading,
    error,
    mutate,
    updateFilters,
		lockUser,
		unlockUser
  };
};

export default useManageUser;
