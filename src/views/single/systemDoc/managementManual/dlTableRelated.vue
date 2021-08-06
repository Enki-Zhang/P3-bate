<template>

    <el-dialog top="12vh" width="888px" :title="`相关文件列表`" :visible.sync="dialogVisible"
               @opened="opened" @closed="closed" :before-close="beforeClose"
               :close-on-click-modal="false" class="_root_page" append-to-body>
        <el-row>
            <el-table ref="tbRelated" :data="tbData.records" tooltip-effect="dark"
                      :max-height="460" size="small"
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
                tbData: {records: []},
                tbDataFilter: {...this.tbFilter},
                btnLoadingFilter: false,
                linkedDocumentIds: [],

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
            },

            getTableData: function(page = 1, pageSize = 5) {
                let that = this;
                that.btnLoadingFilter = true;

                let params = {
                    // ...that.tbDataFilter,
                    typeId: that.params.folderId,
                    // pageCurrent: page,
                    // pageSize,
                };

                api.systemDocumentList(params).then((res) => {
                    // console.log(res);
                    if(res.data.status === 200) {
                        that.tbData.records = [...res.data.data];

                        that.$nextTick(function() {
                            that.generateTbSelectedArr(that.tbData.records, that.params.detail.linkedDocumentIds);
                        });
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
            generateTbSelectedArr: function(tableData = [], ids = '', needSplit = false) {
                let that = this;
                if(needSplit) ids = ids.split(',');

                tableData.map((v, k) => {
                    if(that.man.fast.inArray(v.id, ids)) {
                        that.tbSelectedArr.push(v);
                    }
                })
                that.handleRowDefaultSelection(that.tbSelectedArr);
            },
            handleRowDefaultSelection: function(rows = []) {
                if(!!rows.length) {
                    rows.map(row => {
                        this.$refs.tbRelated.toggleRowSelection(row, true);
                    });
                }
            },
            save: function() {
                let that = this;

                that.dialogVisible = false;
                // that.$message.success('操作成功');
                that.$emit('changeTableData', that.tbSelectedArr);
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