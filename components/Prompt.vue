
<script setup>
const menu = ref(false)
const prompts = ref([])
const editingPrompt = ref(null)
const newPrompt = ref('')
const submittingNewPrompt = ref(false)
const promptInputErrorMessage = ref('')
const loadingPrompts = ref(false)
const deletingPromptIndex = ref(null)

const props = defineProps({
  usePrompt: {
    type: Function,
    required: true
  }
})

const addPrompt = async () => {
  if (!newPrompt.value) {
    promptInputErrorMessage.value = 'Please enter a prompt'
    return
  }
  submittingNewPrompt.value = true
  const { data, error } = await useAuthFetch('/api/chat/prompts/', {
    method: 'POST',
    body: JSON.stringify({
      prompt: newPrompt.value
    })
  })
  if (!error.value) {
    prompts.value.push(data.value)
    newPrompt.value = ''
  }
  submittingNewPrompt.value = false
}

const editPrompt = (index) => {
  editingPrompt.value = Object.assign({}, prompts.value[index])
}

const updatePrompt = async (index) => {
  editingPrompt.value.updating = true
  const { data, error } = await useAuthFetch(`/api/chat/prompts/${editingPrompt.value.id}/`, {
    method: 'PUT',
    body: JSON.stringify({
      prompt: editingPrompt.value.prompt
    })
  })
  if (!error.value) {
    prompts.value[index] = editingPrompt.value
  }