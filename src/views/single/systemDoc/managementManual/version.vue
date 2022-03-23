<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <!-- 筛选 -->
                <!--<el-form ref="fmTbFilter" :model="tbFilter" size="small">
                    <el-row class="filters">
                        <el-form-item prop="name">
                            <el-row class="item">
                                <el-row class="lb lb-unmgl">名称</el-row>
                                <el-row><el-input v-model="tbFilter.name" placeholder="名称查询" class="inp-small"></el-input></el-row>
                            </el-row>
                        </el-form-item>
                        &lt;!&ndash;<el-form-item prop="type">
                            <el-row class="item mg-l-10">
                                <el-row class="lb lb-unmgl">类型</el-row>
                                <el-row>
                                    <el-select v-model="tbFilter.type" class="inp">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="普通管理员" :value="0"></el-option>
                                        <el-option label="超级管理员" :value="1"></el-option>
                                    </el-select>
                                </el-row>
                            </el-row>
                        </el-form-item>
                        <el-form-item prop="auditStatus">
                            <el-row class="item mg-l-10">
                                <el-row class="lb lb-unmgl">使用状态</el-row>
                                <el-row>
                                    <el-select v-model="tbFilter.auditStatus" class="inp">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="活动" :value="0"></el-option>
                                        <el-option label="冻结" :value="1"></el-option>
                                    </el-select>
                                </el-row>
                            </el-row>
                        </el-form-item>
                        <el-form-item prop="createTime">
                            <el-row class="item">
                                <el-row class="lb">创建时间</el-row>
                                <el-row>
                                    <el-date-picker v-model="tbFilter.createTime"
                                                    type="daterange" size="small"
                                                    start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"
                                                    format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                                    style="width: 230px !important;">
                                    </el-date-picker>
                                </el-row>
                            </el-row>
                        </el-form-item>&ndash;&gt;
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
                </el-form>-->

                <!-- 功能 -->
                <!--<el-row class="fn-btns">
                    <el-button type="primary" size="small" icon="el-icon-plus"
                               :disabled="tbDataFilter.type === 1" @click="create"
                               class="fn-btn">新增</el-button>
                    &lt;!&ndash;<el-button type="danger" size="small" icon="el-icon-delete"
                               :disabled="btnDisabledBatchDelete" @click="batchDelete"
                               class="fn-btn">批量删除</el-button>&ndash;&gt;
                </el-row>-->

                <!-- 列表 -->
                <el-row>
                    <el-table ref="multipleTable" :data="tbData.records" tooltip-effect="dark"
                              :min-height="460" size="small"
                              highlight-current-row border>
                        <el-table-column label="文件编号" fixed="left" show-overflow-tooltip width="200">
                            <template slot-scope="scope">{{ scope.row.documentNo }}</template>
                        </el-table-column>
                        <el-table-column label="文件名称" show-overflow-tooltip min-width="160">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="版本" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.version }}</template>
                        </el-table-column>
                        <el-table-column label="发布状态" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status === 0" class="status-red">未发布</span>
                                <span v-else-if="scope.row.status === 1" class="status-green">已发布</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建日期" show-overflow-tooltip min-width="90">
                            <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD') : '' }}</template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" show-overflow-tooltip width="140">
                            <template slot-scope="scope">
                                <el-row type="flex" justify="space-around">
                                    <el-link type="primary" :underline="false" @click="setAsMainVersion(scope.row)" class="fs-12">设为主版本</el-link>
                                    <el-row class="fg">|</el-row>
                                    <el-link type="danger" :underline="false" @click="remove(scope.row)" class="fs-12">删除</el-link>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>

                <!-- 分页 -->
                <el-row v-if="tbData.records.length" class="mg-t-20 mg-b-10 txt-c">
                    <el-pagination :total="tbData.totalElements" :current-page="tbData.number + 1" :page-size="10"
                                   layout="total, prev, pager, next, jumper"
                                   @current-change="handlePaginationChange"
                                   background>
                    </el-pagination>
                </el-row>
                <el-row type="flex" justify="center" align="middle" class="page-default-pd-bgc-white edit-page-options-btn">
                    <el-button type="default" size="small" icon="el-icon-refresh-left" @click="cancel" class="btn">返回列表</el-button>
                </el-row>
            </el-row>
        </el-row>
    </el-row>

</template>

<script>

    import api from "@api";
    import dayjs from 'dayjs';

    const listRoutePath = '/system-doc/management-manual';

    export default {
        name: "index",
        data() {
            return {
                dayjs,

                tbSelectedArr: [],
                tbFilter: {
                    name: '',
                    createTime: [],
                },
                tbData: {records: []},
                tbDataFilter: {...this.tbFilter},
                btnLoadingFilter: false,

            }
        },
        beforeCreate() {
            // console.log(JSON.parse(this.$route.query.virtualParent));
            // 更改当前路由面包屑 title
            if(this.$route.query.folderTitle !== undefined) this.man.bus.$emit('changeCurrentRouteVirtualParentMetaTitle', JSON.parse(this.$route.query.folderTitle));
        },
        mounted() {
            let _lpq = this.$route.query._lpq !== undefined ? JSON.parse(this.$route.query._lpq) : false;
            this.tbFilter = _lpq ? {
                createTime: (_lpq.startDate && _lpq.endDate) ? [_lpq.startDate, _lpq.endDate] : [],
                ..._lpq
            } : this.tbFilter;
            this.tbDataFilter = {...this.tbFilter};
            delete this.tbDataFilter.createTime;
            this.getTableData();
        },
        methods: {
            getTableData: function(page = 1, pageSize = 10) {
                let that = this;
                that.btnLoadingFilter = true;

                let params = {
                    ...that.tbDataFilter,
                    documentNO: that.$route.query.documentNo,
                    pageCurrent: page,
                    pageSize,
                };

                api.systemDocumentVersions(params).then((res) => {
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
                        startDate: that.tbFilter.createTime && that.tbFilter.createTime.length > 0 ? `${that.tbFilter.createTime[0]} 00:00:00` : '',
                        endDate: that.tbFilter.createTime && that.tbFilter.createTime.length > 0 ? `${that.tbFilter.createTime[1]} 23:59:59` : '',
                    };
                    delete that.tbDataFilter.createTime;
                } else {
                    that.tbDataFilter = {};
                }

                that.getTableData(1);
            },

            setAsMainVersion: function(row) {
                let that = this;

                that.$confirm('确认要设其为主版本吗？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '设为主版本',
                    cancelButtonText: '取消'
                }).then(() => {
                    api.systemDocumentSetManVersion({
                        id: row.id,
                    }).then((res) => {
                        if(res.data.status === 200) {
                            that.$message.success('保存成功');
                            that.getTableData();
                        }
                    });
                }).catch();
            },
            remove: function(row) {
                let that = this;
                /*if(!that.man.fast.inArray('sys:user:del', that.userInfo.permissions)) {
                    that.$message.warning('您无权限进行此操作');
                    return;
                }*/

                that.$confirm('确认要删除所选数据吗？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '删除',
                    cancelButtonText: '取消'
                }).then(() => {
                    api.systemDocumentDelete(row.id).then((res) => {
                        if(res.data.status === 200) {
                            that.$message.success('保存成功');
                            that.getTableData();
                        }
                    });
                }).catch();
            },
            handleSelectionChange: function(chooseArr) {
                this.tbSelectedArr = chooseArr;
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
        }
    }

</script>

<style lang="scss" scoped>



</style>