<template>
  <div>{{ userInfo?.staffName }}</div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.state.user.userInfo);
    return {
      userInfo,
    };
  },
};
</script>

<style>
</style>
