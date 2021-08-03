<template>

    <el-dialog top="20vh" width="588px" :title="params.mode === 'create' ? '新增文件类型' : '编辑文件类型'" :visible.sync="dialogVisible"
               @opened="opened" @closed="closed" :before-close="beforeClose"
               :close-on-click-modal="false" append-to-body class="_root_page">
        <el-row>
            <el-form ref="fm" :model="form" label-position="right" label-width="120px">
                <el-row>
                    <el-form-item prop="name" label="文件类型名称" size="small" :rules="[
                            {required: true, message: '请填写文件类型名称'},
                            {type: 'string', min: 2, max: 8, message: '长度应为 2 ~ 8 个字符'},
                        ]">
                        <el-input v-model="form.name" placeholder="文件类型名称" clearable></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item prop="description" label="文件类型描述" size="small" :rules="[
                            {required: true, message: '请填写文件类型描述'},
                            {type: 'string', min: 2, max: 12, message: '长度应为 2 ~ 12 个字符'},
                        ]">
                        <el-input v-model="form.description" placeholder="文件类型描述" clearable></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item prop="icon" label="选择图标" size="small" :rules="[
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

                form: {
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
                this.form = {...this.params.detail};
                this.choosedIcon = this.form.icon;
            },

            save: function() {
                let that = this;
                that.form.icon = this.choosedIcon;
                console.log(that.form);

                that.$refs.fm.validate(valid => {
                    if(valid) {
                        that.btnLoadingSave = true;

                        if(that.params.detail.id) {
                            api.systemDocumentTypeUpdate({
                                ...that.form,
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