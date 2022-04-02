let componentAttrName = {
    'attr_name':'标题',
    'attr_value':'默认值',
    'attr_boolean_value':'默认值',
    'attr_time_value':'默认值',
    'attr_date_value':'默认值',
    'attr_data_source':'数据来源',
    'attr_data_bind':'数据绑定',
    'attr_time_range_value':'默认值',
    'attr_date_range_value':'默认值',
    'attr_data_link_value':'默认值',
    'attr_data_link_list':'数据列表',
    'attr_width':'宽度',
    'attr_input_width':'输入框宽度',
    'attr_input_align':'输入框水平对齐',
    'attr_min':'最小值',
    'attr_max':'最大值',
    'attr_data_list':'数据列表',
    'attr_data_check_list':'数据列表',
    'attr_size':'文字大小',
    'attr_placeholder':'占位符',
    'attr_layer':'布局',
    'attr_url':'上传链接',
    'attr_label_align':'文字位置',
    'attr_label_weight':'文字粗细'
}

let componentInput = [
    { 
        attr_name: '文本',
        //attr_value:'',
        type:'text',
        attr_size:14,
        attr_label_weight:'normal',
        attr_label_align:'left'
    },
    { 
        attr_name: '单行输入框',
        attr_value:'',
        attr_placeholder:'请输入',
        type:'input'
    },
    { 
        attr_name: '多行输入框',
        attr_value:'',
        attr_placeholder:'请输入',
        type:'textarea'
    },
    { 
        attr_name: '计数器',
        attr_value:1,
        attr_min:0,
        attr_max:100,
        attr_input_width:150,
        attr_placeholder:'请输入',
        type:'inputNumber'
    },
    // { 
    //     attr_name: '单行输入框',
    //     attr_value:'',
    //     attr_placeholder:'请输入',
    //     type:'input'
    // },
    //{ id: 99, attr_name: '按钮',type:'button',belongTo:'componentBox'},
]

let componentSelect = [
    { 
        attr_name: '下拉选择',
        attr_input_width:150,
        attr_data_source:'default',
        attr_data_list:[
            {id:1,name:'选项1'},
            {id:2,name:'选项2'}
        ],
        attr_data_bind:'',
        bind_list:[],
        attr_placeholder:'请选择',
        data_index:0,
        data_value:'',
        type:'select'
    },
    { 
        attr_name: '级联选择',
        attr_input_width:250,
        attr_data_link_list:[
          {
              value: '1',
              label: '选项1'
          }
        ],
        attr_data_link_value:[],
        attr_placeholder:'请选择',
        type:'linkSelect'
    },
    { 
        attr_name: '单选框组',
        attr_data_list:[
            {id:1,name:'选项1'},
            {id:2,name:'选项2'}
        ],
        otherValue:'',
        data_index:0,
        data_value:'选项1',
        type:'radio',
        attr_layer:'inline-block' //1-水平 2-垂直
    },
    { 
        attr_name: '多选框组',
        attr_data_check_list:[
            {id:1,name:'选项1',check:false},
            {id:2,name:'选项2',check:false}
        ],
        otherValue:'',
        data_value:[],
        type:'check',
        attr_layer:'inline-block' //1-水平 2-垂直
    },
    { 
        attr_name: '开关',
        attr_boolean_value:true,
        type:'switch'
    },
    { 
        attr_name: '时间选择',
        attr_time_value:'',
        attr_input_width:150,
        type:'time'
    },
    { 
        attr_name: '时间范围',
        attr_time_range_value:['',''],
        attr_input_width:360,
        type:'timeRange'
    },
    { 
        attr_name: '日期选择',
        attr_date_value:'',
        attr_input_width:150,
        type:'date'
    },
    { 
        attr_name: '日期范围',
        attr_date_range_value:'',
        attr_input_width:360,
        type:'dateRange'
    },
    { 
        attr_name: '上传',
        type:'upload',
        attr_url:'',
        data_url:''
    }
]

let componentLayer = [
    { 
        attr_name: '子表单',
        type:'childForm'
    }
]

componentInput.forEach(function(e,index){
    e.id = 'componentInput_' + (index + 1);
    e.label_width = 150;
    e.belongTo = 'componentBox';
});

componentSelect.forEach(function(e,index){
    e.id = 'componentSelect_' + (index + 1);
    e.label_width = 150;
    e.belongTo = 'componentBox';
});

componentLayer.forEach(function(e,index){
    e.id = 'componentLayer_' + (index + 1);
    e.label_width = 150;
    e.belongTo = 'componentBox';
});

const componentObj = {
    attr:componentAttrName,
    inputList:componentInput,
    selectList:componentSelect,
    layerList:componentLayer
}

export default componentObj