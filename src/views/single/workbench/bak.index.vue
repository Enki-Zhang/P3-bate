<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row :gutter="15" class="statistics">
                <el-col :span="6">
                    <el-row class="block">
                        <el-row class="title">我的待办</el-row>
                        <el-row class="hr mg-tb-10"></el-row>
                        <el-row type="flex" justify="center" align="middle" class="bg-count-up">
                            <i-count-up :delay="countUpOpt.delay"
                                        :endVal="cuoTotalPending"
                                        :options="countUpOpt"
                                        class="count-up bule">
                            </i-count-up>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row class="block">
                        <el-row class="title green">审批历史记录</el-row>
                        <el-row class="hr mg-tb-10"></el-row>
                        <el-row type="flex" justify="center" align="middle" class="bg-count-up">
                            <i-count-up :delay="countUpOpt.delay"
                                        :endVal="cuoTotalApproval"
                                        :options="countUpOpt"
                                        class="count-up green">
                            </i-count-up>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row class="block">
                        <el-row class="title yellow">更新信息</el-row>
                        <el-row class="hr mg-tb-10"></el-row>
                        <el-row type="flex" justify="center" align="middle" class="bg-count-up">
                            <i-count-up :delay="countUpOpt.delay"
                                        :endVal="cuoTotalUpdate"
                                        :options="countUpOpt"
                                        class="count-up yellow">
                            </i-count-up>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row class="block">
                        <el-row class="title red">办理中</el-row>
                        <el-row class="hr mg-tb-10"></el-row>
                        <el-row type="flex" justify="center" align="middle" class="bg-count-up">
                            <i-count-up :delay="countUpOpt.delay"
                                        :endVal="cuoTotalProcessing"
                                        :options="countUpOpt"
                                        class="count-up red">
                            </i-count-up>
                        </el-row>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="12">
                    <el-row class="table-has-title mg-t-15">
                        <el-row type="flex" justify="space-between" class="title">
                            <span>待办列表（5）</span>
                            <span class="more">更多</span>
                        </el-row>
                        <el-row class="hr mg-tb-10"></el-row>
                        <el-row class="">
                            <el-table :data="tbDataPending.list" size="small"
                                      :show-header="false" border>
                                <el-table-column prop="title"></el-table-column>
                                <el-table-column prop="createTime"></el-table-column>
                            </el-table>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row class="table-has-title mg-t-15">
                        <el-row type="flex" justify="space-between" class="title yellow">
                            <span>更新信息（5）</span>
                            <span class="more">更多</span>
                        </el-row>
                        <el-row class="hr mg-tb-10"></el-row>
                        <el-row class="">
                            <el-table :data="tbDataPending.list" size="small"
                                      :show-header="false" border>
                                <el-table-column prop="title"></el-table-column>
                                <el-table-column prop="createTime"></el-table-column>
                            </el-table>
                        </el-row>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="table-has-title mg-t-15">
                <el-row type="flex" justify="space-between" class="title green">
                    <span>审批历史记录（5）</span>
                    <span class="more">更多</span>
                </el-row>
                <el-row class="hr mg-tb-10"></el-row>
                <el-row class="">
                    <el-table :data="tbDataPending.list" size="small"
                              :show-header="false" border>
                        <el-table-column prop="title"></el-table-column>
                        <el-table-column prop="title"></el-table-column>
                        <el-table-column prop="title"></el-table-column>
                        <el-table-column prop="createTime"></el-table-column>
                    </el-table>
                </el-row>
            </el-row>
            <el-row class="table-has-title mg-t-15">
                <el-row type="flex" justify="space-between" class="title red">
                    <span>办理中（5）</span>
                    <span class="more">更多</span>
                </el-row>
                <el-row class="hr mg-tb-10"></el-row>
                <el-row class="">
                    <el-table :data="tbDataPending.list" size="small"
                              :show-header="false" border>
                        <el-table-column prop="title"></el-table-column>
                        <el-table-column prop="createTime"></el-table-column>
                    </el-table>
                </el-row>
            </el-row>
        </el-row>
    </el-row>

</template>

<script>

    import ICountUp from 'vue-countup-v2';

    export default {
        name: "index",
        components: {
            ICountUp,
        },
        data() {
            return {
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

                tbDataPending: {
                    list: [
                        {title: '***发起***申请', createTime: '2020年8月8日 18:8:8'},
                        {title: '***发起***申请', createTime: '2020年8月8日 18:8:8'},
                        {title: '***发起***申请', createTime: '2020年8月8日 18:8:8'},
                    ]
                },
            }
        },
        created() {},
        methods: {

        }
    }

</script>

<style lang="scss" scoped>

    ._root_page {
        .statistics {
            .block {
                @include bgc-white-light;
                height: 120px;
                padding: 10px;

                .bg-count-up {
                    height: 55px;
                    .count-up {font-size: 3vw;}
                    .count-up.bule {color: $color-main;}
                    .count-up.green {color: #009688;}
                    .count-up.yellow {color: #e8b57b;}
                    .count-up.red {color: #f61010;}
                }
            }
        }

        .table-has-title {
            @include bgc-white-light;
            padding: 10px;
        }

        .title {
            padding-left: 8px;
            border-left: 5px solid $color-main;

            .more {
                color: $color-main;
                @include fs-13;
                align-self: flex-end;
            }
        }
        .title.green {border-left: 5px solid #009688;}
        .title.yellow {border-left: 5px solid #e8b57b;}
        .title.red {border-left: 5px solid #f61010;}
        .hr {border-bottom: 1px solid #EBEEF5;}
    }

</style>