<template>
    <div class="loginPage">
        <div class="container demo-1">
            <div class="content">
                <div id="largeHeader" class="large-header" ref="largeHeader">
                    <!-- 粒子动画 -->
                    <canvas id="demoCanvas" ref="demoCanvas" />
                    <!-- 登录框 -->
                    <div class="loginBox" v-if="showButton">
                        <img :src="setInfo.logo" class="logo" :onerror="$defaultImg" />
                        <el-form :model="loginForm" ref="loginForm">
                            <div class="logoText">{{setInfo.title}}</div>
                            <el-form-item class="loginInput loginName">
                                <input
                                    v-model.trim="loginForm.username"
                                    :minlength="3"
                                    :maxlength="20"
                                    @keydown.down.13="submitForm('loginForm')"
                                    placeholder="请输入账号" />
                            </el-form-item>
                            <el-form-item class="loginInput loginCode">
                                <input
                                    type="password"
                                    v-model.trim="loginForm.password"
                                    :minlength="6"
                                    :maxlength="20"
                                    @keydown.down.13="submitForm('loginForm')"
                                    placeholder="请输入密码" />
                            </el-form-item>
                            <div
                                class="loginButton"
                                @click="submitForm('loginForm')"
                                :disabled="disabled">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
                            <div
                                class="loginSupport"
                                v-if="setInfo.support">
                                技术支持：
                                <a href="http://www.citycloud.org.cn" target="_blank">
                                    {{setInfo.support}}
                                </a>
                            </div>
                      </el-form>
                    </div>
                    <!-- 显隐按钮 -->
                    <i
                        class="showBottom el-icon-refresh"
                        title="切换"
                        @click="showButton = !showButton" />
                    <!-- 背景轮播 -->
                    <el-carousel
                        class="loginBgBox"
                        :interval="10000"
                        arrow="never"
                        direction="vertical">
                        <el-carousel-item
                            v-for="item in setInfo.loginBg"
                            :key="item"
                            :style="{height: `${$pageHeight}px`}">
                            <img :src="item" style="width: 100%; height: 100%;" />
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </div>
        <!-- 二维码 -->
        <ewm-box
            v-if="showButton && (setInfo.weChatPic || setInfo.appPic)"
            :weChatPic="setInfo.weChatPic"
            :appPic="setInfo.appPic" />
        <loading-dialog
            v-show="submitLoading"
            loadingText="登录中" />
    </div>
</template>

<script>
import {
    loginApi,
    platformConfigGetAll
} from '@/assets/js/apis'
import EwmBox from '@/components/EwmBox'
import LoadingDialog from '@/components/LoadingDialog'
import {canvasBg} from '@/assets/js/login'
import logoPic from '@/assets/img/logo.png'
import loginBgPic from '@/assets/img/bg.jpg'
export default {
    name: 'loginPage',
    data() {
        return {
            submitLoading: false,
            loginForm: {
                username: '',
                password: '',
            },
            disabled: false,
            setInfo: {
                title: '',
                logo: '',
                support: '',
                loginBg: [],
                weChatPic: '',
                appPic: '',
            },
            showButton: true
        }
    },
    components: {
        EwmBox,
        LoadingDialog
    },
    mounted() {
        canvasBg(document.getElementById('largeHeader'), document.getElementById('demoCanvas'))
        this.getSetInfo()
    },
    methods: {
        submitForm(formName) {
            if (!this.loginForm.username)
                return this.$message.warning('请输入账号')
            if (!this.loginForm.password)
                return this.$message.warning('请输入密码')
            this.disabled = true
            this.submitLoading = true
            loginApi(
                this.loginForm
            ).then(res => {
                if (Number(res.code) != 1) {
                    this.disabled = false
                    this.submitLoading = false
                    return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
                }
                localStorage.setItem('x-token', res.token)
                this.$message.success('登录成功')
                window.location.href = `/${this.$package}`
            }).catch(err => {
                this.disabled = false
                this.submitLoading = false
            })
        },
        getSetInfo() {
            platformConfigGetAll(
            ).then(res => {
                if (Number(res.code) != 1) return
                let loginBgList = JSON.parse(res.data.loginBg) || []
                loginBgList = loginBgList.map(item => {
                    if (item)
                        return this.$uploadLink + item
                })
                this.setInfo = Object.assign({
                    title: res.data.title || '城市云物联网管理平台',
                    logo: res.data.logo ? this.$uploadLink + res.data.logo : logoPic,
                    support: res.data.support || '',
                    loginBg: loginBgList.length > 0 ? loginBgList : [loginBgPic],
                    weChatPic: res.data.weChatPic || '',
                    appPic: res.data.appPic || '',
                })
            }).catch(err => {
                this.setInfo = {
                    title: '城市云物联网管理平台',
                    logo: logoPic,
                    support: '',
                    loginBg: [loginBgPic],
                    weChatPic: '',
                    appPic: '',
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.showBottom {
    font-size: 25px;
    color: #fff;
    display: block;
    position: absolute;
    z-index: 999;
    bottom: 0;
    left: 0;
    cursor: pointer;
    opacity: 0;
    &:hover {opacity: 1;}
}
.loginBgBox {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
.loginBox {
    width: 512px;
    height: auto;
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
    transform: translate3d(-50%,-50%,0);
    padding: 10px;
    background: rgba(255,255,255,.5);
    border-radius: 3px;
    .logo {
        width: 95px;
        height: 95px;
        border-radius: 50%;
        border: 10px solid #9cd1f6;
        margin: 0 auto 10px;
    }
    .logoText {font-size: 33px; line-height: 50px; color: #000;}
    .logoText2 {font-size: 12px; line-height: 25px; color: #fff;}
    .loginInput {
        width: 361px;
        height: 45px;
        line-height: 45px;
        margin: 20px auto 0;
        border-radius: 5px;
        border: 1px solid #9d9d9d;
        input{
            float: right;
            width: 300px;
            height: 45px;
            line-height: 43px;
            color: #263743;
            font-size: 16px;
            margin: 0;
            border: none;
            padding-left: 15px;
        }
    }
    .loginName {background: url('../../assets/img/loginName.png') no-repeat 18px center #fff;}
    .loginCode {background: url('../../assets/img/loginCode.png') no-repeat 18px center #fff;}
    .loginButton {
        color: #fff;
        font-size: 20px;
        width: 361px;
        height: 45px;
        line-height: 45px;
        background: #0a4d92;
        margin: 20px auto;
        border: 1px solid #9d9d9d;
        cursor: pointer;
        text-align: center;
        border-radius: 10px;
        &:hover {background: #1a5491;}
    }
    .loginSupport {
        font-size: 12px;
        color: #263743;
        line-height: 45px;
        margin: 20px auto 0;
        width: 100%;     
        a {
            text-decoration: none;
            color: #263743;
            &:hover {text-decoration: underline;}
        }
    }
}
.large-header {
    position: relative;
    width: 100%;
    height: 100%;
    background: #f0f3f6;
    overflow: hidden;
    background-size: cover;
    background-position: center center;
    z-index: 1;
}
.main-title {
    position: absolute;
    margin: 0;
    padding: 0;
    color: #f9f1e9;
    text-align: center;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
    transform: translate3d(-50%,-50%,0);
}
.demo-1 .main-title {
    text-transform: 'uppercase';
    font-size: 4.2em;
    letter-spacing: 0.1em;
}
.main-title .thin {font-weight: 200;}
@media only screen and (max-height : 768px) {
    .demo-1 .main-title, 
    .demo-3 .main-title,
    .demo-4 .main-title {font-size: 3em;}
    .demo-2 .main-title {font-size: 4em;}
}
</style>