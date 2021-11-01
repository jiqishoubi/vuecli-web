<template>
  <el-container>
    <el-aside class="side_menu_wrap" width="180px">
      <div class="logo_wrap">logo</div>
      <side-menu></side-menu>
    </el-aside>

    <!-- 右侧 right_content 是滚动容器 -->
    <el-container class="right_content">
      <el-main class="el_main_my">
        <el-header class="header_wrap" height="46px">
          <Header />
        </el-header>

        <!-- 业务页面 -->
        <div class="roter_view_wrap">
          <router-view />
        </div>

        <Footer />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import SideMenu from "@/components/layout/SideMenu/index.vue";
import Header from "@/components/layout/Header/index.vue";
import Footer from "@/components/layout/Footer/index.vue";
import { LOGIN_TOKEN_KEY } from "@/utils/consts";

export default defineComponent({
  setup() {
    const store = useStore();
    onMounted(() => {
      const token = localStorage.getItem(LOGIN_TOKEN_KEY);
      if (token) store.dispatch("user/initUserInfo");
    });
  },
  components: { SideMenu, Header, Footer },
});
</script>

<style lang="less" scoped>
@import url("~@/common/styles.less");
@import url("~@/layouts/BasicLayout/index.less");

.side_menu_wrap {
  height: 100vh;
  box-shadow: 1px 0 4px rgba(0, 21, 41, 8%);
  overflow: hidden;
  position: relative;
  z-index: 2;

  .logo_wrap {
    height: @headerHeight;
    .flexCenter;
    .flexJCenter;
  }
}

// 右侧
.right_content {
  height: 100vh;
  overflow-y: auto;

  .el_main_my {
    padding-top: calc(20px + @headerHeight);
    background: #f0f2f5;
    position: relative;
    z-index: 1;

    .header_wrap {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 8%);
      background-color: #fff;
    }

    .roter_view_wrap {
      background-color: #fff;
    }
  }
}
</style>
>
