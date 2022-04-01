<template>
    <div>
        <el-table 
            ref="multipleTable" 
            :data="dataList" 
            tooltip-effect="dark"
            :min-height="460" 
            size="small"
            highlight-current-row 
            border>
            <!-- <el-table-column v-if = "dataColumn.length > 0" label="表单序号" fixed="left" show-overflow-tooltip width="80">
                <template slot-scope="scope">{{ scope.row.formId }}</template>
            </el-table-column> -->
            <el-table-column v-if = "dataColumn.length == 0" label="未绑定表单" show-overflow-tooltip>
            </el-table-column>
            <el-table-column :width="v.type == 'CHILD_FORM' ? '800' : ''" v-for = "v,index in dataColumn" :key = "index" :label="v.showName" show-overflow-tooltip >
                <template slot-scope="scope">
                    <div v-if = "v.type == 'DATE_RANGE' || v.type == 'TIME_RANGE'">
                        <span v-if = "scope.row[v.key]">{{scope.row[v.key][0]}} ~ {{scope.row[v.key][1]}}</span>
                    </div>
                    <div v-else-if = "v.type == 'UPLOAD'">
                        <el-link @click = "downloadFn(scope.row[v.key])" style = "font-size:12px;" type="primary">{{scope.row[v.key]}}</el-link>
                    </div>
                    <div v-else-if = "v.type == 'CHILD_FORM'" class = "childFormBox">
                        <div class = "c_row" v-for = "obj,objIndex in scope.row[v.key]" :key = "objIndex">
                            <span class = "c_col" v-for = "obj2,objIndex2 in obj" :key = "objIndex2">
                                <span>{{obj2.label}}</span> :
                                <span v-if = "obj2.type == 'dateRange' || obj2.type == 'timeRange'">
                                    <span v-if = "obj2.value">{{obj2.value[0]}} ~ {{obj2.value[1]}}</span>
                                </span>
                                <span v-else-if = "obj2.type == 'upload'">
                                    <el-link @click = "downloadFn(obj2.value)" style = "font-size:12px;" type="primary">{{obj2.value}}</el-link>
                                </span>
                                <span v-else>{{obj2.value != null && typeof obj2.value == 'object' ? obj2.value.join('、') : obj2.value}}
                                </span> 
                            </span>
                        </div>
                    </div>
                    <div v-else>
                        {{scope.row[v.key] != null && typeof scope.row[v.key] == 'object' ? scope.row[v.key].join('、') : scope.row[v.key]}}
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

    export default {
        name: "imgPreview",
        props: {
            dataList: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            dataColumn:{
                type:Array,
                default: function () {
                    return [];
                }
            }
        },
        data() {
            return {
            }
        },
        mounted() {
            
        },
        watch: {
            
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
        },
    }

</script>

<style lang="scss" scoped>
.childFormBox{
    .c_row{
        .c_col{
            margin-right:10px;
        }
    }
}
 
</style>