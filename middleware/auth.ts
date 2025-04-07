import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()
  const publicRoutes = ['/login', '/register', '/google/callback']

  // 如果是公開路由，直接放行
  if (publicRoutes.includes(to.path)) {
    return
  }

  // 檢查用戶是否已登入
  if (!userStore.isAuthenticated) {
    // 保存原始目標路徑
    const redirectPath = encodeURIComponent(to.fullPath)
    return navigateTo(`/login?redirect=${redirectPath}`)
  }

  // 檢查管理員權限
  if (to.path.startsWith('/admin') && userStore.userRole !== 'admin') {
    return navigateTo('/dashboard')
  }
}) 