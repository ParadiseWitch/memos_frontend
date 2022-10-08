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
    const modelValue = useVModel(props, "modelValue", emit)
    const showPassword = ref(true)
    const eyeClolor = ref("#dcdfe6")

    return () => (
      <>
        {props.type !== "hidden" &&
          <div class="w-full memos-input rounded-md overflow-hidden px-2 relative">
            <input
              class={`w-full p-2 ${props.type == "password" && 'pr-5'}`}
              placeholder={props.placeholder}
              type={
                props.type == "password" && showPassword.value
                  ? "password"
                  : "text"}
              name={props.name}
              disabled={props.disabled}
              v-model={modelValue.value}>
            </input>
            {props.type == "password" && <svg
              onClick={() => { showPassword.value = !showPassword.value }}
              class="icon inline-block absolute top-3 right-2"
              style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M934.464 517.44c-14.08 0-29.696-6.4-39.04-20.864-120.32-177.92-253.056-272.448-384.192-272.448-131.2 0-262.4 94.592-382.72 272.448-14.016 22.4-43.712 27.264-65.536 12.8-21.888-14.4-26.56-44.8-12.544-67.264C192.64 233.792 347.2 128 511.232 128c163.968 0 320.128 105.792 460.736 314.112 14.08 22.4 9.344 51.2-12.544 67.264a42.432 42.432 0 0 1-24.96 8.064z"
                fill={eyeClolor.value} />
              <path
                d="M511.232 810.688c-164.032 0-318.656-105.792-460.8-314.112a49.664 49.664 0 0 1 12.544-67.328 46.848 46.848 0 0 1 65.6 12.8c120.256 177.92 252.992 272.448 384.192 272.448 131.2 0 262.4-94.528 384.192-272.384 14.08-22.4 43.776-27.264 65.6-12.8 21.888 14.4 26.56 44.8 12.544 67.264-143.68 208.32-298.304 314.112-463.872 314.112z"
                fill={eyeClolor.value} />
              <path
                d="M511.232 668.032c-106.24 0-193.664-89.728-193.664-198.72 0-108.928 87.424-198.656 193.664-198.656 106.24 0 193.664 89.728 193.664 198.656 0 108.992-85.888 198.72-193.664 198.72z m0-301.248c-54.656 0-99.968 46.464-99.968 102.528 0 56.128 45.312 102.592 99.968 102.592 54.656 0 99.968-46.464 99.968-102.592 0-56.064-43.776-102.528-99.968-102.528z"
                fill={eyeClolor.value} />
            </svg>}
          </div >}
      </>
    )
  }
})