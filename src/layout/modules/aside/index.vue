<template>

    <el-aside :width="isCollapse ? '64px' : '256px'" class="layout-aside">
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
                 active-text-color="#FFF"
                 class=""><!-- unique-opened -->
            <el-submenu v-for="(v, k) in menus" :key="k"
                        v-if="!v.hidden && v.meta && !v.meta.isSinglePage && v.children && v.children.length"
                        :index="v.name">
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

    export default {
        name: "layout_aside",
        props: {},
        data() {
            return {
                isCollapse: false,
                webSite: Number(this.man.db.load('sys.webSite')),
            }
        },
        created() {
            this.isCollapse = !!this.man.db.load('sys.collapseMenu');
            this.man.bus.$on('collapseMenu', (res) => {
                this.isCollapse = res;
            });
        },
        computed: {
            ...mapState(['userInfo']),

            appTitle: function() {
                return process.env.VUE_APP_TITLE_SHORT;
            },
            menus: function() {
                // console.log(this.userInfo.menus);
                // console.log(routes[0].children);
                return [
                    ...routes[0].children,
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
        },
        methods: {
            nav: function(routeName) {
                let that = this;

                if(that.$route.name !== routeName) {
                    that.$router.push({name: routeName});
                }
            },
        },
    }

</script>

<style lang="scss" scoped>

    .layout-aside {
        background-color: #000C17;
        min-height: 100vh;
        transition: 1.2s;
    }

    .el-menu--collapse {width: 64px !important;}
    .el-menu {
        border-right: unset;

        ::v-deep {
            .el-menu-item {background-color: #00192f !important; padding: 0 8px !important; font-size: 13px;}
            .el-menu-item i {color: unset;}
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

</style>