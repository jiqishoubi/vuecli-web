<template>
  <ProTable :columns="columns" :data="tableData" />
</template>

<script>
import ProTable from "@/components/ProTable";
import useTableController from "@/hooks/useTableController";

export default {
  setup() {
    const columns = [
      { label: "分类名称", prop: "groupName" },
      { label: "排序", prop: "groupSeq" },
      { label: "状态", prop: "disabledName" },
      { label: "创建时间", prop: "createDateStr" },
      { label: "操作", prop: "actions" },
    ];
    const { tableData } = useTableController();

    console.log(tableData);
    return {
      columns,
      tableData,
    };
  },
  components: { ProTable },
};
</script>

<style></style>
