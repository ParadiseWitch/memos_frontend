import { defineComponent } from 'vue'
import './App.css'

export default defineComponent({
  props: {
  },
  setup() {
    return () => <router-view />
  },
})
