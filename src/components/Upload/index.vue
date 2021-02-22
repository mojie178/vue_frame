<!--
 * @Title: 公共上传组件
 * @Descripttion: 
 * @Author: shaojihao
-->

<template>
  <div class="uploadbox">
    <!-- 上传组件 -->
    <el-upload
      action="/"
      :auto-upload="true"
      :http-request="checkedFile"
      :before-upload="beforeUpload"
      :show-file-list="fileType != 'text'"
      :before-remove="removeFile"
      :limit="limit"
      :on-success="handleSuccess"
      :on-preview="handlePreview"
      :on-exceed="handleExceed"
      :list-type="fileType"
      :file-list="comFileList">
      <div v-if="fileType == 'picture-card'">
        <i class="el-icon-plus" />
      </div>
      <el-button v-else type="primary">点击上传</el-button>
    </el-upload>
    <!-- 额外展示区域 -->
    <template v-if="fileType == 'text'">
      <ul class="filesList">
        <el-row justify="start">
          <li v-for="(item, index) in comFileList" :key="index">
            <el-col :span="4">
              <div>
                <div class="img" v-if="iconType(item)">
                  <img :src="item.url ? item.url : downloadURL + item.response.id" alt />
                </div>
                <div class="img" v-else>
                  <i class="el-icon-document" />
                </div>
                <div class="name" @click="handlePreview(item)">{{ item.name }}</div>
              </div>
              <i @click="removeFileDiy(item, index)" class="delt el-icon-close" />
              <span class="cancle">
                <i class="el-icon-upload-success el-icon-check" />
              </span>
            </el-col>
          </li>
        </el-row>
      </ul>
    </template>
    <!-- 引用图片展示组件 -->
    <pic-show ref="picShow" :src="bigUrl" />
  </div>
</template>

<script>
import axios from 'axios';
import SparkMD5 from 'spark-md5';
import { uploadURL, upLoadMergeURL, downloadURL } from '@/config/env';
import PicShow from '../PicShow';

export default {
  props: {
    fileType: { // 额外展示区域
      type: String,
      default: 'text'
    },
    limit: { // 上传文件上限
      type: Number,
      default: 10
    },
    accept: { // 文件类型
      type: String,
      default: ''
    },
    iconUrl: { // 图标路径
      type: String,
      default: ''
    },
    fileList: { // 文件列表
      type: Array,
      default: function () {
        return []
      }
    },
  },
  components: { PicShow },
  data() {
    return {
      uploadURL,
      downloadURL,
      upLoadMergeURL,
      formatPreset: { // 文件格式
        img: ['jpg', 'jpeg', 'png', 'PNG', 'JPG', 'JPEG'],
        file: ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf'],
        video: ['mp4', 'avi', 'mov', 'rmvb']
      },
      dialogVisible: false, // 弹窗展示
      bigUrl: '', // 大图展示路径
      opts: {}, // 上传文件对象
      options: null, // 上传返回内容
      maxSize: 5 * 1024 * 1024 * 1024, // 上传最大文件限制
      //   multiUploadSize: 500 * 1024 * 1024, // 大于这个大小的文件使用分块上传(后端可以支持断点续传)
      eachSize: 5 * 1024 * 1024, // 每块文件大小
      requestCancelQueue: [], // 请求方法队列（调用取消上传
      comFileList: [] // 文件列表
    }
  },
  mounted() {
    this.comFileList = this.fileList;
  },
  methods: {
    /**
     * @name: 上传成功
     * @param {*} response
     * @param {*} file
     * @param {*} fileList
     */
    handleSuccess(response, file, fileList) {
      this.comFileList = fileList;
      this.$emit('fileBack', fileList);
    },
    /**
     * @name: 移除文件
     * @param {*} file
     * @param {array[*]} fileList
     */
    removeFile(file, fileList) {
      this.comFileList = fileList;
      this.$nextTick(() => this.$emit('fileBack', fileList));
    },
    /**
     * @name: 额外区域移除文件
     * @param {*} file
     * @param {array[*]} fileList
     */
    removeFileDiy(item, index) {
      this.comFileList.splice(index, 1);
      this.$nextTick(() => this.$emit('fileBack', this.comFileList));
    },
    /**
     * @name: 是否展示为图片
     * @param {*} item
     * @return {boolean}
     */
    iconType(item) {
      const path = item.path || item.response.path || '';
      const suffix = path.substring(path.lastIndexOf('.') + 1);
      return this.formatPreset.img.indexOf(suffix) !== -1;
    },
    /**
     * @name: 图片上传前文件提示
     * @param {*} file
     */
    beforeUpload(file) {
      if (file.size == 0) {
        this.$alert('请勿上传空文件！', {
          type: 'warning'
        });
        return false;
      }
      if (this.accept) {
        const format = this.formatPreset[this.accept];
        const index = file.name.lastIndexOf('.');
        const suffix = file.name.substring(index + 1);
        if (format.indexOf(suffix) === -1) {
          this.$alert(`只能上传${format.toString()}格式的文件`, {
            type: 'warning'
          });
          return false;
        }
      }
    },
    /**
     * @name: 文件上传限制提示
     */
    handleExceed() {
      this.$notify.warning(`当前限制上传 ${this.limit} 个文件`);
    },
    /**
     * @name: 展示图片或者下载文件
     * @param {*} file
     */
    handlePreview(file) {
      let strName = file.name.substr(file.name.lastIndexOf('.') + 1);
      let strUrl = file.path ? file.path.substr(file.path.lastIndexOf('.') + 1) : '';
      if (['jpg', 'jpeg', 'png', 'PNG', 'JPG', 'JPEG'].includes(strName) || ['jpg', 'jpeg', 'png', 'PNG', 'JPG', 'JPEG'].includes(strUrl)) {
        this.bigUrl = file.url ? file.url : this.downloadURL + file.response.id;
        this.$refs.picShow.showDialog();
      } else {
        // window.location.href = file.response ? this.downloadURL + file.response.id : file.url
        window.open(file.response ? this.downloadURL + file.response.id : file.url);
      }
    },
    /**
     * @name: 自定义上传图片
     * @param {*} options
     * @return {*}
     */
    async checkedFile(options) {
      const { maxSize, getSize, splitUpload } = this;
      const { file, onProgress, onSuccess, onError } = options;
      this.options = options;
      if (file.size > maxSize) {
        return this.$notify({
          message: `您选择的文件大于${getSize(maxSize)}`,
          type: 'error'
        });
      }
      try {
        await splitUpload(file, onProgress, onSuccess);
      } catch (e) {
        this.$notify({
          message: e.message,
          type: 'error'
        });
        onError();
      }
      const prom = new Promise(() => { });
      prom.abort = () => { };
      return prom;
    },
    /**
     * @name: 格式化文件大小显示文字
     * @param {number} size
     * @return {string}
     */
    getSize(size) {
      return size > 1024
        ? size / 1024 > 1024
          ? size / (1024 * 1024) > 1024
            ? (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
            : (size / (1024 * 1024)).toFixed(2) + 'MB'
          : (size / 1024).toFixed(2) + 'KB'
        : (size).toFixed(2) + 'B';
    },
    /**
     * 计算md5，实现断点续传及秒传
     * @param file
     */
    computeMD5(file, onProgress, onSuccess) {
      const fileReader = new FileReader();
      const { eachSize } = this;
      let currentChunk = 0;
      const chunks = Math.ceil(file.size / this.eachSize);
      const spark = new SparkMD5.ArrayBuffer();
      loadNext();
      fileReader.onload = e => {
        spark.append(e.target.result);
        if (currentChunk < chunks) {
          currentChunk++;
          loadNext();
        } else {
          const md5 = spark.end();
          // console.log(`MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms`)
          this.computeMD5Success(md5, file, onProgress, onSuccess);
        }
      }
      fileReader.onerror = function () {
        this.$notify.error(`文件${file.name}读取出错，请检查该文件`);
      }
      // 读取下一个切片
      function loadNext() {
        const start = currentChunk * eachSize;
        const end = ((start + eachSize) >= file.size) ? file.size : start + eachSize;
        let slice = file.slice(start, end);
        fileReader.readAsArrayBuffer(slice);
      }
    },
    /**
     * @name: 上传文件接口请求及事件处理
     * @param {*} md5
     * @param {*} file
     * @param {*} onProgress
     * @param {*} onSuccess
     */
    async computeMD5Success(md5, file, onProgress, onSuccess) {
      const { eachSize } = this;
      const chunks = Math.ceil(file.size / eachSize);
      this.opts.identifier = md5;
      this.opts.totalChunks = chunks;
      this.opts.filename = file.name;
      this.opts.relativePath = file.name;
      this.opts.totalSize = file.size;
      this.opts.chunkSize = eachSize;
      // 判断是否需要秒传
      try {
        let checkMd5 = await axios.get(this.uploadURL, { params: this.opts });
        checkMd5 = checkMd5.data;
        if (JSON.stringify(checkMd5.data) == '{}' || checkMd5.data.chunkNumbers.length != chunks) {
          const fileChunks = await this.splitFile(file, eachSize, chunks);
          let currentChunkData = null;
          let currentChunk = JSON.stringify(checkMd5.data) == '{}' ? 0 : checkMd5.data.chunkNumbers.length;
          for (let i = currentChunk; i < fileChunks.length; i++) {
            currentChunkData = await this.postFile({
              chunked: true,
              chunkNumber: i + 1,
              totalChunks: chunks,
              identifier: md5,
              chunkSize: eachSize,
              fileName: file.name,
              relativePath: file.name,
              totalSize: file.size,
              currentChunkSize: fileChunks[i].size,
              file: fileChunks[i]
            }, onProgress);
            if (currentChunkData.data.needMerge) {
              currentChunk = chunks;
              const resMerge = await axios.post(this.upLoadMergeURL, { 'filename': file.name, 'identifier': md5 });
              this.$notify({
                message: '上传成功',
                type: 'success'
              });
              onSuccess(resMerge.data.data);
              return;
            }
          }
        } else {
          this.$notify({
            message: '上传成功',
            type: 'success'
          });
          this.options.onSuccess({ ...checkMd5.data, path: checkMd5.data.absolutepath });
        }
      } catch (e) {
        this.$notify({
          message: '上传失败，请重新上传！',
          type: 'error'
        });
        this.options.onError();
      }
    },
    /**
     * @name: 大文件分块上传
     * @param {*} file
     * @param {*} onProgress
     * @param {*} onSuccess
     * @return {*}
     */
    splitUpload(file, onProgress, onSuccess) {
      return new Promise((resolve, reject) => {
        try {
          this.computeMD5(file, onProgress, onSuccess);
          resolve();
        } catch (e) {
          reject(e);
        }
      })
    },
    /**
     * @name: 文件分块
     * @param {*} file
     * @param {*} eachSize
     * @param {*} chunks
     * @return {*}
     */
    splitFile(file, eachSize, chunks) {
      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            const fileChunk = [];
            for (let chunk = 0; chunks > 0; chunks--) {
              fileChunk.push(file.slice(chunk, chunk + eachSize)); // 利用 Array.prototype.slice 方法切片
              chunk += eachSize;
            }
            resolve(fileChunk);
          }, 0);
        } catch (e) {
          console.error(e);
          reject(new Error('文件切块发生错误'));
        }
      })
    },
    /**
     * @name: 提交文件方法，将参数转换为 FormData, 然后通过 axios 发起请求
     * @param {*} param
     * @param {*} onProgress
     * @return {*}
     */ 
    postFile(param, onProgress) {
      const formData = new FormData();
      for (let p in param) {
        formData.append(p, param[p]);
      }
      const config = {
        onUploadProgress: e => {
          if (param.chunked) e.percent = Number(param.chunkNumber / param.totalChunks * 100).toFixed(2);
          else e.percent = Number(((e.loaded / e.total) * 100).toFixed(2));
          onProgress(e);
        }
      }
      return axios.post(this.uploadURL, formData, config).then(rs => rs.data);
    },
    /**
     * @name: 设置图片类型
     * @param {*} item
     * @param {*} index
     * @return {*}
     */    
    pushPicType(item, index) {
      this.$nextTick(() => {
        let name = this.$refs.picTypeRef[index].selectedLabel + '.' + item.name.substr(item.name.lastIndexOf('.') + 1);
        item.name = name;
        let type = item.type;
        this.$emit('pushPicType', name, type, index);
      });
      this.$forceUpdate();
    }
  }
}
</script>

<style lang="less" scoped>
.uploadbox {
  .filesList {
    li {
      position: relative;
      width: auto;
      height: auto;
      overflow: hidden;
      z-index: 0;
      background-color: #fff;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin-top: 10px;
      padding: 10px 10px 10px 10px;
      div { float: left; }
      .el-select {
        width: 100%;
        position: absolute;
        left: 0;
        top: 90px;
        /deep/ input {
          border-bottom: 0px;
          border-left: 0px;
          border-right: 0px;
          border-radius: 0px;
          text-align: center;
        }
      }
      .img {
        width: 70px;
        height: 70px;
        margin-right: 14px;
        img { width: 100%; height: 100%; }
        .el-icon-document { font-size: 70px; }
      }
      .name {
        height: 70px;
        width: calc(100% - 100px);
        line-height: 70px;
        overflow: hidden;
        padding-left: 4px;
        text-overflow: ellipsis;
        -webkit-transition: color 0.3s;
        transition: color 0.3s;
        white-space: nowrap;
        cursor: pointer;
        &:hover { color: #409eff; }
      }
      .cancle {
        position: absolute;
        right: -17px;
        top: -7px;
        width: 46px;
        height: 26px;
        background: #13ce66;
        text-align: center;
        transform: rotate(45deg);
        box-shadow: 0 1px 1px #ccc;
        .el-icon-check {
          color: #fff;
          font-size: 12px;
          margin-top: 12px;
          transform: rotate(-45deg);
        }
      }
      .delt {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
        opacity: 0.75;
        color: #606266;
      }
      &:hover .cancle { display: none; }
    }
  }
}
</style>