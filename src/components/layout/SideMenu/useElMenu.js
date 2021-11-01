import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from 'vue-router'

function useElMenu() {
  const { path } = useRoute()
  // const store = useStore();
  // const allMenu = computed(() => store.state.user.allMenu);

  return {
    defaultActive: path,
    // defaultOpeneds: []
  }
}

export default useElMenu
