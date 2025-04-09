<template>
  <div>
    <h1 class="text-2xl font-semibold text-neutral-900">儀表板</h1>
    
    <!-- 統計卡片 -->
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <UCard class="bg-white shadow rounded-lg">
        <template #header>
          <div class="flex items-center">
            <UIcon name="i-heroicons-ticket" class="h-6 w-6 text-blue-500" />
            <h3 class="ml-2 text-lg font-medium">今日訂單</h3>
          </div>
        </template>
        <p class="text-3xl font-bold">0</p>
      </UCard>

      <UCard class="bg-white shadow rounded-lg">
        <template #header>
          <div class="flex items-center">
            <UIcon name="i-heroicons-currency-dollar" class="h-6 w-6 text-green-500" />
            <h3 class="ml-2 text-lg font-medium">今日收入</h3>
          </div>
        </template>
        <p class="text-3xl font-bold">$0</p>
      </UCard>

      <UCard class="bg-white shadow rounded-lg">
        <template #header>
          <div class="flex items-center">
            <UIcon name="i-heroicons-musical-note" class="h-6 w-6 text-purple-500" />
            <h3 class="ml-2 text-lg font-medium">進行中演唱會</h3>
          </div>
        </template>
        <p class="text-3xl font-bold">0</p>
      </UCard>

      <UCard class="bg-white shadow rounded-lg">
        <template #header>
          <div class="flex items-center">
            <UIcon name="i-heroicons-users" class="h-6 w-6 text-yellow-500" />
            <h3 class="ml-2 text-lg font-medium">活躍用戶</h3>
          </div>
        </template>
        <p class="text-3xl font-bold">0</p>
      </UCard>
    </div>

    <!-- 最近訂單 -->
    <div class="mt-8">
      <h2 class="text-lg font-medium text-neutral-900">最近訂單</h2>
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
            <tr v-if="rows.length === 0">
              <td :colspan="columns.length" class="px-6 py-4 text-center text-sm text-gray-500">
                尚無訂單資料
              </td>
            </tr>
            <tr v-for="row in rows" :key="row.id">
              <td v-for="col in columns" :key="col.id" class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ row[col.key] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const columns = [
  {
    id: 'id',
    key: 'id',
    label: '訂單編號'
  },
  {
    id: 'concert',
    key: 'concert',
    label: '演唱會'
  },
  {
    id: 'customer',
    key: 'customer',
    label: '客戶'
  },
  {
    id: 'amount',
    key: 'amount',
    label: '金額'
  },
  {
    id: 'status',
    key: 'status',
    label: '狀態'
  }
]

const rows = []
</script> 