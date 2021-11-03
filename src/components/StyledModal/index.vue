<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :destroy-on-close="true"
    v-model="visible"
    title="分类"
    @close="close"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit" :loading="submitLoading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  emits: {
    close: null,
    submit: null,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    submitLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<style></style>
