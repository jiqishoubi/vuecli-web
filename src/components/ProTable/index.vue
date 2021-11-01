<template>
  <el-table class="table_my" :data="data">
    <el-table-column
      v-for="(columnObj, index) in columns"
      :key="columnObj.prop || index"
      :label="columnObj.label"
      :prop="columnObj.prop"
      :width="columnObj.width || false"
    />
  </el-table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    defaultColumnWidth: {
      type: Number,
      default: 200,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
.table_my {
  width: 100%;
}
</style>
