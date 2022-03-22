<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <!-- 筛选 -->
                <el-form ref="fmTbFilter" :model="tbFilter" size="small">
                    <el-row class="filters">
                        <el-form-item prop="username">
                            <el-row class="item">
                                <el-row class="lb lb-unmgl">名字查询</el-row>
                                <el-row><el-input v-model="tbFilter.username" placeholder="支持模糊查询" class="inp-small"></el-input></el-row>
                            </el-row>
                        </el-form-item>
                        <el-form-item prop="phone">
                            <el-row class="item mg-l-10">
                                <el-row class="lb lb-unmgl">手机号查询</el-row>
                                <el-row><el-input v-model="tbFilter.phone" placeholder="支持模糊查询" class="inp-small"></el-input></el-row>
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
                    <el-button type="primary" size="small" icon="el-icon-delete"
                               :disabled="!isSelectedItem"
                               @click="remove"
                               class="fn-btn">删除</el-button>
                    <el-button type="primary" size="small" icon="el-icon-view"
                               :disabled="!isChosenRow"
                               @click="detail"
                               class="fn-btn">查看</el-button>
                    <el-button type="primary" size="small" icon="el-icon-download"
                               :disabled="false"
                               @click="download"
                               class="fn-btn">下载</el-button>
                    <el-button type="primary" size="small" icon="el-icon-key"
                               :disabled="!isChosenRow"
                               @click="resetPassword"
                               class="fn-btn">重置密码</el-button>
                    <el-button type="primary" size="small" icon="el-icon-user"
                               :disabled="!isChosenRow"
                               @click="showDlRole"
                               class="fn-btn">组别</el-button>
                    <el-button v-if="man.fast.inArray('personnel_information|onboarding', btnNameForListArr)"
                               type="primary" size="small" icon="el-icon-document"
                               :disabled="!isChosenRow"
                               @click="toPre('personnel_information|onboarding')"
                               class="fn-btn">入职培训记录</el-button>
                    <el-button v-if="man.fast.inArray('personnel_information|resign', btnNameForListArr)"
                               type="primary" size="small" icon="el-icon-edit-outline"
                               :disabled="!isChosenRow"
                               @click="toPre('personnel_information|resign')"
                               class="fn-btn">退职手续办理</el-button>
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
                        <el-table-column label="序号" fixed="left" show-overflow-tooltip min-width="60">
                            <template slot-scope="scope">{{ scope.row.id }}</template>
                        </el-table-column>
                        <el-table-column label="用户名" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.username }}</template>
                        </el-table-column>
                        <el-table-column label="姓名" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="性别" show-overflow-tooltip min-width="60">
                            <template slot-scope="scope">{{ scope.row.sex ? '男' : '女' }}</template>
                        </el-table-column>
                        <el-table-column label="出生日期" show-overflow-tooltip min-width="100">
                            <template slot-scope="scope">{{ scope.row.birthday ? dayjs(scope.row.birthday).format('YYYY-MM-DD') : '' }}</template>
                        </el-table-column>
                        <!--<el-table-column label="电子邮箱" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">{{ scope.row.email }}</template>
                        </el-table-column>-->
                        <el-table-column label="手机号码" show-overflow-tooltip min-width="100">
                            <template slot-scope="scope">{{ scope.row.phoneNumber }}</template>
                        </el-table-column>
                        <el-table-column label="家庭住址" show-overflow-tooltip min-width="180">
                            <template slot-scope="scope">{{ scope.row.homeAddress }}</template>
                        </el-table-column>
                        <el-table-column label="身份证号" show-overflow-tooltip min-width="100">
                            <template slot-scope="scope">{{ scope.row.idNumber }}</template>
                        </el-table-column>
                        <el-table-column label="最高学历" show-overflow-tooltip min-width="100">
                            <template slot-scope="scope">{{ scope.row.highestEducation }}</template>
                        </el-table-column>
                        <el-table-column label="毕业院校" show-overflow-tooltip min-width="100">
                            <template slot-scope="scope">{{ scope.row.graduateInstitutions }}</template>
                        </el-table-column>
                        <el-table-column label="毕业专业" show-overflow-tooltip min-width="100">
                            <template slot-scope="scope">{{ scope.row.graduationMajor }}</template>
                        </el-table-column>
                        <el-table-column label="组别" show-overflow-tooltip min-width="100">
                            <template slot-scope="scope">{{ scope.row.groups }}</template>
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
        <dl-role v-model="dlRoleVisible" :params="dlParams" @done="getTableData()"></dl-role>
        <!-- 移动端：列表操作 -->
        <van-action-sheet v-model="asShow"
                          :description="asOptions.description"
                          :actions="asOptions.actions"
                          :cancel-text="asOptions.cancelText"
                          @select="choosedAction"
                          close-on-click-action/>
        <!-- 表单 -->
        <compForm ref="compForm" @getFormInfo="setCurrentBtnFormId" @success="submitForm"/>
    </el-row>

</template>

<script>

    import ajax from "@plugins/ajax";
    import dayjs from 'dayjs';
    import api from "@api";
    import dlAdd from "@views/personnel/information/dlAdd";
    import dlRole from "@views/personnel/information/dlRole";
    import compForm from "@/components/formPreview";

    export default {
        name: "index",
        components: {
            dlAdd,
            dlRole,
            compForm,
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
                    username: '',
                    phone: '',
                    createTime: [],
                },
                tbData: {list: []},
                tbDataFilter: {...this.tbFilter},
                btnLoadingFilter: false,
                btnNameForListArr: [],
                btnSet: {},
                currentBtnFormId: '',
            }
        },
        created() {
            this.initBtnForList();
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

                api.sysUserInfoList(params).then((res) => {
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
                    api.sysUserInfoDel(idArr.join(',')).then((res) => {
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
                    path: `/personnel/information/detail`,
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
                    api.sysUserInfoExport({
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
                    api.sysUserInfoPwd({
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
                    api.sysUserInfoFind(that.tbChosenRow.id),
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

            initBtnForList: function() {
                let that = this;
                that.btnNameForListArr = [];

                api.getMenuBtn({
                    name:'personnel_information'
                }).then((res) => {
                    if(res.data.status === 200) {
                        res.data.data.map(v => {
                            that.btnNameForListArr.push(v.name);

                            // 按钮跳转
                            let btnSet = JSON.parse(JSON.stringify(this.btnSet));
                            switch (v.name) {
                                case 'personnel_information|onboarding':
                                    btnSet['personnel_information|onboarding'] = {
                                        pre: {
                                            formId: v.formIds.length == 0 ? '' : v.formIds[0],
                                            formKey: v.formKeys.length == 0 ? '' : v.formKeys[0],
                                            sh: true,
                                        }
                                    };
                                    break;
                                case 'personnel_information|resign':
                                    btnSet['personnel_information|resign'] = {
                                        pre: {
                                            formId: v.formIds.length == 0 ? '' : v.formIds[0],
                                            formKey: v.formKeys.length == 0 ? '' : v.formKeys[0],
                                            sh: true,
                                        }
                                    };
                                    break;
                            }
                            this.btnSet = btnSet;
                        });
                    }
                });
            },
            toPre: function(key) {
                // console.log(this.btnSet[key].pre);
                let formId = this.btnSet[key].pre.formId;
                api.getFormInfo(formId).then((res) => {
                    if(res.data.status === 200) {
                        this.$refs.compForm.showFn(res.data.data.keyInfo, formId);
                    }
                });
            },
            submitForm: function(data) {
                let that = this;
                setTimeout(function() {
                    api.customFormInfoSave({
                        //documentId: that.detail.id,
                        formId: that.currentBtnFormId,
                        formInfo: data,
                        // uuid: that.man.fast.getUUID(),
                    }).then((res) => {
                        if(res.data.status === 200) {
                            that.$message.success('提交成功');
                        }
                    });
                }, 666)
            },
            setCurrentBtnFormId: function(res) {
                this.currentBtnFormId = res.formId;
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