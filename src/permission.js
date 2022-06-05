import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getTime } from '@/utils/auth'
const whiteList = ['/login', '/404']
NProgress.configure({ easing: 'ease', speed: 1000 })
router.beforeEach(async (to, form, next) => {
  NProgress.start()
  const token = store.getters.token
  if (token) {
    // 判断是否超时  用登录时存入的时间戳减去当前的时间戳来判断是否超时，如果超时清空vuex里的数据和退出一样效果，并且跳转到login界面，最后return，不执行下面代码
    if (Date.now() - getTime() > 3600 * 1000) {
      store.commit('user/logout')
      router.push('/login')
      Message.error('登录超时')
      return
    }
    if (to.path === '/login') {
      next('/')
    } else {
      // 获取登录后信息
      if (!store.getters.name) {
        try {
          // 筛选动态路由权限
          const { roles } = await store.dispatch('user/getUserInfo')
          // 后台返回的路由权限
          // console.log(roles.menus)
          await store.dispatch('permission/filterRoute', roles)

          // 已知bug next() 必须跳到to.path
          next(to.path)
        } catch (err) {
          Message.error(err.Message)
        }
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

