import { defineComponent } from "vue";
import LoginOrRegist from "../../components/login-or-regist";
import Login_or_regist from "../../components/login-or-regist";

export default defineComponent({
  setup() {

    return () => (<>
      <div class="container mx-auto relative w-full h-full min-h-screen flex flex-row justify-start sm:justify-center items-start">
        <div class=" w-64 absolute top-1/2 left-1/2" style="transform: translateX(-50%) translateY(-50%);">
          <LoginOrRegist></LoginOrRegist>
        </div>
      </div>
    </>
    )
  }
})