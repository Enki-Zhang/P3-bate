<template>

    <el-aside :width="isCollapse ? '0px' : elMenuWidth" class="layout-aside">
        <!--<el-row type="flex" justify="center" align="middle" class="logo txt-ls-1 pd-r-5">
            <transition name="fade">
                <a v-if="!isCollapse" href="/" target="_blank">
                    <el-row type="flex" align="middle">
                        <img src="../../../assets/image/auth/logo.png" class="logo-img">
                        <span>{{ appTitle }}</span>
                    </el-row>
                </a>
            </transition>
        </el-row>-->
        <el-scrollbar style="height: calc(100vh - 80px);">
            <el-menu :default-active="activeMenu"
                 :collapse="isCollapse"
                 background-color="#000C17"
                 text-color="#EEEEEE"
                 active-text-color="#FFF">
                <!-- unique-opened -->
                <el-submenu v-for="(v, k) in menus" :key="k"
                            v-if="!v.hidden && v.meta && !v.meta.isSinglePage && v.children && v.children.length"
                            :index="v.name">
                    <template v-if="v.meta.isLoggedInfo">
                        <template slot="title">
                            <img :src="v.icon ? require(`../../../assets/image/aside/${v.icon}.png`) : ''" class="aside-icon">
                            <span>{{ userInfo.nickname }}</span>
                        </template>
                        <div v-for="(vv, kk) in v.children" :key="kk"
                             v-if="!vv.hidden">
                            <el-menu-item :index="vv.name" @click="nav(vv.name)">
                                <span slot="title">{{ vv.meta.title }}</span>
                            </el-menu-item>
                        </div>
                    </template>
                    <template v-else>
                        <template slot="title">
                            <img :src="v.icon ? require(`../../../assets/image/aside/${v.icon}.png`) : ''" class="aside-icon">
                            <span>{{ v.meta.title }}</span>
                        </template>
                        <div v-for="(vv, kk) in v.children" :key="kk"
                             v-if="!vv.hidden">
                            <el-menu-item :index="vv.name" @click="nav(vv.name)">
                                <span slot="title">{{ vv.meta.title }}</span>
                            </el-menu-item>
                        </div>
                    </template>
                </el-submenu>
                <el-menu-item v-else-if="!v.hidden"
                              :index="v.name"
                              @click="nav(v.name)">
                    <img :src="v.icon ? require(`../../../assets/image/aside/${v.icon}.png`) : ''" class="aside-icon">
                    <span slot="title">{{ v.meta.title }}</span>
                </el-menu-item>
            </el-menu>
        </el-scrollbar>
    </el-aside>

</template>

<script>

    import {mapState} from 'vuex';
    import routes from "@router/routes";
    import api from "@api";

    export default {
        name: "layout_aside",
        props: {},
        data() {
            return {
                isCollapse: false,
                elMenuWidth: '256px',
                webSite: Number(this.man.db.load('sys.webSite')),
            }
        },
        created() {
            this.isCollapse = !!this.man.db.load('sys.collapseMenu');
            this.isCollapse = !this.browserSystemIsPC;
            this.man.bus.$on('collapseMenu', (res) => {
                this.isCollapse = res.isCollapse;
                this.elMenuWidth = res.elMenuWidth;
            });
        },
        computed: {
            ...mapState(['userInfo']),

            appTitle: function() {
                return process.env.VUE_APP_TITLE_SHORT;
            },
            menus: function() {
                // console.log(this.userInfo.menus);
                // console.log(routes.inLayout.children);
                return [
                    ...routes.inLayout.children,
                    // ...this.man.test.generateStaticMenus(),
                ];
            },
            activeMenu: function() {
                let res = this.$route.name;
                res = res.split('|')[0];
                /*if(res.indexOf('_review_review') !== -1) {
                    res = res.replace('_review', '');
                }*/
                return res;
            },
            browserSystemIsPC: function() {
                return this.man.fast.browserSystemIsPC();
            },
        },
        methods: {
            nav: function(routeName) {
                let that = this;

                // 移动端自动折回
                if(!that.browserSystemIsPC) {
                    that.isCollapse = true;
                    // 退出登录
                    if(routeName === 'logged-info|logout') {
                        that.logout();
                        return;
                    }
                }
                if(that.$route.name !== routeName) {
                    that.$router.push({name: routeName});
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

    .layout-aside {
        background-color: #000C17;
        min-height: 100vh;
        transition: .6s;
    }

    .el-menu--collapse {display: none;}
    .el-menu {
        /*width: 256px;*/
        border-right: unset;

        ::v-deep {
            .el-submenu:first-child {display: none;}
            .el-menu-item {
                background-color: #00192f !important;
                padding: 0 8px !important;
                font-size: 13px;
                i {color: unset;}
            }
            .el-menu-item.is-active {background-color: #0a78de !important;}
            .el-menu-item:hover {background-color: rgba(10,120,222, .5) !important;}
            .el-menu-item.is-active:hover {background-color: #0A78DE !important;}

            .el-submenu {
                .el-menu-item {
                    background-color: #000C17 !important;
                    height: 42px;
                    line-height: 42px;
                    padding-left: 40px !important;
                }
                .el-menu-item:hover {background-color: rgba(10,120,222, .5) !important;}
                .el-menu-item.is-active {background-color: #0a78de !important;}
                .el-menu-item.is-active:hover {background-color: #0a78de !important;}

                .el-submenu__title {background-color: #00192f !important; padding: 0 8px !important; font-size: 13px;}
            }
            .el-submenu__title {
                height: 60px;
                line-height: 60px;

                i {@include fc-white-light; margin-top: -5px;}
            }
            .el-submenu__title:hover {background-color: rgba(10,120,222, .5) !important;}
        }
    }
    .aside-icon {width: 18px; height: 18px; margin: 0 6px 3px 6px;}


    /* 移动端适配 */
    @media screen and (max-width: 750px) {
        .layout-aside {
            .logged-info {
                background-color: #009688;
                width: 100%;
                height: 200px;
            }

            .el-menu {
                ::v-deep {
                    .el-submenu:first-child {display: unset;}
                    .el-menu-item {
                        height: 100px;
                        font-size: 28px;
                        line-height: 100px;
                    }
                    .el-submenu {
                        .el-menu-item {
                            height: 90px;
                            line-height: 90px;
                            padding-left: 40px !important;
                        }
                        .el-submenu__title {
                            font-size: 28px;
                            i {
                                margin-top: -10px;
                                font-size: 28px;
                                font-weight: 600;
                            }
                        }
                    }
                    .el-submenu__title {
                        height: 100px;
                        font-size: 28px;
                        line-height: 100px;
                    }
                }
            }
            .aside-icon {
                width: 40px;
                height: 40px;
                margin: 0 16px 3px 16px;
            }
        }

    }

</style>