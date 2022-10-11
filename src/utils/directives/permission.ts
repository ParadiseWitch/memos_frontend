import { Directive } from "vue";
import { useGlobalState } from "/@/stage";


export const Permission: Directive<Element, string[]> = {
  mounted(el, binding) {
    const { value } = binding;
    const { userRole } = useGlobalState();
    console.log(value);

    if (!value || !(value instanceof Array) || value.length <= 0) {
      throw new Error(`need roles! Like v-permission="['admin','user']`);
    }

    if (value.includes(userRole.value)) return;
    // el.style.display = 'none';
    el.remove();
  }
}
