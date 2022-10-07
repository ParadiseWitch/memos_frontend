import { useVModel } from "@vueuse/core";
import { defineComponent, ref } from "vue";
import { definePropType } from "/@/utils/types";
import "./index.css"

export default defineComponent({
  name: "Input",
  props: {
    type: {
      type: String,
      default: "text",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: definePropType<string | number | null | undefined>([
        String,
        Number,
        Object,
      ]),
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: ""
    },
  },
  setup(props, { emit }) {
    const modelValue = useVModel(props, 'modelValue', emit)

    return () => (
      <>
        {props.type !== "hidden" &&
          <div class="memos-input rounded-md overflow-hidden ">
            <input class="p-2"
              placeholder={props.placeholder}
              type={props.type}
              name={props.name}
              disabled={props.disabled}
              v-model={modelValue.value}>
            </input>
          </div >}
      </>
    )
  }
})