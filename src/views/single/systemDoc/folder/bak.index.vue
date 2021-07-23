<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">

            <el-row>
                <el-row type="flex" justify="center" align="middle" class="file-manage">
                    <img src="../../../../assets/image/systemDoc/btn-file-manage.png">
                    <span>新增文件类型</span>
                </el-row>
            </el-row>

            <el-row type="flex" class="block-list mg-tb-20">
                <el-row v-for="(v, k) in blockArr" :key="k"
                        type="flex" justify="center" align="middle"
                        class="block">
                    <el-row v-if="formBlock.id === k" class="bg-btn-edit">
                        <el-button type="default" icon="el-icon-close" size="mini" @click="formBlock.id = -1">取消</el-button>
                        <el-button type="primary" icon="el-icon-check" size="mini">保存</el-button>
                    </el-row>
                    <el-row v-else class="bg-setting">
                        <el-dropdown trigger="click"
                                     placement="bottom"
                                     @command="(cmd) => {chooseMenu(cmd, k, v)}">
                            <i class="el-icon-more setting"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-edit" command="edit">编辑</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-delete" command="del">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-row>
                    <el-row @click.native="navByBlockName(v.name)" class="con">
                        <el-row>
                            <img :src="require(`../../../../assets/image/systemDoc/${v.img}`)">
                        </el-row>
                        <el-row class="title">
                            <el-input v-if="formBlock.id === k" v-model="formBlock.title" size="mini" class="mg-b-5">
                                <template slot="prepend">标题</template>
                            </el-input>
                            <span v-else>{{ v.title }}</span>
                        </el-row>
                        <el-row class="desc">
                            <el-input v-if="formBlock.id === k" v-model="formBlock.desc" size="mini">
                                <template slot="prepend">简介</template>
                            </el-input>
                            <span v-else>{{ v.desc }}</span>
                        </el-row>
                    </el-row>
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

                formBlock: {
                    id: -1,
                    title: '',
                    desc: ''
                },
            }
        },
        created() {},
        methods: {
            navByBlockName: function(name) {
                let that = this;

                if(that.formBlock.id === -1) {
                    that.$router.push({name});
                }
            },
            chooseMenu: function(cmd, k, v) {
                let that = this;

                switch (cmd) {
                    case 'edit':
                        if(that.blockArr[k] === v) {
                            that.formBlock.id = k;
                        }
                        break;
                    case 'del':

                        break;
                }
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

                .bg-btn-edit {
                    z-index: 777;
                    display: flex;
                    position: absolute;
                    top: 5px;
                    right: 5px;
                }
                .bg-setting {
                    z-index: 777;
                    /*background-color: #009688;*/
                    width: 45px;
                    height: 30px;
                    position: absolute;
                    top: 6px;
                    right: 0;
                    text-align: center;

                    .setting {
                        color: #a09f9f;
                        font-size: 20px;
                        line-height: 30px;
                    }
                }
                .con {
                    width: 100%;
                    text-align: center;

                    img {width: 166px; height: 166px;}
                    .title {color: rgba(0, 0, 0, 0.85); font-size: 16px; line-height: 24px;}
                    .desc {color: rgba(0, 0, 0, 0.45); font-size: 14px; line-height: 22px;}
                }
            }
        }
    }


    /* 移动端适配 */
    @media screen and (max-width: 750px) {
        ._root_page {
            .file-manage {
                width: 290px;
                height: 80px;
                font-size: 26px;
                line-height: 80px;

                img {width: 28px; height: 28px; margin: 5px 10px 0;}
            }

            .block-list {
                .block {
                    width: 330px;
                    height: 330px;
                    margin: 12px;
                    border-radius: 15px;
                    img {width: 200px; height: 200px;}
                    .title {font-size: 28px; line-height: 50px;}
                    .desc {font-size: 22px; line-height: 30px;}
                }
            }
        }
    }

</style>