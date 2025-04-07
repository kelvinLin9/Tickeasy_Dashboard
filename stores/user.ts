import { defineStore } from 'pinia'

interface UserState {
  id: string | null
  role: string | null
  token: string | null
  isAuthenticated: boolean
  name: string | null
  email: string | null
  photo: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: null,
    role: null,
    token: null,
    isAuthenticated: false,
    name: null,
    email: null,
    photo: null
  }),

  getters: {
    userId: (state: UserState) => state.id,
    userRole: (state: UserState) => state.role,
    authToken: (state: UserState) => state.token,
    userName: (state: UserState) => state.name,
    userEmail: (state: UserState) => state.email,
    userPhoto: (state: UserState) => state.photo
  },

  actions: {
    setUser(userData: { 
      id: string
      role: string
      token: string
      name?: string
      email?: string
      photo?: string
    }) {
      this.$patch({
        id: userData.id,
        role: userData.role,
        token: userData.token,
        name: userData.name || null,
        email: userData.email || null,
        photo: userData.photo || null,
        isAuthenticated: true
      })

      // 同時更新 localStorage
      localStorage.setItem('auth_token', userData.token)
      localStorage.setItem('user_info', JSON.stringify({
        userId: userData.id,
        role: userData.role,
        name: userData.name,
        email: userData.email,
        photo: userData.photo
      }))
    },

    clearUser() {
      this.$patch({
        id: null,
        role: null,
        token: null,
        name: null,
        email: null,
        photo: null,
        isAuthenticated: false
      })

      // 清除 localStorage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_info')
    },

    // 從 localStorage 恢復用戶狀態
    restoreUser() {
      const token = localStorage.getItem('auth_token')
      const userInfo = localStorage.getItem('user_info')

      if (token && userInfo) {
        try {
          const { userId, role, name, email, photo } = JSON.parse(userInfo)
          this.$patch({
            id: userId,
            role,
            token,
            name,
            email,
            photo,
            isAuthenticated: true
          })
        } catch (error) {
          console.error('Failed to restore user state:', error)
          this.clearUser()
        }
      } else {
        this.clearUser()
      }
    }
  }
}) 