import { CHECK_URL } from "./apiUrls";
import type { CheckResponse } from "~/types/api";

export const checkLogin = (token: string) => {
  return useAsyncData<CheckResponse>("checkLogin", () =>
    $fetch<CheckResponse>(CHECK_URL, {
      headers: {
        Authorization: token,
      },
    })
  );
};
