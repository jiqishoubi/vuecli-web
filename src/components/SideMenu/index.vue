<template>
  <div>{{ userInfo?.name }}</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo);
    console.log("userInfo", userInfo);

    return {
      userInfo,
    };
  },
};
</script>

<style>
</style>
