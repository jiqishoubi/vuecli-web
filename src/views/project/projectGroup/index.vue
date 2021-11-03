<template>
  <SearchForm
    ref="searchFormRef"
    :formModel="searchController.formModel"
    @search="tableController.search"
    :searchLoading="tableController.loading"
  >
    <template #form>
      <el-form-item prop="groupName">
        <el-input
          placeholder="分类名称"
          v-model="searchController.formModel.groupName"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="disabled">
        <el-select
          placeholder="状态"
          v-model="searchController.formModel.disabled"
          clearable
          style="width: 100%"
        >
          <el-option label="有效" value="0"></el-option>
          <el-option label="无效" value="1"></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template #controll>
      <el-button type="primary">新建</el-button>
    </template>
  </SearchForm>
  <ProTable
    :columns="tableController.columns"
    :tableData="tableController.tableData"
    :loading="tableController.loading"
    :total="tableController.total"
    :pageState="tableController.pageState"
    @pageChange="tableController.onPageChange"
  />
</template>

<script>
import { isReactive } from "vue";
import SearchForm from "@/components/SearchForm";
import ProTable from "@/components/ProTable";
import useSearchFormCtrller from "@/hooks/useSearchFormCtrller";
import useTableController from "@/hooks/useTableController";

export default {
  setup() {
    // searchForm
    const searchController = useSearchFormCtrller({
      form: {
        groupName: "",
        disabled: "",
      },
    });
    // table
    const columns = [
      { label: "分类名称", prop: "groupName" },
      { label: "排序", prop: "groupSeq" },
      { label: "状态", prop: "disabledName" },
      { label: "创建时间", prop: "createDateStr" },
      {
        label: "操作",
        prop: "actions",
        render: (v, record) => {
          return <el-link onClick={() => {}}>编辑</el-link>;
        },
      },
    ];
    const tableController = useTableController({
      columns,
      api: "/web/projectgroup/getProjectGroupList",
      formModel: searchController.formModel,
    });

    function edit() {}

    return {
      searchController,
      tableController,
    };
  },
  components: { SearchForm, ProTable },
};
</script>

<style></style>
