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
                        <form-preview ref="formPreview" :fixed='false' :submitBtn='false' @success="applyForm"></form-preview>
                    </el-row>
                </el-scrollbar>
                <el-scrollbar class="elsb-cp">
                    <el-row class="current-process">
                        <el-row class="_title">流程进度</el-row>
                        <el-timeline>
                            <el-timeline-item v-for="(v, k) in timeLineData" :key="k"
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
        <!--<el-row slot="footer" class="dialog-footer">
            <el-row type="flex" justify="center" align="middle">
                <el-button type="default" size="small" @click="closed" class="fn-btn">关 闭</el-button>
&lt;!&ndash;                <el-button type="primary" size="small" @click="save" class="fn-btn">保 存</el-button>&ndash;&gt;
            </el-row>
        </el-row>-->
    </el-dialog>

</template>

<script>

    import dayjs from 'dayjs';
    import api from "@api";
    import formPreview from "@components/formPreview";

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

                that.$refs.formPreview.showFn(that.params.formInfo);
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