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
                                    <span :class="{btnStyle:scope.row.isBtn}">{{ scope.row.title }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-scrollbar>
                </el-row>
                <!-- 编辑 -->
                <el-row class="block-has-title edit">
                    <el-row type="flex" justify="space-between" class="title">
                        <span>菜单树操作项目</span>
                    </el-row>
                    <el-row class="hr mg-t-10 mg-b-15 mg-lr--10"></el-row>
                    <el-row class="fm">
                        <el-form ref="fm" :model="form" size="small" label-position="right" label-width="110px">
                            <!--<el-row>
                                <el-form-item prop="" label="所属父类菜单" :rules="[
                                          {required: true, message: '请填写菜单标题'},
                                          {type: 'string', min: 1, max: 50, message: '长度为 50 个字符'},
                                          // {validator: validateAllSpace, message: '请填写角色编号'}
                                      ]">
                                    <el-select v-model="form">
&lt;!&ndash;                                        <el-option ></el-option>&ndash;&gt;
                                    </el-select>
                                </el-form-item>
                            </el-row>-->
                            <el-row>
                                <el-form-item prop="title" :label="(form.isBtn ? '按钮' : '菜单') + '标题'" :rules="[
                                          {required: true, message: '请填写菜单标题'},
                                          {type: 'string', min: 1, max: 50, message: '长度为 50 个字符'},
                                          // {validator: validateAllSpace, message: '请填写角色编号'}
                                      ]">
                                    <el-input v-model="form.title" placeholder="菜单标题" style="width: 280px;" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="type" label="类型">
                                    <el-radio v-model="form.type" :label="0">菜单</el-radio>
                                    <el-radio v-model="form.type" :label="1">按钮</el-radio>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="formIds" label="form key" :rules="[
                                          // {required: false, message: '请选择 form key'},
                                          // {type: 'string', min: 1, message: '请选择 form key'},
                                          // {validator: validateAllSpace, message: '请填写角色编号'}
                                      ]">
                                    <el-select v-model="form.formIds" placeholder="请选择 form key"
                                               @visible-change="handleChangeFormKey"
                                               style="width: 280px;" multiple>
                                        <el-option label="-- 无 form key --" :value="0"></el-option>
                                        <el-option v-for="v in seloptsFormKey" :key="v.id"
                                                   :label="v.formName" :value="v.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-row>
                            <el-row class="mg-lr-25">
                                <el-table ref="multipleTable" :data="fieldData"
                                          :min-height="460" size="small"
                                          tooltip-effect="dark" class="dp-pc"
                                          highlight-current-row>
                                    <el-table-column label="字段名称" fixed="left" show-overflow-tooltip min-width="100">
                                        <template slot-scope="scope">
                                            <el-input v-model="fieldData[scope.$index].fieldKey" size="small"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="显示名称" show-overflow-tooltip min-width="100">
                                        <template slot-scope="scope">
                                            <el-input v-model="fieldData[scope.$index].showName" size="small"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="表单项" show-overflow-tooltip min-width="140">
                                        <template slot-scope="scope">
                                            <el-select v-model="fieldData[scope.$index].formFieldId" size="small"
                                                       @change="generateFormItemChosen">
                                                <el-option v-for="v in seloptsFormItem" :key="v.id"
                                                           v-if="!man.fast.inArray(v.id, chosenFormItemIdArr)"
                                                           :label="v.attr_name" :value="v.id"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="是否搜索条件" show-overflow-tooltip min-width="80">
                                        <template slot-scope="scope">
                                            <el-checkbox v-model="fieldData[scope.$index].search"></el-checkbox>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="" show-overflow-tooltip width="80">
                                        <template slot-scope="scope">
                                            <el-link type="primary" @click="removeField(scope.$index)" :underline="false">删除</el-link>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-row>
                            <el-row class="mg-lr-25 mg-tb-10">
                                <el-link type="primary" icon="el-icon-plus" @click="addField" :underline="false">新增</el-link>
                            </el-row>
                            <el-row type="flex" justify="center" align="middle" class="page-default-pd-bgc-white mg-t-50">
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
                seloptsFormKey: [],
                seloptsFormItem: [],

                tbSelectedArr: [],
                tbFilter: {
                    title: '',
                    createTime: [],
                },
                tbData: {records: []},
                tbDataFilter: {...this.tbFilter},
                btnLoadingFilter: false,

                form: {
                    formIds: [],
                },
                rowBeforeEdit: {},
                fieldData: [],
                fieldDataOrigin: [],
                chosenFormItemIdArr: [],
                btnLoadingSave: false,
            }
        },
        created() {
            this.initSeloptsFormKey();
        },
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
                // that.form = {...currentRow};

                api.menuFind(currentRow.id).then((res) => {
                    if(res.data.status === 200) {
                        that.form = {
                            ...res.data.data,
                            type: res.data.data.isBtn,
                        };
                        if(res.data.data.formIds.length > 0) that.handleChangeFormKey(false, true);
                    }
                });
                api.menuFindMenuFormConfigById(currentRow.id).then((res) => {
                    if(res.data.status === 200) {
                        that.fieldData = [...res.data.data];
                        that.fieldDataOld = [...res.data.data];
                    }
                });
            },
            handleChangeFormKey: function(val, isInit = false) {
                let that = this;
                // console.log(that.form.formIds);return;

                if(val === false) {
                    that.seloptsFormItem = [];
                    if(!isInit) {
                        that.fieldData = [];
                        that.chosenFormItemIdArr = [];
                    }
                    if(that.form.formIds.length > 0) {
                        api.customFormFindList(that.form.formIds.join(',')).then((res) => {
                            if(res.data.status === 200) {
                                res.data.data.map(v => {
                                    if(v.keyInfo.length > 0) that.seloptsFormItem = that.seloptsFormItem.concat(JSON.parse(v.keyInfo));
                                });
                                // console.log(that.seloptsFormItem);
                            }
                        });
                    }
                }
            },
            generateFormItemChosen: function() {
                let that = this;

                that.chosenFormItemIdArr = [];
                that.fieldData.map(v => {
                    that.chosenFormItemIdArr.push(v.formFieldId);
                });
                // console.log(that.chosenFormItemIdArr);
            },
            addField: function() {
                let that = this;

                that.fieldData.push({
                    fieldKey: '',
                    showName: '',
                    formFieldId: '',
                    search: false,
                });
                // console.log(that.fieldData);
            },
            removeField: function(index) {
                let that = this;

                that.fieldData.splice(index, 1);
                that.generateFormItemChosen();
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

                that.$refs["fm"].validate(valid => {
                    if (valid) {
                        that.btnLoadingSave = true;

                        api.menuEdit({
                            id: that.form.id,
                            title: that.form.title,
                            type: that.form.type,
                            formIds: that.form.formIds,
                            menuFormConfigForms: [...that.fieldData],
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

            initSeloptsFormKey: function() {
                let that = this;

                api.customFormSelect().then((res) => {
                    if(res.data.status === 200) {
                        that.seloptsFormKey = [...res.data.data];
                    }
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
            min-width: 720px;
            height: max-content;

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