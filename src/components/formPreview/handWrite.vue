<template>
    <div>
        <div class = "signBox" ref = "canvasBox">
            <canvas height = "300" v-if = "imgUrl == ''" :id = "id"/>
            <img v-else :src = "imgUrl"/>
        </div>
        <div class = "btnBox" v-show = "!disabled">
            <a v-if = "imgUrl != ''" @click = "sign">重新签名</a>
            <a v-if = "imgUrl == ''" @click = "clear">清除</a>
            <a v-if = "imgUrl == ''" @click = "submit">提交</a>
            <!-- <span>{{id}}</span> -->
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import SignaturePad from "signature_pad";
import api from "@api";

    export default {
        name: 'handSign',
        props: {
            dataUrl: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            }
            // dataColumn:{
            //     type:Array,
            //     default: function () {
            //         return [];
            //     }
            // }
        },
        components: {
        },
        data(){
            return{
                id:-1,
                imgUrl:'',
                signaturePad:null,
                config:{
                    penColor: "#000000",   //笔刷颜色
                    minWidth:3,       //最小宽度
                }
            }
        },
        created(){
            let id = 'canvas_' + parseInt(Math.random() * 1000000);
            this.id = id;
        },
        mounted() {
            let _this = this;
            if(!this.disabled){
                setTimeout(function(){
                    _this.getCanvas();

                },100);
            }
            this.imgUrl = this.dataUrl;
            
            //this.imgUrl = 'http://192.168.10.33:7000/backServer/resources/20220406172510.jpg';
        },
        watch: {
            
        },
        methods: {
            submit(){
                if(this.signaturePad.isEmpty()){
                    console.log('请输入签名');
                }
                else{
                    //this.$emit('setSign',this.signaturePad.toDataURL())
                    let imgUrl = this.signaturePad.toDataURL();
                    this.$message('上传签名中...');
                    // console.log(imgUrl);
                    api.formUploadBase64(imgUrl).then(res => {
                        //console.log(res);
                        if(res.data.status === 200){
                            this.$message.success('上传成功');
                            let fileName = res.data.data;
                            let serverImgUrl = this.man.fast.getResourcePath(fileName);
                            //console.log(serverImgUrl);
                            //this.imgUrl = serverImgUrl;
                            this.imgUrl = imgUrl;
                            this.$emit('successFn',{data:serverImgUrl})
                        }
                    });
                }
            },
            sign(){
                this.imgUrl = '';
                const _this = this;
                Vue.nextTick(function () {
                    var canvas = document.querySelector('#' + _this.id);
                    _this.signaturePad = new SignaturePad(canvas, _this.config);
                    canvas.width = _this.$refs.canvasBox.clientWidth;
                    canvas.height = 300;
                });
            },
            clear(){
                this.signaturePad.clear();
            },
            getCanvas() {
                var canvas = document.querySelector('#' + this.id);
                //console.log(canvas);
                if(canvas == null)return;
                this.signaturePad = new SignaturePad(canvas, this.config);
                canvas.height = 300;
                canvas.width = this.$refs.canvasBox.clientWidth;
                //console.log(this.$refs.canvasBox.clientWidth);
            }
        },
    }

</script>

<style lang="scss" scoped>
.signBox{
    max-width:600px;
    border:2px solid #efefef;
    canvas{
        display:block;
    }
    img{
        display:block;
        height:300px;
    }
}
.btnBox{
    padding:10px;
    text-align:left;
    a{
        display:inline-block;
        vertical-align:top;
        margin:0 10px;
        color: #fff;
        background-color: #1890ff;
        border-color: #1890ff;
        padding:7px 15px;
        font-size:12px;
        border-radius:3px;
        cursor:pointer;
    }
}
</style>