import { createGlobalState } from "@vueuse/core";
import { ref } from "vue";


export const useGlobalState = createGlobalState(() => {
  const userName = ref('')
  const token = ref('')
  return { userName, token }
})