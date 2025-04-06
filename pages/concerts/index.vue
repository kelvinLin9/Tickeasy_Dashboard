<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-neutral-900">演唱會管理</h1>
      <UButton
        color="primary"
        icon="i-heroicons-plus"
        @click="navigateTo('/concerts/create')"
      >
        新增演唱會
      </UButton>
    </div>

    <!-- 搜尋和篩選 -->
    <div class="mt-4 flex gap-4">
      <UInput
        v-model="search"
        icon="i-heroicons-magnifying-glass"
        placeholder="搜尋演唱會..."
        class="w-64"
      />
      <USelect
        v-model="status"
        :options="statusOptions"
        placeholder="狀態"
        class="w-40"
      />
    </div>

    <!-- 演唱會列表 -->
    <div class="mt-6 bg-white shadow rounded-lg overflow-hidden">
      <UTable
        :columns="columns"
        :rows="concerts"
      >
        <template #status-data="{ row }">
          <UBadge
            :color="getStatusColor(row.status)"
            :label="row.status"
          />
        </template>
        <template #actions-data="{ row }">
          <div class="flex gap-2">
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-heroicons-pencil"
              @click="navigateTo(`/concerts/${row.id}/edit`)"
            />
            <UButton
              color="red"
              variant="ghost"
              icon="i-heroicons-trash"
              @click="deleteConcert(row.id)"
            />
          </div>
        </template>
      </UTable>
    </div>
  </div>
</template>

<script setup>
const search = ref('')
const status = ref('')
const statusOptions = [
  { label: '全部', value: '' },
  { label: '即將開始', value: 'upcoming' },
  { label: '進行中', value: 'ongoing' },
  { label: '已結束', value: 'ended' }
]

const columns = [
  {
    id: 'name',
    key: 'name',
    label: '演唱會名稱'
  },
  {
    id: 'date',
    key: 'date',
    label: '日期'
  },
  {
    id: 'venue',
    key: 'venue',
    label: '場地'
  },
  {
    id: 'status',
    key: 'status',
    label: '狀態'
  },
  {
    id: 'actions',
    key: 'actions',
    label: '操作'
  }
]

const concerts = ref([])

const getStatusColor = (status) => {
  const colors = {
    upcoming: 'blue',
    ongoing: 'green',
    ended: 'gray'
  }
  return colors[status] || 'gray'
}

const deleteConcert = async (id) => {
  // TODO: 實現刪除功能
  console.log('Delete concert:', id)
}
</script> 