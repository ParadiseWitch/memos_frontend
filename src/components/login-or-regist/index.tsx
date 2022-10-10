import { defineComponent, ref } from "vue";
import Button from "../button";
import Input from "../input";
import useToast from "../toast/use-toast";
import { useRouter } from "vue-router";
import { useFetch } from "@vueuse/core";


interface ReturnType {
  status: "fail" | "success",
  data?: any,
  msg?: "",
}
export default defineComponent({
  name: "LoginOrRegist",
  props: {
    isLogin: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const username = ref("")
    const password = ref("")
    const router = useRouter();
    let loading = ref(false)

    const handleCheck = async () => {
      if (!username.value || !password.value) {
        useToast().show("账号或密码不能为空", { type: "warn" });
        return;
      }

      loading.value = true;
      const { data, error } = await useFetch("/api/v1/user/login").
        post({
          name: username.value,
          password: password.value,
        }).
        json<ReturnType>()

      loading.value = false;
      if (error.value || !data.value) {
        useToast().show("请求失败", { type: "warn" });
        return;
      }
      if (!['fail', "success"].includes(data.value.status)) {
        useToast().show("请求异常", { type: "warn" });
        return;
      }
      if ('fail' === data.value.status) {
        useToast().show(data.value.msg, { type: "warn" });
        return;
      }
      useToast().show("登陆成功");
      // router.push('/home')
      return;
      // login(username.value, password.value).then((response: any) => {
      //   if (!response) {
      //     useToast().show("请求失败", { type: "warn" });
      //     return;
      //   }
      //   if ('fail' === response.status) {
      //     useToast().show(response.msg, { type: "warn" });
      //     return;
      //   }
      //   useToast().show("登陆成功");
      //   router.push('/home')
      //   return;
      // });
    }


    return () => (
      <>
        <div>
          <div class="text-center font-bold text-2xl">{props.isLogin ? "登录" : "注册"}</div>
          <div class="p-2">
            <Input v-model={username.value} placeholder="请输入用户名" type="text"></Input>
          </div>
          <div class="p-2 pt-0">
            <Input v-model={password.value} placeholder="请输入密码" type="password"></Input>
          </div>
          <div class="p-2 pt-0">
            <Button onClick={handleCheck}>{`登录${loading.value ? '中...' : ''}`}</Button>
          </div>
        </div>
      </>)
  }
})