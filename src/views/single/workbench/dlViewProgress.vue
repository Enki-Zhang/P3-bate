<template>

    <el-dialog top="5vh" width="1000px" :title="`查看进度`" :visible.sync="dialogVisible"
               @opened="opened" @closed="closed" :before-close="beforeClose"
               :close-on-click-modal="false" append-to-body>
        <el-row>
            <!-- 组件：自定义表单填写 -->
            <form-preview ref="formPreview" :fixed='false' :submitBtn='false' @success="applyForm"></form-preview>
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

    import dayjs from 'dayjs';
    import api from "@api";
    import formPreview from "@components/formPreview";
    import dlTableRelated from "@views/single/systemDoc/managementManual/dlTableRelated";
    import dlTableForms from "@views/single/systemDoc/managementManual/dlTableForms";

    export default {
        name: "dlViewProgress",
        props: {
            value: Boolean,
            params: Object,
        },
        components: {
            formPreview,
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

                // that.getTableData(1);
            },
            applyForm: function(formInfo) {
                let that = this;
                // console.log(formInfo);

                api.customFormInfoSave({
                    documentId: that.detail.id,
                    formId: that.applyFormItem.id,
                    formInfo: formInfo,
                    // uuid: that.man.fast.getUUID(),
                }).then((res) => {
                    if(res.data.status === 200) {
                        that.$message.success('操作成功');
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