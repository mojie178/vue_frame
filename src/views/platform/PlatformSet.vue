<template>
    <div class="platformSet mainBox dropDownBox" :style="{height: `${$pageHeight - 140}px`}">
        <h4>基础信息</h4>
        <el-form
            :model="infoForm"
            ref="infoForm"
            v-loading="loading"
            label-width="100px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="平台名称：">
                        <el-input
                            type="text"
                            :maxLength="50"
                            placeholder="请输入"
                            v-model.trim="infoForm.title" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="行政名称：">
                        <el-input
                            type="text"
                            :maxLength="50"
                            placeholder="请输入"
                            v-model.trim="infoForm.area" />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="技术支持：">
                        <el-input
                            type="text"
                            :maxLength="50"
                            placeholder="请输入"
                            v-model.trim="infoForm.support" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="地图中心点：">
                        <div class="mapBox">
                            <div id="areaMap" />
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="平台logo：">
                        <div class="uploadBgBox">
                            <i v-if="infoForm.logo" class="el-icon-delete" @click="deleteFun(1)" />
                            <el-upload
                                class="upload-demo"
                                accept="image/jpeg,image/jpg,image/png"
                                :action="`${$uploadLink}${$project}/upload/anonUploadFile`"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccessOne"
                                :on-error="handleAvatarError"
                                :before-upload="beforeAvatarUpload">
                                <img
                                    class="imgBox marginB10"
                                    :src="`${$uploadLink}${infoForm.logo}`"
                                    :onerror="$defaultImg"
                                    v-if="infoForm.logo"
                                    key="imgShow1" />
                                <img
                                    class="imgBox marginB10"
                                    src="@/assets/img/imgBg.jpg"
                                    v-else
                                    key="imgShow1" />
                                <p v-if="infoForm.logo">更换图片</p>
                            </el-upload>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="app二维码：">
                        <div class="uploadBgBox">
                            <i v-if="infoForm.appPic" class="el-icon-delete" @click="deleteFun(2)" />
                            <el-upload
                                class="upload-demo"
                                accept="image/jpeg,image/jpg,image/png"
                                :action="`${$uploadLink}${$project}/upload/anonUploadFile`"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccessTwo"
                                :on-error="handleAvatarError"
                                :before-upload="beforeAvatarUpload">
                                <img
                                    class="imgBox marginB10"
                                    :src="`${$uploadLink}${infoForm.appPic}`"
                                    :onerror="$defaultImg"
                                    v-if="infoForm.appPic"
                                    key="imgShow2" />
                                <img
                                    class="imgBox marginB10"
                                    src="@/assets/img/imgBg.jpg"
                                    v-else
                                    key="imgShow2" />
                                <p v-if="infoForm.appPic">更换图片</p>
                            </el-upload>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="微信二维码：">
                        <div class="uploadBgBox">
                            <i v-if="infoForm.weChatPic" class="el-icon-delete" @click="deleteFun(3)" />
                            <el-upload
                                class="upload-demo"
                                accept="image/jpeg,image/jpg,image/png"
                                :action="`${$uploadLink}${$project}/upload/anonUploadFile`"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccessThree"
                                :on-error="handleAvatarError"
                                :before-upload="beforeAvatarUpload">
                                <img
                                    class="imgBox marginB10"
                                    :src="`${$uploadLink}${infoForm.weChatPic}`"
                                    :onerror="$defaultImg"
                                    v-if="infoForm.weChatPic"
                                    key="imgShow3" />
                                <img
                                    class="imgBox marginB10"
                                    src="@/assets/img/imgBg.jpg"
                                    v-else
                                    key="imgShow3" />
                                <p v-if="infoForm.weChatPic">更换图片</p>
                            </el-upload>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="背景图：">
                        <div>
                            <div class="imgListBox">
                                <div
                                    class="imgBoxLi marginR10"
                                    v-for="item in infoForm.loginBg"
                                    :key="item">
                                    <i class="el-icon-delete" @click="deleteFun(4, item)" />
                                    <img :src="`${$uploadLink}${item}`" :onerror="$defaultImg" />
                                </div>
                            </div>
                            <div class="uploadBox">
                                <el-upload
                                    class="upload-demo"
                                    accept="image/jpeg,image/jpg,image/png"
                                    :action="`${$uploadLink}${$project}/upload/anonUploadFile`"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccessFour"
                                    :on-error="handleAvatarError"
                                    :before-upload="beforeAvatarUpload">
                                    <img class="imgBox marginB10" src="@/assets/img/imgBg.jpg" />
                                </el-upload>
                            </div>
                      </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="center">
                <el-col :span="24">
                    <el-button type="primary" @click="submitForm()" :disabled="disabled">提交</el-button>
                    <el-button type="primary" @click="resetForm()" :disabled="disabled" plain>重置</el-button>
                </el-col>
            </el-row>
        </el-form>
        <loading-dialog
            v-show="submitLoading"
            loadingText="提交中" />
        <el-dialog
            title="进度"
            width="40%"
            top="30vh"
            :visible.sync="uploadDialogTableVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="progressBar" />
        </el-dialog>
    </div>
</template>

<script>
import {
    platformConfigSaveAll,
    platformConfigGetAll,
} from '@/assets/js/apis'
import LoadingDialog from '@/components/LoadingDialog'
import {isLegalImg} from '@/assets/js/common'
export default {
    name: 'platformSet',
    data() {
      return {
          loading: false,
          disabled: false,
          submitLoading: false,
          infoForm: {
              title: '',
              logo: '',
              loginBg: [],
              support: 1,
              longitude: '',
              latitude: '',
              area: '',
              weChatPic: '',
              appPic: ''
          },
          uploadDialogTableVisible: false,
          progressBar: 0,
          timer: null,
      }
    },
    components: {
        LoadingDialog
    },
    beforeDestroy() {
        clearInterval(this.timer)
        this.timer = null
    },
    mounted() {
        this.getById()
    },
    methods: {
        submitForm() {
            this.disabled = true
            this.submitLoading = true
            platformConfigSaveAll(
                this.infoForm
            ).then(res => {
                this.disabled = false
                this.submitLoading = false
                if (Number(res.code != 1))
                    return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
                window.location.reload()
            }).catch(err => {
                this.disabled = false
                this.submitLoading = false
            })
        },
        resetForm() {
            this.getById()
        },
        getById() {
            this.loading = true
            platformConfigGetAll(
            ).then(res => {
                this.loading = false
                if (Number(res.code) != 1) return
                this.infoForm = Object.assign(
                    this.infoForm,
                    res.data,
                    {loginBg: JSON.parse(res.data.loginBg)}
                )
                this.mapview()
            }).catch(err => this.loading = false)
        },
        handleAvatarSuccessOne(res, file) {
            clearInterval(this.timer)
            this.timer = null
            this.progressBar = 0
            this.uploadDialogTableVisible = false
            this.$message.success('上传成功')
            this.infoForm.logo = res.data
        },
        handleAvatarSuccessTwo(res, file) {
            clearInterval(this.timer)
            this.timer = null
            this.progressBar = 0
            this.uploadDialogTableVisible = false
            this.$message.success('上传成功')
            this.infoForm.appPic = res.data
        },
        handleAvatarSuccessThree(res, file) {
            clearInterval(this.timer)
            this.timer = null
            this.progressBar = 0
            this.uploadDialogTableVisible = false
            this.$message.success('上传成功')
            this.infoForm.weChatPic = res.data
        },
        handleAvatarSuccessFour(res, file) {
            clearInterval(this.timer)
            this.timer = null
            this.progressBar = 0
            this.uploadDialogTableVisible = false
            this.$message.success('上传成功')
            this.infoForm.loginBg.push(res.data)
        },
        handleAvatarError(err, file) {
            clearInterval(this.timer)
            this.timer = null
            this.progressBar = 0
            this.uploadDialogTableVisible = false
            this.$message.error('上传失败')
        },
        beforeAvatarUpload(file) {
            return isLegalImg(this, file, {
                success: () => {
                    clearInterval(this.timer)
                    this.timer = null
                    this.progressBar = 0
                    this.uploadDialogTableVisible = true
                    this.timer = setInterval(() => {
                        if (Number(this.progressBar) >= 90) {
                            clearInterval(this.timer)
                            this.timer = null
                        } else this.progressBar += Number.parseInt(10 * Math.random())
                    }, 500)
                },
                error: () => {}
            })
        },
        deleteFun(flag, path) {
            this.$confirm('是否确定删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                switch(Number(flag)) {
                    case 1:
                        this.infoForm.logo = ''
                        this.$message.success('删除成功')
                        break
                    case 2:
                        this.infoForm.appPic = ''
                        this.$message.success('删除成功')
                        break
                    case 3:
                        this.infoForm.weChatPic = ''
                        this.$message.success('删除成功')
                        break
                    case 4:
                        this.infoForm.loginBg = this.infoForm.loginBg.filter(item => {return item != path})
                        this.$message.success('删除成功')
                        break
                }
            }).catch(err => {})
        },
        mapview() {
            let map = new BMap.Map("areaMap")
            let newPoint = new BMap.Point(
                this.infoForm.longitude || '116.4039',
                this.infoForm.latitude || '39.9152'
            )
            map.centerAndZoom(newPoint, 13)
            let marker = new BMap.Marker(newPoint)
            map.addOverlay(marker)
            marker.enableDragging()
            map.panTo(newPoint)
            map.enableScrollWheelZoom(true)
            map.addControl(new BMap.MapTypeControl({mapTypes:[BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]}))
            let geocoder = new BMap.Geocoder()
            marker.addEventListener("dragend", (e) => {
                geocoder.getLocation(e.point, (rs) => {
                    this.infoForm.latitude = rs.point.lat
                    this.infoForm.longitude = rs.point.lng
                })
            })
        },
  },
}
</script>

<style lang="less" scoped>
.platformSet {
    .imgListBox {
        display: inline-block;
        .imgBoxLi {
            position: relative;
            width: 98px;
            height: 98px;
            display: inline-block;
            i {
                position: absolute;
                right: 0;
                top: 0;
                cursor: pointer;
                padding: 5px;
                color: #fff;
                background: rgba(0,0,0,.5);
            }
            img {width: 100%; height: 100%;}
        }
    }
    .uploadBox {
        width: 100px;
        height: 100px;
        display: inline-block;
        border: 1px solid #ccc;
        overflow: hidden;
        text-align: center;
    }
    .imgBox {height: 100px; display: inline-block;}
    .uploadBgBox {
        overflow: hidden;
        width: 100px;
        height: 100px;
        position: relative;
        border: 1px solid #ccc;
        i {
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            cursor: pointer;
            padding: 5px;
            color: #fff;
            background: rgba(0,0,0,.5);
        }
        p {
            position: absolute;
            bottom: 0;
            background: rgba(0,0,0,.5);
            color: #fff;
            font-size: 12px;
            text-align: center;
            width: 100%;
            z-index: 10;
            height: 25px;
            line-height: 25px;
        }
    }
}
</style>