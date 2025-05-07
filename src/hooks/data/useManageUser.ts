import userService from '@/services/userService';
import { Page, PagingParams, QueryParams, UserFilter } from '@/types/dto';
import { UserDetailType } from '@/types/model';
import { getQueryString } from '@/utils/paramUtil';
import { useState } from 'react';
import { toast } from 'react-toastify';
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

  const updateFilters = async ({ filters, pagination = { page: 1, size: 10 } }: QueryParams) => {
    try {
      const newQuery = getQueryString({ filters, pagination });
      setQuery(newQuery);
      await mutate();
    } catch (error) {
      toast.error('Failed to update filters');
    }
  };

  const lockUser = async (userId: string) => {
    try {
      await userService.lockUser(userId);
      mutate();
      toast.success('User locked successfully');
    } catch (error) {
      toast.error('Failed to lock user');
    }
  };

  const unlockUser = async (userId: string) => {
    try {
      await userService.unlockUser(userId);
      mutate();
      toast.success('User unlocked successfully');
    } catch (error) {
      toast.error('Failed to unlock user');
    }
  };

  return {
    users,
    isLoading,
    error,
    mutate,
    updateFilters,
    lockUser,
    unlockUser,
  };
};

export default useManageUser;
