<template>
  <el-menu
    class="el_menu_my"
    :unique-opened="true"
    :defaultActive="defaultActive"
    v-loading="menuTree.length == 0"
  >
    <side-menu-item
      v-for="(item, index) in menuTree"
      :key="index"
      :menuItem="item"
    ></side-menu-item>
  </el-menu>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import SideMenuItem from "@/components/layout/SideMenuItem";
import useElMenu from "./useElMenu";

export default {
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo);
    const menuTree = computed(() => store.state.user.menuTree);
    const { defaultActive } = useElMenu();
    return {
      userInfo,
      menuTree,
      defaultActive,
    };
  },
  components: {
    "side-menu-item": SideMenuItem,
  },
};
</script>

<style lang="less" scoped>
@import url("~@/layouts/BasicLayout/index.less");

.el_menu_my {
  height: calc(100vh - @logoWrapHeight);
  border-right: none;
  overflow-y: auto;
}
</style>
