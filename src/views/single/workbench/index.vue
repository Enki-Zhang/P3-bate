<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row :gutter="20" class="statistics">
                <el-col :span="8" :xs="8">
                    <el-row class="block">
                        <el-row type="flex" justify="space-between" class="title mg-tb-10">
                            <span>待我审批</span>
                            <img src="../../../assets/image/workbench/wddb.png" class="icon">
                        </el-row>
                        <el-row type="flex" justify="center" align="middle" class="bg-count-up">
                            <i-count-up :delay="countUpOpt.delay"
                                        :endVal="tbDataPending.total"
                                        :options="countUpOpt"
                                        class="count-up yellow">
                            </i-count-up>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="8" :xs="8">
                    <el-row class="block">
                        <el-row type="flex" justify="space-between" class="title mg-tb-10">
                            <span>更新信息</span>
                            <img src="../../../assets/image/workbench/gxxx.png" class="icon">
                        </el-row>
                        <el-row type="flex" justify="center" align="middle" class="bg-count-up">
                            <i-count-up :delay="countUpOpt.delay"
                                        :endVal="tbDataUpdating.total"
                                        :options="countUpOpt"
                                        class="count-up purple">
                            </i-count-up>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="8" :xs="8">
                    <el-row class="block">
                        <el-row type="flex" justify="space-between" class="title mg-tb-10">
                            <span>办理中</span>
                            <img src="../../../assets/image/workbench/blz.png" class="icon">
                        </el-row>
                        <el-row type="flex" justify="center" align="middle" class="bg-count-up">
                            <i-count-up :delay="countUpOpt.delay"
                                        :endVal="tbDataProcessing.total"
                                        :options="countUpOpt"
                                        class="count-up green">
                            </i-count-up>
                        </el-row>
                    </el-row>
                </el-col>
                <!--<el-col :span="6">
                    <el-row class="block">
                        <el-row type="flex" justify="space-between" class="title mg-tb-10">
                            <span>申请历史记录</span>
                            <img src="../../../assets/image/workbench/splsjl.png" class="icon">
                        </el-row>
                        <el-row type="flex" justify="center" align="middle" class="bg-count-up">
                            <i-count-up :delay="countUpOpt.delay"
                                        :endVal="tbDataPending.list.length"
                                        :options="countUpOpt"
                                        class="count-up bule">
                            </i-count-up>
                        </el-row>
                    </el-row>
                </el-col>-->
            </el-row>
            <el-row :gutter="20">
                <!-- 待我审批 -->
                <el-col :span="12" :xs="24">
                    <el-row class="table-has-title mg-t-20">
                        <el-row type="flex" justify="space-between" class="title">
                            <span>待我审批 (<span class="yellow">{{ tbDataPending.total }}</span>)</span>
                            <span @click="showDLTablePending" class="more">更多</span>
                        </el-row>
                        <el-row class="hr mg-tb-10 mg-lr--10"></el-row>
                        <el-row class="pd-lr-5">
                            <el-table :data="tbDataPending.records" size="small">
                                <el-table-column label="事项">
                                    <template slot-scope="scope">
                                        {{ scope.row.formName }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="createTime" label="时间" sortable>
                                    <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD') : '' }}</template>
                                </el-table-column>
                                <el-table-column label="操作" width="80">
                                    <template slot-scope="scope">
                                        <el-link type="primary" :underline="false" @click.native="showDLApprovalProcess(scope.row)">审批</el-link>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-row>
                </el-col>
                <!-- 更新信息 -->
                <el-col :span="12" :xs="24">
                    <el-row class="table-has-title mg-t-20">
                        <el-row type="flex" justify="space-between" class="title">
                            <span>更新信息 (<span class="purple">{{ tbDataUpdating.total }}</span>)</span>
                            <span @click="showDLTableUpdating" class="more">更多</span>
                        </el-row>
                        <el-row class="hr mg-tb-10 mg-lr--10"></el-row>
                        <el-row class="pd-lr-5">
                            <el-table :data="tbDataUpdating.records" size="small"
                                      :show-header="true">
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        {{ `${scope.row.operation}${scope.row.type === 'CUSTOM_FORM' ? '表格' : '文件'} ${scope.row.name}` }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="createTime" label="更新时间" sortable>
                                    <template slot-scope="scope">{{ scope.row.operationDate ? dayjs(scope.row.operationDate).format('YYYY-MM-DD') : '' }}</template>
                                </el-table-column>
                                <el-table-column label="操作" width="80">
                                    <template slot-scope="scope">
                                        <el-link v-if="scope.row.operation !== '删除' && scope.row.operation !== '创建'"
                                                 type="primary" :underline="false"
                                                 @click.native="navUpdatingDetail(scope.row)">详情</el-link>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-row>
                </el-col>
            </el-row>
            <!-- 办理中 -->
            <el-row class="table-has-title mg-t-20">
                <el-row type="flex" justify="space-between" class="title">
                    <span>办理中 (<span class="green">{{ tbDataProcessing.total }}</span>)</span>
                    <span @click="showDLTableProcessing" class="more">更多</span>
                </el-row>
                <el-row class="hr mg-tb-10 mg-lr--10"></el-row>
                <el-row class="pd-lr-5">
                    <el-table :data="tbDataProcessing.records" size="small">
                        <el-table-column label="事项">
                            <template slot-scope="scope">
                                {{ `${scope.row.formName}` }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="申请/更新时间" sortable>
                            <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD') : '' }}</template>
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <el-row type="flex" justify="space-around">
                                    <el-link type="primary" :underline="false" @click.native="showDLViewProcess(scope.row)">查看进度</el-link>
                                    <el-link type="primary" :underline="false" @click.native="cancelProcess(scope.row)">删除</el-link>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-row>
            <!-- 申请历史记录 -->
            <el-row class="table-has-title mg-t-20">
                <el-row type="flex" justify="space-between" class="title">
                    <span>申请历史记录 (<span class="bule">{{ tbDataApply.total }}</span>)</span>
                    <span @click="showDLTableApply" class="more">更多</span>
                </el-row>
                <el-row class="hr mg-tb-10 mg-lr--10"></el-row>
                <el-row class="pd-lr-5">
                    <el-table :data="tbDataApply.records" size="small">
                        <el-table-column prop="createUserName" label="发起人" width="100"></el-table-column>
                        <el-table-column prop="formName" label="事项"></el-table-column>
                        <el-table-column prop="createTime" label="申请时间" sortable>
                            <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD') : '' }}</template>
                        </el-table-column>
                        <el-table-column prop="state" label="审批结果">
                            <template slot-scope="scope">
                                <span v-if="scope.row.state === 0" class="status-blue">待审批</span>
                                <span v-else-if="scope.row.state === 1" class="status-green">已通过</span>
                                <span v-else-if="scope.row.state === -1" class="status-red">未通过</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="auditUserName" label="审批人">
                            <template slot-scope="scope">
                                <span v-for="(v, k) in scope.row.approve" :key="k">
                                    {{ v }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="审批时间">
                            <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</template>
                        </el-table-column>
                        <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <el-row type="flex" justify="space-around">
                                    <el-link type="primary" :underline="false" @click.native="cancelProcess(scope.row, false)">删除</el-link>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-row>
        </el-row>

        <!-- 组件：待我审批 -->
        <dl-table-pending v-model="dlVisibleTablePending" :params="dlParams"></dl-table-pending>
        <!-- 组件：更新信息 -->
        <dl-table-updating v-model="dlVisibleTableUpdating" :params="dlParams"></dl-table-updating>
        <!-- 组件：办理中 -->
        <dl-table-processing v-model="dlVisibleTableProcessing" :params="dlParams"></dl-table-processing>
        <!-- 组件：申请历史记录 -->
        <dl-table-apply v-model="dlVisibleTableApply" :params="dlParams"></dl-table-apply>
        <!-- 组件：审批 -->
        <dl-approval-progress v-model="dlVisibleApprovalProcess" :params="dlParams" @done="getTableDataPending(5)"></dl-approval-progress>
        <!-- 组件：查看进度 -->
        <dl-view-progress v-model="dlVisibleViewProgress" :params="dlParams"></dl-view-progress>
    </el-row>

</template>

<script>

    import dayjs from 'dayjs';
    import ICountUp from 'vue-countup-v2';
    import api from '@api';

    import dlTablePending from "@views/single/workbench/dlTablePending";
    import dlTableUpdating from "@views/single/workbench/dlTableUpdating";
    import dlTableProcessing from "@views/single/workbench/dlTableProcessing";
    import dlTableApply from "@views/single/workbench/dlTableApply";
    import dlViewProgress from "@views/single/workbench/dlViewProgress";
    import dlApprovalProgress from "@views/single/workbench/dlApprovalProgress";

    export default {
        name: "index",
        components: {
            ICountUp,
            dlTablePending,
            dlTableUpdating,
            dlTableProcessing,
            dlTableApply,
            dlViewProgress,
            dlApprovalProgress,
        },
        data() {
            return {
                dayjs,

                countUpOpt: {
                    delay: 500,
                    startVal: 0,
                    useEasing: true,
                    useGrouping: true,
                    duration: 4,
                    decimalPlaces: 0,
                    separator: ',',
                    decimal: '.',
                    prefix: '',
                    suffix: ''
                },

                dlParams: {},
                dlVisibleTablePending: false,
                dlVisibleTableUpdating: false,
                dlVisibleTableProcessing: false,
                dlVisibleTableApply: false,
                dlVisibleViewProgress: false,
                dlVisibleApprovalProcess: false,

                tbDataPending: {records: [], total: 0,},
                tbDataUpdating: {records: [], total: 0,},
                tbDataProcessing: {records: [], total: 0,},
                tbDataApply: {records: [], total: 0,},
            }
        },
        created() {
            // console.log((new Date('2021-6-6 12:18:12')).getTime());

            this.getTableDataPending();
            this.getTableDataUpdating();
            this.getTableDataProcessing();
            this.getTableDataApply();
        },
        methods: {
            getTableDataPending: function(pageSize = 5) {
                let that = this;

                let params = {
                    pageCurrent: 1,
                    pageSize,
                };

                api.workbenchRunningWaitForMyAuditPage(params).then((res) => {
                    if(res.data.status === 200) {
                        that.tbDataPending = {...res.data.data};
                    }
                });
            },
            getTableDataUpdating: function(pageSize = 5) {
                let that = this;

                let params = {
                    pageCurrent: 1,
                    pageSize,
                };

                api.workbenchUpdateInfoPage(params).then((res) => {
                    if(res.data.status === 200) {
                        that.tbDataUpdating = {...res.data.data};
                    }
                });
            },
            getTableDataProcessing: function(pageSize = 5) {
                let that = this;

                let params = {
                    pageCurrent: 1,
                    pageSize,
                };

                api.workbenchRnningStartedByMePage(params).then((res) => {
                    if(res.data.status === 200) {
                        that.tbDataProcessing = {...res.data.data};
                    }
                });
            },
            getTableDataApply: function(pageSize = 5) {
                let that = this;

                let params = {
                    pageCurrent: 1,
                    pageSize,
                };

                api.workbenchHistoryStartedByMePage(params).then((res) => {
                    if(res.data.status === 200) {
                        that.tbDataApply = {...res.data.data};
                    }
                });
            },

            showDLTablePending: function() {
                let that = this;

                // that.dlParams = {
                //     // list: [...jsonTbDataPending],
                // };
                that.dlVisibleTablePending = true;
            },
            showDLTableUpdating: function() {
                let that = this;

                // that.dlParams = {
                //     list: [...jsonTbDataUpdating],
                // };
                that.dlVisibleTableUpdating = true;
            },
            showDLTableProcessing: function() {
                let that = this;

                // that.dlParams = {
                //     list: [...jsonTbDataProcessing],
                // };
                that.dlVisibleTableProcessing = true;
            },
            showDLTableApply: function() {
                let that = this;

                // that.dlParams = {
                //     list: [...jsonTbDataApply],
                // };
                that.dlVisibleTableApply = true;
            },

            navUpdatingDetail: function(row) {
                let that = this;
                // console.log(row);

                api.workbenchUpdateInfoFindById(row.id).then((res) => {
                    if(res.data.status === 200) {
                        switch (row.type) {
                            case 'CUSTOM_FORM':
                                that.$router.push({
                                    path: '/forms/forms-forms-edit',
                                    query: {
                                        id: row.operationId,
                                    }
                                });
                                break;
                            case 'SYSTEM_DOCUMENT':
                                that.$router.push({
                                    path: '/system-doc/management-manual/detail',
                                    query: {
                                        id: row.operationId,
                                    }
                                });
                                break;
                        }
                    }
                });
            },
            showDLApprovalProcess: function(row) {
                let that = this;
                // console.log(row);

                api.all([
                    api.workbenchGetDetail(row.processInstanceId),
                    api.camundaGetProcessInstanceState(row.processInstanceId),
                ]).then((res) => {
                    if(res[0].data.status === 200 && res[1].data.status === 200) {
                        that.dlParams = {
                            processInstanceId: row.processInstanceId,
                            formData: {...res[0].data.data},
                            processData: {...res[1].data.data},
                        };
                        that.dlVisibleApprovalProcess = true;
                    }
                });
            },
            showDLViewProcess: function(row) {
                let that = this;

                api.all([
                    api.workbenchGetDetail(row.processInstanceId),
                    api.camundaGetProcessInstanceState(row.processInstanceId),
                ]).then((res) => {
                    if(res[0].data.status === 200 && res[1].data.status === 200) {
                        that.dlParams = {
                            formData: {...res[0].data.data},
                            processData: {...res[1].data.data},
                        };
                        that.dlVisibleViewProgress = true;
                    }
                });
            },
            cancelProcess: function(row, isProcessing = true) {
                let that = this;
                // console.log(row);return;

                api.camundaCancel(row.processInstanceId).then((res) => {
                    if(res.data.status === 200) {
                        that.$message.success('操作成功');
                        if(isProcessing) that.getTableDataProcessing();
                        else that.getTableDataApply();
                    }
                });
            },

            removeRow: function(index, row) {
                console.log(row);
            },
        }
    }

</script>

<style lang="scss" scoped>

    ._root_page {
        .statistics {
            .block {
                @include bgc-white-light;
                height: 130px;
                padding: 10px;
                box-shadow: 0 10px 20px rgba(216, 230, 240, 0.43);
                border-radius: 10px;

                .title {
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 17px;
                    font-weight: 600;
                    padding-left: 8px;

                    .more {
                        color: $color-main;
                        @include fs-13;
                        align-self: flex-end;
                    }
                }
                .title.green {border-left: 5px solid #009688;}
                .title.yellow {border-left: 5px solid #e8b57b;}
                .title.red {border-left: 5px solid #f61010;}

                .icon {width: 30px; margin-top: -5px; margin-right: 10px;}

                .bg-count-up {
                    height: 60px;
                    .count-up {font-size: 40px;}
                    .count-up.bule {color: #4AA7FF;}
                    .count-up.green {color: #24C831;}
                    .count-up.yellow {color: #e8b57b;}
                    .count-up.purple {color: #765ED8;}
                }
            }
        }

        .table-has-title {
            @include bgc-white-light;
            padding: 10px;
            box-shadow: 0px 10px 20px rgba(216, 230, 240, 0.43);
            border-radius: 10px;

            .title {
                padding-left: 8px;
                color: #000000;
                font-size: 15px;
                font-weight: 600;
                line-height: 30px;

                .bule {color: #4AA7FF;}
                .green {color: #24C831;}
                .yellow {color: #e8b57b;}
                .purple {color: #765ED8;}

                .more {
                    color: #959595;
                    @include fs-13;
                    align-self: flex-end;
                    @include cursor-pointer;
                    @include unable-select;
                    transition: .6s;

                    &:hover {
                        transition: .6s;
                        color: #4AA7FF;
                    }
                }
            }

            ::v-deep {
                .el-table tr th {
                    background: #FAFAFA;
                    /*padding: 8px;*/
                    font-size: 14px;
                }
                .el-table::before {height: 0;}
                .el-table__empty-block {min-height: 41px;}
                .el-table__empty-text {line-height: 41px; margin-bottom: -10px;}
            }
        }

        .hr {border-bottom: 1px solid #EBEEF5;}
        .mg-lr--10 {margin-left: -10px; margin-right: -10px;}
    }


    /* 移动端适配 */
    @media screen and (max-width: 1200px) {
        ._root_page {
            .statistics {
                .block {
                    height: 220px;
                    padding: 20px;
                    border-radius: 20px;

                    .title {
                        font-size: 28px;
                        font-weight: 600;

                        .more {
                            font-size: 26px;
                        }
                    }

                    .icon {width: 50px; margin-top: -5px; margin-right: 10px;}

                    .bg-count-up {
                        height: 100px;
                        .count-up {font-size: 60px;}
                    }
                }
            }

            .table-has-title {
                padding: 18px;
                border-radius: 20px;

                .title {
                    font-size: 28px;
                    line-height: 60px;

                    .more {
                        font-size: 24px;
                    }
                }

                ::v-deep {
                    .el-table {
                        tr {
                            th {font-size: 26px; line-height: 60px;}
                            td .cell {
                                line-height: 40px;

                                .el-link--inner {font-size: 22px;}
                            }
                        }
                        .el-table__body-wrapper {font-size: 22px;}
                    }
                }
            }
        }
    }

    /* 移动端适配 */
    @media screen and (max-width: 420px) {
        ._root_page {
            .statistics {
                /*.el-col-8:not(:first-child) {margin-top: 15px;}*/

                .block {
                    width: 110px;
                    height: 120px;
                    padding: 2px;
                    border-radius: 20px;

                    .title {
                        font-size: 16px;
                        font-weight: 600;

                        .more {
                            font-size: 16px;
                        }
                    }

                    .icon {width: 20px; margin-top: 0; margin-right: 10px;}

                    .bg-count-up {
                        height: 50px;
                        .count-up {font-size: 30px;}
                    }
                }
            }

            .table-has-title {
                padding: 18px;
                border-radius: 20px;

                .title {
                    font-size: 28px;
                    line-height: 60px;

                    .more {
                        font-size: 24px;
                    }
                }

                ::v-deep {
                    .el-table {
                        tr {
                            th {font-size: 26px; line-height: 60px;}
                            td .cell {
                                line-height: 40px;

                                .el-link--inner {font-size: 22px;}
                            }
                        }
                        .el-table__body-wrapper {font-size: 22px;}
                    }
                }
            }
        }
    }

</style>