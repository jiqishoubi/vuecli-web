import { computed, ref, watchEffect, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

function useRouterBreadcrumb() {
  const store = useStore();
  const allMenu = computed(() => store.state.user.allMenu);

  const items = ref(getItemArr())

  function getItemArr(path, itemArr) {
    let menuUrl = path ?? window.location.pathname
    let arr = itemArr || []
    let curMenu = allMenu.value.find((item) => item.menuUrl == menuUrl)
    if (curMenu) {
      arr.unshift(curMenu)
      if (curMenu.parentCode) {
        let parentMenu = allMenu.value.find((item) => item.menuCode == curMenu.parentCode)
        return getItemArr(parentMenu.menuUrl, arr)
      } else {
        return arr
      }
    } else {
      return arr
    }
  }

  onBeforeRouteUpdate((to) => {
    items.value = getItemArr(to.path)
  })

  watch(allMenu, (newValue, oldValue) => {
    setTimeout(() => {
      items.value = getItemArr()
    }, 0)
  });


  return items
}

export default useRouterBreadcrumb
