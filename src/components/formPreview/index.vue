<template>
  <div class = "popBox" v-show = "sh">
    <div class = "p_box">
      <div class = "header">
        <p>申请</p>
        <span @click = "closeFn">关闭</span>
      </div>
      
      <div class = "body" id = "preview_dialog">
      </div>

      <div class = "footer">
        <el-button @click = "submitFn" style = "width:100px;" type="primary">提交表单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import 'element-ui/lib/theme-chalk/index.css';
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
  data() {
    return {
      sh:false,
      preview:null,
      data:[]
    };
  },
  methods:{

    submitFn(){
      var keyInfo = JSON.stringify(this.preview.getFormInfo());
      //console.log(keyInfo);
      this.$emit('success',keyInfo);
      this.closeFn();
    },
    getText(i){
      return `<div :style = "{textAlign:'right',fontSize:data[${i}].attr_size + 'px'}" class = "previewRow textBox">{{data[${i}].attr_name}}</div>`;
    },
    getInput(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <el-input 
                    size = "small" 
                    v-model = "data[${i}].attr_value" 
                    :placeholder="data[${i}].attr_placeholder">
                  </el-input>
              </div>`;
    },
    getTime(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <el-time-picker
                    size="small"
                    :style = "{width:calWidth(data[${i}].attr_input_width) + ' !important',flexGrow: 'initial'}" 
                    value-format="HH:mm:ss"
                    v-model="data[${i}].attr_time_value"
                    :picker-options="{
                      selectableRange: '00:00:00 - 23:59:59'
                    }">
                  </el-time-picker>
              </div>`;
    },
    getTimeRange(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
        
                  <el-time-picker
                    is-range
                    size="small"
                    :style = "{width:calWidth(data[${i}].attr_input_width) + ' !important',flexGrow: 'initial'}" 
                    v-model="data[${i}].attr_time_range_value"
                    value-format="HH:mm:ss"
                    range-separator="-"
                  >
                  </el-time-picker>
              </div>`;
    },
    getDateRange(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <el-date-picker
                    :style = "{width:calWidth(data[${i}].attr_input_width) + ' !important',flexGrow: 'initial'}" 
                    size="small"
                    value-format="yyyy-MM-dd"
                    v-model="data[${i}].attr_date_range_value"
                    type="daterange"
                    range-separator="-">
                  </el-date-picker>
              </div>`;
    },
    getDate(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <el-date-picker
                    :style = "{width:calWidth(data[${i}].attr_input_width) + ' !important',flexGrow: 'initial'}" 
                    size="small"
                    value-format="yyyy-MM-dd"
                    v-model="data[${i}].attr_date_value"
                    type="date">
                  </el-date-picker>
              </div>`;
    },
    getInputNumber(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <el-input-number 
                    :style = "{width:calWidth(data[${i}].attr_input_width)}" 
                    size = "small" 
                    :min = "data[${i}].attr_min" 
                    :max = "data[${i}].attr_max" 
                    v-model = "data[${i}].attr_value" 
                    :placeholder="data[${i}].attr_placeholder"
                    controls-position="right">
                  </el-input-number>
              </div>`;
    },
    getSelect(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>

                  <el-select 
                    size = "small" 
                    v-model="data[${i}].data_value" 
                    :style = "{width:calWidth(data[${i}].attr_input_width)}" 
                    :placeholder="data[${i}].attr_placeholder">
                    <el-option
                      v-for="v,index in data[${i}].attr_data_list"
                      :key="index"
                      :label="v.name"
                      :value="v.name">
                    </el-option>
                  </el-select>
              </div>`;
    },
    getLinkSelect(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>

                  <el-cascader
                    size="small"
                    clearable
                    :style = "{width:calWidth(data[${i}].attr_input_width)}" 
                    :placeholder="data[${i}].attr_placeholder"
                    v-model="data[${i}].attr_data_link_value"
                    :options="data[${i}].attr_data_link_list">
                  </el-cascader>
              </div>`;
    },
    getRadio(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>

                  <span>
                    <el-radio 
                      :style = "{display:data[${i}].attr_layer,marginRight:'30px',textAlign:'left'}"
                      v-for = "v,index in data[${i}].attr_data_list" 
                      v-model="data[${i}].data_value" 
                      :label="v.name">
                      {{v.name}}
                    </el-radio>
                  </span>
              </div>`;
    },
    getCheck(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>

                  <el-checkbox-group v-model = "data[${i}].data_value">
                    <el-checkbox
                      :style = "{display:data[${i}].attr_layer,marginRight:'30px',textAlign:'left'}"
                      v-for = "v,index in data[${i}].attr_data_check_list"
                      :key = "index" 
                      :label="v.name">
                    </el-checkbox>
                  </el-checkbox-group>
              </div>`;
    },
    getSwitch(i){
      return `<div class = "previewRow inputBox">
                  <span :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>

                  <el-switch
                    v-model="data[${i}].attr_boolean_value">
                  </el-switch>
              </div>`;
    },
    getTextarea(i){
      return `<div class = "previewRow inputBox">
                  <span class = "labelTextarea" :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <el-input 
                    size = "small" 
                    resize = "none" 
                    :placeholder="data[${i}].attr_placeholder"
                    type="textarea" 
                    v-model = "data[${i}].attr_value" 
                    :rows="5">
                  </el-input>
              </div>`;
    },
    getUpload(i){
      return `<div class = "previewRow inputBox">
                  <span class = "labelTextarea" :style = "{textAlign:'right',width:calWidth(data[${i}].label_width)}">{{data[${i}].attr_name}}</span>
                  <el-upload
                    class="avatar-uploader"
                    :action="data[${i}].attr_url"
                    :show-file-list="false"
                   >
                    <img 
                      v-if="data[${i}].data_url" 
                      :src="data[${i}].data_url" 
                      class="avatar" />
                    <i 
                      v-else 
                      class="el-icon-plus avatar-uploader-icon">
                    </i>
                  </el-upload>
              </div>`;
    },
    getBtn(i){
      return `<div class = "previewRow btnBox"><span>{{data['${i}'].attr_name}}</span></div>`;
    },
    getBox(i){
      return `<div class = "previewRow formBox">
                <table class = "">
                  <tr class = "header">
                    <td class = "col0">#</td>
                    <td v-for = "v2,index2 in data[${i}].arr" :key = "'childFormListTh' + index2">{{v2.attr_name}}</td>
                  </tr>
                  <tr v-for = "v,index in data[${i}].dataList" :key = "'childFormList' + index">
                    <td class = "col0" @click = "delRow(${i},index)">{{index+1}}</td>
                    <td v-for = "v2,index2 in data[${i}].arr" :key = "'childFormListTd' + index2">
                      <el-input 
                        v-if = "v2.type == 'input'" 
                        size = "small" 
                        :placeholder="v2.attr_placeholder"
                        v-model = "v[index2]">
                      </el-input>

                      <el-input-number 
                        v-else-if = "v2.type == 'inputNumber'" 
                        v-model = "v[index2]"
                        :min = "v2.attr_min" 
                        :max = "v2.attr_max" 
                        :placeholder="v2.attr_placeholder" 
                        size = "small">
                      </el-input-number>

                      <el-input 
                        v-else-if = "v2.type == 'textarea'"
                        class = "formTextarea" 
                        resize = "none" 
                        type="textarea"  
                        :rows = "5" 
                        :placeholder="v2.attr_placeholder"
                        v-model = "v[index2]">
                      </el-input>

                      <el-select 
                        v-else-if = "v2.type == 'select'"
                        size = "small" 
                        v-model="v[index2]" 
                        :placeholder="v2.attr_placeholder">
                        <el-option
                          v-for="v3,index3 in v2.attr_data_list"
                          :key="index3"
                          :label="v3.name"
                          :value="v3.name">
                        </el-option>
                      </el-select>

                      <el-cascader
                        size="small"
                        clearable
                        v-else-if = "v2.type == 'linkSelect'"
                        :placeholder="v2.attr_placeholder"
                        v-model="v2.attr_data_link_value"
                        :options="v2.attr_data_link_list">
                      </el-cascader>

                      <div v-else-if = "v2.type == 'radio'" style = "text-align:left">
                        <el-radio 
                          :style = "{display:v2.attr_layer,textAlign:'left'}"
                          v-for = "v3,index3 in v2.attr_data_list" 
                          :key = "index3"
                          v-model="v[index2]" 
                          :label="v3.name">
                          {{v3.name}}
                        </el-radio>
                      </div>

                      <el-date-picker
                        v-else-if = "v2.type == 'date'"
                        size="small"
                        value-format="yyyy-MM-dd"
                        v-model="v[index2]"
                        type="date">
                      </el-date-picker>

                      <el-date-picker
                        v-else-if = "v2.type == 'dateRange'"
                        size="small"
                        value-format="yyyy-MM-dd"
                        v-model="v[index2]"
                        type="daterange"
                        range-separator="-">
                      </el-date-picker>

                      <el-time-picker
                        v-else-if = "v2.type == 'time'"
                        size="small"
                        value-format="HH:mm:ss"
                        v-model="v[index2]"
                        :picker-options="{
                          selectableRange: '00:00:00 - 23:59:59'
                        }">
                      </el-time-picker>

                      <el-time-picker
                        v-else-if = "v2.type == 'timeRange'"
                        is-range
                        v-model="v[index2]"
                        value-format="HH:mm:ss"
                        range-separator="-"
                      >
                      </el-time-picker>

                      <el-checkbox-group
                        style = "text-align:left"
                        v-else-if = "v2.type == 'check'"
                        v-model = "v[index2]">
                        <el-checkbox
                          :style = "{display:v2.attr_layer,textAlign:'left'}"
                          v-for = "v3,index3 in v2.attr_data_check_list"
                          :key = "index3" 
                          :label="v3.name">
                        </el-checkbox>
                      </el-checkbox-group>

                      <el-switch
                        v-else-if = "v2.type == 'switch'"
                        v-model="v[index2]">
                      </el-switch>

                      <el-upload
                        v-else-if = "v2.type == 'upload'"
                        class="avatar-uploader"
                        :action="v2.attr_url"
                        :show-file-list="false"
                       >
                        <img 
                          v-if="v[index2]" 
                          :src="v[index2]" 
                          class="avatar" />
                        <i 
                          v-else 
                          class="el-icon-plus avatar-uploader-icon">
                        </i>
                      </el-upload>

                      <div v-else>{{v[index2]}}</div>
                    </td>
                  </tr>
                </table>
                <div class = "formBoxBtn">
                  <span @click = "addChildFormRow(${i})">+ 添加</span>
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
        else if(this.data[i].type == 'childForm'){
          str += this.getBox(i);
        }
        else{

        }
      }
      str += '</div>';
      return str;
    },
    showFn(dataArr){
      this.sh = true;
      const self = this;
      if(typeof dataArr == "string"){
        if(dataArr == ''){
          dataArr = [];
        }
        else{
          dataArr = JSON.parse(dataArr);
        }
      }
      Vue.nextTick(function () {
        // DOM 更新了
        const element = self.$el.querySelector('#preview_dialog')
        element.innerHTML = '<div id="preview"></div>';
        
        // const _Vue_ = Vue.extend(self.modeler.build(self.list))
        // self.preview = new _Vue_().$mount('#preview')
        console.log(dataArr);
        self.data = JSON.parse(JSON.stringify(dataArr));
        var vueHtml = Vue.extend({
            template:self.buildHtml(),
            data: function () {
                return{
                    data:self.data
                }
            },
            methods:{
              test(e){
                console.log(e);
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
                  if(obj.arr[i].type == 'select' || obj.arr[i].type == 'radio' || obj.arr[i].type == 'check'){
                    tempArr.push(obj.arr[i].data_value);
                  }
                  else if(obj.arr[i].type == 'switch'){
                    tempArr.push(obj.arr[i].attr_boolean_value);
                  }
                  else if(obj.arr[i].type == 'time'){
                    tempArr.push(obj.arr[i].attr_time_value);
                  }
                  else if(obj.arr[i].type == 'timeRange'){
                    tempArr.push(obj.arr[i].attr_time_range_value);
                  }
                  else if(obj.arr[i].type == 'date'){
                    tempArr.push(obj.arr[i].attr_date_value);
                  }
                  else if(obj.arr[i].type == 'dateRange'){
                    tempArr.push(obj.arr[i].attr_date_range_value);
                  }
                  else if(obj.arr[i].type == 'upload'){
                    tempArr.push(obj.arr[i].data_url);
                  }
                  else{
                    tempArr.push(obj.arr[i].attr_value);
                  }
                }
                obj.dataList.push(tempArr);
                this.$set(this.data,index,obj);
              },
              delRow(index,index2){
                var obj = JSON.parse(JSON.stringify(this.data[index]));
                obj.dataList.splice(index2,1);
                this.$set(this.data,index,obj);
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
      table{
        border-top:1px solid @borderColor;
        border-left:1px solid @borderColor;
        border-right:1px solid @borderColor;
        width:100%;
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
