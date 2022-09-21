import { onClickOutside } from "@vueuse/core";
import { defineComponent, PropType, ref } from "vue";

interface LabelEntry {
  label: string,
  value: any
}

export default defineComponent({
  name: "DropDown",
  props: {
    data: {
      type: Object as PropType<LabelEntry[]>,
      required: true,
    },
    buttonSlot: {
      type: Object as PropType<JSX.Element>
    }
  },
  emits: ['select'],
  setup(props, { emit }) {
    let showDownList = ref(false);
    let clickOutSideTarget = ref(null);

    onClickOutside(clickOutSideTarget, () => {
      showDownList.value = false;
    })

    const DownList = () => (
      <div class="absolute">
        {props.data.map((item) =>
          <div class="w-full bg-slate-300 "
            onClick={() => { emit('select', item); }}>
            {item.label}
          </div>)
        }
      </div>
    )
    return () => (<>
      <div ref={clickOutSideTarget} class="h-fit relative">
        <div class="border bg-slate-200 p-2 text-gray-600"
          onClick={() => { showDownList.value = !showDownList.value; }}>
          { props.buttonSlot }
        </div>
        {showDownList.value && DownList()}
      </div>
    </>)
  }
})
