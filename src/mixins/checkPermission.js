import permission from '@/constant/permission'
const { permission: permissionBtn } = permission
export default {
  data () {
    return { permissionBtn }
  },
  computed: {
    // 权限控制按钮
    // 实际上计算属性不能传参 但是我们可以return 出一个函数，上面代码传参会调用这个函数
    btnIsDisabled () {
      return function (val) {
        if (this.$store.state.user.userInfo) {
          // console.log(this.$store.state.user.userInfo)
          return !this.$store.state.user.userInfo.roles.points.includes(val)
        }
      }
    }
  }
}
