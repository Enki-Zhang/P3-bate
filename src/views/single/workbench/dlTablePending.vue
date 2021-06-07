<template>

    <el-dialog top="20vh" width="588px" :title="`待我审批`" :visible.sync="dialogVisible"
               @opened="opened" @closed="closed" :before-close="beforeClose"
               :close-on-click-modal="false" append-to-body>
        <el-row>
            <el-table :data="tbData.list" size="small">
                <el-table-column label="事项">
                    <template slot-scope="scope">
                        {{ `${scope.row.sponsorName} ${scope.row.matter}` }}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="时间" sortable>
                    <template slot-scope="scope">{{ scope.row.createTime ? dayjs(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') : '' }}</template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-link type="primary" :underline="false" @click.native="removeRow(scope.$index, scope.row)">详情</el-link>
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
    </el-dialog>

</template>

<script>

    export default {
        name: "edit",
        props: {
            value: Boolean,
            params: Object,
        },
        data() {
            return {
                dialogVisible: false,

                tbData: {list: []},
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

                that.tbData = {...that.params};
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