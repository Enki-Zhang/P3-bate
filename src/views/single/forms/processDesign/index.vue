<template>
  <el-row class="_root_page">
    <el-row type="flex" class="page-default-pd page-default-h-has-breadcrumb">
      <Process
        v-if="processDone"
        ref="processDesign"
        :conf="processData.processData"
        tabName="processDesign"
        class="process"
      />
    </el-row>
    <el-row
      type="flex"
      justify="center"
      align="middle"
      class="page-default-pd-bgc-white edit-page-options-btn mg-b-20"
    >
      <el-button
        type="default"
        size="small"
        icon="el-icon-refresh-left"
        @click="cancel"
        class="btn"
        >返回列表</el-button
      >
      <el-button
        type="primary"
        size="small"
        icon="el-icon-finished"
        :loading="btnLoadingSave"
        @click="save"
        class="btn"
        >保存修改</el-button
      >
    </el-row>
  </el-row>
</template>

<script>
import Process from "@/components/workflow/Process";
import api from "@api";
const listRoutePath = "/forms/forms-manage";

export default {
  name: "index",
  components: {
    Process,
  },
  data() {
    return {
      mockData: {
        processData: {},
      },

      processDone: false,
      originData: {},
      originFormData: {},
      processData: {},
      btnLoadingSave: false,
    };
  },
  created() {
    // console.log(
    //   JSON.parse(
    //     '{"basicSetting":{"flowCode":"repair","flowGroup":0,"flowIcon":"el-icon-lollipop","flowIconBackground":"#FF8ACC","flowName":"报修工单","flowRemark":null,"id":"1477061296355643394"},"formData":{"formRef":"elForm","gutter":15,"size":"medium","formRules":"rules","labelPosition":"right","formBtns":true,"labelWidth":100,"disabled":false,"formModel":"formData","fields":[{"formId":103,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"维修人员","prefix-icon":"","required":true,"renderKey":1645255796782,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入维修人员","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"repairUser"},{"formId":106,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"维修人员显示名","prefix-icon":"","required":true,"renderKey":1645256716446,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入维修人员显示名","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"repairUserName"},{"formId":105,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"维修状态","prefix-icon":"","required":true,"renderKey":1645256714995,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入维修状态","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"repairState"},{"formId":102,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"维修材料费","prefix-icon":"","required":true,"renderKey":1645079473571,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入维修材料费","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"repairMaterialsFee"},{"formId":102,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"维修服务费","prefix-icon":"","required":true,"renderKey":1645255785065,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入单行文本维修服务费","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"repairServiceFee"},{"formId":104,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"维修备注","prefix-icon":"","required":true,"renderKey":1645256713803,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入维修备注","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"repairContent"},{"formId":108,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"回访结果","prefix-icon":"","required":true,"renderKey":1645256899513,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入回访结果","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"returnResult"},{"formId":107,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"回访备注","prefix-icon":"","required":true,"renderKey":1645256897514,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入回访备注","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"returnRemark"}],"span":23},"processData":{"childNode":{"childNode":{"childNode":{"childNode":null,"conditionNodes":null,"content":"工单负责人","nodeId":"rWiszNC","outerNodeId":null,"prevId":"zLKrxNC","properties":{"approverRoles":[{"children":null,"hasChildren":null,"icon":"icon-ym icon-ym-tree-user2","id":"workflowManager","name":"工单负责人","parentId":"-1","type":"role"}],"approvers":[],"assigneeType":"role","expression":"","formOperates":[{"formId":103,"label":"维修人员","read":true,"required":true,"vModel":"repairUser","write":false},{"formId":106,"label":"维修人员显示名","read":true,"required":true,"vModel":"repairUserName","write":false},{"formId":105,"label":"维修状态","read":true,"required":true,"vModel":"repairState","write":false},{"formId":102,"label":"维修材料费","read":true,"required":true,"vModel":"repairMaterialsFee","write":false},{"formId":102,"label":"维修服务费","read":true,"required":true,"vModel":"repairServiceFee","write":false},{"formId":104,"label":"维修备注","read":true,"required":true,"vModel":"repairContent","write":false},{"formId":108,"label":"回访结果","read":true,"required":true,"vModel":"returnResult","write":true},{"formId":107,"label":"回访备注","read":true,"required":true,"vModel":"returnRemark","write":true}],"optionalMultiUser":"orSign","title":"结果确认"},"type":"approver"},"conditionNodes":[{"childNode":null,"conditionNodes":null,"content":"维修完成","nodeId":"cQfsxNC","prevId":"zLKrxNC","properties":{"condition":"${repairState == \'repaired\'}","conditionLabel":"维修完成","conditions":[{"condition":"${repairState == \'repaired\'}","conditonLabel":"维修完成"}],"initiator":null,"isDefault":false,"priority":0,"title":"现场直接修理"},"type":"condition"},{"childNode":{"childNode":null,"conditionNodes":null,"content":"自定义","nodeId":"OexyxNC","outerNodeId":null,"prevId":"REfsxNC","properties":{"approverRoles":[],"approvers":[],"assigneeType":"input","expression":"${repairAssignee}","formOperates":[{"formId":103,"label":"维修人员","read":true,"required":true,"vModel":"repairUser","write":false},{"formId":106,"label":"维修人员显示名","read":true,"required":true,"vModel":"repairUserName","write":false},{"formId":105,"label":"维修状态","read":true,"required":true,"vModel":"repairState","write":false},{"formId":102,"label":"维修材料费","read":true,"required":true,"vModel":"repairMaterialsFee","write":true},{"formId":102,"label":"维修服务费","read":true,"required":true,"vModel":"repairServiceFee","write":true},{"formId":104,"label":"维修备注","read":true,"required":true,"vModel":"repairContent","write":true},{"formId":108,"label":"回访结果","read":false,"required":true,"vModel":"returnResult","write":false},{"formId":107,"label":"回访备注","read":false,"required":true,"vModel":"returnRemark","write":false}],"optionalMultiUser":"orSign","title":"现场维修"},"type":"approver"},"conditionNodes":null,"content":"下次维修","nodeId":"REfsxNC","prevId":"zLKrxNC","properties":{"condition":"${repairState == \'repairing\'}","conditionLabel":"下次维修","conditions":[{"condition":"${repairState == \'repairing\'}","conditonLabel":"下次维修"}],"initiator":null,"isDefault":false,"priority":1,"title":"需要二次上门"},"type":"condition"}],"content":"自定义","nodeId":"zLKrxNC","outerNodeId":null,"prevId":"VKVFeNC","properties":{"approverRoles":[],"approvers":[],"assigneeType":"input","expression":"${repairAssignee}","formOperates":[{"formId":103,"label":"维修人员","read":true,"required":true,"vModel":"repairUser","write":false},{"formId":106,"label":"维修人员显示名","read":true,"required":true,"vModel":"repairUserName","write":false},{"formId":105,"label":"维修状态","read":true,"required":true,"vModel":"repairState","write":true},{"formId":102,"label":"维修材料费","read":true,"required":true,"vModel":"repairMaterialsFee","write":true},{"formId":102,"label":"维修服务费","read":true,"required":true,"vModel":"repairServiceFee","write":true},{"formId":104,"label":"维修备注","read":true,"required":true,"vModel":"repairContent","write":true},{"formId":108,"label":"回访结果","read":false,"required":true,"vModel":"returnResult","write":false},{"formId":107,"label":"回访备注","read":false,"required":true,"vModel":"returnRemark","write":false}],"optionalMultiUser":"orSign","title":"现场确认"},"type":"approver"},"conditionNodes":null,"content":"财务人员,肇新物业","nodeId":"VKVFeNC","outerNodeId":null,"prevId":"pDVFeNC","properties":{"approverRoles":[],"approvers":[{"children":null,"hasChildren":null,"icon":"icon-ym icon-ym-tree-user2","id":"finance","name":"财务人员","parentId":"dept106","type":"user"},{"children":null,"hasChildren":null,"icon":"icon-ym icon-ym-tree-user2","id":"admin","name":"肇新物业","parentId":"dept100","type":"user"}],"assigneeType":"user","expression":"","formOperates":[{"formId":103,"label":"维修人员","read":true,"required":true,"vModel":"repairUser","write":true},{"formId":106,"label":"维修人员显示名","read":false,"required":true,"vModel":"repairUserName","write":false},{"formId":105,"label":"维修状态","read":false,"required":true,"vModel":"repairState","write":false},{"formId":102,"label":"维修材料费","read":false,"required":true,"vModel":"repairMaterialsFee","write":false},{"formId":102,"label":"维修服务费","read":false,"required":true,"vModel":"repairServiceFee","write":false},{"formId":104,"label":"维修备注","read":false,"required":true,"vModel":"repairContent","write":false},{"formId":108,"label":"回访结果","read":false,"required":true,"vModel":"returnResult","write":false},{"formId":107,"label":"回访备注","read":false,"required":true,"vModel":"returnRemark","write":false}],"optionalMultiUser":"counterSign","title":"工单分配"},"type":"approver"},"conditionNodes":null,"content":"所有人","nodeId":"pDVFeNC","prevId":null,"properties":{"formOperates":[{"formId":103,"label":"维修人员","read":true,"required":true,"vModel":"repairUser","write":false},{"formId":106,"label":"维修人员显示名","read":true,"required":true,"vModel":"repairUserName","write":false},{"formId":105,"label":"维修状态","read":true,"required":true,"vModel":"repairState","write":false},{"formId":102,"label":"维修材料费","read":true,"required":true,"vModel":"repairMaterialsFee","write":false},{"formId":102,"label":"维修服务费","read":true,"required":true,"vModel":"repairServiceFee","write":false},{"formId":104,"label":"维修备注","read":true,"required":true,"vModel":"repairContent","write":false},{"formId":108,"label":"回访结果","read":true,"required":true,"vModel":"returnResult","write":false},{"formId":107,"label":"回访备注","read":true,"required":true,"vModel":"returnRemark","write":false}],"initiator":"all","title":"发起人"},"type":"start"}}'
    //   )
    // );
    this.initProcess();

    // this.mockData = JSON.parse(
    //   '{"basicSetting":{"flowCode":"repair","flowGroup":0,"flowIcon":"el-icon-lollipop","flowIconBackground":"#FF8ACC","flowName":"报修工单","flowRemark":null,"id":"1477061296355643394"},"formData":{"formRef":"elForm","gutter":15,"size":"medium","formRules":"rules","labelPosition":"right","formBtns":true,"labelWidth":100,"disabled":false,"formModel":"formData","fields":[{"formId":103,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"维修人员","prefix-icon":"","required":true,"renderKey":1645255796782,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入维修人员","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"repairUser"},{"formId":106,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"维修人员显示名","prefix-icon":"","required":true,"renderKey":1645256716446,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入维修人员显示名","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"repairUserName"},{"formId":105,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"维修状态","prefix-icon":"","required":true,"renderKey":1645256714995,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入维修状态","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"repairState"},{"formId":102,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"维修材料费","prefix-icon":"","required":true,"renderKey":1645079473571,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入维修材料费","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"repairMaterialsFee"},{"formId":102,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"维修服务费","prefix-icon":"","required":true,"renderKey":1645255785065,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入单行文本维修服务费","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"repairServiceFee"},{"formId":104,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"维修备注","prefix-icon":"","required":true,"renderKey":1645256713803,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入维修备注","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"repairContent"},{"formId":108,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"回访结果","prefix-icon":"","required":true,"renderKey":1645256899513,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入回访结果","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"returnResult"},{"formId":107,"clearable":true,"maxlength":null,"document":"https://element.eleme.cn/#/zh-CN/component/input","prepend":"","labelWidth":null,"label":"回访备注","prefix-icon":"","required":true,"renderKey":1645256897514,"layout":"colFormItem","tagIcon":"input","readonly":false,"changeTag":true,"style":{"width":"100%"},"disabled":false,"tag":"el-input","placeholder":"请输入回访备注","show-word-limit":false,"suffix-icon":"","regList":[],"append":"","span":23,"vModel":"returnRemark"}],"span":23},"processData":{"childNode":{"childNode":{"childNode":{"childNode":null,"conditionNodes":null,"content":"工单负责人","nodeId":"rWiszNC","outerNodeId":null,"prevId":"zLKrxNC","properties":{"approverRoles":[{"children":null,"hasChildren":null,"icon":"icon-ym icon-ym-tree-user2","id":"workflowManager","name":"工单负责人","parentId":"-1","type":"role"}],"approvers":[],"assigneeType":"role","expression":"","formOperates":[{"formId":103,"label":"维修人员","read":true,"required":true,"vModel":"repairUser","write":false},{"formId":106,"label":"维修人员显示名","read":true,"required":true,"vModel":"repairUserName","write":false},{"formId":105,"label":"维修状态","read":true,"required":true,"vModel":"repairState","write":false},{"formId":102,"label":"维修材料费","read":true,"required":true,"vModel":"repairMaterialsFee","write":false},{"formId":102,"label":"维修服务费","read":true,"required":true,"vModel":"repairServiceFee","write":false},{"formId":104,"label":"维修备注","read":true,"required":true,"vModel":"repairContent","write":false},{"formId":108,"label":"回访结果","read":true,"required":true,"vModel":"returnResult","write":true},{"formId":107,"label":"回访备注","read":true,"required":true,"vModel":"returnRemark","write":true}],"optionalMultiUser":"orSign","title":"结果确认"},"type":"approver"},"conditionNodes":[{"childNode":null,"conditionNodes":null,"content":"维修完成","nodeId":"cQfsxNC","prevId":"zLKrxNC","properties":{"condition":"${repairState == \'repaired\'}","conditionLabel":"维修完成","conditions":[{"condition":"${repairState == \'repaired\'}","conditonLabel":"维修完成"}],"initiator":null,"isDefault":false,"priority":0,"title":"现场直接修理"},"type":"condition"},{"childNode":{"childNode":null,"conditionNodes":null,"content":"自定义","nodeId":"OexyxNC","outerNodeId":null,"prevId":"REfsxNC","properties":{"approverRoles":[],"approvers":[],"assigneeType":"input","expression":"${repairAssignee}","formOperates":[{"formId":103,"label":"维修人员","read":true,"required":true,"vModel":"repairUser","write":false},{"formId":106,"label":"维修人员显示名","read":true,"required":true,"vModel":"repairUserName","write":false},{"formId":105,"label":"维修状态","read":true,"required":true,"vModel":"repairState","write":false},{"formId":102,"label":"维修材料费","read":true,"required":true,"vModel":"repairMaterialsFee","write":true},{"formId":102,"label":"维修服务费","read":true,"required":true,"vModel":"repairServiceFee","write":true},{"formId":104,"label":"维修备注","read":true,"required":true,"vModel":"repairContent","write":true},{"formId":108,"label":"回访结果","read":false,"required":true,"vModel":"returnResult","write":false},{"formId":107,"label":"回访备注","read":false,"required":true,"vModel":"returnRemark","write":false}],"optionalMultiUser":"orSign","title":"现场维修"},"type":"approver"},"conditionNodes":null,"content":"下次维修","nodeId":"REfsxNC","prevId":"zLKrxNC","properties":{"condition":"${repairState == \'repairing\'}","conditionLabel":"下次维修","conditions":[{"condition":"${repairState == \'repairing\'}","conditonLabel":"下次维修"}],"initiator":null,"isDefault":false,"priority":1,"title":"需要二次上门"},"type":"condition"}],"content":"自定义","nodeId":"zLKrxNC","outerNodeId":null,"prevId":"VKVFeNC","properties":{"approverRoles":[],"approvers":[],"assigneeType":"input","expression":"${repairAssignee}","formOperates":[{"formId":103,"label":"维修人员","read":true,"required":true,"vModel":"repairUser","write":false},{"formId":106,"label":"维修人员显示名","read":true,"required":true,"vModel":"repairUserName","write":false},{"formId":105,"label":"维修状态","read":true,"required":true,"vModel":"repairState","write":true},{"formId":102,"label":"维修材料费","read":true,"required":true,"vModel":"repairMaterialsFee","write":true},{"formId":102,"label":"维修服务费","read":true,"required":true,"vModel":"repairServiceFee","write":true},{"formId":104,"label":"维修备注","read":true,"required":true,"vModel":"repairContent","write":true},{"formId":108,"label":"回访结果","read":false,"required":true,"vModel":"returnResult","write":false},{"formId":107,"label":"回访备注","read":false,"required":true,"vModel":"returnRemark","write":false}],"optionalMultiUser":"orSign","title":"现场确认"},"type":"approver"},"conditionNodes":null,"content":"财务人员,肇新物业","nodeId":"VKVFeNC","outerNodeId":null,"prevId":"pDVFeNC","properties":{"approverRoles":[],"approvers":[{"children":null,"hasChildren":null,"icon":"icon-ym icon-ym-tree-user2","id":"finance","name":"财务人员","parentId":"dept106","type":"user"},{"children":null,"hasChildren":null,"icon":"icon-ym icon-ym-tree-user2","id":"admin","name":"肇新物业","parentId":"dept100","type":"user"}],"assigneeType":"user","expression":"","formOperates":[{"formId":103,"label":"维修人员","read":true,"required":true,"vModel":"repairUser","write":true},{"formId":106,"label":"维修人员显示名","read":false,"required":true,"vModel":"repairUserName","write":false},{"formId":105,"label":"维修状态","read":false,"required":true,"vModel":"repairState","write":false},{"formId":102,"label":"维修材料费","read":false,"required":true,"vModel":"repairMaterialsFee","write":false},{"formId":102,"label":"维修服务费","read":false,"required":true,"vModel":"repairServiceFee","write":false},{"formId":104,"label":"维修备注","read":false,"required":true,"vModel":"repairContent","write":false},{"formId":108,"label":"回访结果","read":false,"required":true,"vModel":"returnResult","write":false},{"formId":107,"label":"回访备注","read":false,"required":true,"vModel":"returnRemark","write":false}],"optionalMultiUser":"counterSign","title":"工单分配"},"type":"approver"},"conditionNodes":null,"content":"所有人","nodeId":"pDVFeNC","prevId":null,"properties":{"formOperates":[{"formId":103,"label":"维修人员","read":true,"required":true,"vModel":"repairUser","write":false},{"formId":106,"label":"维修人员显示名","read":true,"required":true,"vModel":"repairUserName","write":false},{"formId":105,"label":"维修状态","read":true,"required":true,"vModel":"repairState","write":false},{"formId":102,"label":"维修材料费","read":true,"required":true,"vModel":"repairMaterialsFee","write":false},{"formId":102,"label":"维修服务费","read":true,"required":true,"vModel":"repairServiceFee","write":false},{"formId":104,"label":"维修备注","read":true,"required":true,"vModel":"repairContent","write":false},{"formId":108,"label":"回访结果","read":true,"required":true,"vModel":"returnResult","write":false},{"formId":107,"label":"回访备注","read":true,"required":true,"vModel":"returnRemark","write":false}],"initiator":"all","title":"发起人"},"type":"start"}}'
    // );
    // console.log(this.mockData);
  },
  destroyed() {
    this.processDone = false;
  },
  methods: {
    initProcess: function() {
      let that = this;
      // console.log(that.$route.query);

      that.processDone = false;
      that.$toast.loading({
        message: "解析并渲染",
        forbidClick: true,
        loadingType: "spinner",
      });

      // 编辑
      if (that.$route.query.processId) {
        // if (that.$route.query.formId) {
        const coreLogic = function(that, res) {
          that.processData = JSON.parse(res.data.data.stringJson);
          that.originData = { ...res.data.data };
          // console.log(`originData`, that.originData["json"]);
          // console.log(`processData`, that.processData);
          that.$store.commit(
            "designer/updateFormItemList",
            that.processData.processData.properties.formOperates
          );
          // that.$store.commit('designer/updateFormItemList', that.processData.formData);
          setTimeout(function() {
            that.processDone = true;
            that.$toast.success({
              message: "渲染完成",
              duration: 888,
            });
          }, 1288);
        };

        api.workflowDesigner(that.$route.query.processId).then((res) => {
          if (res.data.status === 200) {
            // 因为第一次经常拿不到值
            /*if(res.data.data.json === undefined) {
                                api.workflowDesigner(that.$route.query.processId).then((res) => {
                                    if (res.data.status === 200) {
                                        // console.log(res.data.data);
                                        coreLogic(that, res);
                                    }
                                });
                            } else coreLogic(that, res);*/

            coreLogic(that, res);
          }
        });
      }
      // 新增
      else {
        api.formInfo(this.$route.query.formId).then((res) => {
          if (res.data.status === 200) {
            that.originFormData = { ...res.data.data };
            that.processData = {
              basicSetting: {},
              formData: [],
              processData: {},
            };
            let tmpFormData = JSON.parse(res.data.data.keyInfo);
            // let tmpFormData = JSON.parse(
            //   '[{"attr_name":"嘎","type":"text","attr_size":14,"attr_label_weight":"normal","attr_label_align":"left","id":"module_1661848806361","label_width":150,"belongTo":"formBox"},{"attr_name":"开关","attr_boolean_value":true,"type":"switch","id":"module_1627529664697","label_width":100,"belongTo":"formBox"},{"attr_name":"单选框组","attr_data_list":[{"id":1,"name":"选项1"},{"id":2,"name":"选项2"}],"data_index":0,"data_value":"选项1","type":"radio","attr_layer":"inline-block","id":"module_1627529685723","label_width":100,"belongTo":"formBox"},{"attr_name":"多选框组","attr_data_check_list":[{"id":1,"name":"选项1","check":true},{"id":2,"name":"选项2","check":true}],"data_value":["选项1","选项2"],"type":"check","attr_layer":"inline-block","id":"module_1627529687170","label_width":100,"belongTo":"formBox"},{"attr_name":"子表单","type":"childForm","id":"module_1627529696921","label_width":100,"belongTo":"formBox","arr":[{"attr_name":"列1","attr_value":"","attr_placeholder":"请输入","type":"input","id":"module_1627529699840","label_width":100,"belongTo":"formItem"},{"attr_name":"列2","attr_value":"","attr_placeholder":"请输入","type":"input","id":"module_1627529705320","label_width":100,"belongTo":"formItem"},{"attr_name":"列3","attr_value":"","attr_placeholder":"请输入","type":"input","id":"module_1627529707983","label_width":100,"belongTo":"formItem"},{"attr_name":"手写签名","data_url":"","type":"handWrite","id":"module_1650351979722","label_width":150,"belongTo":"formItem"},{"attr_name":"手写签名","data_url":"","type":"handWrite","id":"module_1650425810267","label_width":150,"belongTo":"formItem"}],"dataList":[]},{"attr_name":"手写签名","data_url":"","type":"handWrite","id":"module_1649668387079","label_width":150,"belongTo":"formBox"}]'
            // );
            console.log(`tmpFormData`, tmpFormData);
            tmpFormData.map((v) => {
              that.processData.formData.push({
                formId: that.$route.query.formId,
                label: v.attr_name,
                read: true,
                required: true,
                vModel: v.id,
                write: false,
              });
            });
            that.$store.commit(
              "designer/updateFormItemList",
              that.processData.formData
            );

            setTimeout(function() {
              that.processDone = true;
              that.$toast.success({
                message: "渲染完成",
                duration: 888,
              });
            }, 1288);
          }
        });
      }
    },
    // 更新
    save: function() {
      let that = this;
      that.btnLoadingSave = true;

      let processDesign = that.$refs["processDesign"].getData();
      Promise.all([processDesign])
        .then((res) => {
          // console.log(res);

          let params = {
            basicSetting: {
              flowCode: that.$route.query.formId,
              flowGroup: 0,
              flowIcon: "el-icon-lollipop",
              flowIconBackground: "#FF8ACC",
              flowName: that.$route.query.formName,
              id: that.$route.query.processId,
            },
            formData: {
              disabled: false,
              fields: [],
              formBtns: true,
              formModel: "formData",
              formRef: "elForm",
              formRules: "rules",
              gutter: 15,
              labelPosition: "right",
              labelWidth: 100,
              size: "medium",
              span: 23,
            },
            processData: { ...res[0].processData },
          };

          api.workflowDesignerCreateOrUpdate(params).then((res) => {
            if (res.data.status === 200) {
              api
                .formEdit({
                  ...that.originFormData,
                  activitiId: that.$route.query.processId
                    ? that.$route.query.processId
                    : res.data.data,
                })
                .then((res) => {
                  if (res.data.status === 200) {
                    that.$message.success("操作成功");
                    that.$router.push({ path: listRoutePath });
                  } else that.btnLoadingSave = false;
                });
            } else that.btnLoadingSave = false;
          });
        })
        .catch((err) => {
          that.$message.warning("请完善流程图");
          that.btnLoadingSave = false;
        });
    },
    cancel: function() {
      let that = this;

      that
        .$confirm("是否返回列表", "确认信息", {
          distinguishCancelAndClose: true,
          confirmButtonText: "返回列表",
          cancelButtonText: "取消",
        })
        .then(() => {
          that.$router.push({
            path: listRoutePath,
            query: { folderTitle: that.$route.query.folderTitle },
          });
        })
        .catch();
    },
  },
};
</script>

<style lang="scss" scoped>
._root_page {
  /*padding: 15px;*/

  .process {
    ::v-deep {
      .btn,
      .el-button {
        width: max-content;
      }
    }
  }
}
</style>
