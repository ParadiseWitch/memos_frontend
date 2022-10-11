import { useVModel } from "@vueuse/core";
import { defineComponent, nextTick, onMounted, PropType, ref } from "vue"
import { useToast } from '/@/components/toast/'
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
  setup(props, { emit }) {
    const modelValue = useVModel(props, 'modelValue', emit)
    const mdeditor = ref();

    const onSave = (text: any, html: any) => {
      console.log(text, html);
    }
    const onFullScreen = (isFullscreen: boolean) => {
      isFullscreen && useToast("按esc退出全屏", { type: "info" }).show();
    }

    return () => (
      <>
        <v-md-editor
          ref={mdeditor}
          onFullscreenChange={onFullScreen}
          placeholder="Any thounghts..."
          v-model={modelValue.value}
          include-level={[1, 2, 3]}
          left-toolbar={props.leftToolbar}
          right-toolbar={props.rightToolbar}
          tab-size={2}
          onSave={onSave}
          height="100%"
          mode={props.mode}
        ></v-md-editor>
      </>
    )
  }
})