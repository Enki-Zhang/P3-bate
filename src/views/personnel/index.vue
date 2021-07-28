<template>

    <router-view :key="routerKey"></router-view>

</template>

<script>

    export default {
        name: "index",
        created() {
            if(this.$route.name === 'personnel') {
                this.$router.push({name: 'layout'});
            }
        },
        computed: {
            routerKey() {
                return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date();
            }
        },
    }

</script>

<style scoped>

</style>
