<template>

    <el-row class="_root_page wh-bf-100">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row type="flex">
                <!-- 树 -->
                <el-row class="block-has-title menu-tree">
                    <el-row type="flex" justify="space-between" class="title">
                        <span>菜单树</span>
                    </el-row>
                    <el-row class="hr mg-t-10 mg-b-15 mg-lr--10"></el-row>
                    <el-scrollbar class="elsb">
                        <el-table ref="multipleTable" :data="tbData.data"
                                  tooltip-effect="dark" size="small"
                                  row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                                  @current-change="chooseCurrentRow"
                                  :show-header="false" highlight-current-row border>
                            <!--  default-expand-all -->
                            <el-table-column fixed="left" show-overflow-tooltip min-width="120">
                                <template slot-scope="scope">
                                    <span :class = "{btnStyle:scope.row.isBtn}">{{ scope.row.title }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-scrollbar>
                </el-row>
                <!-- 编辑 -->
                <el-row class="block-has-title edit">
                    <el-row type="flex" justify="space-between" class="title">
                        <span>{{form.isBtn ? '按钮' : '菜单'}}详情 / 编辑</span>
                    </el-row>
                    <el-row class="hr mg-t-10 mg-b-15 mg-lr--10"></el-row>
                    <el-row class="fm">
                        <el-form ref="fm" :model="form" size="small" label-position="right" label-width="90px">
                            <el-row>
                                <el-form-item prop="title" :label="(form.isBtn ? '按钮' : '菜单') + '标题'" :rules="[
                                          {required: true, message: '请填写菜单标题'},
                                          {type: 'string', min: 1, max: 50, message: '长度为 50 个字符'},
                                          // {validator: validateAllSpace, message: '请填写角色编号'}
                                      ]">
                                    <el-input v-model="form.title" placeholder="菜单标题" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="formKey" label="form key" :rules="[
                                          {required: false, message: '请填写 form key'},
                                          {type: 'string', min: 1, max: 50, message: '长度为 50 个字符'},
                                          // {validator: validateAllSpace, message: '请填写角色编号'}
                                      ]">
<!--                                    <el-input v-model="form.formKey" placeholder="form key" :disabled="!!!Object.keys(rowBeforeEdit).length" clearable></el-input>-->
                                    <!-- <el-input v-model="form.formKey" placeholder="" :disabled="!!!form.editable" clearable></el-input> -->
                                    <el-input v-model="form.formKey" placeholder="" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row type="flex" justify="center" align="middle" class="page-default-pd-bgc-white edit-page-options-btn mg-t-5">
                                <el-button type="default" size="small" icon="el-icon-refresh-left" @click="resetLine" class="btn">撤销编辑</el-button>
                                <el-button type="primary" size="small" icon="el-icon-finished" :loading="btnLoadingSave" @click="save" class="btn">保存修改</el-button>
                            </el-row>
                        </el-form>
                    </el-row>
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

                form: {},
                rowBeforeEdit: {},
                btnLoadingSave: false,
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

                api.menuList(params).then((res) => {
                    if(res.data.status === 200) {
                        that.tbData = {...res.data};
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

            chooseCurrentRow: function(currentRow, oldChooseRow) {
                let that = this;
                // console.log(currentRow, oldChooseRow);

                that.rowBeforeEdit = {...currentRow};
                that.form = {...currentRow};
            },
            resetLine: function() {
                let that = this;

                that.$confirm('确认要撤销所编辑的数据吗？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '重置',
                    cancelButtonText: '取消'
                }).then(() => {
                    that.$message.info('已撤销编辑');
                    that.form = {...that.rowBeforeEdit};
                }).catch();
            },
            save: function() {
                let that = this;
                // console.log(that.form);

                that.$refs["fm"].validate(valid => {
                    if (valid) {
                        that.btnLoadingSave = true;

                        api.menuEdit({
                            id: that.form.id,
                            title: that.form.title,
                            formKey: that.form.formKey,
                        }).then((res) => {
                            // console.log(res);
                            that.btnLoadingSave = false;

                            if(res.data.status === 200) {
                                that.$message.success('保存成功');
                                that.getTableData();
                            }
                        });
                    } else {return false;}
                });
            },
        }
    }

</script>

<style lang="scss" scoped>

    ._root_page {

        .block-has-title {
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
            }
        }

        .menu-tree {
            min-width: 350px;
            margin-right: 15px;

            .elsb {
                height: calc(100vh - 300px);
                margin-right: -8px;
                padding-right: 10px;
            }
        }
        .edit {
            /*width: calc(100vw - 350px);*/
            width: 450px;
            height: 250px;

            .btn-options {

            }
        }


        .hr {border-bottom: 1px solid #EBEEF5;}
        .mg-lr--10 {margin-left: -10px; margin-right: -10px;}
    }

    .btnStyle{
        background:#1890FF;
        color:#fff;
        border-radius:4px;
        padding:2px 6px;
    }
</style>