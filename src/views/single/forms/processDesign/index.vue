<template>

    <el-row class="_root_page">
        <el-row type="flex" class="page-default-h-has-breadcrumb">
            <my-process-designer ref="processDesigner"
                                 :key="`designer-${reloadIndex}`"
                                 v-model="xmlString"
                                 v-bind="controlForm"
                                 @element-click="elementClick"
                                 @init-finished="initModeler"
                                 keyboard/>
            <my-properties-panel :key="`penal-${reloadIndex}`"
                                 :bpmn-modeler="modeler"
                                 :prefix="controlForm.prefix"
                                 class="process-panel"/>
            <!--<el-row type="flex" class="test-btns">
                <el-button type="success" icon="el-icon-warning-outline" size="mini"
                           @click="asAndConsole('xml')">显示画布内容
                </el-button>
                <el-upload ref="otherFiles"
                           action="" accept=".xml, .bpmn"
                           :auto-upload="false" :show-file-list="false"
                           :on-change="(file, fileList) => {chooseUploadFile(file, fileList, 'files')}">
                    <el-button type="primary" icon="el-icon-link" size="mini">渲染文件内容</el-button>
                </el-upload>
                <el-button type="warning" icon="el-icon-video-play" size="mini"
                           @click="playCurrentDesign()">{{ simulationStatus ? '返回编辑' : '开始运行' }}</el-button>
            </el-row>-->
        </el-row>
    </el-row>

</template>

<script>

    import "bpmn-js/dist/assets/diagram-js.css";
    import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
    import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
    // 自定义渲染（隐藏了 label 标签）
    // import CustomRenderer from "@/modules/custom-renderer";
    // 自定义元素选中时的弹出菜单（修改 默认任务 为 用户任务）
    import CustomContentPadProvider from "~package/process-designer/plugins/content-pad";
    // 自定义左侧菜单（修改 默认任务 为 用户任务）
    import CustomPaletteProvider from "~package/process-designer/plugins/palette";
    import DefaultEmptyXML from "~package/process-designer/plugins/defaultEmpty";
    // 模拟流转流程
    import tokenSimulation from "bpmn-js-token-simulation";

    export default {
        name: "index",
        components: {},
        data() {
            return {
                modeler: null,
                processId: '',
                processName: '',
                reloadIndex: 0,
                xmlString: '',
                simulationStatus: false,

                controlForm: {
                    processId: '',
                    processName: '',
                    simulation: true,
                    labelEditing: false,
                    labelVisible: false,
                    prefix: 'camunda',
                    headerButtonSize: 'mini',
                    additionalModel: [CustomContentPadProvider, CustomPaletteProvider]
                },
            }
        },
        created() {},
        methods: {
            initModeler(modeler) {
                this.$nextTick(function() {
                    this.modeler = modeler;
                    console.log(this.modeler);
                });
            },
            elementClick(element) {
                this.element = element;
            },

            asAndConsole: async function(type) {
                let that = this;

                try {
                    // 按需要类型创建文件并下载
                    if (type === "xml" || type === "bpmn") {
                        const {err, xml} = await that.modeler.saveXML();
                        // 读取异常时抛出异常
                        if (err) {
                            console.error(`[Process Designer Warn ]: ${err.message || err}`);
                        }
                        console.log(xml);
                        // let {href, filename} = that.setEncoded(type.toUpperCase(), name, xml);
                        // console.log(href, filename);
                    } else {
                        const {err, svg} = await that.modeler.saveSVG();
                        // 读取异常时抛出异常
                        if (err) {
                            return console.error(err);
                        }
                        console.log(svg);
                        // let {href, filename} = that.setEncoded("SVG", name, svg);
                        // console.log(href, filename);
                    }
                } catch (e) {
                    console.error(`[Process Designer Warn ]: ${e.message || e}`);
                }
            },
            chooseUploadFile: function(file, fileList, ref, refIsArray = true) {
                let that = this;
                // console.log(file.raw);

                let fileNameArr = file.name.split('.');
                if(fileNameArr.length < 2 || !that.man.fast.inArray(fileNameArr[fileNameArr.length - 1].toLowerCase(), ['xml', 'bpmn', ])) {
                    that.$toast.fail({
                        message: '不支持的格式',
                        duration: 1888
                    });
                    return false;
                }

                that.$toast.loading({
                    message: '解析并渲染',
                    forbidClick: true,
                    loadingType: 'spinner',
                });

                setTimeout(function() {
                    const reader = new FileReader();
                    reader.readAsText(file.raw);
                    reader.onload = function () {
                        let xmlStr = this.result;
                        that.createNewDiagram(xmlStr);
                    };

                    that.$toast.success({
                        message: '渲染完成',
                        duration: 888
                    });
                }, 1288);
            },
            playCurrentDesign: function() {
                let that = this;

                that.simulationStatus = !that.simulationStatus;
                that.modeler.get("toggleMode").toggleMode();
            },

            /**
             * 根据所需类型进行转码并返回下载地址
             * @param type
             * @param filename
             * @param data
             * @returns {{filename: string, data: *, href: string}}
             */
            setEncoded(type, filename = "diagram", data) {
                const encodedData = encodeURIComponent(data);
                return {
                    filename: `${filename}.${type}`,
                    href: `data:application/${type === "svg" ? "text/xml" : "bpmn20-xml"};charset=UTF-8,${encodedData}`,
                    data: data
                };
            },
            /**
             * 创建新的流程图
             * @param xml
             * @returns {Promise<void>}
             */
            async createNewDiagram(xml) {
                // 将字符串转换成图显示出来
                let newId = this.processId || `Process_${new Date().getTime()}`;
                let newName = this.processName || `业务流程_${new Date().getTime()}`;
                let xmlString = xml || DefaultEmptyXML(newId, newName, this.prefix);
                try {
                    let {warnings} = await this.modeler.importXML(xmlString);
                    if (warnings && warnings.length) {
                        warnings.forEach(warn => console.warn(warn));
                    }
                } catch (e) {
                    console.error(`[Process Designer Warn]: ${e.message || e}`);
                }
            },
        }
    }

</script>

<style lang="scss" scoped>

    ._root_page {
        padding: 15px;

        .test-btns {
            button {width: max-content; margin-right: 3px;}
        }

        ::v-deep {
            .my-process-designer {
                .my-process-designer__header {
                    display: flex;
                    flex-wrap: wrap;
                    .el-button-group {
                        margin: 0 4px 4px 0;
                        display: flex;
                    }
                }
                .my-process-designer__container {
                    .my-process-designer__canvas {
                        height: calc(100vh - 180px);
                    }
                }
            }
            .process-panel__container {
                background-color: white;
                width: 600px !important;
                max-height: calc(100vh - 120px);
                padding: 0 0 0 8px;
                @include scroll-bar;

                .panel-tab__content {
                    .el-table {
                        tbody .cell:last-child {
                            display: flex;
                            align-items: center;
                        }
                    }
                    .panel-tab__content--title .el-button,
                    .element-drawer__button .el-button {width: max-content;}
                }
            }
            .djs-palette {left: 10px;}
            .bjs-powered-by {display: none !important;}
        }
    }

</style>