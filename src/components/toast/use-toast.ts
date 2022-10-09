import { ComponentPublicInstance, createApp } from "vue";
import ToastComp, { showToast ,options} from ".";

let $vm: ComponentPublicInstance;

const initInstance = () => {
  const plugin = createApp(ToastComp);
  const container = document.createElement('div');
  $vm = plugin.mount(container);
  document.body.appendChild(container);
}

const useToast = () => {
  function show(contentText?: string, opts?: options) {
    if (!$vm) initInstance();
    showToast(contentText,opts);
  }
  return {
    show
  }
}
export default useToast;

