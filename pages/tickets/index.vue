<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">我的票券</h1>
    
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="mt-4 text-gray-600">載入中...</p>
    </div>
    
    <div v-else-if="tickets.length === 0" class="text-center py-12">
      <p class="text-neutral-500">您目前沒有票券</p>
      <NuxtLink
        to="/events"
        class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        瀏覽活動
      </NuxtLink>
    </div>
    
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="bg-white overflow-hidden shadow rounded-lg"
      >
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900">{{ ticket.eventName }}</h3>
          <p class="mt-1 text-sm text-neutral-500">{{ ticket.eventDate }}</p>
          <div class="mt-4">
            <span
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                ticket.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              ]"
            >
              {{ ticket.status === 'active' ? '有效' : '已使用' }}
            </span>
          </div>
          <div class="mt-4">
            <p class="text-sm text-neutral-500">票券編號：{{ ticket.code }}</p>
            <p class="text-sm text-neutral-500">座位：{{ ticket.seat }}</p>
          </div>
          <div class="mt-6">
            <button
              v-if="ticket.status === 'active'"
              @click="showQRCode(ticket)"
              class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              顯示 QR Code
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- QR Code Modal -->
    <div
      v-if="selectedTicket"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4"
      @click="selectedTicket = null"
    >
      <div
        class="bg-white rounded-lg p-6 max-w-sm w-full"
        @click.stop
      >
        <div class="text-center">
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ selectedTicket.eventName }}</h3>
          <div class="bg-white p-4 rounded-lg">
            <!-- 這裡可以放置 QR Code 圖片或組件 -->
            <div class="w-48 h-48 bg-gray-100 mx-auto flex items-center justify-center">
              <span class="text-gray-400">QR Code</span>
            </div>
          </div>
          <p class="mt-4 text-sm text-neutral-500">票券編號：{{ selectedTicket.code }}</p>
          <button
            class="mt-6 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            @click="selectedTicket = null"
          >
            關閉
          </button>
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
const tickets = ref([])
const selectedTicket = ref(null)

// 模擬載入票券數據
onMounted(async () => {
  try {
    // 這裡應該是從 API 獲取數據
    // 暫時使用模擬數據
    await new Promise(resolve => setTimeout(resolve, 1000))
    tickets.value = [
      {
        id: '1',
        eventName: '周杰倫演唱會',
        eventDate: '2024-12-31 19:30',
        status: 'active',
        code: 'TICKET-2024-001',
        seat: 'A區-12排-5號'
      },
      {
        id: '2',
        eventName: '五月天演唱會',
        eventDate: '2024-11-15 19:00',
        status: 'used',
        code: 'TICKET-2024-002',
        seat: 'B區-8排-3號'
      }
    ]
  } catch (error) {
    console.error('Failed to load tickets:', error)
  } finally {
    loading.value = false
  }
})

const showQRCode = (ticket) => {
  selectedTicket.value = ticket
}
</script> 