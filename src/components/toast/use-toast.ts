import { ComponentPublicInstance, createApp } from "vue";
import ToastComp, { showToast } from ".";

let $vm: ComponentPublicInstance;

const initInstance = () => {
  const plugin = createApp(ToastComp);
  const container = document.createElement('div');
  $vm = plugin.mount(container);
  document.body.appendChild(container);
}

const useToast = () => {
  function show(titleText?: string, contentText?: string) {
    if (!$vm) initInstance();
    showToast(titleText, contentText);
  }
  return {
    show
  }
}
export default useToast;

