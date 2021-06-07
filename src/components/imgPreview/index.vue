<template>

    <transition name="fade">
        <el-row v-if="isShow" type="flex" class="mask">
            <el-row class="x txt-c">
                <span class="el-icon-close" @click="closeImgPreview"></span>
            </el-row>
            <el-row class="pop-in">
                <el-col class="img-preview">
                    <img :src="imgPath" alt="">
                    <!--<img src="/image/test1.jpg">
                    <img src="https://public.ohyesido.cn/test.jpg">-->
                </el-col>
            </el-row>
        </el-row>
    </transition>

</template>

<script>

    export default {
        name: "imgPreview",
        props: {
            imgPath: String,
            value: Boolean,
        },
        data() {
            return {
                isShow: false,
            }
        },
        mounted() {
            let that = this;

            // 添加键盘Esc事件
            that.$nextTick(() => {
                document.addEventListener('keyup', (e) => {
                    if (e.keyCode == 27) {
                        that.closeImgPreview();
                    }
                });
            });
        },
        watch: {
            value: function(val) {
                this.isShow = val;
            },
            isShow: function(val) {
                this.$emit("input", val);
            },
        },
        methods: {
            closeImgPreview: function() {
                this.isShow = false;
            },
        },
    }

</script>

<style lang="scss" scoped>

    .mask {
        z-index: 888888;
        background-color: rgba(0, 0, 0, .8);
        width: 100vw;
        height: 100vh;
        position: fixed !important;
        top: 0;
        left: 0;
        @include fx-col;
        justify-content: center;
        align-items: center;
    }

    .mask .x {
        background-color: black;
        width: 60px;
        height: 60px;
        position: absolute;
        top: 20px;
        right: 20px;
        line-height: 60px;
        border-radius: 30px;
        @include cursor-pointer;
        color: $color-gray-light;
        @include fs-35;
    }

    .mask .img-preview img {
        width: unset;
        max-width: 1280px;
        height: unset;
        max-height: 1080px;
    }

    /* gf-fade */
    .fade-enter-active {transition: opacity .3s !important;}
    .fade-leave-active {transition: opacity .3s !important;}
    .fade-enter, .fade-leave-to {opacity: 0;}

</style>