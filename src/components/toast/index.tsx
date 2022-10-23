import { TransitionPresets, useTransition } from '@vueuse/core'
import type { Ref } from 'vue'
import { ref } from 'vue'
import useOutsideContainer from '../outside-container'
import { delay } from '/@/utils/time'

const ToastContainerName = 'toast'
interface Toast {
  jsx: () => JSX.Element
  show: (top?: number) => void
}

const toastList = ref<Toast[]>([])

type toastType = 'info' | 'warn' | 'danger'
const colorClassMap: Record<toastType, Record<string, string>> = {
  info: {
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  warn: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  danger: {
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
}

export interface ToastOptions {
  type?: toastType
  top?: Ref<number>
}

const toastContainer = () => (
  <div id="toast-container">
    {toastList.value.map(t => t.jsx())}
  </div>
)

const genToast = (content: string | JSX.Element, opts: ToastOptions): Toast => {
  const contentRef = ref<string | JSX.Element>(content)
  const type = opts.type || 'info'
  const bgColor = ref(colorClassMap[type].bg)
  const borderColor = ref(colorClassMap[type].border)
  const topSource = opts.top || ref(300)
  const top = useTransition(topSource, {
    duration: 1000,
    transition: TransitionPresets.easeOutQuint,
  })

  return {
    show(top?: number) {
      topSource.value = top || 100
    },
    jsx() {
      return <>
        <div class={`border ${borderColor.value} w-1/2 p-4 absolute left-1/2 rounded-lg shadow-sm ${bgColor.value}`} style={`
          top: ${top.value}px;
          transform: translate(-50%, -50%);
          z-index: 99999;
        `}>
          <div class=" text-sm text-opacity-70 text-gray-700" > {contentRef.value} </div>
        </div>
      </>
    },
  }
}

const useToast = (content: string | JSX.Element, opts?: ToastOptions) => {
  const { registContainer, hasContainer, removeContainer } = useOutsideContainer()
  if (!hasContainer(ToastContainerName))
    registContainer({ name: ToastContainerName, jsx: toastContainer })

  return {
    async show() {
      const len = toastList.value.length
      const toast = genToast(content, { ...opts, top: ref(300 + len * 60) })
      toastList.value.push(toast)
      toast.show(100 + 60 * len)
      if (toastList.value.length !== 1)
        return
      await delay(2000)
      while (1) {
        await delay(1000)
        toastList.value.shift()
        toastList.value.map((t, i) => t.show(100 + i * 60))
        if (toastList.value.length <= 0) {
          removeContainer(ToastContainerName)
          break
        }
      }
    },
  }
}

export default useToast
