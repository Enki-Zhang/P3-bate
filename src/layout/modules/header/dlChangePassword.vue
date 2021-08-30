<template>

    <el-dialog top="20vh" width="588px" :title="`修改登录密码`" :visible.sync="dialogVisible"
               @opened="opened" @closed="closed" :before-close="beforeClose"
               :close-on-click-modal="false" append-to-body>
        <el-row>
            <el-form ref="fm" :model="form" label-position="right" label-width="80px">
                <el-row>
                    <el-form-item prop="oldPwd" label="当前密码" size="small" :rules="[
                            {required: true, message: '请填写当前密码'},
                            {type: 'string', min: 5, max: 30, message: '长度应为 5 ~ 30 个字符'},
                        ]">
                        <el-input v-model="form.oldPwd" type="password" placeholder="当前密码" clearable></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item prop="newPwd" label="新的密码" size="small" :rules="[
                            {required: true, message: '请填写新的密码'},
                            {type: 'string', min: 5, max: 30, message: '长度应为 5 ~ 30 个字符'},
                        ]">
                        <el-input v-model="form.newPwd" type="password" placeholder="新的密码" clearable></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item prop="confirmPwd" label="确认密码" size="small" :rules="[
                            {required: true, message: '请填写确认密码'},
                            {type: 'string', min: 5, max: 30, message: '长度应为 5 ~ 30 个字符'},
                            {validator: (rule, value, callback) => {validateTwicePassword(rule, value, callback, form.newPwd)}, message: '两次输入的密码不一致'}
                        ]">
                        <el-input v-model="form.confirmPwd" type="password" placeholder="确认密码" clearable></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
        </el-row>
        <el-row slot="footer" class="dialog-footer">
            <el-row type="flex" justify="center" align="middle">
                <el-button type="default" size="small" @click="closed" class="fn-btn">取 消</el-button>
                <el-button type="primary" size="small" @click="save" class="fn-btn">保 存</el-button>
            </el-row>
        </el-row>
    </el-dialog>

</template>

<script>

    import {mapState} from 'vuex';
    import api from '@api';
    import {validateTwicePassword} from '@plugins/man/validate';

    export default {
        name: "edit",
        props: {
            value: Boolean,
        },
        data() {
            return {
                validateTwicePassword,
                dialogVisible: false,

                form: {
                    oldPwd: '',
                    newPwd: '',
                    confirmPwd: '',
                },
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

            },

            save: function() {
                let that = this;

                that.$refs.fm.validate(valid => {
                    if(valid) {
                        that.btnLoadingSave = true;

                        api.updatePwdAdmin({
                            ...that.form,
                            // userId: that.userInfo.user.userId
                        }).then((res) => {
                            // console.log(res);

                            if(res.data.status === 200) {
                                that.btnLoadingSave = false;
                                that.dialogVisible = false;

                                that.$message.success('登录密码修改成功');
                            } else {that.btnLoadingSave = false;}
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

<style scoped>

</style>