import { ref, onMounted, reactive } from 'vue'

/**
 *
 * @param {object} options
 * @param {object} [options.form={}]
 * @returns
 */
function useSearchFormController(options) {
  const {
    form = {}
  } = options

  const searchFormRef = ref(null)
  const formModel = reactive(form)

  return {
    searchFormRef,
    formModel,
  }
}

export default useSearchFormController
