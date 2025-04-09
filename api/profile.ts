import { PROFILE_URL } from "./apiUrls";
import type { ProfileResponse } from "~/types/api";

export const getUserProfile = (token: string) => {
  return useAsyncData<ProfileResponse>("userProfile", async () => {
    try {
      const response = await $fetch<ProfileResponse>(PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // 打印回傳值
      console.log('Profile Response:', response);
      
      // 確保回傳的資料結構正確
      if (response.success && response.user) {
        return {
          success: true,
          user: {
            ...response.user,
            // 確保所有必要欄位都存在
            avatar: response.user.avatar || '',
            email: response.user.email || '',
            role: response.user.role || 'user',
            _id: response.user._id || '',
            gender: response.user.gender || '',
            phone: response.user.phone || '',
            preferredRegions: response.user.preferredRegions || [],
            preferredEventTypes: response.user.preferredEventTypes || [],
            isEmailVerified: response.user.isEmailVerified || false,
            oauthProviders: response.user.oauthProviders || [],
            createdAt: response.user.createdAt || new Date().toISOString(),
            updatedAt: response.user.updatedAt || new Date().toISOString(),
          }
        };
      }
      
      return response;
    } catch (error) {
      console.error('Profile Error:', error);
      throw error;
    }
  });
};
