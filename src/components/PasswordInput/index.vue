<!--
 * @Title: 钱包密码输入
 * @Descripttion: 
 * @Author: shaojihao
-->

<template>
  <div class='am_pay_pwd' :id="`ids_${id}`">
    <input
      v-for="(v, i) in nums"
      :key="i"
      type="password"
      maxlength="1"
      class="shortInput"
      autocomplete="new-password"
      v-model="pwdList[i]" 
      @input="changeInput"
      @click="changePwd"
      @keyup="keyUp($event)"
      @keydown="oldPwdLen = pwdList.length" />
  </div>
</template>
<script>
export default {
  name: 'passwordInput',
  props: {
    id: {
      type: Number, // 当一个页面有多个密码输入框时，用id来区分
      default: 1
    },
    nums: {
      type: Number, // 输入密码位数
      default: 6
    }
  },
  data() {
    return {
      pwdList: [], // 密码列表
      oldPwdLen: 0, // 老密码列表长度
      isDelete: false, // 删除标识符
      ipt: '' // 密码输入框
    }
  },
  mounted() {
    this.pwdList = []; // 清空密码输入框
    this.ipt = document.querySelectorAll(`#ids_${this.id} .shortInput`); // 获取节点
  },
  methods: {
    /**
     * @name: 清空密码输入框
     */    
    clear() {
      this.pwdList = [];
      this.oldPwdLen = 0;
      this.isDelete = false;
    },
    /**
     * @name: 键盘 keyUp 输入事件
     * @param {*} ev
     */    
    keyUp(ev) {
      let len = this.pwdList.length;
      if (!len) return; // 密码不为空
      if (ev.keyCode === 8) { // backspace 回格事件
        this.isDelete = true;
        if (this.oldPwdLen === this.pwdList.length) {
          if (len === this.pwdList.length) this.pwdList.pop(); // 移除最后一位密码
          len--;
        } else len > 0 && len--;
        this.ipt[len].focus(); // 倒数第二位密码获取焦点
      } else if (this.isDelete && len === this.pwdList.length && /^\d$/.test(ev.key)) {
        this.isDelete = false;
        this.pwdList.pop(); // 移除最后一位密码
        this.pwdList.push(ev.key); // 添加输入的值
        this.ipt[this.pwdList.length] && this.ipt[this.pwdList.length].focus(); // 获取焦点
      }
      /**
       * getPwd(data) {
       *   // 组件返回的密码
       *   if (data.length === 6) {
       *     // 用户输入完密码的业务流程
       *   }
       * },
       */
      this.$emit('getPwd', this.pwdList.join(''), this.id); // 父级方法回调
    },
    /**
     * @name: 修改密码
     */    
    changePwd() {
      let len = this.pwdList.length;
      len === this.nums && len--;
      this.ipt[len].focus();
    },
    /**
     * @name: 密码值改变获取光标
     */    
    changeInput() {
      let len = this.pwdList.length;
      const val = this.pwdList[len - 1];
      if (!/[0-9]/.test(val)) return this.pwdList.pop(); // 非数字，删除刚刚输入项
      if (!val) {
        this.pwdList.pop();
        len--;
        if (len > 0) this.ipt[len - 1].focus();
      } else {
        if (len < this.nums) this.ipt[len].focus();
      }
    }
  }
}

</script>

<style lang="less" scoped>
input {
  border: 0; // 去除未选中状态边框
  outline: none; // 去除选中状态边框
  background-color: rgba(0, 0, 0, 0); // 透明背景
}
.am_pay_pwd {
  display: inline-block;
  width: 245px;
  height: 16px;
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  padding: 10px 0;
  position: relative;
  margin-left: 1px;
  .shortInput {
    text-align: center;
    font-size: 20px;
    float: left;
    width: 40px;
    height: 20px;
    color: #333;
    outline: #ff0067;
    &:not(:last-child) { border-right: 1px solid #DCDFE6; }
  }
}
</style>