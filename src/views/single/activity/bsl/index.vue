<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <div class = "header">
                    <div class = "h_l">
                        <div class = "dateBox">
                            <em @click = "prevMonth" class = "prev"></em>
                            <span>{{year}}</span>
                            <span class = "month">{{month}}月</span>
                            <em @click = "nextMonth" class = "next"></em>
                        </div>
                    </div>
                    <div class = "h_r">
                        <span class = "tip">
                            <img :src = "require('@/assets/image/activity/icon_disinfect.png')" />
                            <span>既往消毒日期</span>
                            <img :src = "require('@/assets/image/activity/icon_disinfect_on.png')" />
                            <span>计划消毒日期</span>
                        </span>
                    </div>
                    <el-button @click = "toPre" v-show = "btnSet.pre.sh" style = "width:84px;" type = "primary" size = "mini">预约申请</el-button>
                </div>

                <compDate ref = "compDate"/>                
            </el-row>
        </el-row>

        <compForm ref = "compForm" @success = "submitForm"/>
    </el-row>

</template>

<script>

    import api from "@api";
    import compDate from './compDate';
    import compForm from "@/components/formPreview";

    export default {
        name: "index",
        data() {
            return {
               tbData: {
                    content: [],
                    total:0,
                    size:10,
                    current:1
                },
                tbDataFilter: {
                    formName:'',
                    formNumber:''
                },
                year:'',
                month:'',
                btnSet:{
                    pre:{
                        formId:'',
                        formKey:'',
                        sh:false
                    }
                }
            }
        },
        components:{
            compDate,
            compForm
        },
        mounted() {
            this.initYearMonth();
            this.initBtn();
        },
        filters:{
            dateStr(str){
                function formal(str){
                    return parseInt(str) < 10 ? '0' + str : '' + str;
                }

                if(str == null || str == '')
                    return '';
                let d = new Date(parseInt(str));
                let year = d.getFullYear();
                let month = formal(d.getMonth() + 1);
                let date = formal(d.getDate());
                let hour = formal(d.getHours());
                let minute = formal(d.getMinutes());
                let second = formal(d.getSeconds());
                return `${year}-${month}-${date} ${hour}:${minute}:${second}`;   
            }
        },
        methods: {
            initYearMonth(){
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                this.year = year;
                this.month = month;
            },
            submitForm(data){
                //console.log(data);
                // let formInfo = JSON.stringify(data);
                api.customFormInfoSave({
                    //documentId: that.detail.id,
                    formId:this.btnSet.pre.formId,
                    formInfo:data
                    // uuid: that.man.fast.getUUID(),
                }).then((res) => {
                    if(res.data.status === 200) {
                        this.$message.success('提交成功');
                        this.$refs.compDate.initTable(this.year,this.month);
                    }
                });
            },
            toPre(){
                let formId = this.btnSet.pre.formId;
                console.log(formId);
                api.getFormInfo(formId).then((res) => {
                    if(res.data.status === 200) {
                        this.$refs.compForm.showFn(res.data.data.keyInfo);
                    }
                });
            },
            prevMonth(){
                if(this.month - 1 == 0){
                    this.year --;
                    this.month = 12;
                }
                else{
                    this.month --;
                }
                this.$refs.compDate.initTable(this.year,this.month);
            },
            nextMonth(){
                if(this.month + 1 > 12){
                    this.year ++;
                    this.month = 1;
                }
                else{
                    this.month ++;
                }
                this.$refs.compDate.initTable(this.year,this.month);
            },
            initBtn: function() {
                api.getMenuBtn('activity|bsl').then((res) => {
                    if(res.data.status === 200) {
                        let list = res.data.data;
                        let btnSet = JSON.parse(JSON.stringify(this.btnSet));
                        list.forEach(e => {
                            if(e.name == 'activity|bsl|pre'){
                                btnSet.pre.formId = e.formIds.length == 0 ? '' : e.formIds[0];
                                btnSet.pre.formKey = e.formKeys.length == 0 ? '' : e.formKeys[0];
                                btnSet.pre.sh = true;
                            }
                        });
                        this.btnSet = btnSet;
                    }
                });
            }
        }
    }

</script>

<style lang="scss" scoped>
.header{
    display:flex;
    align-items:center;
    margin-bottom:20px;
    .h_l{
        flex-grow:1;
        width:0;
        .dateBox{
            em{
                position:relative;
                display:inline-block;
                vertical-align:top;
                cursor:pointer;
                width:20px;
                height:20px;
                moz-user-select: -moz-none;
                -moz-user-select: none;
                -o-user-select:none;
                -khtml-user-select:none;
                -webkit-user-select:none;
                -ms-user-select:none;
                user-select:none;
                &::after{
                    position:absolute;
                    content:'';
                    display:block;
                    transform:rotate(-45deg);
                    -webkit-transform:rotate(-45deg);
                    -moz-transform:rotate(-45deg);
                    -ms-transform:rotate(-45deg);
                    -o-transform:rotate(-45deg);
                    width:6px;
                    height:6px;
                    top:8px;
                }
                &.prev::after{
                    border-top:1px solid #000;
                    border-left:1px solid #000;
                    left:6px;
                }
                &.next::after{
                    border-bottom:1px solid #000;
                    border-right:1px solid #000;
                }
            }
            span{
                display:inline-block;
                vertical-align:top;
                font-size:18px;
                font-weight:bolder;
                color:#000;
                padding:0 8px;
                &.month{
                    
                }
            }
        }
    }
    .h_r{
        .tip{
            padding-right:10px;
            display:flex;
            align-items:center;
            img{
                width:10px;

            }
            span{
                padding-left:6px;
                padding-right:16px;
                font-size:14px;
                color:#707070;
                opacity:0.51;
            }
        }
    }
}

.dateBox{
    .d_box{
        border-top:1px solid #E2E8F4;
        border-left:1px solid #E2E8F4;
        .d_row{
            &>div{
                width:14.28%;
                display:inline-block;
                vertical-align:top;
                border-right:1px solid #E2E8F4;
                border-bottom:1px solid #E2E8F4;
            }
        }
        .d_header{
            &>div{
                height:48px;
                text-align:center;
                line-height:48px;
                font-size:14px;
                color:#707070;
                font-weight:bolder;
            }
        }
        .d_content{
            &>div{
                height:248px;
            }
        }
    }
}
</style>