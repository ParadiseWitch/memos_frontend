import { createGlobalState } from "@vueuse/core";
import { ref } from "vue";


export const useGlobalState = createGlobalState(() => { 
  const userName = ref('')
  const userAuth = ref('user')
  return { userName, userAuth }
})