// 插件就是一个对象 这个对象有一个固定写法叫install,install是一个形参固定的Vue构造函数
import PageTools from '@/components/PageTools'
const arr = [PageTools]
export default {
  install (Vue) {
    // Vue.component(PageTools.name, PageTools)
    arr.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
