<template>
  <el-dialog
    title="新增员工"
    :visible="addDialogVisible"
    width="40%"
    @close="onClose"
  >
    <el-form
      ref="addFormRef"
      :model="addForm"
      label-width="80px"
      style="width:400px"
      :rules="addFormRules"
    >
      <el-form-item
        label="姓名"
        prop="username"
      >
        <el-input
          v-model="addForm.username"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item
        label="手机号"
        prop="mobile"
      >
        <el-input
          v-model="addForm.mobile"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item
        label="入职时间"
        prop="timeOfEntry"
      >
        <el-date-picker
          v-model="addForm.timeOfEntry"
          type="date"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item
        label="聘用形式"
        prop="formOfEmployment"
      >
        <el-select
          v-model="addForm.formOfEmployment"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hireType"
            :key="item.value"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="工号"
        prop="workNumber"
      >
        <el-input
          v-model="addForm.workNumber"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item
        label="部门"
        prop="departmentName"
      >
        <el-input
          v-model="addForm.departmentName"
          placeholder="请选择部门"
          @focus="showTreeDept"
        />
        <el-tree
          v-if="isShowTree"
          :data="depts"
          :props="defaultProps"
          default-expand-all
          @node-click="onTreeNode"
        />
      </el-form-item>
      <el-form-item
        label="转正时间"
        prop="correctionTime"
      >
        <el-date-picker
          v-model="addForm.correctionTime"
          type="date"
          placeholder="请选择转正时间"
        />
      </el-form-item>

    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <!-- <el-button @click="$emit('updateVisible',false)">取 消</el-button> -->
      <el-button @click="$emit('update:add-dialog-visible',false)">取 消</el-button>
      <el-button
        type="primary"
        @click="onSavaAdd"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import employees from '@/constant/employees'
const { hireType } = employees
import { getDepartmentList } from '@/api/department'
import { TreeList } from '@/utils'
import { addEmployee } from '@/api/employees'
export default {
  name: 'AddDialog',
  filters: {},
  components: {},
  props: {
    addDialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      addForm: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      addFormRules: {
        username: [
          { required: true, message: '用户名不能为空' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '手机号格式不正确' }
        ],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'change' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }],
        correctionTime: [{ required: true, message: '转正时间', trigger: 'blur' }]
      },
      hireType,
      depts: [],
      isShowTree: false,
      defaultProps: {
        label: 'name'
      }
    }
  },
  computed: {},
  watch: {
  },
  created () { },
  methods: {
    // 部门选择
    async showTreeDept () {
      this.isShowTree = true
      try {
        const res = await getDepartmentList()
        // console.log(res.depts)
        // console.log(TreeList(res.depts, ''))
        this.depts = TreeList(res.depts, '')
      } catch (e) {
        console.log(e)
      }
    },
    // 点击树形结构获取数据
    onTreeNode (nodeData) {
      // console.log(nodeData)
      this.addForm.departmentName = nodeData.name
      this.isShowTree = false
    },
    // 新增添加提交
    async onSavaAdd () {
      // this.$refs.addFormRef.validate(flag => {
      //   console.log(flag)
      // })
      try {
        await this.$refs.addFormRef.validate()
        // console.log(123)
        await addEmployee(this.addForm)
        this.$message.success('添加成功')
        this.$emit('update:add-dialog-visible', false)
      } catch (err) {
        console.log(err)
      }
    },
    // 关闭时回调
    onClose () {
      this.$emit('update:add-dialog-visible', false)
      this.$refs.addFormRef.resetFields()
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
