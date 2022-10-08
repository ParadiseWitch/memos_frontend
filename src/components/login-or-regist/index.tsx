import { defineComponent, ref } from "vue";
import Button from "../button";
import Input from "../input";
import useToast from "../toast/use-toast";
import { login } from "/@/utils/request";

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
    const code = ref("")

    let isShowCode = false

    const checkUser = (username: string,password: string,code:string) => {
      if (username.length === 0 || password.length === 0) {
        useToast().show("提示", "账号或密码不能为空");
      }
      let iscode = 0;
      //todo 密码加密
      login(username,password,code).then((response: any) => {
        if (response) {
          // response.status = 'true';
          console.info(response);
          if ('fail' === response.status) {
            useToast().show("提示", "账号或密码错误");
            iscode = iscode+1;
            if(iscode>3){
              isShowCode = true;
              useToast().show("提示", "账号或密码错误次数过多，请输入验证码");
            }
            return;
          }
          useToast().show("提示", "登陆成功");
        }
      });
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
          {isShowCode&&
            <div class="p-2 pt-0">
              <Input v-model={code.value} placeholder="请输入验证码" type="text"></Input>
            </div>
          }
          <div class="p-2 pt-0">
            <Button onClick={() => checkUser(username.value,password.value,'')}>登录</Button>
          </div>
        </div>
      </>)
  }
})