// 通用的 API 回應格式
export interface ApiResponse<T = any> {
  status: boolean;
  message?: string;
  data?: T;
}

// 用戶相關的型別
export interface UserProfile {
  _id: string;
  email: string;
  role: string;
  preferredRegions: string[];
  preferredEventTypes: string[];
  isEmailVerified: boolean;
  oauthProviders: {
    provider: string;
    providerId: string;
  }[];
  createdAt: string;
  updatedAt: string;
  gender: string;
  phone: string;
  avatar: string;
}

// 登入相關
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends ApiResponse {
  token: string;
  user: UserProfile;
}

// 註冊相關
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse extends ApiResponse {
  token: string;
  user: UserProfile;
}

// 驗證相關
export interface EmailVerifyRequest {
  email: string;
}

export interface EmailVerifyResponse extends ApiResponse {
  isAvailable: boolean;
}

// 檢查登入相關
export interface CheckResponse {
  success: boolean;
  role: string;
  token: string;
}

// Profile 相關
export interface ProfileResponse {
  success: boolean;
  user: UserProfile;
} 