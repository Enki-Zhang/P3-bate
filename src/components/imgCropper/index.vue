<template>

    <el-dialog :top="top" :width="width" :title="`图像裁剪`" :visible.sync="dialogVisible"
               @opened="opened" @closed="closed" :before-close="beforeClose"
               :close-on-click-modal="false" append-to-body>
        <el-row>
            <vueCropper
                    ref="_vueCropper"
                    :img="cfg.img"
                    :outputSize="cfg.outputSize"
                    :outputType="cfg.outputType"
                    :info="true"
                    :full="cfg.full"
                    :canMove="cfg.canMove"
                    :canMoveBox="cfg.canMoveBox"
                    :fixedBox="cfg.fixedBox"
                    :original="cfg.original"
                    :autoCrop="cfg.autoCrop"
                    :autoCropWidth="cfg.autoCropWidth"
                    :autoCropHeight="cfg.autoCropHeight"
                    :centerBox="cfg.centerBox"
                    :high="cfg.high"
                    :infoTrue="cfg.infoTrue"
                    :enlarge="cfg.enlarge"
                    :style="`width: ${cropWidth}; height: ${cropHeight};`">
            </vueCropper>
        </el-row>
        <el-row slot="footer" class="dialog-footer">
            <el-row type="flex" justify="center" align="middle">
                <el-upload v-if="cfg.openLocal"
                           ref="cnLogo" action=""
                           accept=".jpg,.JPG,.png,.PNG,.jpeg,.JPEG"
                           :auto-upload="false" :show-file-list="false"
                           :on-change="chooseCoverImage">
                    <el-button type="warning" size="small" icon="el-icon-folder-opened" class="btn mg-r-10">选择图片</el-button>
                </el-upload>
                <el-button v-else type="default" size="small" icon="el-icon-circle-close" @click="closed" class="btn mg-r-10">取消裁剪</el-button>
                <el-button type="primary" size="small" icon="el-icon-finished" @click="save" class="btn mg-l-10">完成裁剪</el-button>
            </el-row>
        </el-row>
    </el-dialog>

</template>

<script>

    import {VueCropper} from 'vue-cropper';

    export default {
        name: "imgCropper",
        props: {
            value: Boolean,
            operationType: String,
            top: String,
            width: String,
            height: String,
            cropWidth: String,
            cropHeight: String,
            cfg: Object,
        },
        components: {VueCropper,},
        data() {
            return {
                dialogVisible: false,
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
                // console.log('img-cropper is running');
            },
            save: async function() {
                let that = this;

                let blob = await that.cropperAndReturnBlob(),
                    base64 = await that.cropperAndReturnBase64();
                let arr = base64.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    file = new window.File([blob], that.cfg.originFileName, {type: mime});

                that.$emit('cropped', {file, blob, base64});
                that.closed();
            },
            beforeClose: function(done) {done();},
            closed: function() {
                this.dialogVisible = false;
            },



            chooseCoverImage: function(file) {
                let that = this;

                let fileNameArr = file.name.split('.');
                if(fileNameArr.length < 2 || !that.man.fast.inArray(fileNameArr[fileNameArr.length - 1].toLowerCase(), ['jpg', 'jpeg', 'png',])) {
                    that.$message.error('请选择 jpg、jpeg、png 格式图片')
                    return false;
                }

                let reader = new FileReader();
                reader.readAsDataURL(file.raw);
                reader.onload = function() {
                    that.cfg.img = reader.result;
                };
            },
            cropperAndReturnBase64: function() {
                return new Promise((resolve, reject) => {
                    let that = this;
                    that.$refs['_vueCropper'].getCropData((data) => {
                        resolve(data);
                    });
                });
            },
            cropperAndReturnBlob: function() {
                return new Promise((resolve, reject) => {
                    let that = this;
                    that.$refs['_vueCropper'].getCropBlob((data) => {
                        resolve(data);
                    });
                });
            },
        }
    }

</script>

<style lang="scss" scoped>

    .btn {width: 140px;}
    .mg-r-10 {margin-right: 10px;}
    .mg-l-10 {margin-left: 10px;}

</style>