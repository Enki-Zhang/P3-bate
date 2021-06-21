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
                        <el-row>文件名称：<span class="status-blue">实验活动管理程序</span></el-row>
                        <el-row>文件编号：<span class="status-blue">BPD01-01</span></el-row>
                        <el-row>第 <span class="status-blue">1</span> 版 <span class="status-blue">0</span> 次修订</el-row>
                    </el-row>
                    <!-- mammoth 插件方式 -->
                    <!--<el-scrollbar class="elsb-preview">
                        <el-row class="preview">
                            <div id="wordView" v-html="wordText" />
                        </el-row>
                    </el-scrollbar>-->
                    <!-- 微软方式 -->
                    <iframe id="iframename" name="iframename"
                            :src="`https://view.officeapps.live.com/op/embed.aspx?src=${previewSrc}`"
                            width="100%" height="500"
                            frameborder="0" scrolling="auto"
                            class="mg-tb-10">
                    </iframe>
                </el-row>
                <el-row class="hr"></el-row>
                <!-- 相关文件列表 -->
                <el-row class="block mg-t-10 mg-b-20">
                    <el-row type="flex" justify="space-between" align="middle" class="title">
                        <span>相关文件</span>
                        <el-button type="primary" icon="el-icon-plus" size="mini" class="btn">新增</el-button>
                    </el-row>
                    <!-- 列表 -->
                    <el-table ref="multipleTable" :data="tbData.list" tooltip-effect="dark"
                              :min-height="460" size="small"
                              highlight-current-row>
                        <el-table-column label="版本" show-overflow-tooltip min-width="60">
                            <template slot-scope="scope">{{ scope.row.version }}</template>
                        </el-table-column>
                        <el-table-column label="程序文件名称" show-overflow-tooltip min-width="220">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="文件编号" fixed="left" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.id }}</template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" show-overflow-tooltip width="80">
                            <template slot-scope="scope">
                                <el-row type="flex">
                                    <el-link type="primary" :underline="false" @click="remove(scope.row)" class="fs-12">删除</el-link>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <el-row v-if="tbData.total" class="mg-t-20 mg-b-10 txt-c">
                        <el-pagination :total="tbData.total" :current-page="tbData.current" :page-size="5"
                                       layout="total, prev, pager, next, jumper"
                                       @current-change="handlePaginationChange"
                                       background>
                        </el-pagination>
                    </el-row>
                </el-row>
                <el-row class="hr"></el-row>
                <!-- 记录 -->
                <el-row class="block mg-t-10 mg-b-20">
                    <el-row type="flex" justify="space-between" align="middle" class="title">
                        <span>记录</span>
                        <el-button type="primary" icon="el-icon-plus" size="mini" class="btn">新增</el-button>
                    </el-row>
                    <!-- 列表 -->
                    <el-table ref="multipleTable" :data="tbData.list" tooltip-effect="dark"
                              :min-height="460" size="small"
                              highlight-current-row>
                        <el-table-column label="版本" show-overflow-tooltip min-width="60">
                            <template slot-scope="scope">{{ scope.row.version }}</template>
                        </el-table-column>
                        <el-table-column label="程序文件名称" show-overflow-tooltip min-width="220">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="文件编号" fixed="left" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.id }}</template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" show-overflow-tooltip width="80">
                            <template slot-scope="scope">
                                <el-row type="flex">
                                    <el-link type="primary" :underline="false" @click="remove(scope.row)" class="fs-12">删除</el-link>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <el-row v-if="tbData.total" class="mg-t-20 mg-b-10 txt-c">
                        <el-pagination :total="tbData.total" :current-page="tbData.current" :page-size="5"
                                       layout="total, prev, pager, next, jumper"
                                       @current-change="handlePaginationChange"
                                       background>
                        </el-pagination>
                    </el-row>
                </el-row>
                <el-row class="hr"></el-row>
                <el-row class="mg-t-25 mg-b-10">
                    <el-row type="flex" justify="center" align="middle">
                        <el-button type="default" size="small" icon="el-icon-refresh-left" @click="cancel" class="btn">返回页面</el-button>
                        <el-button type="primary" size="small" icon="el-icon-finished" :loading="btnLoadingSave" @click="save" class="btn">保存修改</el-button>
                    </el-row>
                </el-row>
            </el-row>
        </el-row>
    </el-row>

</template>

<script>

    import dayjs from 'dayjs';
    import jsonTableData from '@mock/systemDocManagementManual.json';
    let mammoth = require("mammoth");

    export default {
        name: "detail",
        data() {
            return {
                dayjs,

                wordText: '',
                previewSrc: 'public.ohyesido.cn/test.docx',

                tbSelectedArr: [],
                tbFilter: {
                    name: '',
                    createTime: [],
                },
                tbData: {list: []},
                tbDataFilter: {...this.tbFilter},
                btnLoadingFilter: false,

                btnLoadingSave: false,

            }
        },
        created() {
            // this.convertWordToText('/BPD01-01 生物安全管理活动程序.docx');
        },
        mounted() {
            this.tbFilter = this.$route.params._lpq !== undefined ? {
                createTime: (this.$route.params._lpq.startDate && this.$route.params._lpq.endDate)
                    ? [this.$route.params._lpq.startDate, this.$route.params._lpq.endDate]
                    : [],
                ...this.$route.params._lpq
            } : this.tbFilter;
            this.tbDataFilter = {...this.tbFilter};
            delete this.tbDataFilter.createTime;
            this.getTableData();
        },
        methods: {
            save: function() {

            },

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
            getTableData: function(page = 1, pageSize = 5) {
                let that = this;
                that.tbData.total = jsonTableData.length;
                that.tbData.list = [];

                let limit = page > 1
                    ? [(page - 1) * pageSize, page * pageSize]
                    : [0, pageSize];
                jsonTableData.map((v, k) => {
                    if(k >= limit[0] && k < limit[1]) {
                        that.tbData.list.push(v);
                    }
                });
            },
            handlePaginationChange: function(page) {
                this.getTableData(page);
            },
            filterTableData: function(isFilter = true) {
                let that = this;

                if(isFilter) {
                    that.tbDataFilter = {
                        ...that.tbFilter,
                        startDate: that.tbFilter.createTime && that.tbFilter.createTime.length > 0 ? `${that.tbFilter.createTime[0]} 00:00:00` : '',
                        endDate: that.tbFilter.createTime && that.tbFilter.createTime.length > 0 ? `${that.tbFilter.createTime[1]} 23:59:59` : '',
                    };
                    delete that.tbDataFilter.createTime;
                } else {
                    that.tbDataFilter = {};
                }

                that.getTableData(1);
            },


            cancel: function() {
                this.$router.push({name: 'system-doc|management-manual'});
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