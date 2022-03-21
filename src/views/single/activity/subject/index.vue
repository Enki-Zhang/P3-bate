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
                </el-form>

                <!-- 列表 -->
                <el-row>
                    <el-table ref="multipleTable" :data="tbData.content" tooltip-effect="dark"
                              :min-height="460" size="small"
                              highlight-current-row border>
                        <el-table-column v-if = "tbColumn.length > 0" label="表单id" fixed="left" show-overflow-tooltip width="60">
                            <template slot-scope="scope">{{ scope.row.formId }}</template>
                        </el-table-column>
                        <el-table-column v-else label="未绑定表单" show-overflow-tooltip>
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
                  prop="username"
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
                    datetime:null,
                    responer:'',
                    area:''
                },
                tbColumn:[],
                btnLoadingFilter: false,
                key:null,

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
            this.getRouterInfo();
            //this.getColumn();
            this.getGroupList();
        },
        methods: {
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
            getRouterInfo: function() {
                let menu = JSON.parse(localStorage.getItem('stu-p3lab')).session.userInfo.menus;
                // console.log(menu);
                // console.log(this.$route.name);

                function findRouterObj(arr,name){
                    for(let i = 0;i < arr.length;i++){
                        if(arr[i].name == name){
                            return arr[i];
                        }
                        if(arr[i].children.length > 0){
                            let obj = findRouterObj(arr[i].children,name);
                            if(obj != null)
                                return obj;
                        }
                    }
                    return null;
                }

                let obj = findRouterObj(menu,this.$route.name);
                // console.log(obj);
                if(obj != null && obj.formKeys.length > 0){
                    let key = obj.formKeys[0];
                    this.key = key;
                    this.getColumn();
                }
            },
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

                let formKey = this.key;
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
                if(this.key == null)return;
                this.btnLoadingFilter = true;

                let params = {
                    ...this.tbDataFilter,
                    pageCurrent: page,
                    pageSize,
                };
                console.log(this.$route.name);
                let formKey = this.key;
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