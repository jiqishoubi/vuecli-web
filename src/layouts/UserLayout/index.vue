<template>
  <el-container>
    <div class="form_box">
      <router-view></router-view>
    </div>
  </el-container>
</template>

<script>
import SideMenu from "@/components/SideMenu/index.vue";
export default {
  components: { SideMenu },
};
</script>

<style lang="less" scoped>
.form_box {
  padding-top: 100px;
  margin: 0 auto;
}
</style>
