<template>
  <div style="width:148px; height:148px">
    <el-upload
      v-loading="loading"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :http-request="onHttpRequest"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :class="{hideUpload:fileList.length}"
      :before-upload="onBeforeUpload"
    >
      <i class="el-icon-plus " />
    </el-upload>
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
    >
      <img
        :src="previewImageUrl"
        style="width:100%"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
// id: AKIDEPPM9h19D2cw1uZzEI8i5aswlSwCDzXq
// key:70f6IFzUklZ90e3GyYv9C5mFTWO5d1EK
import COS from 'cos-js-sdk-v5'
// console.log(COS)
var cos = new COS({
  SecretId: 'AKIDEPPM9h19D2cw1uZzEI8i5aswlSwCDzXq',
  SecretKey: '70f6IFzUklZ90e3GyYv9C5mFTWO5d1EK'
})
export default {
  name: 'UploadImage',
  filters: {},
  components: {},

  data () {
    return {
      fileList: [
        // { name: '兔子', url: 'https://lehua-hz-28-1312236197.cos.ap-shanghai.myqcloud.com/%E5%85%94%E5%AD%905.jpeg' }
      ],
      dialogVisible: false,
      previewImageUrl: '',
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    // 覆盖upload自己内部上传
    onHttpRequest ({ file }) {
      // console.log(file)
      this.loading = true
      cos.putObject({
        Bucket: 'lehua-hz-28-1312236197', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // console.log(err || data)
        this.loading = false
        if (!err && data.statusCode === 200) {
          const ImgUrl = 'https://' + data.Location
          // console.log(ImgUrl)
          this.$emit('onSuccess', ImgUrl)
          return
        }
        this.$message.error('图片上传失败，请重新上传')
      })
    },
    // 图片变化
    onChange (file, fileList) {
      // console.log(file, fileList)
      this.fileList = fileList
    },
    // 图片删除
    onRemove (file, fileList) {
      // console.log(file, fileList)
      this.fileList = fileList
    },
    // 图片预览
    onPreview (file) {
      // console.log(123)
      this.dialogVisible = true
      this.previewImageUrl = file.url
    },
    // 图片上传之前
    onBeforeUpload (file) {
      // console.log(file)
      const types = ['image/jpg'] // 禁止上传类型
      if (types.includes(file.type)) {
        this.$message.error('图片上传格式不正确')
        return false
      }
      const maxSize = 1 * 1024 * 1024// 上传图片大小2Mb
      if (file.size > maxSize) {
        this.$message.error('上传图片大小在1Mb以内')
        return false
      }
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-dialog__header {
  background-color: #fff;
  height: 0;
}
</style>
<style>
.hideUpload .el-upload--picture-card {
  display: none;
}
</style>
