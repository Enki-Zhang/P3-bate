<template>

    <el-row class="_root_page">
        <el-row class="page-default-h-has-breadcrumb" style="background-color: red">
            <workflow :data="data" @ok="ok"/>
        </el-row>
    </el-row>

</template>

<script>

    import workflow from 'workflow-ui/src/components/Generator';
    import 'workflow-ui/lib/workflow-ui.css';

    export default {
        name: "index",
        components: {
            workflow,
        },
        data() {
            return {
                data: {
                    title: '请假',
                    node: {
                        name: '发起人',
                        type: 'start',
                        nodeId: 'sid-startevent',
                        childNode: {}
                    }
                },
            }
        },
        created() {},
        methods: {
            ok: function(data) {
                console.log(data)
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
            .bjs-powered-by {display: none !important;}
        }
    }

</style>