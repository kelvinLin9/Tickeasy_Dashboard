<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    ...
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
import { checkLogin } from '~/api/check'
import { getUserProfile } from '~/api/profile'

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
  console.log('開始處理 Google 登入回調')
  // 從 URL query 參數獲取 token
  const token = route.query.token as string
  console.log('從 URL 獲取的 token:', token ? '存在' : '不存在')
  
  if (!token) {
    console.error('未找到登入令牌')
    throw new Error('未找到登入令牌')
  }
  console.log('token:', token)
  try {
    // 1. 先檢查 token 有效性
    console.log('開始檢查 token 有效性')
    const res = await checkLogin(`Bearer ${token}`)
    console.log('res:', res)

    // if (checkError.value) {
    //   console.error('Token 檢查失敗:', checkError.value)
    //   if (checkError.value.statusCode === 401) {
    //     throw new Error('登入令牌已過期')
    //   }
    //   throw new Error('登入令牌無效')
    // }

    // if (!checkData.value?.user) {
    //   console.error('Token 檢查返回數據為空')
    //   throw new Error('無效的用戶資料')
    // }

    // 2. 獲取用戶詳細資料
    console.log('開始獲取用戶詳細資料')
    const profileResponse = await getUserProfile(token)
    console.log('profileResponse:', profileResponse)
    
    if (!profileResponse.success || !profileResponse.user) {
      console.error('API 返回的用戶資料為空')
      throw new Error('無效的用戶資料')
    }

    const userProfile = profileResponse.user
    console.log('成功獲取用戶資料:', {
      id: userProfile._id,
      email: userProfile.email,
      role: userProfile.role,
      avatar: userProfile.avatar
    })

    // 3. 設置用戶信息到 store
    console.log('開始設置用戶資料到 store')
    userStore.setUser({
      id: userProfile._id,
      role: userProfile.role,
      token: token,
      name: userProfile.email.split('@')[0], // 使用郵箱前綴作為名稱
      email: userProfile.email,
      avatar: userProfile.avatar
    })
    console.log('用戶資料設置完成')

    // 4. 重定向到首頁
    console.log('重定向到首頁')
    await router.push('/')
  } catch (err) {
    console.error('處理登入令牌時發生錯誤:', err)
    throw err
  }
}
</script> 