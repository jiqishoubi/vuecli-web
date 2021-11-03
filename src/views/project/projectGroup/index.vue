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
      <el-button type="primary" @click="clickAdd">新建</el-button>
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

  <!-- 模态 -->
  <EditModal
    ref="editModalRef"
    @successAdd="tableController.search"
    @successEdit="tableController.refresh"
  />
</template>

<script>
import { ref, toRef, toRefs } from "vue";
import SearchForm from "@/components/SearchForm";
import ProTable from "@/components/ProTable";
import EditModal from "./EditModal.vue";
import useSearchFormCtrller from "@/hooks/useSearchFormCtrller";
import useTableController from "@/hooks/useTableController";

export default {
  setup() {
    const editModalRef = ref(null);
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
        render: (_, record) => {
          return (
            <el-link
              onClick={() => {
                clickEdit(record);
              }}
            >
              编辑
            </el-link>
          );
        },
      },
    ];
    const tableController = useTableController({
      columns,
      api: "/web/projectgroup/getProjectGroupList",
      formModel: searchController.formModel,
    });

    function clickAdd() {
      editModalRef.value?.open();
    }

    function clickEdit(record) {
      editModalRef.value?.open(record);
    }

    return {
      searchController,
      tableController,
      editModalRef,
      clickAdd,
    };
  },
  components: { SearchForm, ProTable, EditModal },
};
</script>

<style></style>
