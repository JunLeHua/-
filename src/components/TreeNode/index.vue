<template>
  <div style="width:100%;cursos:default">
    <el-row
      style="width:100%"
      type="flex"
      justify="space-between"
    >
      <el-col :span="6">

        <span class="svg-container">
          <svg-icon icon-class="international" />
        </span>&nbsp;&nbsp;
        <span>{{ obj.name }}</span>
      </el-col>
      <el-col :span="3">
        <span>{{ obj.manager }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            操作<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">添加子部门</el-dropdown-item>
            <template v-if="isRoot">
              <el-dropdown-item command="b">编辑部分</el-dropdown-item>
              <el-dropdown-item command="c">删除部门</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <!-- 添加部门 -->
    <el-dialog
      title="添加部门"
      :visible.sync="isAddVisible"
      @click.native.stop
      @close="$refs.formRef.resetFields()"
    >
      <el-form
        ref="formRef"
        label-width="100px"
        :model="addForm"
        :rules="addRules"
      >
        <el-form-item
          label="部门名称"
          prop="name"
        >
          <el-input
            v-model.trim="addForm.name"
            placeholder="1-50个字符"
          />
        </el-form-item>
        <el-form-item
          label="部门编码"
          prop="code"
        >
          <el-input
            v-model.trim="addForm.code"
            placeholder="1-50个字符"
          />
        </el-form-item>
        <el-form-item
          label="部门负责人"
          prop="manager"
        >
          <el-select
            v-model="addForm.manager"
            style="width:100%;"
            placeholder="请选择负责人"
            filterable
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="部门介绍"
          prop="introduce"
        >
          <el-input
            v-model.trim="addForm.introduce"
            type="textarea"
            :rows="4"
            placeholder="1-300个字符"
            maxlength="300"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isAddVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addBtn"
        >确 定</el-button>
      </template>
    </el-dialog>
    <!-- 编辑部门 -->
    <el-dialog
      title="编辑部门"
      :visible.sync="editVisible"
      @click.native.stop
      @close="$refs.editRef.resetFields()"
    >
      <el-form
        ref="editRef"
        :model="editForm"
        :rules="addRules"
        label-width="100px"
      >
        <el-form-item
          label="部门名称"
          prop="name"
        >
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item
          label="部门编码"
          prop="code"
        >
          <el-input v-model="editForm.code" />
        </el-form-item>
        <el-form-item
          label="部门负责人"
          prop="manager"
        >
          <el-select
            v-model="editForm.manager"
            style="width:100%"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.username"
              :value="item.username"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="部门介绍"
          prop="introduce"
        >
          <el-input
            v-model="editForm.introduce"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            maxlength="300"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editBtn"
        >确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getStaffSimpleList } from '@/api/user'
import { getDepartmentList, addDepartment, editDepartment } from '@/api/department'
import { removeDepartmentById } from '@/api/department'
export default {
  name: 'Tree',
  filters: {},
  components: {},
  props: {
    isRoot: {
      type: Boolean,
      default: false
    },
    obj: {
      type: Object,
      default: () => ({
        name: '传智教育',
        manager: '负责人',
        id: ''
      })
    }
  },
  data () {
    // 重复自定义校验
    const validatorName = async (rule, value, callback) => {
      if (this.editVisible === true) {
        return callback()
      }
      try {
        const res = await getDepartmentList()
        // console.log(res)
        // console.log(value)
        // const nameNo = res.depts.some(item=>item.name)
        const arr = res.depts.filter(item => item.pid === this.obj.id)
        const arr1 = arr.some(item => item.name === value)
        // console.log(arr1)
        if (arr1) {
          callback(new Error(value + '重复了'))
        } else {
          callback()
        }
      } catch (e) {
        console.log(e)
      }
    }
    const validatorCode = async (rule, value, callback) => {
      if (this.editVisible === true) {
        return callback()
      }
      try {
        const res = await getDepartmentList()
        // console.log(res)
        // console.log(value)
        // const nameNo = res.depts.some(item=>item.name)
        const arr = res.depts.filter(item => item.pid === this.obj.id)
        const arr1 = arr.some(item => item.code === value)
        // console.log(arr1)
        if (arr1) {
          callback(new Error(value + '重复了'))
        } else {
          callback()
        }
      } catch (e) {
        console.log(e)
      }
    }
    return {
      isAddVisible: false,
      obj1: this.obj,
      addForm: {
        code: '',
        introduce: '',
        manager: '',
        name: ''
      },
      addRules: {
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '长度1-50个字符', trigger: 'blur' },
          { validator: validatorCode, trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '长度1-300个字符', trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' }
        ],
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '长度1-50个字符', trigger: 'blur' },
          { validator: validatorName, trigger: 'blur' }
        ]
      },
      options: [],
      editVisible: false,
      // editForm: { ...this.obj }
      editForm: Object.assign({}, this.obj)
    }
  },
  computed: {},
  watch: {},
  created () {
    // console.log(this.obj1)
  },
  methods: {
    // 负责人列表
    async getFuzheRen () {
      try {
        this.options = await getStaffSimpleList()
      } catch (err) {
        console.log(err)
      }
    },
    // 菜单栏点击删除编辑添加
    async handleCommand (command) {
      // console.log(this.obj)
      if (command === 'a') {
        // console.log('添加')
        this.getFuzheRen()
        this.isAddVisible = true
      } else if (command === 'b') {
        // console.log('编辑')
        this.getFuzheRen()
        this.editVisible = true
      } else {
        // console.log('删除')
        try {
          await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          // console.log(123)
          try {
            await removeDepartmentById(this.obj.id)
            this.$message.success('删除成功')
            this.$emit('remove')
          } catch (e) {
            console.log(e)
          }
        } catch (err) {
          this.$message({
            type: 'info',
            message: '已取消删除'
          }
          )
        }
      }
    },
    // 添加提交
    async addBtn () {
      try {
        await this.$refs.formRef.validate()
        console.log(123)
        this.addForm.pid = this.obj.id
        await addDepartment(this.addForm)
        this.isAddVisible = false
        this.$message.success('添加成功')
        this.$emit('remove')
      } catch (err) {
        this.$message.error('表单校验失败')
      }
      // this.$refs.formRef.validate(valit => {
      //   console.log(valit)
      // })
      // this.$refs.formRef.validate().then(bool => {
      //   console.log(bool)
      // }).catch(bool => {
      //   console.log(bool)
      // })
    },
    // 编辑提交
    async editBtn () {
      try {
        await this.$refs.editRef.validate()
        // console.log(123)
        try {
          await editDepartment(this.editForm)
          this.$emit('remove')
          this.editVisible = false
          this.$message.success('更新成功')
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        this.$message.error('校验失败')
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.el-dropdown {
  font-size: 17px;
}
</style>
