<template>

    <el-row type="flex" justify="center" class="login">
        <el-row v-if="!needChoosePlatform" class="fm">
            <el-form ref="fmLogin" :model="fmLogin"
                     label-position="right"
                     class="fm-login pd-t-25"
                     @submit.native.prevent>
                <el-form-item prop="username" :rules="[
                            {required: true, message: '请填写帐号'},
                            {type: 'string', min: 1, max: 30, message: '帐号格式错误'},
                        ]">
                    <el-input v-model="fmLogin.username" placeholder="帐号"
                              prefix-icon="el-icon-user" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password" :rules="[
                            {required: true, message: '请填写密码'},
                            {type: 'string', min: 5, max: 30, message: '密码格式错误'},
                        ]">
                    <el-input v-model="fmLogin.password" type="password" placeholder="密码"
                              prefix-icon="el-icon-key" clearable></el-input>
                </el-form-item>
                <!--<el-row :gutter="8">
                    <el-col :span="14">
                        <el-form-item prop="imgCode" :rules="[
                                        {required: true, message: '请填写图形验证码'},
                                        {type: 'string', min: 4, max: 4, message: '长度为 4 位'}
                                    ]">
                            <el-input v-model="fmLogin.imgCode" placeholder="验证码"
                                      prefix-icon="el-icon-picture-outline" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <img :src="imgCodeSrc" title="点击图片刷新验证码" @click="getImgCode" class="cursor-pointer">
                        &lt;!&ndash;                                <img src="/image/imgCode.jpg" title="点击图片刷新验证码" @click="getImgCode" class="cursor-pointer">&ndash;&gt;
                    </el-col>
                </el-row>-->
                <!--<el-form-item>
                    <el-checkbox v-model="rememberMe">记住我</el-checkbox>
                </el-form-item>-->
                <el-form-item class="mg-t-10">
                    <el-button type="primary" :loading="btnLoginLoading" @click="login" native-type="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <!--<el-row v-else type="flex" justify="space-between" align="middle" class="platform">
            <el-row @click="" class="block">
                <div class="title">营商环境门户网站</div>
                <div class="title">后台管理入口</div>
                <div class="tips mg-t-20">入口</div>
            </el-row>
            <el-row class="block">
                <div class="title">营商环境管理系统</div>
                <div class="title"></div>
                <div class="tips mg-t-20">入口</div>
            </el-row>
        </el-row>-->
    </el-row>

</template>

<script>

    import api from "@api";
    import jsonAccount from '@mock/account.json';

    export default {
        name: "auth_login",
        data() {
            return {
                fmLogin: {
                    username: '',
                    password: '',
                    uuid: '',
                    imgCode: '',
                },
                imgCodeSrc: '',
                rememberMe: false,
                btnLoginLoading: false,

                needChoosePlatform: false,
            }
        },
        created() {
            // 开发环境自动补全
            if(!['production', 'prod'].includes(process.env.NODE_ENV)) {
                this.fmLogin.username = process.env.VUE_APP_AUTH_LOGIN_ACCOUNT;
                this.fmLogin.password = process.env.VUE_APP_AUTH_LOGIN_PASSWORD;
                // this.fmLogin.imgCode = process.env.VUE_APP_AUTH_LOGIN_CODE;
            }

            // 记住我
            /*this.rememberMe = !!this.man.db.load('sys.loginForm.rememberMe');
            if(this.rememberMe) {
                this.fmLogin.account = this.man.db.load('sys.loginForm.account');
                this.fmLogin.password = this.man.db.load('sys.loginForm.password');
            }*/

            this.getImgCode();
        },
        methods: {
            choosePlatform: function(type) {
                let that = this;
            },
            login: function() {
                let that = this;

                // 验证
                that.$refs['fmLogin'].validate((valid) => {
                    if (valid) {
                        that.btnLoginLoading = true;
                        const formerUser = that.man.db.load('sys.uuid');

                        let loginFailed = true;
                        jsonAccount.map((v, k) => {
                            if(that.fmLogin.username === v.username && that.fmLogin.password === v.password) {
                                that.man.loading.openFullScreen();
                                that.$store.dispatch('user/setToken', this.man.fast.getRandom(10000000, 99999999));
                                that.$store.dispatch('user/setUUID', v.userId);
                                that.$store.dispatch('user/setUserInfo', v);
                                loginFailed = false;

                                setTimeout(function() {
                                    that.man.loading.closeFullScreen();
                                    that.$message.success('登录成功！欢迎回来');

                                    // 同个用户
                                    if(formerUser === v.userId) {
                                        // 需要回跳
                                        if (that.man.db.load('tmp.needBack')) {
                                            that.man.db.save('tmp.needBack', false);
                                            that.$router.push({
                                                path: that.man.db.load('tmp.backToRouteName'),
                                                query: that.man.db.load('tmp.backToRouteQuery'),
                                            });
                                        }
                                    } else {
                                        that.man.db.save('sys', {});
                                        that.man.db.save('tmp', {});
                                    }

                                    // 当前站点（主站/教育站）
                                    if(!that.man.db.load('sys.webSite')) {
                                        // that.man.db.save('sys.webSite', 1);
                                    }

                                    that.$router.push({name: 'layout'});
                                }, 1288);
                            } else {
                                if (k === jsonAccount.length - 1 && loginFailed) {
                                    setTimeout(function() {
                                        that.$message.error('帐号或密码错误，请重新输入！');
                                        that.btnLoginLoading = false;
                                    }, 1288);
                                }
                            }
                        });

                        // 鉴权
                        /*api.securityTokenAdmin({
                            ...that.fmLogin,
                        }).then((res) => {
                            // console.log(res.data);
                            if(res.data.status === 200) {
                                // that.man.loading.openFullScreen();
                                that.$store.dispatch('user/setToken', res.data.data.token);
                                that.$store.dispatch('user/setUUID', res.data.data.user.userId);
                                that.$store.dispatch('user/setUserInfo', res.data.data);

                                setTimeout(function() {
                                    // that.man.loading.closeFullScreen();
                                    that.$message.success('登录成功！欢迎回来');

                                    // 同个用户
                                    if(formerUser === res.data.data.user.userId) {
                                        // 需要回跳
                                        if (that.man.db.load('tmp.needBack')) {
                                            that.man.db.save('tmp.needBack', false);
                                            that.$router.push({
                                                path: that.man.db.load('tmp.backToRouteName'),
                                                query: that.man.db.load('tmp.backToRouteQuery'),
                                            });
                                        }
                                    } else {
                                        that.man.db.save('sys', {});
                                        that.man.db.save('tmp', {});
                                    }

                                    // 当前站点（主站/教育站）
                                    if(!that.man.db.load('sys.webSite')) {
                                        // that.man.db.save('sys.webSite', 1);
                                    }

                                    that.$router.push({name: 'layout'});
                                }, 888);
                            } else if(res.data.status === 400) {
                                that.getImgCode();
                                that.fmLogin.imgCode = '';
                                that.btnLoginLoading = false;
                            } else {that.btnLoginLoading = false;}
                        });*/
                    }
                });
            },

            getImgCode: function() {
                let that = this;

                that.fmLogin.uuid = that.man.fast.getRandomJoinTimestamp();

                api.securityImgcode(that.fmLogin.uuid).then((res) => {
                    // console.log(res.data);

                    if(res.data.status === 200) {
                        that.imgCodeSrc = res.data.data;
                    }
                });
            },
        }
    }

</script>

<style lang="scss" scoped>

    .login {
        .platform {
            /*background-color: #009688;*/
            width: 640px;
            height: 300px;

            .block {
                transition: all .4s;
                background-color: #F2F2F2;
                width: 300px;
                height: 170px;
                padding: 35px;
                text-align: center;
                @include unable-select;
                @include cursor-pointer;

                .title {
                    height: 30px;
                    color: #333;
                    @include fs-22;
                    @include fw-600;
                }
                .tips {
                    color: #7F7F7F;
                    @include fs-18;
                    @include fw-600;
                    letter-spacing: 3px;
                }
            }
            .block:hover {
                transition: all .4s;
                background-color: $color-main;
                .title {color: $color-white-light;}
                .tips {color: #eca74c;}

                box-shadow: 0 5px 12px 4px rgba(0, 79, 165, 0.16);
            }
        }
        .fm {width: 320px; height: 200px;}

        ::v-deep {
            .el-tabs__header {display: flex; flex-direction: row; justify-content: center;}
            .el-tabs__nav-wrap {width: 70px;}
        }
    }

</style>