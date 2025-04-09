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
  // 先從 localStorage 恢復用戶資料
  userStore.restoreUser()
  
  // 然後檢查登入狀態
  await userStore.check()
})
</script>
