<template>
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-800">
              Tickeasy
            </NuxtLink>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink
              to="/"
              class="border-transparent text-neutral-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              首頁
            </NuxtLink>
            <NuxtLink
              to="/events"
              class="border-transparent text-neutral-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              活動
            </NuxtLink>
            <template v-if="isAuthenticated">
              <NuxtLink
                to="/tickets"
                class="border-transparent text-neutral-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                我的票券
              </NuxtLink>
              <NuxtLink
                to="/orders"
                class="border-transparent text-neutral-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                訂單記錄
              </NuxtLink>
            </template>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <!-- Debug info -->
          <div class="text-xs text-neutral-500 mr-4">
            Auth: {{ isAuthenticated }}
            <br>
            Name: {{ userName }}
            <br>
            Photo: {{ userPhoto }}
          </div>
          
          <template v-if="isAuthenticated">
            <div class="ml-3 relative">
              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <img
                    v-if="userPhoto"
                    :src="userPhoto || ''"
                    :alt="userName || ''"
                    class="h-8 w-8 rounded-full"
                  />
                  <div v-else class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span class="text-neutral-500 text-sm">{{ userName?.[0] || 'U' }}</span>
                  </div>
                  <div class="ml-2">
                    <div class="text-sm font-medium text-gray-700">{{ userName }}</div>
                    <div class="text-xs text-neutral-500">{{ userRole === 'admin' ? '管理員' : '用戶' }}</div>
                  </div>
                </div>
                <button
                  @click="handleLogout"
                  class="text-neutral-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  登出
                </button>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink
              to="/login"
              class="text-neutral-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              登入
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              註冊
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'SiteNavbar'
})

const userStore = useUserStore()
const router = useRouter()

// 使用 storeToRefs 來保持響應性
const { isAuthenticated, userName, userRole, userPhoto } = storeToRefs(userStore)

// 在組件掛載時恢復用戶狀態
onMounted(() => {
  console.log('Before restore:', {
    isAuthenticated: userStore.isAuthenticated,
    token: localStorage.getItem('auth_token'),
    userInfo: localStorage.getItem('user_info')
  })
  
  userStore.restoreUser()
  
  console.log('After restore:', {
    isAuthenticated: userStore.isAuthenticated,
    token: localStorage.getItem('auth_token'),
    userInfo: localStorage.getItem('user_info')
  })
})

const handleLogout = () => {
  userStore.clearUser()
  router.push('/login')
}
</script> 