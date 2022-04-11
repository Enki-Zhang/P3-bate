<template>

    <el-dialog top="20vh" width="688px" :title="`办理中`" :visible.sync="dialogVisible"
               @opened="opened" @closed="closed" :before-close="beforeClose"
               :close-on-click-modal="false" append-to-body>
        <el-row>
            <el-table :data="tbData.records" size="small">
                <el-table-column label="事项">
                    <template slot-scope="scope">
                        {{ `${scope.row.formName}` }}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="申请/更新时间" sortable>
                    <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-row type="flex" justify="space-around">
                            <el-link type="primary" :underline="false" @click.native="showDLViewProcess(scope.row)">查看进度</el-link>
                            <el-link type="primary" :underline="false" @click.native="cancelProcess(scope.row)">删除</el-link>
                        </el-row>
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

        <!-- 组件：查看进度 -->
        <dl-view-progress v-model="dlVisibleViewProgress" :params="dlParams"></dl-view-progress>
    </el-dialog>

</template>

<script>

    import dayjs from 'dayjs';
    import api from "@api";
    import dlViewProgress from "@views/single/workbench/dlViewProgress";

    export default {
        name: "dlTableProcessing",
        props: {
            value: Boolean,
            params: Object,
        },
        components: {
            dlViewProgress,
        },
        data() {
            return {
                dayjs,

                dialogVisible: false,
                dlParams: {},
                dlVisibleViewProgress: false,

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

                api.workbenchRnningStartedByMePage(params).then((res) => {
                    if(res.data.status === 200) {
                        that.tbData = {...res.data.data};
                    }
                });
            },
            handlePaginationChange: function(page) {
                this.getTableData(page);
            },
            showDLViewProcess: function(row) {
                let that = this;

                api.all([
                    api.workbenchGetDetail(row.processInstanceId),
                    api.camundaGetProcessInstanceState(row.processInstanceId),
                ]).then((res) => {
                    if(res[0].data.status === 200 && res[1].data.status === 200) {
                        that.dlParams = {
                            formData: {...res[0].data.data},
                            processData: {...res[1].data.data},
                        };
                        that.dlVisibleViewProgress = true;
                    }
                });
            },
            cancelProcess: function(row, isProcessing = true) {
                let that = this;
                // console.log(row);return;

                api.camundaCancel(row.processInstanceId).then((res) => {
                    if(res.data.status === 200) {
                        that.$message.success('操作成功');
                        if(isProcessing) that.getTableDataProcessing();
                        else that.getTableDataApply();
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

<style scoped>

</style>