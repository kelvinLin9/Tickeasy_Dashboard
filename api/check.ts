import { CHECK_URL } from "./apiUrls";
import type { CheckResponse } from "~/types/api";

export const checkLogin = (token: string) => {
  return $fetch<CheckResponse>(CHECK_URL, {
    headers: {
      Authorization: token,
    },
  }).then(response => {
    if (!response) {
      console.error('Check API returned empty response');
      throw new Error('Empty response from check API');
    }
    
    // 如果驗證成功，儲存新的 token
    if (response.success && response.token) {
      console.log('Login status verified, storing new token');
      // 使用 localStorage 儲存新的 token
      localStorage.setItem('token', response.token);
    }
    
    return response;
  }).catch(error => {
    console.error('Check Login Error:', error);
    throw error;
  });
};
