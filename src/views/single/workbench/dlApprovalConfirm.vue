<template>

    <el-dialog top="28vh" width="450px"
               :title="`查看进度`" :visible.sync="dialogVisible"
               :before-close="beforeClose" :close-on-click-modal="false"
               @opened="opened" @closed="closed"
               append-to-body>
        <el-row>
            <el-row style="width: 100%;">
                <el-form ref="fm" :model="form" label-position="right" size="small" label-width="90px">
                    <el-form-item prop="status" label="审核结果">
                        <el-radio v-model="form.status" :label="1">审核通过</el-radio>
                        <el-radio v-model="form.status" :label="0">审核不通过</el-radio>
                    </el-form-item>
                    <el-form-item v-if="form.status === 0" prop="remark" label="意见/备注"
                                  :rules="[
                                      {required: true, message: '审核不通过时请填写意见/备注'},
                                      {type: 'string', min: 1, message: '审核不通过时请填写意见/备注'},
                                  ]">
                        <el-input v-model="form.remark" placeholder="意见/备注"
                                  type="textarea" resize="none"
                                  clearable></el-input>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-row>
        <el-row slot="footer" class="dialog-footer">
            <el-row type="flex" justify="center" align="middle">
                <el-button type="default" size="small" @click="closed" class="fn-btn">关 闭</el-button>
                <el-button type="primary" size="small" @click="save" class="fn-btn">保 存</el-button>
            </el-row>
        </el-row>

        <!-- 组件：审批确认 -->

    </el-dialog>

</template>

<script>

    import dayjs from 'dayjs';
    import api from "@api";
    import formPreview from "@components/formPreview";

    export default {
        name: "dlApprovalConfirm",
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

                form: {
                    status: 1,
                    remark: '',
                },
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

                console.log(that.params);
            },
            save: function() {
                let that = this;

                let params = {
                    processInstanceId: that.params.processInstanceId,
                    value: {},
                };
                params.value[that.params.gateWayValue] = !!that.form.status;

                api.camundaComplete(params).then((res) => {
                    if(res.data.status === 200) {
                        that.$emit('done', true);
                        that.closed();
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



</style>