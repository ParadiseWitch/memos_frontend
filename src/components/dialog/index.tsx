import { ref } from "vue"
import useOutsideContainer from "../outside-container"


const DialogContainerName = "dialog"

const dialogList = ref<Dialog[]>([])
const toastContainer = () => (
  <div id="toast-container">
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

const useDialog = (content: string | JSX.Element, opts?: DialogOption) => {
  const { registContainer, removeContainer, hasContainer } = useOutsideContainer()
  if (!hasContainer(DialogContainerName)) {
    registContainer({ name: DialogContainerName, jsx: toastContainer })
  }

  // TODO 生成dialog

  return {
    show() {
      const dialog = genDialog(content, { ...opts })
      dialog.show()
    },
    close() { },
  }
}

const genDialog = (contentParam: string | JSX.Element, opts: DialogOption): Dialog => {
  const content = ref(contentParam)

  return {
    show() { },
    jsx() {
      return <>
        <div class={`border w-1/2 p-4 absolute left-1/2 rounded-lg shadow-sm`} style={`
          transform: translate(-50%, -50%);
          z-index: 99999;
        `}>
          <div class=" text-sm text-opacity-70 text-gray-700" > {content.value} </div>
        </div>
      </>
    }
  }
}