<template>

    <el-dialog top="20vh" width="588px" :title="params.mode === 'create' ? '新增文件类型' : '编辑文件类型'" :visible.sync="dialogVisible"
               @opened="opened" @closed="closed" :before-close="beforeClose"
               :close-on-click-modal="false" append-to-body class="_root_page">
        <el-row>
            <el-form ref="fm" :model="form" size="small" label-position="right" label-width="160px" class="fm">
                <el-row>
                    <el-form-item prop="parentId" label="所属文件夹"
                                  :rules="[
                                      // {required: true, message: '请选择所属文件夹'},
                                      // {type: 'array', min: 1, message: '请选择所属文件夹'},
                                  ]">
                        <el-cascader v-model="form.parentId"
                                     :options="seloptsDir"
                                     :props="props"
                                     placeholder="请选择所属文件夹"
                                     clearable>
                        </el-cascader>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item prop="name" label="文件类型名称"
                                  :rules="[
                                      {required: true, message: '请填写文件类型名称'},
                                      {type: 'string', min: 1, max: 8, message: '长度应为 1 ~ 8 个字符'},
                                  ]">
                        <el-input v-model="form.name" placeholder="文件类型名称" clearable></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item prop="description" label="文件类型描述"
                                  :rules="[
                                      {required: true, message: '请填写文件类型描述'},
                                      {type: 'string', min: 1, max: 12, message: '长度应为 1 ~ 12 个字符'},
                                  ]">
                        <el-input v-model="form.description" placeholder="文件类型描述" clearable></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item prop="icon" label="选择图标"
                                  :rules="[
                                      {required: true, message: '请选择图标'},
                                      {validateAnnex, message: '请选择图标'}
                                  ]">
                        <el-row type="flex" class="icons">
                            <el-row v-for="(v, k) in iconArr" :key="k"
                                    @click.native="choosedIcon = v"
                                    :class="choosedIcon === v ? 'item active' : 'item'">
                                <img :src="require(`@assets/image/systemDoc/${v}`)">
                            </el-row>
                        </el-row>
                    </el-form-item>
                </el-row>
            </el-form>
        </el-row>
        <el-row slot="footer" class="dialog-footer">
            <el-row type="flex" justify="center" align="middle">
                <el-button type="default" icon="el-icon-refresh-left" size="small" @click="closed" class="fn-btn">取 消</el-button>
                <el-button type="primary" icon="el-icon-finished" size="small" @click="save" class="fn-btn">保 存</el-button>
            </el-row>
        </el-row>
    </el-dialog>

</template>

<script>

    import {mapState} from 'vuex';
    import api from '@api';
    import {validateAnnex} from '@plugins/man/validate';

    export default {
        name: "edit",
        props: {
            value: Boolean,
            params: Object,
        },
        data() {
            return {
                validateAnnex,
                dialogVisible: false,

                seloptsDir: [],
                props: {
                    lazy: true,
                    checkStrictly: true,
                    multiple: false,
                    lazyLoad: this.lazyLoadSeloptsDir,
                },

                form: {
                    parentId: -1,
                    name: '',
                    icon: '',
                    description: ''
                },
                iconArr: [
                    'aqglsc.png', 'cxwj.png', 'aqsc.png',
                    'bzczgc.png', 'fxpgbg.png', 'msds.png',
                ],
                choosedIcon: '',
            }
        },
        computed: {
            ...mapState(['userInfo']),
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

                if(that.params.id > 0) {
                    that.form = {
                        ...that.params.detail,
                        parentId: that.params.detail.parentId > 0 ? that.params.parentIdArr : [-1],
                        // parentId: that.params.parentIdArr[that.params.parentIdArr.length - 1],
                        // parentId: [1, 28],
                    };
                    // console.log(that.params, that.form);
                }
                that.choosedIcon = that.form.icon;
                that.initSeloptsDir();
            },
            save: function() {
                let that = this;
                that.form.icon = this.choosedIcon;
                // console.log(that.form); return;

                that.$refs.fm.validate(valid => {
                    if(valid) {
                        that.btnLoadingSave = true;

                        if(that.params.detail.id) {
                            api.systemDocumentTypeUpdate({
                                ...that.form,
                                parentId: that.form.parentId === -1 ? 0 : that.form.parentId[that.form.parentId.length - 1],
                            }).then((res) => {
                                // console.log(res);
                                that.btnLoadingSave = false;

                                if(res.data.status === 200) {
                                    that.dialogVisible = false;
                                    that.$message.success('操作成功');
                                    that.$emit('reloadTableData', 'success');
                                }
                            });
                        } else {
                            api.systemDocumentTypeSave({
                                ...that.form,
                                parentId: that.form.parentId === -1 ? 0 : that.form.parentId[that.form.parentId.length - 1],
                            }).then((res) => {
                                // console.log(res);
                                that.btnLoadingSave = false;

                                if(res.data.status === 200) {
                                    that.dialogVisible = false;
                                    that.$message.success('操作成功');
                                    that.$emit('reloadTableData', 'success');
                                }
                            });
                        }
                    } else {return false;}
                });
            },
            lazyLoadSeloptsDir: function(node, resolve) {
                let that = this;
                // console.log(node);

                if(node.value === 0) resolve([]);
                else {
                    api.systemDocumentTypeFindChildById({
                        id: node.value,
                        onlyShowEmpty: true,
                    }).then((res) => {
                        if(res.data.status === 200) {
                            let tmp = [];
                            res.data.data.map(v => {
                                tmp.push({
                                    value: Number(v.id),
                                    label: v.name,
                                    // leaf: level >= 2
                                });
                            });
                            resolve(tmp);
                        }
                    });
                }
            },

            initSeloptsDir: function() {
                let that = this;

                api.systemDocumentTypeFindChildById().then((res) => {
                    if(res.data.status === 200) {
                        that.seloptsDir = [{
                            label: '-- 自身为根目录 --',
                            value: -1,
                        }];
                        res.data.data.map(v => {
                            that.seloptsDir.push({
                                value: v.id,
                                label: v.name,
                                // leaf: level >= 2
                            });
                        });
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

    ._root_page {

        .icons {
            flex-wrap: wrap;
            .item {
                width: 100px;
                height: 100px;
                margin: 0 5px 5px 0;
                @include unable-select;
                @include cursor-pointer;

                &:hover {
                    background-color: #e0e0e0;
                    transition: .3s;
                }
            }
            .item.active {background-color: #e0e0e0; transition: .6s;}
        }

        ::v-deep {}
    }

</style>