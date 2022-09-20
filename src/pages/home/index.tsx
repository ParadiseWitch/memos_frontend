import { defineComponent, onMounted, ref } from "vue";
import Sidebar from "/@/components/sidebar";
import "./index.css";
import MemosView from "/@/components/memos-view";
import DropDown from "/@/components/drop-down";


export default defineComponent({
  name: "Home",
  setup() {


    return () => (
      <>
        <div class="container mx-auto relative w-full min-h-screen flex flex-row justify-start sm:justify-center items-start;">
          {/* <Sidebar /> */}
          {/* <MemosView /> */}
          <DropDown data={[
            { label: "选项1", value: "" },
            { label: "选项2", value: "" },
            { label: "选项3", value: "" },
            { label: "选项4", value: "" },]}
            onSelect={(e) => { console.log(e) }} />
        </div>
      </>
    );
  }
})