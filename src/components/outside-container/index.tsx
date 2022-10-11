import { defineComponent } from "vue";
import Toast from "../toast";

export default defineComponent({
  name: "OutsideContainer",
  setup() {
    return () => (
      <>
        <Toast></Toast>
      </>
    )
  }
})