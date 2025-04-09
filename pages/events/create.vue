<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-neutral-900">新增活動</h1>
        <p class="mt-2 text-sm text-neutral-700">
          建立新的活動或演唱會
        </p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
      <UCard>
        <template #header>
          <h3 class="text-lg font-medium">活動資訊</h3>
        </template>

        <div class="space-y-4">
          <UFormGroup label="活動名稱" required>
            <UInput v-model="form.name" placeholder="請輸入活動名稱" />
          </UFormGroup>

          <UFormGroup label="活動日期" required>
            <UInput v-model="form.date" type="date" />
          </UFormGroup>

          <UFormGroup label="活動場地" required>
            <UInput v-model="form.venue" placeholder="請輸入活動場地" />
          </UFormGroup>

          <UFormGroup label="活動描述">
            <UTextarea v-model="form.description" placeholder="請輸入活動描述" />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex justify-end space-x-3">
            <UButton
              color="gray"
              variant="soft"
              to="/events"
            >
              取消
            </UButton>
            <UButton
              type="submit"
              color="primary"
              :loading="loading"
            >
              建立活動
            </UButton>
          </div>
        </template>
      </UCard>
    </form>
  </div>
</template>

<script setup>
const loading = ref(false)
const form = ref({
  name: '',
  date: '',
  venue: '',
  description: ''
})

const handleSubmit = async () => {
  loading.value = true
  try {
    // TODO: 實作建立活動的邏輯
    await navigateTo('/events')
  } catch (error) {
    console.error('建立活動失敗:', error)
  } finally {
    loading.value = false
  }
}
</script> 