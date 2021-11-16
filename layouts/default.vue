
<script setup>
import {useDisplay} from "vuetify";

const { $i18n } = useNuxtApp()
const runtimeConfig = useRuntimeConfig()
const colorMode = useColorMode()
const drawer = ref(null)
const themes = ref([
  { title: $i18n.t('lightMode'), value: 'light' },
  { title: $i18n.t('darkMode'), value: 'dark' },
  { title: $i18n.t('followSystem'), value: 'system'}
])
const setTheme = (theme) => {
  colorMode.preference = theme
}
const feedback = () => {
  window.open('https://github.com/WongSaang/chatgpt-ui/issues', '_blank')
}

const { locale, locales, setLocale } = useI18n()
const setLang = (lang) => {
  setLocale(lang)
}

const conversations = useConversions()
const currentConversation = useConversion()

const editingConversation = ref(null)
const deletingConversationIndex = ref(null)

const editConversation = (index) => {
  editingConversation.value = conversations.value[index]
}

const updateConversation = async (index) => {
  editingConversation.value.updating = true
  const { data, error } = await useAuthFetch(`/api/chat/conversations/${editingConversation.value.id}/`, {
    method: 'PUT',
    body: JSON.stringify({
      topic: editingConversation.value.topic
    })
  })
  if (!error.value) {
    conversations.value[index] = editingConversation.value
  }
  editingConversation.value = null
}

const deleteConversation = async (index) => {
  deletingConversationIndex.value = index
  const { data, error } = await useAuthFetch(`/api/chat/conversations/${conversations.value[index].id}/`, {
    method: 'DELETE'
  })
  deletingConversationIndex.value = null
  if (!error.value) {
    if (conversations.value[index].id === currentConversation.value.id) {
      createNewConversion()
    }
    conversations.value.splice(index, 1)
  }
}

const clearConversations = async () => {
  deletingConversations.value = true
  const { data, error } = await useAuthFetch(`/api/chat/conversations/delete_all`, {
    method: 'DELETE'
  })
  if (!error.value) {
    loadConversations()
    clearConfirmDialog.value = false
  }
  deletingConversations.value = false
}

const clearConfirmDialog = ref(false)
const deletingConversations = ref(false)
const loadingConversations = ref(false)

const loadConversations = async () => {
  loadingConversations.value = true
  conversations.value = await getConversions()
  loadingConversations.value = false
}

const {mdAndUp} = useDisplay()

const drawerPermanent = computed(() => {
  return mdAndUp.value
})

onNuxtReady(async () => {
  loadConversations()
})

</script>

<template>
  <v-app
      :theme="$colorMode.value"
  >
    <v-navigation-drawer
        v-model="drawer"
        :permanent="drawerPermanent"
        width="300"
    >
      <div class="px-2 py-2">
        <v-list>
          <v-list-item>
            <v-btn
                block
                variant="outlined"
                prepend-icon="add"
                @click="createNewConversion()"
                class="text-none"
            >
              {{ $t('newConversation') }}
            </v-btn>
          </v-list-item>
          <v-list-item v-show="loadingConversations">
            <v-list-item-title class="d-flex justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <v-list>
          <template
              v-for="(conversation, cIdx) in conversations"