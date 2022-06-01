<template>
  <div>
    <PageTools>
      <template #left>
        <el-alert
          style="width:unset;float:left"
          :title="`共${total}条记录`"
          type="info"
          show-icon
          :closable="false"
        />
      </template>
      <template #right>
        <el-button
          type="danger"
          size="mini"
          @click="exportExcel"
        >普通excel导出</el-button>
        <el-button
          type="info"
          size="mini"
        >复杂表头excel导出</el-button>
        <!-- 声明式导航 通过组件标签进行跳转router-linnk -->
        <!-- 编程式 通过js api的方式跳转 -->
        <el-button
          type="success"
          size="mini"
          @click="$router.push('/import')"
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
        style="margin-bottom:15px"
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
              @click="previewCode(scope.row.staffPhoto)"
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
            <el-button
              type="text"
              @click="$router.push('/employees/detail/'+scope.row.id)"
            >查看</el-button>
            <el-button type="text">转正</el-button>
            <el-button type="text">调岗</el-button>
            <el-button type="text">离职</el-button>
            <el-button
              type="text"
              @click="showSetRole(scope.row.id)"
            >角色</el-button>
            <el-button
              type="text"
              @click="onRemove(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="queryObj.page"
        :page-sizes="[10,50, 100, 200, 300]"
        :page-size="queryObj.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 新增员工对话框 -->
    <!-- <add-dialog
      :add-dialog-visible="addDialogVisible"
      @updateVisible="addDialogVisible = $event"
    /> -->
    <!-- sync 解析 -->
    <!-- :add-dialog-visible="addDialogVisible" -->
    <!-- @update:add-dialog-visible="addDialogVisible = $event" -->
    <add-dialog :add-dialog-visible.sync="addDialogVisible" />
    <!-- 图片二维码对话框 -->
    <el-dialog
      title="图片二维码"
      :visible.sync="codeDialogVisible"
      width="30%"
    >
      <canvas ref="codeRef" />
    </el-dialog>
    <!-- 分配角色 -->
    <!-- <SetRoleDialog :set-role-dialog-visible.sync="setRoleDialogVisible" /> -->
    <SetRoleDialog
      v-model="setRoleDialogVisible"
      :user-id="userId"
    />
  </div>
</template>

<script>
import employees from '@/constant/employees'
const { hireType } = employees
import { getUserList, removeEmployess } from '@/api/employees'
import AddDialog from './components/add-dialog.vue'
import QRCode from 'qrcode'
import SetRoleDialog from './components/set-role-dialog.vue'
export default {
  name: 'Employees',
  filters: {},
  components: { AddDialog, SetRoleDialog },
  data () {
    return {
      queryObj: {
        page: 1,
        size: 10
      },
      // 员工列表
      userList: [],
      total: 0,
      addDialogVisible: false,
      codeDialogVisible: false,
      setRoleDialogVisible: false,
      userId: '0'
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
    },
    // 导出excel
    async exportExcel () {
      const excel = await import('@/vendor/Export2Excel')
      // console.log(res)
      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const headersKey = Object.keys(headers)
      // console.log(headersKey)
      const { rows } = await getUserList(
        { page: 1, size: this.total }
      )
      // console.log(rows)
      const excelData = rows.map(item => {
        const arr = []
        headersKey.forEach(key => {
          arr.push(item[headers[key]])
        })
        return arr
      })
      // console.log(excelData)
      excel.export_json_to_excel({
        header: headersKey, // 表头 必填
        data: excelData, // 具体数据 必填
        // data: this.userList,
        filename: '乐华', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx', // 非必填
        multiHeader: [['手机号', '主要信息', '', '', '', '', '部门']], // 多表头
        merges: ['A1:A2', 'B1:F1', 'G1:G2']// 表格合并
      })
    },
    handleSizeChange (val) {
      this.queryObj.size = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.queryObj.page = val
      this.getUserList()
    },
    // 图片二维码
    previewCode (avatar) {
      if (!avatar) {
        this.$message.error('该用户没有设置头像')
        return
      }
      this.codeDialogVisible = true
      // 点击对话框显示时，数据准备好了，但是视图还没有更新
      // 因为数据驱动视图是异步的
      // 我们通过$refs.ref 拿到的视图数据是旧的
      // 为什么vue数据驱动视图是异步的
      // 如果不是异步，每次数据发生改变，视图就要更新一次，大大的增加了服务器压力，如果是异步，等数据全部更新完毕，vue一次把视图全部更新
      // .$nextTick 会等数据同步到视图之后，拿视图数据
      // updated 虽然也可以拿到数据同步到视图之后的数据，但是如果其他元素更新了数据，也会触发执行该步骤
      this.$nextTick(() => {
        const canvas = this.$refs.codeRef
        // console.log(canvas)
        QRCode.toCanvas(canvas, avatar)
      })
    },
    // 分配角色
    showSetRole (id) {
      this.setRoleDialogVisible = true
      this.userId = id
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
