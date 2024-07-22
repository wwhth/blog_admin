import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from '../layouts/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      meta: {
        title: '首页'
      },
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: '/article',
          name: 'article',
          meta: {
            title: '文章管理'
          },
          children: [
            {
              path: '',
              name: 'article',
              component: () => import('@/views/article/index.vue')
            },
            {
              path: '/article/category',
              name: 'category',
              meta: {
                title: '类别管理'
              },
              component: () => import('@/views/article/category.vue')
            },
            {
              path: '/article/label',
              name: 'label',
              meta: {
                title: '标签管理'
              },
              component: () => import('@/views/article/label.vue')
            },
            {
              path: '/article/talk',
              name: 'talk',
              meta: {
                title: '说说管理'
              },
              component: () => import('@/views/article/talk.vue')
            }
          ]
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          meta: {
            title: '关于'
          },
          redirect: '/about',
          children: [
            {
              path: '',
              name: 'about',

              // route level code-splitting
              // this generates a separate chunk (About.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import('../views/AboutView.vue')
            },
            {
              path: 'test',
              name: 'test',
              meta: {
                title: '测试'
              },
              // route level code-splitting
              // this generates a separate chunk (About.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import('../views/TestView.vue')
            }
          ]
        },


      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: () => import('../views/404/index.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 路由拦截
  const token = localStorage.getItem('token')
  if (to.path === '/login' && token) {
    next('/')
  } else if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})
export default router
