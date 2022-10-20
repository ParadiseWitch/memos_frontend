import { defineComponent } from "vue";
import Sidebar from "/@/components/sidebar";
import MemosView from "/@/components/memos-view";
import { useRouter } from "vue-router";
import { Permission } from "/@/utils/directives/permission";
import Button from "/@/components/button";
import useDialog from "/@/components/dialog";
import { useToast } from "/@/components/toast";


export default defineComponent({
  name: "Home",
  directives: { Permission },
  setup() {
    const router = useRouter();
    const loginHandclick = () => {
      useToast("test").show()
      // router.push('/login')
    }

    const registerHandclick = () => {
      // router.push({ name: 'login', query: { isLogin: 'false' } })
      useDialog("test1").show()
      useDialog("test2", { isModel: true, needConfirm: true, onConfirm: useDialog("test2-2").show }).show()
      useDialog("test3", { title: "测试", }).show()
    }

    return () => (
      <>
        <div class="container mx-auto relative w-full min-h-screen flex flex-row justify-start sm:justify-center items-start;">
          <Sidebar />
          <MemosView />
          <div>
            <div v-permission={[['user']]} class="p-20 pt-0">
              <Button onClick={loginHandclick}>登录</Button>
            </div>
            <div v-permission={[['user']]} class="p-20 pt-0">
              <Button onClick={registerHandclick}>注册</Button>
            </div>
          </div>
        </div>
      </>
    );
  }
})