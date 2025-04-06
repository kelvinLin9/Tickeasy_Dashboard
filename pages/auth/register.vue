<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-neutral-900">
          註冊新帳號
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">姓名</label>
            <UInput
              id="name"
              v-model="name"
              type="text"
              placeholder="姓名"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label for="email" class="sr-only">電子郵件</label>
            <UInput
              id="email"
              v-model="email"
              type="email"
              placeholder="電子郵件"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label for="confirmPassword" class="sr-only">確認密碼</label>
            <UInput
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              placeholder="確認密碼"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
        </div>

        <div class="flex items-center">
          <UCheckbox
            v-model="agreeTerms"
            label="我同意服務條款和隱私政策"
            required
          />
        </div>

        <div>
          <UButton
            type="submit"
            color="primary"
            block
            :loading="loading"
          >
            註冊
          </UButton>
        </div>

        <div class="text-center">
          <p class="text-sm text-neutral-600">
            已經有帳號？
            <NuxtLink to="/auth/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              立即登入
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const loading = ref(false)

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    // TODO: 顯示錯誤訊息
    console.error('密碼不一致')
    return
  }

  try {
    loading.value = true
    // TODO: 實現註冊邏輯
    console.log('Register with:', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    
    // 模擬 API 調用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 註冊成功後跳轉到登入頁
    navigateTo('/auth/login')
  } catch (error) {
    console.error('Registration failed:', error)
  } finally {
    loading.value = false
  }
}
</script> 