import router, { asyncRoutes, constantRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: []
  },
  mutations: {
    setRoute (state, payload) {
      state.routes = [...constantRoutes, ...payload]
    }
  },
  actions: {
    filterRoute (context, roles) {
      // 全部动态路由
      // console.log(asyncRoutes)
      // 筛选该角色拥有的权限
      const filterRouter = asyncRoutes.filter(item => {
        return roles.menus.includes(item.name)
      })
      // console.log(filterRouter)
      // 把动态路由追加到路由规则里面
      // 因为追加的路由规则是后面添加了，在静态路由规则后面，这样404就在动态路由规则前面，所以把404从静态路由规则里面剪切出来，追加到动态路由规则后面
      // router.addRoutes() 动态添加路由
      router.addRoutes([...filterRouter, { path: '*', redirect: '/404', hidden: true }])
      // 404 page must be placed at the end !!!

      context.commit('setRoute', filterRouter)
    }
  }
}
