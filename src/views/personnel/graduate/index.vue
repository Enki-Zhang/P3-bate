<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <!-- 筛选 -->
                <el-form ref="fmTbFilter" :model="tbFilter" size="small">
                    <el-row class="filters">
                        <el-form-item prop="name">
                            <el-row class="item">
                                <el-row class="lb lb-unmgl">姓名查询</el-row>
                                <el-row><el-input v-model="tbFilter.name" placeholder="支持模糊查询" class="inp-small"></el-input></el-row>
                            </el-row>
                        </el-form-item>
                        <el-form-item prop="tutor">
                            <el-row class="item">
                                <el-row class="lb">导师查询</el-row>
                                <el-row><el-input v-model="tbFilter.tutor" placeholder="支持模糊查询" class="inp-small"></el-input></el-row>
                            </el-row>
                        </el-form-item>
                        <el-form-item prop="studyForADegree">
                            <el-row class="item mg-l-10">
                                <el-row class="lb lb-unmgl">攻读学位</el-row>
                                <el-row><el-input v-model="tbFilter.studyForADegree" placeholder="支持模糊查询" class="inp-small"></el-input></el-row>
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
                        <!--<el-form-item prop="auditStatus">
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
                        </el-form-item>-->
                        <el-form-item prop="createTime">
                            <el-row class="item">
                                <el-row class="lb">入学时间</el-row>
                                <el-row>
                                    <el-date-picker v-model="tbFilter.createTime"
                                                    type="date" size="small"
                                                    placeholder="选择日期"
                                                    format="yyyy-MM-dd"
                                                    value-format="yyyy-MM-dd"
                                                    style="width: 140px !important;">
                                    </el-date-picker>
                                </el-row>
                            </el-row>
                        </el-form-item>
                        <el-form-item prop="createTime">
                            <el-row class="item">
                                <el-row class="lb">毕业时间</el-row>
                                <el-row>
                                    <el-date-picker v-model="tbFilter.createTime"
                                                    type="date" size="small"
                                                    placeholder="选择日期"
                                                    format="yyyy-MM-dd"
                                                    value-format="yyyy-MM-dd"
                                                    style="width: 140px !important;">
                                    </el-date-picker>
                                </el-row>
                            </el-row>
                        </el-form-item>
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
                    <el-button type="primary" size="small" icon="el-icon-printer"
                               :disabled="!isSelectedItem"
                               @click="remove"
                               class="fn-btn">打印</el-button>
                    <el-button type="primary" size="small" icon="el-icon-view"
                               :disabled="!isChosenRow"
                               @click="detail"
                               class="fn-btn">查看</el-button>
                    <el-button type="primary" size="small" icon="el-icon-download"
                               :disabled="false"
                               @click="download"
                               class="fn-btn">下载</el-button>
                    <!--<el-button type="primary" size="small" icon="el-icon-key"
                               :disabled="!isChosenRow"
                               @click="resetPassword"
                               class="fn-btn">重置密码</el-button>-->
                    <!--<el-button type="primary" size="small" icon="el-icon-user"
                               :disabled="!isChosenRow"
                               @click="showDlRole"
                               class="fn-btn">组别</el-button>-->
                    <!--<el-button type="primary" size="small" icon="el-icon-document"
                               :disabled="!isChosenRow"
                               @click="create"
                               class="fn-btn">入职培训记录</el-button>
                    <el-button type="primary" size="small" icon="el-icon-document"
                               :disabled="!isChosenRow"
                               @click="create"
                               class="fn-btn">课题开展记录</el-button>
                    <el-button type="primary" size="small" icon="el-icon-edit-outline"
                               :disabled="!isChosenRow"
                               @click="create"
                               class="fn-btn">毕业手续办理</el-button>
                    <el-button type="primary" size="small" icon="el-icon-takeaway-box"
                               :disabled="!isChosenRow"
                               @click="create"
                               class="fn-btn">毕业证书留档</el-button>-->
                </el-row>

                <!-- 列表 -->
                <el-row>
                    <el-table ref="multipleTable" :data="tbData.records"
                              :min-height="460" size="small"
                              @current-change="handleCurrentChange"
                              @selection-change="handleSelectionChange"
                              tooltip-effect="dark" class="dp-pc"
                              highlight-current-row>
                        <el-table-column type="selection"></el-table-column>
                        <!--<el-table-column label="序号" fixed="left" show-overflow-tooltip min-width="60">
                            <template slot-scope="scope">{{ scope.row.id }}</template>
                        </el-table-column>-->
                        <el-table-column label="姓名" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="导师" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.tutor }}</template>
                        </el-table-column>
                        <el-table-column label="攻读学位" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.studyForADegree }}</template>
                        </el-table-column>
                        <el-table-column label="学号" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.studentNumber }}</template>
                        </el-table-column>
                        <el-table-column label="一卡通号" show-overflow-tooltip min-width="100">
                            <template slot-scope="scope">{{ scope.row.allInOneCardNumber }}</template>
                        </el-table-column>
                        <el-table-column label="身份证号" show-overflow-tooltip min-width="100">
                            <template slot-scope="scope">{{ scope.row.idNumber }}</template>
                        </el-table-column>
                        <el-table-column label="中行卡号" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.bocCardNo }}</template>
                        </el-table-column>
                        <el-table-column label="最高学历" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.highestEducation }}</template>
                        </el-table-column>
                        <el-table-column label="本科毕业学校及专业" show-overflow-tooltip min-width="150">
                            <template slot-scope="scope">{{ scope.row.graduateSchoolAndMajor }}</template>
                        </el-table-column>
                        <el-table-column label="邮箱" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.email }}</template>
                        </el-table-column>
                        <el-table-column label="手机号码" show-overflow-tooltip min-width="100">
                            <template slot-scope="scope">{{ scope.row.contactNumber }}</template>
                        </el-table-column>
                        <el-table-column label="家庭住址" show-overflow-tooltip min-width="180">
                            <template slot-scope="scope">{{ scope.row.homeAddress }}</template>
                        </el-table-column>
                        <el-table-column label="紧急联系人及电话" show-overflow-tooltip min-width="140">
                            <template slot-scope="scope">{{ scope.row.familyEmergencyContactNumber }}</template>
                        </el-table-column>
                        <el-table-column label="入学时间" show-overflow-tooltip min-width="100">
                            <template slot-scope="scope">{{ scope.row.admissionTime ? dayjs(scope.row.admissionTime).format('YYYY-MM-DD') : '' }}</template>
                        </el-table-column>
                        <el-table-column label="毕业时间" show-overflow-tooltip min-width="100">
                            <template slot-scope="scope">{{ scope.row.graduationTime ? dayjs(scope.row.graduationTime).format('YYYY-MM-DD') : '' }}</template>
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

        <!-- 组件：创建账号 -->
        <dl-add v-model="dlAddVisible" :params="dlParams" @done="getTableData()"></dl-add>
        <!-- 组件：组别 -->
<!--        <dl-role v-model="dlRoleVisible" :params="dlParams" @done="getTableData()"></dl-role>-->
        <!-- 移动端：列表操作 -->
        <van-action-sheet v-model="asShow"
                          :description="asOptions.description"
                          :actions="asOptions.actions"
                          :cancel-text="asOptions.cancelText"
                          @select="choosedAction"
                          close-on-click-action/>
    </el-row>

</template>

<script>

    import ajax from "@plugins/ajax";
    import dayjs from 'dayjs';
    import api from "@api";
    import dlAdd from "@views/personnel/graduate/dlAdd";
    // import dlRole from "@views/personnel/information/dlRole";

    export default {
        name: "index",
        components: {
            dlAdd,
            // dlRole,
        },
        data() {
            return {
                dayjs,

                dlParams: {},
                dlAddVisible: false,
                dlRoleVisible: false,

                asShow: false,
                asOptions: {
                    row: null,
                    description: '操作选项',
                    actions: [],
                    cancelText: '关闭',
                },

                tbChosenRow: {},
                tbSelectedArr: [],
                tbFilter: {
                    name: '',
                    tutor: '',
                    studyForADegree: '',
                    createTime: '',
                },
                tbData: {list: []},
                tbDataFilter: {...this.tbFilter},
                btnLoadingFilter: false,
            }
        },
        computed: {
            isChosenRow: function() {
                return Object.keys(this.tbChosenRow).length > 0;
            },
            isSelectedItem: function() {
                return this.tbSelectedArr.length > 0;
            },
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
                that.btnLoadingFilter = true;

                let params = {
                    ...that.tbDataFilter,
                    pageCurrent: page,
                    pageSize,
                };

                api.sysYjsInfoList(params).then((res) => {
                    // console.log(res.data.data);
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
            handleCurrentChange: function(chosenRow) {
                this.tbChosenRow = chosenRow;
            },
            handleSelectionChange: function(chooseArr) {
                this.tbSelectedArr = chooseArr;
            },

            create: function() {
                let that = this;

                that.dlAddVisible = true;
            },
            remove: function() {
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
                    let idArr = [];
                    that.tbSelectedArr.map(v => {idArr.push(v.id);});
                    api.sysYjsInfoDel(idArr.join(',')).then((res) => {
                        if(res.data.status === 200) {
                            that.$message.success('操作成功');
                            that.getTableData();
                        }
                    });
                }).catch();
            },
            detail: function() {
                let that = this;

                that.$router.push({
                    path: `/personnel/graduate/detail`,
                    query: {
                        id: that.tbChosenRow.id,
                        _lpq: JSON.stringify(that.tbDataFilter),
                    }
                });
            },
            download: function() {
                let that = this;

                that.$confirm('确认导出当前数据吗？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '导出 excel',
                    cancelButtonText: '取消'
                }).then(() => {
                    api.sysYjsInfoExport({
                        name: that.tbDataFilter.name,
                        phoneNumber: that.tbDataFilter.phoneNumber,
                    }).then((res) => {
                        if(res.status === 200) {
                            that.man.file.blobAsFile(res, '人员信息');
                        }
                    });
                }).catch();
            },
            resetPassword: function() {
                let that = this;
                /*if(!that.man.fast.inArray('sys:user:del', that.userInfo.permissions)) {
                    that.$message.warning('您无权限进行此操作');
                    return;
                }*/

                that.$confirm('确认要重置该人员的密码吗？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '重置密码',
                    cancelButtonText: '取消'
                }).then(() => {
                    api.sysYjsInfoPwd({
                        userId: that.tbChosenRow.id,
                        pwd: '123456',
                    }).then((res) => {
                        if(res.data.status === 200) {
                            that.$message.success('操作成功');
                            that.getTableData();
                        }
                    });
                }).catch();
            },
            showDlRole: function() {
                let that = this;

                ajax.all([
                    api.sysYjsInfoFind(that.tbChosenRow.id),
                    api.sysRoleSelect(),
                ]).then((res) => {
                    if(res[0].data.status === 200 && res[1].data.status === 200) {
                        that.dlParams = {
                            detail: {...res[0].data.data},
                            seloptsRole: [...res[1].data.data],
                        };
                        that.dlRoleVisible = true;
                    }
                });
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