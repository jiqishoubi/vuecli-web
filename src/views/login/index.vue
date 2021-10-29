<template>
  <div>
    <el-form class="form" ref="formRef" :model="form" :rules="rules">
      <el-form-item prop="loginName">
        <el-input
          v-model="form.loginName"
          placeholder="用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="form.password"
          placeholder="密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="sms">
        <sms-input v-model="form.sms"></sms-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submit"
          :loading="loading"
          style="width: 100%"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import SMSInput from "@/components/SMSInput/index.vue";
import request from "@/utils/request";
import { LOGIN_TOKEN_KEY } from "@/utils/consts";

export default {
  setup(props, ctx) {
    const router = useRouter();
    const formRef = ref(null);
    const form = reactive({
      loginName: "",
      password: "",
      sms: undefined, // {v,key}
    });
    const rules = reactive({
      loginName: [{ required: true, message: "请输入用户名" }],
      password: [{ required: true, message: "请输入密码" }],
      sms: [{ required: true, message: "请输入验证码" }],
    });
    const loading = ref(false);
    async function submit() {
      await formRef.value.validate();
      const postData = {
        loginName: form.loginName,
        loginPassword: form.password,
        captcha: form.sms.v,
        captchaKey: form.sms.key,
      };
      loading.value = true;
      request({
        url: "/web/doLogin",
        data: postData,
      })
        .finally(() => {
          loading.value = false;
        })
        .then((data) => {
          // 保存token
          localStorage.setItem(LOGIN_TOKEN_KEY, data.loginSessionId);
          // // 保存userInfo
          // setInitialState({
          //   ...initialState,
          //   currentUser: data.staffInfo,
          // });
          // 跳转
          router.push("/");
        });
    }
    return {
      form,
      formRef,
      rules,
      submit,
      loading,
    };
  },
  components: { "sms-input": SMSInput },
};
</script>

<style lang="less" scoped>
.form {
  width: 300px;
}
</style>
