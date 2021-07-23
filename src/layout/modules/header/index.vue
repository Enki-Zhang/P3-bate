<template>

    <el-header height="80px" class="layout-header zi-max">
        <el-row type="flex" align="middle">
            <el-row type="flex" justify="center" align="middle" class="logo txt-ls-1 pd-r-5">
                <transition name="fade">
                    <a v-if="!isCollapse" href="/" target="_blank">
                        <el-row type="flex" align="middle">
                            <img src="../../../assets/image/logo.png" class="logo-img">
                        </el-row>
                    </a>
                </transition>
            </el-row>
            <!--<el-row class="sh-menu">
                <span :class="isCollapseMenu ? 'el-icon-s-unfold cursor-pointer' : 'el-icon-s-fold cursor-pointer'" @click="collapseMenu"></span>
            </el-row>-->
            <el-row class="fast">
                <el-col :span="12">
                    <el-row type="flex">
                        <el-row type="flex">
                            <img src="../../../assets/image/layout/bg.png" class="zs-img">
                        </el-row>
                        <!--<el-row>
                            <div :class="{
                                    'block': true,
                                    'block-not-active': !isWelcomePage
                                }" @click="navWelcome">
                                <span class="el-icon-monitor fw-600 pd-r-5"></span>欢迎页
                            </div>
                        </el-row>-->
                        <!--<el-row v-if="true">
                            <div :class="{
                                    'block': true,
                                    'block-not-active': !isHelloPage
                                }" @click="navHello">
                                <span class="el-icon-smoking fw-600 pd-r-5"></span>测试页
                            </div>
                        </el-row>-->
                        <!--<el-row v-if="true">
                            <div class="block block-not-active" @click="changeWebSite">
                                <span class="el-icon-refresh fw-600 pd-r-5"></span>{{ btnChangeWebSiteText }}
                            </div>
                        </el-row>-->
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <!--<el-row type="flex" justify="end" align="middle" style="height: 80px;">
                        <el-dropdown @command="handelDropdownUser" class="user">
                            <el-row type="flex" justify="center" align="middle" class="name h-bf-100">
                                您好，{{ userInfo.user.realName ? userInfo.user.realName : userInfo.user.username }}
                            </el-row>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="changePassword">个人资料</el-dropdown-item>
&lt;!&ndash;                                <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>&ndash;&gt;
&lt;!&ndash;                                <el-dropdown-item v-if="man.fast.inArray('web:site:clean', userInfo.permissions)" command="cleanCache">清理缓存</el-dropdown-item>&ndash;&gt;
                                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-row>-->
                    <el-row type="flex" justify="end">
                        <el-row type="flex" align="middle" class="logged-info unable-select pd-r-20">
                            <el-row>
                                <img src="../../../assets/image/default/avatar.png" class="avatar cursor-pointer mg-lr-5">
                            </el-row>
                            <el-row class="user-name cursor-pointer">{{ userInfo.user.realName || userInfo.user.username }}</el-row>
                            <el-row class="jg mg-lr-10"></el-row>
                            <el-row @click.native="handelDropdownUser('logout')" class="logout cursor-pointer">退出登录</el-row>
                        </el-row>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="m-fast">
                <el-row type="flex">
                    <img src="../../../assets/image/layout/bg.png" class="zs-img unable-select">
                </el-row>
                <el-row @click.native="collapseMenu('100vw')" class="menu"><span class="el-icon-menu"></span></el-row>
            </el-row>
        </el-row>

        <!-- 组件 -->
        <dl-change-password v-model="dlChangePasswordVisible"></dl-change-password>
    </el-header>

</template>

<script>

    import {mapState} from 'vuex';
    import api from '@api';
    import dlChangePassword from "./dlChangePassword";

    export default {
        name: "layout_header",
        components: {
            dlChangePassword,
        },
        data() {
            return {
                isCollapse: false,
                isCollapseMenu: false,
                dlChangePasswordVisible: false,

                btnChangeWebSiteText: '',
            }
        },
        created() {
            this.isCollapseMenu = !!this.man.db.load('sys.collapseMenu');
            this.isCollapseMenu = !this.man.fast.browserSystemIsPC();
            this.initBtnChangeWebSite();
        },
        computed: {
            ...mapState(['userInfo']),

            appTitle: function() {
                return process.env.VUE_APP_TITLE_SHORT;
            },
        },
        methods: {
            collapseMenu: function(elMenuWidth = '256px') {
                this.isCollapseMenu = !this.isCollapseMenu;
                this.man.db.save('sys.collapseMenu', this.isCollapseMenu);
                this.man.bus.$emit('collapseMenu', {
                    isCollapse: this.isCollapseMenu,
                    elMenuWidth
                });
            },
            handelDropdownUser: function(cmd) {
                switch (cmd) {
                    case 'changePassword':
                        this.dlChangePasswordVisible = true;
                        break;
                    case 'cleanCache':
                        this.cleanCache();
                        break;
                    case 'logout':
                        this.logout();
                        break;
                }
            },

            navWelcome: function() {
                if(this.$route.name !== 'welcome') {
                    this.$router.push({name: 'welcome'});
                }
            },
            navHello: function() {
                if(this.$route.name !== 'hello') {
                    this.$router.push({name: 'hello'});
                }
            },
            changeWebSite: function() {
                let that = this;

                that.$confirm(`是否${that.btnChangeWebSiteText}`, '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    that.man.db.save('sys.webSite', this.man.db.load('sys.webSite') === 1 ? 2 : 1);
                    that.man.loading.openFullScreen();
                    setTimeout(function() {
                        if(that.$route.name === 'welcome') {
                            location.reload();
                        } else {
                            location.replace(that.$router.resolve({name: 'welcome'}).href);
                        }
                    }, 888);
                }).catch();
            },
            logout: function() {
                let that = this;

                that.$confirm('是否退出登录', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '退出登录',
                    cancelButtonText: '取消'
                }).then(() => {
                    that.man.loading.openFullScreen();

                    // 调用退出登录接口
                    api.securityClear().then();
                    that.$store.dispatch('logout');

                    setTimeout(function() {
                        location.reload();
                    }, 888);
                }).catch();
            },
            cleanCache: function() {
                let that = this;
                if(that.man.fast.inArray('web:site:clean', that.userInfo.permissions) === false) {
                    that.$message.warning('您无权限进行此操作');
                    return false;
                }

                that.$confirm('是否确认清理缓存', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '清理缓存',
                    cancelButtonText: '取消'
                }).then(() => {
                    that.$toast.loading('正在清理');

                    api.seoCacheClean().then((res) => {
                        if(res.data.status === 200) {
                            setTimeout(function() {
                                that.$toast.success({message: '缓存清理完成', duration: 1288});
                            }, 888);
                        } else {
                            that.$toast.clear();
                            that.$message.error('清理缓存失败');
                        }
                    });
                }).catch();
            },


            initBtnChangeWebSite: function() {
                switch (this.man.db.load('sys.webSite')) {
                    case 1:
                        this.btnChangeWebSiteText = '转到管理系统';
                        break;
                    case 2:
                        this.btnChangeWebSiteText = '转到官网后台';
                        break;
                }
            },
        },
    }

</script>

<style lang="scss" scoped>

    .layout-header {
        background: linear-gradient(180deg, #003A71 0%, #003562 100%);
        @include wh-bf-100;
        min-width: 560px;
        padding: unset;
        box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

        .logo {
            width: 600px;
            height: 80px;
            @include cursor-pointer;
            @include unable-select;
        }
        .logo a {@include fc;}
        .logo-img {width: 452px; height: 54px; padding-left: 15px;}

        .sh-menu {
            width: 45px;
            padding-right: 30px;
            @include fs-24;
        }

        .fast {
            width: 100%;
            height: 80px;

            .block {
                @include bgc-main-light;
                width: 136px;
                height: 59px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                color: #393d49d9;
                @include fs-15;
                @include fw-600;
                letter-spacing: 1.2px;
                @include cursor-pointer;
                @include unable-select;
            }
            .block-not-active {
                background-color: white !important;
            }

            .user {
                //@include bgc-main;
                min-width: 108px;
                height: 52px;
                display: block;
            }
            .user .name {
                //@include fc-main-active;
                @include cursor-pointer;
                padding-left: 10px;
            }

            .logged-info {
                width: max-content;
                height: 80px;
                /*justify-content: space-evenly;*/
                @include fc-white-light;

                .avatar {width: 20px; padding-top: 3px;}
                .user-name,
                .logout {
                    transition: .8s;

                    &:hover {
                        transition: .6s;
                        color: #e8b57b;
                    }
                }
                .jg {
                    width: 0;
                    height: 20px;
                    border: 1px solid #FFFFFF;
                    opacity: 0.3;
                }
            }
        }
        .m-fast {display: none;}
    }


    /* 移动端适配 */
    @media screen and (max-width: 750px) {
        .layout-header {
            height: 160px !important;

            .logo {
                width: 630px;
                height: 160px;
            }
            .logo-img {width: 600px; height: 70px;}

            .fast {display: none;}
            .m-fast {
                width: 100vw;
                height: 160px;
                display: unset;
                position: absolute;

                .zs-img {
                    width: 400px;
                    height: 160px;
                    margin-left: 400px;
                }

                .menu {
                    position: absolute;
                    top: 60px;
                    right: 25px;

                    span {
                        color: rgba(255,255,255, .8);
                        font-size: 50px;
                    }
                }

                .block {
                    @include bgc-main-light;
                    width: 136px;
                    height: 59px;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    color: #393d49d9;
                    @include fs-15;
                    @include fw-600;
                    letter-spacing: 1.2px;
                    @include cursor-pointer;
                    @include unable-select;
                }
                .block-not-active {
                    background-color: white !important;
                }

                .user {
                    //@include bgc-main;
                    min-width: 108px;
                    height: 52px;
                    display: block;
                }
                .user .name {
                    //@include fc-main-active;
                    @include cursor-pointer;
                    padding-left: 10px;
                }

                .logged-info {
                    width: max-content;
                    height: 80px;
                    /*justify-content: space-evenly;*/
                    @include fc-white-light;

                    .avatar {width: 20px; padding-top: 3px;}
                    .user-name,
                    .logout {
                        transition: .8s;

                        &:hover {
                            transition: .6s;
                            color: #e8b57b;
                        }
                    }
                    .jg {
                        width: 0;
                        height: 20px;
                        border: 1px solid #FFFFFF;
                        opacity: 0.3;
                    }
                }
            }
        }
    }

</style>