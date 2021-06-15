<template>

    <div id="app">
        <router-view/>
    </div>

</template>

<script>

    let loading;

    export default {
        name: 'app',
        components: {},
        beforeCreate() {
            this.$store.dispatch('load');
        },
        created() {
            this.$store.commit('setScreenHeight', this.man.fast.getScreenHeight());
            this.man.bus.$on('openFullScreen', (res) => {
                if(res.show) {
                    loading = this.$loading(res.options);
                } else {
                    setTimeout(function() {
                        loading.close();
                    }, res.closeWaitingTimer);
                }
            });
        },
        mounted() {
            window.onresize = () => {return (() => {this.$store.commit('setScreenHeight', this.man.fast.getScreenHeight());})();};
            window.addEventListener('beforeunload', e => this.handleEventBeforeunload(e));
        },
        destroyed () {
            window.removeEventListener('beforeunload', e => this.handleEventBeforeunload(e));
        },
        methods: {
            handleEventBeforeunload: function(e) {
                e = e || window.event;
                if(e) {
                    this.man.db.save('tmp.routeForPageRefreshed', {
                        name: this.$route.name,
                        path: this.$route.path,
                        fullPath: this.$route.fullPath,
                        params: this.$route.params,
                        query: this.$route.query,
                        meta: this.$route.meta
                    });
                }
                return true;
            }
        }
    }

</script>

<style lang="scss">

    #app {@include fonts-main;}


    /* 移动端适配 */
    @media screen and (max-width: 750px) {
        // 表单
        .fm {
            ::v-deep {
                .el-input {
                    font-size: 28px;

                    .el-input__inner {
                        height: 80px;
                        padding: 0 60px;
                        border-radius: 12px;
                        line-height: 80px;
                    }

                    .el-input__icon {
                        font-size: 32px;
                        line-height: 80px;
                    }

                    .el-input__prefix {left: 15px;}
                    .el-input__suffix {
                        top: 3px;
                        right: 25px;
                    }
                }
                .el-button {
                    padding: 24px 20px;
                    border-radius: 8px;
                    font-size: 28px;
                    letter-spacing: 5px;
                }
                .el-message {
                    .el-message__content {
                        padding: 10px;
                        font-size: 28px;
                    }
                }
            }
        }
    }

</style>