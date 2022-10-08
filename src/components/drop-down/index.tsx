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
      <div class="list-container absolute w-full bg-white shadow-md mt-2 rounded border">
        {props.data.map((item) =>
          <div class="w-full py-2 pl-4 text-sm hover:bg-gray-100"
            onClick={() => { emit('select', item); }}>
            {item.label}
          </div>)
        }
      </div>
    )
    return () => (<>
      <div ref={clickOutSideTarget} class="h-fit relative">
        <div class={`dropdown-btn w-48 px-1 text-gray-600 rounded ${showDownList.value && 'bg-gray-200'}`}
          onClick={() => { showDownList.value = !showDownList.value; }}>
          {props.buttonSlot}
        </div>
        {showDownList.value && DownList()}
      </div>
    </>)
  }
})
