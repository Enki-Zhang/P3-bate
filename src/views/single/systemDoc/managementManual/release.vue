<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <!-- 新增文件 -->
                <el-row class="block mg-b-10">
                    <el-row class="title lh-30 pd-b-10">新增</el-row>
                    <el-row class="fm fm-max-w">
                        <el-form ref="fm" :model="form" label-position="right" size="small" label-width="100px">
                            <el-row>
                                <el-form-item prop="number" label="文件编号" :rules="[
                                    {required: true, message: '请填写文件编号'},
                                    {type: 'string', min: 5, max: 30, message: '长度应为 5 ~ 30 个字符'},
                                ]">
                                    <el-input v-model="form.number" placeholder="文件编号" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="fileName" label="文件名称" :rules="[
                                    {required: true, message: '请填写文件名称'},
                                    {type: 'string', min: 5, max: 30, message: '长度应为 5 ~ 30 个字符'},
                                ]">
                                    <el-input v-model="form.fileName" placeholder="文件名称" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="version" label="文件版本" :rules="[
                                    {required: true, message: '请填写文件版本'},
                                    {type: 'string', min: 5, max: 30, message: '长度应为 5 ~ 30 个字符'},
                                ]">
                                    <el-input v-model="form.version" placeholder="文件版本" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="files" label="其他附件" size="mini">
                                    <el-row v-if="!form.files.length" style="width: max-content;">
                                        <el-upload
                                                ref="otherFiles" action=""
                                                :auto-upload="false" :show-file-list="false"
                                                :on-change="(file, fileList) => {chooseUploadFile(file, fileList, 'files')}">
                                            <!--                                        <span class="img-link"><span class="el-icon-link mg-r-5"></span>上传附件</span>-->
                                            <el-button type="primary" icon="el-icon-link" style="width: 120px;">上传附件</el-button>
                                        </el-upload>
                                    </el-row>
                                    <el-row>
                                        <el-row v-if="form.files.length" style="width: max-content;">
                                            <el-upload
                                                    ref="otherFiles" action=""
                                                    :auto-upload="false" :show-file-list="false"
                                                    :on-change="(file, fileList) => {chooseUploadFile(file, fileList, 'files')}">
                                                <!--                                            <span class="img-link"><span class="el-icon-link mg-r-5"></span>上传附件</span>-->
                                                <el-button type="primary" icon="el-icon-link" style="width: 120px;">上传附件</el-button>
                                            </el-upload>
                                        </el-row>
                                        <el-row v-for="(v, k) in form.files" :key="k">
                                            <el-row type="flex" class="mg-t-3">
                                                <el-input v-model="form.files[k].fileCnName" size="mini" class="files-item" clearable>
                                                    <template slot="prepend">附件名（中）</template>
                                                </el-input>
                                                <el-input v-model="form.files[k].fileEnName" class="files-item mg-l-3" clearable>
                                                    <template slot="prepend">附件名（英）</template>
                                                </el-input>
                                            </el-row>
                                            <el-row type="flex" class="mg-t-3">
                                                <el-input v-model="form.files[k].fileExternalUrl" class="files-item" clearable>
                                                    <template slot="prepend">二维码链接</template>
                                                </el-input>
                                                <!--                                                <el-button type="success" icon="el-icon-zoom-in" class="files-item-del" @click="previewFileByOpenNewBlank('files', true, k)">保存链接</el-button>-->
                                                <el-button type="warning" icon="el-icon-zoom-in" class="files-item-del" @click="previewFileByOpenNewBlank('files', true, k)">预览</el-button>
                                                <el-button type="danger" icon="el-icon-delete" class="files-item-del" @click="removeUploadFile('files', k)">移除</el-button>
                                            </el-row>
                                        </el-row>
                                    </el-row>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="locked" label="文件状态">
                                    <el-switch v-model="form.locked"
                                               :active-value="1" active-text="发布"
                                               :inactive-value="0" inactive-text="撤下">
                                    </el-switch>
                                </el-form-item>
                            </el-row>
                        </el-form>
                    </el-row>
                </el-row>
                <el-row class="hr"></el-row>
                <!-- 相关文件列表 -->
                <el-row class="block mg-t-10 mg-b-20">
                    <el-row type="flex" justify="space-between" align="middle" class="title">
                        <span>相关文件</span>
                        <el-button type="primary" icon="el-icon-plus" size="mini" class="btn">新增</el-button>
                    </el-row>
                    <!-- 列表 -->
                    <el-table ref="multipleTable" :data="tbData.list" tooltip-effect="dark"
                              :min-height="460" size="small"
                              highlight-current-row>
                        <el-table-column label="版本" show-overflow-tooltip min-width="60">
                            <template slot-scope="scope">{{ scope.row.version }}</template>
                        </el-table-column>
                        <el-table-column label="程序文件名称" show-overflow-tooltip min-width="220">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="文件编号" fixed="left" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.id }}</template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" show-overflow-tooltip width="80">
                            <template slot-scope="scope">
                                <el-row type="flex">
                                    <el-link type="primary" :underline="false" @click="remove(scope.row)" class="fs-12">删除</el-link>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <el-row v-if="tbData.total" class="mg-t-20 mg-b-10 txt-c">
                        <el-pagination :total="tbData.total" :current-page="tbData.current" :page-size="5"
                                       layout="total, prev, pager, next, jumper"
                                       @current-change="handlePaginationChange"
                                       background>
                        </el-pagination>
                    </el-row>
                </el-row>
                <el-row class="hr"></el-row>
                <!-- 记录 -->
                <el-row class="block mg-t-10 mg-b-20">
                    <el-row type="flex" justify="space-between" align="middle" class="title">
                        <span>记录</span>
                        <el-button type="primary" icon="el-icon-plus" size="mini" class="btn">新增</el-button>
                    </el-row>
                    <!-- 列表 -->
                    <el-table ref="multipleTable" :data="tbData.list" tooltip-effect="dark"
                              :min-height="460" size="small"
                              highlight-current-row>
                        <el-table-column label="版本" show-overflow-tooltip min-width="60">
                            <template slot-scope="scope">{{ scope.row.version }}</template>
                        </el-table-column>
                        <el-table-column label="程序文件名称" show-overflow-tooltip min-width="220">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="文件编号" fixed="left" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.id }}</template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" show-overflow-tooltip width="80">
                            <template slot-scope="scope">
                                <el-row type="flex">
                                    <el-link type="primary" :underline="false" @click="remove(scope.row)" class="fs-12">删除</el-link>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <el-row v-if="tbData.total" class="mg-t-20 mg-b-10 txt-c">
                        <el-pagination :total="tbData.total" :current-page="tbData.current" :page-size="5"
                                       layout="total, prev, pager, next, jumper"
                                       @current-change="handlePaginationChange"
                                       background>
                        </el-pagination>
                    </el-row>
                </el-row>
                <el-row class="hr"></el-row>
                <el-row class="mg-t-25 mg-b-10">
                    <el-row type="flex" justify="center" align="middle">
                        <el-button type="default" size="small" icon="el-icon-refresh-left" @click="cancel" class="btn">返回页面</el-button>
                        <el-button type="primary" size="small" icon="el-icon-finished" :loading="btnLoadingSave" @click="save" class="btn">保存修改</el-button>
                    </el-row>
                </el-row>
            </el-row>
        </el-row>
    </el-row>

</template>

<script>

    import dayjs from 'dayjs';
    import jsonTableData from '@mock/systemDocManagementManual.json';

    export default {
        name: "index",
        data() {
            return {
                dayjs,

                form: {
                    files: [],
                },
                btnLoadingSave: false,

                tbSelectedArr: [],
                tbFilter: {
                    name: '',
                    createTime: [],
                },
                tbData: {list: []},
                tbDataFilter: {...this.tbFilter},
                btnLoadingFilter: false,

            }
        },
        mounted() {
            this.tbFilter = this.$route.params._lpq !== undefined ? {
                createTime: (this.$route.params._lpq.startDate && this.$route.params._lpq.endDate)
                    ? [this.$route.params._lpq.startDate, this.$route.params._lpq.endDate]
                    : [],
                ...this.$route.params._lpq
            } : this.tbFilter;
            this.tbDataFilter = {...this.tbFilter};
            delete this.tbDataFilter.createTime;
            this.getTableData();
        },
        methods: {
            save: function() {

            },

            getTableData: function(page = 1, pageSize = 5) {
                let that = this;
                that.tbData.total = jsonTableData.length;
                that.tbData.list = [];

                let limit = page > 1
                    ? [(page - 1) * pageSize, page * pageSize]
                    : [0, pageSize];
                jsonTableData.map((v, k) => {
                    if(k >= limit[0] && k < limit[1]) {
                        that.tbData.list.push(v);
                    }
                });
            },
            handlePaginationChange: function(page) {
                this.getTableData(page);
            },
            filterTableData: function(isFilter = true) {
                let that = this;

                if(isFilter) {
                    that.tbDataFilter = {
                        ...that.tbFilter,
                        startDate: that.tbFilter.createTime && that.tbFilter.createTime.length > 0 ? `${that.tbFilter.createTime[0]} 00:00:00` : '',
                        endDate: that.tbFilter.createTime && that.tbFilter.createTime.length > 0 ? `${that.tbFilter.createTime[1]} 23:59:59` : '',
                    };
                    delete that.tbDataFilter.createTime;
                } else {
                    that.tbDataFilter = {};
                }

                that.getTableData(1);
            },

            chooseUploadFile: function(file, fileList, ref, refIsArray = true) {
                let that = this;
                // console.log(file.raw);

                /*let fileNameArr = file.name.split('.');
                if(fileNameArr.length < 2 || !that.man.fast.inArray(fileNameArr[fileNameArr.length - 1], ['xls', 'xlsx', 'csv', 'XLS', 'XLSX', 'CSV'])) {
                    that.$toast.fail({
                        message: '不支持的格式',
                        duration: 1888
                    });
                    return false;
                }*/

                that.$toast.loading({
                    message: '正在上传',
                    forbidClick: true,
                    loadingType: 'spinner',
                });

                api.upload(file.raw).then((res) => {
                    if(res.data.status === 200) {
                        if(refIsArray) {
                            that.form[ref].push({
                                fileCnName: file.raw.name,
                                fileEnName: file.raw.name,
                                fileUrl: res.data.data,
                            });
                        } else {
                            that.form[ref] = res.data.data;
                        }

                        that.$toast.success({
                            message: '上传完成',
                            duration: 1288
                        });
                    } else {that.$toast.clear();}
                }).catch((err) => {that.$toast.clear();});
            },
            removeUploadFile: function(ref, index) {
                let that = this;

                switch (ref) {
                    case 'files':
                        that.form[ref].splice(index, 1);
                        break;
                    default:
                        that.form[ref] = '';
                        break;
                }
                that.$forceUpdate();

                /*api.deleteUploadFile({
                    fileUrl: that.form[ref],
                }).then((res) => {
                    if(res.data.status === 200) {
                        that.form[ref] = false;
                    }
                });*/
            },


            cancel: function() {
                this.$router.push({name: 'system-doc|folder'});
            },
        }
    }

</script>

<style lang="scss" scoped>

    ._root_page {

        .block {
            .title {
                font-size: 15px;
                font-weight: 600;
                line-height: 60px;
                margin-top: -10px;

                .btn {width: max-content; height: 29px; }
            }
            .title.lh-30 {line-height: 40px; margin-top: unset;}
        }

        .hr {
            margin: 0 -20px;
            border: 1px solid $color-main-light;
        }


        ::v-deep {
            .el-table tr th {
                background: #FAFAFA;
                padding: 15px 0;
                font-size: 14px;
            }
        }
    }

</style>