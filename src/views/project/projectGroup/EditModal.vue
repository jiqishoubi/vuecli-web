<template>
  <StyledModal :visible="visible" @close="close" @submit="submit" :submitLoading="submitLoading">
    <el-form ref="formRef" :model="formModel.form">
      <el-form-item
        label="分类名称"
        prop="groupName"
        :rules="[{ required: true, message: '请输入分类名称' }]"
      >
        <el-input v-model="formModel.form.groupName" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="分类说明" prop="groupDesc">
        <el-input
          v-model="formModel.form.groupDesc"
          placeholder="请输入分类名称"
          type="textarea"
        ></el-input>
      </el-form-item>
    </el-form>
  </StyledModal>
</template>

<script>
import { computed, reactive, ref, toRefs } from "vue";
import StyledModal from "@/components/StyledModal";
import request from "@/utils/request";
import lodash from "lodash";

export default {
  emits: {
    successAdd: null,
    successEdit: null,
  },
  setup(_, ctx) {
    const visible = ref(false);
    const submitLoading = ref(false);

    const formRef = ref(null);
    const formModel = reactive({
      form: {
        groupName: "",
        groupDesc: "",
      },
    });

    const record = reactive({ v: null });
    const isAdd = computed(() => (record.v ? false : true));

    function open(r) {
      visible.value = true;
      if (r) {
        record.v = JSON.parse(JSON.stringify(r)); // todo ?
        renderForm(r);
      }
    }

    function close() {
      visible.value = false;
      formModel.form = {};
    }

    // form回显
    function renderForm(r) {
      formModel.form = r;
    }

    // 提交
    async function submit() {
      await formRef.value.validate();
      submitLoading.value = true;
      request({
        url: isAdd
          ? "/web/projectgroup/createProjectGroup"
          : "/web/projectgroup/updateProjectGroup",
        data: {
          ...formModel.form,
          ...(isAdd ? {} : { groupCode: record.v?.groupCode }),
        },
      })
        .finally(() => {
          submitLoading.value = false;
        })
        .then(() => {
          isAdd && ctx.emit("successAdd");
          !isAdd && ctx.emit("successEdit");
          close();
        });
    }

    return {
      visible,
      submitLoading,
      open,
      close,
      submit,
      //
      formRef,
      formModel,
    };
  },
  components: { StyledModal },
};
</script>

<style></style>
