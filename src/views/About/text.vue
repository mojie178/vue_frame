<!--
 * @Title: 
 * @Descripttion: 
 * @Author: shaojihao
 * @Date: 2021-02-06 15:30:35
-->

<template>
  <layout :name="$route.meta.menuName" description="本页为组件测试文件，正式开发可删除此模块和相关路由配置">
    <div slot="operation">
      <el-button icon="el-icon-back" slot="operation" @click="$router.push('/admin')">返回首页</el-button>
    </div>
  </layout>
</template>

<script>
import { baseMixin } from '@/mixins';

export default {
  mixins: [baseMixin],
  data() {}
}
</script>