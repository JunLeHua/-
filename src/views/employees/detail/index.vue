<template>
  <div>
    <el-card>

      <el-tabs v-model="activeName">
        <el-tab-pane
          label="登录账户设置"
          name="first"
        >
          <el-form
            ref="form"
            :model="userForm"
            label-width="80px"
            :rules="userFormRules"
            style="margin-top:30px;margin-left:100px"
          >
            <el-form-item
              label="姓名:"
              prop="username"
            >
              <el-input
                v-model="userForm.username"
                style="width:300px"
              />
            </el-form-item>
            <el-form-item
              label="密码:"
              prop="password"
            >
              <el-input
                v-model="userForm.password"
                type="password"
                style="width:300px"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onSave"
              >更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="个人详情"
          name="second"
        >
          <UserInfo />
        </el-tab-pane>
        <el-tab-pane
          label="岗位信息"
          name="third"
        >
          <JobInfo />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getEmployeesBaseInfo, saveEmployeesBaseInfo } from '@/api/employees'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
export default {
  name: 'Detail',
  filters: {},
  components: { UserInfo, JobInfo },
  data () {
    return {
      activeName: 'first',
      userForm: {},
      userFormRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 6, message: '同户名2-6个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码最少6位数', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () { this.getUsernfo() },
  methods: {
    // 获取员工基本信息
    async getUsernfo () {
      try {
        const res = await getEmployeesBaseInfo(this.$route.params.id)
        // console.log(res)
        this.userForm = res
      } catch (e) {
        console.log(e)
      }
    },
    // 更新
    async onSave () {
      await this.$refs.form.validate()
      await saveEmployeesBaseInfo(this.userForm)
      // console.log(123)
      this.$message.success('更新员工账号信息成功')
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
