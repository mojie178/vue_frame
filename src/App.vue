<template>
    <div id="app" :style="{height: `${$pageHeight}px`}">
        <router-view />
    </div>
</template>

<script>
import {
    platformConfigGetAll
} from '@/assets/js/apis'
export default {
    name: 'App',
    created() {
        this.getSetInfo()
    },
    methods: {
        getSetInfo() {
            platformConfigGetAll(
            ).then(res => {
                if (Number(res.code) != 1) return
                if (res.data.title) document.title = res.data.title
            }).catch(err => {})
        },
    }
}
</script>

<style lang="less">
#app {width: 100%; overflow: hidden; background: #fff;}
// 展示模块样式
.mainBox {
    max-width: 1240px;
    margin: 10px auto;
    padding: 10px;
    border: 1px solid #dedede;
    box-shadow: 0 0 5px #dedede;
    h4 {
        line-height: 30px;
        border-left: 5px solid #016fba;
        font-size: 20px;
        padding: 0 10px;
        margin-bottom: 20px;
    }
}
.el-range__close-icon {display: none !important;}
// 分页样式
.ql-snow .ql-picker.ql-header {line-height: 20px !important;}
.el-pagination.is-background .el-pager li {background: #dedede;}
// 统一弹窗样式
.el-dialog__header {padding: 10px 20px;}
.el-dialog__title {font-size: 16px;}
.el-dialog__headerbtn {top: 13px;}
.el-dialog__body {padding: 0 20px 20px;}
// 统一下拉框样式
.tipsBox {font-size: 12px; color: #666;}
.dropDownBox {
    overflow-y: auto;
    &::-webkit-scrollbar {width: 5px; height: 5px;}
    &::-webkit-scrollbar-thumb {border-radius: 0; background: #3a8ee6;}
    &::-webkit-scrollbar-track {border-radius: 0; background: #7a8b9b;}
    scrollbar-arrow-color: #666;
    scrollbar-face-color: #3a8ee6;
    scrollbar-highlight-color: #dedede;
    scrollbar-shadow-color: #dedede;
    scrollbar-track-color: #dedede;
}
.el-table__body-wrapper {
    &::-webkit-scrollbar {width: 5px; height: 5px;}
    &::-webkit-scrollbar-thumb {border-radius: 0; background: #3a8ee6;}
    &::-webkit-scrollbar-track {border-radius: 0; background: #7a8b9b;}
    scrollbar-arrow-color: #666;
    scrollbar-face-color: #3a8ee6;
    scrollbar-highlight-color: #dedede;
    scrollbar-shadow-color: #dedede;
    scrollbar-track-color: #dedede;
}
</style>
