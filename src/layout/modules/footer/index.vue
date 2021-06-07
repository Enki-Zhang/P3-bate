<template>

    <el-footer height="40px" class="layout-footer unable-select">
        <el-row type="flex" justify="space-between" align="middle" style="width: 150px; margin: 0 auto; color: #C8C8C8;">
            <el-row>帮助</el-row>
            <el-row>隐私</el-row>
            <el-row>条款</el-row>
        </el-row>
        <el-row class="copyright" type="flex" justify="center" align="middle">
            <a href="http://www.banbao.com/" target="_blank" class="mg-l-5" style="color: #C8C8C8;">Copyright &copy; {{ `${cprYear}` }}</a>
<!--            <a href="http://www.banbao.com/" target="_blank" class="mg-l-5" style="color: #C8C8C8;">Copyright &copy; {{ `${cprYear} ${cprCompanyName}` }}</a>-->
<!--            <a href="https://beian.miit.gov.cn/" target="_blank" class="mg-l-5">粤ICP备191140300号</a>-->
        </el-row>
    </el-footer>

</template>

<script>
    export default {
        name: "layout_footer",
        computed: {
            cprYear: function() {
                return (new Date()).getFullYear();
            },
            cprCompanyName: function() {
                return process.env.VUE_APP_TITLE_SHORT;
            },
        },
    }
</script>

<style lang="scss" scoped>

    .layout-footer {
        @include bgc-main-light;
        min-width: 560px;
    }

    .copyright {height: 30px;}

</style>