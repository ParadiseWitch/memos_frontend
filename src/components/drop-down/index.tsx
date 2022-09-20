import { defineComponent, PropType, ref } from "vue";
import ClickOutside from "/@/utils/directives/clickOutSide"

interface LabelEntry {
  label: string,
  value: any
}

export default defineComponent({
  name: "DropDown",
  directives: { ClickOutside },
  props: {
    data: {
      type: Object as PropType<LabelEntry[]>,
      required: true,
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    let showDownList = ref(false);
    const DownList = () => (<>
      {props.data.map((item) =>
        <div class="w-full bg-slate-300"
          onClick={() => { emit('select', item); }}>
          {item.label}
        </div>)
      }
    </>)
    return () => (<>
      <div class="h-fit" v-click-outside={() => { showDownList.value = false; }}>
        <div class="border bg-slate-200" onClick={() => { showDownList.value = true; }}>下拉按钮</div>
        {showDownList.value && DownList()}
      </div>
    </>)
  }
})
