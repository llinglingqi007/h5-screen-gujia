import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 1. 创建pinia对象
const pinia = createPinia()
// 2. 在pinia中使用持久化插件
pinia.use(persist)

// 3. 导出
export default pinia

export * from './modules/screen'
