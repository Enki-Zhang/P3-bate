<template>

    <el-row class="wh-bf-100">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white-default-h">
                <el-row class="fm fm-max-w">
                    <el-form ref="fm" :model="form" label-position="right" size="small" label-width="200px">
                        <el-row>
                            <el-form-item prop="userContact" label="姓名" :rules="[
                                          {required: true, message: '请填写姓名'},
                                          {type: 'string', min: 2, max: 200, message: '长度为 2 ~ 200 个字符'},
                                          {validator: validateAllSpace, message: '请填写姓名'}
                                      ]">
                                <el-input v-model="form.userContact" placeholder="用户姓名" clearable></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item prop="type" label="性别" :rules="[
                                          {required: true, message: '请选择性别'},
                                          {type: 'number', min: 0, max: 1, message: '请选择性别'},
                                      ]">
                                <el-radio-group v-model="form.type">
                                    <el-radio :label="1">男</el-radio>
                                    <el-radio :label="2">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item prop="userContact" label="出生日期" :rules="[
                                          {required: true, message: '请选择日期'},
                                          {type: 'string', min: 2, max: 200, message: '长度为 2 ~ 200 个字符'},
                                          {validator: validateAllSpace, message: '请选择日期'}
                                      ]">
                                <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item prop="userMail" label="电子邮箱" :rules="[
                                          {required: true, message: '请填写电子邮箱'},
                                          {type: 'email', min: 1, max: 50, message: '请填写正确的邮箱'},
                                      ]">
                                <el-input v-model="form.userMail" placeholder="电子邮箱" clearable></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item prop="userPhone" label="手机号码" :rules="[
                                          {required: true, message: '请填写手机号码'},
                                          {type: 'string', len: 11, message: '长度为 11 个字符'},
                                          {validator: validatePhone, message: '请填写手机号码'}
                                      ]">
                                <el-input v-model="form.userPhone" placeholder="手机号码" clearable></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item prop="userAdd" label="住址">
                                <el-input v-model="form.userAdd" placeholder="住址" clearable></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item prop="userContact" label="组别" :rules="[
                                          {required: true, message: '请选择组别'},
                                      ]">
                                <el-select v-model="form.auditStatus">
                                    <el-option label="全部" value=""></el-option>
                                    <el-option label="待发布" :value="0"></el-option>
                                    <el-option label="已发布" :value="1"></el-option>
                                </el-select>
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
    const listRouteName = 'personnel_organization';

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
            // this.$toast.loading('正在加载');
        },
        created() {
            this.$store.commit('setPageTitle', `${this.$route.params.id ? '编辑' : '新增'}权限`);

            // this.form.id = this.man.fast.getUUID();
            if(this.$route.params.id) this.getDetail(this.$route.params.id);
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

                        if(that.$route.params.id) {
                            api.sysRoleEdit({
                                ...that.form,
                                permission: that.form.permission.join(','),
                            }).then((res) => {
                                // console.log(res);
                                that.btnLoadingSave = false;

                                if(res.data.status === 200) {
                                    that.$message.success('保存成功');
                                    that.$router.push({name: listRouteName, params: {_lpq: JSON.parse(that.$route.params._lpq)}});
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
                                    that.$router.push({name: listRouteName, params: {_lpq: JSON.parse(that.$route.params._lpq)}});
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
                    that.$router.push({name: listRouteName, params: {_lpq: JSON.parse(that.$route.params._lpq)}});
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

                api.menuList({}).then((res) => {
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