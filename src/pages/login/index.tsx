import { defineComponent } from "vue";
import LoginOrRegist from "../../components/login-or-regist";
import Login_or_regist from "../../components/login-or-regist";

export default defineComponent({
  setup() {

    return () => (<>
      <div class="container mx-auto relative w-full min-h-screen flex flex-row justify-start sm:justify-center items-start;">
        <LoginOrRegist></LoginOrRegist>
      </div>
    </>
    )
  }
})