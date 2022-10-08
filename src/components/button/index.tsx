import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    onClick: {
      type: Function,
      required: true,
    }
  },
  setup(props, { slots }) {
    return () => (
      <>
        <div
          class="w-full border border-green-600 p-2 rounded-md text-center text-white"
          onClick={props.onClick}
          style="background-color:#30cf79"
        >
          {slots.default?.()}
        </div>
      </>
    )
  }
})