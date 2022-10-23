import type { App, ComponentPublicInstance } from 'vue'
import { createApp, defineComponent, ref } from 'vue'

const isMask = ref(false)
let $vm: ComponentPublicInstance | null
let plugin: App<Element>
let containerDom: HTMLDivElement

const removeInstance = () => {
  plugin.unmount()
  containerDom.remove()
  $vm = null
}

interface Container {
  name: string
  jsx: () => JSX.Element
}
const registedContainer = ref<Map<string, () => JSX.Element>>(new Map())

const OutsideContainer = defineComponent({
  name: 'OutsideContainer',
  setup() {
    return () => (
      <>
        {...Array.from(registedContainer.value.values()).map(c => c())}
        {isMask.value
          && <div id="mask" class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        }
      </>
    )
  },
})
const initInstance = () => {
  plugin = createApp(OutsideContainer)
  containerDom = document.createElement('div')
  containerDom.id = 'outside-container'
  $vm = plugin.mount(containerDom)
  document.body.appendChild(containerDom)
}

const useOutsideContainer = () => {
  if (!$vm)
    initInstance()

  return {
    registContainer(container: Container) {
      registedContainer.value.set(container.name, container.jsx)
    },
    removeContainer(name: string) {
      registedContainer.value.delete(name)
      if (registedContainer.value.size === 0)
        removeInstance()
    },
    hasContainer(name: string) {
      return registedContainer.value.has(name)
    },
    showMask() {
      isMask.value = true
      return () => {
        isMask.value = false
      }
    },
  }
}
export default useOutsideContainer
