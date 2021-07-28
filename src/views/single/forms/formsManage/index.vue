<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <!-- 筛选 -->
                <el-form ref="fmTbFilter" :model="tbDataFilter" size="small">
                    <el-row class="filters">
                        <el-form-item prop="formNumber">
                            <el-row class="item">
                                <el-row class="lb lb-unmgl">表单编号</el-row>
                                <el-row>
                                    <el-input v-model="tbDataFilter.formNumber" placeholder="编号查询" class="inp-small"></el-input>
                                </el-row>
                            </el-row>
                        </el-form-item>
                        <el-form-item prop="formName">
                            <el-row class="item mg-l-10">
                                <el-row class="lb lb-unmgl">表单名称</el-row>
                                <el-row>
                                    <el-input v-model="tbDataFilter.formName" placeholder="名称查询" class="inp-small"></el-input>
                                </el-row>
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
                        </el-form-item>-->
                        <el-form-item>
                            <el-row class="item mg-l-10">
                                <el-row class="btn">
                                    <el-button 
                                        type="primary" 
                                        size="small" 
                                        icon="el-icon-search"
                                        :loading="btnLoadingFilter" 
                                        @click="filterTableData(true)">
                                        查询
                                    </el-button>
                                </el-row>
                                <el-row class="btn">
                                    <el-button 
                                        type="default" 
                                        size="small" 
                                        icon="el-icon-refresh"
                                        @click="() => {
                                            $refs.fmTbFilter.resetFields(); 
                                            filterTableData(false);
                                        }">
                                        重置
                                    </el-button>
                                </el-row>
                            </el-row>
                        </el-form-item>
                    </el-row>
                </el-form>

                <!-- 功能 -->
                <el-row class="fn-btns">
                    <el-button 
                        type="primary" 
                        size="small" 
                        icon="el-icon-plus"
                        @click="create"
                        class="fn-btn">
                        新增
                    </el-button>
                    <!--<el-button type="danger" size="small" icon="el-icon-delete"
                               :disabled="btnDisabledBatchDelete" @click="batchDelete"
                               class="fn-btn">批量删除</el-button>-->
                </el-row>

                <!-- 列表 -->
                <el-row>
                    <el-table ref="multipleTable" :data="tbData.content" tooltip-effect="dark"
                              :min-height="460" size="small"
                              highlight-current-row border>
                        <el-table-column label="编号" fixed="left" show-overflow-tooltip width="280">
                            <template slot-scope="scope">{{ scope.row.formNumber }}</template>
                        </el-table-column>
                        <el-table-column label="名称" show-overflow-tooltip min-width="160">
                            <template slot-scope="scope">{{ scope.row.formName }}</template>
                        </el-table-column>
                        <el-table-column label="版本" show-overflow-tooltip min-width="160">
                            <template slot-scope="scope">{{ scope.row.versions }}</template>
                        </el-table-column>
                        <!--<el-table-column label="创建日期" show-overflow-tooltip min-width="90">
                            <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD') : '' }}</template>
                        </el-table-column>
                        <el-table-column label="使用状态" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status === 0" class="status-green">活动</span>
                                <span v-else-if="scope.row.status === 1" class="status-red">冻结</span>
                            </template>
                        </el-table-column>-->
                        <el-table-column label="操作" fixed="right" show-overflow-tooltip width="280">
                            <template slot-scope="scope">
                                <el-row type="flex" justify="space-around">
                                    <el-link type="primary" :underline="false" @click="versionManage(scope.row)" class="fs-12">版本管理</el-link>
                                    <el-row class="fg">|</el-row>
                                    <el-link type="warning" :underline="false" @click="edit(scope.row)" class="fs-12">编辑</el-link>
                                    <el-row class="fg">|</el-row>
                                    <el-link type="danger" :underline="false" @click="remove(scope.row)" class="fs-12">删除</el-link>
                                    <el-row class="fg">|</el-row>
                                    <el-link type="success" :underline="false" @click="processDesign(scope.row)" class="fs-12" style="color: #009688;">流程设计</el-link>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>

                <!-- 分页 -->
                <el-row v-if="tbData.total > 0" class="mg-t-20 mg-b-10 txt-c">
                    <el-pagination 
                        :total="tbData.total" 
                        :current-page="tbData.current" 
                        :page-size="tbData.size"
                        layout="total, prev, pager, next, jumper"
                        @current-change="handlePaginationChange"
                        background>
                    </el-pagination>
                </el-row>
            </el-row>
        </el-row>
    </el-row>

</template>

<script>
    import api from "@api";
    export default {
        name: "index",
        data() {
            return {
                tbData: {
                    content: [],
                    total:0,
                    size:10,
                    current:1
                },
                tbDataFilter: {
                    formName:'',
                    formNumber:''
                },
                btnLoadingFilter: false
            }
        },
        mounted() {
            this.getTableData();
        },
        methods: {
            
            getTableData: function(page = 1, pageSize = 10) {
                this.btnLoadingFilter = true;

                let params = {
                    ...this.tbDataFilter,
                    pageCurrent: page,
                    pageSize,
                };

                api.formList(params).then((res) => {
                    this.btnLoadingFilter = false;
                    if(res.data.status === 200) {
                        this.tbData.content = res.data.data.records;
                        this.tbData.current = res.data.data.current;
                        this.tbData.size = res.data.data.size;
                        this.tbData.total = res.data.data.total;
                    }
                 });
            },
            handlePaginationChange: function(page) {
                this.getTableData(page);
            },
            filterTableData: function(isFilter = true) {
                let that = this;
                //console.log(this.tbDataFilter);
                that.getTableData(1);
            },
            create: function() {
                // let that = this;
                // if(!that.man.fast.inArray('sys:user:add', that.userInfo.permissions)) {
                //     that.$message.warning('您无权限进行此操作');
                //     return;
                // }
                this.$router.push({path: `/forms/forms-forms`});
            },
            edit: function(row) {
                this.$router.push({path: '/forms/forms-forms',query:{id:parseInt(row.id)}});
            },
            remove: function(row) {
                // let that = this;
                // if(!that.man.fast.inArray('sys:user:del', that.userInfo.permissions)) {
                //     that.$message.warning('您无权限进行此操作');
                //     return;
                // }

                this.$confirm('确认要删除所选数据吗？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '删除',
                    cancelButtonText: '取消'
                }).then(() => {
                    api.formDel(row.id).then((res) => {
                        if(res.data.status === 200) {
                            this.$message.success('删除成功');
                            this.getTableData(this.tbData.current);
                        }
                    });
                }).catch();
            },
            batchDelete: function() {
            },
            versionManage: function(row) {
                let that = this;

                // console.log(`${JSON.stringify(that.tbDataFilter)}`);
                // /${JSON.stringify(that.tbDataFilter)}
                that.$router.push({path: `/forms/version-manage`});
            },
            processDesign: function(row) {
                let that = this;

                that.$router.push({path: `/forms/process-design`});
            },
        }
    }

</script>

<style lang="scss" scoped>



</style>