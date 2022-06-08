
<script setup>
import Prompt from "~/components/Prompt.vue";

definePageMeta({
  middleware: ["auth"]
})
import {EventStreamContentType, fetchEventSource} from '@microsoft/fetch-event-source'
import { nextTick } from 'vue'

const { $i18n, $auth } = useNuxtApp()
const runtimeConfig = useRuntimeConfig()
const currentModel = useCurrentModel()
const openaiApiKey = useApiKey()
const fetchingResponse = ref(false)
const messageQueue = []
let isProcessingQueue = false

const processMessageQueue = () => {
  if (isProcessingQueue || messageQueue.length === 0) {
    return
  }
  if (!currentConversation.value.messages[currentConversation.value.messages.length - 1].is_bot) {
    currentConversation.value.messages.push({id: null, is_bot: true, message: ''})
  }
  isProcessingQueue = true
  const nextMessage = messageQueue.shift()
  if (runtimeConfig.public.typewriter) {
    let wordIndex = 0;
    const intervalId = setInterval(() => {
      currentConversation.value.messages[currentConversation.value.messages.length - 1].message += nextMessage[wordIndex]
      wordIndex++
      if (wordIndex === nextMessage.length) {
        clearInterval(intervalId)
        isProcessingQueue = false
        processMessageQueue()
      }
    }, runtimeConfig.public.typewriterDelay)
  } else {
    currentConversation.value.messages[currentConversation.value.messages.length - 1].message += nextMessage
    isProcessingQueue = false
    processMessageQueue()
  }
}

let ctrl
const abortFetch = () => {
  if (ctrl) {
    ctrl.abort()
  }
  fetchingResponse.value = false
}
const fetchReply = async (message, parentMessageId) => {
  ctrl = new AbortController()
  try {
    await fetchEventSource('/api/conversation/', {
      signal: ctrl.signal,
      method: 'POST',
      headers: {
        'accept': 'application/json',