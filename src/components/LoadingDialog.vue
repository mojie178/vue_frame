<template>
    <div class="loadingBg">
        <div class="loadingBox">
            <i class="el-icon-loading" />
            <p>{{this.loadingText || '加载中'}}...</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loadingDialog',
    props: {
        loadingText: String
    }
}
</script>

<style lang="less" scoped>
.loadingBg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,.2);
    z-index: 9999;
    .loadingBox {
        width: 100px;
        height: 90px;
        border-radius: 5px;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        color: #fff;
        transform: translate3d(-50%, -50%, 0);
        i {font-size: 35px; margin: 10px auto;}
    }
}
</style>

