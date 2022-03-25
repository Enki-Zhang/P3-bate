<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white-default-h">
                <el-row style="margin-bottom: 40px; font-size: 16px; font-weight: 600;">编辑人员档案</el-row>
                <el-row class="fm fm-max-w">
                    <el-form ref="fm" :model="form" label-position="right" size="small" label-width="140px">
                        <template v-if="isMySelf">
                            <el-row>
                                <el-form-item prop="name" label="姓名"
                                              :rules="[
                                                  {required: true, message: '请填写姓名'},
                                                  {type: 'string', min: 1, message: '请填写姓名'},
                                                  {validator: validateAllSpace, message: '请填写姓名'}
                                              ]">
                                    <el-input v-model="form.name" placeholder="用户姓名" :readonly="!isMySelf" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="sex" label="性别"
                                                  :rules="[
                                                  {required: true, message: '请选择性别'},
                                                  {type: 'number', min: 0, max: 1, message: '请选择性别'},
                                              ]">
                                        <el-select v-model="form.sex" placeholder="请选择性别">
                                            <el-option label="男" :value="1"></el-option>
                                            <el-option label="女" :value="0"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="birthday" label="出生日期"
                                                  :rules="[
                                                  {required: true, message: '请选择日期'},
                                                  {type: 'string', len: 10, message: '请选择日期'},
                                              ]">
                                        <el-date-picker v-model="form.birthday"
                                                        placeholder="选择日期"
                                                        type="date"
                                                        format="yyyy-MM-dd"
                                                        value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="maritalStatus" label="婚姻状态"
                                                  :rules="[
                                                  {required: false, message: '请选择婚姻状态'},
                                              ]">
                                        <el-select v-model="form.maritalStatus" placeholder="请选择婚姻状态">
                                            <el-option label="未婚" value="未婚"></el-option>
                                            <el-option label="已婚" value="已婚"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="idNumber" label="身份证号"
                                                  :rules="[
                                                  {required: false, message: '请填写身份证号'},
                                                  {type: 'string', len: 18, message: '长度为 18 个字符'},
                                                  {validator: validateAllSpace, message: '请填写身份证号'}
                                              ]">
                                        <el-input v-model="form.idNumber" placeholder="身份证号" clearable></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="phoneNumber" label="手机号码"
                                                  :rules="[
                                                  {required: false, message: '请填写手机号码'},
                                                  {type: 'string', len: 11, message: '长度为 11 个字符'},
                                                  {validator: validatePhone, message: '请填写手机号码'}
                                              ]">
                                        <el-input v-model="form.phoneNumber" placeholder="手机号码" clearable></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="email" label="邮箱"
                                                  :rules="[
                                                  {required: false, message: '请填写邮箱'},
                                                  {type: 'email', min: 1, max: 50, message: '请填写正确的邮箱'},
                                              ]">
                                        <el-input v-model="form.email" placeholder="邮箱" clearable></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                            <el-row>
                                <el-form-item prop="homeAddress" label="家庭住址">
                                    <el-input v-model="form.homeAddress" type="textarea" placeholder="家庭住址"
                                              :autosize="{minRows: 2, maxRows: 2}" resize="none"
                                              style="width: 580px;" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="familyEmergencyContactNumber" label="家庭紧急联系电话"
                                                  :rules="[
                                              // {required: true, message: '请填写家庭紧急联系电话'},
                                              // {type: 'string', len: 11, message: '长度为 11 个字符'},
                                              // {validator: validatePhone, message: '请填写家庭紧急联系电话'}
                                          ]">
                                        <el-input v-model="form.familyEmergencyContactNumber" placeholder="家庭紧急联系电话" clearable></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="highestEducation" label="最高学历"
                                                  :rules="[
                                                  // {required: true, message: '请填写最高学历'},
                                                  // {type: 'string', min: 1,  message: '长度为 2 ~ 200 个字符'},
                                                  // {validator: validateAllSpace, message: '请填写最高学历'}
                                              ]">
                                        <el-input v-model="form.highestEducation" placeholder="最高学历" clearable></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="graduateInstitutions" label="毕业院校"
                                                  :rules="[
                                                  // {required: true, message: '请填写最高学历'},
                                                  // {type: 'string', min: 1,  message: '长度为 2 ~ 200 个字符'},
                                                  // {validator: validateAllSpace, message: '请填写最高学历'}
                                              ]">
                                        <el-input v-model="form.graduateInstitutions" placeholder="毕业院校" clearable></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="graduationMajor" label="毕业专业"
                                                  :rules="[
                                                  // {required: true, message: '请填写最高学历'},
                                                  // {type: 'string', min: 1,  message: '长度为 2 ~ 200 个字符'},
                                                  // {validator: validateAllSpace, message: '请填写最高学历'}
                                              ]">
                                        <el-input v-model="form.graduationMajor" placeholder="毕业专业" clearable></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="entryTime" label="入职时间"
                                                  :rules="[
                                                  {required: false, message: '请选择日期'},
                                                  {type: 'string', len: 10, message: '请选择日期'},
                                              ]">
                                        <el-date-picker v-model="form.entryTime"
                                                        placeholder="选择日期"
                                                        type="date"
                                                        format="yyyy-MM-dd"
                                                        value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="title" label="职称"
                                                  :rules="[
                                                  // {required: true, message: '请填写最高学历'},
                                                  // {type: 'string', min: 1,  message: '长度为 2 ~ 200 个字符'},
                                                  // {validator: validateAllSpace, message: '请填写最高学历'}
                                              ]">
                                        <el-input v-model="form.title" placeholder="职称" clearable></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="allInOneCardNumber" label="一卡通号"
                                                  :rules="[
                                                  // {required: true, message: '请填写最高学历'},
                                                  // {type: 'string', min: 1,  message: '长度为 2 ~ 200 个字符'},
                                                  // {validator: validateAllSpace, message: '请填写最高学历'}
                                              ]">
                                        <el-input v-model="form.allInOneCardNumber" placeholder="一卡通号" clearable></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="salaryCardNo" label="工资卡号"
                                                  :rules="[
                                                  // {required: true, message: '请填写最高学历'},
                                                  // {type: 'string', min: 1,  message: '长度为 2 ~ 200 个字符'},
                                                  // {validator: validateAllSpace, message: '请填写最高学历'}
                                              ]">
                                        <el-input v-model="form.salaryCardNo" placeholder="工资卡号" clearable></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                        </template>
                        <template v-else>
                            <el-row>
                                <el-form-item prop="name" label="姓名">
                                    <el-input v-model="form.name" placeholder="用户姓名" disabled></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="sex" label="性别">
                                        <el-select v-model="form.sex" placeholder="请选择性别" disabled>
                                            <el-option label="男" :value="1"></el-option>
                                            <el-option label="女" :value="0"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="birthday" label="出生日期">
                                        <el-date-picker v-model="form.birthday"
                                                        placeholder="选择日期"
                                                        type="date"
                                                        format="yyyy-MM-dd"
                                                        value-format="yyyy-MM-dd"
                                                        disabled>
                                        </el-date-picker>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="maritalStatus" label="婚姻状态">
                                        <el-select v-model="form.maritalStatus" placeholder="请选择婚姻状态" disabled>
                                            <el-option label="未婚" value="未婚"></el-option>
                                            <el-option label="已婚" value="已婚"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="idNumber" label="身份证号">
                                        <el-input v-model="form.idNumber" placeholder="身份证号" disabled></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="phoneNumber" label="手机号码">
                                        <el-input v-model="form.phoneNumber" placeholder="手机号码" disabled></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="email" label="邮箱">
                                        <el-input v-model="form.email" placeholder="邮箱" disabled></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                            <el-row>
                                <el-form-item prop="homeAddress" label="家庭住址">
                                    <el-input v-model="form.homeAddress" type="textarea" placeholder="家庭住址"
                                              :autosize="{minRows: 2, maxRows: 2}" resize="none"
                                              style="width: 580px;" disabled></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="familyEmergencyContactNumber" label="家庭紧急联系电话">
                                        <el-input v-model="form.familyEmergencyContactNumber" placeholder="家庭紧急联系电话" disabled></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="highestEducation" label="最高学历">
                                        <el-input v-model="form.highestEducation" placeholder="最高学历" disabled></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="graduateInstitutions" label="毕业院校">
                                        <el-input v-model="form.graduateInstitutions" placeholder="毕业院校" disabled></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="graduationMajor" label="毕业专业">
                                        <el-input v-model="form.graduationMajor" placeholder="毕业专业" disabled></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="entryTime" label="入职时间">
                                        <el-date-picker v-model="form.entryTime"
                                                        placeholder="选择日期"
                                                        type="date"
                                                        format="yyyy-MM-dd"
                                                        value-format="yyyy-MM-dd"
                                                        disabled>
                                        </el-date-picker>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="title" label="职称">
                                        <el-input v-model="form.title" placeholder="职称" disabled></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="allInOneCardNumber" label="一卡通号">
                                        <el-input v-model="form.allInOneCardNumber" placeholder="一卡通号" disabled></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="salaryCardNo" label="工资卡号">
                                        <el-input v-model="form.salaryCardNo" placeholder="工资卡号" disabled></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                        </template>
                        <!-- 部门编辑 -->
                        <template v-if="!isMySelf">
                            <el-row class="_hr"></el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="employeeCategory" label="员工类别"
                                                  :rules="[
                                                  // {required: true, message: '请填写最高学历'},
                                                  // {type: 'string', min: 1,  message: '长度为 2 ~ 200 个字符'},
                                                  // {validator: validateAllSpace, message: '请填写最高学历'}
                                              ]">
                                        <el-input v-model="form.employeeCategory" placeholder="员工类别" clearable></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="position" label="职位"
                                                  :rules="[
                                                  // {required: true, message: '请填写最高学历'},
                                                  // {type: 'string', min: 1,  message: '长度为 2 ~ 200 个字符'},
                                                  // {validator: validateAllSpace, message: '请填写最高学历'}
                                              ]">
                                        <el-input v-model="form.position" placeholder="职位" clearable></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="wageScale" label="工资级别"
                                                  :rules="[
                                                      // {required: true, message: '请填写最高学历'},
                                                      // {type: 'string', min: 1,  message: '长度为 2 ~ 200 个字符'},
                                                      // {validator: validateAllSpace, message: '请填写最高学历'}
                                                  ]">
                                        <el-input v-model="form.wageScale" placeholder="工资级别" clearable></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="gradingTime" label="定级时间"
                                                  :rules="[
                                                      {required: false, message: '请选择日期'},
                                                      {type: 'string', len: 10, message: '请选择日期'},
                                                  ]">
                                        <el-date-picker v-model="form.gradingTime"
                                                        placeholder="选择日期"
                                                        type="date"
                                                        format="yyyy-MM-dd"
                                                        value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                            <el-row type="flex">
                                <el-row>
                                    <el-form-item prop="socialSecurityAndMedicalInsurance" label="社保医保"
                                                  :rules="[
                                                  // {required: true, message: '请填写最高学历'},
                                                  // {type: 'string', min: 1,  message: '长度为 2 ~ 200 个字符'},
                                                  // {validator: validateAllSpace, message: '请填写最高学历'}
                                              ]">
                                        <el-input v-model="form.socialSecurityAndMedicalInsurance" placeholder="社保医保" clearable></el-input>
                                    </el-form-item>
                                </el-row>
                            </el-row>
                        </template>
                    </el-form>
                </el-row>
            </el-row>
            <el-row type="flex" justify="center" align="middle" class="page-default-pd-bgc-white edit-page-options-btn">
                <el-button type="default" size="small" icon="el-icon-refresh-left" @click="cancel" class="btn">返回列表</el-button>
                <el-button type="primary" size="small" icon="el-icon-finished" :loading="btnLoadingSave" @click="save" class="btn">保存修改</el-button>
            </el-row>
        </el-row>

        <!-- 组件 -->
    </el-row>

</template>

<script>

    import dayjs from 'dayjs';
    import {mapState} from 'vuex';
    import api from '@api';
    import {
        validatePhone,
        validateAllSpace,
        validateNullArray,
    } from '@plugins/man/validate';
    const listRoutePath = '/personnel/information/detail';

    export default {
        name: "edit",
        data() {
            return {
                dayjs,
                validatePhone,
                validateAllSpace,
                validateNullArray,

                form: {},
                isReadOnlyForFormItem: true,
                btnLoadingSave: false,
                allRoles: [],
            }
        },
        created() {
            this.$store.commit('setPageTitle', `${this.$route.query.id ? '编辑' : '新增'}人员档案`);

            if(this.$route.query.id.length > 0) this.getDetail(this.$route.query.id);
        },
        computed: {
            ...mapState(['userInfo',]),

            isMySelf: function() {return this.userInfo.user.userId === this.$route.query.id;},
        },
        methods: {
            getDetail: function(id) {
                let that = this;

                api.sysUserInfoFind(id).then((res) => {
                    // console.log(res.data);

                    if(res.data.status === 200) {
                        that.form = {
                            ...res.data.data,
                            birthday: res.data.data.birthday ? dayjs(res.data.data.birthday).format('YYYY-MM-DD') : '',
                            gradingTime: res.data.data.gradingTime ? dayjs(res.data.data.gradingTime).format('YYYY-MM-DD') : '',
                        };
                        console.log(that.form);
                    }
                });
            },
            save: function() {
                let that = this;
                // console.log(that.form);return;

                that.$refs["fm"].validate(valid => {
                    if (valid) {
                        that.btnLoadingSave = true;

                        if(!that.isMySelf) {
                            api.sysUserInfoEdit({
                                id: that.form.id,
                                employeeCategory: that.form.employeeCategory,
                                position: that.form.position,
                                wageScale: that.form.wageScale,
                                gradingTime: that.form.gradingTime,
                                socialSecurityAndMedicalInsurance: that.form.socialSecurityAndMedicalInsurance,
                            }).then((res) => {
                                // console.log(res);
                                that.btnLoadingSave = false;

                                if(res.data.status === 200) {
                                    that.$message.success('保存成功');
                                    that.$router.push({
                                        path: `/personnel/information/edit`,
                                        query: {
                                            id: that.form.id,
                                        }
                                    });
                                }
                            });
                        } else {
                            api.sysUserInfoEditSelf({
                                id: that.form.id,
                                ...that.form,
                            }).then((res) => {
                                // console.log(res);
                                that.btnLoadingSave = false;

                                if(res.data.status === 200) {
                                    that.$message.success('保存成功');
                                    that.$router.push({
                                        path: `/personnel/information/edit`,
                                        query: {
                                            id: that.detail.id,
                                        }
                                    });
                                }
                            });
                        }
                    } else {return false;}
                });
            },
            cancel: function() {
                let that = this;

                that.$confirm('是否取消编辑内容并返回列表', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '返回列表',
                    cancelButtonText: '取消'
                }).then(() => {
                    that.$router.push({name: listRouteName, params: {_lpq: JSON.parse(that.$route.params._lpq)}});
                }).catch();
            },
        }
    }

</script>

<style lang="scss" scoped>

    ._root_page {

        .fm {
            ._hr {
                width: calc(100vw - 340px);
                margin: 15px auto 30px auto;
                border: 1px solid #E0E0E0;
            }


            ::v-deep {
                .el-input--small .el-input__inner {width: 220px;}
            }
        }
    }

</style>