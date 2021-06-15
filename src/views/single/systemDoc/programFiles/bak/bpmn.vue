<template>

    <el-row class="_root_page">
        <el-row type="flex" class="gn-block mg-t-5 mg-lr-20">
            <el-button type="default" size="mini" @click="loadDefault">读取默认文件</el-button>
            <el-button type="primary" size="mini" @click="mockRequest">模拟请求文件</el-button>
            <el-button type="success" size="mini" @click="saveBPMN">保存为 bpmn</el-button>
            <el-button type="info" size="mini" @click="saveSVG">保存为 svg</el-button>
        </el-row>
        <el-row class="bg-canvas">
            <div ref="content" class="containers">
                <div ref="canvas" class="canvas"></div>
                <div id="js-properties-panel" class="panel"></div>
            </div>
        </el-row>

    </el-row>

</template>

<script>

    import BpmnModeler from 'bpmn-js/lib/Modeler';
    import {xmlStr} from "./xmlStr";
    import propertiesPanelModule from 'bpmn-js-properties-panel';
    import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
    import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
    import {mockAjaxXML} from "./mockAjaxXML";

    export default {
        name: "index",
        components: {},
        data() {
            return {
                bpmnModeler: null,
                container: null,

                aaa: '',
            }
        },
        created() {},
        mounted() {
            // 获取到属性 ref 为 “content” 的 dom 节点
            this.container = this.$refs.content
            // 获取到属性 ref 为 “canvas” 的 dom 节点
            const canvas = this.$refs.canvas;
            // 生成实例
            this.bpmnModeler = new BpmnModeler({
                container: canvas,
                // 添加控制板
                propertiesPanel: {
                    parent: '#js-properties-panel'
                },
                additionalModules: [
                    // 左边工具栏以及节点
                    propertiesProviderModule,
                    // 右边的工具栏
                    propertiesPanelModule
                ],
                moddleExtensions: {
                    // camunda: camundaModdleDescriptor
                }
            });
            this.loadDefault();
        },
        methods: {
            readXML: async function(data) {
                let that = this;

                // 将字符串转换成图显示出来
                try {
                    const result = await that.bpmnModeler.importXML(data);
                    console.log(result.warnings);
                    // 让图能自适应屏幕
                    that.bpmnModeler.get('canvas').zoom('fit-viewport');
                    // 监听画板改变
                    that.bpmnModeler.on('commandStack.changed', function () {
                        console.log('bpmn 改变');
                    })
                } catch (err) {
                    console.log(err.message, err.warnings);
                }
            },
            loadDefault: function() {
                let that = this;

                that.$toast.loading('加载中');

                setTimeout(function() {
                    that.readXML(xmlStr);
                    that.$toast.clear();
                }, 1000);
            },
            mockRequest: function() {
                let that = this;

                that.$toast.loading('加载中');

                setTimeout(function() {
                    that.readXML(mockAjaxXML);
                    that.$toast.clear();
                }, 1000);
            },

            saveBPMN: function() {
                let that = this;

                that.bpmnModeler.saveXML({format: true}, function(err, xml) {
                    // console.log(err, xml);
                    that.asDownloadFile(xml, that.man.datetime.dhms('bpmn_', '.bpmn'));
                });
            },
            saveSVG: function() {
                let that = this;

                that.bpmnModeler.saveSVG(function(err, svg) {
                    // console.log(svg);
                    that.asDownloadFile(svg, that.man.datetime.dhms('bpmn_', '.svg'));
                });
            },
            asDownloadFile: function(data, fileName) {
                let alink = document.createElement('a');
                alink.download = fileName;
                alink.style.display = 'none';
                alink.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodeURIComponent(data);
                document.body.appendChild(alink);
                alink.click();
                document.body.removeChild(alink);
            },
        }
    }

</script>

<style lang="scss" scoped>

    /*左边工具栏以及编辑节点的样式*/
    @import '~bpmn-js/dist/assets/diagram-js.css';
    @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
    @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
    @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
    // 右边工具栏样式
    @import '~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';

    ._root_page {
        padding: 15px;

        .gn-block {
            button {width: max-content;}
        }

        .bg-canvas {
            .canvas{
                width: 100%;
                height: calc(100vh - 130px);

                .bjs-powered-by {display: none;}
            }

            .panel {
                width: 300px;
                position: absolute;
                top: 0;
                right: 20px;
            }
        }

        /*.containers{*/
        /*    position: absolute;*/
        /*    background-color: #ffffff;*/
        /*    width: 100%;*/
        /*    height: 100%;*/
        /*    .canvas{*/
        /*        width: 100%;*/
        /*        height: 100%;*/
        /*    }*/
        /*    .bjs-powered-by {*/
        /*        display: none;*/
        /*    }*/
        /*}*/
    }

    ._root_page ::v-deep .el-button--text {
        width: max-content;
    }

</style>