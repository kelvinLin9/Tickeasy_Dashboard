<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-neutral-900">活動管理</h1>
        <p class="mt-2 text-sm text-neutral-700">
          管理所有活動和演唱會
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <UButton
          color="primary"
          icon="i-heroicons-plus"
          to="/events/create"
        >
          新增活動
        </UButton>
      </div>
    </div>

    <!-- 活動列表 -->
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <UTable
            :columns="columns"
            :rows="events"
            :loading="loading"
          >
            <template #empty-state>
              <div class="text-center py-4">
                <p class="text-sm text-neutral-500">尚無活動資料</p>
              </div>
            </template>
          </UTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(false)
const events = ref([])

const columns = [
  {
    key: 'name',
    label: '活動名稱'
  },
  {
    key: 'date',
    label: '日期'
  },
  {
    key: 'venue',
    label: '場地'
  },
  {
    key: 'status',
    label: '狀態'
  },
  {
    key: 'actions',
    label: '操作'
  }
]

// TODO: 實作獲取活動列表的邏輯
</script> 