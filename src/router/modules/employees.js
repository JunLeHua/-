import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees/index'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: '/employees/detail/:id',
      hidden: true, // 控制该项目是否在菜单中可见
      component: () => import('@/views/employees/detail')
    },
    {
      path: '/employees/print/:id',
      hidden: true, // 控制该项目是否在菜单中可见
      component: () => import('@/views/employees/print')
    }
  ]
}
