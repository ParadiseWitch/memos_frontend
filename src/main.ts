import { createApp } from 'vue'
import App from './App'
import router from './router'

import OutsideContainer from "/@/components/outside-container";

import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
// highlightjs
import hljs from 'highlight.js'
VMdEditor.use(githubTheme, {
  Hljs: hljs
})

// align plugin
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align'
VMdEditor.use(createAlignPlugin())

import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// todolist plugin
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'
VMdEditor.use(createTodoListPlugin())

const app = createApp(App)
app.use(VMdEditor)
app.use(VMdPreview)
app.use(router)
app.mount('#app')

const outsideContainer = createApp(OutsideContainer);
outsideContainer.mount('#outside-container');