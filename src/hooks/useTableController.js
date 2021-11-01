import { onMounted, reactive, toRefs } from 'vue'
import request from '@/utils/request'


function useTableController(options) {
  const pageState = reactive({
    page: 1,
    pageSize: 10,
  })
  const tableData = reactive([])

  onMounted(() => {
    getData()
  })

  function getData() {
    const postData = {
      page: pageState.page,
      rows: pageState.pageSize,
    }
    request({
      url: '/web/projectgroup/getProjectGroupList',
      data: postData,
    }).then((data) => {
      tableData.value = data?.data || []
    })
  }

  return {
    tableData
  }
}

export default useTableController
