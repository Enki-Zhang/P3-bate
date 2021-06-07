<template>

    <el-row class="hello pd-tb-15 pd-lr-15">
        <el-row :gutter="8">
            <el-col :span="4">
                <el-button type="default" size="small" @click="sendAjax('get')">get</el-button>
            </el-col>
            <el-col :span="4">
                <el-button type="warning" size="small" @click="sendAjax('post')">post</el-button>
            </el-col>
            <el-col :span="4">
                <el-button type="danger" size="small" @click="ioDownload">流下载</el-button>
            </el-col>
            <el-col :span="4">
                <el-upload ref="excel" action=""
                           accept=".xls,.xlsx,.csv,.XLS,.XLSX,.CSV"
                           :auto-upload="false" :show-file-list="false"
                           :on-change="(file, fileList) => {chooseUploadFileExcel(file, fileList, 'excel')}">
                    <el-button type="success" size="small">传表格</el-button>
                    <!--<span class="img-link"><span class="el-icon-link mg-r-5"></span>上传 Logo</span>-->
                </el-upload>
            </el-col>
            <el-col :span="4">
                <el-upload ref="img" action=""
                           accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                           :auto-upload="false" :show-file-list="false"
                           :on-change="(file, fileList) => {chooseUploadFileImg(file, fileList, 'img')}">
                    <el-button type="info" size="small">传图片</el-button>
                    <!--<span class="img-link"><span class="el-icon-link mg-r-5"></span>上传 Logo</span>-->
                </el-upload>
            </el-col>
            <el-col :span="4">
                <el-button type="default" size="small" @click="showImgPreview(form.img)" :disabled="!form.img">查已传</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="8" class="mg-t-5">
            <el-col :span="12">
                <el-button type="primary" size="small" @click="testA">测试 A</el-button>
            </el-col>
            <el-col :span="12">
                <el-button type="primary" size="small" @click="testB">测试 B</el-button>
            </el-col>
        </el-row>
        <el-row class="mg-t-5">
            <!--<vue-ueditor-wrap id="ueHello"
                              v-model="form.ueHello" :config="ueCfg"
                              @ready="ueReady">
            </vue-ueditor-wrap>-->
        </el-row>

        <!-- 组件 -->
        <img-preview v-model="isShowImgPreview" :imgPath="imgPreviewPath"></img-preview>
    </el-row>

</template>

<script>

    import {mapState} from 'vuex';
    import {compressAccurately} from 'image-conversion';
    import imgPreview from '@components/imgPreview';
    import api from '@api';
    // import VueUeditorWrap from 'vue-ueditor-wrap';
    let ue;

    export default {
        name: "hello",
        components: {
            imgPreview,
            // VueUeditorWrap,
        },
        data() {
            let that = this;
            return {
                form: {
                    excel: '',
                    img: '',
                    ueHello: '<p><span style="font-size: 14px;">这是</span><strong>百度 UEditor</strong></p>',
                },

                isShowImgPreview: false,
                imgPreviewPath: '',
            }
        },
        created() {
            let that = this;


        },
        computed: {
            ...mapState(['uuid', ]),

            ueCfg: function() {
                return this.man.cfg.ueditor(process.env.VUE_APP_UEDITOR_SERVER_URL, true);
            },
        },
        methods: {
            ueReady: function(editorInstance) {
                ue = editorInstance;
                // 附带参数（键值对）
                ue.execCommand('serverparam', {});
            },
            sendAjax: function (methodType) {
                api.testAjax({methodType})
                    .then((res) => {
                        this.$notify({
                            // type: 'info',
                            title: '请求方式',
                            dangerouslyUseHTMLString: true,
                            message: res.data.requestMethod === 'GET'
                                ? '<span style="color: #f76a8c;">GET</span>'
                                : '<span style="color: #1eb2a6;">POST</span>'
                        });
                    });
            },
            ioDownload: function() {

            },
            chooseUploadFileExcel: function(file, fileList, ref) {
                let that = this;
                // console.log(file);

                let fileNameArr = file.name.split('.');
                if(fileNameArr.length < 2 || !that.man.fast.inArray(fileNameArr[fileNameArr.length - 1], ['xls', 'xlsx', 'csv', 'XLS', 'XLSX', 'CSV'])) {
                    that.$toast.fail({
                        message: '不支持的格式',
                        duration: 1888
                    });
                    return false;
                }

                that.$toast.loading({
                    message: '正在上传',
                    forbidClick: true,
                    loadingType: 'spinner',
                });

                api.upload(file.raw).then((res) => {
                    if(res.status === 200) {
                        // console.log(res);
                        that.form[ref] = res.data.path;

                        that.$toast.success({
                            message: '上传完成',
                            duration: 1288
                        });
                    }
                }).catch((err) => {that.$toast.clear();});
            },
            chooseUploadFileImg: function(file, fileList, ref, isCompress = true) {
                let that = this;
                // console.log(file);

                let fileNameArr = file.name.split('.');
                if(fileNameArr.length < 2 || !that.man.fast.inArray(fileNameArr[fileNameArr.length - 1], ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'])) {
                    that.$toast.fail({
                        message: '不支持的格式',
                        duration: 1888
                    });
                    return false;
                }

                that.$toast.loading({
                    message: '正在上传',
                    forbidClick: true,
                    loadingType: 'spinner',
                });

                const uploadCore = (data, needFormat) => {
                    api.upload(data, needFormat).then((res) => {
                        if(res.status === 200) {
                            that.form[ref] = res.data.path;

                            that.$toast.success({
                                message: '上传完成',
                                duration: 1288
                            });
                        }
                    }).catch(() => {that.$toast.clear();});
                };

                // 是否压缩
                if(isCompress) {
                    compressAccurately(file.raw, file.raw.size * 0.6 / 1024).then(res => {
                        // console.log(res);
                        // that.man.file.blobAsFile(res, 'asdf', 'png');
                        let formData = (res instanceof Blob)
                            ? new File([res], file.raw.name, {
                                type: file.raw.type,
                                lastModified: file.raw.lastModified
                            })
                            : res;
                        uploadCore(formData, true);
                    });
                } else {uploadCore(file.raw, true);}
            },
            showImgPreview: function(imageSrc) {
                this.imgPreviewPath = this.man.fast.getResourcePath(imageSrc);
                this.isShowImgPreview = true;
            },
            testA: async function () {
                let that = this;



                // console.log('执行完毕');
            },
            testB: async function () {
                let that = this;

                console.log(that.uuid);

                that.man.db.save('sys.uuid', that.uuid);

                console.log(that.man.db.load('sys.uuid'));

                // console.log('执行完毕');
            },

        }
    }

</script>

<style lang="scss" scoped>

    .hello {
        height: calc(100vh - 111px);
    }

</style>
