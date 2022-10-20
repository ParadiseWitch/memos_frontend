import { TransitionPresets, useTransition } from "@vueuse/core"
import { ref } from "vue"
import useOutsideContainer from "../outside-container"


/* Dialog“组件”部分 */

type DialogOption = {
  title?: string,
  needConfirm?: boolean,
  isModel?: boolean,
  onConfirm?: () => void,
  onClose?: () => void,
}

type DialogProps = {
  content: string | JSX.Element,
  opts: DialogOption,
}
type DialogComp = (props: DialogProps) => DialogCompInstance
type DialogCompInstance = {
  show: () => void,
  jsx: () => JSX.Element
}


const dialogComp: DialogComp = (props: DialogProps): DialogCompInstance => {
  const topSource = ref(40)
  const top = useTransition(topSource, {
    duration: 400,
    transition: TransitionPresets.easeOutExpo,
  })

  return {
    show() {
      topSource.value = 50
    },
    jsx: () => <>
      <div
        class={`border bg-white w-96 fixed left-1/2 rounded-lg shadow-sm`}
        style={`
          top: ${top.value}%;
          transform: translate(-50%, -50%);
          z-index: 99999;
        `}>
        <div
          class="w-3 h-3 absolute top-4 right-3 border border-red-400 rounded-lg hover:bg-red-400"
          onClick={props.opts?.onClose}>
        </div>
        <div
          class="p-3 dialog-title py-2 font-bold text-lg"
          style="border-bottom: 1px #eee solid">
          {props.opts?.title || "提示"}
        </div>
        <div class="p-3 mt-4 text-sm text-opacity-70 text-gray-700">
          {props.content}
        </div>
        <div class="w-full flex flex-row-reverse mt-4" style="border-top: 1px #eee solid">
          {props.opts.needConfirm && < div
            class="w-full p-2 px-10 text-center hover:bg-blue-200"
            style="border-left: 1px #eee solid"
            onClick={props.opts?.onConfirm || props.opts?.onClose}>
            确定
          </div>}
          <div
            class="w-full p-2 px-10 text-center"
            onClick={props.opts?.onClose}>
            {props.opts.needConfirm ? "取消" : "确认"}
          </div>
        </div>
      </div>
    </>
  }
}

/* dialog管理部分 */

const DialogContainerName = "dialog"

const dialogList = ref<DialogCompInstance[]>([])
const toastContainer = () => (
  <div id="dialog-container">
    {dialogList.value.map(d => d.jsx())}
  </div>
)

const removeDialog = (instance: DialogCompInstance) => {
  const idx = dialogList.value.indexOf(instance);
  if (idx != -1) {
    dialogList.value.splice(idx, 1)
  }
}
const useDialog = (content: string | JSX.Element, opts: DialogOption = {}) => {
  const { registContainer, removeContainer, hasContainer, showMask } = useOutsideContainer()
  if (!hasContainer(DialogContainerName)) {
    registContainer({ name: DialogContainerName, jsx: toastContainer })
  }

  let hideMask = opts.isModel && showMask()

  const close = () => {
    removeDialog(instance)
    if (dialogList.value.length == 0) {
      removeContainer(DialogContainerName)
    }
    hideMask && hideMask()
  }

  const onCloseProp = opts?.onClose;
  opts.onClose = () => {
    onCloseProp && onCloseProp();
    close()
  }
  const instance = dialogComp({ content, opts });

  return {
    show() {
      dialogList.value.push(instance)
      instance.show()
      return close
    },
  }
}

export default useDialog