import { defineComponent, ref } from "vue";
import Button from "../button";
import Input from "../input";
import useToast from "../toast/use-toast";

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
            <Button onClick={() => useToast().show("提示", "登录成功")}>登录</Button>
          </div>
        </div>
      </>)
  }
})