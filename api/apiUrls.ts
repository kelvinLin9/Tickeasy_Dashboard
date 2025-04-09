const BASE_URL = import.meta.env.VITE_URL;

// user
export const EMAIL_VERIFY_URL = `${BASE_URL}/api/v1/auth/verify-email`;
export const REGISTER_URL = `${BASE_URL}/api/v1/auth/register`;
export const LOGIN_URL = `${BASE_URL}/api/v1/auth/login`;
export const CHECK_URL = `${BASE_URL}/api/v1/auth/check`;
export const PROFILE_URL = `${BASE_URL}/api/v1/users/profile`;
export const GOOGLE_LOGIN_URL = `${BASE_URL}/api/v1/auth/google`;

// admin
export const USERS_URL = `${BASE_URL}/api/v1/admin/users`;