import { createPinia } from "pinia";
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persist)

// 默认导出 只能有一个
export default pinia

// 按需导出 可以有多个
// export * 统一导出
export * from './modules/user'
export * from './modules/consult'