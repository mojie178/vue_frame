<template>
    <div class="tableCheck">
        <div class="tableBox">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumbBox fl marginT5">
                <i class="el-icon-location-outline fl marginR5" />
                <el-breadcrumb-item
                    :to="{path: fatherRouter.path}">{{fatherRouter.name}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{checkLabel.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <ul>
                <li
                    v-for="item in list"
                    :key="item.id"
                    :class="checkLabel.id.indexOf(item.id) >= 0 ? 'headHighLight' : null"
                    @click="$router.push({path: item.path})">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tableCheck',
    props: {
        list: {
            type: Array,
            default: []
        },
        fatherRouter: {
            name: String,
            path: String
        }
    },
    data() {
        return {
            checkLabel: {
                id: '',
                name: ''
            }
        }
    },
    mounted() {
        this.checkLabel = this.$route.meta
    },
    watch: {
        '$route'(n) {
            this.checkLabel = n.meta
        }
    }
}
</script>

<style lang="less" scoped>
.tableCheck {
    height: 30px;
    padding: 8px;
    background: #e2e6ef;
    .tableBox {
        margin: 0 auto;
        ul {
            float: right;
            li {
                display: inline-block;
                line-height: 28px;
                height: 28px;
                padding: 0 10px;
                background: #fff;
                color: #3a8ee6;
                border: 1px solid #3a8ee6;
                border-radius: 5px;
                margin-left: 10px;
                cursor: pointer;
                &:hover {background: #3a8ee6; color: #fff;}
            }
            .headHighLight { background: #3a8ee6; color: #fff;}
        }
    }
}
</style>
