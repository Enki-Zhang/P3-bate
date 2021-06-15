<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white-default-h-edit">
                <el-row class="fm fm-max-w">
                    <el-form ref="fm" :model="form" size="small" label-position="right" label-width="260px">
                        <el-row>
                            <el-form-item prop="title" label="文件编号" :rules="[
                                          {required: true, message: '请填写文件编号'},
                                          {type: 'string', min: 1, max: 200, message: '长度为 1 ~ 200 个字符'},
                                          {validator: validateAllSpace, message: '请填写文件编号'}
                                      ]">
                                <el-input v-model="form.title" placeholder="文件编号" clearable></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item prop="title" label="文件名称" :rules="[
                                          {required: true, message: '请填写文件名称'},
                                          {type: 'string', min: 1, max: 200, message: '长度为 1 ~ 200 个字符'},
                                          {validator: validateAllSpace, message: '请填写文件名称'}
                                      ]">
                                <el-input v-model="form.title" placeholder="文件名称" clearable></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item prop="locked" label="文件状态">
                                <el-switch v-model="form.locked"
                                           :active-value="1" active-text="发布"
                                           :inactive-value="0" inactive-text="撤下">
                                </el-switch>
                            </el-form-item>
                        </el-row>
                        <el-form-item prop="files" label="其他附件" size="mini">
                            <el-row v-if="!form.files.length" style="width: max-content;">
                                <el-upload
                                        ref="otherFiles" action=""
                                        :auto-upload="false" :show-file-list="false"
                                        :on-change="(file, fileList) => {chooseUploadFile(file, fileList, 'files')}">
                                    <!--                                        <span class="img-link"><span class="el-icon-link mg-r-5"></span>上传附件</span>-->
                                    <el-button type="primary" icon="el-icon-link" style="width: 120px;">上传附件</el-button>
                                </el-upload>
                            </el-row>
                            <el-row>
                                <el-row v-if="form.files.length" style="width: max-content;">
                                    <el-upload
                                            ref="otherFiles" action=""
                                            :auto-upload="false" :show-file-list="false"
                                            :on-change="(file, fileList) => {chooseUploadFile(file, fileList, 'files')}">
                                        <!--                                            <span class="img-link"><span class="el-icon-link mg-r-5"></span>上传附件</span>-->
                                        <el-button type="primary" icon="el-icon-link" style="width: 120px;">上传附件</el-button>
                                    </el-upload>
                                </el-row>
                                <el-row v-for="(v, k) in form.files" :key="k">
                                    <el-row type="flex" class="mg-t-3">
                                        <el-input v-model="form.files[k].fileCnName" size="mini" class="files-item" clearable>
                                            <template slot="prepend">附件名（中）</template>
                                        </el-input>
                                        <el-input v-model="form.files[k].fileEnName" class="files-item mg-l-3" clearable>
                                            <template slot="prepend">附件名（英）</template>
                                        </el-input>
                                    </el-row>
                                    <el-row type="flex" class="mg-t-3">
                                        <el-input v-model="form.files[k].fileExternalUrl" class="files-item" clearable>
                                            <template slot="prepend">二维码链接</template>
                                        </el-input>
                                        <!--                                                <el-button type="success" icon="el-icon-zoom-in" class="files-item-del" @click="previewFileByOpenNewBlank('files', true, k)">保存链接</el-button>-->
                                        <el-button type="warning" icon="el-icon-zoom-in" class="files-item-del" @click="previewFileByOpenNewBlank('files', true, k)">预览</el-button>
                                        <el-button type="danger" icon="el-icon-delete" class="files-item-del" @click="removeUploadFile('files', k)">移除</el-button>
                                    </el-row>
                                </el-row>
                            </el-row>
                        </el-form-item>
                    </el-form>
                </el-row>
            </el-row>
            <el-row type="flex" justify="center" align="middle" class="page-default-pd-bgc-white edit-page-options-btn">
                <el-button type="default" size="small" icon="el-icon-refresh-left" @click="cancel" class="btn">返回列表</el-button>
                <el-button type="primary" size="small" icon="el-icon-finished" :loading="btnLoadingSave" @click="save" class="btn">保存修改</el-button>
            </el-row>
        </el-row>

        <!-- 组件 -->
    </el-row>

</template>

<script>

    import api from '@api';
    import {
        validateAllSpace,
        validateNullArray,
    } from '@plugins/man/validate';
    import {mapState} from "vuex";
    const listRouteName = 'system_doc_management_manual';

    export default {
        name: "edit",
        components: {},
        data() {
            return {
                validateAllSpace,
                validateNullArray,

                seloptsNavigation: [],

                form: {
                    permission: [],
                    files: [],
                },
                btnLoadingSave: false,
            }
        },
        beforeCreate() {
            // this.$toast.loading('正在加载');
        },
        created() {
            this.$store.commit('setPageTitle', `${this.$route.params.id > 0 ? '编辑' : '新增'}部门`);

            if(this.$route.params.id) this.getDetail();
            this.initSeloptsNavigation();
        },
        computed: {
            ...mapState(['userInfo', ]),
        },
        methods: {
            getDetail: function() {
                let that = this;

                api.departmentFind(this.$route.params.id).then((res) => {
                    if(res.data.status === 200) {
                        that.form = {...res.data.data};
                    }
                });
            },
            save: function() {
                let that = this;
                // console.log(that.form);

                that.$refs["fm"].validate(valid => {
                    if (valid) {
                        that.btnLoadingSave = true;

                        if(that.$route.params.id > 0) {
                            api.departmentEdit({
                                ...that.form,
                                permission: that.form.permission.join(','),
                            }).then((res) => {
                                if(res.data.status === 200) {
                                    that.$message.success('保存成功');
                                    that.$router.push({name: listRouteName, params: {_lpq: JSON.parse(that.$route.params._lpq)}});
                                }
                            });
                        } else {
                            api.departmentSave({
                                ...that.form,
                                permission: that.form.permission.join(','),
                            }).then((res) => {
                                if(res.data.status === 200) {
                                    that.$message.success('保存成功');
                                    that.$router.push({name: listRouteName, params: {_lpq: JSON.parse(that.$route.params._lpq)}});
                                }
                            });
                        }
                    } else {return false;}
                });
            },
            cancel: function() {
                let that = this;

                that.$confirm('是否取消编辑内容并返回列表', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '返回列表',
                    cancelButtonText: '取消'
                }).then(() => {
                    that.$router.push({name: listRouteName, params: {_lpq: JSON.parse(that.$route.params._lpq)}});
                }).catch();
            },

            chooseUploadFile: function(file, fileList, ref, refIsArray = true) {
                let that = this;
                // console.log(file.raw);

                /*let fileNameArr = file.name.split('.');
                if(fileNameArr.length < 2 || !that.man.fast.inArray(fileNameArr[fileNameArr.length - 1], ['xls', 'xlsx', 'csv', 'XLS', 'XLSX', 'CSV'])) {
                    that.$toast.fail({
                        message: '不支持的格式',
                        duration: 1888
                    });
                    return false;
                }*/

                that.$toast.loading({
                    message: '正在上传',
                    forbidClick: true,
                    loadingType: 'spinner',
                });

                api.upload(file.raw).then((res) => {
                    if(res.data.status === 200) {
                        if(refIsArray) {
                            that.form[ref].push({
                                fileCnName: file.raw.name,
                                fileEnName: file.raw.name,
                                fileUrl: res.data.data,
                            });
                        } else {
                            that.form[ref] = res.data.data;
                        }

                        that.$toast.success({
                            message: '上传完成',
                            duration: 1288
                        });
                    } else {that.$toast.clear();}
                }).catch((err) => {that.$toast.clear();});
            },
            removeUploadFile: function(ref, index) {
                let that = this;

                switch (ref) {
                    case 'files':
                        that.form[ref].splice(index, 1);
                        break;
                    default:
                        that.form[ref] = '';
                        break;
                }
                that.$forceUpdate();

                /*api.deleteUploadFile({
                    fileUrl: that.form[ref],
                }).then((res) => {
                    if(res.data.status === 200) {
                        that.form[ref] = false;
                    }
                });*/
            },
            previewFileByOpenNewBlank: function(ref, refIsArray = false, index = 0) {
                let that = this;
                let path = refIsArray
                    ? that.man.fast.getResourcePath(that.form[ref][index].fileUrl)
                    : that.man.fast.getResourcePath(that.form[ref]);
                window.open(path, 'blank');
            },

            initSeloptsNavigation: function() {
                let that = this;

                api.navigationTree().then((res) => {
                    if(res.data.status === 200) {
                        that.seloptsNavigation = [...res.data.data];
                        that.$toast.clear();
                    }
                });
            },
        }
    }

</script>

<style lang="scss" scoped>

    .mg-l-3 {margin-left: 3px;}
    .mg-t-3 {margin-top: 3px;}

    .files-item {}
    .files-item-del {
        width: 100px;
        height: 28px;
        margin-left: 3px !important;
    }

</style>