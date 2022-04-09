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
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="end">
                        <el-dropdown @command="handelDropdownUser" class="user">
                            <el-row type="flex" align="middle" class="logged-info unable-select pd-r-20">
                                <el-row>
                                    <img src="../../../assets/image/default/avatar.png" class="avatar cursor-pointer mg-lr-5">
                                </el-row>
                                <el-row class="user-name cursor-pointer">{{ userInfo.user.realName || userInfo.user.username }}</el-row>
                            </el-row>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="changeSelfInfo">个人资料</el-dropdown-item>
                                <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
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
                    case 'changeSelfInfo':
                        let path = this.man.fast.inArray('graduate_student', this.userInfo.roles)
                            ? '/personnel/graduate/edit'
                            : '/personnel/information/edit';
                        this.$router.push({
                            path: path,
                            query: {
                                id: this.userInfo.user.userId,
                            }
                        });
                        break;
                    case 'changePassword':
                        this.dlChangePasswordVisible = true;
                        break;
                    case 'logout':
                        this.logout();
                        break;
                }
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

            .logged-info {
                width: max-content;
                height: 80px;
                /*justify-content: space-evenly;*/
                @include fc-white-light;
                transition: .8s;

                &:hover {
                    transition: .6s;
                    color: #e8b57b;
                }

                .avatar {width: 20px; padding-top: 3px;}
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
    @media screen and (max-width: 900px) {
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