<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 使用 SiteNavbar 組件 -->
    <SiteNavbar />

    <!-- 主要內容區域 -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.nav-link {
  /* @apply border-transparent text-neutral-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium; */
}
</style> 