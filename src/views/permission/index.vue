<template>
  <div>
    <PageTools>
      <template slot="right">
        <el-button
          type="primary"
          size="mini"
          @click="onShowSet(1,'0')"
        >添加权限</el-button>
      </template>
    </PageTools>
    <el-table
      ref="tableRef"
      row-key="id"
      style="margin-top:10px"
      border
      stripe
      :data="permissions"
    >
      <el-table-column
        prop="name"
        label="名称"
      >
        <template v-slot="{row}">
          <div
            v-if="row.type===1"
            @click="expandRow(row)"
          >
            <i
              v-if="row.children"
              style="margin:0 10px"
              class="el-icon-circle-plus-outline"
            />
            <!-- <i
              v-else
              style="margin:0 10px"
              class="el-icon-remove-outline"
            /> -->
            <span>{{ row.name }}</span>
          </div>
          <template v-else>
            <i
              style="margin:0 10px"
              class="el-icon-picture-outline-round"
            />
            <span>{{ row.name }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        prop="code"
        label="标识"
      />
      <el-table-column
        prop="description"
        label="描述"
      />
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button
            v-if="row.type===1"
            type="text"
            @click="onShowSet(2,row.id)"
          >添加</el-button>
          <el-button
            type="text"
            @click="showEdit(row.id)"
          >编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="setDialogVisible"
      width="50%"
      @close="onClose"
    >
      <el-form
        ref="perForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item
          label="权限名称"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            style="width: 90%"
          />
        </el-form-item>
        <el-form-item
          label="权限标识"
          prop="code"
        >
          <el-input
            v-model="formData.code"
            style="width: 90%"
          />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input
            v-model="formData.description"
            style="width: 90%"
          />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="setDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="onSava"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRights, editRights, getAllRights, getRightsByIdInfo } from '@/api/rights'
import { TreeList } from '@/utils'
export default {
  name: 'Permissions',
  filters: {},
  components: {},
  data () {
    return {
      permissions: [],
      setDialogVisible: false,
      formData: {
        name: '',
        code: '',
        description: '',
        enVisible: ''
      },
      rules: {
        name: [{ required: true, message: '请填写权限名称', trigger: 'blur' }],
        code: [{ required: true, message: '请填写权限标识', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadAllRights()
  },
  methods: {
    // 获取所有权限
    async loadAllRights () {
      try {
        this.permissions = TreeList(await getAllRights(), '0')
        // console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    onShowSet (type, pid) {
      this.setDialogVisible = true
      this.formData.type = type
      this.formData.pid = pid
    },
    // 点击展开表格
    expandRow (row) {
      this.$refs.tableRef.toggleRowExpansion(row)
    },
    // 保存添加或编辑
    async onSava () {
      // console.log(this.formData.id)
      if (this.formData.id) {
        // 编辑
        // console.log('编辑')
        await editRights(this.formData)
        this.$message.success('更新成功')
      } else {
        // 添加
        // console.log('添加')
        try {
          await this.$refs.perForm.validate()
          // console.log(this.formData)
          await addRights(this.formData)
          this.$message.success('添加权限成功')
        } catch (e) {
          this.$message.error('效验失败')
        }
      }
      this.setDialogVisible = false
      this.loadAllRights()
    },
    onClose () {
      this.$refs.perForm.resetFields()
      this.formData = {
        name: '',
        code: '',
        description: '',
        enVisible: ''
      }
    },

    // 编辑
    async showEdit (id) {
      this.setDialogVisible = true
      // console.log(id)
      const res = await getRightsByIdInfo(id)
      // console.log(res)
      this.formData = res
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-table__expand-icon {
  display: none !important;
}
</style>
