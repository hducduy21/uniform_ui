import userService from '@/services/userService';
import { User } from '@/types/model';
import useSWR from 'swr';

export function useProfile() {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<User>('/user/profile', userService.getProfile);

  const updateProfile = async (data: User) => {
    const response = await userService.updateProfile(data);
    if (response) {
      mutate();
    }
  };
  
  return {
    user,
    isLoading,
    error,
    mutate,
  };
}
