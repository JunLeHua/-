<template>
  <div>
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  name: 'Import',
  filters: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    async onSuccess ({ results, header }) {
      // console.log(results)
      // console.log(header)
      // const arr = results.map(item => {
      //   return {
      //     username: item.姓名,
      //     timeOfEntry: item.入职日期,
      //     workNumber: item.工号,
      //     mobile: item.手机号,
      //     correctionTime: item.转正日期
      //   }
      // })
      // console.log(arr)
      const userInfo = {
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '工号': 'workNumber',
        '手机号': 'mobile',
        '转正日期': 'correctionTime'
      }
      const arr = results.map(item => {
        const obj = {}
        const userInfoKeyArr = Object.keys(userInfo)
        // console.log(userInfoKeyArr)
        userInfoKeyArr.forEach(item1 => {
          if (item1 === '入职日期' || item1 === '转正日期') {
            obj[userInfo[item1]] = this.formatDate(item[item1], '-')
          } else {
            obj[userInfo[item1]] = item[item1]
          }
        })
        return obj
      })
      console.log(arr)
      await importEmployee(arr)
      this.$message.success('批量导入员工成功')
      this.$router.back()
    },
    formatDate (numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
