<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <!-- 筛选 -->
                <el-form ref="fmTbFilter" :model="tbDataFilter" size="small">
                    <el-row class="filters">
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

                    <el-row class="filters">
                        <el-form-item>
                            <el-row class="item">
                                <el-row class="btn">
                                    <el-button 
                                        v-show = "btnSet.add.sh"
                                        type="primary" 
                                        size="small" 
                                        icon="el-icon-plus"
                                        @click="toAdd">
                                        新增
                                    </el-button>
                                </el-row>
                            </el-row>
                        </el-form-item>
                    </el-row>
                </el-form>

                <!-- 列表 -->
                <el-row>
                    <compTable :dataList = "tbData.records" :dataColumn = "tbData.headArr"/>
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

        <compForm ref = "compForm" @success = "submitForm"/>
    </el-row>

</template>

<script>
    import api from "@api";
    import compForm from "@/components/formPreview";
    import compTable from "@/components/formPreview/table";

    export default {
        name: "index",
        components:{
            compForm,
            compTable
        },
        data() {
            return {
                tbData: {
                    headArr:[],
                    searchArr:[],
                    records:[],
                    total:0,
                    size:10,
                    current:1
                },
                tbDataFilter: {
                    datetime:null,
                    responer:'',
                    area:''
                },
                btnLoadingFilter: false,
                key:null,
                btnSet:{
                    add:{
                        formId:'35',
                        formKey:'zbdqm',
                        sh:true
                    }
                }
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
            this.getFormFieldId();
            //this.initBtn();
        },
        methods: {
            getFormFieldId(){
                let menuId = this.getMenuId();
                api.getFormHead(menuId).then((res) => {
                    if(res.data.status === 200) {
                        let list = res.data.data;
                        let searchArr = [];
                        list.forEach(e => {
                            if(e.search){
                                searchArr.push(e);
                            }
                        })
                        
                        this.tbData.headArr = list;
                        this.tbData.searchArr = searchArr;
                        if(this.tbData.headArr.length > 0)
                            this.loadData();
                    }
                });       
            },
            loadData(){
                if(this.tbData.headArr.length == 0)return;

                let menuId = this.getMenuId();
                let params = {
                    menuId:menuId,
                    pageCurrent:this.tbData.current,
                    pageSize:this.tbData.size,
                    // searchForms:[{
                    //     formFieldId:this.formFieldId,
                    //     logic:'between',
                    //     betweenValues:[start,end]
                    // }]
                };
                params = this.formSearchFn(params);
                api.getFormRecord(params).then((res) => {
                    if(res.data.status === 200) {
                        let data = res.data.data.data;
                        this.tbData.records = data.records;
                        this.tbData.total = data.total;
                    }
                });
            },
            formSearchFn(params){
                // tbDataFilter: {
                //     datetime:null,
                //     responer:'',
                //     area:''
                // },
                let searchForms = [];
                let searchArr = this.tbData.searchArr;
                if(this.tbDataFilter.area){
                    let option = searchArr.find(e => e.key == 'area').formConfigs;
                    searchForms.push({
                        formFieldId:option[0].formFieldId,
                        logic:'=',
                        searchValue:this.tbDataFilter.area
                    });
                }
                if(this.tbDataFilter.responer){
                    let option = searchArr.find(e => e.key == 'responer').formConfigs;
                    searchForms.push({
                        formFieldId:option[0].formFieldId,
                        logic:'=',
                        searchValue:this.tbDataFilter.responer
                    });
                }
                if(this.tbDataFilter.datetime){
                    let dateOption = searchArr.find(e => e.key == "startDate").formConfigs;
                    let timeOption = searchArr.find(e => e.key == "startTime").formConfigs;
                    let startArr = this.tbDataFilter.datetime[0].split(' ');
                    let endArr = this.tbDataFilter.datetime[1].split(' ');
                    searchForms.push({
                        formFieldId:dateOption[0].formFieldId,
                        logic:'between',
                        betweenValues:[startArr[0],endArr[0]]
                    });
                    searchForms.push({
                        formFieldId:timeOption[0].formFieldId,
                        logic:'between',
                        betweenValues:[startArr[1],endArr[1]]
                    });
                }
                if(searchForms.length > 0){
                    params.searchForms = searchForms;
                }
                return params;
            },
            submitForm(data){
                // console.log(data);
                // return;
                // let formInfo = JSON.stringify(data);
                api.customFormInfoSave({
                    //documentId: that.detail.id,
                    formId:this.btnSet.add.formId,
                    formInfo:data
                    // uuid: that.man.fast.getUUID(),
                }).then((res) => {
                    if(res.data.status === 200) {
                        this.$message.success('提交成功');
                        this.loadData();
                    }
                });
            },
            toAdd(){
                let formId = this.btnSet.add.formId;
                //console.log(formId);
                api.getFormInfo(formId).then((res) => {
                    if(res.data.status === 200) {
                        this.$refs.compForm.showFn(res.data.data.keyInfo);
                    }
                });
            },
            handlePaginationChange: function(page) {
                this.tbData.current = page;
                this.loadData();
            },
            filterTableData: function(isFilter = true) {
                if(!isFilter){
                    this.tbDataFilter = {
                        datetime:null,
                        responer:'',
                        area:''
                    }
                }
                this.tbData.current = 1;
                this.loadData();
            },
            initBtn: function() {
                api.getMenuBtn({name:'activity|subject'}).then((res) => {
                    if(res.data.status === 200) {
                        let list = res.data.data;
                        let btnSet = JSON.parse(JSON.stringify(this.btnSet));
                        list.forEach(e => {
                            if(e.name == 'activity|subject|add'){
                                btnSet.add.formId = e.formIds.length == 0 ? '' : e.formIds[0];
                                btnSet.add.formKey = e.formKeys.length == 0 ? '' : e.formKeys[0];
                                btnSet.add.sh = true;
                            }
                        });
                        this.btnSet = btnSet;
                    }
                });
            }
        }
    }

</script>

<style lang="less" scoped>



</style>