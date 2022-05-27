<template>
  <div class="container">
    <div class="box">123</div>
    <div class="box1">456</div>
  </div>
</template>

<script>
export default {
  name: '',
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
  $color: blue;
.container {
  .box {
    $color: skyblue;
    color: $color;
  }
  .box1 {
    color: $color;
  }
}
</style>
