<script>
import { ref } from "vue";
import { RefreshLeft } from "@element-plus/icons";

export default {
  components: {
    RefreshLeft,
  },
  emits: {
    search: null,
  },
  props: {
    formModel: {
      type: Object,
      default: () => ({}),
    },
    searchLoading: Boolean,
    default: false,
  },
  setup(props, ctx) {
    const formRef = ref(null);

    function reset() {
      formRef.value?.resetFields();
    }

    function clickSearch() {
      ctx.emit("search");
    }

    return {
      formRef,
      // func
      reset,
      clickSearch,
    };
  },
  render() {
    const formItems = this.$slots.form?.() || [];
    const controllItems = this.$slots.controll?.() || [];

    return (
      <el-form class="form_wrap" ref="formRef" model={this.formModel}>
        <el-row gutter={10}>
          {formItems.map((item) => {
            return (
              <el-col xs={6} sm={6} md={6} lg={4} xl={4}>
                {item}
              </el-col>
            );
          })}

          <div class="controll_wrap">
            <el-row gutter={10}>
              <el-button circle onClick={this.reset} style={{ width: "40px", height: "40px" }}>
                <el-icon size={14}>
                  <RefreshLeft />
                </el-icon>
              </el-button>
              <el-button type="primary" onClick={this.clickSearch} disabled={this.searchLoading}>
                查询
              </el-button>
              {controllItems.map((item) => {
                return item;
              })}
            </el-row>
          </div>
        </el-row>
      </el-form>
    );
  },
};
</script>

<style lang="less" scoped>
.form_wrap {
  padding: 15px 0;

  .flex_div {
    flex: 1 0 0;
  }
  .controll_wrap {
    padding: 0 10px;
  }
}
</style>
