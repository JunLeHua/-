<template>
  <div>
    <el-card>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="角色管理"
          name="first"
        >
          <el-button
            type="primary"
            size="mini"
            @click="addVisible=true"
          >新增角色</el-button>
          <el-table
            v-loading="loading"
            style="margin:30px 0 15px"
            :data="roleList"
            border
          >
            <el-table-column
              label="序号"
              type="index"
              width="100px"
              align="center"
            />
            <el-table-column
              label="角色"
              prop="name"
              align="center"
            />
            <el-table-column
              label="描述"
              prop="description"
              align="center"
            />
            <el-table-column
              label="操作"
              align="center"
            >
              <template v-slot="scope">
                <el-button
                  type="success"
                  size="mini"
                  @click="jurisdiction(scope.row.id)"
                >分配权限</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="editVisibles(scope.row)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="remove(scope.row.id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row
            type="flex"
            justify="end"
          >
            <el-col :span="8.5">
              <el-pagination
                :current-page="queryObj.page"
                :page-sizes="[1, 2, 3, 4]"
                :page-size="queryObj.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          label="公司信息"
          name="second"
        >
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-row style="margin-top:30px">
            <el-col :span="9">
              <el-form label-width="100px">
                <el-form-item label="公司名称">
                  <el-input
                    v-model="companyInfo.name"
                    disabled
                  />
                </el-form-item>
                <el-form-item label="公司地址">
                  <el-input
                    v-model="companyInfo.companyAddress"
                    disabled
                  />
                </el-form-item>
                <el-form-item label="公司邮箱">
                  <el-input
                    v-model="companyInfo.mailbox"
                    disabled
                  />
                </el-form-item>
                <el-form-item label="备注">
                  <el-input
                    v-model="companyInfo.remarks"
                    type="textarea"
                    :rows="3"
                    disabled
                  />
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加对话框 -->
    <el-dialog
      :visible.sync="addVisible"
      title="编辑角色"
      @close="$refs.addRef.resetFields();addForm.description=''"
    >
      <el-form
        ref="addRef"
        :model="addForm"
        label-width="100px"
        :rules="addRules"
      >
        <el-form-item
          label="角色名称"
          prop="name"
        >
          <el-input v-model="addForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addForm.description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="addBtn"
        >确定</el-button>
      </template>
    </el-dialog>
    <!-- 权限分配 -->
    <el-dialog
      title="权限分配"
      :visible.sync="jurisdictionVisible"
    >
      <el-tree
        ref="tree"
        :data="permissions"
        :props="defaultProps"
        default-expand-all
        node-key="id"
        :default-checked-keys="myPermission"
        show-checkbox
      />
      <!-- :default-checked-keys="myPermission" 放入选中id数组 node-key="id"唯一标识符 -->
      <template #footer>
        <el-button @click="jurisdictionVisible=false"> 取消</el-button>
        <el-button
          type="primary"
          @click="savePermissions"
        > 确定</el-button>
      </template>

    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog
      :visible.sync="editVisible"
      title="编辑角色"
      @close="$refs.addRef.resetFields();addForm.description=''"
    >
      <el-form
        ref="addRef"
        :model="editForm"
        label-width="100px"
        :rules="addRules"
      >
        <el-form-item
          label="角色名称"
          prop="name"
        >
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editForm.description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="editBtn"
        >确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyById, getRoleList, removeCompanyById, addRoles, getAllPermissions, editRoles, getPermissionById, assignPermission } from '@/api/setting'
import { TreeList } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'Setting',
  filters: {},
  components: {},
  data () {
    return {
      activeName: 'first',
      companyInfo: {},
      queryObj: {
        page: 1,
        pagesize: 2
      },
      roleList: [],
      loading: true,
      total: 0,
      addVisible: false,
      addForm: {
        name: '',
        description: ''
      },
      addRules: { name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }] },
      jurisdictionVisible: false,
      permissions: [],
      defaultProps: {
        label: 'name'
      },
      editVisible: false,
      editForm: {},
      myPermission: [], // 获取自身的权限
      id: null

    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  watch: {},
  created () {
    this.getRoleList()
  },
  methods: {
    // 公司信息
    async handleClick () {
      // console.log(this.activeName)
      if (this.activeName === 'second' && !this.companyInfo.id) {
        // console.log(123)
        try {
          const res = await getCompanyById(this.companyId)
          // console.log(res)
          this.companyInfo = res
        } catch (e) {
          console.log(e)
        }
      }
    },
    // table表格数据
    async getRoleList () {
      try {
        const res = await getRoleList(this.queryObj)
        // console.log(res)
        this.loading = false
        this.total = res.total
        this.roleList = res.rows
      } catch (err) {
        console.log(err)
      }
    },
    // 分页变化
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.queryObj.pagesize = val
      this.getRoleList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.queryObj.page = val
      this.getRoleList()
    },
    // 删除
    async remove (id) {
      // console.log(id)
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // console.log(123)
        try {
          await removeCompanyById(id)
          // 如果当前数据只剩下一条并且不是第一页，删除完最后一条数据，跳到上一页
          if (this.roleList.length === 1 && this.queryObj.page > 1) {
            this.queryObj.page--
          }
          this.getRoleList()
          this.$message.success('删除成功')
        } catch (e) {
          console.log(e)
        }
      } catch (e) {
        this.$message.info('取消删除')
      }
    },
    // 添加
    async addBtn () {
      // console.log(this.addForm)
      try {
        await this.$refs.addRef.validate()
        console.log(13)
        try {
          await addRoles(this.addForm)
          this.getRoleList()
          this.addVisible = false
          this.$message.success('添加角色成功')
        } catch (e) {
          console.log(e)
        }
      } catch (e) {
        this.$message.error('校验失败')
      }
    },
    // 分配权限
    async jurisdiction (id) {
      this.id = id
      this.jurisdictionVisible = true
      try {
        this.permissions = await getAllPermissions()
        this.permissions = TreeList(this.permissions, '0')
        // console.log(this.permissions)
        const res = await getPermissionById(id)
        // console.log(res)
        this.myPermission = res.permIds
      } catch (e) {
        console.log(e)
      }
    },
    // 提交分配权限
    async savePermissions () {
      // console.log(this.$refs.tree.getCheckedKeys())// 返回已经选中的id数组
      // console.log(this.id)
      try {
        await assignPermission({
          id: this.id,
          permIds: this.$refs.tree.getCheckedKeys()
        })
        this.jurisdictionVisible = false
      } catch (e) {
        console.log(e)
      }
    },

    // 编辑对话框
    editVisibles (obj) {
      this.editVisible = true
      this.editForm = { ...obj }
    },
    // 编辑提交
    async editBtn () {
      try {
        await this.$refs.addRef.validate()
        // if (this.editForm.description === '') {
        //   this.editVisible = false
        //   return
        // }
        // console.log(123)
        try {
          await editRoles(this.editForm)
          this.editVisible = false
          this.getRoleList()
          // this.$message.success('更改成功')
        } catch (e) {
          console.log(e)
        }
      } catch (e) {
        this.$message.error('校验失败')
      }
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
