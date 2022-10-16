import { App, ComponentPublicInstance, createApp, defineComponent, ref } from "vue";

let $vm: ComponentPublicInstance | null;
let plugin: App<Element>
let containerDom: HTMLDivElement

const initInstance = () => {
  plugin = createApp(OutsideContainer);
  containerDom = document.createElement('div');
  containerDom.id = "outside-container"
  $vm = plugin.mount(containerDom);
  document.body.appendChild(containerDom);
}

const removeInstance = () => {
  plugin.unmount();
  containerDom.remove();
  $vm = null;
}

interface Container {
  name: string,
  jsx: () => JSX.Element
}

const useOutsideContainer = () => {
  if (!$vm) initInstance();

  return {
    registContainer(container: Container) {
      registedContainer.value.set(container.name, container.jsx)
    },
    removeContainer(name: string) {
      registedContainer.value.delete(name)
      if (registedContainer.value.size == 0) {
        removeInstance()
      }
    },
    hasContainer(name: string) {
      return registedContainer.value.has(name)
    }
  }
}

const registedContainer = ref<Map<string, () => JSX.Element>>(new Map())

const OutsideContainer = defineComponent({
  name: "OutsideContainer",
  setup() {
    return () => (
      <>
        {...Array.from(registedContainer.value.values()).map(c => c())}
      </>
    )
  }
})

export default useOutsideContainer