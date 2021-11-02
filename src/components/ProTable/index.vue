<script>
export default {
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
  },
  render() {
    return (
      <div class="my_pro_table">
        <el-table class="table_my" data={this.tableData} v-loading={this.loading}>
          {this.columns.map((columnObj, index) => {
            const record = this.tableData[index] ?? {};
            return (
              <el-table-column
                key={columnObj.prop || index}
                label={columnObj.label}
                prop={columnObj.prop}
                align="center"
              >
                {columnObj.render
                  ? columnObj.render(record[columnObj.prop || ""], record)
                  : record[columnObj.prop || ""]}
              </el-table-column>
            );
          })}
        </el-table>
        <div class="pagination_box">
          <el-pagination
            class="pro_table_pagination"
            current-page={this.pageState.page}
            page-size={this.pageState.pageSize}
            page-sizes={[10, 20, 50, 100, 200, 300, 400]}
            total={this.total}
            layout="total, sizes, prev, pager, next, jumper"
            onCurrentChange={this.handleCurrentChange}
            onSizeChange={this.handleSizeChange}
          ></el-pagination>
        </div>
      </div>
    );
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
