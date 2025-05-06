import { ChangePasswordFormData } from '@/pages/account/ChangePassword';
import userService from '@/services/userService';
import { User } from '@/types/model';
import { toast } from 'react-toastify';
import useSWR from 'swr';

export function useProfile() {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<User>('/user/profile', userService.getProfile);

  const updateProfile = async (data: User) => {
    try {
      const response = await userService.updateProfile(data);
      if (response) {
        mutate();
      }
      toast.success('Update profile successfully');
    } catch (error) {
      toast.error('Update profile failed');
    }
  };

  const changePassword = async (form: ChangePasswordFormData) => {
    try {
      await userService.changePassword(form);
      toast.success('Change password successfully');
    } catch (error:any) {
      toast.error(error.message);
    }
  };
  return {
    user,
    isLoading,
    error,
    mutate,
    updateProfile,
    changePassword,
  };
}
