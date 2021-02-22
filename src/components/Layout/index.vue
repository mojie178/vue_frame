<!--
 * @Title: 基础内容页模板
 * @Descripttion: 
 * @Author: shaojihao
-->

<template>
  <div
    ref="pageBox"
    class="main_area"
    :style="{height: tabNav.length > 0 ? 'calc(100vh - 134px)' : 'calc(100vh - 130px)'}">
    <div class="page_header">
      <div class="header_left">
        <h3 class="page_title">{{name}}</h3>
        <p class="page_description" v-if="description">
          <i class="el-icon-info" style="margin-right: 5px;" />
          {{description}}
        </p>
      </div>
      <!-- 右侧内容，一般为按钮 -->
      <div class="header_right">
        <slot name="operation" />
      </div>
    </div>
    <!-- 页面主题内容 -->
    <div class="page_content">
      <!-- <h2> 通用标题; <h5> 通用注释; <p> 普通文案 -->
      <slot />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'layout',
  props: {
    name: { // 页面标题
      type: String,
      default: ''
    },
    description: { // 页面描述
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pageHeight: ''
    }
  },
  computed: {
    ...mapState({
      tabNav: state => state.tabNav
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.pageHeight = this.$refs.pageBox && this.$refs.pageBox.clientHeight;
    })
  }
};
</script>

<style lang="less" scoped>
.main_area {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 130px);
  padding: 20px;
  background-color: #fff;
  box-sizing: border-box;
  overflow: auto;
  .page_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 2px solid #f4f4f4;
    padding: 18px 0px 28px 0;
    height: 0px;
    .header_left {
      display: flex;
      align-items: center;
      .page_title {
        color: #000;
        font-size: 18px;
        font-weight: 700;
      }
      .page_description { margin-left: 10px; color: #e6a23c; }
    }
    .header_right { height: 35px; }
  }
  .page_content {
    background-color: #fff;
    height: 100%;
    overflow: auto;
    padding-right: 5px;
    &::-webkit-scrollbar { width: 5px; height: 5px; }
    &::-webkit-scrollbar-track { background-color: rgba(255,255,255,0.5); border-radius: 3px; }
    &::-webkit-scrollbar-thumb { border-radius: 3px; height: 100px; background-color: #ccc; }
  }

  @media screen and(-ms-high-contrast:active), (-ms-high-contrast: none) {
    /*兼容IE11*/
    .page_content { background-color: #fff; }
  }
}
</style>
