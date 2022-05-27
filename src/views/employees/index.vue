<template>
  <div>
    <PageTools>
      <template #left>
        <el-alert
          style="width:unset;float:left"
          title="消息提示的文案"
          type="info"
          show-icon
          :closable="false"
        />
      </template>
      <template #right>
        <el-button
          type="danger"
          size="mini"
        >普通excel导出</el-button>
        <el-button
          type="info"
          size="mini"
        >复杂表头excel导出</el-button>
        <el-button
          type="success"
          size="mini"
        >excel导入</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="addDialogVisible=true"
        >新增员工</el-button>
      </template>
    </PageTools>
    <el-card style="margin-top:10px">
      <el-table
        :data="userList"
        border
        stripe
      >
        <el-table-column
          type="index"
          label="序号"
          width="60px"
          align="center"
        />
        <el-table-column
          label="姓名"
          prop="username"
          sortable
        />
        <el-table-column label="头像">
          <template v-slot="scope">
            <img
              v-imgError="'	http://ihrm.itheima.net/static/img/head.b6c3427d.jpg'"
              :src="scope.row.staffPhoto"
              style="width:70px;border-radius:50%"
            >
          </template>
        </el-table-column>
        <el-table-column
          label="手机号"
          prop="mobile"
          sortable
        />
        <el-table-column
          label="工号"
          prop="workNumber"
          sortable
        />
        <el-table-column
          label="聘用形式"
          prop="formOfEmployment"
          sortable
          :formatter="fn"
        />
        <el-table-column
          label="部门"
          prop="departmentName"
          sortable
        />
        <el-table-column
          label="入职时间"
          prop="timeOfEntry"
          sortable
        >
          <template v-slot="scope">
            {{ scope.row.timeOfEntry|dateformat }}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          sortable
        >
          <el-switch
            :v-model="false"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-table-column>
        <el-table-column
          label="操作"
          sortable
          width="280px"
        >
          <template v-slot="scope">
            <!-- <el-link
            type="primary"
            href="#"
            :underline="false"
          >查看</el-link> -->
            <el-button type="text">查看</el-button>
            <el-button type="text">转正</el-button>
            <el-button type="text">调岗</el-button>
            <el-button type="text">离职</el-button>
            <el-button type="text">角色</el-button>
            <el-button
              type="text"
              @click="onRemove(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 新增员工对话框 -->
    <el-dialog
      title="新增员工"
      :visible.sync="addDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addDialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import employees from '@/constant/employees'
const { hireType } = employees
import { getUserList, removeEmployess } from '@/api/employees'
export default {
  filters: {},
  components: {},
  data () {
    return {
      queryObj: {
        page: 1,
        pageSize: 10
      },
      // 员工列表
      userList: [],
      total: 0,
      addDialogVisible: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserList()
  },
  methods: {
    // 获取员工列表
    async getUserList () {
      try {
        const res = await getUserList(this.queryObj)
        // console.log(res)
        this.userList = res.rows
        this.total = res.total
      } catch (e) {
        console.log(e)
      }
    },
    // table表格内部格式化数据
    fn (row) {
      // console.log(row.formOfEmployment)
      // return row.formOfEmployment
      // 找出与row.formOfEmployment相对于的对象返回回来 在拿value
      const obj = hireType.find(item => item.id === row.formOfEmployment - 0)
      return obj ? obj.value : '未知'
    },
    // 删除
    async onRemove (id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await removeEmployess(id)
        this.$message.success('删除成功')
        this.getUserList()
      } catch (e) {
        this.$message('已取消删除')
      }
      // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async () => {
      //   // console.log(id)
      //   try {
      //     await removeEmployess(id)
      //     this.$message.success('删除成功')
      //     this.getUserList()
      //   } catch (e) {
      //     console.log(e)
      //   }
      // }).catch(() => {
      //   this.$message('已取消删除')
      // })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
