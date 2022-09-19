import { defineComponent, nextTick, onMounted, PropType, ref } from "vue"
import "./index.css"

export type EditorModeType = "edit" | "editable" | "preview";

export default defineComponent({
  name: "MDEditor",
  props: {
    modelValue: {
      type: String,
      require: true,
    },
    leftToolbar: {
      type: String,
      default: "table | save"
    },
    rightToolbar: {
      type: String,
      default: "preview toc sync-scroll fullscreen"
    },
    mode: {
      type: String as PropType<EditorModeType>,
      default: "edit",
    }
  },
  emits: ['update:modelValue', 'input'],
  setup(props, { emit }) {
    const mdeditor = ref();

    function onInput(value: string) {
      emit('update:modelValue', value)
    }
    const onSave = (text: any, html: any) => {
      console.log(text, html);
    }
    onMounted(() => {
      console.log(mdeditor.value);
    })
    const save = () => {
      mdeditor.value.save();
    }
    const tiggleFullscreen = () => {
      mdeditor.value.fullscreen = !mdeditor.value.fullscreen;
      if (mdeditor.value.fullscreen) {
        // TODO 新增加Toast组件 函数式
        // alert("按esc退出全屏")
      }
    }

    const toggleTocVisible = () => {
      // mdeditor.value.tocVisible = !mdeditor.value.tocVisible;
      // TODO 新增加目录组件，根据titles生成
      console.log(mdeditor.value.titles);
      console.log(mdeditor.value);
    }

    return () => (
      <>
        {/* <div class="w-full h-fit mt-2 mb-2 " > */}
          <v-md-editor
            ref={mdeditor}
            placeholder="Any thounghts..."
            modelValue={props.modelValue}
            onUpdate:modelValue={onInput}
            include-level={[1, 2, 3]}
            left-toolbar={props.leftToolbar}
            right-toolbar={props.rightToolbar}
            tab-size={2}
            onSave={onSave}
            height="100%"
            mode={props.mode}
          ></v-md-editor>
          {/* <div onClick={save}>save</div>
          <div onClick={tiggleFullscreen}>fullscreen</div>
          <div onClick={toggleTocVisible}>toc</div> */}
        {/* </div> */}
      </>
    )
  }
})