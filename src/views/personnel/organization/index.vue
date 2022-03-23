<template>

    <el-row class="wh-bf-100">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <!-- 筛选 -->
                <el-form ref="fmTbFilter" :model="tbFilter">
                    <el-row class="filters">
                        <el-form-item prop="title">
                            <el-row class="item">
                                <el-row class="lb lb-unmgl">角色名称</el-row>
                                <el-row><el-input v-model="tbFilter.title" placeholder="角色名称查询" size="small" class="inp"></el-input></el-row>
                            </el-row>
                        </el-form-item>
                        <!--<el-form-item prop="userName">
                            <el-row class="item">
                                <el-row class="lb">发布人</el-row>
                                <el-row><el-input v-model="tbFilter.userName" placeholder="发布人查询" size="small" class="inp"></el-input></el-row>
                            </el-row>
                        </el-form-item>-->
                        <!--<el-form-item prop="createTime">
                            <el-row class="item">
                                <el-row class="lb">发布时间</el-row>
                                <el-row>
                                    <el-date-picker v-model="tbFilter.createTime"
                                                    type="daterange" size="small"
                                                    start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"
                                                    format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                                    style="width: 230px !important;">
                                    </el-date-picker>
                                </el-row>
                            </el-row>
                        </el-form-item>-->
                        <el-form-item>
                            <el-row class="item mg-l-10">
                                <el-row class="btn">
                                    <el-button type="primary" size="small" icon="el-icon-search"
                                               :loading="btnLoadingFilter" @click="filterTableData(true)">查询</el-button>
                                </el-row>
                                <el-row class="btn">
                                    <el-button type="default" size="small" icon="el-icon-refresh"
                                               @click="() => {$refs.fmTbFilter.resetFields(); filterTableData(false);}">重置</el-button>
                                </el-row>
                            </el-row>
                        </el-form-item>
                    </el-row>
                </el-form>

                <!-- 功能 -->
                <el-row class="fn-btns">
                    <el-button type="primary" size="small" icon="el-icon-plus"
                               @click="create"
                               class="fn-btn">新增</el-button>
                    <!--<el-button type="danger" size="small" icon="el-icon-delete"
                               :disabled="btnDisabledBatchDelete" @click="batchDelete"
                               class="fn-btn">批量删除</el-button>-->
                </el-row>

                <!-- 列表 -->
                <el-row>
                    <el-table ref="multipleTable" :data="tbData.records"
                              tooltip-effect="dark" size="small"
                              highlight-current-row border>
                        <el-table-column label="角色编号" fixed="left" show-overflow-tooltip min-width="200">
                            <template slot-scope="scope">{{ scope.row.id }}</template>
                        </el-table-column>
                        <el-table-column label="角色名称" fixed="left" show-overflow-tooltip min-width="200">
                            <template slot-scope="scope">{{ scope.row.role }}</template>
                        </el-table-column>
                        <el-table-column label="描述" show-overflow-tooltip min-width="280">
                            <template slot-scope="scope">{{ scope.row.description }}</template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" show-overflow-tooltip width="110">
                            <template slot-scope="scope">
                                <el-row type="flex" justify="space-around">
                                    <el-link type="warning" :underline="false" @click="edit(scope.row)" class="fs-12">编辑</el-link>
                                    <el-row class="fg">|</el-row>
                                    <el-link type="danger" :underline="false" @click="remove(scope.row)" class="fs-12">删除</el-link>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>

                <!-- 分页 -->
                <el-row class="mg-t-20 mg-b-10 txt-c">
                    <el-pagination :total="tbData.total" :current-page="tbData.current" :page-size="10"
                                   layout="total, prev, pager, next, jumper"
                                   @current-change="handlePaginationChange"
                                   background>
                    </el-pagination>
                </el-row>
            </el-row>
        </el-row>

        <!-- 组件 -->
    </el-row>

</template>

<script>

    import {mapState} from 'vuex';
    import api from "@api/index";

    export default {
        name: "index",
        data() {
            return {
                tbSelectedArr: [],
                tbFilter: {
                    title: '',
                    createTime: [],
                },
                tbData: {records: []},
                tbDataFilter: {...this.tbFilter},
                btnLoadingFilter: false,

                editFormVisible: false,
            }
        },
        created() {},
        mounted() {
            this.tbFilter = this.$route.params._lpq !== undefined ? {
                createTime: (this.$route.params._lpq.startTime && this.$route.params._lpq.endTime)
                    ? [this.$route.params._lpq.startTime, this.$route.params._lpq.endTime]
                    : [],
                ...this.$route.params._lpq
            } : this.tbFilter;
            this.tbDataFilter = {...this.tbFilter};
            delete this.tbDataFilter.createTime;
            this.getTableData();
        },
        computed: {
            ...mapState(['userInfo', 'screenHeight']),
        },
        methods: {
            getTableData: function(page = 1, pageSize = 10) {
                let that = this;
                that.btnLoadingFilter = true;

                let params = {
                    ...that.tbDataFilter,
                    pageCurrent: page,
                    pageSize,
                };

                api.sysRoleList(params).then((res) => {
                    // console.log(res);
                    if(res.data.status === 200) {
                        that.tbData = {...res.data.data};
                    }
                    that.btnLoadingFilter = false;
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
                        // startTime: that.tbFilter.createTime.length > 0 ? `${that.tbFilter.createTime[0]} 00:00:00` : '',
                        // endTime: that.tbFilter.createTime.length > 0 ? `${that.tbFilter.createTime[1]} 23:59:59` : '',
                    };
                    delete that.tbDataFilter.createTime;
                } else {
                    that.tbDataFilter = {};
                }

                that.getTableData(1);
            },


            create: function(row) {
                let that = this;
                /*if(!that.man.fast.inArray('sys:role:add', that.userInfo.permissions)) {
                    that.$message.warning('您无权限进行此操作');
                    return;
                }*/

                that.$router.push({
                    path: `/personnel/organization/add`,
                    query: {
                        _lpq: JSON.stringify(that.tbDataFilter),
                    }
                });
            },
            edit: function(row) {
                let that = this;
                /*if(!that.man.fast.inArray('sys:role:edit', that.userInfo.permissions)) {
                    that.$message.warning('您无权限进行此操作');
                    return;
                }*/

                that.$router.push({
                    path: `/personnel/organization/edit`,
                    query: {
                        id: row.id,
                        _lpq: JSON.stringify(that.tbDataFilter),
                    }
                });
            },
            remove: function(row) {
                let that = this;

                that.$confirm('确认要删除所选数据吗？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '删除',
                    cancelButtonText: '取消'
                }).then(() => {
                    api.sysRoleDel(row.id).then((res) => {
                        if(res.data.status === 200) {
                            that.$message.success('操作成功');
                            that.getTableData();
                        }
                    });
                }).catch();
            },
            handleSelectionChange: function(chooseArr) {
                this.tbSelectedArr = chooseArr;
            },
            batchDelete: function() {},
        }
    }

</script>

<style lang="scss" scoped>

</style>