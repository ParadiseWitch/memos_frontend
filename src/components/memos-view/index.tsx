import type { Ref } from 'vue'
import { defineComponent, reactive, ref } from 'vue'
import type { EditorModeType } from '/@/components/md-editor'
import MDEditor from '/@/components/md-editor'
import './index.css'

export default defineComponent({
  name: 'MemosView',
  setup() {
    const text = ref('')
    const mode: Ref<EditorModeType> = ref('edit')
    const modes: EditorModeType[] = reactive(new Array(3).fill('preview'))
    let editorIndex = -1
    const handleDblClick = (index: number) => {
      console.log(`handleDblClick: ${index}`)
      if (editorIndex !== -1)
        modes[editorIndex] = 'preview'

      modes[index] = 'edit'
      editorIndex = index
    }

    return () => (
      <>
        <main class="memos-wrapper">
          <div class="mb-3 w-full">
            <MDEditor
              v-model={text.value}
              mode={mode.value}
            ></MDEditor>
          </div>
          {modes.map((e, i) =>
            <>
              <div class="mb-3 w-full" onDblclick={() => handleDblClick(i)}>
                <MDEditor
                  v-model={text.value}
                  mode={modes[i]}
                ></MDEditor>
              </div>
            </>,
          )}
        </main>
      </>
    )
  },
})
