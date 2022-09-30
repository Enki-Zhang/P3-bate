<template>
  <!-- 历史 -->
  <el-row class="_root_page">
    <el-row class="page-default-pd page-default-h-has-breadcrumb">
      <el-row class="page-default-pd-bgc-white">
        <!-- 列表 -->
        <el-row style="padding-top:10px;">
          <el-table
            ref="multipleTable"
            :data="tbData.content"
            tooltip-effect="dark"
            :min-height="460"
            size="small"
            highlight-current-row
            border
          >
            <!--     <el-table-column
              label="编号"
              fixed="left"
              show-overflow-tooltip
              width="120"
            >
              <template slot-scope="scope">{{ scope.row.formId }}</template>
            </el-table-column> -->
            <el-table-column label="名称" show-overflow-tooltip min-width="160">
              <template slot-scope="scope">{{ scope.row.formName }}</template>
            </el-table-column>
            <!--    <el-table-column label="版本" show-overflow-tooltip min-width="90">
              <template slot-scope="scope">{{ scope.row.versions }}</template>
            </el-table-column> -->
            <el-table-column
              label="创建日期"
              show-overflow-tooltip
              min-width="250"
            >
              <template slot-scope="scope">{{
                (scope.row.updateTime == null
                  ? scope.row.createTime
                  : scope.row.updateTime) | dateStr
              }}</template>
            </el-table-column>
            <el-table-column
              label="修改日期"
              show-overflow-tooltip
              min-width="250"
            >
              <template slot-scope="scope">{{
                scope.row.updateTime | dateStr
              }}</template>
            </el-table-column>
            <!--<el-table-column label="使用状态" show-overflow-tooltip min-width="80">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status === 0" class="status-green">活动</span>
                                <span v-else-if="scope.row.status === 1" class="status-red">冻结</span>
                            </template>
                        </el-table-column>-->
            <el-table-column label="操作" show-overflow-tooltip width="240">
              <template slot-scope="scope">
                <el-row type="flex" justify="space-around">
                  <el-link
                    type="primary"
                    :underline="false"
                    @click="showVersion(scope.row)"
                    class="fs-12"
                    >查看</el-link
                  >
                  <!-- <el-row class="fg">|</el-row> -->
                  <!--   <el-link
                    type="danger"
                    :underline="false"
                    @click="remove(scope.row)"
                    class="fs-12"
                    >删除</el-link
                  > -->
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </el-row>

        <!-- 分页 -->
        <el-row v-if="tbData.total > 0" class="mg-t-20 mg-b-10 txt-c">
          <el-pagination
            :total="tbData.total"
            :current-page="tbData.current"
            :page-size="tbData.size"
            layout="total, prev, pager, next, jumper"
            @current-change="handlePaginationChange"
            background
          >
          </el-pagination>
        </el-row>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
const listRouteName = "forms";
import api from "@api";

export default {
  name: "index",
  data() {
    return {
      tbData: {
        content: [],
        total: 0,
        size: 10,
        current: 1,
      },
      tbDataFilter: {
        formName: "",
        formNumber: "",
      },
    };
  },
  mounted() {
    this.getTableData();
  },
  filters: {
    dateStr(str) {
      function formal(str) {
        return parseInt(str) < 10 ? "0" + str : "" + str;
      }

      if (str == null || str == "") return "";
      let d = new Date(parseInt(str));
      let year = d.getFullYear();
      let month = formal(d.getMonth() + 1);
      let date = formal(d.getDate());
      let hour = formal(d.getHours());
      let minute = formal(d.getMinutes());
      let second = formal(d.getSeconds());
      return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    },
  },
  methods: {
    getTableData: function(page = 1, pageSize = 10) {
      // 路由传参接受
      let params = {
        formId: this.$route.query.id,
        pageCurrent: page,
        pageSize,
      };

      api.formHistoryManagement(params).then((res) => {
        if (res.data.status === 200) {
          this.tbData.content = res.data.data.records;
          this.tbData.current = res.data.data.current;
          this.tbData.size = res.data.data.size;
          this.tbData.total = res.data.data.total;
        }
        // console.log(this.tbData.content);
        // console.log(`res`, res);
      });
    },
    handlePaginationChange: function(page) {
      this.getTableData(page);
    },
    /*     remove: function(row) {
      // if(!this.man.fast.inArray('sys:user:del', this.userInfo.permissions)) {
      //     this.$message.warning('您无权限进行此操作');
      //     return;
      // }

      this.$confirm("确认要删除所选数据吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消",
      })
        .then(() => {
          api.formHistoryDel(row.id).then((res) => {
            if (res.data.status === 200) {
              this.$message.success("删除成功");
              this.getTableData(this.tbData.current);
            }
          });
        })
        .catch();
    }, */
    showVersion: function(row) {
      /*   api.formHistoryMain(row.id).then((res) => {
        if (res.data.status === 200) {
          this.$message.success("设置成功");
        }
      }); */
      // 查询历史表单

      this.$router.push({
        path: "/forms/forms-forms-edit",
        query: { id: parseInt(row.id), history: true },
      });
      // console.log(`row`, row.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
