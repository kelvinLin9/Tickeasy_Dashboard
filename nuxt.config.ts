// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  
  css: ['~/assets/css/main.css'],

  // Content 配置
  content: {
    // 啟用文檔驅動模式
    documentDriven: true,
    // 配置 markdown 渲染
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },

  // 設置開發服務器端口
  devServer: {
    port: 3090
  }
})