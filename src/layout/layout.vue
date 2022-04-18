<template>

    <el-container direction="vertical" class="layout">
        <!-- 页头 -->
        <layout_header></layout_header>
        <el-container>
            <!-- 左侧菜单 -->
            <layout_aside></layout_aside>
            <!-- 右侧内容部 -->
            <el-scrollbar class="main-scrollbar">
                <el-main class="layout-main">
                    <!-- 面包屑 -->
                    <!--<el-row v-if="isShowBreadcrumb" class="my-breadcrumb">
                        <template v-if="$route.meta.isSinglePage === 0">
                            <el-row class="breadcrumb">
                                <el-breadcrumb v-if="breadcrumbParents.length > 0">
                                    <el-breadcrumb-item v-for="(v, k) in breadcrumbParents" :key="k"
                                                        v-if="v.meta && !v.meta.isSinglePage">
                                        &lt;!&ndash;                                        {{ v.meta.title }}&ndash;&gt;
                                    </el-breadcrumb-item>
                                    &lt;!&ndash;                                    <el-breadcrumb-item v-else-if="!!v.toPath" :to="{path: v.path, query: v.query}" :replace="true">{{ v.meta.title }}</el-breadcrumb-item>&ndash;&gt;
                                    <el-breadcrumb-item v-else :to="{name: v.name}" :replace="true">{{ v.meta.title }}</el-breadcrumb-item>
                                    <el-breadcrumb-item class="breadcrumb-current">{{ $route.meta.title }}</el-breadcrumb-item>
                                </el-breadcrumb>
                            </el-row>
                            &lt;!&ndash;                            <el-row v-if="$route.meta.isNeedVirtualParent" class="breadcrumb-title">{{ pageTitle }}</el-row>&ndash;&gt;
                            &lt;!&ndash;                            <el-row class="breadcrumb-title">{{ $route.meta.title }}</el-row>&ndash;&gt;
                        </template>
                        <template v-else>
                            &lt;!&ndash;                            <el-row class="breadcrumb-single">{{ $route.meta.title }}</el-row>&ndash;&gt;
                        </template>
                        <el-row class="breadcrumb-hr"></el-row>
                    </el-row>-->

                    <el-row v-if="isShowBreadcrumb" class="my-breadcrumb">
                        <el-row class="breadcrumb">
                            <el-breadcrumb v-if="breadcrumbParents.length > 0">
                                <template v-for="(v, k) in breadcrumbParents">
                                    <template v-if="!!v.meta.isSinglePage">
<!--                                        <el-breadcrumb-item v-if="" :to="{path: v.path, query: v.query}" :replace="true">{{ v.meta.title }}</el-breadcrumb-item>-->
                                        <template v-if="k > 0"><!--  v-if="k > 0" -->
                                            <template v-if="!!v.meta.toPath">
                                                <el-breadcrumb-item :to="{name: v.name, query: v.meta.query}" :replace="true">{{ v.meta.title }}</el-breadcrumb-item>
                                            </template>
                                            <el-breadcrumb-item v-else :to="{name: v.name}" :replace="true">{{ v.meta.title }}</el-breadcrumb-item>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <template v-if="k > 0">
                                            <el-breadcrumb-item :to="{name: v.name}" :replace="true">{{ v.meta.title }}</el-breadcrumb-item>
                                        </template>
                                        <el-breadcrumb-item v-else>{{ v.meta.title }}</el-breadcrumb-item>
                                    </template>
                                </template>
                                <el-breadcrumb-item class="breadcrumb-current">{{ $route.meta.title }}</el-breadcrumb-item>
                            </el-breadcrumb>
                            <el-breadcrumb v-else>
                                <el-breadcrumb-item class="breadcrumb-current">{{ $route.meta.title }}</el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-row>
                        <el-row class="breadcrumb-hr"></el-row>
                    </el-row>

                    <!-- 页面内容 -->
                    <router-view :key="routerKey"></router-view>
                </el-main>
                <!-- 页脚 -->
                <layout_footer></layout_footer>
            </el-scrollbar>
        </el-container>
    </el-container>

</template>

<script>

    import {mapState} from 'vuex';
    import layout_aside from './modules/aside';
    import layout_header from './modules/header';
    import layout_footer from "./modules/footer";

    export default {
        name: "layout",
        components: {
            layout_aside,
            layout_header,
            layout_footer
        },
        created() {
            let that = this;

            // 监听 - 改变当前页面面包屑标题
            that.man.bus.$on('changeCurrentRouteMetaTitle', function(data) {
                that.$route.meta.title = data.title;
                // console.log(that.$route.meta);
                that.$forceUpdate();
            });
            // 监听 - 改变当前页面虚拟父类面包屑标题
            that.man.bus.$on('changeCurrentRouteVirtualParentMetaTitle', function(data) {
                that.$route.meta.virtualParent.meta.title = data.title;
                that.$route.meta.virtualParent.meta.toPath = true;
                that.$route.meta.virtualParent.meta.query = {
                    folderTitle: JSON.stringify(data),
                };
                // console.log(that.$route.meta);
                that.$forceUpdate();
            });
        },
        computed: {
            ...mapState(['pageTitle']),

            routerKey() {
                // console.log(this.$route);
                return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date();
            },
            isShowBreadcrumb() {
                return Object.getOwnPropertyNames(this.$route.meta).length > 1 && this.$route.meta.isShowBreadcrumb;
            },
            breadcrumbParents() {
                let res = [];
                if(this.$route.matched.length >= 2) {
                    this.$route.matched.map((v, k) => {
                        if(k > 0 && k < this.$route.matched.length - 1) res.push(v);
                    });
                    if(this.$route.meta.isNeedVirtualParent) {
                        if (this.$route.meta.virtualParent.meta.isNeedVirtualParent) {
                            // console.log(this.$route.meta.virtualParent);
                            res.push(this.$route.meta.virtualParent.meta.virtualParent);
                        }
                        res.push(this.$route.meta.virtualParent);
                    }
                }
                // console.log(res);
                return res;
            },
        }
    }

</script>

<style lang="scss" scoped>

    .layout {
        @include bgc-main-light;

        .layout-main {
            min-width: 560px;
            min-height: 365px;
            //padding: 12px 20px 8px 20px;
            padding: unset;
        }

        .main-scrollbar {
            //width: calc(100vw - 240px);
            width: 100%;
            height: calc(100vh - 80px);
            //height: calc(100vh - 68px);
            //margin-top: 8px;

            .my-breadcrumb {
                height: 50px;

                .breadcrumb {
                    background-color: unset;
                    margin: unset;
                    padding: 22px 20px;
                }
                .breadcrumb-current {@include fs-16; @include fw-600;}

                .breadcrumb-single {
                    background-color: unset;
                    height: unset;
                    padding: 10px 20px;
                }

                .breadcrumb-hr {border: 1px solid #CBDDF0; margin: 0 20px;}

                ::v-deep {
                    .el-breadcrumb {
                        @include fs-18;
                        @include fw-600;
                        line-height: 22px;

                        .el-breadcrumb__inner {@include fs-16;}
                    }
                }
            }
        }
    }


    /* 移动端适配 */
    @media screen and (max-width: 1200px) {
        .layout {
            .m-layout-aside {display: unset;}

            .layout-main {
                min-width: unset;
                width: 100%;
            }

            .main-scrollbar {
                width: 100vw;
                height: calc(100vh - 100px);

                .my-breadcrumb {
                    height: 120px;

                    .breadcrumb {
                        padding: 49px 20px;
                    }
                    .breadcrumb-current {
                        font-size: 28px;
                        @include fw-600;
                        line-height: 44px;
                    }

                    .breadcrumb-single {
                        padding: 20px;
                        font-size: 28px;
                    }

                    .breadcrumb-hr {border: 1px solid #CBDDF0; margin: 0 20px;}

                    ::v-deep {
                        .el-breadcrumb {
                            font-size: 28px;
                            @include fw-600;

                            .el-breadcrumb__inner {font-size: 28px; line-height: 44px;}
                        }
                    }
                }
            }
        }
    }

    /* 移动端适配 */
    @media screen and (max-width: 420px) {
        .layout {
            .m-layout-aside {display: unset;}

            .layout-main {
                min-width: unset;
                width: 100%;
            }

            .main-scrollbar {
                width: 100vw;
                height: calc(100vh - 100px);

                .my-breadcrumb {
                    height: 90px;

                    .breadcrumb {
                        padding: 35px 20px;
                    }
                    .breadcrumb-current {
                        font-size: 20px;
                        @include fw-600;
                        line-height: 44px;
                    }

                    .breadcrumb-single {
                        padding: 20px;
                        font-size: 20px;
                    }

                    .breadcrumb-hr {border: 1px solid #CBDDF0; margin: 0 20px;}

                    ::v-deep {
                        .el-breadcrumb {
                            font-size: 20px;
                            @include fw-600;

                            .el-breadcrumb__inner {font-size: 16px; line-height: 44px;}
                        }
                    }
                }
            }
        }
    }

</style>
