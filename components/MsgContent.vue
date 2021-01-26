<script setup>
import hljs from "highlight.js"
import MarkdownIt from 'markdown-it'
import copy from 'copy-to-clipboard'


const md = new MarkdownIt({
  linkify: true,
  highlight