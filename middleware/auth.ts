import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware(async (to) => {
  console.log('執行身份驗證中間件')
  console.log('目標路由:', to.path)
  
  const userStore = useUserStore()
  const publicRoutes = ['/login', '/register', '/google/callback']

  // 如果是公開路由，直接放行
  if (publicRoutes.includes(to.path)) {
    console.log('訪問公開路由，直接放行')
    return
  }

  // 主動檢查用戶登入狀態
  console.log('開始檢查用戶登入狀態')
  const isAuthenticated = await userStore.check()
  console.log('檢查結果:', isAuthenticated ? '已登入' : '未登入')

  // 檢查用戶是否已登入
  if (!isAuthenticated) {
    console.log('用戶未登入，重定向到登入頁面')
    // 保存原始目標路徑
    const redirectPath = encodeURIComponent(to.fullPath)
    return navigateTo(`/login?redirect=${redirectPath}`)
  }

  // 檢查管理員權限
  if (to.path.startsWith('/admin') && userStore.userRole !== 'admin') {
    console.log('非管理員訪問管理頁面，重定向到儀表板')
    return navigateTo('/dashboard')
  }

  console.log('身份驗證通過，允許訪問')
}) 