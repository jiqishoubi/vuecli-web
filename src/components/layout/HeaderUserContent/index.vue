<template>
  <el-dropdown size="small">
    <span class="username">
      {{ userInfo?.staffName }}
      <span v-if="userInfo?.loginName">（{{ userInfo?.loginName }}）</span></span
    >
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>注销</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import HeaderUserContent from "../HeaderUserContent/index.vue";

export default {
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo);
    const menuTree = computed(() => store.state.user.menuTree);
    return {
      userInfo,
      menuTree,
    };
  },
  components: {
    HeaderUserContent,
  },
};
</script>

<style lang="less" scoped>
.username {
  cursor: pointer;
}
</style>
