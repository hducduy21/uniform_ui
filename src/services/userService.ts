import { authApi } from "@/configs/axios";
import { Page } from "@/types/dto";
import { User, UserDetailType } from "@/types/model";

const userService = {
    getAllUser: async (url: string) => {
        console.log(url)
        const response = await authApi.get<Page<UserDetailType>>(url);
        console.log(response.data);
        return response.data;
    },

    lockUser: async (userId: string) => {
        const response = await authApi.put(`/users/${userId}/lock`);
        return response.data;
    },

    unlockUser: async (userId: string) => {
        const response = await authApi.put(`/users/${userId}/unlock`);
        return response.data;
    }
}

export default userService;
