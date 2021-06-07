<template>

    <el-row type="flex" justify="center" class="login">
        <el-tabs v-model="activeTab">
            <el-tab-pane label="手机号登录" name="phone">
                <el-row class="fm">
                    <el-form ref="fmLogin" :model="fmLogin"
                             label-position="right"
                             class="fm-login pd-t-25"
                             @submit.native.prevent>
                        <el-form-item prop="mobile" :rules="[
                            {required: true, message: '请填写手机号'},
                            {type: 'string', min: 11, max: 11, message: '长度为 11 位'},
                            {validator: validatePhone, message: '手机号码格式错误'}
                        ]">
                            <el-input v-model="fmLogin.mobile" placeholder="手机号"
                                      prefix-icon="el-icon-mobile" clearable></el-input>
                        </el-form-item>
                        <el-row :gutter="8">
                            <el-col :span="14">
                                <el-form-item prop="code" :rules="[
                                        {required: true, message: '请填写验证码'},
                                        {type: 'string', min: 4, max: 6, message: '长度为 6 位'}
                                    ]">
                                    <el-input v-model="fmLogin.code" placeholder="验证码"
                                              prefix-icon="el-icon-message" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-button type="primary"
                                           :disabled="btnDisabledCode"
                                           :loading="btnCodeLoading"
                                           @click="sendCode">{{ btnCodeText }}</el-button>
                            </el-col>
                        </el-row>
                        <el-form-item>
                            <el-checkbox v-model="rememberMe">记住手机号</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" :loading="btnLoginLoading" :disabled="btnDisabledLogin" @click="login">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </el-row>

</template>

<script>

    import api from "@api";

    // 手机号验证
    const validatePhone = (rule, value, callback) => {
        let reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
        if (!(reg.test(value))) {
            callback(new Error());
        } else {
            callback();
        }
    };

    export default {
        name: "auth_login",
        data() {
            return {
                validatePhone,
                activeTab: 'phone',

                fmLogin: {
                    mobile: '',
                    code: '',
                },
                rememberMe: false,
                btnCodeText: '获取验证码',
                btnCodeLoading: false,
                btnLoginLoading: false,
            }
        },
        created() {
            // 开发环境自动补全
            if(!['production', 'prod'].includes(process.env.NODE_ENV)) {
                this.fmLogin.mobile = process.env.VUE_APP_AUTH_LOGIN_ACCOUNT;
                this.fmLogin.code = process.env.VUE_APP_AUTH_LOGIN_CODE;
            }

            // 记住手机号
            this.rememberMe = !!this.man.db.load('sys.loginForm.rememberMe');
            if(this.rememberMe) {
                this.fmLogin.mobile = this.man.db.load('sys.loginForm.mobile');
            }
            this.btnCodeText = this.man.db.load('sys.loginForm.btnCodeText') || '获取验证码';
            this.btnCodeLoading = !!this.man.db.load('sys.loginForm.btnCodeLoading');
            if(this.btnCodeLoading) {
                let tmpNow = this.man.db.load('sys.loginForm.btnCodeLoadingNow') || 60;
                this.codeCountDown(tmpNow - 1 > 0 ? tmpNow - 1 : 1);
            }
        },
        computed: {
            btnDisabledCode: function() {
                let reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
                return !(reg.test(this.fmLogin.mobile));
            },
            btnDisabledLogin: function() {
                return this.fmLogin.mobile.length < 1 || this.fmLogin.code.length < 1;
            },
        },
        watch: {
            "fmLogin.mobile": function(curVal, oldVal) {
                if (!curVal) {
                    this.fmLogin.mobile = '';
                    return false;
                }
                // 实时把非数字的输入过滤掉
                this.fmLogin.mobile = curVal.match(/\d/gi) ? curVal.match(/\d/gi).join("") : "";
            }
        },
        methods: {
            login: function() {
                let that = this;

                // 验证
                that.$refs['fmLogin'].validate((valid) => {
                    if (valid) {
                        that.btnLoginLoading = true;

                        // 鉴权
                        api.authLogin({
                            ...that.fmLogin,
                        }).then((res) => {
                            // console.log(res);
                            that.man.loading.openFullScreen();
                            that.$store.dispatch('user/setToken', res.data.result.token);
                            that.$store.dispatch('user/setUUID', res.data.result.id);
                            that.$store.dispatch('user/setUserInfo', res.data.result);

                            that.man.db.save('sys.loginForm.rememberMe', that.rememberMe);
                            that.man.db.save('sys.loginForm.mobile', that.fmLogin.mobile);
                            // 当前站点（主站/教育站）
                            console.log(!that.man.db.load('sys.webSite'));
                            if(!that.man.db.load('sys.webSite')) {
                                that.man.db.save('sys.webSite', 'main');
                                console.log(that.man.db.load('sys.webSite'));
                            }

                            setTimeout(function() {
                                that.man.loading.closeFullScreen();
                                that.$message.success('登录成功！欢迎回来');

                                // 需要回跳
                                if (that.man.db.load('tmp.needBack')) {
                                    that.man.db.save('tmp.needBack', false);
                                    if(that.man.db.load('sys.uuid') === res.data.result.id) {
                                        that.$router.push({
                                            path: that.man.db.load('tmp.backToRouteName'),
                                            query: that.man.db.load('tmp.backToRouteQuery'),
                                        });
                                    } else {
                                        that.man.db.save('tmp', {});
                                    }
                                }

                                that.$router.push({name: 'layout'});
                            }, 888);
                        });
                    }
                });
            },


            sendCode: function() {
                let that = this;

                api.smsLoginCode({
                    // mobile: that.fmLogin.phone,
                    mobile: '15711112222',
                    code: '',
                    uuid: ''
                }).then((res) => {
                    if(res.data.status === 200) {
                        that.$message.success('验证码已发送，请注意查收');

                        that.codeCountDown();
                        that.fmLogin.code = res.data.result;
                    } else {
                        that.$message.error(res.data.message);
                    }
                });
            },
            codeCountDown: function(now = 60) {
                let that = this;

                that.countDown(function(now) {
                    if(now) {
                        that.btnCodeText = '等待 ' + now + ' 秒';
                        that.btnCodeLoading = true;
                    } else {
                        that.btnCodeText = '获取验证码';
                        that.btnCodeLoading = false;
                    }
                    that.man.db.save('sys.loginForm.btnCodeText', that.btnCodeText);
                    that.man.db.save('sys.loginForm.btnCodeLoading', that.btnCodeLoading);
                    that.man.db.save('sys.loginForm.btnCodeLoadingNow', now);
                }, now);
            },
            countDown: function(dosomething = (function() {}), second = 10) {
                let now = second;
                let timerId = 0;

                timerId = setInterval(function() {
                    if(now > 0) {
                        now = now - 1;
                        dosomething(now);
                    } else {
                        window.clearInterval(timerId);
                    }
                }, 1000);
            },
        }
    }

</script>

<style lang="scss" scoped>

    .login {}

    .fm {width: 320px; height: 300px;}

    .login ::v-deep .el-tabs__header {display: flex; flex-direction: row; justify-content: center;}
    .login ::v-deep .el-tabs__nav-wrap {width: 70px;}

</style>