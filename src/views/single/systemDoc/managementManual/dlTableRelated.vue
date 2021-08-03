<template>

    <el-dialog top="18vh" width="888px" :title="`相关文件列表`" :visible.sync="dialogVisible"
               @opened="opened" @closed="closed" :before-close="beforeClose"
               :close-on-click-modal="false" class="_root_page" append-to-body>
        <el-row>
            <el-table ref="multipleTable" :data="tbData.records" tooltip-effect="dark"
                      :min-height="460" size="small"
                      @selection-change="handleSelectionChange"
                      highlight-current-row class="dp-pc">
                <el-table-column type="selection" width="45"></el-table-column>
                <el-table-column label="文件编号" fixed="left" show-overflow-tooltip min-width="200">
                    <template slot-scope="scope">{{ scope.row.documentNo }}</template>
                </el-table-column>
                <el-table-column label="文件名称" show-overflow-tooltip min-width="200">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="版本" show-overflow-tooltip min-width="60">
                    <template slot-scope="scope">{{ scope.row.version }}</template>
                </el-table-column>
                <el-table-column label="发布状态" show-overflow-tooltip min-width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 0" class="status-red">待发布</span>
                        <span v-else-if="scope.row.status === 1" class="status-green">已发布</span>
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" show-overflow-tooltip min-width="80">
                    <template slot-scope="scope">{{ scope.row.updateTime ? dayjs(scope.row.updateTime).format('YYYY-MM-DD') : '' }}</template>
                </el-table-column>
                <el-table-column label="操作人" show-overflow-tooltip min-width="80">
                    <template slot-scope="scope">{{ scope.row.updateUser }}</template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-row v-if="tbData.total" class="mg-t-20 mg-b-10 txt-c">
                <el-pagination :total="tbData.total" :current-page="tbData.current" :page-size="5"
                               layout="total, prev, pager, next, jumper"
                               @current-change="handlePaginationChange"
                               background>
                </el-pagination>
            </el-row>
        </el-row>
        <el-row class="hr"></el-row>
        <el-row slot="footer" class="dialog-footer mg-b-10">
            <el-row type="flex" justify="center" align="middle">
                <el-button type="default" size="small" icon="el-icon-refresh-left" @click="closed" class="btn">关 闭</el-button>
                <el-button type="primary" size="small" icon="el-icon-finished" :disabled="!!!tbSelectedArr.length" :loading="btnLoadingSave" @click="save" class="btn">添加选中文件</el-button>
            </el-row>
        </el-row>
    </el-dialog>

</template>

<script>

    import dayjs from 'dayjs';
    import api from "@api";

    export default {
        name: "dlTableRelated",
        props: {
            value: Boolean,
            params: Object,
        },
        data() {
            return {
                dayjs,

                dialogVisible: false,

                tbSelectedArr: [],
                tbFilter: {
                    name: '',
                    createTime: [],
                },
                tbData: {list: []},
                tbDataFilter: {...this.tbFilter},
                btnLoadingFilter: false,

                form: {},
                btnLoadingSave: false,
            }
        },
        computed: {

        },
        watch: {
            value(val) {
                this.dialogVisible = val;
            },
            dialogVisible(val) {
                this.$emit("input", val);
            }
        },
        methods: {
            opened: function() {
                let that = this;

                that.getTableData();
                that.tbSelectedArr = [...that.params.detail.linkedDocumentIds];
            },

            getTableData: function(page = 1, pageSize = 5) {
                let that = this;
                that.btnLoadingFilter = true;

                let params = {
                    ...that.tbDataFilter,
                    typeId: that.params.folderId,
                    pageCurrent: page,
                    pageSize,
                };

                api.systemDocumentPage(params).then((res) => {
                    // console.log(res);
                    if(res.data.status === 200) {
                        that.tbData = {...res.data.data};
                    }
                    that.btnLoadingFilter = false;
                });
            },
            handlePaginationChange: function(page) {
                this.getTableData(page);
            },
            handleSelectionChange: function(chooseArr) {
                this.tbSelectedArr = chooseArr;
            },
            save: function() {
                let that = this;

                let linkedDocumentIds = [];
                that.tbSelectedArr.map((v, k) => {
                    linkedDocumentIds.push(v.id);
                });

                api.systemDocumentUpdate({
                    ...that.params.detail,
                    linkedDocumentIds: linkedDocumentIds,
                }).then((res) => {
                    // console.log(res);
                    that.btnLoadingSave = false;

                    if(res.data.status === 200) {
                        that.dialogVisible = false;
                        that.$message.success('操作成功');
                        that.$emit();
                    }
                });
            },

            beforeClose: function(done) {
                done();
            },
            closed: function() {
                if(this.$refs.fm !== undefined) this.$refs.fm.resetFields();
                this.dialogVisible = false;
            },
        }
    }

</script>

<style lang="scss" scoped>

    ._root_page {

        .hr {
            margin: 20px -20px 0 -20px;
            border: 1px solid $color-main-light;
        }
    }

</style>