<template>

    <el-row class="auth bgc-plain" type="flex" justify="center" align="middle">
        <el-row class="logo">
            <el-row type="flex" justify="center" align="middle">
                <img src="../../assets/image/auth/logo.png" class="logo-img pd-lr-5">
<!--                <h2>{{ appTitle }}</h2>-->
            </el-row>
            <el-row class="logo-desc mg-t-5">
<!--                <span>欢迎使用本系统，请输入手机号码获得验证码登录系统</span>-->
            </el-row>
        </el-row>
        <el-row class="con">
            <router-view :key="routerKey"></router-view>
        </el-row>
        <el-row class="copyright" type="flex" justify="center" align="middle">
            <a :href="selfDomain" target="_blank" class="mg-l-5" style="color: #C8C8C8;">&copy; {{ `${cprYear} ${cprCompanyName}` }}</a>
<!--            <a href="http://www.beian.miit.gov.cn/" target="_blank" class="mg-l-5">粤ICP备xxxxxxxx号</a>-->
        </el-row>
    </el-row>

</template>

<script>

    export default {
        name: "auth",
        computed: {
            routerKey() {
                return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date();
            },
            selfDomain: function() {
                return process.env.VUE_APP_DOMAIN;
            },
            cprYear: function() {
                return (new Date()).getFullYear();
            },
            cprCompanyName: function() {
                return process.env.VUE_APP_TITLE_SHORT;
            },
            appTitle: function() {
                return process.env.VUE_APP_TITLE;
            },
        }
    }

</script>

<style lang="scss" scoped>

    .auth {
        @include wh-v-100;
        @include fx-col;
        background-image: url("../../assets/image/auth/bg_auth.png");
        background-color: #003767;

        .logo {
            /*height: 100px;*/
            /*.logo-img {width: 38px; height: 30px;}*/
            .logo-img {width: 452px; height: 54px;}
            .logo-desc {
                color: $color-gray-dark;
            }
        }

        .con {}
    }


    /* 移动端适配 */
    @media screen and (max-width: 750px) {
        .auth {
            .logo {
                .logo-img {width: 620px; height: 76px; margin-top: -20px;}
            }

            .copyright {font-size: 20px;}
        }
    }

</style>