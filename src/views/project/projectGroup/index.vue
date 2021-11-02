<template>
  <SearchForm ref="searchFormRef" :formModel="formModel" @search="search" :searchLoading="loading">
    <template #form>
      <el-form-item prop="groupName">
        <el-input placeholder="分类名称" v-model="formModel.groupName" clearable></el-input>
      </el-form-item>
      <el-form-item prop="disabled">
        <el-select placeholder="状态" v-model="formModel.disabled" clearable style="width: 100%">
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
    :columns="columns"
    :tableData="tableData"
    :loading="loading"
    :total="total"
    :pageState="pageState"
    @pageChange="onPageChange"
  />
</template>

<script>
import SearchForm from "@/components/SearchForm";
import ProTable from "@/components/ProTable";
import useSearchFormController from "@/hooks/useSearchFormController";
import useTableController from "@/hooks/useTableController";

export default {
  setup() {
    // searchForm
    const { searchFormRef, formModel } = useSearchFormController({
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
        render: () => {
          return <el-link>编辑</el-link>;
        },
      },
    ];
    const tableController = useTableController({
      columns,
      api: "/web/projectgroup/getProjectGroupList",
      formModel,
    });

    return {
      searchFormRef,
      formModel,
      ...tableController,
    };
  },
  components: { SearchForm, ProTable },
};
</script>

<style></style>
