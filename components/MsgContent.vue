<script setup>
import hljs from "highlight.js"
import MarkdownIt from 'markdown-it'
import copy from 'copy-to-clipboard'


const md = new MarkdownIt({
  linkify: true,
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return `<pre class="hljs-code-container my-3"><div class="hljs-code-header d-flex align-center justify-space-between bg-grey-darken-3 pa-1"><span class="pl-2 text-caption">${language}</span><button class="hljs-copy-button" data-copied="false">Copy</button></div><code class="hljs language-${language}">${hljs.highlight(code, { language: language, ignoreIllegals: true }).value}</code></pre>`
  },
})

const props = defineProps(['content'])

const contentHtml = ref('')

const contentElm = ref(null)

watchEffect(() => {
  contentHtml.value = props.content ? md.render(props.content) : ''
})

const bindCopyCodeToButtons = () => {
  if (!contentElm.value)