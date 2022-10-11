import { defineComponent, ref } from "vue";
import Button from "../button";
import Input from "../input";
import { useToast } from '/@/components/toast/'
import { useRouter } from "vue-router";
import useRequest from "../../request";
import { useGlobalState } from "/@/stage";


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
        useToast("账号或密码不能为空", { type: "warn" }).show();
        return;
      }

      loading.value = true;
      const { request, handleReqResult } = useRequest()
      await request("/user/login").post({
        name: username.value,
        password: password.value,
      }).json();
      loading.value = false;
      handleReqResult(({ data }) => {
        useToast("登陆成功, " + data.value.data.name).show();
        const { userName, userRole, token } = useGlobalState();
        token.value = data.value.data.token;
        userName.value = data.value.data.name;
        userRole.value = data.value.data.role;
        router.push('/home')
      })
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