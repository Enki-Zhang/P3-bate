<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <!-- 筛选 -->
                <el-form ref="fmTbFilter" :model="tbDataFilter" size="small">
                    <el-row class="filters">
                        <!-- <el-form-item prop="formNumber">
                            <el-row class="item">
                                <el-row class="lb lb-unmgl">表单编号</el-row>
                                <el-row>
                                    <el-input v-model="tbDataFilter.formNumber" placeholder="编号查询" class="inp-small"></el-input>
                                </el-row>
                            </el-row>
                        </el-form-item> -->
                        <el-form-item prop="datetime">
                            <el-row class="item">
                                <el-row class="lb">日期</el-row>
                                <el-row>
                                    <el-date-picker 
                                        v-model="tbDataFilter.datetime"
                                        type="datetimerange" 
                                        size="small"
                                        start-placeholder="开始日期" 
                                        range-separator="至" 
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd hh:mm:ss">
                                    </el-date-picker>
                                </el-row>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-row class="item mg-l-10">
                                <el-row class="btn">
                                    <el-button 
                                        type="primary" 
                                        size="small" 
                                        icon="el-icon-search"
                                        :loading="btnLoadingFilter" 
                                        @click="filterTableData(true)">
                                        查询
                                    </el-button>
                                </el-row>
                                <el-row class="btn">
                                    <el-button 
                                        type="default" 
                                        size="small" 
                                        icon="el-icon-refresh"
                                        @click="() => {
                                            $refs.fmTbFilter.resetFields(); 
                                            filterTableData(false);
                                        }">
                                        重置
                                    </el-button>
                                </el-row>
                            </el-row>
                        </el-form-item>
                    </el-row>
                </el-form>

                <!-- 列表 -->
                <el-row>
                    <el-table ref="multipleTable" :data="tbData.content" tooltip-effect="dark"
                              :min-height="460" size="small"
                              highlight-current-row border>
                        <el-table-column label="编号" fixed="left" show-overflow-tooltip width="40">
                            <template slot-scope="scope">{{ scope.row.formId }}</template>
                        </el-table-column>
                        <el-table-column v-for = "v,index in tbColumn" :key = "index" :label="v.name" show-overflow-tooltip >
                            <template slot-scope="scope">
                                <div v-if = "JSON.parse(scope.row.formInfo)[v.index].type == 'linkSelect'">
                                    {{JSON.parse(scope.row.formInfo)[v.index][v.valueName].join('/')}}
                                </div>
                                <div v-else-if = "JSON.parse(scope.row.formInfo)[v.index].type == 'check'">
                                    {{JSON.parse(scope.row.formInfo)[v.index][v.valueName].join(',')}}
                                </div>
                                <div v-else-if = "JSON.parse(scope.row.formInfo)[v.index].type == 'switch'">
                                    {{JSON.parse(scope.row.formInfo)[v.index][v.valueName] ? '是' : '否'}}
                                </div>
                                <div v-else-if = "JSON.parse(scope.row.formInfo)[v.index].type == 'timeRange' || JSON.parse(scope.row.formInfo)[v.index].type == 'dateRange'">
                                    {{JSON.parse(scope.row.formInfo)[v.index][v.valueName].join('至')}}
                                </div>
                                <div v-else-if = "JSON.parse(scope.row.formInfo)[v.index].type == 'upload'">
                                    <img
                                        v-if = "JSON.parse(scope.row.formInfo)[v.index][v.valueName] != ''" 
                                        :src = "JSON.parse(scope.row.formInfo)[v.index][v.valueName]"/>
                                </div>
                                <div v-else>
                                    {{ JSON.parse(scope.row.formInfo)[v.index][v.valueName] }}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>

                <!-- 分页 -->
                <el-row v-if="tbData.total > 0" class="mg-t-20 mg-b-10 txt-c">
                    <el-pagination 
                        :total="tbData.total" 
                        :current-page="tbData.current" 
                        :page-size="tbData.size"
                        layout="total, prev, pager, next, jumper"
                        @current-change="handlePaginationChange"
                        background>
                    </el-pagination>
                </el-row>
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
                    datetime:null
                },
                tbColumn:[],
                btnLoadingFilter: false
            }
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
        mounted() {
            //this.getTableData();
            console.log(this.$route);
            this.getColumn();
        },
        methods: {
            getColumn:function(){

                function getValueName(type){
                    let obj ={
                        'input':'attr_value',
                        'textarea':'attr_value',
                        'inputNumber':'attr_value',
                        'select':'data_value',
                        'radio':'data_value',
                        'check':'data_value',
                        'linkSelect':'attr_data_link_value',
                        'switch':'attr_boolean_value',
                        'time':'attr_time_value',
                        'timeRange':'attr_time_range_value',
                        'date':'attr_date_value',
                        'dateRange':'attr_date_range_value',
                        'upload':'data_url'
                    }
                    return obj[type];
                }

                let formKey = this.$route.meta.formKey;
                api.formStructInfo(formKey).then((res) => {
                    this.btnLoadingFilter = false;
                    if(res.data.status === 200) {
                        let arr = JSON.parse(res.data.data.keyInfo);
                        let columnArr = [];
                        for(var i = 0;i < arr.length;i++){
                            if(arr[i].type != 'childForm'){
                                columnArr.push({
                                    name:arr[i].attr_name,
                                    index:i,
                                    type:arr[i].type,
                                    valueName:getValueName(arr[i].type)
                                }); 
                            }  
                        }
                        this.tbColumn = columnArr;
                        this.getTableData();
                    }
                });
            },
            getTableData: function(page = 1, pageSize = 10) {
                this.btnLoadingFilter = true;

                let params = {
                    ...this.tbDataFilter,
                    pageCurrent: page,
                    pageSize,
                };
                console.log(this.$route.name);
                let formKey = this.$route.meta.formKey;
                params.formKey = formKey;

                if(params.datetime != null){
                    params.startTime = params.datetime[0];
                    params.endTime = params.datetime[1];
                }
                delete params.datetime;

                api.formInfoList(params).then((res) => {
                    this.btnLoadingFilter = false;
                    if(res.data.status === 200) {
                        this.tbData.content = res.data.data.records;
                        this.tbData.current = res.data.data.current;
                        this.tbData.size = res.data.data.size;
                        this.tbData.total = res.data.data.total;

                        // this.tbData.content =
                        // [
                        //     {
                        //         "caseId": "",
                        //         "createTime": "",
                        //         "formId": 0,
                        //         "formInfo": "[{\"attr_name\":\"单行输入框\",\"attr_value\":\"aaa\",\"attr_placeholder\":\"请输入\",\"type\":\"input\",\"id\":\"module_1628058653788\",\"label_width\":100,\"belongTo\":\"formBox\"},{\"attr_name\":\"多行输入框\",\"attr_value\":\"vvvv\",\"attr_placeholder\":\"请输入\",\"type\":\"textarea\",\"id\":\"module_1628058654786\",\"label_width\":100,\"belongTo\":\"formBox\"},{\"attr_name\":\"计数器\",\"attr_value\":1,\"attr_min\":0,\"attr_max\":100,\"attr_input_width\":150,\"attr_placeholder\":\"请输入\",\"type\":\"inputNumber\",\"id\":\"module_1628058656088\",\"label_width\":100,\"belongTo\":\"formBox\"},{\"attr_name\":\"下拉选择\",\"attr_input_width\":150,\"attr_data_list\":[{\"id\":1,\"name\":\"选项1\"},{\"id\":2,\"name\":\"选项2\"}],\"attr_placeholder\":\"请选择\",\"data_index\":1,\"data_value\":\"选项2\",\"type\":\"select\",\"id\":\"module_1628058657634\",\"label_width\":100,\"belongTo\":\"formBox\"},{\"attr_name\":\"子表单\",\"type\":\"childForm\",\"id\":\"module_1628058684434\",\"label_width\":100,\"belongTo\":\"formBox\",\"arr\":[{\"attr_name\":\"单行输入框\",\"attr_value\":\"\",\"attr_placeholder\":\"请输入\",\"type\":\"input\",\"id\":\"module_1628058703580\",\"label_width\":100,\"belongTo\":\"formItem\"},{\"attr_name\":\"单行输入框\",\"attr_value\":\"\",\"attr_placeholder\":\"请输入\",\"type\":\"input\",\"id\":\"module_1628058706006\",\"label_width\":100,\"belongTo\":\"formItem\"},{\"attr_name\":\"单行输入框\",\"attr_value\":\"\",\"attr_placeholder\":\"请输入\",\"type\":\"input\",\"id\":\"module_1628058707753\",\"label_width\":100,\"belongTo\":\"formItem\"}],\"dataList\":[]},{\"attr_name\":\"级联选择\",\"attr_input_width\":250,\"attr_data_link_list\":[{\"value\":\"选项1\",\"label\":\"选项1\",\"children\":[{\"value\":\"选项11\",\"label\":\"选项11\",\"children\":[{\"value\":\"选项111\",\"label\":\"选项111\"},{\"value\":\"选项112\",\"label\":\"选项112\"}]},{\"value\":\"选项12\",\"label\":\"选项12\",\"children\":[{\"value\":\"选项121\",\"label\":\"选项121\"},{\"value\":\"选项122\",\"label\":\"选项122\"}]}]}],\"attr_data_link_value\":[\"选项1\",\"选项11\",\"选项112\"],\"attr_placeholder\":\"请选择\",\"type\":\"linkSelect\",\"id\":\"module_1628058658963\",\"label_width\":100,\"belongTo\":\"formBox\"},{\"attr_name\":\"单选框组\",\"attr_data_list\":[{\"id\":1,\"name\":\"选项1\"},{\"id\":2,\"name\":\"选项2\"}],\"data_index\":1,\"data_value\":\"选项2\",\"type\":\"radio\",\"attr_layer\":\"inline-block\",\"id\":\"module_1628058660643\",\"label_width\":100,\"belongTo\":\"formBox\"},{\"attr_name\":\"多选框组\",\"attr_data_check_list\":[{\"id\":1,\"name\":\"选项1\",\"check\":true},{\"id\":2,\"name\":\"选项2\",\"check\":true}],\"data_value\":[\"选项1\",\"选项2\"],\"type\":\"check\",\"attr_layer\":\"inline-block\",\"id\":\"module_1628058663418\",\"label_width\":100,\"belongTo\":\"formBox\"},{\"attr_name\":\"开关\",\"attr_boolean_value\":true,\"type\":\"switch\",\"id\":\"module_1628058668719\",\"label_width\":100,\"belongTo\":\"formBox\"},{\"attr_name\":\"时间选择\",\"attr_time_value\":\"14:37:52\",\"attr_input_width\":150,\"type\":\"time\",\"id\":\"module_1628058671130\",\"label_width\":100,\"belongTo\":\"formBox\"},{\"attr_name\":\"时间范围\",\"attr_time_range_value\":[\"08:00:00\",\"08:00:00\"],\"attr_input_width\":360,\"type\":\"timeRange\",\"id\":\"module_1628058673617\",\"label_width\":100,\"belongTo\":\"formBox\"},{\"attr_name\":\"日期选择\",\"attr_date_value\":\"2021-08-03\",\"attr_input_width\":150,\"type\":\"date\",\"id\":\"module_1628058675607\",\"label_width\":100,\"belongTo\":\"formBox\"},{\"attr_name\":\"日期范围\",\"attr_date_range_value\":[\"2021-09-14\",\"2021-09-15\"],\"attr_input_width\":360,\"type\":\"dateRange\",\"id\":\"module_1628058677544\",\"label_width\":100,\"belongTo\":\"formBox\"},{\"attr_name\":\"上传\",\"type\":\"upload\",\"attr_url\":\"\",\"data_url\":\"\",\"id\":\"module_1628058680040\",\"label_width\":100,\"belongTo\":\"formBox\"}]",
                        //         "id": 0,
                        //         "updateTime": "",
                        //         "userId": ""
                        //     }
                        // ]
                    }
                });
            },
            handlePaginationChange: function(page) {
                this.getTableData(page);
            },
            filterTableData: function(isFilter = true) {
                let that = this;
                that.getTableData(1);
            }
        }
    }

</script>

<style lang="less" scoped>



</style>