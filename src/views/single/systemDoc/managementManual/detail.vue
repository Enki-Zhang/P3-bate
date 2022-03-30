<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <!-- 移动端操作按钮 -->
                <!--<el-row class="block mg-t-20 mg-b-25">
                    <el-button type="primary" icon="el-icon-plus" size="mini" class="btn">版本</el-button>
                    <el-button type="primary" icon="el-icon-plus" size="mini" class="btn">发布</el-button>
                    <el-button type="primary" icon="el-icon-plus" size="mini" class="btn">撤下</el-button>
                    <el-button type="primary" icon="el-icon-plus" size="mini" class="btn">编辑</el-button>
                    <el-button type="primary" icon="el-icon-plus" size="mini" class="btn">删除</el-button>
                </el-row>
                <el-row class="hr"></el-row>-->
                <!-- 详情 -->
                <el-row class="block mg-b-10">
                    <!--<el-row class="title lh-30 pd-b-10">-->
                    <el-row class="title pd-b-10">
                        <span>详情</span>
                    </el-row>
                    <el-row type="flex" justify="space-between" align="middle" class="preview-info">
                        <el-row>文件名称：<span class="status-blue">{{ detail.name }}</span></el-row>
                        <el-row>文件编号：<span class="status-blue">{{ detail.documentNo }}</span></el-row>
                        <el-row>第 <span class="status-blue">{{ detail.version }}</span> 版 <span class="status-blue">{{ detail.updateCount }}</span> 次修订</el-row>
                    </el-row>
                    <iframe v-if="previewSrc"
                            id="iframename" name="iframename"
                            :src="`http://ow365.cn/?i=25516&ssl=0&furl=${previewSrc}`"
                            width="100%" height="500"
                            frameborder="0" scrolling="auto"
                            class="mg-tb-10">
                    </iframe>
                    <el-row v-else type="flex" justify="center">
                        <span class="status-red txt-i unable-select" style="line-height: 150px;">无相关文档文件，无法预览</span>
                    </el-row>
                </el-row>
                <el-row class="hr"></el-row>
                <!-- 相关文件列表 -->
                <el-row class="block mg-t-10 mg-b-20">
                    <el-row type="flex" justify="space-between" align="middle" class="title">
                        <span>相关文件</span>
<!--                        <el-button type="primary" icon="el-icon-plus" size="mini" @click="chooseRelatedFiles" class="btn">选择添加</el-button>-->
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
                                    <el-link type="primary" :underline="false" @click="lookDetail(scope.row)" class="fs-12">查看</el-link>
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
<!--                        <el-button type="primary" icon="el-icon-plus" size="mini" @click="chooseForms" class="btn">选择添加</el-button>-->
                    </el-row>
                    <!-- 列表 -->
                    <el-table ref="multipleTable" :data="tbDataForms.records"
                              :min-height="460" size="small" tooltip-effect="dark"
                              :show-header="true" highlight-current-row>
                        <el-table-column label="编号" fixed="left" show-overflow-tooltip min-width="60">
                            <template slot-scope="scope">{{ scope.row.formNumber }}</template>
                        </el-table-column>
                        <!-- <el-table-column label="表单key" fixed="left" show-overflow-tooltip min-width="220">
                            <template slot-scope="scope">{{ scope.row.formKey }}</template>
                        </el-table-column> -->
                        <el-table-column label="表单名称" fixed="left" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.formName }}</template>
                        </el-table-column>
                        <el-table-column label="表单描述" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.description }}</template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" show-overflow-tooltip width="80">
                            <template slot-scope="scope">
                                <el-row type="flex">
                                    <el-link v-if="!!!scope.row.isApply" type="primary" :underline="false" @click="showApplyForm(scope.row)" class="fs-12">申请</el-link>
                                    <el-link v-else type="success" :underline="false" disabled class="fs-12">已申请</el-link>
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
<!--                        <el-button type="primary" size="small" icon="el-icon-finished" :loading="btnLoadingSave" @click="save" class="btn">保存修改</el-button>-->
                    </el-row>
                </el-row>
            </el-row>
        </el-row>

        <!-- 组件：相关文件选择 -->
        <dl-table-related v-model="dlTableRelatedVisible" :params="dlParams" @reloadTableData="getTableDataRelated()"></dl-table-related>
        <!-- 组件：相关记录选择 -->
        <dl-table-forms v-model="dlTableFormsVisible" :params="dlParams" @reloadTableData="getTableDataForms()"></dl-table-forms>
        <!-- 组件：自定义表单填写 -->
        <form-preview ref="formPreview" @success="applyForm"></form-preview>
    </el-row>

</template>

<script>

    import {mapState} from 'vuex';
    import dayjs from 'dayjs';
    import api from "@api";
    // let mammoth = require("mammoth");
    const listRoutePath = '/system-doc/management-manual';
    import dlTableRelated from "@views/single/systemDoc/managementManual/dlTableRelated";
    import dlTableForms from "@views/single/systemDoc/managementManual/dlTableForms";
    import formPreview from "@components/formPreview";

    export default {
        name: "detail",
        components: {
            dlTableRelated,
            dlTableForms,
            formPreview,
        },
        data() {
            return {
                dayjs,

                dlParams: {},
                dlTableRelatedVisible: false,
                dlTableFormsVisible: false,

                wordText: '',
                // previewSrc: 'https://public.ohyesido.cn/test.docx',
                previewSrc: '',

                detail: {},
                tbDataRelated: {list: []},
                tbDataForms: {list: []},
                applyFormItem: {},
            }
        },
        beforeCreate() {
            // 更改当前路由面包屑 title
            if(this.$route.query.folderTitle !== undefined) this.man.bus.$emit('changeCurrentRouteVirtualParentMetaTitle', JSON.parse(this.$route.query.folderTitle));
        },
        created() {
            if(this.$route.query.id > 0) this.getDetail();
        },
        computed: {
            ...mapState(['userInfo']),
        },
        methods: {
            getDetail: function() {
                let that = this;

                api.systemDocumentFindById(that.$route.query.id).then((res) => {
                    if(res.data.status === 200) {
                        that.detail = {
                            ...res.data.data,
                        };
                        that.previewSrc = !!res.data.data.filePath ? res.data.data.filePath : false;
                        if(that.previewSrc !== false) that.previewSrc = that.mergePath(that.previewSrc);
                        // console.log(that.previewSrc);
                        this.getTableDataRelated();
                        this.getTableDataForms();
                    }
                });
            },
            getTableDataRelated: function(page = 1, pageSize = 5) {
                let that = this;

                let params = {
                    systemDocumentId: that.detail.id,
                    pageCurrent: page,
                    pageSize,
                };
                api.systemDocumentPageDocumentById(params).then((res) => {
                    if(res.data.status === 200) {
                        that.tbDataRelated = {...res.data.data};
                    }
                });
            },
            handlePaginationChangeTableRelated: function(page) {
                this.getTableDataRelated(page);
            },
            getTableDataForms: function(page = 1, pageSize = 5) {
                let that = this;
                // console.log(that.form.id);

                let params = {
                    documentId: that.detail.id,
                    pageCurrent: page,
                    pageSize,
                };
                api.customFormListByDocumentId(params).then((res) => {
                    if(res.data.status === 200) {
                        that.tbDataForms = {...res.data.data};
                    }
                });
            },
            handlePaginationChangeTableForms: function(page) {
                this.getTableDataForms(page);
            },
            lookDetail: function(row) {
                let that = this;
                if(!that.man.fast.inArray('system-doc:management-manual:detail:detail', that.userInfo.permissions)) {
                    that.$message.warning('您无权限进行此操作');
                    return;
                }

                that.$router.push({
                    path: `/system-doc/management-manual/detail`,
                    query: {
                        _lpq: JSON.stringify(that.tbDataFilter),
                        folderTitle: that.$route.query.folderTitle,
                        id: row.id,
                    }
                });
            },
            showApplyForm: function(row) {
                let that = this;
                if(!that.man.fast.inArray('system-doc:management-manual:detail:apply', that.userInfo.permissions)) {
                    that.$message.warning('您无权限进行此操作');
                    return;
                }
                // console.log(row);
                that.applyFormItem = {...row};

                that.$refs.formPreview.showFn(row.keyInfo);
            },
            applyForm: function(formInfo) {
                let that = this;
                // console.log(formInfo);

                api.customFormInfoSave({
                    documentId: that.detail.id,
                    formId: that.applyFormItem.id,
                    formInfo: formInfo,
                    // uuid: that.man.fast.getUUID(),
                }).then((res) => {
                    if(res.data.status === 200) {
                        that.$message.success('操作成功');
                    }
                });
            },

            mergePath: function(path) {
                let domainAndHost = '';
                switch (process.env.NODE_ENV) {
                    case 'development':
                        domainAndHost = process.env.VUE_APP_RESOURCE_HOST;
                        break;
                    case 'production':
                        domainAndHost = `${window.location.origin}/api/`;
                        break;
                }
                return `${domainAndHost}backServer/resources/${path}`;
            },
            cancel: function() {
                let that = this;

                that.$confirm('是否返回列表', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '返回列表',
                    cancelButtonText: '取消'
                }).then(() => {
                    that.$router.push({path: listRoutePath, query: {folderTitle: that.$route.query.folderTitle}});
                }).catch();
            },



            // 插件方式 - 该方法暂时遗弃
            convertWordToText: function(wordURL) {
                const xhr = new XMLHttpRequest();
                xhr.open("get", wordURL, true);
                xhr.responseType = "arraybuffer";
                xhr.onload = () => {
                    if (xhr.status == 200) {
                        mammoth.convertToHtml({
                            arrayBuffer: new Uint8Array(xhr.response)
                        }).then((resultObject) => {
                            this.$nextTick(() => {
                                this.wordText = resultObject.value;
                            });
                        });
                    }
                };
                xhr.send();
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

                .btn {width: max-content; height: 29px;}
            }
            .title.lh-30 {line-height: 40px; margin-top: unset;}
        }
        .btn {width: max-content;}

        .hr {
            margin: 0 -20px;
            border: 1px solid $color-main-light;
        }

        .preview-info {

        }
        .elsb-preview {
            background-color: #FCFBFC;
            height: 500px;
            margin-top: 10px;
            .preview {
                background-color: #FFFFFF;
                width: 96%;
                /*height: 500px;*/
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #FFFFFF;
                box-shadow: 0px 10px 20px rgba(216, 230, 240, 0.8);
            }
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

            .btn {
                width: max-content;
                height: 60px;
                font-size: 22px;
                border-radius: 8px;
            }

            .preview-info {
                font-size: 22px;
                flex-direction: column;
                flex-wrap: wrap;
            }
        }
    }

</style>