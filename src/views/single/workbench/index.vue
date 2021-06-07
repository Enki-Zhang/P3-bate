<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row :gutter="20" class="statistics">
                <el-col :span="6">
                    <el-row class="block">
                        <el-row type="flex" justify="space-between" class="title mg-tb-10">
                            <span>待我审批</span>
                            <img src="../../../assets/image/workbench/wddb.png" class="icon">
                        </el-row>
                        <el-row type="flex" justify="center" align="middle" class="bg-count-up">
                            <i-count-up :delay="countUpOpt.delay"
                                        :endVal="tbDataPending.list.length"
                                        :options="countUpOpt"
                                        class="count-up yellow">
                            </i-count-up>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row class="block">
                        <el-row type="flex" justify="space-between" class="title mg-tb-10">
                            <span>更新信息</span>
                            <img src="../../../assets/image/workbench/gxxx.png" class="icon">
                        </el-row>
                        <el-row type="flex" justify="center" align="middle" class="bg-count-up">
                            <i-count-up :delay="countUpOpt.delay"
                                        :endVal="tbDataPending.list.length"
                                        :options="countUpOpt"
                                        class="count-up purple">
                            </i-count-up>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row class="block">
                        <el-row type="flex" justify="space-between" class="title mg-tb-10">
                            <span>办理中</span>
                            <img src="../../../assets/image/workbench/blz.png" class="icon">
                        </el-row>
                        <el-row type="flex" justify="center" align="middle" class="bg-count-up">
                            <i-count-up :delay="countUpOpt.delay"
                                        :endVal="tbDataPending.list.length"
                                        :options="countUpOpt"
                                        class="count-up green">
                            </i-count-up>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row class="block">
                        <el-row type="flex" justify="space-between" class="title mg-tb-10">
                            <span>审批历史记录</span>
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
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-row class="table-has-title mg-t-20">
                        <el-row type="flex" justify="space-between" class="title">
                            <span>待我审批 (<span class="yellow">{{ tbDataPending.list.length }}</span>)</span>
                            <span @click="showDLTablePending" class="more">更多</span>
                        </el-row>
                        <el-row class="hr mg-tb-10 mg-lr--10"></el-row>
                        <el-row class="pd-lr-5">
                            <el-table :data="tbDataPending.list" size="small">
                                <el-table-column label="事项">
                                    <template slot-scope="scope">
                                        {{ `${scope.row.sponsorName} ${scope.row.matter}` }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="createTime" label="时间" sortable>
                                    <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</template>
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
                <el-col :span="12">
                    <el-row class="table-has-title mg-t-20">
                        <el-row type="flex" justify="space-between" class="title">
                            <span>更新信息 (<span class="purple">5</span>)</span>
                            <span class="more">更多</span>
                        </el-row>
                        <el-row class="hr mg-tb-10 mg-lr--10"></el-row>
                        <el-row class="pd-lr-5">
                            <el-table :data="tbDataPending.list" size="small"
                                      :show-header="true">
                                <el-table-column label="事项">
                                    <template slot-scope="scope">
                                        {{ `${scope.row.sponsorName} ${scope.row.matter}` }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="createTime" label="更新时间" sortable>
                                    <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</template>
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
                    <span>办理中 (<span class="green">5</span>)</span>
                    <span class="more">更多</span>
                </el-row>
                <el-row class="hr mg-tb-10 mg-lr--10"></el-row>
                <el-row class="pd-lr-5">
                    <el-table :data="tbDataPending.list" size="small">
                        <el-table-column label="事项">
                            <template slot-scope="scope">
                                {{ `${scope.row.sponsorName} ${scope.row.matter}` }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="申请/更新时间" sortable>
                            <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</template>
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
                    <span>申请历史记录 (<span class="bule">5</span>)</span>
                    <span class="more">更多</span>
                </el-row>
                <el-row class="hr mg-tb-10 mg-lr--10"></el-row>
                <el-row class="pd-lr-5">
                    <el-table :data="tbDataApply.list" size="small">
                        <el-table-column prop="sponsorName" label="发起人"></el-table-column>
                        <el-table-column prop="matter" label="事项"></el-table-column>
                        <el-table-column prop="createTime" label="申请时间" sortable>
                            <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</template>
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

        <!-- 组件：待我审批列表 -->
        <dl-table-pending v-model="dlVisibleTablePending" :params="dlParams"></dl-table-pending>
    </el-row>

</template>

<script>

    import dayjs from 'dayjs';
    import ICountUp from 'vue-countup-v2';

    import jsonApprove from '@mock/approve.json';
    import dlTablePending from "@views/single/workbench/dlTablePending";

    export default {
        name: "index",
        components: {
            ICountUp,
            dlTablePending,
        },
        data() {
            return {
                dayjs,

                dlParams: {},
                dlVisibleTablePending: false,

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
                cuoTotalPending: 8,
                cuoTotalApproval: 999,
                cuoTotalUpdate: 22,
                cuoTotalProcessing: 5,

                tbDataPending: {list: []},
                tbDataUpdating: {list: []},
                tbDataProcessing: {list: []},
                tbDataApply: {list: []},
            }
        },
        created() {
            // console.log((new Date('2021-6-4 10:08:12')).getTime());

            this.getTableDataPending();
            this.getTableDataApply();
        },
        methods: {
            getTableDataPending: function(pageSize = 5) {
                let that = this;

                jsonApprove.filter(v => {
                    return v.process === 1;
                }).sort((a, b) => {
                    return a.createTime - b.createTime;
                }).map(v => {
                    if(that.tbDataPending.list.length <= pageSize) {
                        that.tbDataPending.list.push(v);
                    }
                });
            },
            getTableDataApply: function(pageSize = 5) {
                let that = this;

                jsonApprove.filter(v => {
                    return v.sponsor === 1;
                }).sort((a, b) => {
                    return a.createTime - b.createTime;
                }).map(v => {
                    if(that.tbDataApply.list.length <= pageSize) {
                        that.tbDataApply.list.push(v);
                    }
                });
            },

            showDLTablePending: function() {
                let that = this;

                that.dlParams = jsonApprove;
                that.dlVisibleTablePending = true;
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
            }
        }

        .hr {border-bottom: 1px solid #EBEEF5;}
        .mg-lr--10 {margin-left: -10px; margin-right: -10px;}
    }

</style>