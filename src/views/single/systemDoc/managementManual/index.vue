<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <!-- 筛选 -->
                <el-form ref="fmTbFilter" :model="tbFilter" size="small" class="fm">
                    <el-row class="filters">
                        <el-form-item prop="name">
                            <el-row class="item">
                                <el-row class="lb lb-unmgl">文件名</el-row>
                                <el-row><el-input v-model="tbFilter.name" placeholder="文件名查询" class="inp-small"></el-input></el-row>
                            </el-row>
                        </el-form-item>
                        <el-form-item prop="documentNo">
                            <el-row class="item">
                                <el-row class="lb">文件编号</el-row>
                                <el-row><el-input v-model="tbFilter.documentNo" placeholder="文件编号查询" class="inp-small"></el-input></el-row>
                            </el-row>
                        </el-form-item>
                        <!--<el-form-item prop="type">
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
                        </el-form-item>-->
                        <!--<el-form-item prop="status">
                            <el-row class="item mg-l-10">
                                <el-row class="lb lb-unmgl">发布状态</el-row>
                                <el-row>
                                    <el-select v-model="tbFilter.status" class="inp">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="待发布" :value="0"></el-option>
                                        <el-option label="已发布" :value="1"></el-option>
                                    </el-select>
                                </el-row>
                            </el-row>
                        </el-form-item>-->
                        <!--<el-form-item prop="createTime">
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
                               :disabled="tbDataFilter.type === 1"
                               @click="create"
                               class="fn-btn">新增</el-button>
                    <!--<el-button type="danger" size="small" icon="el-icon-delete"
                               :disabled="btnDisabledBatchDelete" @click="batchDelete"
                               class="fn-btn">批量删除</el-button>-->
                </el-row>

                <!-- 列表 -->
                <el-row>
                    <el-table ref="multipleTable" :data="tbData.records" tooltip-effect="dark"
                              :min-height="460" size="small"
                              highlight-current-row class="dp-pc">
                        <el-table-column label="文件编号" fixed="left" show-overflow-tooltip min-width="200">
                            <template slot-scope="scope">{{ scope.row.documentNo }}</template>
                        </el-table-column>
                        <el-table-column label="文件名称" show-overflow-tooltip min-width="200">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="版本" show-overflow-tooltip min-width="60">
                            <template slot-scope="scope">{{ scope.row.version }}</template>
                        </el-table-column>
                        <el-table-column label="修订次数" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.updateCount }}</template>
                        </el-table-column>
                        <el-table-column label="发布状态" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status === 0" class="status-red">待发布</span>
                                <span v-else-if="scope.row.status === 1" class="status-green">已发布</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间" show-overflow-tooltip min-width="90">
                            <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD') : '' }}</template>
                        </el-table-column>
                        <el-table-column label="更新时间" show-overflow-tooltip min-width="90">
                            <template slot-scope="scope">{{ scope.row.updateTime ? dayjs(scope.row.updateTime).format('YYYY-MM-DD') : '' }}</template>
                        </el-table-column>
                        <el-table-column label="创建者" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.createUser }}</template>
                        </el-table-column>
                        <el-table-column label="操作人" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.updateUser }}</template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" show-overflow-tooltip min-width="200">
                            <template slot-scope="scope">
                                <el-row type="flex" justify="space-around">
                                    <el-link type="primary" :underline="false" @click="versionManage(scope.row)" class="fs-12">版本</el-link>
                                    <el-row class="fg">|</el-row>
                                    <el-link type="primary" :underline="false" @click="detail(scope.row)" class="fs-12">查阅</el-link>
                                    <el-row class="fg">|</el-row>
                                    <el-link type="primary" :underline="false" @click="edit(scope.row)" class="fs-12">编辑</el-link>
                                    <el-row class="fg">|</el-row>
                                    <el-link type="primary" :underline="false" @click="remove(scope.row)" class="fs-12">删除</el-link>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-table ref="multipleTable" :data="tbData.records" tooltip-effect="dark"
                              :min-height="460" size="small"
                              highlight-current-row class="dp-m">
                        <el-table-column label="文件编号" fixed="left" show-overflow-tooltip min-width="180">
                            <template slot-scope="scope">{{ scope.row.documentNo }}</template>
                        </el-table-column>
                        <el-table-column label="文件名称" show-overflow-tooltip min-width="320">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="更新时间" show-overflow-tooltip min-width="160">
                            <template slot-scope="scope">{{ scope.row.updateTime ? dayjs(scope.row.updateTime).format('YYYY-MM-DD') : '' }}</template>
                        </el-table-column>
                        <el-table-column label="操作人" show-overflow-tooltip min-width="120">
                            <template slot-scope="scope">{{ scope.row.updateUser }}</template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" show-overflow-tooltip min-width="260">
                            <template slot-scope="scope">
                                <el-row type="flex" justify="space-around">
                                    <el-link type="primary" :underline="false" @click="versionManage(scope.row)" class="fs-12">版本</el-link>
                                    <el-row class="fg">|</el-row>
                                    <el-link type="primary" :underline="false" @click="detail(scope.row)" class="fs-12">查阅</el-link>
                                    <el-row class="fg">|</el-row>
                                    <el-link type="primary" :underline="false" @click="edit(scope.row)" class="fs-12">编辑</el-link>
                                    <el-row class="fg">|</el-row>
                                    <el-link type="primary" :underline="false" @click="remove(scope.row)" class="fs-12">删除</el-link>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>

                <!-- 分页 -->
                <el-row v-if="tbData.total" class="dp-pc-dl-pager mg-t-20 mg-b-10 txt-c">
                    <el-pagination :total="tbData.total" :current-page="tbData.current" :page-size="10"
                                   layout="total, prev, pager, next, jumper"
                                   @current-change="handlePaginationChange"
                                   background>
                    </el-pagination>
                </el-row>
                <el-row v-if="tbData.total" class="dp-m-dl-pager mg-t-20 mg-b-10 txt-c">
                    <el-pagination :total="tbData.total" :current-page="tbData.current" :page-size="5"
                                   layout="total, prev, next, jumper"
                                   @current-change="handlePaginationChange"
                                   background>
                    </el-pagination>
                </el-row>
            </el-row>
        </el-row>

        <!-- 列表操作 -->
        <van-action-sheet v-model="asShow"
                          :description="asOptions.description"
                          :actions="asOptions.actions"
                          :cancel-text="asOptions.cancelText"
                          @select="choosedAction"
                          close-on-click-action/>
    </el-row>

</template>

<script>

    import {mapState} from 'vuex';
    import dayjs from 'dayjs';
    import jsonTableData from '@mock/systemDocManagementManual.json';
    import api from "@api";

    export default {
        name: "index",
        data() {
            return {
                dayjs,

                asShow: false,
                asOptions: {
                    row: null,
                    description: '操作选项',
                    actions: [],
                    cancelText: '关闭',
                },

                tbSelectedArr: [],
                tbFilter: {
                    name: '',
                    documentNo: '',
                    createTime: [],
                },
                tbData: {list: []},
                tbDataFilter: {...this.tbFilter},
                btnLoadingFilter: false,
            }
        },
        beforeCreate() {
            // console.log(JSON.parse(this.$route.query.folderTitle));
            // 更改当前路由面包屑 title
            if(this.$route.query.folderTitle !== undefined) this.man.bus.$emit('changeCurrentRouteMetaTitle', JSON.parse(this.$route.query.folderTitle));
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
        computed: {
            ...mapState(['userInfo']),
        },
        methods: {
            getTableData: function(page = 1, pageSize = 10) {
                let that = this;
                that.btnLoadingFilter = true;

                let folderTitle = JSON.parse(that.$route.query.folderTitle);
                let params = {
                    ...that.tbDataFilter,
                    typeId: folderTitle.id,
                    pageCurrent: page,
                    pageSize,
                };

                api.systemDocumentPage(params).then((res) => {
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
                        // startDate: that.tbFilter.createTime && that.tbFilter.createTime.length > 0 ? `${that.tbFilter.createTime[0]} 00:00:00` : '',
                        // endDate: that.tbFilter.createTime && that.tbFilter.createTime.length > 0 ? `${that.tbFilter.createTime[1]} 23:59:59` : '',
                    };
                    delete that.tbDataFilter.createTime;
                } else {
                    that.tbDataFilter = {};
                }

                that.getTableData(1);
            },

            create: function() {
                let that = this;
                if(!that.man.fast.inArray('system-doc:management-manual:add', that.userInfo.permissions)) {
                    that.$message.warning('您无权限进行此操作');
                    return;
                }

                that.$router.push({
                    path: `/system-doc/management-manual/add`,
                    query: {
                        _lpq: JSON.stringify(that.tbDataFilter),
                        folderTitle: that.$route.query.folderTitle,
                        id: 0,
                    }
                });
            },
            versionManage: function(row) {
                let that = this;
                if(!that.man.fast.inArray('system-doc:management-manual:version', that.userInfo.permissions)) {
                    that.$message.warning('您无权限进行此操作');
                    return;
                }

                that.$router.push({
                    path: `/system-doc/management-manual/version`,
                    query: {
                        _lpq: JSON.stringify(that.tbDataFilter),
                        folderTitle: that.$route.query.folderTitle,
                        // virtualParent: JSON.stringify(that.$route.meta.virtualParent),
                        documentNo: row.documentNo,
                    }
                });
            },
            detail: function(row) {
                let that = this;
                if(!that.man.fast.inArray('system-doc:management-manual:detail', that.userInfo.permissions)) {
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
            edit: function(row) {
                let that = this;
                if(!that.man.fast.inArray('system-doc:management-manual:edit', that.userInfo.permissions)) {
                    that.$message.warning('您无权限进行此操作');
                    return;
                }

                that.$router.push({
                    path: `/system-doc/management-manual/edit`,
                    query: {
                        _lpq: JSON.stringify(that.tbDataFilter),
                        folderTitle: that.$route.query.folderTitle,
                        id: row.id,
                    }
                });
            },
            remove: function(row) {
                let that = this;
                if(!that.man.fast.inArray('system-doc:management-manual:del', that.userInfo.permissions)) {
                    that.$message.warning('您无权限进行此操作');
                    return;
                }

                that.$confirm('确认要删除所选数据吗？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '删除',
                    cancelButtonText: '取消'
                }).then(() => {
                    api.systemDocumentDeleteAllVersion(row.documentNo).then((res) => {
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
            batchDelete: function() {},


            showAsOperate: function(row) {
                let that = this;

                that.asOptions.row = row;
                that.asOptions.actions = [
                    {name: '版本'},
                    {name: '发布', color: '#1DC084'},
                    {name: '详情'},
                    {name: '撤下'},
                    {name: '编辑', color: '#E6A23C'},
                    {name: '删除', color: '#F56C6C'},
                ];
                that.asShow = true;
            },
            choosedAction: function(action, index) {
                let that = this;
                // console.log(action);
                // console.log(that.asOptions.row);

                switch (action.name) {
                    case '版本':
                        break;
                    case '发布':
                        break;
                    case '详情':
                        that.detail()
                        break;
                    case '撤下':
                        break;
                    case '编辑':
                        break;
                    case '删除':
                        break;
                }
            },
        }
    }

</script>

<style lang="scss" scoped>

    ._root_page {
        ::v-deep {
            /*.el-table tr th {*/
            /*    background: #FAFAFA;*/
            /*    padding: 15px 0;*/
            /*    font-size: 14px;*/
            /*}*/
        }
    }

</style>