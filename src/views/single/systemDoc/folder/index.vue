<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">

            <el-row>
                <el-row type="flex" justify="center" align="middle" class="file-manage">
                    <img src="../../../../assets/image/systemDoc/btn-file-manage.png">
                    <span>文件管理</span>
                </el-row>
            </el-row>

            <el-row type="flex" class="block-list mg-tb-20">
                <el-row v-for="(v, k) in blockArr" :key="k"
                        type="flex" justify="center" align="middle"
                        @click.native="navByBlockName(v.name)"
                        class="block">
                    <el-row>
                        <img :src="require(`../../../../assets/image/systemDoc/${v.img}`)">
                    </el-row>
                    <el-row class="title">{{ v.title }}</el-row>
                    <el-row class="desc">{{ v.desc }}</el-row>
                </el-row>
            </el-row>

        </el-row>
    </el-row>

</template>

<script>

    export default {
        name: "index",
        data() {
            return {
                blockArr: [
                    {
                        name: 'system-doc|management-manual',
                        img: 'aqglsc.png',
                        title: '安全管理手册',
                        desc: '一句话描述一句话描述'
                    },
                    {
                        name: 'system-doc|program-files',
                        img: 'cxwj.png',
                        title: '程序文件',
                        desc: '一句话描述一句话描述'
                    },
                    {
                        name: 'system-doc|manual',
                        img: 'aqsc.png',
                        title: '安全手册',
                        desc: '一句话描述一句话描述'
                    },
                    {
                        name: 'system-doc|operating-procedures',
                        img: 'bzczgc.png',
                        title: '标准操作规程',
                        desc: '标准操作规程SOP'
                    },
                    {
                        name: 'system-doc|report',
                        img: 'fxpgbg.png',
                        title: '风险评估报告',
                        desc: '一句话描述一句话描述'
                    },
                    {
                        name: 'system-doc|msds',
                        img: 'msds.png',
                        title: 'MSDS表单',
                        desc: '材料安全数据表'
                    },
                ],
            }
        },
        created() {},
        methods: {
            navByBlockName: function(name) {
                let that = this;

                that.$router.push({name});
            },
        }
    }

</script>

<style lang="scss" scoped>

    ._root_page {

        .file-manage {
            width: 149px;
            height: 50px;
            background: linear-gradient(180deg, #A70000 0%, #FF0000 0%, #AF0000 100%);
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
            border-radius: 25px;
            color: white;
            line-height: 22px;
            @include cursor-pointer;
            @include unable-select;

            img {width: 18px; height: 18px; margin: 0 5px;}
        }

        .block-list {
            flex-wrap: wrap;

            .block {
                background: #FFFFFF;
                width: 260px;
                height: 260px;
                margin: 0 20px 20px 0;
                flex-direction: column;
                box-shadow: 0px 10px 20px rgba(216, 230, 240, 0.43);
                border-radius: 10px;
                @include unable-select;
                @include cursor-pointer;

                img {width: 166px; height: 166px;}
                .title {color: rgba(0, 0, 0, 0.85); font-size: 16px; line-height: 24px;}
                .desc {color: rgba(0, 0, 0, 0.45); font-size: 14px; line-height: 22px;}
            }
        }

    }

</style>