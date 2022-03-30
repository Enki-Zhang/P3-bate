<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white">
                <!-- 筛选 -->
                <el-form ref="fmTbFilter" :model="tbDataFilter" size="small">
                    <el-row class="filters">
                        <el-form-item prop="datetime">
                            <el-row class="item">
                                <el-row class="lb">实验时段</el-row>
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
                        <el-form-item prop="responer">
                            <el-row class="item mg-l-10">
                                <el-row class="lb lb-unmgl">课题负责人</el-row>
                                <el-row>
                                    <el-input v-model="tbDataFilter.responer" placeholder="课题负责人" class="inp-small"></el-input>
                                </el-row>
                            </el-row>
                        </el-form-item>
                        <el-form-item prop="area">
                            <el-row class="item mg-l-10">
                                <el-row class="lb lb-unmgl">实验室区域</el-row>
                                <el-row>
                                    <el-input v-model="tbDataFilter.area" placeholder="实验室区域" class="inp-small"></el-input>
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
                        <el-form-item style = "width:0;flex-grow:1;">
                            <el-row class="item mg-l-10" style = "justify-content: flex-end;">
                                <el-row class="btn">
                                    <el-button 
                                        @click="groupObj.listSh = true;"
                                        type="primary" 
                                        size="small" 
                                        icon="el-icon-receiving">
                                        课题组管理
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
                    <el-table 
                        ref="multipleTable" 
                        :data="tbData.records" 
                        tooltip-effect="dark"
                        :min-height="460" 
                        size="small"
                        highlight-current-row 
                        border>
                        <!-- <el-table-column v-if = "tbData.headArr.length > 0" label="表单序号" fixed="left" show-overflow-tooltip width="80">
                            <template slot-scope="scope">{{ scope.row.formId }}</template>
                        </el-table-column> -->
                        <el-table-column v-if = "tbData.headArr.length == 0" label="未绑定表单" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column v-for = "v,index in tbData.headArr" :key = "index" :label="v.showName" show-overflow-tooltip >
                            <template slot-scope="scope">
                                <div v-if = "v.type == 'DATE_RANGE' || v.type == 'TIME_RANGE'">
                                    {{scope.row[v.key][0]}}至{{scope.row[v.key][1]}}
                                </div>
                                <div v-else-if = "v.type == 'UPLOAD'">
                                    <el-link @click = "downloadFn(scope.row[v.key])" style = "font-size:12px;" type="primary">{{scope.row[v.key]}}</el-link>
                                </div>
                                <div v-else>
                                    {{scope.row[v.key]}}
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

        <el-dialog
          title="课题组管理"
          :visible.sync="groupObj.listSh"
          width="50%">
          <div style = "padding-bottom:10px;">
              <el-button @click = "dealGroup()" size = "mini" type="primary" icon="el-icon-plus" style = "width:100px;">添加分组</el-button>
          </div>
          <div>
              <el-table
                size="mini"
                :data="groupObj.list"
                border
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="组名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="类型"
                  width="180">
                    <template slot-scope="scope">
                        <span>{{groupTypeArr[scope.row.type]}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                  prop="userNames"
                  label="成员">
                    <template slot-scope="scope">
                        <span>{{scope.row.userNames.join('、')}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                  width="200"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button @click = "dealGroup(scope.row)" style = "width:40px;" type="text" size="mini">编辑</el-button>
                    <el-popconfirm
                      title="确定删除该分组吗？"
                      @confirm="doDelGroup(scope.row.id)"
                      @onConfirm="doDelGroup(scope.row.id)"
                    >
                        <el-button style = "width:40px;color:#F56C6C;" type="text" size="mini" slot="reference">删除</el-button>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
          </div>
          <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
          </span>
        </el-dialog>

        <el-dialog
          :title="groupObj.curId == -1 ? '添加分组' : '编辑分组'"
          :visible.sync="groupObj.dealSh"
          width="30%">
          <div>
              <el-form :model="groupForm" ref="groupForm" label-width="100px" class="demo-groupForm">
                  <el-form-item label="组名:">
                    <el-input v-model="groupForm.name" placeholder="请输入组名"></el-input>
                  </el-form-item>
                  <el-form-item label="类型:">
                    <el-select v-model="groupForm.type" placeholder="请选择类型">
                      <el-option label="常规实验组" :value="0"></el-option>
                      <el-option label="课题组" :value="1"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="成员:">
                    <span>{{groupForm.userNames.join('、')}}</span>
                    <el-button @click = "showMemberList" style = "width:50px;" type="text">选择</el-button>
                  </el-form-item>
              </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size = "mini" @click="groupObj.dealSh = false;">取 消</el-button>
            <el-button size = "mini" @click="doDealGroup" type="primary">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="选择成员"
          :visible.sync="groupObj.memberSh"
          width="50%">
          <div>
              <el-table
                size="mini"
                :data="groupObj.memberList"
                border
                style="width: 100%">
                <el-table-column
                  prop="id"
                  width="300"
                  label="id">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="用户名">
                </el-table-column>
                <el-table-column
                  prop="sex"
                  width="180"
                  label="性别">
                    <template slot-scope="scope">
                        <span>{{scope.row.sex == 0 ? '女' : '男'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                  label="是否选择"
                  width="180">
                    <template slot-scope="scope">
                        <span>
                            <el-checkbox @change = "chooseMember(scope.row.id,scope.row.username)" v-model="scope.row.checked"></el-checkbox>
                        </span>
                    </template>
                </el-table-column>
              </el-table>
          </div>
          <div style = "padding-top:10px;text-align:right;">
              <el-pagination
                  background
                  @current-change="handleMemberChange"
                  layout="prev, pager, next"
                  :total="groupObj.memberTotal">
              </el-pagination>
          </div>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button size = "mini" @click="groupObj.memberSh = false;">取 消</el-button>
            <el-button size = "mini" @click = "doSelectMember" type="primary">确 定</el-button>
          </span> -->
        </el-dialog>

        <compForm ref = "compForm" @success = "submitForm"/>
    </el-row>

</template>

<script>
    import api from "@api";
    import compForm from "@/components/formPreview";

    export default {
        name: "index",
        components:{
            compForm
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
                        formId:'',
                        formKey:'',
                        sh:false
                    }
                },
                groupObj:{
                    listSh:false,
                    dealSh:false,
                    memberSh:false,
                    list:[],
                    memberList:[],
                    memberPageCurrent:1,
                    memberPageSize:10,
                    memberTotal:0,
                    curId:-1
                },
                groupForm:{
                    name: '',
                    type: '',
                    userIds:[],
                    userNames:[]
                },
                groupTypeArr:['常规实验组','课题组'],
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
            this.getGroupList();
            this.initBtn();
        },
        methods: {
            downloadFn(fileName){
                const self = this;
                let fileUrl = self.man.fast.getResourcePath(fileName);
                let msg = self.$message.warning({
                    showClose: true,
                    duration: 0,
                    message: '正在下载...'
                });
                //const file = obj;
                function judgePort(url,name){
                    var u = navigator.userAgent;
                    if((u.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                        // if(isAndroid)
                        //     alert('android');
                        // if(isiOS)
                        //     alert('ios');
                        let a = document.createElement('a');
                        a.download = name;
                        a.href = url;
                        a.target = '_blank';
                        a.click();
                        return;
                    }
                }
                judgePort(fileUrl,fileName);
                //console.log(self.staticPath)
                var xhr = new XMLHttpRequest();
                xhr.open("GET", fileUrl, true);
                xhr.responseType = 'blob';
                xhr.onload = function(e) {
                    var url = window.URL.createObjectURL(xhr.response)
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    a.click()
                    if (xhr.status !== 200 && xhr.readyState === 4) {
                        self.$message.error({
                            duration: 3000,
                            message: '下载失败！'
                        })
                    }
                    msg.close();
                }
                xhr.send();
            },
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
                    console.log(this.tbDataFilter.datetime);
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
            doDelGroup(id){
                //console.log(id);
                api.lessionGroupDel(id).then((res) => {
                    // console.log(res.data.data);
                    if(res.data.status === 200) {
                        this.$message.success('删除成功');
                        this.getGroupList();
                    }
                });
            },
            doDealGroup(){
                //console.log(this.groupForm);
                if(this.groupForm.name == ''){
                    this.$message.error('请输入组名');
                    return;
                }
                if(this.groupForm.userIds.length == 0){
                    this.$message.error('请选择成员');
                    return;
                }
                let params = {
                    id:this.groupObj.curId == -1 ? 0 : this.groupObj.curId,
                    name:this.groupForm.name,
                    type:this.groupForm.type,
                    userIds:this.groupForm.userIds
                };
                //console.log(params);
                let apiFn = this.groupObj.curId == -1 ? 'lessionGroupAdd' : 'lessionGroupEdit';
                let successText = this.groupObj.curId == -1 ? '添加成功' : '编辑成功';
                api[apiFn](params).then((res) => {
                    // console.log(res.data.data);
                    if(res.data.status === 200) {
                        this.$message.success(successText);
                        this.groupObj.dealSh = false;
                        this.getGroupList();
                    }
                });
            },
            chooseMember(id,username){
                let tempIndex = this.groupForm.userIds.indexOf(id);
                if(tempIndex > -1){
                    this.groupForm.userIds.splice(tempIndex,1);
                    this.groupForm.userNames.splice(tempIndex,1);
                }   
                else{
                    this.groupForm.userIds.push(id);
                    this.groupForm.userNames.push(username);
                }
                // console.log(this.groupForm.userIds);
                // console.log(this.groupForm.userNames);
            },
            handleMemberChange(page){
                this.groupObj.memberPageCurrent = page;
                this.showMemberList();
            },
            showMemberList(){
                let params = {
                    //...that.tbDataFilter,
                    pageCurrent: this.groupObj.memberPageCurrent,
                    pageSize:this.groupObj.memberPageSize,
                };

                api.sysUserInfoList(params).then((res) => {
                    // console.log(res.data.data);
                    if(res.data.status === 200) {
                        let list = res.data.data.records;
                        list.forEach(e => {
                            e.checked = false;
                            if(this.groupForm.userIds.indexOf(e.id + '') > -1){
                                e.checked = true;
                            }
                        });
                        this.groupObj.memberList = list;
                        this.groupObj.memberTotal = res.data.data.total;
                        this.groupObj.memberSh = true;


                    }
                });
            },
            dealGroup(obj){
                if(obj != null){
                    this.groupObj.curId = obj.id;
                    this.groupForm = {
                        name: obj.name,
                        type: obj.type,
                        userIds: obj.userIds,
                        userNames: obj.userNames
                    }
                }
                else{
                    this.groupObj.curId = -1;
                    this.groupForm = {
                        name: '',
                        type: 0,
                        userIds:[],
                        userNames:[]
                    }
                }
                this.groupObj.dealSh = true;
                //console.log(this.groupObj.curId);
            },
            getGroupList(){
                api.lessionGroupList({pageCurrent:1,pageSize:50}).then((res) => {
                    if(res.data.status === 200) {
                        this.groupObj.list = res.data.data.records;
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