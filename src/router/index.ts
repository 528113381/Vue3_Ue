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
    },
    {
      path: '/user/updatename',
      name: 'updatename',
      meta: {
        title: '修改名称'
      },
      component: () => import('@/views/UpdateName/index.vue')
    },
    {
      path: '/user/collection',
      name: 'collection',
      meta: {
        title: '收藏'
      },
      component: () => import('@/views/Collection/index.vue')
    },
    {
      path: '/user/like',
      name: 'like',
      meta: {
        title: '关注'
      },
      component: () => import('@/views/Like/index.vue')
    },
    {
      path: '/user/score',
      name: 'score',
      meta: {
        title: '积分'
      },
      component: () => import('@/views/Score/index.vue')
    },
    {
      path: '/user/coupon',
      name: 'coupon',
      meta: {
        title: '优惠券'
      },
      component: () => import('@/views/Coupon/index.vue')
    },
    {
      path: '/user/consult',
      name: 'consult',
      meta: {
        title: '我的问诊'
      },
      component: () => import('@/views/Consult/index.vue')
    },
    {
      path: '/user/prescription',
      name: 'prescription',
      meta: {
        title: '我的处方'
      },
      component: () => import('@/views/Prescription/index.vue')
    },
    {
      path: '/user/family',
      name: 'family',
      meta: {
        title: '家庭档案'
      },
      component: () => import('@/views/Family/index.vue')
    },
    {
      path: '/user/address',
      name: 'address',
      meta: {
        title: '地址管理'
      },
      component: () => import('@/views/Address/index.vue')
    },
    {
      path: '/user/evaluate',
      name: 'evaluate',
      meta: {
        title: '我的评价'
      },
      component: () => import('@/views/Evaluate/index.vue')
    },
    {
      path: '/user/contact',
      name: 'contact',
      meta: {
        title: '官方客服'
      },
      component: () => import('@/views/Contact/index.vue')
    },
    {
      path: '/user/settings',
      name: 'settings',
      meta: {
        title: '设置'
      },
      component: () => import('@/views/Settings/index.vue')
    },
    {
      path: '/user/order',
      name: 'order',
      meta: {
        title: '全部订单'
      },
      component: () => import('@/views/Order/index.vue')
    },
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
