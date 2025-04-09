import { USERS_URL } from "./apiUrls";
import type { UsersResponse } from "~/types/api";

export const getUsers = (token: string, page: number = 1, limit: number = 10) => {
  return $fetch<UsersResponse>(`${USERS_URL}?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
  }).then(response => {
    console.log('Users API Response:', response);
    if (!response) {
      console.error('Users API returned empty response');
      throw new Error('Empty response from users API');
    }
    return response;
  }).catch(error => {
    console.error('Get Users Error:', error);
    throw error;
  });
}; 