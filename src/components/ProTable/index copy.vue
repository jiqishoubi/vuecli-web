<template>
  <div class="my_pro_table">
    <el-table class="table_my" :data="tableData" v-loading="loading">
      <el-table-column
        v-for="(columnObj, index) in columns"
        :key="columnObj.prop || index"
        :label="columnObj.label"
        :prop="columnObj.prop"
        align="center"
      >
        {{ getTdText() }}
      </el-table-column>
    </el-table>
    <div class="pagination_box">
      <el-pagination
        class="pro_table_pagination"
        :current-page="pageState.page"
        :page-size="pageState.pageSize"
        :page-sizes="[10, 20, 50, 100, 200, 300, 400]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { h } from "vue";

export default {
  data() {
    return {
      h,
    };
  },
  emits: {
    pageChange: null,
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    defaultColumnWidth: {
      type: Number,
      default: 200,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageState: {
      type: Object,
      default: () => ({ page: 1, pageSize: 10 }),
    },
  },
  methods: {
    handleCurrentChange(v) {
      this.$emit("pageChange", {
        page: v,
        pageSize: 10,
      });
    },
    handleSizeChange(v) {
      this.$emit("pageChange", {
        page: 1,
        pageSize: v,
      });
    },
    getTdText(columnObj, record) {
      // if (columnObj.render) {
      //   return columnObj.render(record);
      // }

      // if (record[columnObj.dataIndex]) {
      //   return record[columnObj.dataIndex];
      // }

      return 1;
    },
  },
};
</script>

<style lang="less">
.my_pro_table .el-table__header-wrapper thead th {
  background-color: #fafafa !important;
}
</style>
<style lang="less" scoped>
.table_my {
  width: 100%;
}
.pagination_box {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
}
</style>
