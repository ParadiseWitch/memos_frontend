import { defineComponent, onMounted, ref } from "vue";
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
    const repeatPsd = ref("")
    const isLoginCur = ref(props.isLogin)
    let loading = ref(false)
    const router = useRouter();

    onMounted(() => {
      isLoginCur.value = props.isLogin
    })

    const handleCheck = async () => {
      if (!username.value || !password.value) {
        useToast("账号或密码不能为空", { type: "warn" }).show();
        return;
      }

      if (!isLoginCur.value && password.value != repeatPsd.value) {
        useToast("两次输入密码不一致！", { type: "warn" }).show();
        return;
      }

      loading.value = true;
      const { request, handleReqResult } = useRequest()
      await request(`/user/${isLoginCur.value ? 'login' : 'register'}`).post({
        name: username.value,
        password: password.value,
      }).json();
      loading.value = false;
      handleReqResult(({ data }) => {
        if (isLoginCur.value) {
          useToast(`登陆成功, ${data.value.data.name}`).show();
          const { userName, userRole, token } = useGlobalState();
          token.value = data.value.data.token;
          userName.value = data.value.data.name;
          userRole.value = data.value.data.role;
          router.push('/home')
        } else {
          useToast("注册成功！");
          isLoginCur.value = true;
        }
      })
    }

    return () => (
      <>
        <div>
          <div class="text-center font-bold text-2xl">{isLoginCur.value ? "登录" : "注册"}</div>
          <div class="p-2">
            <Input v-model={username.value} placeholder="请输入用户名" type="text"></Input>
          </div>
          <div class="p-2 pt-0">
            <Input v-model={password.value} placeholder="请输入密码" type="password"></Input>
          </div>
          {!isLoginCur.value && <div class="p-2 pt-0">
            <Input v-model={repeatPsd.value} placeholder="请重复密码" type="password"></Input>
          </div>}
          <div class="p-2 pt-0">
            <Button onClick={handleCheck}>
              {isLoginCur.value ? '登录' : '注册'}{loading.value ? '中...' : ''}
            </Button>
          </div>
          <div class="p-2 pt-0">
            <div class="text-sm text-right text-green-600 underline"
              onClick={() => { isLoginCur.value = !isLoginCur.value }}>
              {isLoginCur.value ? "立即注册" : "立即登录"}
            </div>
          </div>
        </div>
      </>
    )
  }
})