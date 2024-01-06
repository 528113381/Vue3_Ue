import { createRouter, createWebHashHistory } from 'vue-router'
import { userStore } from '@/stores'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // 路由元信息
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册'
      },
      component: () => import('@/views/Register/index.vue')
    },
    {
      path: '/',
      component: () => import('@/Layout/index.vue'),
      // layout布局组件，一般不会直接跳转过去，一般是通过下面的子路由，顺带着吧布局组件带出来
      // 没有专门看布局组件的路由，经常会给布局组件添加一个路由重定向
      redirect: '/home',
      children: [
        {
          path: '/user',
          name: 'user',
          meta: {
            title: '个人中心'
          },
          component: () => import('@/views/User/index.vue')
        },
        {
          path: '/home',
          name: 'home',
          meta: {
            title: '首页'
          },
          // beforeEnter: () => {
          //   console.log('当前首页独享的路由守卫，beforeEnter')
          // },
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: '/article',
          name: 'article',
          meta: {
            title: '健康百科'
          },
          component: () => import('@/views/Article/index.vue')
        },
        {
          path: '/notify',
          name: 'notify',
          meta: {
            title: '消息中心'
          },
          component: () => import('@/views/Notify/index.vue')
        }
      ]
    }
  ]
})
// 1.全局路由守卫
// 全局前置守卫
// vue2写法
// router.beforeEach((to, from, next) => {
//   // console.log('beforeEach钩子', to)
//   // 判断当前用户有没有登录，如果登录了就放行，如果没有就跳转回登录页面 /login
//   const store = userStore()
//   console.log(store.user)

//   if (to.path === '/login') {
//     next()
//     return
//   }

//   if (!store.user?.token) {
//     // router.push('/login')
//     next('/login')
//     return
//   }
//   next()
//   return true // 表示路由放行，类似于vue2的 next()
// })
const whiteList = ['/login',]

router.beforeEach((to) => {
  NProgress.start()
  const store = userStore()
  if (!store.user?.token && !whiteList.includes(to.path)) {
    return '/login'
  }
})

// 后置路由守卫
router.afterEach((to) => {
  document.title = `优医问诊-${to.meta?.title}`
  NProgress.done()
})

//2. 

export default router
