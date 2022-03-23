<template>

    <el-row class="wh-bf-100">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white-default-h">
                <el-row class="fm fm-max-w">
                    <el-form ref="fm" :model="form" label-position="right" label-width="200px">
                        <el-row>
                            <el-form-item prop="id" label="角色编号" size="small"
                                          :rules="[
                                          {required: true, message: '请填写角色编号'},
                                          {type: 'string', min: 1, max: 50, message: '长度为 50 个字符'},
                                          {validator: validateAllSpace, message: '请填写角色编号'}
                                      ]">
                                <el-input v-model="form.id" placeholder="角色编号" :disabled="!!$route.params.id" clearable></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item prop="role" label="角色名称" size="small"
                                          :rules="[
                                          {required: true, message: '请填写角色名称'},
                                          {type: 'string', min: 1, max: 50, message: '长度为 50 个字符'},
                                          {validator: validateAllSpace, message: '请填写角色名称'}
                                      ]">
                                <el-input v-model="form.role" placeholder="角色名称" clearable></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item prop="description" label="角色描述" size="small"
                                          :rules="[
                                          {required: true, message: '请填写角色描述'},
                                          {type: 'string', min: 1, max: 50, message: '长度为 50 个字符'},
                                          {validator: validateAllSpace, message: '请填写角色描述'}
                                      ]">
                                <el-input v-model="form.description" placeholder="角色描述"
                                          type="textarea" :autosize="{minRows: 3}" resize="none"
                                          clearable></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item prop="permission" label="角色权限" size="small"
                                          :rules="[
                                              // {required: true, message: '至少勾选一项'},
                                              // {validator: validateNullArray, message: '至少勾选一项'}
                                      ]">
                                <el-table ref="multipleTable" :data="allRoles" tooltip-effect="dark"
                                          :height="screenHeight - 460" size="small"
                                          row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                                          highlight-current-row border default-expand-all>
                                    <el-table-column label="模块标题" fixed="left" show-overflow-tooltip min-width="120">
                                        <template slot-scope="scope">{{ scope.row.title }}</template>
                                    </el-table-column>
                                    <el-table-column label="功能权限" show-overflow-tooltip min-width="280">
                                        <template slot-scope="scope">
                                            <el-checkbox-group v-model="form.permission">
                                                <el-checkbox v-for="(v, k) in scope.row.permissions" :key="v.id" :label="v.value">{{ v.name }}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </el-row>
            </el-row>
            <el-row type="flex" justify="center" align="middle" class="page-default-pd-bgc-white edit-page-options-btn">
                <el-button type="default" size="small" icon="el-icon-refresh-left" @click="cancel" class="btn">返回列表</el-button>
                <el-button type="primary" size="small" icon="el-icon-finished" :loading="btnLoadingSave" @click="save" class="btn">保存修改</el-button>
            </el-row>
        </el-row>

        <!-- 组件 -->
    </el-row>

</template>

<script>

    import {mapState} from 'vuex';
    import api from '@api';
    import {
        validateAllSpace,
        validateNullArray,
    } from '@plugins/man/validate';
    const listRoutePath = '/personnel/organization';

    export default {
        name: "edit",
        data() {
            return {
                validateAllSpace,
                validateNullArray,

                form: {
                    id: this.man.fast.getUUID(),
                    permission: [],
                },
                btnLoadingSave: false,
                allRoles: [],
            }
        },
        beforeCreate() {
            this.$toast.loading('正在加载');
        },
        created() {
            this.$store.commit('setPageTitle', `${this.$route.query.id ? '编辑' : '新增'}权限`);

            if(this.$route.query.id) this.getDetail(this.$route.query.id);
            this.getAllPermissions();
            // this.testTbData();
        },
        computed: {
            ...mapState(['userInfo', 'screenHeight']),
        },
        methods: {
            save: function() {
                let that = this;
                // console.log(that.form);

                that.$refs["fm"].validate(valid => {
                    if (valid) {
                        that.btnLoadingSave = true;

                        if(that.$route.query.id.length > 0) {
                            api.sysRoleEdit({
                                ...that.form,
                                permission: that.form.permission.join(','),
                            }).then((res) => {
                                // console.log(res);
                                that.btnLoadingSave = false;

                                if(res.data.status === 200) {
                                    that.$message.success('保存成功');
                                    that.$router.push({name: listRoutePath, params: {_lpq: JSON.parse(that.$route.params._lpq)}});
                                }
                            });
                        } else {
                            api.sysRoleAdd({
                                ...that.form,
                                permission: that.form.permission.join(','),
                            }).then((res) => {
                                // console.log(res);
                                that.btnLoadingSave = false;

                                if(res.data.status === 200) {
                                    that.$message.success('保存成功');
                                    that.$router.push({path: listRoutePath, query: {_lpq: JSON.parse(that.$route.query._lpq)}});
                                }
                            });
                        }
                    } else {return false;}
                });
            },
            cancel: function() {
                let that = this;

                that.$confirm('是否取消编辑内容并返回列表', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '返回列表',
                    cancelButtonText: '取消'
                }).then(() => {
                    that.$router.push({path: listRoutePath, query: {_lpq: JSON.parse(that.$route.query._lpq)}});
                }).catch();
            },

            getDetail: function(id) {
                let that = this;

                api.sysRoleFind(id).then((res) => {
                    // console.log(res.data);

                    if(res.data.status === 200) {
                        that.form = {...res.data.data};
                    }
                });
            },
            getAllPermissions: function() {
                let that = this;

                api.menuTree({}).then((res) => {
                    // console.log(res);
                    if(res.data.status === 200) {
                        that.allRoles = [...res.data.data];
                        that.$toast.clear();
                    }
                });
            },


            // 静态数据测试用
            testTbData: function() {
                let that = this;

                that.allRoles = [
                    {
                        id: 1,
                        title: '内容管理',
                        permissions: [{name: '查看', value: 'content'}],
                        children: [
                            {
                                id: 11,
                                title: '文章管理',
                                permissions: [
                                    {name: '查看', value: 'content:article'},
                                    {name: '新增', value: 'content:article:add'},
                                    {name: '修改', value: 'content:article:edit'},
                                    {name: '删除', value: 'content:article:del'},
                                ],
                            },
                            {
                                id: 12,
                                title: '产品管理',
                                permissions: [
                                    {name: '查看', value: 'content:product'},
                                    {name: '新增', value: 'content:product:add'},
                                    {name: '修改', value: 'content:product:edit'},
                                    {name: '删除', value: 'content:product:del'},
                                ],
                            },
                        ]
                    },
                ];
                that.$toast.clear();
            },
        }
    }

</script>

<style scoped>

</style>