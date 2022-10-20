import { ref } from "vue"
import useOutsideContainer from "../outside-container"


const DialogContainerName = "dialog"

const dialogList = ref<Dialog[]>([])
const toastContainer = () => (
  <div id="dialog-container">
    {dialogList.value.map(d => d.jsx())}
  </div>
)


interface Dialog {
  jsx: () => JSX.Element
  show: (top?: number) => void,
}


interface DialogOption {
  title?: string,
  needConfirm?: boolean,
  isModel?: boolean,
  onConfirm?: () => void
}


const useDialog = (content: string | JSX.Element, opts: DialogOption = {}) => {
  const { registContainer, removeContainer, hasContainer } = useOutsideContainer()
  if (!hasContainer(DialogContainerName)) {
    registContainer({ name: DialogContainerName, jsx: toastContainer })
  }

  const dialog = {
    show() {

    },
    jsx() {
      return <>
        <div class={`border bg-white w-96 fixed left-1/2 top-1/2 rounded-lg shadow-sm`} style={`
          transform: translate(-50%, -50%);
          z-index: 99999;
        `}>
          <div class="w-3 h-3 absolute top-4 right-3 border border-red-400 rounded-lg hover:bg-red-400" onClick={close}></div>
          <div class="p-3 dialog-title py-2 font-bold text-lg" style="border-bottom: 1px #eee solid">{opts.title || "提示"}</div>
          <div class="p-3 mt-4 text-sm text-opacity-70 text-gray-700"> {content} </div>
          <div class="w-full flex flex-row-reverse mt-4" style="border-top: 1px #eee solid">
            <div class="w-full p-2 px-10 text-center hover:bg-blue-200" style="border-left: 1px #eee solid">
              确认
            </div>
            <div class="w-full p-2 px-10 text-center" onClick={close}>
              取消
            </div>
          </div>
        </div>
      </>
    }
  }


  const removeDialog = (dialog: Dialog) => {
    const idx = dialogList.value.indexOf(dialog);
    if (idx != -1) {
      dialogList.value.splice(idx, 1)
    }
    if (dialogList.value.length == 0) {
      removeContainer(DialogContainerName)
    }
  }

  const close = () => {
    removeDialog(dialog)
  }
  return {
    show() {
      dialogList.value.push(dialog)
      dialog.show()
    },
    close() { },
  }
}

export default useDialog