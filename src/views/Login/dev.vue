<!--
 * @Title: Dev 环境调试登录
 * @Descripttion: 
 * @Author: shaojihao
-->

<template>
  <div class="login">
    <!-- 头部 -->
    <base-header />
    <!-- 登录注册展示入口 -->
    <login-switch :value="isTrue" />
    <div class="wrapper">
      <div class="center_box">
        <el-form
          ref="formData"
          :model="formData"
          :rules="rules"
          label-width="0px">
          <el-form-item prop="cookies">
            <el-input
              v-model="formData.cookies"
              placeholder="请输入cookies"
              clearable />
          </el-form-item>
          <div class="loginbtn" style="text-align: center">
            <el-button type="primary" @click="loginFun('formData')">
              立即登录（适合接口联调）
            </el-button>
          </div>
        </el-form>
        <div class="loginbtn" style="text-align: center; margin-top: 20px;">
          <el-button type="primary" @click="loginNoFun()" plain>
            立即开发（适合样式调整）
          </el-button>
        </div>
      </div>
    </div>
    <!-- 版权 -->
    <copyright />
  </div>
</template>

<script >
import Cookies from 'js-cookie';
import * as TYPE from '@/store/mutation-types';
import userInfo from '@/mock/userInfo.js';
// 头部、尾部、登录可选择展示
import BaseHeader from '@/components/BaseHeader/index.vue';
import Copyright from '@/components/Copyright/index.vue';
import LoginSwitch from '@/components/LoginSwitch/index.vue';

export default {
  components: {
    BaseHeader,
    Copyright,
    LoginSwitch
  },
  data() {
    return {
      isTrue: true,
      formData: {
        cookies: '',
      },
      rules: {
        cookies: [{ required: true, trigger: 'blur', message: '请输入Cookies' }],
      }
    };
  },
  methods: {
    /**
     * @name: 立即开发
     */
    loginNoFun() {
      window.location.href = window.location.origin + '/#/admin';
    },
    /**
     * @name: Cookies登录
     */
    loginFun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Cookies.set('SHAREJSESSIONID', this.formData.cookies);
          Cookies.set('tabNav', '[]');
          this.$store.commit(TYPE.COOKIE_VAL, this.formData.cookies);
          this.$store.commit(TYPE.USER_INFO, userInfo);
          window.location.href = window.location.origin + '/#/admin';
        }
      });
    },
  },
};
</script>

<style scoped>
.login { height: 100%; }
@media (min-width: 1200px) {
  .wrapper { width: 1080px; }
}
.wrapper {
  margin: 10px auto;
  background: #fff;
  height: calc(100% - 202px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.center_box { height: 305px; }
.loginbtn .el-button--small {
  padding: 12px 150px;
  font-size: 18px;
}
.el-form >>> .el-input__inner { padding: 20px 12px; }
.el-col-10 >>> .el-button {
  height: 42px;
  background-color: #3276b1;
  font-size: 14px;
}
.registerbtn >>> .el-button {
  font-size: 18px;
  background: #bdbdbd;
  color: #fff;
  border-radius: 4px;
}
.el-tabs >>> .el-tabs__header { width: 372px; }
.el-col-10 { text-align: right; width: 36.66667%; }
.el-col-10 >>> .el-button--small { padding: 9px 19px; }
.el-tabs--top >>> .el-tabs__item.is-top {
  padding-left: 0;
  width: calc(372px / 2);
  font-size: 18px;
  text-align: center;
}
.el-col-14 { width: 63.33333%; }
</style>