<template>

    <el-dialog top="5vh" width="1000px"
               :title="`查看进度`" :visible.sync="dialogVisible"
               :before-close="beforeClose" :close-on-click-modal="false"
               @opened="opened" @closed="closed"
               append-to-body>
        <el-row>
            <el-row type="flex">
                <el-scrollbar class="elsb-pf">
                    <el-row class="preview-form">
                        <!-- 组件：自定义表单填写 -->
                        <form-preview ref="formPreview" :fixed='false' :submitBtn='false'></form-preview>
                    </el-row>
                </el-scrollbar>
                <el-scrollbar class="elsb-cp">
                    <el-row class="current-process">
                        <el-row class="_title">流程进度</el-row>
                        <el-timeline>
                            <el-timeline-item v-for="(v, k) in timeLineData.details" :key="k"
                                              :type="v.type" :color="v.color"
                                              :icon="v.icon" size="large"
                                              :timestamp="v.timestamp">
                                {{ v.content }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-row>
                </el-scrollbar>
            </el-row>
        </el-row>
        <el-row slot="footer" class="dialog-footer">
            <el-row type="flex" justify="center" align="middle">
<!--                <el-button type="default" size="small" @click="closed" class="fn-btn">关 闭</el-button>-->
                <el-button type="primary" size="small" @click="showDLApprovalConfirm" class="fn-btn">审 批</el-button>
            </el-row>
        </el-row>

        <!-- 组件：审批确认 -->
        <dl-approval-confirm v-model="dlVisibleApprovalConfirm" :params="dlParams" @done="closed"></dl-approval-confirm>
    </el-dialog>

</template>

<script>

    import dayjs from 'dayjs';
    import api from "@api";
    import formPreview from "@components/formPreview";
    import dlApprovalConfirm from "@views/single/workbench/dlApprovalConfirm";

    export default {
        name: "dlViewProgress",
        props: {
            value: Boolean,
            params: Object,
        },
        components: {
            formPreview,
            dlApprovalConfirm,
        },
        data() {
            return {
                dayjs,

                dlParams: {},
                dialogVisible: false,
                dlVisibleApprovalConfirm: false,

                timeLineData: [
                    {
                        content: '张三申请了钢笔',
                        timestamp: '2018-04-12 20:46',
                        icon: 'el-icon-check',
                        type: 'primary',
                    },
                    {
                        content: '工厂开始生产（审批中）',
                        timestamp: '2018-04-12 20:56',
                        color: '#1DC084'
                    },
                ],
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

                that.$refs.formPreview.showFn(that.params.formData.formInfo);
                that.mergeProcess();
            },
            mergeProcess: function() {
                let that = this;

                that.timeLineData.details = [];
                that.params.processData.details.map(v => {
                    let tmp = {
                        content: `${v.audiUserName}${v.operationName}`,
                        timestamp: v.operationTime ? dayjs(v.operationTime).format('YYYY-MM-DD HH:mm:ss') : '',
                        icon: !!v.complete ? 'el-icon-check' : '',
                        type: !!v.complete ? 'primary' : 'success',
                    };
                    that.timeLineData.details.push(tmp);
                });
                console.log(that.timeLineData);
            },
            showDLApprovalConfirm: function() {
                let that = this;

                api.camundaFindByProcessInstanceId(that.params.processInstanceId).then((res) => {
                    if(res.data.status === 200) {
                        that.dlParams = {...res.data.data};
                        that.dlVisibleApprovalConfirm = true;
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

    .elsb-pf {width: 640px; height: 600px; flex-shrink: 0;}
    .preview-form {
        background-color: #009688;
        width: 640px;
    }

    .elsb-cp {width: 320px; height: 600px; flex-shrink: 0;}
    .current-process {
        /*background-color: #003A71;*/
        width: 320px;
        height: 600px;
        padding: 20px 30px;

        ._title {
            margin-bottom: 25px;
            font-size: 22px;
            font-weight: 600;
            text-align: center;
        }
    }

</style>