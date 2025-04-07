<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-neutral-900">
          登入您的帳號
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">電子郵件</label>
            <UInput
              id="email"
              v-model="email"
              type="email"
              placeholder="電子郵件"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label for="password" class="sr-only">密碼</label>
            <UInput
              id="password"
              v-model="password"
              type="password"
              placeholder="密碼"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <UCheckbox v-model="rememberMe" label="記住我" />
          </div>

          <div class="text-sm">
            <NuxtLink to="/auth/forgot-password" class="font-medium text-indigo-600 hover:text-indigo-500">
              忘記密碼？
            </NuxtLink>
          </div>
        </div>

        <div>
          <UButton
            type="submit"
            color="primary"
            block
            :loading="loading"
          >
            登入
          </UButton>
        </div>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-neutral-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-neutral-50 text-neutral-500">或</span>
          </div>
        </div>

        <div>
          <UButton
            color="white"
            block
            @click="handleGoogleLogin"
            :loading="googleLoading"
          >
            <template #leading>
              <img src="/google-logo.svg" alt="Google" class="h-5 w-5" />
            </template>
            使用 Google 帳號登入
          </UButton>
        </div>

        <div class="text-center">
          <p class="text-sm text-neutral-600">
            還沒有帳號？
            <NuxtLink to="/auth/register" class="font-medium text-indigo-600 hover:text-indigo-500">
              立即註冊
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const googleLoading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    // TODO: 實現登入邏輯
    console.log('Login with:', { email: email.value, password: password.value })
    
    // 模擬 API 調用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 登入成功後跳轉到首頁
    navigateTo('/')
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = async () => {

  // TODO: 實現 Google 登入邏輯
  console.log('Google login')
  
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