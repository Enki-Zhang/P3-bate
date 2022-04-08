<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">

            <el-row>
                <el-row type="flex" justify="center" align="middle"
                        @click.native="create"
                        class="file-manage">
                    <img src="../../../../assets/image/systemDoc/btn-file-manage.png">
                    <span>新增文件类型</span>
                </el-row>
            </el-row>

            <el-row type="flex" class="block-list mg-tb-20">
                <el-row v-for="(v, k) in folderList" :key="k"
                        type="flex" justify="center" align="middle"
                        class="block">
                    <el-row class="bg-setting">
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
                    <el-row @click.native="navByBlockName(v)" class="con">
                        <el-row v-if="v.icon">
                            <img :src="require(`@assets/image/systemDoc/${v.icon}`)">
                        </el-row>
                        <el-row class="title">
                            <span>{{ v.name }}</span>
                        </el-row>
                        <el-row class="desc">
                            <span>{{ v.description }}</span>
                        </el-row>
                    </el-row>
                </el-row>
            </el-row>

        </el-row>

        <!-- 组件：编辑 -->
        <dl-edit v-model="dlEditVisible" :params="dlParams" @reloadTableData="getFolderList()"></dl-edit>
    </el-row>

</template>

<script>

    import {mapState} from 'vuex';
    import dlEdit from "@views/single/systemDoc/folder/dlEdit";
    import api from "@api";

    export default {
        name: "index",
        components: {dlEdit,},
        data() {
            return {
                dlParams: {},
                dlEditVisible: false,

                folderList: [],
            }
        },
        created() {
            this.getFolderList();
        },
        computed: {
            ...mapState(['userInfo']),
        },
        methods: {
            getFolderList: function() {
                let that = this;
                that.$toast.loading('加载中');

                api.systemDocumentTypePage().then((res) => {
                    that.$toast.clear();

                    if(res.data.status === 200) {
                        that.folderList = {...res.data.data.records};
                    }
                });
            },
            navByBlockName: function(block) {
                let that = this;

                if(1) {
                    that.$router.push({
                        path: `/system-doc/management-manual`,
                        query: {
                            folderTitle: JSON.stringify({
                                id: block.id,
                                title: block.name
                            }),
                        }
                    });
                }
            },
            create: function() {
                let that = this;
                if(!that.man.fast.inArray('system-doc:management-manual-type:add', that.userInfo.permissions)) {
                    that.$message.warning('您无权限进行此操作');
                    return;
                }

                that.dlParams = {
                    mode: 'create',
                    detail: {id: 0}
                };
                that.dlEditVisible = true;
            },
            edit: function(row) {
                let that = this;
                if(!that.man.fast.inArray('system-doc:management-manual-type:edit', that.userInfo.permissions)) {
                    that.$message.warning('您无权限进行此操作');
                    return;
                }

                api.systemDocumentTypeFindById(row.id).then((res) => {
                    if(res.data.status === 200) {
                        that.dlParams = {
                            mode: 'edit',
                            detail: row
                        };
                        that.dlEditVisible = true;
                    }
                });
            },
            remove: function(row) {
                let that = this;
                if(!that.man.fast.inArray('system-doc:management-manual-type:del', that.userInfo.permissions)) {
                    that.$message.warning('您无权限进行此操作');
                    return;
                }

                that.$confirm(`是否删除该文件类型`, '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    that.$toast.loading('正在删除');

                    api.systemDocumentTypeDelete(row.id).then((res) => {
                        if(res.data.status === 200) {
                            setTimeout(function() {
                                that.$toast.success({message: '操作成功', duration: 1288});
                                that.getFolderList();
                            }, 888);
                        } else {that.$toast.clear();}
                    });
                }).catch();
            },
            chooseMenu: function(cmd, k, v) {
                let that = this;

                switch (cmd) {
                    case 'edit':
                        if(that.folderList[k] === v) {
                            that.edit(that.folderList[k]);
                        }
                        break;
                    case 'del':
                        that.remove(that.folderList[k]);
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
                margin-top: -20px;
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

                    .bg-setting {
                        width: 80px;
                        height: 50px;
                        .setting {
                            font-size: 35px;
                            line-height: 50px;
                        }
                    }

                    .con {
                        .title {font-size: 28px; line-height: 50px;}
                        .desc {font-size: 22px; line-height: 30px;}
                    }
                }
            }
        }
    }

</style>