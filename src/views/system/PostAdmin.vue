<template>
    <div class="postAdmin mainBox dropDownBox" :style="{height: `${$pageHeight - 140}px`}">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-input 
                    v-model="formInline.name"
                    :maxLength="50"
                    placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchList()">查询</el-button>
                <el-button type="primary" @click="resetList()" plain>重置</el-button>
                <el-button type="primary" @click="openDialog()">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="list"
            :max-height="$pageHeight - 250"
            v-loading="loading"
            stripe
            border >
            <el-table-column prop="name" label="角色名称" align="center" />
            <el-table-column prop="remark" label="角色说明" align="center" />
            <el-table-column label="操作" width="100px" fixed="right" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="openDialog(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteFun(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row
            v-if="total > currentPageSize"
            class="pageBox">
            <el-col :span="24">
                <el-pagination
                    background
                    class="center"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="currentPageSize"
                    layout="prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        <loading-dialog
            v-show="submitLoading"
            loadingText="提交中" />
        <el-dialog
            title="角色内容"
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
                ref="dialogForm"
                :rules="rules"
                label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="角色名称：" prop="name">
                            <el-input
                              type="text"
                              placeholder="请输入"
                              :maxLength="50"
                              v-model.trim="dialogForm.name" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="角色说明：" prop="remark">
                            <el-input
                              type="text"
                              :maxLength="50"
                              placeholder="请输入"
                              v-model.trim="dialogForm.remark" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="角色授权：">
                            <div class="dropDownBox" :style="{maxHeight: `${$pageHeight - 370}px`}">
                                <el-tree
                                    ref="tree"
                                    node-key="id"
                                    :data="treeData"
                                    v-loading="treeLoading"
                                    :highlight-current="true"
                                    :default-expanded-keys="[treeData[0].id] || []"
                                    :default-checked-keys="dialogForm.resourceIdList"
                                    :props="defaultProps"
                                    show-checkbox
                                    accordion>
                                </el-tree>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="center">
                    <el-col :span="24">
                        <el-button type="primary" @click="submitForm('dialogForm')" :disabled="disabled">提交</el-button>
                        <el-button type="primary" @click="closeForm('dialogForm')" :disabled="disabled" plain>关闭</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {
    roleGetPageList,
    roleDelete,
    roleGetById,
    roleAdd,
    roleUpdate,
    resourceGetTreeAllResource
} from '@/assets/js/apis'
import LoadingDialog from '@/components/LoadingDialog'
export default {
    name: 'postAdmin',
    data () {
        return {
            loading: false,
            disabled: false,
            submitLoading: false,
            treeLoading: false,
            formInline: {
                name: ''
            },
            list: [],
            dialogTableVisible: false,
            dialogForm: {
                name: '',
                remark: '',
                resourceIdList: []
            },
            rules: {
                name: [{required: true, message: '请输入名称', trigger: 'blur'}],
                remark: [{required: true, message: '请输入角色说明', trigger: 'blur'}],
            },
            currentPage: 1,
            currentPageSize: 10,
            total: 0,
            treeData: [{
                id: '',
                name: '',
                children: []
            }],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        }
    },
    components: {
        LoadingDialog
    },
    mounted() {
        this.getPageList()
    },
    methods: {
        submitForm(formName) {
            this.dialogForm.resourceIdList = this.$refs.tree.getCheckedKeys() || []
            this.$refs[formName].validate((valid) => {
                if (this.dialogForm.resourceIdList.length <= 0)
                    return this.$message.warning('请勾选授权页面')
                if (valid) {
                    this.disabled = true
                    this.submitLoading = true
                    if (this.dialogForm.id) {
                        roleUpdate(
                            this.dialogForm
                        ).then(res => {
                            this.disabled = false
                            this.submitLoading = false
                            if (Number(res.code) != 1)
                                return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
                            this.closeForm()
                            this.$message.success('修改成功')
                        }).catch(err => {
                            this.disabled = false
                            this.submitLoading = false
                        })
                    } else {
                        roleAdd(
                            this.dialogForm
                        ).then(res => {
                            this.disabled = false
                            this.submitLoading = false
                            if (Number(res.code) != 1)
                                return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
                            this.closeForm()
                            this.$message.success('新增成功')
                        }).catch(err => {
                            this.disabled = false
                            this.submitLoading = false
                        })
                    }
                }
            })
        },
        openDialog(id) {
            this.getAllResource()
            if (id) {
                roleGetById({
                    roleId: id
                }).then(res => {
                    if (Number(res.code) != 1) return
                    this.dialogForm = res.data
                    this.dialogTableVisible = true
                }).catch(err => {})
            } else {
                this.dialogForm = {
                    name: '',
                    remark: '',
                    resourceIdList: []
                }
                this.dialogTableVisible = true
            }
        },
        closeForm() {
            this.dialogTableVisible = false
        },
        deleteFun(id) {
            this.$confirm('是否确定删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                roleDelete({
                    id: id
                }).then(res => {
                    if (Number(res.code) != 1)
                        return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
                    this.$message.success('删除成功')
                    this.getPageList()
                }).catch(err => {})
            }).catch(err => {})
        },
        getAllResource() {
            this.treeLoading = true
            resourceGetTreeAllResource({
            }).then(res => {
                this.treeLoading = false
                if (Number(res.code) != 1) return
                this.treeData = res.data || []
            }).catch(err => this.treeLoading = false)
        },
        getPageList() {
            this.loading = true
            roleGetPageList(
                Object.assign(this.formInline, {
                    pageIndex: this.currentPage,
                    pageSize: this.currentPageSize
                })
            ).then(res => {
                this.loading = false
                if (Number(res.code) != 1) return
                this.list = res.data.records || []
                this.currentPage = res.data.current
                this.currentPageSize = res.data.size
                this.total = res.data.total
            }).catch(err => this.loading = false)
        },
        searchList() {
            this.currentPage = 1
            this.getPageList()
        },
        resetList() {
            this.formInline = {name: ''}
            this.searchList()
        },
        handleSizeChange (val) {
            this.currentPage = 1
            this.currentPageSize = val
            this.getPageList()
        },
        handleCurrentChange (val) {
            this.currentPage = val
            this.getPageList()
        },
    }
}
</script>

<style lang="less" scoped>
.postAdmin {
    position: relative;
    .pageBox {
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
}
</style>