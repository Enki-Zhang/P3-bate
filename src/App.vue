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

</style>