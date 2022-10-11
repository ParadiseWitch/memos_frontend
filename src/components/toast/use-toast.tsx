import { TransitionPresets, useTransition } from "@vueuse/core";
import { ref } from "vue"



interface Toast {
  jsx: () => JSX.Element
  show: () => void,
  remove: (fn: Function) => void,
}

export type toastType = "info" | "warn" | "danger"
const colorMap: Record<toastType, string> = {
  info: "bg-green-50",
  warn: "bg-yellow-50",
  danger: "bg-red-50"
};

export interface options {
  type?: toastType
}



export const toastList = ref<Toast[]>([])
const useToast = (contentText?: string, opts?: options) => {
  const toast = genToast(contentText, opts)
  toastList.value.push(toast)
  return {
    show() {
      toast.show()
      toast.remove(() => {
        let index = toastList.value.indexOf(toast)
        if (index > -1) {
          toastList.value.splice(index, 1)
        }
      })
    }
  }
}

const genToast = (contentText?: string, opts?: options): Toast => {
  const content = ref(contentText || "这里是系统提示！");
  const type = opts?.type || "info"
  const color = ref(colorMap[type]);
  const visible = ref(false);
  const topSource = ref(40);
  const top = useTransition(topSource, {
    duration: 1000,
    transition: TransitionPresets.easeOutQuint,
  })

  const show = () => {
    visible.value = true;
    topSource.value = 20;
  }

  const remove = (cb: Function) => {
    setTimeout(() => {
      visible.value = false;
      topSource.value = 40;
      cb();
    }, 3000);
  }


  const jsx = () => (
    <>
      {
        visible.value &&
        <div class={`border w-1/2 p-4 absolute left-1/2 rounded-lg shadow-md ${color.value}`} style={`
          top: ${top.value}%;
          transform: translate(-50%, -50%);
          z-index: 99999;
        `}>
          <div class=" text-sm text-opacity-70 text-gray-700" > {content.value} </div>
        </div>
      }
    </>
  )
  return {
    show,
    remove,
    jsx,
  }
}


export default useToast