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
          <Skeleton v-if="menuTree.length == 0" />
          <Page404 v-else-if="!isHaveRight" />
          <router-view v-else />
        </div>

        <Footer />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent, onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import SideMenu from "@/components/layout/SideMenu/index.vue";
import Header from "@/components/layout/Header/index.vue";
import Footer from "@/components/layout/Footer/index.vue";
import Skeleton from "@/components/layout/Skeleton";
import Page404 from "@/views/common/404";
import { LOGIN_TOKEN_KEY, loginPath } from "@/utils/consts";
import { useHaveRight } from "@/utils/utils";

export default defineComponent({
  setup() {
    const toPath = ref(window.location.pathname);
    const router = useRouter();

    const store = useStore();
    const allMenu = computed(() => store.state.user.allMenu);
    const menuTree = computed(() => store.state.user.menuTree);

    const isHaveRight = computed(() => useHaveRight(toPath.value, allMenu.value));

    onMounted(() => {
      const token = localStorage.getItem(LOGIN_TOKEN_KEY);
      if (token) {
        store.dispatch("user/initUserInfo");
      } else {
        router.replace(loginPath);
      }
    });

    return {
      toPath,
      menuTree,
      isHaveRight,
    };
  },
  watch: {
    $route(to) {
      this.toPath = to.path;
    },
  },
  components: { SideMenu, Header, Footer, Skeleton, Page404 },
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
      box-sizing: border-box;
      padding: 15px;
      background-color: #fff;
    }
  }
}
</style>
>
