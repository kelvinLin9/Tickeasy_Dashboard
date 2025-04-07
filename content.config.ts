import { defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  // 配置導航
  navigation: {
    fields: ['title', 'description']
  },

  // 配置 markdown 渲染
  markdown: {
    toc: {
      depth: 3,
      searchDepth: 3
    }
  }
}) 