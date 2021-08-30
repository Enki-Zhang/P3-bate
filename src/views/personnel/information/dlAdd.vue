<template>

    <el-dialog top="20vh" width="588px" :title="'新建账号'" :visible.sync="dialogVisible"
               @opened="opened" @closed="closed" :before-close="beforeClose"
               :close-on-click-modal="false" append-to-body class="_root_page">
        <el-row>
            <el-form ref="fm" :model="form" size="small" label-position="right" label-width="120px">
                <el-row>
                    <el-form-item prop="username" label="登录账号" :rules="[
                            {required: true, message: '请填写登录账号'},
                            {type: 'string', min: 1, max: 20, message: '长度为 1 ~ 20 个字符'},
                            {validator: validateAllSpace, message: '请填写登录账号'}
                        ]">
                        <el-input v-model="form.username" placeholder="登录账号" clearable></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item prop="password" label="初始密码">
                        <el-input v-model="form.password" placeholder="初始密码" disabled clearable></el-input>
                    </el-form-item>
                </el-row>
                <!--<el-row>
                    <el-form-item prop="username" label="姓名">
                        <el-input v-model="form.username" placeholder="姓名" disabled clearable></el-input>
                    </el-form-item>
                </el-row>-->
                <el-row>
                    <el-form-item prop="phone" label="手机号码" :rules="[
                            {required: true, message: '请填写手机号码'},
                            {type: 'string', min: 11, max: 11, message: '长度为 11 个字符'},
                            {validator: validatePhone, message: '请填写手机号码'}
                        ]">
                        <el-input v-model="form.phone" placeholder="手机号码" clearable></el-input>
                    </el-form-item>
                </el-row>
                <!--<el-row>
                    <el-form-item prop="roleIdArr" label="组别" :rules="[
                            {required: true, message: '请选择组别'},
                            {type: 'array', min: 1, message: '请选择组别'},
                            {validator: validateNullArray, message: '请选择组别'}
                        ]">
                        <el-select v-model="form.roleIdArr" multiple>
                            <el-option v-for="(v, k) in seloptsRole" :key="k"
                                       :label="v.role" :value="v.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>-->
            </el-form>
        </el-row>
        <el-row slot="footer" class="dialog-footer">
            <el-row type="flex" justify="center" align="middle">
                <el-button type="default" icon="el-icon-refresh-left" size="small" @click="closed" class="fn-btn">取 消</el-button>
                <el-button type="primary" icon="el-icon-finished" size="small" @click="save" class="fn-btn">保 存</el-button>
            </el-row>
        </el-row>
    </el-dialog>

</template>

<script>

    import {mapState} from 'vuex';
    import api from '@api';
    import {
        validateAllSpace,
        validatePhone,
        validateNullArray,
    } from '@plugins/man/validate';

    export default {
        name: "dlAdd",
        props: {
            value: Boolean,
            params: Object,
        },
        data() {
            return {
                validateAllSpace,
                validatePhone,
                validateNullArray,
                dialogVisible: false,

                seloptsRole: [],

                form: {
                    username: '',
                    password: '123456',
                    phone: '',
                    // roleIdArr: [],
                },
                btnLoadingSave: false,
            }
        },
        computed: {
            ...mapState(['userInfo']),
        },
        watch: {
            value(val) {
                this.dialogVisible = val;
            },
            dialogVisible(val) {
                this.$emit("input", val);
            }
        },
        methods: {
            opened: function() {
                let that = this;

                that.getAllRole();
            },

            getAllRole: function() {
                let that = this;

                api.sysRoleSelect().then((res) => {
                    if(res.data.status === 200) {
                        that.seloptsRole = [...res.data.data];
                    } else {
                        that.$message.error('组别加载失败');
                        that.closed();
                    }
                });
            },
            save: function() {
                let that = this;

                that.$refs.fm.validate(valid => {
                    if(valid) {
                        that.btnLoadingSave = true;

                        api.sysUserSave({
                            ...that.form,
                            // roleIds: that.form.roleIdArr.join(',')
                        }).then((res) => {
                            // console.log(res);
                            that.btnLoadingSave = false;

                            if(res.data.status === 200) {
                                that.dialogVisible = false;
                                that.$message.success('操作成功');
                                that.$emit('closed', 'success');
                            }
                        });
                    } else {return false;}
                });
            },

            beforeClose: function(done) {
                done();
            },
            closed: function() {
                if(this.$refs.fm !== undefined) this.$refs.fm.resetFields();
                this.dialogVisible = false;
            },
        }
    }

</script>

<style lang="scss" scoped>

    ._root_page {

        ::v-deep {}
    }

</style>