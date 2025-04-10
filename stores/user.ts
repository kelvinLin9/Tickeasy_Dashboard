import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { checkLogin } from '~/api/check'
import { getUserProfile } from '~/api/profile'

export const useUserStore = defineStore('user', () => {
  // State
  const id = ref<string | null>(null)
  const role = ref<string | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = ref<boolean>(false)
  const name = ref<string | null>(null)
  const email = ref<string | null>(null)
  const avatar = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  // Getters
  const userId = computed(() => id.value)
  const userRole = computed(() => role.value)
  const authToken = computed(() => token.value)
  const userName = computed(() => name.value)
  const userEmail = computed(() => email.value)
  const userPhoto = computed(() => avatar.value)

  // Actions
  async function check() {
    console.log('開始檢查用戶登入狀態')
    isLoading.value = true
    
    try {
      const currentToken = token.value || localStorage.getItem('auth_token')
      console.log('當前 Token:', currentToken ? '存在' : '不存在')
      
      if (!currentToken) {
        console.log('未找到 Token，清除用戶資料')
        clearUser()
        return false
      }

      // 1. 檢查登入狀態
      console.log('開始調用 checkLogin API')
      const checkResponse = await checkLogin(`Bearer ${currentToken}`)
      console.log('Check API 返回數據:', checkResponse)

      if (!checkResponse) {
        console.error('Check API 返回數據為空')
        clearUser()
        return false
      }

      // 檢查 success 或 status 屬性
      const isSuccessful = checkResponse.success || checkResponse.status
      if (!isSuccessful) {
        console.error('Check API 返回失敗')
        clearUser()
        return false
      }

      // 2. 獲取用戶詳細資料
      console.log('開始獲取用戶詳細資料')
      const profileResponse = await getUserProfile(currentToken)

      if (!profileResponse?.user) {
        console.error('Profile API 返回數據為空')
        clearUser()
        return false
      }

      const userProfile = profileResponse.user
      console.log('成功獲取用戶資料:', {
        id: userProfile._id,
        email: userProfile.email,
        role: userProfile.role
      })
      
      // 3. 更新用戶資料
      setUser({
        id: userProfile._id,
        role: userProfile.role,
        token: currentToken,
        name: userProfile.email.split('@')[0], // 使用郵箱前綴作為名稱
        email: userProfile.email,
        avatar: userProfile.avatar
      })

      console.log('用戶資料更新完成')
      return true
    } catch (error) {
      console.error('認證檢查失敗:', error)
      clearUser()
      return false
    } finally {
      isLoading.value = false
    }
  }

  const setUser = async (userData: {
    id: string;
    role: string;
    token: string;
    name: string | null;
    email: string;
    avatar: string;
  }) => {
    try {
      id.value = userData.id
      role.value = userData.role
      token.value = userData.token
      name.value = userData.name
      email.value = userData.email
      avatar.value = userData.avatar
      isAuthenticated.value = true
      
      localStorage.setItem('auth_token', userData.token)
    } catch (error) {
      console.error('設置用戶資料失敗:', error)
      clearUser()
    }
  }

  function clearUser() {
    id.value = null
    role.value = null
    token.value = null
    isAuthenticated.value = false
    name.value = null
    email.value = null
    avatar.value = null
    
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_info')
  }

  const restoreUser = async () => {
    try {
      const storedToken = localStorage.getItem('auth_token')
      if (!storedToken) {
        clearUser()
        return
      }

      const checkResponse = await checkLogin(storedToken)
      
      // 檢查 success 或 status 屬性
      const isSuccessful = checkResponse?.success || checkResponse?.status
      
      if (isSuccessful) {
        const profileResponse = await getUserProfile(storedToken)
        const profileSuccessful = profileResponse?.success || profileResponse?.status
        
        if (profileSuccessful && profileResponse.user) {
          const userProfile = profileResponse.user
          setUser({
            id: userProfile._id,
            role: userProfile.role,
            token: storedToken,
            name: userProfile.email.split('@')[0], // 使用郵箱前綴作為名稱
            email: userProfile.email,
            avatar: userProfile.avatar
          })
        }
      } else {
        clearUser()
      }
    } catch (error) {
      console.error('恢復用戶資料失敗:', error)
      clearUser()
    }
  }

  return {
    // State
    id,
    role,
    token,
    isAuthenticated,
    name,
    email,
    avatar,
    isLoading,
    // Getters
    userId,
    userRole,
    authToken,
    userName,
    userEmail,
    userPhoto,
    // Actions
    setUser,
    clearUser,
    restoreUser,
    check
  }
}) 