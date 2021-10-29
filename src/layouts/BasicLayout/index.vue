<template>
  <el-container>
    <el-aside class="side_menu">
      <side-menu></side-menu>
    </el-aside>

    <el-container class="right_content">
      <el-header
        style="text-align: right; font-size: 12px; background-color: red"
      >
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from "vue";
import SideMenu from "@/components/SideMenu/index.vue";

export default defineComponent({
  components: { SideMenu },
});
</script>

<style lang="less" scoped>
.side_menu {
  width: 200px;
  height: 100vh;
  overflow-y: auto;
}
.right_content {
  height: 100vh;
  overflow-y: auto;
}
</style>>
