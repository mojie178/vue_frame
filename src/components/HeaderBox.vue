<template>
    <div class="headerBg">
        <div class="headerBox">
              <div class="logoBox fl" @click="$router.push({path: '/'})">
                  <img :src="setInfo.logo" :onerror="$defaultImg" />
                  <p class="marginL10">{{setInfo.title}}</p>
              </div>
              <div class="userBox fr">
                  {{
                      username.length > 15
                          ? username.slice(0, 15) + '...'
                          : username
                  }}
                  <i class="el-icon-caret-bottom marginL5" />
                  <ul>
                      <li @click="openDialog()"><i class="el-icon-edit-outline marginR10" />修改密码</li>
                      <li @click="loginOut()"><i class="el-icon-share marginR10" />退出登录</li>
                  </ul>
              </div>
            <div class="navBox fr">
                <ul>
                    <li v-for="item in navList"
                        :key="item.id"
                        v-if="item.show"
                        @click="$router.push({path: item.path})"
                        :class="headHighLight == item.id ? 'headHighLight' : null">{{item.name}}</li>
                </ul>
            </div>
        </div>
        <loading-dialog v-show="submitLoading" />
        <el-dialog
            title="修改密码"
            width="500px"
            top="10vh"
            :append-to-body="true"
            :visible.sync="dialogTableVisible"
            v-if="dialogTableVisible"
            :close-on-click-modal="false"
            :modal-append-to-body="false"
            :show-close="false">
            <el-form
                :model="dialogForm"
                :rules="rules"
                ref="dialogForm"
                label-width="120px">
                <el-row type="flex" justify="center">
                    <el-col :span="24">
                      <el-form-item
                          label="旧密码："
                          prop="oldPwd"
                          required>
                          <el-input
                            type="password"
                            :maxLength="50"
                            placeholder="请输入"
                            v-model.number="dialogForm.oldPwd" />
                      </el-form-item>
                      <el-form-item
                          label="新密码："
                          prop="newPwd"
                          required>
                          <el-input
                            type="password"
                            :maxLength="50"
                            placeholder="请输入"
                            v-model="dialogForm.newPwd"
                            auto-complete="off" />
                      </el-form-item>
                      <el-form-item
                          label="确认新密码："
                          prop="checkPass"
                          required>
                          <el-input
                            type="password"
                            :maxLength="50"
                            placeholder="请输入"
                            v-model="dialogForm.checkPass"
                            auto-complete="off" />
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="center">
                    <el-col :span="24">
                        <el-button
                            type="primary"
                            @click="submitForm('dialogForm')"
                            :disabled="disabled">提交</el-button>
                        <el-button
                            type="primary"
                            @click="closeForm('dialogForm')"
                            :disabled="disabled"
                            plain>关闭</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { 
    signOutApi,
    userUpdatePwd,
    platformConfigGetAll,
    userGetCurrentLoginUser
} from '@/assets/js/apis'
import {regPassword} from '@/assets/js/common'
import LoadingDialog from './LoadingDialog'
import logoPic from '@/assets/img/logo.png'
export default {
    name: 'headerBox',
    data() {
        let checkPassword = (rule, value, callback) => {
            if (!value)
                return callback(new Error('请输入密码'))
            setTimeout(() => {
                if (!regPassword.test(value))
                    callback(new Error('密码为6-20位英文或数字'))
                callback()
            }, 1000)
        }
        let validatePass = (rule, value, callback) => {
            if (value === '')
                callback(new Error('请再次输入密码'))
            else if (value !== this.dialogForm.newPwd)
                callback(new Error('两次输入密码不一致!'))
            else
                callback()
        }
      return {
          username: '',
          submitLoading: false,
          disabled: false,
          navList: [],
          dialogForm: {
              oldPwd: '',
              newPwd: '',
              checkPass: ''
          },
          rules: {
              oldPwd: [{validator: checkPassword, trigger: 'blur'}],
              newPwd: [{validator: checkPassword, trigger: 'blur'}],
              checkPass: [{validator: validatePass, trigger: 'blur'}]
          },
          setInfo: {
              logo: '',
              title: ''
          },
          dialogTableVisible: false,
          headHighLight: Number(this.$route.meta.id.split('-')[0]) || 1,
      }
  },
  components: {
      LoadingDialog
  },
  created() {
      this.navList = [
          {id: 1, path: '/system', name: '系统', show: true},
          {id: 2, path: '/platform', name: '平台', show: true},
      ]
  },
  mounted() {
      this.getCurrentLoginUser()
      this.getSetInfo()
  },
  methods: {
    openDialog() {
        this.dialogForm = {
            oldPwd: '',
            newPwd: '',
            checkPass: ''
        }
        this.dialogTableVisible = true
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.submitLoading = true
                this.disabled = true
                userUpdatePwd({
                    newPwd: this.dialogForm.newPwd + '',
                    oldPwd: this.dialogForm.oldPwd + ''
                }).then(res => {
                    this.disabled = false
                    this.submitLoading = false
                    if (Number(res.code) != 1)
                        return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
                    this.$message.success('修改成功')
                    this.$router.push('/login')
                }).catch(err => {
                    this.submitLoading = false
                    this.disabled = false
                })
            }
        })
    },
    closeForm() {
        this.dialogTableVisible = false
    },
    loginOut() {
        this.$confirm('是否确定退出登录？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.loading = true
            signOutApi({
                feMonitorTime: new Date().getTime()
            }).then(res => {
                this.loading = false
                if (Number(res.code != 1))
                    return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
                localStorage.removeItem('x-token')
                this.$message.success('已退出登录')
                this.$router.push('/login')
            }).catch(err => this.loading = false)
        }).catch(err => this.loading = false)
    },
    getSetInfo() {
        platformConfigGetAll(
        ).then(res => {
            if (Number(res.code) != 1) return
            this.setInfo = {
                title: res.data.title || '城市云物联网管理平台',
                logo: res.data.logo ? this.$uploadLink + res.data.logo : logoPic,
            }
        }).catch(err => {
            this.setInfo = {
                title: '城市云物联网管理平台',
                logo: logoPic,
            }
        })
    },
    getCurrentLoginUser() {
        userGetCurrentLoginUser({
        }).then(res => {
            if (Number(res.code) != 1) return
            this.username = res.data.name || '登录用户'
        })
    }
  },
  watch: {
      '$route'(n) {
          this.headHighLight = n.meta.id.split('-')[0] || 1
      }
  }
}
</script>

<style lang="less" scoped>
.headerBg {
    width: 100%;
    background: #3a8ee6;
    box-shadow: 0 5px 5px #dedede;
    .headerBox {
        height: 50px;
        .navBox {
            color: #667077;
            ul {
                li {
                    display: inline-block;
                    padding: 0 20px;
                    line-height: 50px;
                    cursor: pointer;
                    text-align: center;
                    color: #fff;
                    &:hover {color: #000; background: #fff;}
                }
                .headHighLight {color: #000; background: #fff;}
            }
        }
        .userBox {
          position: relative;
          color: #fff;
          line-height: 50px;
          cursor: pointer;
          border-left: 1px solid #fff;
          padding: 0 10px;
            ul {
                display: none;
                position: absolute;
                background: #fff;
                border: 1px solid #dedede;
                border-radius: 4px;
                box-shadow: 0 3px 12px #dedede;
                right: 0;
                padding: 5px 0;
                top: 100%;
                width: 120px;
                z-index: 999;
                text-align: center;
                &:before {
                    display: block;
                    position: absolute;
                    right: 25px;
                    top: -5px;
                    content: '';
                    border-top: 0;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-bottom: 5px solid #fff;
                }
                li {
                    line-height: 40px;
                    color: #667077;
                    cursor: pointer;
                    img {
                        width: 90px;
                        height: 90px;
                        vertical-align: middle;
                        margin-top: 5px;
                    }
                    p {line-height: 20px; font-size: 12px;}
                    &:hover {color: #3a8ee6;}
                    &:last-child {border: none;}
                }
            }
            &:hover > ul {display: block;}
        }
        .logoBox {
            height: 40px;
            margin: 5px;
            cursor: pointer;
            img {
                height: 40px;
                vertical-align: top;
                border-radius: 50%;
            }
            p {
                font-size: 20px;
                font-weight: bold;
                display: inline-block;
                color: #fff;
                line-height: 40px;
            }
        }
    }
}
</style>
