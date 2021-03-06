import Layout from '@/layout'
export default {
  path: '/department',
  component: Layout,
  name: 'departments',
  children: [
    {
      path: '',
      name: 'department',
      component: () => import('@/views/departments/index'),
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
