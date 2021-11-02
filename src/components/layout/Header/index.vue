<template>
  <div class="header_box">
    <div class="header_content">
      <!-- 搞一个面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index">
          {{ item.menuTitle }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header_user_content">
      <HeaderUserContent />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import HeaderUserContent from "../HeaderUserContent/index.vue";
import useRouterBreadcrumb from "./useRouterBreadcrumb";

export default {
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo);
    const menuTree = computed(() => store.state.user.menuTree);

    const breadcrumbItems = useRouterBreadcrumb();

    return {
      userInfo,
      menuTree,
      breadcrumbItems,
    };
  },
  components: {
    HeaderUserContent,
  },
};
</script>

<style lang="less" scoped>
@import url("~@/common/styles.less");

.header_box {
  .flexCenter;
  font-size: 14px;
  height: 100%;

  .header_content {
    flex: 1 0 0;
  }
}
</style>
