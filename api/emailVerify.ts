import { EMAIL_VERIFY_URL } from "./apiUrls";
import type { EmailVerifyRequest, EmailVerifyResponse } from "~/types/api";

export const verifyEmail = (email: string) => {
  return useAsyncData<EmailVerifyResponse>("emailVerify", () =>
    $fetch<EmailVerifyResponse>(EMAIL_VERIFY_URL, {
      method: "POST",
      body: { email } as EmailVerifyRequest,
    })
  );
};
