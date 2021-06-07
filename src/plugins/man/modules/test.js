const test = {};

/**
 * 生成静态菜单
 *
 * @returns {[{path: string, hidden: number, children: [{path: string, hidden: number, meta: {title: string}, name: string}], meta: {title: string}, name: string, icon: string}]}
 */
test.generateStaticMenus = function() {
    return [
        {
            path: 'indicator',
            name: 'indicator',
            meta: {title: '指标管理'},
            icon: 'el-icon-s-custom',
            hidden: 0,
            webSite: 0,
            children: [
                {
                    path: 'analyze',
                    name: 'indicator_analyze',
                    meta: {title: '历史指标分析', isShowBreadcrumb: 1},
                    hidden: 0,
                    webSite: 0,
                },
            ]
        },
        /*{
            path: 'super',
            name: 'super',
            meta: {title: '超管功能'},
            icon: 'el-icon-s-custom',
            hidden: 0,
            children: [
                {
                    path: 'menus',
                    name: 'super_menus',
                    meta: {title: '菜单管理', isShowBreadcrumb: 1},
                    hidden: 0,
                },
                {
                    path: 'menus/edit/:id?',
                    name: 'super_menus_edit',
                    meta: {
                        title: '菜单管理',
                        isShowBreadcrumb: 1,
                        isNeedVirtualParent: 1,
                        virtualParent: {
                            path: 'menus',
                            name: 'super_menus',
                            meta: {title: '菜单管理'},
                        }
                    },
                    hidden: 1,
                },
            ]
        },*/
    ];
};

export default test;