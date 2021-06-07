// 布局内
const inLayout = [
    {
        path: '/',
        name: 'layout',
        redirect: {name: 'workbench'},
        children: [
            {
                path: 'welcome',
                name: 'welcome',
                meta: {title: '欢迎页', isShowBreadcrumb: 0,},
                hidden: 1,
            },
            {
                path: 'hello',
                name: 'hello',
                meta: {title: '测试页', isShowBreadcrumb: 0,},
                hidden: 1,
            },


            {
                path: 'workbench',
                name: 'workbench',
                icon: 'workbench',
                meta: {title: '工作台', isShowBreadcrumb: 1, isSinglePage: 1,},
                hidden: 0,
            },
            {
                path: 'overview',
                name: 'overview',
                icon: 'overview',
                meta: {title: '一览表', isShowBreadcrumb: 1, isSinglePage: 1,},
                hidden: 0,
            },
            {
                path: 'system/doc',
                name: 'system-doc',
                icon: 'system-doc',
                redirect: {name: 'system-doc|folder'},
                meta: {title: '生物安全实验室管理体系文件', isShowBreadcrumb: 1, isSinglePage: 1,},
                hidden: 0,
                children: [
                    {
                        path: 'folder',
                        name: 'system-doc|folder',
                        meta: {title: '生物安全实验室管理体系文件', isShowBreadcrumb: 1, isSinglePage: 1,},
                        hidden: 1,
                    },
                    {
                        path: 'management/manual',
                        name: 'system-doc|management-manual',
                        meta: {title: '安全管理手册', isShowBreadcrumb: 1,},
                        hidden: 1,
                    },
                    {
                        path: 'management/manual/add/:_lpq?',
                        name: 'system-doc|management-manual|add',
                        meta: {
                            title: '新增安全管理手册',
                            isShowBreadcrumb: 1,
                            isSinglePage: 0,
                            isNeedVirtualParent: 1,
                            virtualParent: {
                                path: 'management/manual',
                                name: 'system-doc|management-manual',
                                meta: {title: '安全管理手册', virtualParent: null},
                            }
                        },
                        hidden: 1,
                    },
                    /*{
                        path: 'program/files',
                        name: 'system_doc_program_files',
                        meta: {title: '程序文件', isShowBreadcrumb: 1,},
                        hidden: 0,
                    },
                    {
                        path: 'program/files/edit',
                        name: 'system_doc_program_files_edit',
                        meta: {
                            title: '流程设计',
                            isShowBreadcrumb: 1,
                            isSinglePage: 0,
                            isNeedVirtualParent: 1,
                            virtualParent: {
                                path: 'management/manual',
                                name: 'system_doc_management_manual',
                                meta: {title: '程序文件', virtualParent: null},
                            }
                        },
                        hidden: 1,
                    },
                    {
                        path: 'operating/procedures',
                        name: 'system_doc_operating_procedures',
                        meta: {title: '标准操作流程', isShowBreadcrumb: 1,},
                        hidden: 0,
                    },
                    {
                        path: 'manual',
                        name: 'system_doc_manual',
                        meta: {title: '安全手册', isShowBreadcrumb: 1,},
                        hidden: 0,
                    },
                    {
                        path: 'msds',
                        name: 'system_doc_msds',
                        meta: {title: 'MSDS表单', isShowBreadcrumb: 1,},
                        hidden: 0,
                    },
                    {
                        path: 'report',
                        name: 'system_doc_report',
                        meta: {title: '风险评估报告', isShowBreadcrumb: 1,},
                        hidden: 0,
                    },*/
                ]
            },
            {
                path: 'activity',
                name: 'activity',
                icon: 'activity',
                meta: {title: '实验活动管理',},
                hidden: 0,
                children: [
                    {
                        path: 'bsl',
                        name: 'activity_bsl',
                        meta: {title: 'BSL-2实验室', isShowBreadcrumb: 1, },
                        hidden: 0,
                    },
                    {
                        path: 'outside/people',
                        name: 'activity_outside-people',
                        meta: {title: '外来人员管理', isShowBreadcrumb: 1, },
                        hidden: 0,
                    },
                    {
                        path: 'issue',
                        name: 'activity_issue',
                        meta: {title: '课题组实验活动表', isShowBreadcrumb: 1, },
                        hidden: 0,
                    },
                ]
            },
            {
                path: 'personnel',
                name: 'personnel',
                icon: 'personnel',
                meta: {title: '人员管理',},
                hidden: 0,
                children: [
                    {
                        path: 'organization',
                        name: 'personnel_organization',
                        meta: {title: '组织架构', isShowBreadcrumb: 1, },
                        hidden: 0,
                    },
                    {
                        path: 'info',
                        name: 'personnel_info',
                        meta: {title: '人事资料', isShowBreadcrumb: 1, },
                        hidden: 0,
                    },
                    {
                        path: 'attendance/overview',
                        name: 'personnel_attendance-overview',
                        meta: {title: '考勤一览表', isShowBreadcrumb: 1, },
                        hidden: 0,
                    },
                    {
                        path: 'attendance/register',
                        name: 'personnel_attendance-register',
                        meta: {title: '考勤登记表', isShowBreadcrumb: 1, },
                        hidden: 0,
                    },
                ]
            },
            {
                path: 'sample/reagent',
                name: 'sample_reagent',
                icon: 'sample-reagent',
                meta: {title: '样品及试剂管理',},
                hidden: 0,
            },
            {
                path: 'supplies',
                name: 'supplies',
                icon: 'supplies',
                meta: {title: '物资管理',},
                hidden: 0,
                children: [
                    {
                        path: 'device',
                        name: 'supplies_organization',
                        meta: {title: '科研设备', isShowBreadcrumb: 1, },
                        hidden: 0,
                    },
                    {
                        path: 'consumables',
                        name: 'supplies_consumables',
                        meta: {title: '实验耗材', isShowBreadcrumb: 1, },
                        hidden: 0,
                    },
                    {
                        path: 'other/items',
                        name: 'supplies_other-items',
                        meta: {title: '其他物品', isShowBreadcrumb: 1, },
                        hidden: 0,
                    },
                    {
                        path: 'service/items',
                        name: 'supplies_service-items',
                        meta: {title: '服务项目', isShowBreadcrumb: 1, },
                        hidden: 0,
                    },
                    {
                        path: 'dormitory',
                        name: 'supplies_dormitory',
                        meta: {title: '宿舍管理', isShowBreadcrumb: 1, },
                        hidden: 0,
                    },
                    {
                        path: 'car',
                        name: 'supplies_car',
                        meta: {title: '车辆管理', isShowBreadcrumb: 1, },
                        hidden: 0,
                    },
                    {
                        path: 'logistics',
                        name: 'supplies_logistics',
                        meta: {title: '后勤基建管理', isShowBreadcrumb: 1, },
                        hidden: 0,
                    },
                ]
            },
            {
                path: 'forms',
                name: 'forms',
                icon: 'forms',
                meta: {title: '表格管理', isShowBreadcrumb: 1, isSinglePage: 1,},
                hidden: 0,
            },
        ]
    }
];

// 布局外
const outOfLayout = [
    {
        path: '/auth',
        name: 'auth',
        redirect: {name: 'auth_login'},
        children: [
            {
                path: 'login',
                name: 'auth_login',
            }
        ]
    }
];

// 错误页
const errors = [{path: '*', name: '404', redirect: {name: 'layout'}}];

export default [
    ...inLayout,
    ...outOfLayout,
    ...errors,
]