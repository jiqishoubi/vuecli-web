import { onMounted, reactive, toRefs, ref, computed } from 'vue'
import request from '@/utils/request'

/**
 *
 * @param {object} options
 * @param {Array<any>} [options.columns=[]] columns透传
 * @param {string} options.api
 * @param {any} [option.formModel={}] searchForm的formModel
 * @returns
 */
function useTableController(options) {
  const { columns = [], api, formModel = {} } = options

  const pageState = reactive({
    page: 1,
    pageSize: 10,
  })
  const total = ref(0)
  const tableData = ref([])
  const loading = ref(false)

  const showColumns = computed(() => {
    return columns
  })

  onMounted(() => {
    getData()
  })

  function getData(pageStateP) {
    const postPage = pageStateP ?? pageState
    const postData = {
      page: postPage.page,
      rows: postPage.pageSize,
      ...formModel
    }
    // 请求
    loading.value = true
    return request({
      url: api,
      data: postData,
    }).finally(() => { loading.value = false })
      .then((data) => {
        tableData.value = data?.data || []
        total.value = data?.rowTop || 0
      })
  }

  function onPageChange(e) {
    pageState.value = e
    getData(e)
  }

  // 查询（回到第一页）
  function search() {
    return getData({
      page: 1,
      pageSize: pageState.pageSize,
    })
  }
  // 刷新（在当前页）
  function refresh() {
    return getData()
  }

  return {
    columns: showColumns,
    tableData,
    loading,
    total,
    pageState,
    onPageChange,
    search,
    refresh,
  }
}

export default useTableController
