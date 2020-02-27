<template>
    <div
        class="userAdmin mainBox dropDownBox"
        :style="{height: `${$pageHeight - 140}px`}">
        <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline">
            <el-form-item>
                <el-input
                    v-model="formInline.name"
                    :maxLength="50"
                    placeholder="请输入用户姓名" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchList()">查询</el-button>
                <el-button type="primary" @click="resetList()" plain>重置</el-button>
                <el-button type="primary" @click="openDialog()">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="list"
            :max-height="$pageHeight - 280"
            v-loading="loading"
            stripe
            border>
            <el-table-column label="用户名" prop="name" align="center" />
            <el-table-column label="用户姓名" prop="name" align="center" />
            <el-table-column label="用户电话" prop="phone" width="130px" align="center" />
            <el-table-column label="角色" prop="roleName" align="center" />
            <el-table-column label="创建时间" prop="ctime" width="170px" align="center" />
            <el-table-column label="状态" width="80px" align="center">
                <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.state == 1
                            ? 'success'
                            : 'danger'"
                        close-transition>
                        {{scope.row.state == 1 ? '启用' : '禁用'}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150px" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="openDialog(scope.row.id)">编辑</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="deleteFun(scope.row.id)">删除</el-button>
                    <el-button
                        type="text"
                        size="small"
                        @click="isState(scope.row.state, scope.row.id)">
                        {{scope.row.state == 1 ? '禁用' : '启用'}}
                    </el-button>
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
            title="用户内容"
            top="10vh"
            width="500px"
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
                <el-form-item label="用户名：" prop="username">
                    <el-input
                        type="text"
                        placeholder="请输入"
                        :maxLength="50"
                        v-model.trim="dialogForm.username" />
                </el-form-item>
                <el-form-item label="姓名：" prop="name">
                    <el-input
                        type="text"
                        placeholder="请输入"
                        :maxLength="50"
                        v-model.trim="dialogForm.name" />
                </el-form-item>
                <el-form-item label="移动电话：" prop="phone">
                    <el-input
                        type="text"
                        :maxLength="11"
                        placeholder="请输入"
                        v-model.trim="dialogForm.phone" />
                </el-form-item>
                <el-form-item label="角色：" prop="roleId">
                    <el-select
                        v-model="dialogForm.roleId"
                        placeholder="请选择"
                        style="width: 100%">
                        <el-option
                            v-for="item in roleList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select
                        v-model="dialogForm.state"
                        placeholder="请选择"
                        style="width: 100%">
                        <el-option label="启用" :value="1" />
                        <el-option label="禁用" :value="2" />
                    </el-select>
                </el-form-item>
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
    roleGetAllList,
    userGetPageList,
    userGetById,
    userDeleteById,
    userAdd,
    userUpdate,
    userResetPwd,
    userEnable,
    userDisable
} from '@/assets/js/apis'
import LoadingDialog from '@/components/LoadingDialog'
import {regName, regMobile} from '@/assets/js/common'
export default {
    name: 'userAdmin',
    data() {
        let checkName = (rule, value, callback) => {
            if (!value)
                return callback(new Error('请输入用户名'))
            setTimeout(() => {
                if (!regName.test(value))
                    callback(new Error('用户名为3-20位英文或数字'))
                callback()
            }, 1000)
        }
        let checkPhone = (rule, value, callback) => {
            if (!value)
                return callback(new Error('请输入手机号码'))
            setTimeout(() => {
                if (!regMobile.test(value))
                    callback(new Error('请输入正确的手机号码'))
                callback()
            }, 1000)
        }
      return {
          loading: false,
          disabled: false,
          treeLoading: false,
          submitLoading: false,
          formInline: {
              name: '',
          },
          list: [],
          roleList: [],
          currentPage: 1,
          currentPageSize: 10,
          total: 0,
          dialogTableVisible: false,
          dialogForm: {
              username: '',
              name: '',
              phone: '',
              roleId: '',
              state: 1
          },
          rules: {
              username: [
                  {required: true, message: '请输入用户名', trigger: 'blur'},
                  {validator: checkName, trigger: 'blur'}
              ],
              name: [{required: true, message: '请输入名称', trigger: 'blur'}],
              phone: [
                  {required: true, message: '请输入移动电话', trigger: 'blur'},
                  {validator: checkPhone, trigger: 'blur'}
              ],
              roleId: [{required: true, message: '请选择角色', trigger: 'change'}],
              state: [{required: true, message: '请选择状态', trigger: 'change'}],
          },
      }
    },
    components: {
        LoadingDialog
    },
    mounted() {
        this.getAllList()
        this.getPageList()
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.disabled = true
                    this.submitLoading = true
                    if (this.dialogForm.id) {
                        userUpdate(
                            this.dialogForm
                        ).then(res => {
                            this.disabled = false
                            this.submitLoading = false
                            if (Number(res.code) != 1)
                              return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
                            this.$message.success('修改成功')
                            this.getPageList()
                            this.closeForm()
                        }).catch(err => {
                            this.disabled = false
                            this.submitLoading = false
                        })
                    } else {
                        userAdd(
                            this.dialogForm
                        ).then(res => {
                            this.disabled = false
                            this.submitLoading = false
                            if (Number(res.code) != 1)
                                return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
                            this.$message.success('新增成功')
                            this.getPageList()
                            this.closeForm()
                        }).catch(err => {
                            this.disabled = false
                            this.submitLoading = false
                        })
                    }
                }
            })
        },
        openDialog(id) {
            if (id) {
                userGetById({
                    userId: id
                }).then(res => {
                    if (Number(res.code) != 1) return
                    this.dialogForm = res.data
                    this.dialogTableVisible = true
                }).catch(err => {})
            } else {
                this.dialogForm = {
                    username: '',
                    name: '',
                    phone: '',
                    roleId: '',
                    state: 1
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
                userDeleteById({
                    id: id
                }).then(res => {
                    if (Number(res.code) != 1)
                        return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
                    this.$message.success('删除成功')
                    this.getPageList()
                }).catch(err => {})
            }).catch(err => {})
        },
        isState(state, id) {
            if (state == 1) {
                this.$confirm('是否确定禁用？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    userDisable({
                        id: id
                    }).then(res => {
                        if (Number(res.code) != 1)
                            return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
                        this.$message.success('禁用成功')
                        this.getPageList()
                    }).catch(err => {})
                }).catch(err => {})
            } else {
                userEnable({
                    id: id
                }).then(res => {
                    if (Number(res.code) != 1)
                        return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
                    this.$message.success('启用成功')
                    this.getPageList()
                }).catch(err => {})
            }
        },
        resetPwd(id) {
            this.$confirm('是否确定重置密码？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                userResetPwd({
                    id: id
                }).then(res => {
                    if (Number(res.code) != 1)
                        return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
                    this.$message.success('密码重置成功，新密码为123456')
                    this.getPageList()
                }).catch(err => {})
            }).catch(err => {})
        },
        searchList() {
            this.currentPage = 1
            this.getPageList()
        },
        resetList() {
            this.formInline = {
                name: '',
            }
            this.searchList()
        },
        getPageList() {
            this.loading = true
            userGetPageList(
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
        handleSizeChange (val) {
            this.currentPage = 1
            this.currentPageSize = val
            this.getPageList()
        },
        handleCurrentChange (val) {
            this.currentPage = val
            this.getPageList()
        },
        getAllList() {
            roleGetAllList({
            }).then(res => {
                if (Number(res.code) != 1) return
                this.roleList = res.data || []
            }).catch(err => {})
        },
    },
}
</script>

<style lang="less" scoped>
.userAdmin {
    position: relative;
    .pageBox {
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
}
</style>