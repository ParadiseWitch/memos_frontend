import { defineComponent, ref } from "vue";
import Input from "../input";

export default defineComponent({
  name: "LoginOrRegist",
  props: {
    isLogin: Boolean
  },
  setup(props) {
    const text = ref("")
    return () => (
      <>
        <div>
          <Input v-model={text.value} placeholder="请输入密码" type="password"></Input>
        </div>
      </>)
  }
})