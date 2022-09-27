import { defineComponent, ref } from "vue";
import Sidebar from "/@/components/sidebar";
import "./index.css";
import MemosView from "/@/components/memos-view";
import DropDown from "/@/components/drop-down";
import { useRouter } from "vue-router";
import { Permission } from "/@/utils/directives/permission";
import useToast from "/@/components/toast/use-toast";


export default defineComponent({
  name: "Home",
  directives: { Permission },
  setup() {
    const router = useRouter();
    const handclick = () => {
      // router.push('/login')
      useToast().show();
    }


    return () => (
      <>
        <router-view></router-view>
        <div class="container mx-auto relative w-full min-h-screen flex flex-row justify-start sm:justify-center items-start;">
          <Sidebar />
          <MemosView />
          <div>
            <div v-permission={[['user']]} onClick={handclick}>
              登录
            </div>
          </div>
        </div>
      </>
    );
  }
})