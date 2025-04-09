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
          <!-- Desktop Navigation -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink to="/" class="nav-link">
              首頁
            </NuxtLink>
            <NuxtLink to="/events" class="nav-link">
              活動
            </NuxtLink>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden">
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <span class="sr-only">開啟選單</span>
            <svg
              class="h-6 w-6"
              :class="{ 'hidden': isMobileMenuOpen, 'block': !isMobileMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              class="h-6 w-6"
              :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <template v-if="isAuthenticated">
            <div class="ml-3 relative">
              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <img
                    v-if="userPhoto"
                    :src="userPhoto"
                    :alt="userName || ''"
                    class="h-8 w-8 rounded-full object-cover"
                  >
                  <img
                    v-else
                    src="/images/default-avatar.svg"
                    alt="Default avatar"
                    class="h-8 w-8 rounded-full object-cover"
                  >
                  <div class="ml-2">
                    <div class="text-sm font-medium text-gray-700">{{ userName }}</div>
                  </div>
                </div>
                <button
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  @click="handleLogout"
                >
                  登出
                </button>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink
              to="/login"
              class="nav-link"
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

    <!-- Mobile menu -->
    <div
      class="sm:hidden"
      :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }"
    >
      <div class="pt-2 pb-3 space-y-1">
        <NuxtLink to="/" class="nav-link block">
          首頁
        </NuxtLink>
        <NuxtLink to="/events" class="nav-link block">
          活動
        </NuxtLink>
        <template v-if="isAuthenticated">
          <div class="px-4 py-2">
            <div class="flex items-center">
              <img
                v-if="userPhoto"
                :src="userPhoto"
                :alt="userName || ''"
                class="h-8 w-8 rounded-full object-cover"
              >
              <img
                v-else
                src="/images/default-avatar.svg"
                alt="Default avatar"
                class="h-8 w-8 rounded-full object-cover"
              >
              <div class="ml-2">
                <div class="text-sm font-medium text-gray-700">{{ userName }}</div>
              </div>
            </div>
            <button
              class="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              @click="handleLogout"
            >
              登出
            </button>
          </div>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="nav-link block">
            登入
          </NuxtLink>
          <NuxtLink to="/register" class="nav-link block">
            註冊
          </NuxtLink>
        </template>
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
const isMobileMenuOpen = ref(false)
const config = useRuntimeConfig()
const isDev = config.public.devMode

// 使用 storeToRefs 來保持響應性
const { isAuthenticated, userName, userRole, userPhoto, userEmail } = storeToRefs(userStore)

// 監聽用戶狀態變化
watch([isAuthenticated, userName, userEmail, userPhoto, userRole], ([newIsAuth, newName, newEmail, newPhoto, newRole]) => {
  if (isDev) {
    // console.log('用戶狀態更新:', {
    //   認證狀態: newIsAuth,
    //   用戶名稱: newName,
    //   電子郵件: newEmail,
    //   頭像URL: newPhoto,
    //   用戶角色: newRole
    // })
  }
}, { deep: true })

// 在組件掛載時恢復用戶狀態
onMounted(() => {
  if (isDev) {
    // console.log('初始用戶資料:', {
    //   認證狀態: userStore.isAuthenticated,
    //   用戶名稱: userName.value,
    //   電子郵件: userEmail.value,
    //   頭像URL: userPhoto.value,
    //   用戶角色: userRole.value,
    //   完整用戶資料: userStore.$state
    // })
  }
  
  userStore.restoreUser()
})

const handleLogout = () => {
  userStore.clearUser()
  router.push('/login')
}
</script> 