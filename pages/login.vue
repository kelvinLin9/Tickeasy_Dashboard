<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          登入您的帳號
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          或
          <NuxtLink to="/register" class="font-medium text-primary hover:text-primary-dark">
            註冊新帳號
          </NuxtLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">電子郵件</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="電子郵件"
            />
          </div>
          <div>
            <label for="password" class="sr-only">密碼</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="密碼"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              記住我
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-primary hover:text-primary-dark">
              忘記密碼？
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                v-if="loading"
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
            {{ loading ? '登入中...' : '登入' }}
          </button>
        </div>

        <div v-if="error" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ error }}
              </h3>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-50 text-neutral-500">
                或使用以下方式登入
              </span>
            </div>
          </div>

          <div class="mt-6">
            <button
              type="button"
              @click="handleGoogleLogin"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-neutral-500 hover:bg-gray-50"
            >
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              使用 Google 帳號登入
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)

// 檢查是否有重定向參數
const redirectPath = computed(() => {
  const redirect = route.query.redirect as string
  return redirect ? decodeURIComponent(redirect) : '/'
})

const handleLogin = async () => {
  if (loading.value) return

  loading.value = true
  error.value = null

  try {
    // 這裡應該是調用 API 進行登入
    // 暫時使用模擬數據
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email.value === 'admin@example.com' && password.value === 'admin123') {
      userStore.setUser({
        id: 'admin-1',
        role: 'admin',
        token: 'mock-admin-token'
      })
      router.push('/admin/dashboard')
    } else if (email.value === 'user@example.com' && password.value === 'user123') {
      userStore.setUser({
        id: 'user-1',
        role: 'user',
        token: 'mock-user-token'
      })
      router.push(redirectPath.value)
    } else {
      throw new Error('電子郵件或密碼錯誤')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '登入失敗，請稍後再試'
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = () => {
  console.log('sign in with google');
  
  // 獲取當前的域名和協議作為基礎 URL
  const baseUrl = window.location.origin;
  console.log(baseUrl);
  // // 根據環境決定重定向路徑
  let redirectTarget = '';
  if(import.meta.env.MODE === 'development') {
    const redirectPath = '/google/callback';
    redirectTarget = `${baseUrl}${redirectPath}`;
    console.log(redirectTarget);
  } else {
    const redirectPath = '/google/callback';
    redirectTarget = `${baseUrl}${redirectPath}`;
    console.log(redirectTarget);
  }
  
  // 將重定向 URL 編碼後作為 state 參數傳遞
  const encodedRedirectTarget = encodeURIComponent(redirectTarget);

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=${encodeURIComponent(import.meta.env.VITE_GOOGLE_CALLBACK_URL)}&scope=email%20profile&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&state=${encodedRedirectTarget}`;
  
  window.location.href = authUrl;
}
</script> 