<template>
  <div class = "popBox" :class = "{popBoxNormal:true}" v-show = "sh">
    <div class = "p_box">
      <div class = "body" id = "preview_dialog">
      </div>

      <!-- <div class = "footer" v-show = "submitBtn">
        <el-button @click = "submitFn" style = "width:100px;" type="primary">提交表单</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import 'element-ui/lib/theme-chalk/index.css';
import api from "@api";
import handWriteComp from '@/components/formPreview/handWrite';
import { Button,Input,InputNumber,Select,Option,Radio,Switch,Checkbox,CheckboxGroup,TimePicker,DatePicker,TimeSelect,Cascader,Upload } from 'element-ui';
Vue.use(Button);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(Option);
Vue.use(Radio);
Vue.use(Switch);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(TimePicker);
Vue.use(TimeSelect);
Vue.use(DatePicker);
Vue.use(Cascader);
Vue.use(Upload);

export default {
  name: "Preview",
  props:{
      submitBtn: {
          type: Boolean,
          default: true
      },
      fixed:{
          type:Boolean,
          default:true
      }
  },
  data() {
    return {
      sh:false,
      preview:null,
      data:[],
      formId:''
    };
  },
  methods:{

    submitFn(){
      let keyInfo = JSON.stringify(this.preview.getFormInfo());
      let keyInfoStr = this.filterFn(keyInfo);//处理一些参数合并
      // console.log(keyInfoStr);
      // return;
      if(this.$listeners['success']){
          this.$emit('success',keyInfoStr);
      }
      if(this.$listeners['getFormInfo']){
          this.$emit('getFormInfo',{formId:this.formId});
      }
      this.closeFn();
    },
    filterFn(str){
      let arr = JSON.parse(str);
      arr.forEach((e,index) => {
          // console.log(e);
          // console.log(index);

          if(e.type == 'radio'){//单选组件选中“其他”时，将“其他”的非空input值拼接到“其他”后面
              let selectObj = e.attr_data_list.find(obj=>obj.name == e.data_value);
              if(typeof selectObj != 'undefined'){
                  if(selectObj.id == 999 && e.otherValue != ''){
                      e.data_value += '-' + e.otherValue; 
                  }
              }
          }

          if(e.type == 'check'){//多选组件勾选“其他”时，将“其他”的非空input值拼接到“其他”后面
              for(let i = 0;i < e.data_value.length;i++){
                  let selectObj = e.attr_data_check_list.find(obj=>obj.name == e.data_value[i]);
                  if(typeof selectObj != 'undefined'){
                      if(selectObj.id == 999 && e.otherValue != ''){
                          e.data_value[i] += '-' + e.otherValue;
                          break; 
                      }
                  }
              }
          }

          if(e.type == 'linkSelect'){//级联下拉组件将value替换为label再提交
              let arr = e.attr_data_link_list;
              let value = JSON.parse(JSON.stringify(e.attr_data_link_value));
              e.attr_data_link_value = this.getLinkSelectName(arr,value);
          }

          if(e.type == 'childForm'){//子表单
              let optionList = e.arr;
              let dataList = e.dataList;
              dataList.forEach(eRow => {
                  eRow.forEach((eCol,eIndex) => {
                      if(optionList[eIndex].type == 'radio'){//单选组件选中“其他”时，将“其他”的非空input值拼接到“其他”后面
                          let selectObj = optionList[eIndex].attr_data_list.find(obj => obj.name == eCol.value);
                          if(typeof selectObj != 'undefined'){
                              if(selectObj.id == 999 && eCol.otherValue != ''){
                                  eCol.value += '-' + eCol.otherValue;
                              }
                          }
                      }
                      if(optionList[eIndex].type == 'check'){//多选组件勾选“其他”时，将“其他”的非空input值拼接到“其他”后面
                          for(let i = 0;i < eCol.value.length;i++){
                              let selectObj = optionList[eIndex].attr_data_check_list.find(obj => obj.name == eCol.value[i]);
                              if(typeof selectObj != 'undefined'){
                                  if(selectObj.id == 999 && eCol.otherValue != ''){
                                      eCol.value[i] += '-' + eCol.otherValue;
                                      break;
                                  }
                              }
                          }
                      }
                      if(optionList[eIndex].type == 'linkSelect'){//级联下拉组件将value替换为label再提交
                          let arr = optionList[eIndex].attr_data_link_list;
                          let value = JSON.parse(JSON.stringify(eCol.value));
                          eCol.value = this.getLinkSelectName(arr,value);
                      }
                  })
              });
          }
      });
      return JSON.stringify(arr);
    },
    getLinkSelectName(arr,value){
        console.log(arr);
        console.log(value);

        value.forEach(valueObj => {
            if(valueObj.length == 1){
                let findObj = arr.find(e => e.value == valueObj[0]);
                valueObj[0] = findObj.label;
            }
            else if(valueObj.length == 2){
                let findObj = arr.find(e => e.value == valueObj[0]);
                let findObj2 = findObj.children.find(e => e.value == valueObj[1]);
                valueObj[0] = findObj.label;
                valueObj[1] = findObj2.label;
            }
            else if(valueObj.length == 3){
                let findObj = arr.find(e => e.value == valueObj[0]);
                let findObj2 = findObj.children.find(e => e.value == valueObj[1]);
                let findObj3 = findObj2.children.find(e => e.value == valueObj[2]);
                valueObj[0] = findObj.label;
                valueObj[1] = findObj2.label;
                valueObj[2] = findObj3.label;
            }
        });
        return value;
    },
    getText(i){
      return `<div :style = "{fontWeight:data[${i}].attr_label_weight,textAlign:data[${i}].attr_label_align,fontSize:data[${i}].attr_size + 'px'}" class = "previewRow textBox">{{data[${i}].attr_name}}</div>`;
    },
    getInput(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <span>{{data[${i}].attr_value}}</span>
              </div>`;
    },
    getTime(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <span>{{data[${i}].attr_time_value}}</span>
              </div>`;
    },
    getTimeRange(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <span>{{data[${i}].attr_time_range_value != null ? data[${i}].attr_time_range_value[0] + "-" + data[${i}].attr_time_range_value[1] : ""}}</span>
              </div>`;
    },
    getDateRange(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <span>{{data[${i}].attr_date_range_value != null ? data[${i}].attr_date_range_value[0] + "-" + data[${i}].attr_date_range_value[1] : ""}}</span>
              </div>`;
    },
    getDate(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <span>{{data[${i}].attr_date_value}}</span>
              </div>`;
    },
    getInputNumber(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <span>{{data[${i}].attr_value}}</span>
              </div>`;
    },
    getSelect(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>

                  <span>{{data[${i}].data_value}}</span>
              </div>`;
    },
    getLinkSelect(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>

                  <div>
                      <p :key = "index" v-for = "v,index in data[${i}].attr_data_link_value ? data[${i}].attr_data_link_value : []">
                          {{v.join('/')}}
                      </p>
                  </div>
              </div>`;
    },
    getRadio(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <span>
                      {{data[${i}].data_value}} 
                  </span>
              </div>`;
    },
    getCheck(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>

                  <span>{{data[${i}].data_value.join(',')}}</span>
              </div>`;
    },
    getSwitch(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>

                  <el-switch
                    :disabled = "true"
                    v-model="data[${i}].attr_boolean_value">
                  </el-switch>
              </div>`;
    },
    getTextarea(i){
      return `<div class = "previewRow inputBox">
                  <span class = "labelTextarea" :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <span>{{data[${i}].attr_value}}</span>
              </div>`;
    },
    getHandWrite(i){
      return `<div class = "previewRow inputBox" @click = "setCompIndex(${i},-1,-1)">
                  <span class = "labelTextarea" :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <span style = "flex-grow:1;width:0;">
                      <handWriteComp :disabled = "true" @successFn = "handleHandWriteSuccess" :dataUrl = "data[${i}].data_url"/>
                  </span>
              </div>`;
    },
    getUpload(i){
      return `<div class = "previewRow inputBox" @click = "setCompIndex(${i},-1,-1)">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <el-link @click = "downloadFn(data[${i}].data_url)" type="primary">{{data[${i}].data_url}}</el-link>
              </div>`;
    },
    getBtn(i){
      return `<div class = "previewRow btnBox"><span>{{data['${i}'].attr_name}}</span></div>`;
    },
    getBox(i){
      return `<div class = "previewRow formBox">
                <div class = "formBoxList">
                  <span class = "labelTextarea" :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <table class = "">
                    <tr class = "header">
                      <td class = "col0">#</td>
                      <td v-for = "v2,index2 in data[${i}].arr" :key = "'childFormListTh' + index2">{{v2.attr_name}}</td>
                    </tr>
                    <tr v-for = "v,index in data[${i}].dataList" :key = "'childFormList' + index">
                      <td class = "col0" @click = "delRow(${i},index)">{{index+1}}</td>
                      <td v-for = "v2,index2 in data[${i}].arr" :key = "'childFormListTd' + index2">
                          <div v-if = "v2.type == 'linkSelect' && v[index2].value != null">
                              <p v-for = "v3,index3 in v[index2].value" :key = "index3">
                                  {{v3.join('/')}}
                              </p>
                          </div>
                          <div v-else-if = "v2.type == 'check' && v[index2].value != null">
                              {{v[index2].value.join(',')}}
                          </div>
                          <div v-else-if = "v2.type == 'upload' && v[index2].value != null">
                              <el-link @click = "downloadFn(v[index2].value)" style = "font-size:12px;" type="primary">{{v[index2].value}}</el-link>
                          </div>
                          <div v-else-if = "v[index2].value != null && (v2.type == 'dateRange' || v2.type == 'timeRange')">
                              {{v[index2].value.join('~')}}
                          </div>
                          <el-switch
                            :disabled = "true"
                            v-else-if = "v2.type == 'switch'"
                            v-model="v[index2].value">
                          </el-switch>
                          <div v-else-if = "v2.type == 'handWrite'">
                              <div style = "padding-top:10px;">
                                  <handWriteComp :disabled = "true" :dataUrl = "v[index2].value"/>
                              </div>
                          </div>
                          <span v-else>{{v[index2].value}}</span>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>`;
    },
    buildHtml(){
      var str = '<div class = "previewBox">';
      for(var i = 0;i < this.data.length;i++){
        if(this.data[i].type == 'text'){
          str += this.getText(i);
        }
        else if(this.data[i].type == 'button'){
          str += this.getBtn(i);
        }
        else if(this.data[i].type == 'input'){
          str += this.getInput(i);
        }
        else if(this.data[i].type == 'inputNumber'){
          str += this.getInputNumber(i);
        }
        else if(this.data[i].type == 'textarea'){
          str += this.getTextarea(i);
        }
        else if(this.data[i].type == 'select'){
          str += this.getSelect(i);
        }
        else if(this.data[i].type == 'linkSelect'){
          str += this.getLinkSelect(i);
        }
        else if(this.data[i].type == 'radio'){
          str += this.getRadio(i);
        }
        else if(this.data[i].type == 'check'){
          str += this.getCheck(i);
        }
        else if(this.data[i].type == 'switch'){
          str += this.getSwitch(i);
        }
        else if(this.data[i].type == 'time'){
          str += this.getTime(i);
        }
        else if(this.data[i].type == 'date'){
          str += this.getDate(i);
        }
        else if(this.data[i].type == 'timeRange'){
          str += this.getTimeRange(i);
        }
        else if(this.data[i].type == 'dateRange'){
          str += this.getDateRange(i);
        }
        else if(this.data[i].type == 'upload'){
          str += this.getUpload(i);
        }
        else if(this.data[i].type == 'handWrite'){
          str += this.getHandWrite(i);
        }
        else if(this.data[i].type == 'childForm'){
          str += this.getBox(i);
        }
        else{

        }
      }
      str += '</div>';
      return str;
    },
    showFn(dataArr,formId){
      this.sh = true;
      this.formId = formId;
      const self = this;
      if(typeof dataArr == "string"){
        if(dataArr == ''){
          dataArr = [];
        }
        else{
          dataArr = JSON.parse(dataArr);
        }
      }
      
      let rqSelectArr = [];//将绑定数据的下拉组件筛选出来，记录下标
      let childIndexSet = {};//记录子表单绑定数据的下拉组件下标
      for(let i = 0;i < dataArr.length;i++){
          if(dataArr[i].hasOwnProperty('attr_data_source') && dataArr[i].attr_data_source == 'bind' && dataArr[i].attr_data_bind != ''){
              rqSelectArr.push(i);
          }
          if(dataArr[i].type == 'childForm'){
              let childList = dataArr[i].arr;
              for(let j = 0;j < childList.length;j++){
                  if(childList[j].hasOwnProperty('attr_data_source') && childList[j].attr_data_source == 'bind' && childList[j].attr_data_bind != ''){
                      rqSelectArr.push(i);
                      childIndexSet[i] = j;
                      break;
                  }
              }
          } 
      }

      let rqCount = 0;
      if(rqSelectArr.length == 0){//未发现绑定数据的下拉组件，直接初始化
          self.initPreview(dataArr);
          return;
      }
      rqSelectArr.forEach(e => {//存在绑定数据的下拉组件，先遍历请求数据完再初始化
          let ifChildForm = dataArr[e].type == "childForm";
          let bindId = ifChildForm ? dataArr[e].arr[childIndexSet[e]].attr_data_bind : dataArr[e].attr_data_bind;
          api.formSourceSelectList(bindId).then((res) => {
              if(res.data.status === 200) {
                  let reArr = res.data.data;
                  let arr = [];
                  for(let i = 0;i < reArr.length;i++){
                      arr.push({id:i + 1,name:reArr[i]});
                  }
                  if(ifChildForm)
                      dataArr[e].arr[childIndexSet[e]].bind_list = arr;
                  else
                      dataArr[e].bind_list = arr;
                  rqCount++;
                  if(rqCount == rqSelectArr.length){
                      self.initPreview(dataArr);
                  }
              }
          });
      });
    },
    initPreview(dataArr){
      const self = this;
      Vue.nextTick(function () {
        // DOM 更新了
        const element = self.$el.querySelector('#preview_dialog')
        element.innerHTML = '<div id="preview"></div>';
        
        // const _Vue_ = Vue.extend(self.modeler.build(self.list))
        // self.preview = new _Vue_().$mount('#preview')
        //console.log(dataArr);
        self.data = JSON.parse(JSON.stringify(dataArr));
        let session = JSON.parse(localStorage.getItem('stu-p3lab'));
        let token = session.session.userInfo.token;

        // console.log(self.submitBtn);

        var vueHtml = Vue.extend({
            template:self.buildHtml(),
            data: function () {
                return{
                    data:self.data,
                    token:token,
                    canEdit:self.submitBtn,
                    compIndex:-1,
                    compIndex2:-1,
                    compIndex3:-1
                }
            },
            components: {
                handWriteComp
            },
            methods:{
              test(e){
                console.log(e);
              },
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
              setCompIndex(index,index2,index3){
                  //console.log(index);
                  self.preview.compIndex = index;
                  self.preview.compIndex2 = index2;
                  self.preview.compIndex3 = index3;
              },
              handleHandWriteSuccess(res){
                  if(self.preview.compIndex2 == -1 && self.preview.compIndex3 == -1)
                      self.preview.data[self.preview.compIndex].data_url = res.data;
                  else
                      self.preview.data[self.preview.compIndex].dataList[self.preview.compIndex2][self.preview.compIndex3].value = res.data;
              },
              handleAvatarSuccess(res, file) {
                  // console.log(res);
                  // console.log(file);
                  // console.log(self.preview.compIndex);
                  // console.log(self.preview.compIndex2);
                  // console.log(self.preview.compIndex3);
                  if(self.preview.compIndex2 == -1 && self.preview.compIndex3 == -1)
                      self.preview.data[self.preview.compIndex].data_url = res.data;
                  else
                      self.preview.data[self.preview.compIndex].dataList[self.preview.compIndex2][self.preview.compIndex3].data_url = res.data;
                  self.preview.$forceUpdate();
                  self.$message.success('上传成功');
              },
              getFormInfo(){
                return this.data;
              },
              calWidth(v){
                v += '';
                if(v == '')
                  return 'auto';
                if(v.indexOf('%') > -1)
                  return v;
                if(!isNaN(v))
                return v + 'px';
              },
              addChildFormRow(index){
                var obj = JSON.parse(JSON.stringify(this.data[index]));
                // console.log(obj);
                let tempArr = [];
                for(var i = 0;i < obj.arr.length;i++){
                  if(obj.arr[i].type == 'select'){
                      tempArr.push({
                          type:obj.arr[i].type,
                          label:obj.arr[i].attr_name,
                          value:obj.arr[i].data_value
                      });
                  }
                  else if(obj.arr[i].type == 'radio' || obj.arr[i].type == 'check'){
                      tempArr.push({
                          type:obj.arr[i].type,
                          label:obj.arr[i].attr_name,
                          value:obj.arr[i].data_value,
                          otherValue:''
                      });
                  }
                  else if(obj.arr[i].type == 'linkSelect'){
                      tempArr.push({
                          type:obj.arr[i].type,
                          label:obj.arr[i].attr_name,
                          value:obj.arr[i].attr_data_link_value
                      });
                  }
                  else if(obj.arr[i].type == 'switch'){
                      tempArr.push({
                          type:obj.arr[i].type,
                          label:obj.arr[i].attr_name,
                          value:obj.arr[i].attr_boolean_value
                      });
                  }
                  else if(obj.arr[i].type == 'time'){
                      tempArr.push({
                          type:obj.arr[i].type,
                          label:obj.arr[i].attr_name,
                          value:obj.arr[i].attr_time_value
                      });
                  }
                  else if(obj.arr[i].type == 'timeRange'){
                      tempArr.push({
                          type:obj.arr[i].type,
                          label:obj.arr[i].attr_name,
                          value:obj.arr[i].attr_time_range_value
                      });
                  }
                  else if(obj.arr[i].type == 'date'){
                      tempArr.push({
                          type:obj.arr[i].type,
                          label:obj.arr[i].attr_name,
                          value:obj.arr[i].attr_date_value
                      });
                  }
                  else if(obj.arr[i].type == 'dateRange'){
                      tempArr.push({
                          type:obj.arr[i].type,
                          label:obj.arr[i].attr_name,
                          value:obj.arr[i].attr_date_range_value
                      });
                  }
                  else if(obj.arr[i].type == 'upload'){
                      tempArr.push({
                          type:obj.arr[i].type,
                          label:obj.arr[i].attr_name,
                          value:obj.arr[i].data_url
                      });
                  }
                  else if(obj.arr[i].type == 'handWrite'){
                          tempArr.push({
                              use:true,
                              type:obj.arr[i].type,
                              label:obj.arr[i].attr_name,
                              value:obj.arr[i].data_url
                          });
                      }
                  else{
                      tempArr.push({
                          type:obj.arr[i].type,
                          label:obj.arr[i].attr_name,
                          value:obj.arr[i].attr_value
                      });
                  }
                }
                obj.dataList.push(tempArr);
                this.$set(this.data,index,obj);
              },
              delRow(index,index2){
                var obj = JSON.parse(JSON.stringify(this.data[index]));
                obj.dataList[index2].forEach(e => {
                    if(e.type == 'handWrite'){
                        e.use = false;
                    }
                });
                this.$set(this.data,index,obj);

                let _this = this;
                setTimeout(function(){
                    obj.dataList.splice(index2,1);
                    _this.$set(_this.data,index,obj);
                },100);
              }
            }
 
        });
        self.preview = new vueHtml().$mount('#preview');
      })
    },
    closeFn(){
      this.sh = false;
    }
  }
};
</script>


<style scoped lang="less">
@deep: ~'>>>';
@defaultPadding: 10px;
@borderColor:#ddd;
@inputHeight:40px;
@fontSize:14px;
@labelColor:#333;
@valueColor:#666;
@blueColor:#409eff;

.popBox{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  background:rgba(0,0,0,0.5);
  .p_box{
    background: #fff;
    height:100%;
    width:100%;
    margin:0 auto;
    display: flex;
    flex-direction: column;
    .header{
      background: #e6eff5;
      height: 44px;
      position: relative;
      p{
        line-height: 44px;
        height: 44px;
        text-align: center;
        margin:0;
      }
      span{
        position: absolute;
        right: 0;
        top: 0;
        height: 44px;
        padding: 0 20px;
        line-height: 44px;
        font-size: 14px;
        cursor: pointer;
        color:@blueColor;
      }
    }
    .footer{
      height: 60px;
      text-align:center;
    }
    .body{
      margin:20px;
      box-shadow: 0px 0px 10px #ddd;
      flex-grow: 1;
      height: 0;
    }
  }   
}
.popBoxNormal{
  position:relative;
  .p_box{
    .body{
      height:auto;
    }
  }
}

#preview_dialog{
  overflow:auto;
  @{deep} .previewBox{
    padding: 20px;
    .previewRow{
      /*border:1px solid @borderColor;*/
      /*padding:0 @defaultPadding;*/
      padding-bottom:16px;
    }
    .inputBox{
      display:flex;
      align-items:center;
      &>span{
        padding:10px;
        /*border-right:1px solid @borderColor;*/
        font-size:@fontSize;
        color:@labelColor;
      }
      .labelTextarea{
        height:80px;
      }
      .el-input,
      .el-textarea{
        flex-grow:1;
        width:0;
      }
      .el-input-number,
      .el-cascader,
      .el-select{
        .el-input{
          width:100%;
        }
      }
    }
    .textBox{
      padding:@defaultPadding;
    }
    .btnBox{
      /*text-align: left;*/
      span{
        display: inline-block;
        vertical-align: top;
        width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border:1px solid #ccc;
        border-radius: 4px;
        font-size: 12px;
        background: #fff;
        cursor: pointer;
      }
    }
    .formBox{
      .formBoxList{
        display:flex;
        .labelTextarea{
          padding: 10px;
          font-size: 14px;
          color: #333;
        }
        table{
          border-top:1px solid @borderColor;
          border-left:1px solid @borderColor;
          border-right:1px solid @borderColor;
          width:0;
          flex-grow:1;
          border-collapse: collapse;
          tr{
            height:50px;
            border-bottom:1px solid @borderColor;
            td{
              padding:0 10px;
              border-right:1px solid @borderColor;
              .formInput{
                width:98%;
                height:@inputHeight;
                border:none;
                outline:none;
                font-size:@fontSize;
                color:@valueColor;
              }
              .formTextarea{
                padding:@defaultPadding 0;
                width:98%;
                border:none;
                outline:none;
                font-size:@fontSize;
                color:@valueColor;
                resize:none;
              }
            }
            td:last-child{
              border-right:none;
            }
            .col0{
              width:30px;
              cursor:pointer;
              position:relative;
              &:after{
                position:absolute;
                width:100%;
                height:100%;
                line-height:@inputHeight;
                content:'';
                background:#fff url('../../assets/image/form/icon_del2.png') no-repeat center center;
                background-size:18px;
                top:0;
                left:0;
                color:@blueColor;
                display:none;
                cursor:pointer;
              }
              &:hover:after{
                display:block;
              }
            }
          }
          tr.header{
            background:#f5f7fa;
            .col0{
              cursor:auto;
              &:hover:after{
                display:none;
              }
            }
          }
        }
      }

      .formBoxBtn{
        height:40px;
        span{
          line-height:40px;
          cursor:pointer;
          color:@blueColor;
        }
      }
    }

    .avatar-uploader{
      padding:10px 0;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
}

.fontFn (@px, @attr: font-size) {
    @rem: (@px / 37.5);
    @{attr}: ~"@{rem}rem";
}

@media screen and (max-width: 750px) {
  .popBox{
    .p_box{
      .header{
        height:60px;
        p{
          font-size:28px;
          height:60px;
          line-height:60px;
        }
        span{
          height:60px;
          line-height:60px;
          font-size:24px;
        }
      }
      .footer{
        height:80px;
        @{deep} button{
          font-size:28px;
          width:200px !important;
        }
      }
    }
  }
  #preview_dialog{

  }
}

</style>
