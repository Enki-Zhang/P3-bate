<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb">
            <el-row class="page-default-pd-bgc-white-default-h">
                <el-row style="margin-bottom: 40px; font-size: 16px; font-weight: 600;">编辑人员档案</el-row>
                <el-row class="fm fm-max-w">
                    <el-form ref="fm" :model="form" label-position="right" size="small" label-width="140px">
                        <el-row>
                            <el-form-item prop="name" label="姓名"
                                          :rules="[
                                              {required: true, message: '请填写姓名'},
                                              {type: 'string', min: 1, message: '请填写姓名'},
                                              {validator: validateAllSpace, message: '请填写姓名'}
                                          ]">
                                <el-input v-model="form.name" placeholder="姓名" clearable></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row type="flex">
                            <el-row>
                                <el-form-item prop="tutor" label="导师"
                                              :rules="[
                                              // {required: true, message: '请填写导师'},
                                              // {type: 'string', min: 1, message: '请填写导师'},
                                              // {validator: validateAllSpace, message: '请填写导师'}
                                          ]">
                                    <el-input v-model="form.tutor" placeholder="导师" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="studyForADegree" label="攻读学位"
                                              :rules="[
                                              // {required: true, message: '请填写攻读学位'},
                                              // {type: 'string', min: 1, message: '请填写攻读学位'},
                                              // {validator: validateAllSpace, message: '请填写攻读学位'}
                                          ]">
                                    <el-input v-model="form.studyForADegree" placeholder="攻读学位" clearable></el-input>
                                </el-form-item>
                            </el-row>
                        </el-row>
                        <el-row type="flex">
                            <el-row>
                                <el-form-item prop="studentNumber" label="学号"
                                              :rules="[
                                              // {required: true, message: '请填写攻读学位'},
                                              // {type: 'string', min: 1, message: '请填写攻读学位'},
                                              // {validator: validateAllSpace, message: '请填写攻读学位'}
                                          ]">
                                    <el-input v-model="form.studentNumber" placeholder="学号" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="allInOneCardNumber" label="一卡通号"
                                              :rules="[
                                                  // {required: false, message: '请填写一卡通号'},
                                                  // {type: 'string', len: 18, message: '长度为 18 个字符'},
                                                  // {validator: validateAllSpace, message: '请填写一卡通号'}
                                              ]">
                                    <el-input v-model="form.allInOneCardNumber" placeholder="一卡通号" clearable></el-input>
                                </el-form-item>
                            </el-row>
                        </el-row>
                        <el-row type="flex">
                            <el-row>
                                <el-form-item prop="bocCardNo" label="中行卡号"
                                              :rules="[
                                                  // {required: false, message: '请填写中行卡号'},
                                                  // {type: 'string', len: 11, message: '长度为 11 个字符'},
                                                  // {validator: validatePhone, message: '请填写中行卡号'}
                                              ]">
                                    <el-input v-model="form.bocCardNo" placeholder="中行卡号" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="highestEducation" label="最高学历"
                                              :rules="[
                                                  // {required: false, message: '请填写中行卡号'},
                                                  // {type: 'string', len: 11, message: '长度为 11 个字符'},
                                                  // {validator: validatePhone, message: '请填写中行卡号'}
                                              ]">
                                    <el-input v-model="form.highestEducation" placeholder="最高学历" clearable></el-input>
                                </el-form-item>
                            </el-row>
                        </el-row>
                        <el-row type="flex">
                            <el-form-item prop="graduateSchoolAndMajor" label="本科毕业学校及专业"
                                          :rules="[
                                                  // {required: false, message: '请填写中行卡号'},
                                                  // {type: 'string', len: 11, message: '长度为 11 个字符'},
                                                  // {validator: validatePhone, message: '请填写中行卡号'}
                                              ]">
                                <el-input v-model="form.graduateSchoolAndMajor" placeholder="请填写毕业学校" clearable></el-input>
                            </el-form-item>
                            <el-form-item prop="graduateSchoolAndMajor2" label=""
                                          :rules="[
                                              // {required: false, message: '请填写中行卡号'},
                                              // {type: 'string', len: 11, message: '长度为 11 个字符'},
                                              // {validator: validatePhone, message: '请填写中行卡号'}
                                          ]" style="margin-left: -136px;">
                                <el-input v-model="form.graduateSchoolAndMajor2" placeholder="请填写毕业专业" clearable></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row type="flex">
                            <el-row>
                                <el-form-item prop="email" label="邮箱"
                                              :rules="[
                                                  {required: false, message: '请填写邮箱'},
                                                  {type: 'email', min: 1, max: 50, message: '请填写正确的邮箱'},
                                              ]">
                                    <el-input v-model="form.email" placeholder="邮箱" clearable></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item prop="phoneNumber" label="手机号码"
                                              :rules="[
                                              // {required: false, message: '请填写中行卡号'},
                                              // {type: 'string', len: 11, message: '长度为 11 个字符'},
                                              // {validator: validatePhone, message: '请填写中行卡号'}
                                          ]">
                                    <el-input v-model="form.phoneNumber" placeholder="请填写手机号码" clearable></el-input>
                                </el-form-item>
                            </el-row>
                        </el-row>
                        <el-row>
                            <el-form-item prop="homeAddress" label="家庭住址">
                                <el-input v-model="form.homeAddress" type="textarea" placeholder="请填写详细家庭住址"
                                          :autosize="{minRows: 2, maxRows: 2}" resize="none"
                                          style="width: 580px;" clearable></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row type="flex">
                            <el-form-item prop="familyEmergencyContactNumber" label="紧急联系人及电话"
                                          :rules="[
                                                  // {required: false, message: '请填写中行卡号'},
                                                  // {type: 'string', len: 11, message: '长度为 11 个字符'},
                                                  // {validator: validatePhone, message: '请填写中行卡号'}
                                              ]">
                                <el-input v-model="form.familyEmergencyContactNumber" placeholder="请填写紧急联系人姓名" clearable></el-input>
                            </el-form-item>
                            <el-form-item prop="familyEmergencyContactNumber2" label=""
                                          :rules="[
                                              // {required: false, message: '请填写中行卡号'},
                                              // {type: 'string', len: 11, message: '长度为 11 个字符'},
                                              // {validator: validatePhone, message: '请填写中行卡号'}
                                          ]" style="margin-left: -136px;">
                                <el-input v-model="form.familyEmergencyContactNumber2" placeholder="请填写紧急联系人电话" clearable></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row type="flex">
                            <el-row>
                                <el-form-item prop="entryTime" label="入学时间"
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
                                <el-form-item prop="graduationTime" label="毕业时间"
                                              :rules="[
                                                  {required: false, message: '请选择日期'},
                                                  {type: 'string', len: 10, message: '请选择日期'},
                                              ]">
                                    <el-date-picker v-model="form.graduationTime"
                                                    placeholder="选择日期"
                                                    type="date"
                                                    format="yyyy-MM-dd"
                                                    value-format="yyyy-MM-dd"
                                    ></el-date-picker>
                                </el-form-item>
                            </el-row>
                        </el-row>
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
                            gradingTime: res.data.data.gradingTime ? dayjs(res.data.data.gradingTime).format('YYYY-MM-DD') : '',
                        };
                    }
                });
            },
            save: function() {
                let that = this;
                // console.log(that.form);return;

                that.$refs["fm"].validate(valid => {
                    if (valid) {
                        that.btnLoadingSave = true;

                        api.sysYjsInfoEdit({
                            ...that.form,
                            /*id: that.form.id,
                            employeeCategory: that.form.employeeCategory,
                            position: that.form.position,
                            wageScale: that.form.wageScale,
                            gradingTime: that.form.gradingTime,
                            socialSecurityAndMedicalInsurance: that.form.socialSecurityAndMedicalInsurance,*/
                        }).then((res) => {
                            // console.log(res);
                            that.btnLoadingSave = false;

                            if(res.data.status === 200) {
                                that.$message.success('保存成功');
                                that.$router.push({
                                    path: `/personnel/graduate/detail`,
                                    query: {
                                        id: that.form.id,
                                    }
                                });
                            }
                        });
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