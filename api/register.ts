import { REGISTER_URL } from "./apiUrls";
import type { RegisterRequest, RegisterResponse } from "~/types/api";

export const register = (userInfo: RegisterRequest) => {
  return useAsyncData<RegisterResponse>("register", () =>
    $fetch<RegisterResponse>(REGISTER_URL, {
      method: "POST",
      body: userInfo,
    })
  );
};
