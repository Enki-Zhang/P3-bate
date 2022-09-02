<template>
    <el-dialog :title="title" :close-on-click-modal="false"
               class="Jdialog Jdialog_center transfer-dialog" lock-scroll append-to-body
               v-bind="$attrs" width="800px" :modal-append-to-body="false" v-on="$listeners" @open="onOpen">
        <transfer :loading="loading" :treeData="treeData" v-model="selectedData" :type="type"
                  ref="transfer"/>
        <span slot="footer" class="dialog-footer">
      <el-button @click="closeTransfer">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </span>
    </el-dialog>
</template>

<script>

    import transfer from '@/components/Transfer'
    import request from '@/utils/request';

    export default {
        name: 'org-transfer',
        components: {transfer},
        props: {
            value: {
                type: Array,
                default: () => []
            },
            type: {
                type: String,
                default: 'user'
            },
            title: {
                type: String,
                default: '组织机构'
            },
        },
        data() {
            return {
                loading: false,
                treeData: [],
                selectedData: []
            }
        },
        methods: {
            onOpen() {
                this.dataInit()
            },
            closeTransfer() {
                this.$emit('update:visible', false)
            },
            confirm() {
                this.$emit('confirm', this.selectedData)
                this.closeTransfer()
            },
            async dataInit() {
                this.loading = true
                this.selectedData = []
                this.$nextTick(() => {
                    this.$refs.transfer && (this.$refs.transfer.filterText = '')
                })
                let records = [];
                if (this.type == 'role') {
                    let res = await request({
                        // url: '/workflow/treeSelect/roleSelect',
                        url: '/userServer/sysRole/select',
                        method: 'get',
                    });
                    res.data.map(v => {
                        records.push({
                            id: v.id,
                            name: v.role,
                            type: 'role',
                            icon: 'icon-ym icon-ym-tree-organization3',
                        });
                    });
                } else {
                    let res = await request({
                        // url: '/workflow/treeSelect/userSelect',
                        url: '/userServer/sys/user/info/tree',
                        method: 'get',
                    });
                    res.data.map(v => {
                        let tmpChild = [];
                        v.users.map(vv => {
                            tmpChild.push({
                                id: vv.userId,
                                name: vv.userName,
                                type: 'user',
                                icon: 'icon-ym icon-ym-tree-user2',
                            })
                        });
                        records.push({
                            id: v.roleId,
                            name: v.roleName,
                            type: 'dept',
                            icon: 'icon-ym icon-ym-tree-organization3',
                            children: [...tmpChild],
                        });
                    });
                }
                // console.log(records);
                this.treeData = [...records];
                this.selectedData = this.value
                // console.log(this.selectedData);
                this.loading = false
            }
        }
    }
</script>