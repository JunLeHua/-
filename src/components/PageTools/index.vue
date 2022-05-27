<template>
  <div>
    <el-card>
      <el-row
        type="flex"
        justify="space-between"
      >
        <el-col :span="12">
          <slot name="left" />
        </el-col>
        <el-col :span="8.5">
          <slot name="right" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PageTools',
  filters: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {}
}
</script>

<style scoped lang='scss'>
::v-deep .is-light {
  background-color: skyblue !important;
  color: #fff !important;
}
</style>
