import { defineComponent } from "vue";
import "./index.css"
import { toastList } from "./use-toast";

export default defineComponent({
  name: "Toast",
  setup() {
    return () => (
      // <div class="toast-container">
      <>
        {toastList.value.length}
        {toastList.value.map(t => t.jsx())}
      </>
      // </div >
    )
  }
})