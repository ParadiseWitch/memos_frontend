import { defineComponent } from "vue";
import Dialog from "../dialog";
import Toast from "../toast";

export default defineComponent({
  name: "OutsideContainer",
  setup() {
    return () => (
      <>
        <Toast></Toast>
        <Dialog></Dialog>
      </>
    )
  }
})