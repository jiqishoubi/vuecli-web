<template>
  <el-dropdown>
    <span class="username">
      {{ userInfo?.staffName }}
      <span v-if="userInfo?.loginName">（{{ userInfo?.loginName }}）</span></span
    >
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import HeaderUserContent from "../HeaderUserContent/index.vue";
import { myConfirm } from "@/utils/utils";

export default {
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo);
    const menuTree = computed(() => store.state.user.menuTree);

    async function logout() {
      await myConfirm("确定注销？");
      store.dispatch("user/logout");
    }

    return {
      userInfo,
      menuTree,
      logout,
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
