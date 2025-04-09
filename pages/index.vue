<template>
  <div>
    <h1 class="text-2xl font-semibold text-neutral-900">用戶管理</h1>
    
    <!-- 統計卡片 -->
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <UCard class="bg-white shadow rounded-lg">
        <template #header>
          <div class="flex items-center">
            <UIcon name="i-heroicons-users" class="h-6 w-6 text-blue-500" />
            <h3 class="ml-2 text-lg font-medium">總用戶數</h3>
          </div>
        </template>
        <p class="text-3xl font-bold">{{ pagination.total }}</p>
      </UCard>

      <UCard class="bg-white shadow rounded-lg">
        <template #header>
          <div class="flex items-center">
            <UIcon name="i-heroicons-user-circle" class="h-6 w-6 text-green-500" />
            <h3 class="ml-2 text-lg font-medium">活躍用戶</h3>
          </div>
        </template>
        <p class="text-3xl font-bold">{{ activeUsers }}</p>
      </UCard>

      <UCard class="bg-white shadow rounded-lg">
        <template #header>
          <div class="flex items-center">
            <UIcon name="i-heroicons-user-plus" class="h-6 w-6 text-purple-500" />
            <h3 class="ml-2 text-lg font-medium">新註冊用戶</h3>
          </div>
        </template>
        <p class="text-3xl font-bold">{{ newUsers }}</p>
      </UCard>

      <UCard class="bg-white shadow rounded-lg">
        <template #header>
          <div class="flex items-center">
            <UIcon name="i-heroicons-credit-card" class="h-6 w-6 text-yellow-500" />
            <h3 class="ml-2 text-lg font-medium">付費用戶</h3>
          </div>
        </template>
        <p class="text-3xl font-bold">{{ premiumUsers }}</p>
      </UCard>
    </div>

    <!-- 用戶列表 -->
    <div class="mt-8">
      <h2 class="text-lg font-medium text-neutral-900">用戶列表</h2>
      <div class="mt-4 bg-white shadow rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th v-for="col in columns" :key="col.id" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="users.length === 0">
              <td :colspan="columns.length" class="px-6 py-4 text-center text-sm text-gray-500">
                尚無用戶資料
              </td>
            </tr>
            <tr v-for="user in users" :key="user._id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ user._id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <img v-if="user.avatar" :src="user.avatar" class="h-8 w-8 rounded-full mr-2">
                  <span>{{ user.email }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ user.role }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(user.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span :class="getStatusClass(user.isEmailVerified)">
                  {{ user.isEmailVerified ? '已驗證' : '未驗證' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 分頁控制 -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              :disabled="!pagination.hasPrevPage"
              @click="prevPage"
            >
              上一頁
            </button>
            <button
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              :disabled="!pagination.hasNextPage"
              @click="nextPage"
            >
              下一頁
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                顯示第
                <span class="font-medium">{{ pagination.currentPage }}</span>
                頁，共
                <span class="font-medium">{{ pagination.totalPages }}</span>
                頁
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  :disabled="!pagination.hasPrevPage"
                  @click="prevPage"
                >
                  <span class="sr-only">上一頁</span>
                  <UIcon name="i-heroicons-chevron-left" class="h-5 w-5" />
                </button>
                <button
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  :disabled="!pagination.hasNextPage"
                  @click="nextPage"
                >
                  <span class="sr-only">下一頁</span>
                  <UIcon name="i-heroicons-chevron-right" class="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getUsers } from '~/api/users'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()

const columns = [
  {
    id: 'id',
    key: '_id',
    label: '用戶ID'
  },
  {
    id: 'email',
    key: 'email',
    label: '用戶資訊'
  },
  {
    id: 'role',
    key: 'role',
    label: '角色'
  },
  {
    id: 'createdAt',
    key: 'createdAt',
    label: '註冊日期'
  },
  {
    id: 'status',
    key: 'isEmailVerified',
    label: '狀態'
  }
]

const users = ref([])
const pagination = ref({
  total: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 10,
  hasNextPage: false,
  hasPrevPage: false
})

const activeUsers = ref(0)
const newUsers = ref(0)
const premiumUsers = ref(0)

// 獲取用戶數據
const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No token found')
      return
    }

    const result = await getUsers(token, pagination.value.currentPage, pagination.value.limit)
    if (result.success) {
      users.value = result.data.users
      pagination.value = result.data.pagination
      
      // 計算統計數據
      activeUsers.value = users.value.filter(user => user.isEmailVerified).length
      newUsers.value = users.value.filter(user => {
        const createdDate = new Date(user.createdAt)
        const now = new Date()
        const diffDays = Math.ceil((now - createdDate) / (1000 * 60 * 60 * 24))
        return diffDays <= 7 // 最近7天註冊的用戶
      }).length
      premiumUsers.value = users.value.filter(user => user.role === 'premium').length
    }
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

// 格式化日期
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 獲取狀態樣式
const getStatusClass = (isVerified) => {
  return isVerified
    ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
    : 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'
}

// 分頁控制
const nextPage = () => {
  if (pagination.value.hasNextPage) {
    pagination.value.currentPage++
    fetchUsers()
  }
}

const prevPage = () => {
  if (pagination.value.hasPrevPage) {
    pagination.value.currentPage--
    fetchUsers()
  }
}

// 初始加載
onMounted(() => {
  fetchUsers()
})
</script> 