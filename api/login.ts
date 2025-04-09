import { LOGIN_URL } from "./apiUrls";
import type { LoginRequest, LoginResponse } from "~/types/api";

export const login = (userInfo: LoginRequest) => {
  return useAsyncData<LoginResponse>("login", () =>
    $fetch<LoginResponse>(LOGIN_URL, {
      method: "POST",
      body: userInfo,
    })
  );
};
