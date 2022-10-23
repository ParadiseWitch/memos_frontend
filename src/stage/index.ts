import { createGlobalState, useStorage } from '@vueuse/core'
import { ref } from 'vue'

export const useGlobalState = createGlobalState(() => {
  const userName = ref('')
  const userRole = ref('user')
  const token = useStorage('token', '')
  return { userName, userRole, token }
})
