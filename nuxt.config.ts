// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  typescript: {
    typeCheck: false
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  
  css: ['~/assets/css/main.css'],

  // 設置開發服務器端口
  devServer: {
    port: 3010
  },

  runtimeConfig: {
    public: {
      devMode: String(import.meta.env.DEV)
    }
  }
})