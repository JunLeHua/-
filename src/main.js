import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 一次取出这个文件directives的所有对象
import * as directives from '@/directives'
// console.log(directives)
// 遍历对象，获取里面的key 如果循环数组key，通过key拿到对应的值
Object.keys(directives).forEach(item => Vue.directive(item, directives[item]))

// 过滤器
// 一次性导出模块里的按需导出的变量 放入一个对象里
import * as filters from '@/filters'

// Vue.filter('过滤器名',转化函数)
Object.keys(filters).forEach(item => Vue.filter(item, filters[item]))

// 把公共组件封装成插件 直接放入Vue.use里，在代码页直接使用即可与路由的router-view一样
import components from '@/components'
Vue.use(components)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
