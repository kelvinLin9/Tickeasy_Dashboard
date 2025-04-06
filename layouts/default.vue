<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 頂部導航欄 -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-neutral-800">Tickeasy Dashboard</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink to="/" class="nav-link">首頁</NuxtLink>
              <NuxtLink to="/concerts" class="nav-link">演唱會管理</NuxtLink>
              <NuxtLink to="/tickets" class="nav-link">票券管理</NuxtLink>
              <NuxtLink to="/orders" class="nav-link">訂單管理</NuxtLink>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <UButton
              color="primary"
              variant="ghost"
              to="/auth/login"
            >
              登入
            </UButton>
            <UButton
              color="primary"
              to="/auth/register"
            >
              註冊
            </UButton>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要內容區域 -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<style scoped>

</style> 