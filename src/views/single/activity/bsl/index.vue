<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <div class = "header">
                    <div class = "h_l">
                        <div class = "dateBox">
                            <em class = "prev"></em>
                            <span>2022</span>
                            <span class = "month">2月</span>
                            <em class = "next"></em>
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
                    <el-button style = "width:84px;" type = "primary" size = "mini">预约申请</el-button>
                </div>
            </el-row>
        </el-row>
    </el-row>

</template>

<script>

    import api from "@api";

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
                }
            }
        },
        mounted() {
            this.getTableData();
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
            getTableData: function(page = 1, pageSize = 10) {
                let params = {
                    formId:this.$route.query.id,
                    pageCurrent: page,
                    pageSize,
                };

                api.formHistoryList(params).then((res) => {
                    if(res.data.status === 200) {
                        this.tbData.content = res.data.data.records;
                        this.tbData.current = res.data.data.current;
                        this.tbData.size = res.data.data.size;
                        this.tbData.total = res.data.data.total;
                    }
                 });
            },
            handlePaginationChange: function(page) {
                this.getTableData(page);
            }
        }
    }

</script>

<style lang="scss" scoped>
.header{
    display:flex;
    align-items:center;
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


</style>