import { defineComponent } from "vue";
import Sidebar from "/@/components/sidebar";
import MemosView from "/@/components/memos-view";
import { useRouter } from "vue-router";
import { Permission } from "/@/utils/directives/permission";
import Button from "/@/components/button";


export default defineComponent({
  name: "Home",
  directives: { Permission },
  setup() {
    const router = useRouter();
    const handclick = () => {
      router.push('/login')
    }

    return () => (
      <>
        <div class="container mx-auto relative w-full min-h-screen flex flex-row justify-start sm:justify-center items-start;">
          <Sidebar />
          <MemosView />
          <div>
            <div class="p-20 pt-0">
              <Button v-permission={[['user']]} onClick={handclick}>登录</Button>
            </div>
          </div>
        </div>
      </>
    );
  }
})