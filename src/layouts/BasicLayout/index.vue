<template>
  <el-container>
    <el-aside class="side_menu_wrap" width="180px">
      <div class="logo_wrap">logo</div>
      <side-menu></side-menu>
    </el-aside>

    <!-- 右侧 -->
    <el-container class="right_content">
      <el-header class="header_wrap" height="46px">
        <Header />
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import SideMenu from "@/components/layout/SideMenu/index.vue";
import Header from "@/components/layout/Header/index.vue";
import { LOGIN_TOKEN_KEY } from "@/utils/consts";

export default defineComponent({
  setup() {
    const store = useStore();
    onMounted(() => {
      const token = localStorage.getItem(LOGIN_TOKEN_KEY);
      if (token) store.dispatch("user/initUserInfo");
    });
  },
  components: { SideMenu, Header },
});
</script>

<style lang="less" scoped>
@import url("~@/common/styles.less");
@import url("~@/layouts/BasicLayout/index.less");

.side_menu_wrap {
  height: 100vh;
  box-shadow: 1px 0 4px rgba(0, 21, 41, 8%);
  overflow: hidden;

  .logo_wrap {
    height: @headerHeight;
    .flexCenter;
    .flexJCenter;
  }
}

.right_content {
  height: 100vh;
  overflow-y: auto;

  .header_wrap {
    box-shadow: 0 1px 4px rgba(0, 21, 41, 8%);
  }
}
</style>>
