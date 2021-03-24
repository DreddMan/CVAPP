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
  if (!contentElm.value) {
    return
  }
  contentElm.value.querySelectorAll('.hljs-code-container').forEach((codeContainer) => {
    const copyButton = codeContainer.querySelector('.hljs-copy-button');
    const codeBody = codeContainer.querySelector('code');
    copyButton.onclick = function () {
      copy(codeBody.textContent ?? '');

      copyButton.innerHTML = "Copied!";
      copyButton.dataset.copied = 'true';

      setTimeout(() => {
        copyButton.innerHTML = "Copy";
        copyButton.dataset.copied = 'false';
      }, 2000);
    };
  })
}

onMounted(() => {
  bindCopyCodeToButtons()
})

onUpdated(() => {
  bindCopyCodeToButtons()
})

</script>

<template>
  <div
      ref="contentElm"
      v-html="contentHtml"
      class="chat-msg-content"
  ></div>
</template>

<style>
.chat-msg-content ol {
  padding-left: 2em;
}
.hljs-code-container {
  border-radius: 3px;
  overflow: hidden;
}
.hljs-copy-button{
  width:2rem;height:2rem;text-indent:-9999px;color:#fff;
  border-radius:.25rem;border:1px solid #ffffff22;
  background-image:url('data:image/svg+xml;utf-8,<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 5C5.73478 5 5.48043 5.10536 5.29289 5.29289C5.10536 5.48043 5 5.73478 5 6V20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21H18C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946