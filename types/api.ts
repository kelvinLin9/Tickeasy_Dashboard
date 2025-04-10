// 通用的 API 回應格式
export interface ApiResponse<T = unknown> {
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
  success?: boolean;  // 可能存在
  status?: boolean;   // 可能存在
  user?: {
    _id: string;
    email: string;
    role: string;
    isEmailVerified: boolean;
  };
  role?: string;    // 舊格式
  token: string;
  message?: string;
  errorCode?: string;
  remainingSeconds?: number;
}

// Profile 相關
export interface ProfileResponse {
  success?: boolean;
  status?: boolean;
  user: UserProfile;
  message?: string;
  errorCode?: string;
}

// 用戶列表相關
export interface PaginationInfo {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface UsersResponse {
  success: boolean;
  data: {
    users: UserProfile[];
    pagination: PaginationInfo;
  };
} 