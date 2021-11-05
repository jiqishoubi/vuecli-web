<template>
  <Skeleton v-if="menuTree.length == 0" :animated="true" />
  <el-menu v-else class="el_menu_my" :unique-opened="true" :defaultActive="defaultActive">
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
import Skeleton from "@/components/layout/Skeleton";

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
  computed: {
    defaultActive() {
      return this.$route.path;
    },
  },
  components: {
    "side-menu-item": SideMenuItem,
    Skeleton,
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
