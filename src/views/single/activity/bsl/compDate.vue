<template>
    <div class = "dateBox">
        <div class = "d_box">
            <div class = "d_row d_header">
                <div>周日</div>
                <div>周一</div>
                <div>周二</div>
                <div>周三</div>
                <div>周四</div>
                <div>周五</div>
                <div>周六</div>
            </div>
            <div class = "d_row d_content">
                <div v-for = "v,index in prevMonthList" :key = "'prevMonthList_' + index">
                    <div class = "dc_box dc_out">{{v}}</div>
                </div>
                <div :class = "{todayOn:v == today}" v-for = "v,index in curMonthList" :key = "'day_' + index">
                    <div class = "dc_box">
                        <div class = "dc_info">
                            <span class = "index">{{v.date}}</span>
                            <span class = "blank"></span>
                            <template 
                                v-for = "v2,index2 in v.sub" 
                                >
                                <img 
                                    v-if = "v2.name == 'disinfect'" 
                                    class = "sign" 
                                    :key = "'user_' + index + '_' + index2"
                                    :src = "require('@/assets/image/activity/icon_disinfect.png')" />
                                <img 
                                    v-else-if = "v2.name == 'done'"
                                    class = "sign" 
                                    :key = "'user_' + index + '_' + index2"
                                    :src = "require('@/assets/image/activity/icon_disinfect_on.png')" />
                                <img 
                                    v-else-if = "v2.name == 'fix'" 
                                    class = "sign2" 
                                    :key = "'user_' + index + '_' + index2"
                                    :src = "require('@/assets/image/activity/icon_fix.png')" />
                                <span 
                                    :key = "'user_' + index + '_' + index2"
                                    v-else
                                    :class = "{name2:index2 == 1}"
                                    class = "name">{{v2.name | nameStr}}</span>
                            </template>
                        </div>
                    </div>
                    <ul class = "dc_list">
                        <li :class = "{dc_color2:index2 == 1,dc_color3:v2.name == 'fix'}" v-for = "v2,index2 in v.event" :key = "'event_' + index + '_' + index2">
                            <div class = "name" v-if = "v2.name != 'fix'">{{v2.name}}</div>
                            <div class = "info">
                                <div class = "title">
                                    <img v-if = "v2.name == 'fix'" :src = "require('@/assets/image/activity/icon_fix.png')" />
                                    <span :title = "v2.title">{{v2.title}}</span>
                                </div>
                                <div class = "dateRange">{{v2.startDate | dateStr}}-{{v2.endDate | dateStr}}</div>
                            </div>
                        </li>
                    </ul>
                    <div class = 'dc_tip'>
                        <p v-show = "v.sub.length > 0">共{{v.sub.length}}个预约</p>
                    </div>
                </div>
                <div v-for = "v,index in nextMonthList" :key = "'nextMonthList_' + index">
                    <div class = "dc_box  dc_out">{{v}}</div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>

    import api from "@api";
    

    export default {
        name: "compDate",
        data() {
            return {
                prevMonthList:[],
                curMonthList:[],
                nextMonthList:[],
                today:0
            }
        },
        mounted() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;

            this.initTable(year,month);
        },
        filters:{
            dateStr(str){
                function formal(str){
                    return parseInt(str) < 10 ? '0' + str : '' + str;
                }

                if(str == null || str == '')
                    return '';
                let d = new Date(str);
                let year = d.getFullYear();
                let month = formal(d.getMonth() + 1);
                let date = d.getDate();
                let hour = formal(d.getHours());
                let minute = formal(d.getMinutes());
                let second = formal(d.getSeconds());
                //return `${year}-${month}-${date} ${hour}:${minute}:${second}`;   
                return `${date}日${hour}:${minute}`;   
                //1日8:00
            },
            nameStr(str){
                return str[0];
            }
        },
        methods: {
            loadData(year,month){
                function getDay(str){
                    //console.log(new Date(str * 1000));
                    let d = new Date(str);
                    let day = d.getDate();
                    return day;
                }

                api.getFormRecord({
                    //documentId: that.detail.id,
                    menuId:"411",
                    pageCurrent:1,
                    pageSize:50,
                    year,
                    month
                    // uuid: that.man.fast.getUUID(),
                }).then((res) => {
                    if(res.data.status === 200) {
                        let eventList = res.data.data.data.records;
                        let curMonthList = JSON.parse(JSON.stringify(this.curMonthList));

                        eventList.forEach(e => {
                            let start = getDay(e.startDate);
                            let end = getDay(e.endDate);
                            for(let i = start;i <= end;i++){
                                curMonthList[i].sub.push(e);
                                if(e.name != 'disinfect' && e.name != 'done' && i == start){
                                    curMonthList[i].event.push(e);
                                }
                            }
                        });
                        this.curMonthList = curMonthList;
                    }
                });

                // let eventList = [
                //     {
                //         name:'张三',
                //         title:'申请生物实验',
                //         startDate:1646186065,
                //         endDate:1646376865
                //     },
                //     {
                //         name:'李四',
                //         title:'申请生物实验222',
                //         startDate:1646186065,
                //         endDate:1646376865
                //     },
                //     {
                //         name:'fix',
                //         title:'计划停用检修',
                //         startDate:1646726827,
                //         endDate:1647245227
                //     },
                //     {
                //         name:'disinfect',
                //         title:'',
                //         startDate:1647331627,
                //         endDate:1647331627
                //     },
                //     {
                //         name:'done',
                //         title:'',
                //         startDate:1646122027,
                //         endDate:1646122027
                //     }
                // ];  
            },
            initTable(year,month){
                let prevMonthList = [];
                let curStartDate = year + '-' + month + '-1';
                let prevYearMonthObj = this.getPrevYearMonth(year,month);
                let prevLastDate = this.getLastDay(prevYearMonthObj.year,prevYearMonthObj.month);
                let curStartIndex = this.getWeek(curStartDate);
                for(let i = curStartIndex;i > 0;i--){
                    prevMonthList.push(prevLastDate - i + 1);
                }

                let curLastDate = this.getLastDay(year,month);
                let curMonthList = [];
                for(let i = 1;i <= curLastDate;i++){
                    curMonthList.push({date:i,event:[],sub:[]});
                }

                let nextMonthList = [];
                let total = prevMonthList.length + curMonthList.length > 35 ? 42 : 35;
                let surplus = total - prevMonthList.length - curMonthList.length;

                let now = new Date();
                let nYear = now.getFullYear();
                let nMonth = now.getMonth() + 1;
                let nDate = now.getDate();
                this.today = year == nYear && month == nMonth ? nDate : 0;

                for(let i = 0; i < surplus;i++){
                    nextMonthList.push(i + 1);
                }

                this.prevMonthList = prevMonthList;
                this.curMonthList = curMonthList;
                this.nextMonthList = nextMonthList;

                this.loadData(year,month);
            },
            getPrevYearMonth(year,month){
                if(month - 1 == 0){
                    return {
                        year:year - 1,
                        month:12
                    }
                }
                else{
                    return{
                        year:year,
                        month:month - 1
                    }
                }
            },
            getNextYearMonth(year,month){
                if(month + 1 == 13){
                    return {
                        year:year + 1,
                        month:1
                    }
                }
                else{
                    return{
                        year:year,
                        month:month + 1
                    }
                }
            },
            getWeek(day){
                let dateArr = day.split('-');
                let myDate = new Date();
                myDate.setFullYear(dateArr[0],parseInt(dateArr[1]) - 1,dateArr[2]);
                let week = myDate.getDay();

                return week;
            },
            getLastDay(year,month) {        
                var new_year = year;    //取当前的年份         
                var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）         
                if(month>12) {        
                    new_month -=12;        //月份减         
                    new_year++;            //年份增         
                }        
                var new_date = new Date(new_year,new_month,1);                //取当年当月中的第一天         
                return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期         
            },

            // getTableData: function(page = 1, pageSize = 10) {
            //     let params = {
            //         formId:this.$route.query.id,
            //         pageCurrent: page,
            //         pageSize,
            //     };

            //     api.formHistoryList(params).then((res) => {
            //         if(res.data.status === 200) {
            //             this.tbData.content = res.data.data.records;
            //             this.tbData.current = res.data.data.current;
            //             this.tbData.size = res.data.data.size;
            //             this.tbData.total = res.data.data.total;
            //         }
            //      });
            // }
        }
    }

</script>

<style lang="scss" scoped>
$colorDeep1: #1890FF;
$colorLight1: rgba(224, 240, 255, 0.39);

$colorDeep2: #5C70D3;
$colorLight2: rgba(235, 239, 255, 0.39);

$colorDeep3: #FF3C3C;
$colorLight3: rgba(255, 229, 229, 0.39);

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
                position:relative;
                height:248px;
                .dc_box{
                    padding:10px 8px;
                    .dc_info{
                        color:#707070;
                        font-size:16px;
                        display:flex;
                        align-items:center;
                        .blank{
                            flex-grow:1;
                            width:0;
                        }
                        .index{

                        }
                        .name{
                            margin-left:6px;
                            color:#fff;
                            font-size:12px;
                            background:#1890FF;
                            width:20px;
                            height:20px;
                            line-height:20px;
                            text-align:center;
                            border-radius:20px;
                            &.name2{
                                background:#5C70D3;
                            }
                        }
                        .sign{
                            margin-left:6px;
                            width:10px;
                        }
                        .sign2{
                            margin-left:6px;
                            width:13px;
                        }
                    }
                }
                .dc_list{
                    padding:0 8px;
                    li{
                        font-size:12px;
                        color:$colorDeep1;
                        margin-bottom:8px;
                        .name{
                            padding-bottom:4px;
                        }
                        .info{
                            border-left:2px solid $colorDeep1;
                            background:$colorLight1;
                            padding:6px 6px;
                            .title{
                                display:flex;
                                align-items:center;
                                margin-bottom:2px;
                                img{
                                    width:13px;
                                    height:13px;
                                    margin-right:6px;
                                }
                                span{
                                    font-size:14px;
                                    flex-grow:1;
                                    width:0;
                                    overflow:hidden;
                                    text-overflow:ellipsis;
                                    white-space:nowrap;
                                }
                            }  
                            .dateRange{
                                overflow:hidden;
                                text-overflow:ellipsis;
                                white-space:nowrap;
                            }
                        }

                        &.dc_color2{
                            color:$colorDeep2;
                            .info{
                                border-left:2px solid $colorDeep2;
                                background:$colorLight2;
                            }
                        }
                        &.dc_color3{
                            color:$colorDeep3;
                            .info{
                                border-left:2px solid $colorDeep3;
                                background:$colorLight3;
                            }
                        }
                    }
                }
                .dc_tip{
                    position:absolute;
                    bottom:0;
                    left:0;
                    width:100%;
                    p{
                        text-align:right;
                        color:#C7C7C7;
                        font-size:12px;
                        margin:8px 10px;
                    }
                }
                .dc_out{
                    color:#C7C7C7;
                    font-size:16px;
                }
                &.todayOn{
                    background:#FFF4F4;
                    .dc_box{
                        .dc_info{
                            .index{
                                width:25px;
                                height:25px;
                                background:#1890FF;
                                text-align:center;
                                line-height:25px;
                                border-radius:25px;
                                color:#fff;
                            }
                        }
                    }
                }

            }
        }
    }
}
</style>