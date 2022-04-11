<template>

    <el-dialog top="20vh" width="688px" :title="`更新信息`" :visible.sync="dialogVisible"
               @opened="opened" @closed="closed" :before-close="beforeClose"
               :close-on-click-modal="false" append-to-body>
        <el-row>
            <el-table :data="tbData.records" size="small">
                <el-table-column prop="operation" label="事项">
                    <template slot-scope="scope">
                        {{ `${scope.row.operation}${scope.row.type === 'CUSTOM_FORM' ? '表格' : '文件'} ${scope.row.name}` }}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="更新时间" sortable>
                    <template slot-scope="scope">{{ scope.row.operationDate ? dayjs(scope.row.operationDate).format('YYYY-MM-DD HH:mm:ss') : '' }}</template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-link v-if="scope.row.operation !== '删除' && scope.row.operation !== '创建'"
                                 type="primary" :underline="false"
                                 @click.native="navUpdatingDetail(scope.row)">详情</el-link>
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
            navUpdatingDetail: function(row) {
                let that = this;
                // console.log(row);

                switch (row.type) {
                    case 'CUSTOM_FORM':
                        that.$router.push({
                            path: '/forms/forms-forms-edit',
                            query: {
                                id: row.id,
                            }
                        });
                        break;
                    case 'SYSTEM_DOCUMENT':
                        that.$router.push({
                            path: '/system-doc/management-manual/detail',
                            query: {
                                id: row.id,
                            }
                        });
                        break;
                }
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