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
  },
  emits: ['select'],
  setup(props, { emit }) {
    let showDownList = ref(false);
    let clickOutSideTarget = ref(null);
    onClickOutside(clickOutSideTarget, (event) => { 
      console.log('onClickOutside');
      showDownList.value = false;
    })
    const DownList = () => (<>
      {props.data.map((item) =>
        <div class="w-full bg-slate-300"
          onClick={() => { emit('select', item); }}>
          {item.label}
        </div>)
      }
    </>)
    return () => (<>
      <div ref={clickOutSideTarget} class="h-fit">
        <div class="border bg-slate-200" onClick={() => { showDownList.value = true; }}>下拉按钮</div>
        {showDownList.value && DownList()}
      </div>
    </>)
  }
})
