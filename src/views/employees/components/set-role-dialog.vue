<template>

  <el-dialog
    title="分配角色"
    :visible="value"
    width="50%"
    @close="$emit('input',false)"
    @open="onOpen"
  >
    <el-checkbox-group v-model="rolesIds">
      <el-checkbox
        v-for="item in rolesAll"
        :key="item.id"
        :label="item.id"
      >
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="$emit('input',false)">取 消</el-button>
      <el-button
        type="primary"
        @click="onSavaSetRole"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAllRoles, setRoleToUser } from '@/api/role'
import { getEmployeesBaseInfo } from '@/api/employees'
export default {
  name: 'SetRole',
  filters: {},
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      rolesAll: [],
      rolesIds: []
    }
  },
  computed: {},
  watch: {
    // userId () {
    //   console.log(this.userId)
    // }
  },
  created () {
    this.loadAllRoles()
  },
  methods: {
    // 获取所有角色列表
    async loadAllRoles () {
      try {
        const res = await getAllRoles()
        // console.log(res)
        this.rolesAll = res.rows
      } catch (e) {
        console.log(e)
      }
    },
    // 获取员工基本信息
    async onOpen () {
      // console.log(this.userId)
      try {
        const res = await getEmployeesBaseInfo(this.userId)
        // console.log(res)
        this.rolesIds = res.roleIds
      } catch (e) {
        console.log(e)
      }
    },
    // 分配角色
    async onSavaSetRole () {
      if (!this.rolesIds.length) {
        return this.$message.error('请选择角色')
      }
      const params = {
        id: this.userId,
        roleIds: this.rolesIds
      }
      // console.log(params)
      try {
        await setRoleToUser(params)
        this.$emit('input', false)
        this.$message.success('分配角色成功')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
