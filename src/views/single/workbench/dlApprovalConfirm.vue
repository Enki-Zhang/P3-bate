<template>

    <el-dialog top="28vh" width="450px"
               :title="`查看进度`" :visible.sync="dialogVisible"
               :before-close="beforeClose" :close-on-click-modal="false"
               @opened="opened" @closed="closed"
               append-to-body>
        <el-row>
            <el-row style="width: 100%;">
                <el-form ref="fm" :model="form" label-position="right" size="small" label-width="110px" class="fm">
                    <el-form-item prop="pass" label="审核结果">
                        <el-radio v-model="form.pass" :label="1">审核通过</el-radio>
                        <el-radio v-model="form.pass" :label="0">审核不通过</el-radio>
                    </el-form-item>
                    <el-form-item prop="suggestion" label="意见/备注"
                                  :rules="[
                                      // {required: false, message: '审核不通过时请填写意见/备注'},
                                      // {type: 'string', min: 1, message: '审核不通过时请填写意见/备注'},
                                  ]">
                        <el-input v-model="form.suggestion" placeholder="意见/备注"
                                  type="textarea" resize="none"
                                  clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="sign" label="手写签名" style="margin-bottom: unset;">
                        <el-row class="_sign">
                            <vue-esign ref="esign"
                                       :width="320" :height="180"
                                       :line-width="3" line-color="#000000"
                                       bg-color="#F9F9F9" :is-crop="false">
                            </vue-esign>
                        </el-row>
                        <!--<el-row type="flex" class="mg-t-5">
                            <el-button type="default" icon="el-icon-refresh" @click="handleResetEsign" style="width: max-content;">重置画板</el-button>
                            <el-button type="warning" icon="el-icon-finished" @click="handleSaveEsign" style="width: max-content;">保存签名</el-button>
                        </el-row>-->
                    </el-form-item>
                </el-form>
            </el-row>
        </el-row>
        <el-row slot="footer" class="dialog-footer">
            <el-row type="flex" justify="center" align="middle">
                <el-button type="warning" size="small" @click="handleResetEsign" class="fn-btn">重置画板</el-button>
                <el-button type="default" size="small" @click="closed" class="fn-btn">关 闭</el-button>
                <el-button type="primary" size="small" :loading="btnLoadingSave" @click="save" class="fn-btn">保 存</el-button>
            </el-row>
        </el-row>

        <!-- 组件： -->
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
                    pass: 1,
                    suggestion: '',
                    autographPath: '',
                },
                btnLoadingSave: false,
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
                // console.log(that.params);
            },
            save: function() {
                let that = this;

                that.$refs.esign.generate().then(base64DataUrl => {
                    that.btnLoadingSave = true;
                    // console.log(base64DataUrl);
                    // console.log(that.man.file.base64ToFile(base64DataUrl));

                    api.uploadBase64(base64DataUrl).then((res) => {
                        if(res.data.status === 200) {
                            api.camundaComplete({
                                ...that.form,
                                processInstanceId: that.params.processInstanceId,
                                autographPath: res.data.data,
                            }).then((resApproval) => {
                                if(resApproval.data.status === 200) {
                                    that.$message.success('操作成功');
                                    that.$emit('done', true);
                                    that.closed();
                                } else {that.btnLoadingSave = false;}
                            });
                        } else {that.btnLoadingSave = false;}
                    });
                }).catch(err => {
                    that.$message.warning(`签名保存异常：${err}`);
                });
            },
            handleResetEsign: function() {
                let that = this;
                that.$refs.esign.reset();
                that.form.sign = '';
            },
            handleSaveEsign: function() {
                let that = this;

                that.$refs.esign.generate().then(res => {
                    console.log(res);
                    that.form.sign = res;
                }).catch(err => {
                    that.$message.warning(err);
                });
            },

            beforeClose: function(done) {
                done();
            },
            closed: function() {
                if(this.$refs.fm !== undefined) this.$refs.fm.resetFields();
                this.handleResetEsign();
                this.dialogVisible = false;
            },
        }
    }

</script>

<style lang="scss">

    ._sign {
        background-color: #F9F9F9;
        /*border: 1px dashed #cccccc;*/
        /*canvas {width: 650px !important; height: 500px !important;}*/
    }

</style>