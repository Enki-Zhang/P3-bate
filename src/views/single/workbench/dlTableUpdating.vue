<template>

    <el-dialog top="20vh" width="588px" :title="`更新信息`" :visible.sync="dialogVisible"
               @opened="opened" @closed="closed" :before-close="beforeClose"
               :close-on-click-modal="false" append-to-body>
        <el-row>
            <el-table :data="tbData.records" size="small">
                <el-table-column prop="operation" label="事项">
                    <template slot-scope="scope">
                        {{ `${scope.row.operation}` }}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="更新时间" sortable>
                    <template slot-scope="scope">{{ scope.row.operationDate ? dayjs(scope.row.operationDate).format('YYYY-MM-DD HH:mm:ss') : '' }}</template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-link type="primary" :underline="false" @click.native="removeRow(scope.$index, scope.row)">审批</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row slot="footer" class="dialog-footer">
            <el-row type="flex" justify="center" align="middle">
                <el-button type="default" size="small" @click="closed" class="fn-btn">关 闭</el-button>
<!--                <el-button type="primary" size="small" @click="save" class="fn-btn">保 存</el-button>-->
            </el-row>
        </el-row>

        <!-- 分页 -->
        <el-row v-if="tbData.total" class="mg-t-20 mg-b-10 txt-c">
            <el-pagination :total="tbData.total" :current-page="tbData.current" :page-size="5"
                           layout="total, prev, pager, next, jumper"
                           @current-change="handlePaginationChange"
                           background>
            </el-pagination>
        </el-row>
    </el-dialog>

</template>

<script>

    import dayjs from 'dayjs';
    import api from "@api";

    export default {
        name: "dlTableUpdating",
        props: {
            value: Boolean,
            params: Object,
        },
        data() {
            return {
                dayjs,

                dialogVisible: false,

                tbData: {records: [], total: 0},
            }
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

                that.getTableData(1);
            },

            getTableData: function(page = 1, pageSize = 5) {
                let that = this;

                let params = {
                    pageCurrent: page,
                    pageSize,
                };

                api.workbenchUpdateInfoPage(params).then((res) => {
                    if(res.data.status === 200) {
                        that.tbData = {...res.data.data};
                    }
                });
            },
            handlePaginationChange: function(page) {
                this.getTableData(page);
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

<style scoped>

</style>