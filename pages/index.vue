
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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: currentModel.value,
        openaiApiKey: openaiApiKey.value,
        message: message,
        parentMessageId: parentMessageId,
        conversationId: currentConversation.value.id
      }),
      onopen(response) {
        if (response.ok && response.headers.get('content-type') === EventStreamContentType) {
          return;
        }
        throw new Error(`Failed to send message. HTTP ${response.status} - ${response.statusText}`);
      },
      onclose() {
        if (ctrl.signal.aborted === true) {
          return;
        }
        throw new Error(`Failed to send message. Server closed the connection unexpectedly.`);
      },
      onerror(err) {
        throw err;
      },
      async onmessage(message) {
        // console.log(message)
        const event = message.event
        const data = JSON.parse(message.data)

        if (event === 'error') {
          throw new Error(data.error);
        }

        if (event === 'done') {
          if (currentConversation.value.id === null) {
            currentConversation.value.id = data.conversationId
            genTitle(currentConversation.value.id)
          }
          currentConversation.value.messages[currentConversation.value.messages.length - 1].id = data.messageId
          abortFetch()
          return;
        }

        messageQueue.push(data.content)
        processMessageQueue()

        scrollChatWindow()
      },
    })