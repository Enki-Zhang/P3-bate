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
                                               @remove-tag="(val) => {handleChangeFormKey(false, false, val)}"
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
                                    <el-table-column label="表单项" show-overflow-tooltip min-width="180">
                                        <template slot-scope="scope">
                                            <el-select v-model="fieldData[scope.$index].formConfig" size="small"
                                                       value-key="vk"
                                                       @change="handleFormItemChosen" multiple>
                                                <el-option-group v-for="v in seloptsFormItem" :key="v.id" :label="v.label">
                                                    <el-option v-for="vv in v.children" :key="`${v.id}-${v.formKey}-${vv.id}`"
                                                               v-if="!man.fast.inArray(`${v.id}-${v.formKey}-${vv.id}`, chosenFormItemIdArr)"
                                                               :label="vv.attr_name" :value="vv.jsonVal">
                                                    </el-option>
                                                    <!-- v-if="!man.fast.inArray(v.id, chosenFormItemIdArr)" -->
                                                </el-option-group>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="是否搜索条件" show-overflow-tooltip width="95">
                                        <template slot-scope="scope">
                                            <el-checkbox v-model="fieldData[scope.$index].search"></el-checkbox>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="" show-overflow-tooltip width="60">
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
                                <el-button type="default" size="small" icon="el-icon-refresh-left" @click="resetEdit" class="btn">撤销编辑</el-button>
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
                        let tmp = [];
                        res.data.data.map(v => {
                            // console.log(v.formConfig);
                            let tmpJS = [];
                            v.formConfig.map(vv => {
                                tmpJS.push(JSON.stringify(vv));
                            });
                            tmp.push({
                                ...v,
                                formConfig: [...tmpJS],
                            });
                        });
                        that.fieldData = [...tmp];
                        that.$forceUpdate();
                    }
                });
            },
            handleChangeFormKey: function(val, isInit = false, removeVal = -1) {
                let that = this;
                // console.log(removeVal);
                // console.log(that.form.formIds);return;

                if(val === false) {
                    that.seloptsFormItem = [];
                    if(!isInit) {
                        // that.fieldData = [];
                        that.chosenFormItemIdArr = [];
                    }
                    if(that.form.formIds.length > 0) {
                        // 初始化表单项下拉
                        api.customFormFindList(that.form.formIds.join(',')).then((res) => {
                            if(res.data.status === 200) {
                                res.data.data.map(v => {
                                    let tmp = {
                                        label: v.formName,
                                        id: v.id,
                                        formKey: v.formKey,
                                        children: [],
                                    };
                                    if(v.keyInfo.length > 0) {
                                        let tmpChildren = JSON.parse(v.keyInfo);
                                        tmpChildren.map(vv => {
                                            vv[`formId`] = v.id;
                                            vv[`formKey`] = v.formKey;
                                            vv[`vk`] = `${v.id}-${vv.id}`;
                                            vv[`jsonVal`] = JSON.stringify({formFieldId: vv.id, formId: v.id, formKey: v.formKey});
                                            tmp.children.push(vv);
                                        });
                                    }
                                    that.seloptsFormItem.push(tmp);
                                });
                                // console.log(that.seloptsFormItem);
                            }
                        });
                    }

                    // 移除已选的已移除 formKey 的表单项
                    that.fieldData.map((v, k) => {
                        if(v.formConfig.length > 0) {
                            let tmpArr = [];
                            v.formConfig.map(vv => {
                                let tmp = JSON.parse(vv);
                                if(that.man.fast.inArray(tmp.formId, that.form.formIds)) tmpArr.push(vv);
                            });
                            v.formConfig = [...tmpArr];
                        }
                        that.fieldData[k] = v;
                    });
                    // console.log(that.fieldData);

                    that.handleFormItemChosen();
                }
            },
            handleFormItemChosen: function() {
                let that = this;

                that.chosenFormItemIdArr = [];
                that.fieldData.map(v => {
                    v.formConfig.map(vv => {
                        let tmp = JSON.parse(vv);
                        that.chosenFormItemIdArr.push(`${tmp.formId}-${tmp.formKey}-${tmp.formFieldId}`);
                    });
                });
                // console.log(that.chosenFormItemIdArr);
            },
            addField: function() {
                let that = this;

                that.fieldData.push({
                    fieldKey: '',
                    showName: '',
                    formConfigs: [],
                    search: false,
                });
                // console.log(that.fieldData);
            },
            removeField: function(index) {
                let that = this;

                that.fieldData.splice(index, 1);
                that.handleFormItemChosen();
            },
            resetEdit: function() {
                let that = this;
                console.log(that.fieldData);
                return;

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

                        let data = {
                            id: that.form.id,
                            title: that.form.title,
                            type: that.form.type,
                            formIds: that.form.formIds,
                            menuFormConfigForms: [],
                        };
                        that.fieldData.map((v, k) => {
                            let tmpArr = [];
                            v.formConfig.map(vv => {
                                let tmp = JSON.parse(vv);
                                tmpArr.push({
                                    formFieldId: tmp.formFieldId,
                                    formId: tmp.formId,
                                    formKey: tmp.formKey,
                                });
                            });
                            v.formConfigs = [...tmpArr];
                            delete v.formConfig;
                            data.menuFormConfigForms[k] = {...v};
                        });
                        // console.log(data); return;
                        api.menuEdit(data).then((res) => {
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
            min-width: 320px;
            margin-right: 15px;

            .elsb {
                height: calc(100vh - 300px);
                margin-right: -8px;
                padding-right: 10px;
            }
        }
        .edit {
            width: calc(100vw - 320px);
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