<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">訂單記錄</h1>
    
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="mt-4 text-gray-600">載入中...</p>
    </div>
    
    <div v-else-if="orders.length === 0" class="text-center py-12">
      <p class="text-neutral-500">您目前沒有訂單記錄</p>
      <NuxtLink
        to="/events"
        class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        瀏覽活動
      </NuxtLink>
    </div>
    
    <div v-else class="space-y-6">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white shadow rounded-lg overflow-hidden"
      >
        <div class="px-4 py-5 sm:px-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-medium text-gray-900">訂單 #{{ order.id }}</h3>
              <p class="mt-1 text-sm text-neutral-500">{{ order.date }}</p>
            </div>
            <span
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              ]"
            >
              {{ 
                order.status === 'completed' ? '已完成' :
                order.status === 'pending' ? '處理中' :
                '已取消'
              }}
            </span>
          </div>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-neutral-500">活動名稱</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ order.eventName }}</dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-neutral-500">票券數量</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ order.quantity }} 張</dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-neutral-500">總金額</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">NT$ {{ order.total }}</dd>
            </div>
          </dl>
        </div>
        <div class="bg-gray-50 px-4 py-4 sm:px-6">
          <div class="flex justify-end space-x-3">
            <NuxtLink
              v-if="order.status === 'completed'"
              :to="`/tickets?order=${order.id}`"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              查看票券
            </NuxtLink>
            <button
              v-if="order.status === 'pending'"
              @click="cancelOrder(order)"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              取消訂單
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'

definePageMeta({
  middleware: ['auth']
})

const userStore = useUserStore()
const loading = ref(true)
const orders = ref([])

// 模擬載入訂單數據
onMounted(async () => {
  try {
    // 這裡應該是從 API 獲取數據
    // 暫時使用模擬數據
    await new Promise(resolve => setTimeout(resolve, 1000))
    orders.value = [
      {
        id: 'ORD-2024-001',
        date: '2024-10-15 14:30',
        status: 'completed',
        eventName: '周杰倫演唱會',
        quantity: 2,
        total: 5600
      },
      {
        id: 'ORD-2024-002',
        date: '2024-10-20 09:15',
        status: 'pending',
        eventName: '五月天演唱會',
        quantity: 1,
        total: 2800
      }
    ]
  } catch (error) {
    console.error('Failed to load orders:', error)
  } finally {
    loading.value = false
  }
})

const cancelOrder = async (order) => {
  if (!confirm('確定要取消此訂單嗎？')) {
    return
  }

  try {
    // 這裡應該是調用 API 取消訂單
    // 暫時直接更新本地數據
    const index = orders.value.findIndex(o => o.id === order.id)
    if (index !== -1) {
      orders.value[index].status = 'cancelled'
    }
  } catch (error) {
    console.error('Failed to cancel order:', error)
    alert('取消訂單失敗，請稍後再試')
  }
}
</script> 