<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <!-- 新增文件 -->
                <el-row class="block mg-b-10">
                    <el-row class="title lh-30 pd-b-10">新增</el-row>
                    <el-row class="fm fm-max-w">
                        <el-form ref="fm" :model="form" label-position="right" size="small" label-width="150px">
                            <el-row>
                                <el-form-item prop="documentNo" label="文件编号" :rules="[
                                    {required: true, message: '请填写文件编号'},
                                    {type: 'string', min: 1, max: 36, message: '长度应为 1 ~ 36 个字符'},
                                ]">
                                    <el-input v-model="form.documentNo" placeholder="文件编号" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="name" label="文件名称" :rules="[
                                    {required: true, message: '请填写文件名称'},
                                    {type: 'string', min: 1, max: 30, message: '长度应为 1 ~ 30 个字符'},
                                ]">
                                    <el-input v-model="form.name" placeholder="文件名称" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="version" label="文件版本" :rules="[
                                    {required: true, message: '请填写文件版本'},
                                    {type: 'string', min: 1, max: 20, message: '长度应为 1 ~ 20 个字符'},
                                ]">
                                    <el-input v-model="form.version" placeholder="文件版本" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="files" label="附件" size="mini" :rules="[
                                    {required: true, message: '请上传附件', trigger: 'blur'},
                                    {validator: validateAnnex, message: '请上传附件'}
                                ]">
                                    <el-row v-if="!!!form.files.length" style="width: max-content;">
                                        <el-upload ref="otherFiles" action=""
                                                   :auto-upload="false" :show-file-list="false"
                                                   :on-change="(file, fileList) => {chooseUploadFile(file, fileList, 'files', true)}">
<!--                                            <span class="img-link"><span class="el-icon-link mg-r-5"></span>上传附件</span>-->
                                            <el-button type="primary" icon="el-icon-link">上传附件</el-button>
                                        </el-upload>
                                    </el-row>
                                    <el-row>
                                        <!--<el-row v-if="form.files.length" style="width: max-content;">
                                            <el-upload ref="otherFiles" action=""
                                                       :auto-upload="false" :show-file-list="false"
                                                       :on-change="(file, fileList) => {chooseUploadFile(file, fileList, 'files', false)}">
&lt;!&ndash;                                                <span class="img-link"><span class="el-icon-link mg-r-5"></span>上传附件</span>&ndash;&gt;
                                                <el-button type="primary" icon="el-icon-link">上传附件</el-button>
                                            </el-upload>
                                        </el-row>-->
                                        <el-row v-for="(v, k) in form.files" :key="k">
                                            <el-row type="flex" style="width: max-content;">
                                                <el-input v-model="form.files[k].name" size="mini" class="files-item" clearable>
                                                    <template slot="prepend">附件名</template>
                                                </el-input>
                                                <el-row type="flex">
                                                    <el-button type="warning" icon="el-icon-zoom-in" class="files-item-del" @click="previewFileByOpenNewBlank('files', true, k)">预览</el-button>
                                                    <el-button type="danger" icon="el-icon-delete" class="files-item-del" @click="removeUploadFile('files', k)">移除</el-button>
                                                </el-row>
                                            </el-row>
                                        </el-row>
                                    </el-row>
                                </el-form-item>
                            </el-row>
                            <el-row class="mg-t-15">
                                <el-form-item prop="status" label="文件状态">
                                    <el-switch v-model="form.status"
                                               :active-value="1" active-text="发布"
                                               :inactive-value="0" inactive-text="撤下">
                                    </el-switch>
                                </el-form-item>
                            </el-row>
                        </el-form>
                    </el-row>
                </el-row>
                <el-row class="hr"></el-row>
                <!-- 相关文件列表 -->
                <el-row class="block mg-t-10 mg-b-20">
                    <el-row type="flex" justify="space-between" align="middle" class="title">
                        <span>相关文件</span>
                        <el-button type="primary" icon="el-icon-plus" size="mini" @click="chooseRelatedFiles" class="btn">选择添加</el-button>
                    </el-row>
                    <!-- 列表 -->
                    <el-table ref="multipleTable" :data="tbDataRelated.records"
                              :min-height="460" size="small" tooltip-effect="dark"
                              :show-header="true" highlight-current-row>
                        <el-table-column label="文件编号" fixed="left" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.documentNo }}</template>
                        </el-table-column>
                        <el-table-column label="文件名称" fixed="left" show-overflow-tooltip min-width="220">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="版本" show-overflow-tooltip min-width="60">
                            <template slot-scope="scope">{{ scope.row.version }}</template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" show-overflow-tooltip width="80">
                            <template slot-scope="scope">
                                <el-row type="flex">
                                    <el-popconfirm title="是否删除该选中项？"
                                                   confirm-button-text='删除'
                                                   cancel-button-text='取消'
                                                   icon="el-icon-info"
                                                   icon-color="red"
                                                   @confirm="removeRelatedFiles(scope.row)">
                                        <el-link type="primary"  slot="reference" :underline="false" class="fs-12">删除</el-link>
                                    </el-popconfirm>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <el-row v-if="tbDataRelated.total" class="mg-t-20 mg-b-10 txt-c">
                        <el-pagination :total="tbDataRelated.total" :current-page="tbDataRelated.current" :page-size="5"
                                       layout="total, prev, pager, next, jumper"
                                       @current-change="handlePaginationChangeTableRelated"
                                       background>
                        </el-pagination>
                    </el-row>
                </el-row>
                <el-row class="hr"></el-row>
                <!-- 记录 -->
                <el-row class="block mg-t-10 mg-b-20">
                    <el-row type="flex" justify="space-between" align="middle" class="title">
                        <span>记录</span>
                        <el-button type="primary" icon="el-icon-plus" size="mini" @click="chooseForms" class="btn">选择添加</el-button>
                    </el-row>
                    <!-- 列表 -->
                    <el-table ref="multipleTable" :data="tbDataForms.records"
                              :min-height="460" size="small" tooltip-effect="dark"
                              :show-header="true" highlight-current-row>
                        <el-table-column label="编号" fixed="left" show-overflow-tooltip min-width="60">
                            <template slot-scope="scope">{{ scope.row.formNumber }}</template>
                        </el-table-column>
                        <el-table-column label="表单key" fixed="left" show-overflow-tooltip min-width="220">
                            <template slot-scope="scope">{{ scope.row.formKey }}</template>
                        </el-table-column>
                        <el-table-column label="表单名称" fixed="left" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.formName }}</template>
                        </el-table-column>
                        <el-table-column label="表单描述" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.description }}</template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" show-overflow-tooltip width="80">
                            <template slot-scope="scope">
                                <el-row type="flex">
                                    <el-popconfirm title="是否删除该选中项？"
                                                   confirm-button-text='删除'
                                                   cancel-button-text='取消'
                                                   icon="el-icon-info"
                                                   icon-color="red"
                                                   @confirm="removeForms(scope.row)">
                                        <el-link type="primary"  slot="reference" :underline="false" class="fs-12">删除</el-link>
                                    </el-popconfirm>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <el-row v-if="tbDataForms.total" class="mg-t-20 mg-b-10 txt-c">
                        <el-pagination :total="tbDataForms.total" :current-page="tbDataForms.current" :page-size="5"
                                       layout="total, prev, pager, next, jumper"
                                       @current-change="handlePaginationChangeTableForms"
                                       background>
                        </el-pagination>
                    </el-row>
                </el-row>
                <el-row class="hr"></el-row>
                <el-row class="mg-t-25 mg-b-10">
                    <el-row type="flex" justify="center" align="middle">
                        <el-button type="default" size="small" icon="el-icon-refresh-left" @click="cancel" class="btn">返回列表</el-button>
                        <el-button type="primary" size="small" icon="el-icon-finished" :loading="btnLoadingSave" @click="save" class="btn">保存修改</el-button>
                    </el-row>
                </el-row>
            </el-row>
        </el-row>

        <!-- 组件：相关文件选择 -->
        <dl-table-related v-model="dlTableRelatedVisible" :params="dlParams" @changeTableData="changeTableDataRelatedFiles"></dl-table-related>
        <!-- 组件：相关记录选择 -->
        <dl-table-forms v-model="dlTableFormsVisible" :params="dlParams" @changeTableData="changeTableDataForms"></dl-table-forms>
    </el-row>

</template>

<script>

    import dayjs from 'dayjs';
    import api from "@api";
    import {validateAnnex,} from '@plugins/man/validate';
    const listRoutePath = '/system-doc/management-manual';
    import dlTableRelated from "@views/single/systemDoc/managementManual/dlTableRelated";
    import dlTableForms from "@views/single/systemDoc/managementManual/dlTableForms";
    import jsonTableData from "@mock/systemDocManagementManual.json";

    export default {
        name: "edit",
        components: {
            dlTableRelated,
            dlTableForms,
        },
        data() {
            return {
                dayjs,
                validateAnnex,

                dlParams: {},
                dlTableRelatedVisible: false,
                dlTableFormsVisible: false,

                editId: 0,
                form: {
                    documentNo: this.man.fast.getUUID(),
                    files: [],
                    filePath: '',
                    linkedDocumentIds: [],
                    linkedTableIds: [],
                },
                btnLoadingSave: false,

                tbDataRelatedOrigin: [],
                tbDataFormsOrigin: [],
                tbDataRelated: {records: []},
                tbDataForms: {records: []},
            }
        },
        beforeCreate() {
            // 更改当前路由面包屑 title
            if(this.$route.query.folderTitle !== undefined) this.man.bus.$emit('changeCurrentRouteVirtualParentMetaTitle', JSON.parse(this.$route.query.folderTitle));
        },
        mounted() {
            if(this.$route.query.id > 0) this.getDetail();
        },
        methods: {
            getDetail: function() {
                let that = this;

                api.systemDocumentFindById(that.$route.query.id).then((res) => {
                    if(res.data.status === 200) {
                        that.form = {
                            ...res.data.data,
                            files: [{
                                name: res.data.data.filePath,
                                fileUrl: res.data.data.filePath,
                            }]
                        };
                        that.tbDataRelatedOrigin = [...res.data.data.systemDocumentList];
                        that.tbDataFormsOrigin = [...res.data.data.customFormList];
                        // console.log(that.form);
                        this.getTableDataRelated();
                        this.getTableDataForms();
                    }
                });
            },
            getTableDataRelated: function(page = 1, pageSize = 5) {
                let that = this;

                that.tbDataRelated.total = that.tbDataRelatedOrigin.length;
                that.tbDataRelated.records = [];

                let limit = page > 1
                    ? [(page - 1) * pageSize, page * pageSize]
                    : [0, pageSize];
                that.tbDataRelatedOrigin.map((v, k) => {
                    if(k >= limit[0] && k < limit[1]) {
                        that.tbDataRelated.records.push(v);
                    }
                });
            },
            handlePaginationChangeTableRelated: function(page) {
                this.getTableDataRelated(page);
            },
            getTableDataForms: function(page = 1, pageSize = 5) {
                let that = this;
                // console.log(that.form.id);

                that.tbDataForms.total = that.tbDataFormsOrigin.length;
                that.tbDataForms.records = [];

                let limit = page > 1
                    ? [(page - 1) * pageSize, page * pageSize]
                    : [0, pageSize];
                that.tbDataFormsOrigin.map((v, k) => {
                    if(k >= limit[0] && k < limit[1]) {
                        that.tbDataForms.records.push(v);
                    }
                });
            },
            handlePaginationChangeTableForms: function(page) {
                this.getTableDataForms(page);
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
                    // console.log(res);
                    if(res.data.status === 200) {
                        if(refIsArray) {
                            that.form[ref].push({
                                name: file.raw.name,
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
            previewFileByOpenNewBlank: function(ref, refIsArray = false, index = 0) {
                let that = this;
                let path = refIsArray
                    ? that.man.fast.getResourcePath(that.form[ref][index].fileUrl)
                    : that.man.fast.getResourcePath(that.form[ref]);
                window.open(path, 'blank');
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
            chooseRelatedFiles: function() {
                let that = this;

                let folderTitle =  JSON.parse(that.$route.query.folderTitle);
                that.dlParams = {
                    detail: {...that.form,},
                    folderId: folderTitle.id,
                };
                that.dlTableRelatedVisible = true;
            },
            changeTableDataRelatedFiles: function(data) {
                let that = this;

                that.tbDataRelatedOrigin = [...data];
                that.form.linkedDocumentIds = [];
                data.map(v => {
                    that.form.linkedDocumentIds.push(v.id);
                });
                that.getTableDataRelated();
            },
            removeRelatedFiles: function(row) {
                let that = this;

                that.tbDataRelatedOrigin.map((v, k) => {
                    if(v.id === row.id) {
                        that.tbDataRelatedOrigin.splice(k, 1);
                    }
                });
                that.getTableDataRelated();
            },
            chooseForms: function() {
                let that = this;

                let folderTitle =  JSON.parse(that.$route.query.folderTitle);
                that.dlParams = {
                    detail: {
                        id: that.form.id,
                        documentNo: that.form.documentNo,
                        name: that.form.name,
                        version: that.form.version,
                        filePath: that.form.files[0].fileUrl,
                        status: that.form.status,
                        documentType: that.form.documentType,
                        linkedDocumentIds: that.form.linkedDocumentIds,
                        linkedTableIds: that.form.linkedTableIds,
                        isMainVersion: that.form.isMainVersion,
                    },
                    folderId: folderTitle.id,
                };
                that.dlTableFormsVisible = true;
            },
            changeTableDataForms: function(data) {
                let that = this;

                that.tbDataFormsOrigin = [...data];
                that.form.linkedTableIds = [];
                data.map(v => {
                    that.form.linkedTableIds.push(v.id);
                });
                that.getTableDataForms();
            },
            removeForms: function(row) {
                let that = this;

                that.tbDataFormsOrigin.map((v, k) => {
                    if(v.id === row.id) {
                        that.tbDataFormsOrigin.splice(k, 1);
                    }
                });
                that.getTableDataForms();
            },
            save: function() {
                let that = this;

                that.$refs.fm.validate(valid => {
                    if(valid) {
                        that.btnLoadingSave = true;

                        // 重计
                        that.form.linkedDocumentIds = [];
                        that.tbDataRelatedOrigin.map(v => {
                            that.form.linkedDocumentIds.push(v.id);
                        });
                        that.form.linkedTableIds = [];
                        that.tbDataFormsOrigin.map(v => {
                            that.form.linkedTableIds.push(v.id);
                        });

                        if(!!Number(that.$route.query.id)) {
                            api.systemDocumentUpdate({
                                id: that.form.id,
                                documentNo: that.form.documentNo,
                                name: that.form.name,
                                version: that.form.version,
                                filePath: that.form.files[0].fileUrl,
                                status: that.form.status,
                                documentType: that.form.documentType,
                                linkedDocumentIds: that.form.linkedDocumentIds,
                                linkedTableIds: that.form.linkedTableIds,
                            }).then((res) => {
                                // console.log(res);
                                that.btnLoadingSave = false;

                                if(res.data.status === 200) {
                                    that.dialogVisible = false;
                                    that.$message.success('操作成功');
                                    that.$router.push({name: listRouteName, params: {_lpq: JSON.parse(that.$route.query._lpq)}});
                                }
                            });
                        } else {
                            let folderDetail = JSON.parse(that.$route.query.folderTitle);

                            api.systemDocumentSave({
                                documentNo: that.form.documentNo,
                                name: that.form.name,
                                version: that.form.version,
                                filePath: that.form.files[0].fileUrl,
                                status: that.form.status,
                                documentType: folderDetail.id,
                                linkedDocumentIds: that.form.linkedDocumentIds,
                                linkedTableIds: that.form.linkedTableIds,
                            }).then((res) => {
                                // console.log(res);
                                that.btnLoadingSave = false;

                                if(res.data.status === 200) {
                                    that.dialogVisible = false;
                                    that.$message.success('操作成功');
                                    that.$router.push({name: listRouteName, params: {_lpq: JSON.parse(that.$route.query._lpq)}});
                                }
                            });
                        }
                    } else {return false;}
                });
            },

            cancel: function() {
                let that = this;

                that.$confirm('是否返回列表', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '返回列表',
                    cancelButtonText: '取消'
                }).then(() => {
                    console.log(that.$route.query._lpq);
                    that.$router.push({path: listRoutePath, query: {_lpq: JSON.parse(that.$route.query._lpq)}});
                }).catch();
            },
        }
    }

</script>

<style lang="scss" scoped>

    ._root_page {

        .block {
            .title {
                font-size: 15px;
                font-weight: 600;
                line-height: 60px;
                margin-top: -10px;

                .btn {width: max-content; height: 29px; }
            }
            .title.lh-30 {line-height: 40px; margin-top: unset;}
        }

        .hr {
            margin: 0 -20px;
            border: 1px solid $color-main-light;
        }


        .mg-l-3 {margin-left: 3px;}
        .mg-t-3 {margin-top: 3px;}

        .files-item {}
        .files-item-del {
            width: max-content;
            height: 28px;
            margin-left: 3px !important;
        }


        ::v-deep {
            .el-table tr th {
                background: #FAFAFA;
                padding: 15px 0;
                font-size: 14px;
            }
        }
    }


    /* 移动端适配 */
    @media screen and (max-width: 750px) {
        ._root_page {
            .fm-max-w {max-width: calc(100vw - 150px);}

            .block {
                .title {
                    font-size: 28px;
                    line-height: 100px;

                    .btn {
                        width: 120px;
                        height: 60px;
                        font-size: 22px;
                        border-radius: 8px;
                    }
                }
            }

            .btn {width: max-content; height: 60px;}
        }
    }

</style>