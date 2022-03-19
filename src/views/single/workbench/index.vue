<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row :gutter="20" class="statistics">
                <el-col :span="8" :xs="24">
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
                <el-col :span="8" :xs="24">
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
                <el-col :span="8" :xs="24">
                    <el-row class="block">
                        <el-row type="flex" justify="space-between" class="title mg-tb-10">
                            <span>办理中</span>
                            <img src="../../../assets/image/workbench/blz.png" class="icon">
                        </el-row>
                        <el-row type="flex" justify="center" align="middle" class="bg-count-up">
                            <i-count-up :delay="countUpOpt.delay"
                                        :endVal="tbDataPending.total"
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
                <el-col :span="12" :xs="24">
                    <el-row class="table-has-title mg-t-20">
                        <el-row type="flex" justify="space-between" class="title">
                            <span>待我审批 (<span class="yellow">{{ tbDataPending.total }}</span>)</span>
                            <span @click="showDLTablePending" class="more">更多</span>
                        </el-row>
                        <el-row class="hr mg-tb-10 mg-lr--10"></el-row>
                        <el-row class="pd-lr-5">
                            <el-table :data="tbDataPending.list" size="small">
                                <el-table-column label="事项">
                                    <template slot-scope="scope">
                                        {{ scope.row.processDefinitionName }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="createTime" label="时间" sortable>
                                    <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD') : '' }}</template>
                                </el-table-column>
                                <el-table-column label="操作" width="80">
                                    <template slot-scope="scope">
                                        <el-link type="primary" :underline="false" @click.native="removeRow(scope.$index, scope.row)">审批</el-link>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="12" :xs="24">
                    <el-row class="table-has-title mg-t-20">
                        <el-row type="flex" justify="space-between" class="title">
                            <span>更新信息 (<span class="purple">{{ tbDataUpdating.records.length }}</span>)</span>
                            <span @click="showDLTableUpdating" class="more">更多</span>
                        </el-row>
                        <el-row class="hr mg-tb-10 mg-lr--10"></el-row>
                        <el-row class="pd-lr-5">
                            <el-table :data="tbDataUpdating.records" size="small"
                                      :show-header="true">
                                <el-table-column label="事项">
                                    <template slot-scope="scope">
                                        {{ `${scope.row.sponsorName} ${scope.row.matter}` }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="createTime" label="更新时间" sortable>
                                    <template slot-scope="scope">{{ scope.row.updateTime ? dayjs(scope.row.updateTime).format('YYYY-MM-DD') : '' }}</template>
                                </el-table-column>
                                <el-table-column label="操作" width="80">
                                    <template slot-scope="scope">
                                        <el-link type="primary" :underline="false" @click.native="removeRow(scope.$index, scope.row)">详情</el-link>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="table-has-title mg-t-20">
                <el-row type="flex" justify="space-between" class="title">
                    <span>办理中 (<span class="green">{{ tbDataProcessing.total }}</span>)</span>
                    <span @click="showDLTableProcessing" class="more">更多</span>
                </el-row>
                <el-row class="hr mg-tb-10 mg-lr--10"></el-row>
                <el-row class="pd-lr-5">
                    <el-table :data="tbDataProcessing.list" size="small">
                        <el-table-column label="事项">
                            <template slot-scope="scope">
                                {{ `${scope.row.processDefinitionName}` }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="申请/更新时间" sortable>
                            <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD') : '' }}</template>
                        </el-table-column>
                        <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <el-link type="primary" :underline="false" @click.native="removeRow(scope.$index, scope.row)">查看进度</el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-row>
            <el-row class="table-has-title mg-t-20">
                <el-row type="flex" justify="space-between" class="title">
                    <span>申请历史记录 (<span class="bule">{{ tbDataApply.total }}</span>)</span>
                    <span @click="showDLTableApply" class="more">更多</span>
                </el-row>
                <el-row class="hr mg-tb-10 mg-lr--10"></el-row>
                <el-row class="pd-lr-5">
                    <el-table :data="tbDataApply.records" size="small">
                        <el-table-column prop="sponsorName" label="发起人" width="100"></el-table-column>
                        <el-table-column prop="matter" label="事项"></el-table-column>
                        <el-table-column prop="createTime" label="申请时间" sortable>
                            <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD') : '' }}</template>
                        </el-table-column>
                        <el-table-column prop="status" label="审批结果">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status === 0" class="status-blue">待审批</span>
                                <span v-else-if="scope.row.status === 1" class="status-green">已通过</span>
                                <span v-else-if="scope.row.status === -1" class="status-red">未通过</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="approve" label="审批人">
                            <template slot-scope="scope">
                                <span v-for="(v, k) in scope.row.approve" :key="k">
                                    {{ v }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="approveTime" label="审批时间">
                            <template slot-scope="scope">{{ scope.row.approveTime ? dayjs(scope.row.approveTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</template>
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
    </el-row>

</template>

<script>

    import dayjs from 'dayjs';
    import ICountUp from 'vue-countup-v2';
    import api from '@api';

    import jsonTbDataPending from '@mock/tbDataPending.json';
    import jsonTbDataUpdating from '@mock/tbDataUpdating.json';
    import jsonTbDataProcessing from '@mock/tbDataProcessing.json';
    import jsonTbDataApply from '@mock/tbDataApply.json';

    import dlTablePending from "@views/single/workbench/dlTablePending";
    import dlTableUpdating from "@views/single/workbench/dlTableUpdating";
    import dlTableProcessing from "@views/single/workbench/dlTableProcessing";
    import dlTableApply from "@views/single/workbench/dlTableApply";

    export default {
        name: "index",
        components: {
            ICountUp,
            dlTablePending,
            dlTableUpdating,
            dlTableProcessing,
            dlTableApply,
        },
        data() {
            return {
                dayjs,

                dlParams: {},
                dlVisibleTablePending: false,
                dlVisibleTableUpdating: false,
                dlVisibleTableProcessing: false,
                dlVisibleTableApply: false,

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
                    page: 1,
                    pageSize,
                };

                api.camundaTaskWaitForMyAuditPage(params).then((res) => {
                    if(res.data.status === 200) {
                        that.tbDataPending = {...res.data.data};
                    }
                });
            },
            getTableDataUpdating: function(pageSize = 5) {
                let that = this;

                let params = {
                    page: 1,
                    pageSize,
                };

                jsonTbDataUpdating.filter(v => {
                    return v.updateTime > 0;
                }).sort((a, b) => {
                    return b.updateTime - a.updateTime;
                }).map(v => {
                    if(that.tbDataUpdating.records.length <= pageSize) {
                        that.tbDataUpdating.records.push(v);
                    }
                });
            },
            getTableDataProcessing: function(pageSize = 5) {
                let that = this;

                let params = {
                    page: 1,
                    pageSize,
                };

                api.camundaTaskStartedByMePage(params).then((res) => {
                    if(res.data.status === 200) {
                        that.tbDataProcessing = {...res.data.data};
                    }
                });
            },
            getTableDataApply: function(pageSize = 5) {
                let that = this;

                let params = {
                    page: 1,
                    pageSize,
                };

                api.camundaHistoryStartedByMePage(params).then((res) => {
                    if(res.data.status === 200) {
                        that.tbDataApply = {...res.data.data};
                    }
                });
            },

            showDLTablePending: function() {
                let that = this;

                that.dlParams = {
                    list: [...jsonTbDataPending],
                };
                that.dlVisibleTablePending = true;
            },
            showDLTableUpdating: function() {
                let that = this;

                that.dlParams = {
                    list: [...jsonTbDataUpdating],
                };
                that.dlVisibleTableUpdating = true;
            },
            showDLTableProcessing: function() {
                let that = this;

                that.dlParams = {
                    list: [...jsonTbDataProcessing],
                };
                that.dlVisibleTableProcessing = true;
            },
            showDLTableApply: function() {
                let that = this;

                that.dlParams = {
                    list: [...jsonTbDataApply],
                };
                that.dlVisibleTableApply = true;
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
    @media screen and (max-width: 750px) {
        ._root_page {
            .statistics {
                .el-col-8:not(:first-child) {
                    margin-top: 15px;
                }

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

                    .icon {width: 60px; margin-top: -5px; margin-right: 10px;}

                    .bg-count-up {
                        height: 100px;
                        .count-up {font-size: 80px;}
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