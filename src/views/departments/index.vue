<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="用户管理"
          name="first"
        >
          <!-- 头部 -->
          <TreeNode @remove="getDepartmentList" />
          <!-- 树形控件 -->
          <el-tree
            v-loading="loading"
            style="margin-top:20px"
            :data="data"
            :props="defaultProps"
            default-expand-all
          >
            <template v-slot="scope">
              <TreeNode
                is-root
                :obj="scope.data"
                @remove="getDepartmentList"
              />
              <!-- {{ scope.node.label }} -->
            </template>
          </el-tree>
        </el-tab-pane>

      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { TreeList } from '@/utils'
import { getDepartmentList } from '@/api/department'
import TreeNode from '@/components/TreeNode'
export default {
  filters: {},
  components: { TreeNode },
  data () {
    return {
      activeName: 'first',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      loading: true

    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDepartmentList()
  },
  methods: {
    // 获取数据
    async getDepartmentList () {
      try {
        const res = await getDepartmentList()
        // console.log(res)
        this.data = TreeList(res.depts, '')
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
