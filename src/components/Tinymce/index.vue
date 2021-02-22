<!--
 * @Title: 富文本编辑器
 * @Descripttion: 
 * @Author: shaojihao
-->

<template>
  <div class="tinymce-box">
    <editor v-model="myValue" :init="init" />
  </div>
</template>

<script>
import { downloadURL, uploadURL } from '@/config/env';
import tinymce from 'tinymce/tinymce'; //tinymce 默认 hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
// 编辑器插件 plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image'; // 插入上传图片插件
import 'tinymce/plugins/media'; // 插入视频插件
import 'tinymce/plugins/table'; // 插入表格插件
import 'tinymce/plugins/lists'; // 列表插件
import 'tinymce/plugins/wordcount'; // 字数统计插件

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    pluginsa: {
      type: [String, Array],
      default: 'lists image media table wordcount',
    },
    toolbara: {
      type: [String, Array],
      default: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat',
    }
  },
  data() {
    return {
      downloadURL,
      uploadURL,
      init: {
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        // skin_url: 'tinymce/skins/ui/oxide-dark',//暗色系
        height: 350,
        plugins: this.pluginsa,
        toolbar: this.toolbara,
        branding: false,
        menubar: false,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        /* images_upload_handler: (blobInfo, success, failure) => {
          let xhr, formData;
          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open('POST', this.uploadURL);
          xhr.onload = function () {
            let json;
            if (xhr.status !== 200) {
              failure('HTTP Error: ' + xhr.status);
              return;
            }
            json = JSON.parse(xhr.responseText);
            if (!json || typeof json.data.path !== 'string') {
              failure('Invalid JSON: ' + xhr.responseText);
              return;
            }
            success(this.downloadURL + json.data.path);
          };
          formData = new FormData();
          formData.append('file', blobInfo.blob(), blobInfo.filename());
          xhr.send(formData);
        }, */
      },
      myValue: this.value
    }
  },
  components: { Editor },
  mounted() {
    tinymce.init({});
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    }
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    /**
     * @name: 抛出富文本内容 父组件引用 this.$refs.editor.outHtmlData()
     * @param {*}
     * @return {*}
     */    
    outHtmlData() {
      return this.myValue;
    },
  }
}
</script>