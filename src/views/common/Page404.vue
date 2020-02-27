<template>
    <div class="page404">
        <div class="container demo-1">
            <div class="content">
                <div id="largeHeader" class="large-header" ref="largeHeader">
                    <canvas id="demoCanvas" ref="demoCanvas" />
                    <div class="login">
                        <img src="@/assets/img/404.png" />
                        <el-button
                            type="primary"
                            icon="el-icon-menu"
                            class="marginR20"
                            @click="$router.push({path: '/'})">回到首页</el-button>
                        <el-button
                            type="primary"
                            icon="el-icon-back"
                            @click="$router.go(-1)" plain>返回上一页</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {canvasBg} from '@/assets/js/login'
export default {
    name: 'loginPage',
    data() {
        return {}
    },
    mounted() {
        canvasBg(document.getElementById('largeHeader'), document.getElementById('demoCanvas'))
    }
}
</script>

<style lang="less" scoped>
.login {
    width: 512px;
    height: auto;
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
}
.large-header {
    position: relative;
    width: 100%;
    height: 100%;
    background: #333;
    overflow: hidden;
    background-size: cover;
    background-position: center center;
    z-index: 1;
    img {
        width: 375px;
        height: 200px;
        display: block;
        margin: 0 auto 50px;
    }
}
.demo-1 .large-header {background-image: url('../../assets/img/bg.jpg');}
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

@media only screen and (max-width : 768px) {
    .demo-1 .main-title, 
    .demo-3 .main-title,
    .demo-4 .main-title {font-size: 3em;}
    .demo-2 .main-title {font-size: 4em;}
}
</style>