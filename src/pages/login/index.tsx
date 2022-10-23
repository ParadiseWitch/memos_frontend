import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import LoginOrRegister from '../../components/login-or-register'

export default defineComponent({
  props: {},
  setup() {
    const router = useRouter()
    const isLogin = !router.currentRoute.value.query.isLogin
    return () => (<>
      <div class="container mx-auto relative w-full h-full min-h-screen flex flex-row justify-start sm:justify-center items-start">
        <div class=" w-64 absolute top-1/2 left-1/2" style="transform: translateX(-50%) translateY(-50%);">
          <LoginOrRegister isLogin={isLogin}></LoginOrRegister>
        </div>
      </div>
    </>
    )
  },
})
