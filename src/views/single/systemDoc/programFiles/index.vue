<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <!-- 筛选 -->
                <el-form ref="fmTbFilter" :model="tbFilter" size="small">
                    <el-row class="filters">
                        <el-form-item prop="name">
                            <el-row class="item">
                                <el-row class="lb lb-unmgl">文件名</el-row>
                                <el-row><el-input v-model="tbFilter.name" placeholder="文件名查询" class="inp-small"></el-input></el-row>
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
                        <el-form-item prop="auditStatus">
                            <el-row class="item mg-l-10">
                                <el-row class="lb lb-unmgl">发布状态</el-row>
                                <el-row>
                                    <el-select v-model="tbFilter.auditStatus" class="inp">
                                        <el-option label="全部" value=""></el-option>
                                        <el-option label="待发布" :value="0"></el-option>
                                        <el-option label="已发布" :value="1"></el-option>
                                    </el-select>
                                </el-row>
                            </el-row>
                        </el-form-item>
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
                    <el-table ref="multipleTable" :data="tbData.list" tooltip-effect="dark"
                              :min-height="460" size="small"
                              class="dp-pc"
                              highlight-current-row>
                        <el-table-column label="文件编号" fixed="left" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.id }}</template>
                        </el-table-column>
                        <el-table-column label="文件名称" show-overflow-tooltip min-width="220">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="版本" show-overflow-tooltip min-width="60">
                            <template slot-scope="scope">{{ scope.row.version }}</template>
                        </el-table-column>
                        <el-table-column label="发布状态" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status === 0" class="status-red">待发布</span>
                                <span v-else-if="scope.row.status === 1" class="status-green">已发布</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="更新时间" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD') : '' }}</template>
                        </el-table-column>
                        <el-table-column label="操作人" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.operator }}</template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" show-overflow-tooltip min-width="140">
                            <template slot-scope="scope">
                                <el-row type="flex" justify="space-around">
                                    <el-link type="primary" :underline="false" @click="versionManage(scope.row)" class="fs-12">版本</el-link>
                                    <el-row class="fg">|</el-row>
                                    <el-link type="primary" :underline="false" @click="release(scope.row)" class="fs-12">查阅</el-link>
                                    <!--<el-row class="fg">|</el-row>
                                    <el-link type="primary" :underline="false" @click="detail(scope.row)" class="fs-12">详情</el-link>-->
                                    <!--<el-row class="fg">|</el-row>
                                    <el-link type="primary" :underline="false" @click="edit(scope.row)" class="fs-12">撤下</el-link>-->
                                    <el-row class="fg">|</el-row>
                                    <el-link type="primary" :underline="false" @click="edit(scope.row)" class="fs-12">编辑</el-link>
                                    <el-row class="fg">|</el-row>
                                    <el-link type="primary" :underline="false" @click="remove(scope.row)" class="fs-12">删除</el-link>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-table ref="multipleTable" :data="tbData.list" tooltip-effect="dark"
                              :min-height="460" size="small"
                              class="dp-m"
                              highlight-current-row>
                        <el-table-column label="文件编号" fixed="left" show-overflow-tooltip min-width="125">
                            <template slot-scope="scope">{{ scope.row.id }}</template>
                        </el-table-column>
                        <el-table-column label="文件名称" show-overflow-tooltip min-width="320">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="版本" show-overflow-tooltip min-width="105">
                            <template slot-scope="scope">{{ scope.row.version }}</template>
                        </el-table-column>
                        <el-table-column label="发布状态" show-overflow-tooltip min-width="145">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status === 0" class="status-red">待发布</span>
                                <span v-else-if="scope.row.status === 1" class="status-green">已发布</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="更新时间" show-overflow-tooltip min-width="145">
                            <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD') : '' }}</template>
                        </el-table-column>
                        <el-table-column label="操作人" show-overflow-tooltip min-width="105">
                            <template slot-scope="scope">{{ scope.row.operator }}</template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" show-overflow-tooltip min-width="120">
                            <template slot-scope="scope">
                                <el-row type="flex" justify="space-around">
                                    <!--                                    <el-link type="primary" :underline="false" @click="detail(scope.row)" class="fs-12">详情</el-link>-->
                                    <el-link type="primary" :underline="false" @click="showAsOperate(scope.row)" class="fs-12">操作</el-link>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>

                <!-- 分页 -->
                <el-row v-if="tbData.total" class="mg-t-20 mg-b-10 txt-c">
                    <el-pagination :total="tbData.total" :current-page="tbData.current" :page-size="10"
                                   layout="total, prev, pager, next, jumper"
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

    import dayjs from 'dayjs';
    import jsonTableData from '@mock/systemDocManagementManual.json';

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
                    createTime: [],
                },
                tbData: {list: []},
                tbDataFilter: {...this.tbFilter},
                btnLoadingFilter: false,
            }
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
            getTableData: function(page = 1, pageSize = 10) {
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

            create: function() {
                let that = this;
                // if(!that.man.fast.inArray('sys:user:add', that.userInfo.permissions)) {
                //     that.$message.warning('您无权限进行此操作');
                //     return;
                // }

                that.$router.push({path: `management-manual/add/${JSON.stringify(that.tbDataFilter)}`});
            },
            edit: function(row) {
                let that = this;
                // if(!that.man.fast.inArray('sys:user:add', that.userInfo.permissions)) {
                //     that.$message.warning('您无权限进行此操作');
                //     return;
                // }

                that.$router.push({path: `/system/doc/management/manual/edit/${JSON.stringify(that.tbDataFilter)}`});
            },
            remove: function(row) {
                let that = this;
                if(!that.man.fast.inArray('sys:user:del', that.userInfo.permissions)) {
                    that.$message.warning('您无权限进行此操作');
                    return;
                }

                that.$confirm('确认要删除所选数据吗？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '删除',
                    cancelButtonText: '取消'
                }).then(() => {
                    /*api.sysUserDel(row.id).then((res) => {
                        if(res.data.status === 200) {
                            that.$message.success('保存成功');
                            that.getTableData();
                        }
                    });*/
                }).catch();
            },
            handleSelectionChange: function(chooseArr) {
                this.tbSelectedArr = chooseArr;
            },
            batchDelete: function() {},

            versionManage: function(row) {
                let that = this;

                // console.log(`${JSON.stringify(that.tbDataFilter)}`);
                that.$router.push({path: `/forms/version/manage/${JSON.stringify(that.tbDataFilter)}`});
            },
            release: function() {
                let that = this;

                that.$router.push({path: `management-manual/release/${JSON.stringify(that.tbDataFilter)}`});
            },
            detail: function() {
                let that = this;

                that.$router.push({path: `management-manual/detail/${JSON.stringify(that.tbDataFilter)}`});
            },
            processDesign: function(row) {
                let that = this;


            },
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
            .el-table tr th {
                background: #FAFAFA;
                padding: 15px 0;
                font-size: 14px;
            }
        }
    }

</style>