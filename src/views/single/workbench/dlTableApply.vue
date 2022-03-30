<template>

    <el-dialog top="20vh" width="888px" :title="`申请历史记录`" :visible.sync="dialogVisible"
               @opened="opened" @closed="closed" :before-close="beforeClose"
               :close-on-click-modal="false" append-to-body>
        <el-row>
            <el-table :data="tbData.records" size="small">
                <el-table-column prop="createUserName" label="发起人" width="100"></el-table-column>
                <el-table-column prop="formName" label="事项"></el-table-column>
                <el-table-column prop="createTime" label="申请时间" sortable>
                    <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD') : '' }}</template>
                </el-table-column>
                <el-table-column prop="state" label="审批结果">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state === 0" class="status-blue">待审批</span>
                        <span v-else-if="scope.row.state === 1" class="status-green">已通过</span>
                        <span v-else-if="scope.row.state === -1" class="status-red">未通过</span>
                    </template>
                </el-table-column>
                <el-table-column prop="auditUserName" label="审批人">
                    <template slot-scope="scope">
                                <span v-for="(v, k) in scope.row.approve" :key="k">
                                    {{ v }}
                                </span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="审批时间">
                    <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</template>
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
        name: "dlTableApply",
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

                api.workbenchHistoryStartedByMePage(params).then((res) => {
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