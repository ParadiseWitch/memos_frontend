import { createApp } from 'vue'

import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
// highlightjs
import hljs from 'highlight.js'

// align plugin
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align'

import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'

// todolist plugin
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import router from './router'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'

import App from './App'
VMdEditor.use(githubTheme, {
  Hljs: hljs,
})
VMdEditor.use(createAlignPlugin())
VMdEditor.use(createTodoListPlugin())

const app = createApp(App)
app.use(VMdEditor)
app.use(VMdPreview)
app.use(router)
app.mount('#app')
