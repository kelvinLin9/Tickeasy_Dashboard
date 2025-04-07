<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div v-if="loading" class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="mt-4 text-gray-600">正在處理登入...</p>
    </div>
    <div v-else-if="error" class="text-center">
      <div class="text-red-500 text-xl mb-4">{{ error }}</div>
      <NuxtLink to="/login" class="text-primary hover:underline">
        返回登入頁面
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    await handleToken()
  } catch (err) {
    error.value = err instanceof Error ? err.message : '登入過程中發生錯誤'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
})

async function handleToken() {
  // 從 URL query 參數獲取 token
  const token = route.query.token as string

  if (!token) {
    throw new Error('未找到登入令牌')
  }

  try {
    // 獲取用戶詳細資料
    const response = await fetch(`${import.meta.env.VITE_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('獲取用戶資料失敗')
    }

    const { user: userProfile } = await response.json()
    console.log('用戶資料:', userProfile)

    // 設置用戶信息到 store
    userStore.setUser({
      id: userProfile._id,
      role: userProfile.role,
      token: token,
      name: userProfile.name,
      email: userProfile.email,
      photo: userProfile.photo
    })

    // 統一重定向到首頁
    await router.push('/')
  } catch (err) {
    console.error('Token parsing error:', err)
    throw new Error('無效的登入令牌')
  }
}
</script> 