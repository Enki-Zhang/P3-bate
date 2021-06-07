<template>

    <div class="welcome">
        <el-row type="flex" justify="center" align="middle" class="say">
            <span class="pd-b-10 txt-c">{{ webSiteName }}</span>
        </el-row>
    </div>

</template>

<script>

    import {mapState} from 'vuex';

    export default {
        name: "welcome",
        data() {
            return {
                webSiteName: '',
            }
        },
        created() {
            this.initWebSiteName();
        },
        computed: {
            ...mapState(['userInfo']),
        },
        methods: {
            initWebSiteName: function() {
                switch (this.man.db.load('sys.webSite')) {
                    case 1:
                        this.webSiteName = '官网后台';
                        break;
                    case 2:
                        this.webSiteName = '管理系统';
                        break;
                }
            },
        }
    }

</script>

<style lang="scss" scoped>

    .welcome {
        @include page-default-w;
        height: calc(100vh - 101px);
    }

    .say {
        height: 100%;
        flex-direction: column;
        color: #E6E6E6;
        font-size: 108px;
        @include fw-600;
        letter-spacing: 18px;
        @include unable-select;
    }

</style>
