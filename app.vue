<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

// 在應用啟動時執行認證檢查
onMounted(async () => {
  try {
    // 先從 localStorage 恢復用戶資料
    await userStore.restoreUser()
    
    // 只在有 token 的情況下檢查登入狀態
    const currentToken = userStore.token || localStorage.getItem('auth_token')
    if (currentToken) {
      console.log('應用啟動時發現 token，執行登入檢查')
      await userStore.check()
    } else {
      console.log('應用啟動時未發現 token，跳過登入檢查')
    }
  } catch (error) {
    console.error('應用啟動時認證檢查失敗:', error)
  }
})
</script>
