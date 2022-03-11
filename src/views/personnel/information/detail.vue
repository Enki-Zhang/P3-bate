<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white-default-h">
                <el-row type="flex" justify="space-between">
                    <el-row style="font-size: 16px; font-weight: 600;">详情</el-row>
                    <el-row>
                        <el-button type="primary" icon="el-icon-edit" size="small" @click="navEdit">编辑</el-button>
                    </el-row>
                </el-row>
                <el-row class="_table mg-t-15 pd-lr-15">
                    <el-row class="name">{{ detail.name }}</el-row>
                    <el-row type="flex">
                        <el-row type="flex">
                            <el-row class="_title">性别</el-row>
                            <el-row class="_val">{{ detail.sex ? '男' : '女' }}</el-row>
                        </el-row>
                        <el-row type="flex" class="br">
                            <el-row class="_title">身份证号</el-row>
                            <el-row class="_val">{{ detail.idNumber }}</el-row>
                        </el-row>
                    </el-row>
                    <el-row type="flex">
                        <el-row type="flex">
                            <el-row class="_title">出生日期</el-row>
                            <el-row class="_val">{{ detail.birthday }}</el-row>
                        </el-row>
                        <el-row type="flex" class="br">
                            <el-row class="_title">手机号码</el-row>
                            <el-row class="_val">{{ detail.phoneNumber }}</el-row>
                        </el-row>
                    </el-row>
                    <el-row type="flex">
                        <el-row type="flex">
                            <el-row class="_title">婚姻状态</el-row>
                            <el-row class="_val">{{ detail.maritalStatus }}</el-row>
                        </el-row>
                        <el-row type="flex" class="br">
                            <el-row class="_title">家庭住址</el-row>
                            <el-row class="_val">{{ detail.homeAddress }}</el-row>
                        </el-row>
                    </el-row>
                    <el-row type="flex">
                        <el-row type="flex">
                            <el-row class="_title">邮箱</el-row>
                            <el-row class="_val">{{ detail.email }}</el-row>
                        </el-row>
                        <el-row type="flex" class="br">
                            <el-row class="_title">最高学历</el-row>
                            <el-row class="_val">{{ detail.highestEducation }}</el-row>
                        </el-row>
                    </el-row>
                    <el-row type="flex">
                        <el-row type="flex">
                            <el-row class="_title" style="padding-top: 8px; line-height: unset;">
                                <el-row>家庭紧急</el-row>
                                <el-row>联系电话</el-row>
                            </el-row>
                            <el-row class="_val">{{ detail.familyEmergencyContactNumber }}</el-row>
                        </el-row>
                        <el-row type="flex" class="br">
                            <el-row class="_title">毕业专业</el-row>
                            <el-row class="_val">{{ detail.graduationMajor }}</el-row>
                        </el-row>
                    </el-row>
                    <el-row type="flex">
                        <el-row type="flex">
                            <el-row class="_title">毕业院校</el-row>
                            <el-row class="_val">{{ detail.graduateInstitutions }}</el-row>
                        </el-row>
                        <el-row type="flex" class="br">
                            <el-row class="_title">入职时间</el-row>
                            <el-row class="_val">{{ detail.entryTime }}</el-row>
                        </el-row>
                    </el-row>
                    <el-row type="flex">
                        <el-row type="flex">
                            <el-row class="_title">职称</el-row>
                            <el-row class="_val">{{ detail.title }}</el-row>
                        </el-row>
                        <el-row type="flex" class="br bb">
                            <el-row class="_title">一卡通号</el-row>
                            <el-row class="_val">{{ detail.allInOneCardNumber }}</el-row>
                        </el-row>
                    </el-row>
                    <el-row type="flex">
                        <el-row type="flex" class="br bb">
                            <el-row class="_title">工资卡号</el-row>
                            <el-row class="_val">{{ detail.salaryCardNo }}</el-row>
                        </el-row>
                        <!--<el-row type="flex" class="br">
                            <el-row class="_title">身份证号</el-row>
                            <el-row class="_val">{{ detail. }}</el-row>
                        </el-row>-->
                    </el-row>
                    <!-- 部门信息 -->
                    <template>
                        <el-row class="_hr"></el-row>
                        <el-row type="flex">
                            <el-row type="flex">
                                <el-row class="_title">员工类别</el-row>
                                <el-row class="_val">{{ detail.employeeCategory }}</el-row>
                            </el-row>
                            <el-row type="flex" class="br">
                                <el-row class="_title">职位</el-row>
                                <el-row class="_val">{{ detail.position }}</el-row>
                            </el-row>
                        </el-row>
                        <el-row type="flex">
                            <el-row type="flex">
                                <el-row class="_title">工资级别</el-row>
                                <el-row class="_val">{{ detail.wageScale }}</el-row>
                            </el-row>
                            <el-row type="flex" class="br bb">
                                <el-row class="_title">定级时间</el-row>
                                <el-row class="_val">{{ detail.gradingTime ? dayjs(detail.gradingTime).format('YYYY-MM-DD') : '' }}</el-row>
                            </el-row>
                        </el-row>
                        <el-row type="flex" class="mg-b-50">
                            <el-row type="flex" class="br bb">
                                <el-row class="_title">社保医保</el-row>
                                <el-row class="_val">{{ detail.socialSecurityAndMedicalInsurance }}</el-row>
                            </el-row>
                            <!--<el-row type="flex" class="br">
                                <el-row class="_title">身份证号</el-row>
                                <el-row class="_val">{{ detail. }}</el-row>
                            </el-row>-->
                        </el-row>
                    </template>
                </el-row>
            </el-row>
        </el-row>

        <!-- 组件 -->
    </el-row>

</template>

<script>

    import dayjs from 'dayjs';
    import api from '@api';
    const listRouteName = 'personnel_organization';

    export default {
        name: "detail",
        data() {
            return {
                dayjs,

                detail: {},
            }
        },
        created() {
            this.$store.commit('setPageTitle', `人员档案详情`);

            if(this.$route.query.id) this.getDetail(this.$route.query.id);
        },
        computed: {
            // ...mapState(['userInfo', 'screenHeight']),
        },
        methods: {
            getDetail: function(id) {
                let that = this;

                api.sysUserInfoFind(id).then((res) => {
                    // console.log(res.data);

                    if(res.data.status === 200) {
                        that.detail = {...res.data.data};
                    }
                });
            },
            navEdit: function() {
                let that = this;

                that.$router.push({
                    path: `/personnel/information/edit`,
                    query: {
                        id: that.detail.id,
                    }
                });
            },
        }
    }

</script>

<style lang="scss" scoped>

    ._root_page {

        ._table {
            .name {
                margin-bottom: 15px;
                font-size: 18px;
                font-weight: 600;
            }
            ._title {
                background-color: #FAFDFF;
                width: 120px;
                height: 56px;
                text-align: center;
            }
            ._val {
                width: 360px;
                height: 56px;
                padding: 0 15px;
            }
            ._title, ._val {
                line-height: 56px;
                border-top: 1px solid #F0F0F0;
                border-left: 1px solid #F0F0F0;
            }

            .bt {border-top: 1px solid #F0F0F0;}
            .br {border-right: 1px solid #F0F0F0;}
            .bb {border-bottom: 1px solid #F0F0F0;}
            .bl {border-left: 1px solid #F0F0F0;}

            ._hr {
                width: 100%;
                margin: 30px 0;
                border-top: 1px solid #F0F0F0;
            }

            .mg-b-60 {margin-bottom: 60px;}
        }

    }

</style>