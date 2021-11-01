<template>
  <div class="header_box">
    <div class="header_content"></div>
    <div class="header_user">{{ userInfo?.staffName }}</div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

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
