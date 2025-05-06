import { authApi } from "@/configs/axios";
import { ChangePasswordFormData } from "@/pages/account/ChangePassword";
import { Page } from "@/types/dto";
import { User, UserDetailType } from "@/types/model";

const userService = {
    getAllUser: async (url: string) => {
        const response = await authApi.get<Page<UserDetailType>>(url);
        return response.data;
    },

    getProfile: async () => {
        const response = await authApi.get<User>(`/users/profile`);
        return response.data;
    },

    updateProfile: async (data: User) => {
        const response = await authApi.put<User>(`/users/profile`, data);
        return response.data;
    },

    lockUser: async (userId: string) => {
        const response = await authApi.patch(`/users/${userId}/lock`);
        return response.data;
    },

    unlockUser: async (userId: string) => {
        const response = await authApi.patch(`/users/${userId}/unlock`);
        return response.data;
    },

    changePassword: async (form: ChangePasswordFormData) => {
        const response = await authApi.patch(`/users/password`, form);
        return response.data;
    }
}

export default userService;
