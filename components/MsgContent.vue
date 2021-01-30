<script setup>
import hljs from "highlight.js"
import MarkdownIt from 'markdown-it'
import copy from 'copy-to-clipboard'


const md = new MarkdownIt({
  linkify: true,
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return `<pre class="hljs-code-container my-3"><div class="hljs-code-header d-flex align-center justi