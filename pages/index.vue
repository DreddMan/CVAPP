
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