import { defineComponent, ref } from "vue";
import "./index.css"
import { TransitionPresets, useTransition } from "@vueuse/core";

const visible = ref(false);
const title = ref("系统提示");
const content = ref("这里是系统提示！");
const topSource = ref(40);
export const showToast = (titleText?: string, contentText?: string) => {
  title.value = titleText || "系统提示";
  content.value = contentText || "这里是系统提示！";
  visible.value = true;
  topSource.value = 20;
  setTimeout(() => {
    visible.value = false;
    topSource.value = 40;
  }, 3000);
}
export default defineComponent({
  name: "Toast",
  setup() {
    const top = useTransition(topSource, {
      duration: 1000,
      transition: TransitionPresets.easeOutQuint,
    })
    return () => (
      <>
        {visible.value.toString()}
        {visible.value &&
          <div class="toast-container border border-green-700 w-1/2 p-4 absolute left-1/2 rounded-lg bg-green-50 shadow-md" style={{ top: `${top.value}%` }}>
            <div>
              {title.value}
            </div>
            <div class=" text-sm text-opacity-70 text-gray-700">{content.value}</div>
          </div>
        }
      </>
    )
  }
})