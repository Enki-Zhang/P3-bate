<template>
    <div style="margin-top: 16px">
        <el-form-item label="处理用户">
            <el-select v-model="userTaskForm.assignee" @change="updateElementTask('assignee')">
                <el-option v-for="(v, k) in seloptsUser" :key="`ass-${k}`" :label="v.name" :value="v.id"/>
            </el-select>
        </el-form-item>
        <el-form-item label="候选用户">
            <el-select v-model="userTaskForm.candidateUsers"
                       @change="updateElementTask('candidateUsers')"
                       multiple collapse-tags>
                <el-option v-for="(v, k) in seloptsUser" :key="`user-${k}`" :label="v.name" :value="v.id"/>
            </el-select>
        </el-form-item>
        <el-form-item label="候选分组">
            <el-select v-model="userTaskForm.candidateGroups"
                       @change="updateElementTask('candidateGroups')"
                       multiple>
                <el-option v-for="(v, k) in seloptsUserGroup" :key="`group-${k}`" :label="v.role" :value="v.id"/>
            </el-select>
            <!--  collapse-tags -->
        </el-form-item>
        <el-form-item label="到期时间">
            <el-input v-model="userTaskForm.dueDate" clearable @change="updateElementTask('dueDate')"/>
        </el-form-item>
        <el-form-item label="跟踪时间">
            <el-input v-model="userTaskForm.followUpDate" clearable @change="updateElementTask('followUpDate')"/>
        </el-form-item>
        <el-form-item label="优先级">
            <el-input v-model="userTaskForm.priority" clearable @change="updateElementTask('priority')"/>
        </el-form-item>
    </div>
</template>

<script>

    import api from "@api";

    export default {
        name: "UserTask",
        props: {
            id: String,
            type: String
        },
        data() {
            return {
                defaultTaskForm: {
                    assignee: "",
                    candidateUsers: [],
                    candidateGroups: [],
                    dueDate: "",
                    followUpDate: "",
                    priority: ""
                },
                userTaskForm: {},
                mockData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

                mockCL: [
                    {uid: 1, name: '张三'},
                    {uid: 2, name: '李四'},
                    {uid: 3, name: '王五'},
                ],
                mockHX: [
                    {uid: 1, name: '赵六'},
                    {uid: 2, name: '刘七'},
                    {uid: 3, name: '苏八'},
                ],

                seloptsUser: [],
                seloptsUserGroup: [],
            };
        },
        created() {
            this.initSeloptsUser();
            this.initSeloptsUserGroup();
        },
        beforeDestroy() {
            this.bpmnElement = null;
        },
        watch: {
            id: {
                immediate: true,
                handler() {
                    this.bpmnElement = window.bpmnInstances.bpmnElement;
                    this.$nextTick(() => this.resetTaskForm());
                }
            }
        },
        methods: {
            resetTaskForm() {
                for (let key in this.defaultTaskForm) {
                    let value;
                    if (key === "candidateUsers" || key === "candidateGroups") {
                        value = this.bpmnElement?.businessObject[key] ? this.bpmnElement.businessObject[key].split(",") : [];
                    } else {
                        value = this.bpmnElement?.businessObject[key] || this.defaultTaskForm[key];
                    }
                    this.$set(this.userTaskForm, key, value);
                }
            },
            updateElementTask(key) {
                let taskAttr = Object.create(null);
                if (key === "candidateUsers" || key === "candidateGroups") {
                    taskAttr[key] = this.userTaskForm[key] && this.userTaskForm[key].length ? this.userTaskForm[key].join() : null;
                } else {
                    taskAttr[key] = this.userTaskForm[key] || null;
                }
                window.bpmnInstances.modeling.updateProperties(this.bpmnElement, taskAttr);
            },


            initSeloptsUser: function() {
                let that = this;

                api.sysUserInfoSelect().then((res) => {
                    if(res.data.status === 200) {
                        that.seloptsUser = [...res.data.data];
                    }
                });
            },
            initSeloptsUserGroup: function() {
                let that = this;

                api.sysRoleSelect().then((res) => {
                    if(res.data.status === 200) {
                        that.seloptsUserGroup = [...res.data.data];
                    }
                });
            },
        }
    };
</script>
